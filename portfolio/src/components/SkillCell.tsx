import { urlFor } from "@/data/sanity";
import type { ReactNode } from "react";
import type { SanityImageSource } from "@sanity/image-url";

export type SkillItem = { name: string; color?: string; svg?: ReactNode; icon?: SanityImageSource };

export default function SkillCell({ skill }: { skill: SkillItem }) {
  const ICON_SIZE = 44;

  return (
    <span
      className="group relative flex items-center justify-center shrink-0 cursor-default px-6"
      style={{ height: ICON_SIZE }}
    >
      {/* Invisible spacer to set track width dynamically based on max size of either text or icon */}
      <span 
        className="font-main font-bold invisible whitespace-nowrap px-4" 
        aria-hidden="true"
        style={{
          fontSize: "clamp(0.9rem, 2vw, 1.15rem)",
          letterSpacing: "-0.02em",
        }}
      >
        {skill.name}
      </span>

      {/* Text layer */}
      <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out group-hover:opacity-0 group-hover:-translate-y-3">
        <span
          className="font-main font-bold text-zinc-400 whitespace-nowrap"
          style={{
            fontSize: "clamp(0.9rem, 2vw, 1.15rem)",
            letterSpacing: "-0.02em",
          }}
        >
          {skill.name}
        </span>
      </span>

      {/* Icon layer */}
      <span className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-3 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 p-1">
        {skill.icon ? (
          <img 
            src={urlFor(skill.icon).url()} 
            alt={`${skill.name} icon`} 
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <span style={{ width: ICON_SIZE, height: ICON_SIZE, display: "flex", justifyContent: "center" }}>
            {skill.svg}
          </span>
        )}
      </span>
    </span>
  );
}
