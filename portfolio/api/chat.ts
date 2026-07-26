import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenerativeAI, Content } from "@google/generative-ai";
import { createClient } from "@sanity/client";

interface RequestBody {
  message: string;
  history: Content[];
}

interface SanityProject {
  title: string | null;
  description: string | null;
  additional_info: string | null;
  technologies: string[] | null;
}

interface SanityExperience {
  company: string | null;
  role: string | null;
  description: string[] | string | null;
  additional_info: string | null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Initialize Sanity Client with fallback
  const sanity = createClient({
    projectId: process.env.SANITY_PROJECT_ID || "ubpspdu3",
    dataset: process.env.SANITY_DATASET || "production",
    useCdn: true,
    apiVersion: "2023-01-01",
  });

  // 2. Initialize Gemini AI Client
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

  // Enable simple CORS headers for local/cross-origin development if needed
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: "Method not allowed. Only POST requests are supported." });
  }

  const { message, history } = req.body as RequestBody;

  if (!message || typeof message !== "string") {
    return res
      .status(400)
      .json({
        error: "Missing or invalid 'message' field in the request body.",
      });
  }

  if (!process.env.GEMINI_API_KEY) {
    console.error(
      "Backend Error: GEMINI_API_KEY is not set in environment variables.",
    );
    return res
      .status(500)
      .json({
        error:
          "Chat functionality is currently unavailable. Please configure the AI credentials.",
      });
  }

  try {
    // 3. Dynamic Ingestion: Query all relevant text content from Sanity using aliasing for schema differences
    const sanityData = await sanity.fetch<{
      profile: {
        name: string | null;
        bio: string | null;
        skills: string[] | null;
      } | null;
      projects: SanityProject[] | null;
      experience: SanityExperience[] | null;
      chatbot: {
        systemInstruction: string | null;
      } | null;
    }>(`{
      "profile": *[_type == "profile"][0]{
        "name": coalesce(first_name + " " + last_name, name),
        "bio": coalesce(about, bio, message),
        "skills": skills[].name
      },
      "projects": *[_type == "project"]{
        "title": coalesce(name, title),
        description,
        additional_info,
        technologies
      },
      "experience": *[_type == "experience"]{
        company,
        role,
        description,
        additional_info
      },
      "chatbot": *[_type == "chatbot"][0]{
        "systemInstruction": coalesce(systemInstruction, instruction)
      }
    }`);

    // 4. Data Serialization: Clean, robust conversion to Markdown structure
    const profileName = sanityData.profile?.name || "the portfolio owner";
    const profileBio =
      sanityData.profile?.bio || "A passionate software developer.";
    const profileSkills = Array.isArray(sanityData.profile?.skills)
      ? sanityData.profile.skills.filter(Boolean).join(", ")
      : "Software Engineering, TypeScript, React";

    const projectsMarkdown =
      Array.isArray(sanityData.projects) && sanityData.projects.length > 0
        ? sanityData.projects
            .map((p) => {
              const title = p.title || "Untitled Project";
              const desc = p.description || "No description provided.";
              const tech = Array.isArray(p.technologies)
                ? p.technologies.filter(Boolean).join(", ")
                : "";
              const additionalInfo = p.additional_info?.trim()
                ? `\n  Additional AI context: ${p.additional_info.trim()}`
                : "";
              return `- **${title}**: ${desc}${tech ? ` (Built with: ${tech})` : ""}${additionalInfo}`;
            })
            .join("\n")
        : "- No projects listed currently.";

    const experienceMarkdown =
      Array.isArray(sanityData.experience) && sanityData.experience.length > 0
        ? sanityData.experience
            .map((e) => {
              const role = e.role || "Software Developer";
              const company = e.company || "Technology Company";
              const desc = Array.isArray(e.description)
                ? e.description.filter(Boolean).join(" ")
                : e.description || "No job details provided.";
              const additionalInfo = e.additional_info?.trim()
                ? `\n  Additional AI context: ${e.additional_info.trim()}`
                : "";
              return `- **${role}** at **${company}**: ${desc}${additionalInfo}`;
            })
            .join("\n")
        : "- No work experience listed currently.";

    const aiKnowledgeBase = `
CONTEXT KNOWLEDGE BASE:

PROFILE DETAILS:
- Name: ${profileName}
- Bio/Background: ${profileBio}
- Key Skills: ${profileSkills}

PROJECTS:
${projectsMarkdown}

WORK EXPERIENCE:
${experienceMarkdown}
`.trim();

    // 5. Dynamic System Instruction with Persona Rules and Knowledge Base Context
    let instructionTemplate = sanityData.chatbot?.systemInstruction;
    if (!instructionTemplate) {
      console.warn("Backend Warning: Chatbot system instruction not found in Sanity. Falling back to environment variable.");
      instructionTemplate = process.env.CHAT_SYSTEM_INSTRUCTION;
    }

    if (!instructionTemplate) {
      console.error(
        "Backend Error: No chatbot system instruction configured (neither Sanity nor environment variable)."
      );
      return res.status(500).json({
        error:
          "Chat functionality is currently unavailable. Please configure the system instructions.",
      });
    }

    const resolvedInstruction = instructionTemplate.replace(/{{profileName}}/g, profileName);
    const systemInstruction = `${resolvedInstruction}\n\n${aiKnowledgeBase}`;

    // Standard model name for the 3.5 Flash iteration in SDK is "gemini-3.5-flash"
    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash",
      systemInstruction: systemInstruction,
    });

    // Make sure we format history turns to align with Content interface
    const safeHistory = Array.isArray(history)
      ? history.map((turn) => ({
          role: turn.role === "user" ? "user" : "model",
          parts: Array.isArray(turn.parts)
            ? turn.parts
            : [{ text: String(turn.parts || "") }],
        }))
      : [];

    const chat = model.startChat({
      history: safeHistory,
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    return res.status(200).json({ response: responseText });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("API handler failed:", error);

    let userFriendlyError = "An unexpected error occurred while communicating with the AI backend.";
    const status = (error && typeof error === "object" && "status" in error) ? (error as { status: unknown }).status : undefined;

    const isQuota = status === 429 || 
                    errorMessage.includes("429") || 
                    errorMessage.toLowerCase().includes("quota") || 
                    errorMessage.toLowerCase().includes("rate limit") ||
                    errorMessage.toLowerCase().includes("too many requests");

    const isTokenLimit = errorMessage.toLowerCase().includes("token") || 
                         errorMessage.toLowerCase().includes("limit exceeded") || 
                         errorMessage.toLowerCase().includes("context window") || 
                         errorMessage.toLowerCase().includes("max tokens");

    if (isQuota) {
      userFriendlyError = "You have hit the AI model's rate limit or daily quota. Please wait a moment and try again.";
    } else if (isTokenLimit) {
      userFriendlyError = "The conversation exceeds the model's token limit. Please refresh to clear history and try again with a shorter message.";
    } else if (status === 404 || errorMessage.includes("404") || errorMessage.toLowerCase().includes("not found")) {
      userFriendlyError = "The requested AI model is currently unavailable. Please contact the administrator.";
    }

    return res.status(500).json({
      error: userFriendlyError,
      details: errorMessage,
    });
  }
}
