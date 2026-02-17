import FolderCard from "@/components/FolderCard";
import { urlFor } from "@/data/sanity";
import Github from "@/assets/svg/GitHub_Invertocat_White_Clearspace.svg";
import type { PortfolioData } from "@/types/portfolio";
import { motion } from "framer-motion";

interface ProjectProps {
  data: PortfolioData | null;
}

function Project({ data }: ProjectProps): React.JSX.Element {
  return (
    <div id="projects" className="w-screen lg:min-h-screen items-center justify-center flex flex-col">
      <h1
        className="text-3xl md:text-4xl lg:text-5xl font-special-gothic text-white mb-10"
      >
        Projects
      </h1>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 px-6 md:px-12 max-w-7xl mx-auto">
        {data?.projects.map((project, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            key={project.id}
          >
            <FolderCard
              title={project.name}
              className="w-full h-full"
              spotlightColor="rgba(252, 76, 2, 0.15)"
            >
              <div className="flex flex-col h-full max-w-sm gap-4">
                {/* Image Section */}
                <div className="relative overflow-hidden rounded-lg border border-neutral-800 aspect-video group">
                  <img
                    src={urlFor(project.project_image).url()}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-1 justify-between space-y-4">
                  {/* Metadata */}
                  <div className="flex items-center justify-between text-xs text-zinc-500 font-mono border-b border-neutral-800 pb-2">
                    <span>{project.type}</span>
                    <span>{project.year}</span>
                  </div>

                  {/* Description */}
                  <p className="text-zinc-400 text-sm leading-relaxed font-lexend">
                    {project.description}
                  </p>

                  {/* Tech Stack & Links */}
                  <div className="pt-2 mt-auto space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[10px] uppercase tracking-wider text-zinc-300 bg-neutral-800 rounded border border-neutral-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center w-full gap-2 py-2 text-sm text-zinc-300 bg-neutral-900 border border-neutral-800 rounded hover:bg-neutral-800 hover:border-halloween-orange/50 hover:text-white transition-all duration-300"
                    >
                      <img
                        src={Github}
                        alt="GitHub"
                        className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity"
                      />
                      <span className="font-lexend">View Source</span>
                    </a>
                  </div>
                </div>
              </div>
            </FolderCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Project;
