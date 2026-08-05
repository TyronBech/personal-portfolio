import React from "react";
import crimeSceneImg from "@/assets/seasonal/halloween/crime_scene.png";

export function CrimeSceneBanner(): React.JSX.Element {
  return (
    <img
      src={crimeSceneImg}
      alt="Crime Scene"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-auto object-cover opacity-20 z-0 pointer-events-none select-none min-h-87.5"
    />
  );
}
