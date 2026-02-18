import React from 'react';
import { urlFor } from "@/data/sanity";
import { Project } from "@/types/portfolio";

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
          paddingTop: "0.5rem" 
        }}
      >
        <div className="flex flex-col grow px-6 pb-6 pt-2">
          
          {/* Header - Name inside the Tab area */}
          <div className="h-12 flex items-center mb-4">
            <h3 className="text-white text-lg font-bold leading-tight wrap-break-word max-w-[45%]">
               {project.name}
            </h3>
          </div>

          {/* Year underneath header area */}
          <div className="mb-2">
             <p className="text-zinc-500 text-xs font-lexend tracking-wide">
              {project.year}
            </p>
          </div>

          {/* Body: Description */}
          <div className="mb-4">
            <p className="text-zinc-400 text-sm font-lexend leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Footer area pushed to bottom */}
          <div className="mt-auto flex flex-col gap-4">
            
            {/* Technologies Tags */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 5).map((tech, i) => (
                <span 
                  key={i} 
                  className="px-2.5 py-1 text-[10px] font-bold text-zinc-300 border border-zinc-700 rounded bg-[#1f1f22] uppercase tracking-wide"
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
              className="group/btn flex items-center justify-center gap-2 w-full py-2.5 bg-[#18181b] border border-zinc-700/50 hover:border-zinc-500 hover:bg-zinc-800 rounded-lg transition-all duration-300"
            >
              <svg className="w-4 h-4 text-white group-hover/btn:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path></svg>
              <span className="text-zinc-200 text-sm font-semibold">View Source</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FolderCard;