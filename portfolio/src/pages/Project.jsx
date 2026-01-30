import SpotlightCard from "@/components/SpotlightCard.jsx";
import { details } from "@/data/Information.jsx";
import Github from "@/assets/svg/GitHub_Invertocat_White_Clearspace.svg";

function Project() {
  return (
    <div className="w-full min-h-screen border border-orange-500 py-20 bg-rich-black">
      <h1
        id="projects"
        className="text-3xl md:text-4xl lg:text-5xl font-special-gothic text-white mb-12 text-center"
      >
        Projects
      </h1>

      {/* Projects Grid */}
      <div className="grid lg:grid-cols-3 gap-8 px-8 md:px-16">
        {details.projects.map((project) => (
          <SpotlightCard
            key={project.id}
            // 5. ADDED: h-full (Ensures all cards in a row are the same height)
            className="w-full max-w-lg mx-auto h-full"
            spotlightColor="rgba(252, 76, 2, 0.2)"
          >
            <div className="flex flex-col h-full">
              <img
                src={project.image}
                alt={project.name}
                className="w-[95%] rounded-xl mx-auto mt-2 object-cover"
              />
              <div className="flex flex-col justify-between p-4 flex-1">
                <div className="flex flex-col space-y-2 text-xl md:text-2xl lg:text-3xl font-special-gothic text-white my-4">
                  <span className="text-halloween-orange tracking-wide">
                    {project.name}
                  </span>
                  <span className="text-gray-300 text-xs font-lexend tracking-wide">
                    {project.type} &#8226; {project.year}
                  </span>
                  <p className="text-zinc-400 text-sm md:text-lg leading-relaxed font-lexend mt-3">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-3 mt-2">
                  <div className="flex flex-wrap gap-2 text-gray-200 text-sm md:text-lg tracking-tight leading-relaxed font-lexend text-left">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs border border-gray-200 rounded-full px-2 py-1 whitespace-nowrap"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <hr className="w-full text-zinc-400" />
                  <p className="text-gray-200 text-sm md:text-lg leading-relaxed font-lexend text-left">
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-halloween-orange transition-colors inline-flex items-center"
                    >
                      <img
                        src={Github}
                        alt="GitHub Repository"
                        className="inline w-6 h-6 md:w-8 md:h-8"
                      />
                      <span className="ml-2 text-xs md:text-sm">
                        View Repository
                      </span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
}

export default Project;
