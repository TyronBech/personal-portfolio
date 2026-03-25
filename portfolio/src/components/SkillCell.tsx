import { urlFor } from "@/data/sanity";
import type { ReactNode } from "react";
import type { SanityImageSource } from "@sanity/image-url";

export type SkillItem = { name: string; color?: string; svg?: ReactNode; icon?: SanityImageSource };

export default function SkillCell({ skill }: { skill: SkillItem }) {

  return (
    <span
      className="group relative flex items-center justify-center shrink-0 cursor-default p-6"
    >
      {/* Invisible spacer to set track width based on the visible text layer */}
      <span
        className="font-lexend font-bold tracking-tighter text-4xl invisible whitespace-nowrap px-4"
        aria-hidden="true"
      >
        {skill.name}
      </span>

      {/* Text layer */}
      <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out group-hover:opacity-0 group-hover:-translate-y-3">
        <span
          className="font-bold font-lexend tracking-tighter text-4xl text-zinc-700 whitespace-nowrap"
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
          <span className="flex items-center justify-center w-10 h-10 text-2xl">
            {skill.svg}
          </span>
        )}
      </span>
    </span>
  );
}
