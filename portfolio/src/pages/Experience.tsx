import Camera from "@/assets/images/Camera.png";
import { urlFor } from "@/data/sanity";
import type { PortfolioData } from "@/types/portfolio";

interface ExperienceProps {
  data: PortfolioData | null;
}

const parseStartDate = (dateStr: string): Date => {
  const months: Record<string, number> = {
    January: 0, February: 1, March: 2, April: 3,
    May: 4, June: 5, July: 6, August: 7,
    September: 8, October: 9, November: 10, December: 11,
  };
  const [month, year] = dateStr.split(' ');
  return new Date(parseInt(year), months[month] ?? 0);
};

function Experience({ data }: ExperienceProps): React.JSX.Element {
  const sortedExperiences = data?.experiences
    ? [...data.experiences].sort(
        (a, b) => parseStartDate(b.start_date).getTime() - parseStartDate(a.start_date).getTime()
      )
    : [];

  return(
    <div id="experience" className="overflow-hidden w-screen lg:py-10">
      <div className="grid md:grid-cols-2">
        {/* Left Side - Content */}
        <div className="flex items-center justify-center">
          <div className="max-w-2xl p-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-special-gothic text-white mb-6">
              Experience
            </h1>
            <div className="relative border-l border-zinc-700 ml-3 md:ml-4 mt-6">
              {sortedExperiences.map((experience) => (
                <div key={experience.id} className="mb-10 ml-6 md:ml-8">
                  <span className="absolute flex items-center justify-center w-3 h-3 bg-halloween-orange rounded-full -left-[6.5px] ring-1 ring-zinc-200 mt-2"></span>
                  <p className="mb-2 text-sm font-normal leading-none text-zinc-500 font-lexend">
                    {experience.start_date} - {experience.end_year ?? "Present"}
                  </p>
                  <h3 className="text-lg tracking-wide md:text-xl font-bold mb-3">
                    <span className="text-halloween-orange">{experience.role}</span>
                    <span className="text-gray-300"> at {experience.company}</span>
                  </h3>
                  <ul className="space-y-2 text-zinc-400 text-sm md:text-base tracking-normal leading-5.5 font-lexend">
                    {(Array.isArray(experience.description)
                      ? experience.description
                      : experience.description
                        ? [experience.description]
                        : []
                    ).map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-halloween-orange mr-3 text-lg leading-none mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right Side - Image */}
        <div className="hidden md:flex items-center justify-center">
          <img src={urlFor(data!.experience_image).url()} alt={data?.experience_image_alt} className="w-2/3 rounded-3xl" style={{ filter: 'saturate(2.35) sepia(0.2) hue-rotate(-10deg) brightness(0.8) drop-shadow(0 30px 12px rgba(0,0,0,0.2)) drop-shadow(0 8px 18px rgba(0,0,0,0.15))' }} />
        </div>
      </div>
    </div>
  );
}

export default Experience;