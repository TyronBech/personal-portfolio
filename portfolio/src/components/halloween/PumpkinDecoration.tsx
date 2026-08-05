import React from "react";
import pumpkinImg from "@/assets/seasonal/halloween/pumpkin.png";

export function PumpkinDecoration(): React.JSX.Element {
  return (
    <img
      src={pumpkinImg}
      alt="Pumpkin"
      className="absolute bottom-0 left-[13vw] w-28 md:w-36 lg:w-48 pointer-events-none z-100 select-none"
    />
  );
}
