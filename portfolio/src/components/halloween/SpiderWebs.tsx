import React from "react";
import spiderWebLeft from "@/assets/seasonal/halloween/spider_web_left.png";
import spiderWebRight from "@/assets/seasonal/halloween/spider_web_right.png";

export function SpiderWebs(): React.JSX.Element {
  return (
    <>
      <img
        src={spiderWebLeft}
        alt="Spider Web Left"
        className="absolute top-0 left-0 w-36 md:w-56 lg:w-72 pointer-events-none z-30 opacity-90 select-none drop-shadow-md invert"
      />
      <img
        src={spiderWebRight}
        alt="Spider Web Right"
        className="absolute top-0 right-0 w-36 md:w-56 lg:w-72 pointer-events-none z-30 opacity-90 select-none drop-shadow-md invert"
      />
    </>
  );
}
