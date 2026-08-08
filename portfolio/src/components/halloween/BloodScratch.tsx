import React from "react";
import bloodScratchImg from "@/assets/seasonal/halloween/blood_scratch.png";

export function BloodScratch(): React.JSX.Element {
  return (
    <img
      src={bloodScratchImg}
      alt="Blood Scratch"
      className="absolute top-12 left-0 md:top-20 md:left-2 w-36 md:w-56 lg:w-72 pointer-events-none z-0 opacity-20 select-none drop-shadow-[0_0_10px_rgba(185,28,28,0.4)]"
    />
  );
}
