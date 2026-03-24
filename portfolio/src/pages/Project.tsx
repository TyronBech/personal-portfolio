import FolderCard from "@/components/FolderCard";
import type { PortfolioData } from "@/types/portfolio";
import { motion } from "framer-motion";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState } from "react";

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

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

function Project({ data }: ProjectProps): React.JSX.Element {
  const [isRendered, setIsRendered] = useState(false);

  const sortedProjects = data?.projects 
    ? [...data.projects].sort((a, b) => (a.id ?? 0) - (b.id ?? 0))
    : [];

  return (
    <div id="projects" className="w-full lg:min-h-screen items-center justify-end flex flex-col pt-20 pb-2">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-special-gothic text-white mb-6">
        Projects
      </h1>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        onAnimationComplete={() => setIsRendered(true)}
        style={{ willChange: "opacity" }}
        className="w-full max-w-[97%] mx-auto px-4 md:px-8"
      >
        {sortedProjects.length > 0 && (
          <div className="relative">
            <div
              className="absolute left-0 top-0 h-full w-3 md:w-12 z-10 pointer-events-none bg-linear-to-r from-rich-black via-rich-black/50 to-transparent"
            />
            <div
              className="absolute right-0 top-0 h-full w-3 md:w-12 z-10 pointer-events-none bg-linear-to-l from-rich-black via-rich-black/50 to-transparent"
            />
            <Carousel
              responsive={responsive}
              infinite={true}
              autoPlay={isRendered}
              autoPlaySpeed={4000}
              keyBoardControl={true}
              customTransition="transform 500ms ease-in-out"
              transitionDuration={500}
              containerClass="carousel-container"
              arrows={false}
              itemClass="px-3 pb-8"
              showDots={true}
              renderDotsOutside={true}
              dotListClass="custom-dot-list-style"
              className="pt-3"
            >
              {sortedProjects.map((project, index) => (
                <motion.div key={index} variants={cardVariants} style={{ willChange: "transform, opacity" }} className="h-full w-full mx-auto">
                  <FolderCard project={project} />
                </motion.div>
              ))}
            </Carousel>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Project;