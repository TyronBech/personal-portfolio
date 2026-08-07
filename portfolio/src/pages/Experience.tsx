import { urlFor } from "@/data/sanity";
import type { DataProps } from "@/types/portfolio";
import { motion } from "framer-motion";
import { useSeasonalTheme } from "@/hooks/useSeasonalTheme";
import { BloodScratch } from "@/components/halloween";

const parseStartDate = (dateStr: string): Date => {
  const months: Record<string, number> = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };
  const [month, year] = dateStr.split(" ");
  return new Date(parseInt(year), months[month] ?? 0);
};

function Experience({ data }: DataProps): React.JSX.Element {
  const { activeTheme } = useSeasonalTheme(data);

  const sortedExperiences = data?.experiences
    ? [...data.experiences].sort(
        (a, b) =>
          parseStartDate(b.start_date).getTime() -
          parseStartDate(a.start_date).getTime(),
      )
    : [];

  return (
    <div id="experience" className="relative overflow-hidden w-screen lg:py-10">
      {/* Halloween Blood Scratch Component */}
      {activeTheme === "halloween" && <BloodScratch />}

      <div className="grid lg:grid-cols-2">
        {/* Left Side - Content */}
        <div className="flex items-center justify-center">
          <div className="max-w-2xl p-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.5 }}
              style={{ willChange: "transform, opacity" }}
              className="text-3xl md:text-4xl lg:text-5xl font-special-gothic text-white mb-6"
            >
              Experience
            </motion.h1>
            <div className="relative border-l border-zinc-700 ml-3 md:ml-4 mt-6">
              {sortedExperiences.map((experience, index) => (
                <div key={experience.id}>
                  <span className="absolute flex items-center justify-center w-3 h-3 bg-halloween-orange rounded-full left-[-6.5px] ring-1 ring-zinc-200 mt-2"></span>
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    style={{ willChange: "transform, opacity" }}
                    className="mb-7 ml-6 md:ml-8"
                  >
                    <span className="text-xs md:text-sm font-lexend text-zinc-400">
                      {experience.start_date} - {experience.end_year ?? "Present"}
                    </span>
                    <h3 className="text-xl md:text-2xl font-lexend font-bold text-white mt-1">
                      {experience.role}
                    </h3>
                    <h4 className="text-sm md:text-lg font-lexend text-halloween-orange font-medium">
                      {experience.company}
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {experience.description.map((desc, descIndex) => (
                        <li
                          key={descIndex}
                          className="text-zinc-400 text-xs md:text-base font-lexend list-disc ml-4"
                        >
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        {data?.experience_image && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            style={{ willChange: "transform, opacity" }}
            className="hidden lg:flex items-center justify-center p-8"
          >
            <img
              src={urlFor(data.experience_image).url()}
              alt={data.experience_image_alt ?? "Experience"}
              className="w-2/3 max-w-lg rounded-3xl object-cover saturate-180"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Experience;
