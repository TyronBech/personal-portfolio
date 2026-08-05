import React from "react";
import bloodyHandImg from "@/assets/seasonal/halloween/bloody_hand.png";

export function BloodyHand(): React.JSX.Element {
  return (
    <img
      src={bloodyHandImg}
      alt="Bloody Hand"
      className="absolute top-4 right-4 md:top-8 md:right-12 w-28 md:w-44 lg:w-56 pointer-events-none z-0 opacity-25 select-none drop-shadow-[0_0_12px_rgba(220,38,38,0.5)]"
    />
  );
}
