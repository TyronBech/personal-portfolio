import SpotlightCard from "@/components/SpotlightCard.jsx";
import { details } from "@/data/Information.jsx";
import Github from "@/assets/svg/GitHub_Invertocat_White_Clearspace.svg";

function Project() {
  return (
    <div className="overflow-hidden w-screen h-auto lg:h-screen">
      <h1
        id="projects"
        className="text-3xl md:text-4xl lg:text-5xl font-special-gothic text-white mb-12 text-center"
      >
        Projects
      </h1>
      <div className="grid lg:grid-cols-3 gap-12 px-16">
        {details.projects.map((project) => (
          <SpotlightCard
            className="w-full max-w-lg mx-auto h-full"
            spotlightColor="rgba(252, 76, 2, 0.2)"
          >
            {/* 1. Add flex flex-col and h-full to this wrapper */}
            <div key={project.id} className="flex flex-col h-full">
              <img
                src={project.image}
                alt={project.name}
                className="w-full rounded-xl"
              />

              {/* 2. Add flex-1 so this div fills the remaining height */}
              <div
                id="info"
                className="flex flex-col justify-between p-4 flex-1"
              >
                <div className="flex flex-col space-y-2 text-xl md:text-2xl lg:text-3xl font-special-gothic text-white my-4">
                  <span className="text-halloween-orange tracking-wide">{project.name}</span>
                  <span className="text-gray-300 text-xs font-lexend tracking-wide">
                    {project.type} &#8226; {project.year}
                  </span>
                  <p className="text-zinc-400 text-sm md:text-lg leading-relaxed font-lexend mt-3">
                    {project.description}
                  </p>
                </div>
                <div className="space-y-3 mt-2">
                  <p className="text-gray-200 text-sm md:text-lg tracking-tight leading-relaxed font-lexend text-left">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs mr-2 border border-gray-200 rounded-full px-2 py-1"
                      >
                        {tech}
                      </span>
                    ))}
                  </p>
                  <hr className="w-full text-zinc-400" />
                  <p className="text-gray-200 text-md md:text-lg leading-relaxed font-lexend text-left">
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={Github}
                        alt="GitHub Repository"
                        className="inline w-8 h-8"
                      />
                      <span className="ml-2 text-sm">View Repository</span>
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
