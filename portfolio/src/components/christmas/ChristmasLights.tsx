import React from "react";
import christmasLightImg1 from "@/assets/seasonal/christmas/christmas_light1.png"
import christmasLightImg2 from "@/assets/seasonal/christmas/christmas_light2.png"

export function ChristmasLights(): React.JSX.Element {
  return (
    <>
      <img
        src={christmasLightImg1}
        alt="Christmas Light"
        className="absolute top-40 md:top-60 lg:top-45 left-0 min-w-200 md:min-w-250 lg:w-full object-cover pointer-events-none select-none opacity-75 z-0"
      />
      <img
        src={christmasLightImg2}
        alt="Christmas Light"
        className="absolute bottom-40 lg:bottom-0 right-0 min-w-200 md:min-w-250 lg:w-full object-cover pointer-events-none select-none opacity-75 z-0"
      />
    </>
  );
}