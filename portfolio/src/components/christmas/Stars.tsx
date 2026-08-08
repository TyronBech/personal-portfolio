import React from "react";
import starsImg from "@/assets/seasonal/christmas/stars.png"

export function Stars(): React.JSX.Element {
  return (
    <img
      src={starsImg}
      alt="Stars"
      className="absolute top-0 right-0 lg:right-30 w-[70%] lg:w-[40%] object-cover pointer-events-none select-none opacity-30 z-0"
    />
  );
}