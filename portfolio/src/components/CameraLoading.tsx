import { useState, useEffect } from "react";
import '../index.css'

interface CameraLoadingProps {
  running?: boolean;
}

const CameraLoading: React.FC<CameraLoadingProps> = ({ running = true }) => {
  const [ms, setMs] = useState<number>(0);
  const [shouldCount, setShouldCount] = useState<boolean>(true);

  useEffect(() => {
    if (!running) {
      const timeout = setTimeout(() => {
        setShouldCount(false);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [running]);

  useEffect(() => {
    if (!shouldCount) return;
    const interval = setInterval(() => {
      setMs((m) => m + 10);
    }, 10);
    return () => clearInterval(interval);
  }, [shouldCount]);

  const mins = String(Math.floor(ms / 60000)).padStart(2, '0');
  const secs = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
  const micro = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');

  return (
    <div className="relative text-white w-screen h-screen">
        {/* Corner lines */}
        <div className="absolute top-10 left-10 w-20 h-14 border-t-2 border-l-2 md:w-36 md:h-26 md:border-t-3 md:border-l-3 border-white"></div>
        <div className="absolute top-10 right-10 w-20 h-14 border-t-2 border-r-2 md:w-36 md:h-26 md:border-t-3 md:border-r-3 border-white"></div>
        <div className="absolute bottom-10 left-10 w-20 h-14 border-b-2 border-l-2 md:w-36 md:h-26 md:border-b-3 md:border-l-3 border-white"></div>
        <div className="absolute bottom-10 right-10 w-20 h-14 border-b-2 border-r-2 md:w-36 md:h-26 md:border-b-3 md:border-r-3 border-white"></div>
        {/* Crosshair */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-18 h-15 md:w-36 md:h-26">
          <div className="relative w-full h-full">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-5 h-5 md:w-6 md:h-6 border-t-2 border-l-2 border-white"></div>
            <div className="absolute top-0 right-0 w-5 h-5 md:w-6 md:h-6 border-t-2 border-r-2 border-white"></div>
            <div className="absolute bottom-0 left-0 w-5 h-5 md:w-6 md:h-6 border-b-2 border-l-2 border-white"></div>
            <div className="absolute bottom-0 right-0 w-5 h-5 md:w-6 md:h-6 border-b-2 border-r-2 border-white"></div>
            {/* Crosshair lines */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 md:w-8 h-0.5 bg-white"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-0.5 md:h-8 bg-white"></div>
          </div>
        </div>
        {/* Text */}
        <div className="absolute top-3/5 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-sm md:text-md capitalize font-special-gothic font-light tracking-widest animate-pulse">Loading Portfolio...</p>
        </div>
        {/* Timer */}
        <div className="absolute top-14 left-14 text-lg font-semibold md:top-17 md:left-18 font-lexend md:text-2xl md:font-bold tracking-widest">
          <span>{mins}:{secs}:{micro}</span>
        </div>
        {/* Recording indicator */}
        <div className="absolute top-14 right-15 md:top-18 md:right-19 flex items-center gap-2 md:gap-3 font-special-gothic">
          <span className="w-3 h-3 md:w-4.5 md:h-4.5 bg-red-700 rounded-full animate-pulse"></span>
          <span className="text-lg md:text-2xl font-bold tracking-widest">REC</span>
        </div>
        {/* Zoom indicator */}
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2">
          {/* Zoom bars */}
          {[...Array(26)].map((_, i) => (
            i % 5 === 0 ? (
              <div key={i} className="w-5 h-px md:h-0.5 mb-1 bg-white"></div>
            ) : (
              <div key={i} className="w-3 h-px md:h-0.5 mb-1 bg-white"></div>
            )
          ))}
          {/* Zoom pointer */}
          <span className="absolute top-1/2 left-1/2 transform translate-x-4 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-8 md:border-t-[6px] border-t-transparent md:border-b-[6px] border-b-transparent md:border-r-10 border-r-white"></span>
        </div>
        {/* Battery indicator */}
        <div className="absolute bottom-15 left-15 md:bottom-18 md:left-18 flex items-center">
          <div className="w-12 h-5 md:w-17 md:h-6 border-2 border-white rounded-sm flex items-center justify-start px-1">
            <div className="w-7 md:w-10 h-2 md:h-3 bg-white" style={{ clipPath: 'polygon(0 0, 100% 100%, 100% 100%, 0 100%)' }}></div>
          </div>
          <div className="w-0.5 md:w-1 h-2.5 md:h-3 bg-white rounded-tr-sm rounded-br-sm"></div>
        </div>
        {/* Camera icon */} 
        <div className="absolute bottom-15 md:bottom-18 left-1/2 transform -translate-x-1/2">
          {/* Corner brackets */}
          <div className="absolute -top-1.5 -right-1.5 md:-top-1 md:-right-2 w-3 h-3 md:w-4 md:h-4 border-t-2 border-r-2 border-white"></div>
          <div className="absolute -bottom-1.5 -left-1.5 md:-bottom-2 md:-left-2 w-3 h-3 md:w-4 md:h-4 border-b-2 border-l-2 border-white"></div>
          {/* Camera body */}
          <div className="flex justify-center items-start w-10 h-6 md:w-15 md:h-9 border-2 border-white rounded-md">
            <div className="relative w-full h-full">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 md:w-6 h-2 border-2 border-white border-b-transparent rounded-t-sm bg-rich-black"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white w-3.5 h-3.5 md:w-6 md:h-6 rounded-full"></div>
            </div>
          </div>
        </div>
        {/* Resolution labels */}
        <div className="absolute bottom-15 right-13 md:bottom-18 md:right-16 font-special-gothic grid grid-cols-1 gap-1 px-3 py-1">
          <span className="text-sm md:text-xl font-extrabold tracking-wider text-right px-2 mb-4 md:mb-9">4K</span>
          <span className="text-sm md:text-xl font-extrabold tracking-wider text-right px-2 mb-4 md:mb-9">HD</span>
          <span className="text-sm md:text-xl text-black font-bold tracking-wide bg-white rounded-md px-1.5 py-0.3">RAW</span>
        </div>
      </div>
  );
};

export default CameraLoading;