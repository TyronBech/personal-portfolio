import React from "react";
import giftImg from "@/assets/seasonal/christmas/gift.png";

export function Gift(): React.JSX.Element {
  return (
    <img
      src={giftImg}
      alt="Gift"
      className="absolute bottom-0 right-0 w-70 md:w-110 lg:w-140 object-cover pointer-events-none select-none z-0"
    />
  );
}