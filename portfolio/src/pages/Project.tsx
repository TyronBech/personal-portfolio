import FolderCard from "@/components/FolderCard";
import Github from "@/assets/svg/GitHub_Invertocat_White_Clearspace.svg";
import type { PortfolioData } from "@/types/portfolio";
import { motion } from "framer-motion";

interface ProjectProps {
  data: PortfolioData | null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const
    } 
  }
};

function Project({ data }: ProjectProps): React.JSX.Element {
  return (
    <div id="projects" className="w-screen lg:min-h-screen items-center justify-center flex flex-col">
      <h1
        className="text-3xl md:text-4xl lg:text-5xl font-special-gothic text-white mb-10"
      >
        Projects
      </h1>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 px-6"
      >
        {data?.projects.map((project, index) => (
          <motion.div key={index} variants={cardVariants} className="h-full">
            <FolderCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Project;
