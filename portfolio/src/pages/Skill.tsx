import { useState } from "react";
import ScrollVelocity from "@/components/ScrollVelocity";
import type { PortfolioData } from "@/types/portfolio";
import { urlFor } from "@/data/sanity";
import { motion, AnimatePresence } from "framer-motion";

interface SkillProps {
  data: PortfolioData | null;
}

function Skill({ data }: SkillProps): React.JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  if (!data?.skills) return <></>;

  // Convert skills to a layout that fits nicely inside the velocity scroll.
  // We used to join strings, now we render a flex row.
  const skillsList = (
    <div className="flex items-center gap-4 md:gap-8 m-0 p-0 mr-4 md:mr-8 h-28"> 
      {data.skills.map((skill, index) => (
        <div key={index} className="flex items-center justify-center min-w-max gap-4 md:gap-8">
          <AnimatePresence mode="wait">
            {isHovered ? (
              <motion.div
                key="icon"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: "easeIn" }}
                className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center"
              >
                {skill.icon && (
                  <img
                    src={urlFor(skill.icon).url()}
                    alt={skill.name}
                    className="md:w-full h-full object-contain"
                  />
                )}
              </motion.div>
            ) : (
              <motion.div
                key="text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeIn" }}
                className="flex items-center gap-4 md:gap-8"
              >
                <span className="text-inherit">{skill.name}</span>
                <span className="text-zinc-400 opacity-30">•</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );

  return (
    <div 
      className="w-full py-16 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ScrollVelocity
        texts={[skillsList]}
        velocity={70}
        className="text-zinc-700 text-3xl md:text-5xl tracking-tight font-lexend font-bold"
      />
    </div>
  );
}

export default Skill;
