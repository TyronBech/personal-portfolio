import React from "react";
import pumpkinImg from "@/assets/seasonal/halloween/pumpkin.png";

export function PumpkinDecoration(): React.JSX.Element {
  return (
    <img
      src={pumpkinImg}
      alt="Pumpkin"
      className="absolute bottom-23 -left-5 lg:bottom-15 lg:left-55 w-28 md:w-36 lg:w-48 pointer-events-none z-100 select-none"
    />
  );
}
