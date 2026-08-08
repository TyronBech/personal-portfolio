import React from "react";
import spider from "@/assets/seasonal/halloween/spiders.png";

export function Spiders(): React.JSX.Element {
  return (
    <>
      <img
        src={spider}
        alt="Spider"
        className="absolute top-0 left-20 md:left-30 lg:left-60 w-36 md:w-46 lg:w-56 pointer-events-none z-0 opacity-50 select-none drop-shadow-md invert"
      />
    </>
  );
}