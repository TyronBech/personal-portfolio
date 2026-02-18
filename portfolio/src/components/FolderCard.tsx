import React from "react";
import { urlFor } from "@/data/sanity";
import { Project } from "@/types/portfolio";
import Icon from "@/assets/svg/GitHub_Invertocat_White_Clearspace.svg"

interface FolderCardProps {
  project: Project;
}

const FolderCard: React.FC<FolderCardProps> = ({ project }) => {
  return (
    <div className="group relative w-full max-w-lg bg-neutral-900 rounded-4xl overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-[1.02] flex flex-col justify-center items-center h-full min-h-112.5">
      {/* Background Image Area */}
      <div className="relative w-full h-64 shrink-0">
        <img
          src={urlFor(project.project_image).url()}
          alt={project.name}
          className="w-full p-2 rounded-4xl object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent rounded-4xl mx-2" />

        {/* Project Type on Top Right */}
        <div className="absolute top-6 right-6 text-right z-10">
          <span className="inline-block px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-black/30 text-xs font-medium text-white uppercase tracking-wider">
            {project.type}
          </span>
        </div>
      </div>

      {/* Folder Content Shape - Tab on Left */}
      <div
        className="relative -mt-40 md:-mt-28 w-full bg-[#18181b] z-20 grow flex flex-col"
        style={{
          // Shape: Starts at top-left (0,0), goes right to 45% width, slopes down to 55% width at 15% height, then to right edge
          clipPath: "polygon(0 0, 45% 0, 55% 15%, 100% 15%, 100% 100%, 0 100%)",
          paddingTop: "0.5rem",
        }}
      >
        <div className="flex flex-col grow px-6 pb-6 pt-2">
          {/* Header - Name and Year */}
          <div className="h-12 items-center mb-6">
            <p className="text-white text-md font-bold leading-tight tracking-wide font-lexend wrap-break-word max-w-[45%] mb-1">
              {project.name}
            </p>
            <p className="text-zinc-500 text-xs font-lexend tracking-wide">
              {project.year}
            </p>
          </div>
          {/* Description Area */}
          <div className="mb-8">
            <p className="text-zinc-400 text-sm font-lexend leading-relaxed">
              {project.description}
            </p>
          </div>
          {/* Footer area pushed to bottom */}
          <div className="mt-auto flex flex-col gap-4">
            {/* Technologies Tags */}
            <div className="flex capi flex-wrap gap-2">
              {project.technologies.slice(0, 5).map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-[10px] font-bold text-zinc-300 border border-zinc-700 rounded bg-[#1f1f22] capitalize tracking-wider"
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
              className="group/btn flex items-center justify-center gap-2 w-full py-2.5 bg-[#18181b] border border-zinc-700/50 hover:border-halloween-orange hover:bg-halloween-orange/10 rounded-lg transition-all duration-300"
            >
              <img src={Icon} alt="GitHub Icon" className="w-5 h-5" />
              <span className="text-zinc-200 text-sm font-semibold">
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
