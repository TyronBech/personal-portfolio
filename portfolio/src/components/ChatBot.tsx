import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, AlertCircle } from "lucide-react";
import type { Content } from "@google/generative-ai";

const formatMessageText = (text?: string) => {
  if (!text) return null;
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <strong key={index} className="font-bold text-white">
          {part}
        </strong>
      );
    }
    return part;
  });
};

interface ChatBotProps {
  ownerName?: string;
  aboutImageUrl?: string;
}

export const ChatBot: React.FC<ChatBotProps> = ({ ownerName, aboutImageUrl }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Content[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const displayName = ownerName || "the portfolio owner";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever messages or loading state change
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, loading, isOpen]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userText = textToSend.trim();
    setInput("");
    setError(null);
    setLoading(true);

    // 1. Append the user's message using Gemini's native schema format
    const userMessage: Content = { role: "user", parts: [{ text: userText }] };

    // We capture history *before* appending userMessage to send to the backend
    const currentHistory = [...messages];

    setMessages((prev) => [...prev, userMessage]);

    try {
      // 2. Query the serverless Vercel function
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: currentHistory,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || "Failed to communicate with portfolio assistant.",
        );
      }

      const data = await response.json();

      if (data.response) {
        // 3. Append model's response using standard role/parts format
        setMessages((prev) => [
          ...prev,
          { role: "model", parts: [{ text: data.response }] },
        ]);
      } else {
        throw new Error("Empty response received from the assistant.");
      }
    } catch (err: unknown) {
      console.error("Chat Error:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setError(errorMessage);
      // Remove the last user message from UI list so they can retry sending it
      setMessages((prev) => prev.slice(0, -1));
      setInput(userText); // Restore input text
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  const suggestedPrompts = [
    `Tell me about ${displayName}'s skills`,
    "What projects have you built?",
    "Are you open to contract roles?",
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-tr from-halloween-orange to-[#ff6a2e] text-white shadow-[0_4px_24px_rgba(252,76,2,0.4)] hover:shadow-[0_8px_32px_rgba(252,76,2,0.6)] cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 border border-halloween-orange/20 focus:outline-none overflow-hidden"
        aria-label="Toggle AI assistant"
      >
        {isOpen ? (
          <X className="w-6 h-6 transition-transform duration-300 rotate-0 hover:rotate-90" />
        ) : aboutImageUrl ? (
          <div className="relative w-full h-full">
            <img
              src={aboutImageUrl}
              alt={ownerName || "Assistant"}
              className="w-full h-full object-cover"
            />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
          </div>
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
          </div>
        )}
      </button>

      {/* Floating Chat Window */}
      <div
        className={`fixed bottom-24 right-6 w-96 h-[520px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-8rem)] bg-rich-black/95 backdrop-blur-md border border-halloween-orange/20 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden font-lexend z-50 transition-all duration-300 origin-bottom-right ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-75 translate-y-10 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-linear-to-r from-rich-black to-[#2a2b2e] border-b border-halloween-orange/20 p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="relative">
              {aboutImageUrl ? (
                <img
                  src={aboutImageUrl}
                  alt={ownerName || "Assistant"}
                  className="w-10 h-10 rounded-full object-cover border border-halloween-orange/30"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#2a2b2e] border border-halloween-orange/30 flex items-center justify-center text-halloween-orange">
                  <Sparkles className="w-5 h-5" />
                </div>
              )}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-rich-black rounded-full"></span>
            </div>
            <div>
              <h3 className="font-semibold text-sm tracking-wide">
                Tyron's Alter-Ego
              </h3>
              <p className="text-[10px] text-zinc-400">
                Online | Powered by Gemini 2.5 Flash
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-zinc-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Space */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-rich-black/40 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4 space-y-4">
              {aboutImageUrl ? (
                <img
                  src={aboutImageUrl}
                  alt={ownerName || "Assistant"}
                  className="w-12 h-12 rounded-full object-cover border-2 border-halloween-orange/30 animate-pulse"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-halloween-orange/10 flex items-center justify-center text-halloween-orange">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
              )}
              <div>
                <h4 className="font-medium text-white text-sm">
                  Hello visitor!
                </h4>
                <p className="text-xs text-zinc-400 mt-1 max-w-[240px] leading-relaxed">
                  I'm the interactive AI clone of {displayName}. Ask me about
                  skills, projects, or background!
                </p>
              </div>
              <div className="w-full pt-2 space-y-2">
                {suggestedPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="w-full text-left text-xs bg-[#2a2b2e]/60 hover:bg-[#2a2b2e] text-zinc-300 hover:text-white px-3 py-2 rounded-xl border border-zinc-800 hover:border-halloween-orange/30 transition duration-200"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-2xl text-sm max-w-[82%] leading-relaxed shadow-sm whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-halloween-orange text-white ml-auto rounded-tr-none shadow-[0_4px_12px_rgba(252,76,2,0.15)]"
                    : "bg-[#2a2b2e] text-zinc-200 border border-zinc-800 mr-auto rounded-tl-none"
                }`}
              >
                {formatMessageText(msg.parts[0]?.text)}
              </div>
            ))
          )}

          {/* Thinking Loader */}
          {loading && (
            <div className="flex items-center space-x-2 bg-[#2a2b2e]/60 border border-zinc-800 p-3 rounded-2xl rounded-tl-none mr-auto max-w-[80%] shadow-sm">
              <span className="text-xs text-zinc-400 font-medium">
                Thinking
              </span>
              <div className="flex space-x-1 items-center pt-0.5">
                <span
                  className="w-1.5 h-1.5 bg-halloween-orange rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></span>
                <span
                  className="w-1.5 h-1.5 bg-halloween-orange rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></span>
                <span
                  className="w-1.5 h-1.5 bg-halloween-orange rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></span>
              </div>
            </div>
          )}

          {/* Error Message Box */}
          {error && (
            <div className="flex items-center gap-2 bg-red-950/40 border border-red-500/20 text-red-300 text-xs p-3 rounded-xl">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form
          onSubmit={onSubmit}
          className="p-3 bg-[#1c1d1f] border-t border-zinc-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder={loading ? "Thinking..." : "Ask me something..."}
            className="flex-1 bg-[#2a2b2e] text-white border border-zinc-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-halloween-orange focus:ring-1 focus:ring-halloween-orange placeholder-zinc-500 disabled:opacity-50 transition-all"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-2.5 bg-halloween-orange hover:bg-[#e34402] disabled:bg-halloween-orange/40 text-white rounded-xl flex items-center justify-center transition-all duration-300 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-[0_2px_8px_rgba(252,76,2,0.2)] focus:outline-none"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </>
  );
};
