import { useState, useEffect } from "react";
import Header from "@/pages/Header";
import Main from "@/pages/Main";
import Skill from "@/pages/Skill";
import About from "@/pages/About";
import Experience from "@/pages/Experience";
import Project from "@/pages/Project";
import Contact from "@/pages/Contact";
import CameraLoading from "@/components/CameraLoading";
import { usePortfolio } from "@/hooks/usePortfolio";
import { urlFor } from "@/data/sanity";

function App(): React.JSX.Element {
  const { data, loading } = usePortfolio();
  const [showOverlay, setShowOverlay] = useState<boolean>(true);
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (data && !loading) {
      // Gather images that need preloading
      const imageUrls = [
        data.profile_image ? urlFor(data.profile_image).url() : null,
        data.about_image ? urlFor(data.about_image).url() : null,
        data.experience_image ? urlFor(data.experience_image).url() : null,
        ...(data.projects?.map(project => project.project_image ? urlFor(project.project_image).url() : null) || [])
      ].filter(Boolean) as string[];

      if (imageUrls.length === 0) {
        setImagesLoaded(true);
        return;
      }

      let loadedCount = 0;
      const handleLoad = () => {
        loadedCount++;
        if (loadedCount === imageUrls.length) {
          setImagesLoaded(true);
        }
      };

      imageUrls.forEach((url) => {
        const img = new Image();
        img.onload = handleLoad;
        img.onerror = handleLoad; // Proceed even if one fails
        img.src = url;
      });
    }
  }, [data, loading]);

  const isFullyLoaded = !loading && imagesLoaded;

  return (
    <div className="relative overflow-hidden bg-rich-black min-h-screen">
      {showOverlay && (
        <>
          <div
            className={`fixed top-0 left-0 z-150 pointer-events-none w-screen h-screen ${isFullyLoaded ? 'animate-fade-out' : ''}`}
            onAnimationEnd={() => setShowOverlay(false)}
          >
            <CameraLoading running={!isFullyLoaded} />
          </div>
          <div className={`fixed top-0 left-0 z-130 bg-rich-black backdrop-blur-2xl w-screen h-screen ${isFullyLoaded ? 'animate-fade-out' : ''}`}></div>
        </>
      )}
      <Header />
      {isFullyLoaded && (
        <>
          <Main data={data} />
          <Skill data={data} />
          <About data={data} />
          <Experience data={data} />
          <Project data={data} />
          <Contact data={data} />
        </>
      )}
    </div>
  );
}

export default App;
