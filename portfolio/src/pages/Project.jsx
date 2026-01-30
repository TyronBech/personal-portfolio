import SpotlightCard from "@/components/SpotlightCard.jsx";
import { details } from "@/data/Information.jsx";

function Project() {
  return (
    <div className="overflow-hidden w-screen h-auto lg:h-screen">
      <h1 id="projects" className="text-3xl md:text-4xl lg:text-5xl font-special-gothic text-white mb-6 text-center mt-12">
        Projects
      </h1>
      <div className="grid md:grid-cols-3 gap-8 px-16"></div>
      {details.projects.map((project) => (
        <SpotlightCard
          className="custom-spotlight-card"
          spotlightColor="rgba(252, 76, 2, 0.2)"
        >
          <div key={project.id} className="p-8">
            <img
              src={project.image}
              alt={project.name}
              className="h-24 rounded-3xl"
            ></img>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-special-gothic text-white mb-4">
              <span className="text-halloween-orange">{project.name}</span>
            </h2>
            <p className="text-zinc-400 text-md md:text-lg leading-relaxed font-lexend">
              {project.description}
            </p>
            <div className="grid md:grid-cols-2 items-center mt-3 gap-4">
              <p className="col-span-3 text-zinc-400 text-md md:text-lg leading-relaxed font-lexend text-left">
                <span className="text-halloween-orange">Tech Stack:</span>{" "}
                {project.technologies.map((tech) => (
                  <span key={tech} className="text-sm mr-2 border border-gray-400 rounded-full px-2 py-1">{tech}</span>
                ))}
              </p>
              <p className="col-span-3 text-zinc-400 text-md md:text-lg leading-relaxed font-lexend text-left">
                <span className="text-halloween-orange">Repository:</span>{" "}
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.repository}
                </a>
              </p>
            </div>
          </div>
        </SpotlightCard>
      ))}
    </div>
  );
}

export default Project;
