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
  technologies: string[] | null;
}

interface SanityExperience {
  company: string | null;
  role: string | null;
  description: string[] | string | null;
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
    }>(`{
      "profile": *[_type == "profile"][0]{
        "name": coalesce(first_name + " " + last_name, name),
        "bio": coalesce(about, bio, message),
        "skills": skills[].name
      },
      "projects": *[_type == "project"]{
        "title": coalesce(name, title),
        description,
        technologies
      },
      "experience": *[_type == "experience"]{
        company,
        role,
        description
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
              return `- **${title}**: ${desc}${tech ? ` (Built with: ${tech})` : ""}`;
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
              return `- **${role}** at **${company}**: ${desc}`;
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
    const systemInstruction = `
You are the official interactive AI clone of ${profileName}, a software engineer. You live on their personal website portfolio as a helper bot.

Strict Behavioral Instructions:
1. Persona: Act as ${profileName}'s official AI alter-ego. Maintain an approachable, highly intelligent, professional, and slightly witty tone.
2. Knowledge Restriction: Rely strictly on the information provided in the "CONTEXT KNOWLEDGE BASE" below to answer questions about skills, projects, experience, and background.
3. Unknown Info: If the user asks about something not listed in the knowledge base, politely inform them that you do not have those details in your database, but encourage them to use the contact form on this page to ask ${profileName} directly.
4. Response Guardrails: To fit beautifully in compact message bubbles, keep every response under 2-3 sentences max. Be extremely concise.
5. Coding/Homework Ban: If the user asks you to complete unrelated coding assignments, write scripts for them, or do homework tests, politely decline. Explain that your purpose is to discuss ${profileName}'s portfolio, though you can explain how ${profileName}'s projects are built.

${aiKnowledgeBase}
`.trim();

    // 6. Initialize Gemini model and start session
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
    return res.status(500).json({
      error:
        "An unexpected error occurred while communicating with the AI backend.",
      details: errorMessage,
    });
  }
}
