import React from "react";
import { urlFor } from "@/data/sanity";
import { Project } from "@/types/portfolio";
import Icon from "@/assets/svg/GitHub_Invertocat_White_Clearspace.svg";

interface FolderCardProps {
  project: Project;
}

const FolderCard: React.FC<FolderCardProps> = ({ project }) => {
  return (
    <div className="group relative w-full h-full items-center min-h-112.5 bg-[#18181b] rounded-3xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 flex flex-col border border-zinc-800/50">
      {/* Background Image Area */}
      <div className="relative items-center w-full aspect-video shrink-0 bg-neutral-900 overflow-hidden">
        <div className="p-2 overflow-hidden w-full h-full ">
          <img
            src={urlFor(project.project_image).url()}
            alt={project.name}
            className="overflow-hidden m-auto w-full h-full rounded-t-2xl object-cover opacity-90"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-[#18181b]/50 via-transparent to-transparent opacity-70" />

        {/* Project Type on Top Right */}
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-block px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-white uppercase tracking-widest shadow-lg">
            {project.type}
          </span>
        </div>

        {/* Folder tab SVG overlay positioned exactly at the bottom of the image area */}
        <svg
          className="absolute -bottom-1 -left-1 w-[calc(100%+4px)] h-12 md:h-16 text-[#18181b] z-20 pointer-events-none drop-shadow-[0_-5px_5px_rgba(0,0,0,0.5)]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Smooth custom folder tab path */}
          <path
            d="M 0,105 L 0,0 C 20,0 35,0 42,0 C 48,0 52,70 60,70 L 100,70 L 100,105 Z"
            className="fill-current"
          />
        </svg>
      </div>

      {/* Main Folder Body */}
      <div className="relative w-full z-20 grow bg-[#18181b] flex flex-col pt-2 px-6 pb-6 rounded-b-3xl -mt-px">
        <div className="flex flex-col grow w-full mt-2">
          {/* Header - Name and Year */}
          <div className="flex justify-between items-start mb-4">
            <p className="text-white text-lg font-bold leading-tight tracking-wide font-lexend wrap-break-word max-w-[75%]">
              {project.name}
            </p>
            <p className="text-zinc-500 text-xs font-lexend tracking-widest whitespace-nowrap mt-1">
              {project.year}
            </p>
          </div>

          {/* Description Area */}
          <div className="mb-8 relative group/desc">
            <p className="text-zinc-400 text-sm font-lexend leading-relaxed line-clamp-4">
              {project.description}
            </p>
            {/* Full description popover on hover */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full opacity-0 invisible group-hover/desc:opacity-100 group-hover/desc:visible bg-rich-black z-30 transition-all duration-300 p-3 -m-3 rounded-lg shadow-2xl border border-halloween-orange/60">
              <p className="text-zinc-300 text-sm font-lexend leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          {/* Footer area pushed to bottom */}
          <div className="mt-auto flex flex-col gap-5">
            {/* Technologies Tags */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 5).map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-[10px] font-bold text-zinc-300 border border-zinc-700/50 rounded bg-zinc-800/50 capitalize tracking-wider"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Button */}
            <a
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn flex items-center justify-center gap-2 w-full py-3 bg-zinc-900 border border-zinc-700/50 hover:border-halloween-orange hover:bg-halloween-orange/10 rounded-xl transition-all duration-300"
            >
              <img src={Icon} alt="GitHub Icon" className="w-5 h-5 opacity-80 group-hover/btn:opacity-100 transition-opacity" />
              <span className="text-zinc-200 text-sm font-semibold tracking-wide">
                View Source Code
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderCard;