import React from "react";
import christmasBallsImg from "@/assets/seasonal/christmas/christmas_balls.png"

export function ChristmasBalls(): React.JSX.Element {
    return (
        <img
            src={christmasBallsImg}
            alt="Christmas Balls"
            className="absolute top-0 right-0 lg:right-30 w-[70%] lg:w-[40%] object-cover pointer-events-none select-none opacity-60 z-1"
        />
    );
}