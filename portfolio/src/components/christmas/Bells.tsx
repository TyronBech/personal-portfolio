import React from "react";
import bellImg from "@/assets/seasonal/christmas/bells.png";

export function Bells(): React.JSX.Element {
    return (
        <img
            src={bellImg}
            alt="Bell"
            className="absolute -top-5 lg:-top-10 -left-10 lg:-left-20 w-20 md:w-30 lg:w-40 pointer-events-none select-none opacity-70 -z-10 rotate-16"
        />
    );
}