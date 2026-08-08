import React from "react";
import christmasTreeImg from "@/assets/seasonal/christmas/christmas_tree.png";

export function ChristmasTree(): React.JSX.Element {
  return (
    <img
      src={christmasTreeImg}
      alt="Christmas Tree"
      className="absolute bottom-10 lg:bottom-0 -left-40 w-[90%] md:w-[60%]  lg:w-[45%] object-cover pointer-events-none select-none opacity-30 z-0"
    />
  );
}