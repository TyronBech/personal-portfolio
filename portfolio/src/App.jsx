import { useState } from "react";
import Header from "@/pages/Header";
import Main from "@/pages/Main";
import Skill from "@/pages/Skill";
import About from "@/pages/About";
import Experience  from "@/pages/Experience";
import Project from "@/pages/Project";
import Contact from "@/pages/Contact";
import CameraLoading from "@/components/CameraLoading";
import { usePortfolio } from "@/hooks/usePortfolio";

function App() {
  const { data, loading } = usePortfolio();
  const [showOverlay, setShowOverlay] = useState(true);

  return (
    <div className="relative overflow-hidden bg-rich-black">
      {showOverlay && (
        <>
          <div
            className={`fixed top-0 left-0 z-150 pointer-events-none w-screen h-screen ${!loading ? 'animate-fade-out' : ''}`}
            onAnimationEnd={() => setShowOverlay(false)}
          >
            <CameraLoading running={loading} />
          </div>
          <div className={`fixed top-0 left-0 z-130 bg-rich-black backdrop-blur-2xl w-screen h-screen ${!loading ? 'animate-fade-out' : ''}`}></div>
        </>
      )}
      <Header />
      {!loading && (
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
