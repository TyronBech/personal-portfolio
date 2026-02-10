import Camera from "@/assets/images/Camera.png";
import { details } from "@/data/Information.jsx";

function Experience() {
  return(
    <div id="experience" className="overflow-hidden w-screen lg:py-10">
      <div className="grid md:grid-cols-2">
        {/* Left Side - Content */}
        <div className="flex items-center justify-center">
          <div className="max-w-2xl p-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-special-gothic text-white mb-6">
              Experience
            </h1>
            <p className="h-auto text-zinc-400 text-base md:text-lg leading-relaxed font-lexend">
              {details.experiences.map((experience) => (
                <div key={experience.id} className="mb-6">
                  <h2 className="text-lg tracking-wider md:text-2xl font-semibold">
                    <span className="text-halloween-orange">{experience.role}</span><span className="text-gray-300 font-semibold"> at {experience.company}</span>
                  </h2>
                  <p className="text-zinc-400 text-sm md:text-base tracking-wide leading-relaxed font-lexend">
                    {experience.description}
                  </p>
                  <p className="text-zinc-200 text-sm md:text-base tracking-wide leading-relaxed font-lexend">
                    {experience.start_year} - {experience.end_year ?? "Present"}
                  </p>
                </div>
              ))}
            </p>
          </div>
        </div>
        {/* Right Side - Image */}
        <div className="hidden md:flex items-center justify-center">
          <img src={Camera} alt="Camera" className="w-2/3 rounded-3xl" style={{ filter: 'saturate(2.35) sepia(0.2) hue-rotate(-10deg) brightness(0.8) drop-shadow(0 30px 12px rgba(0,0,0,0.2)) drop-shadow(0 8px 18px rgba(0,0,0,0.15))' }} />
        </div>
      </div>
    </div>
  );
}

export default Experience;