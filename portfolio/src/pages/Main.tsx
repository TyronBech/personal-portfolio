import React, { useState } from "react";
import { urlFor } from "@/data/sanity";
import type { PortfolioData } from "@/types/portfolio";
import { motion } from "framer-motion";
import { ProfileFlipCard } from "@/components/ProfileFlipCard";
import { useSeasonalTheme } from "@/hooks/useSeasonalTheme";
import { SeasonalDecorations } from "@/components/SeasonalDecorations";
import { SpiderWebs } from "@/components/halloween";

interface MainProps {
  data: PortfolioData | null;
}

function Main({ data }: MainProps): React.JSX.Element {
  const [isActivated] = useState(() => {
    const featuredWithDate = data?.featured?.find(f => f.date);
    const activationDate = featuredWithDate?.date || "2026-01-01";
    return Date.now() >= new Date(activationDate).getTime();
  });

  const { activeTheme, seasonalProfileImageUrl } = useSeasonalTheme(data);

  const profileImageUrl =
    seasonalProfileImageUrl ?? (data?.profile_image ? urlFor(data.profile_image).url() : "");

  return (
    <div className="relative overflow-hidden w-screen lg:h-screen">
      {/* Dynamic Seasonal Background & Floating PNG Effects */}
      <SeasonalDecorations theme={activeTheme} />

      {/* Halloween Top Corner Webs Component */}
      {activeTheme === "halloween" && <SpiderWebs />}

      {/* --- CONTAINER --- */}
      <div className="relative w-full h-full flex flex-col md:justify-start mt-10 lg:mt-0 lg:justify-center items-center lg:block">
        {/* 1. PROFILE PICTURE (interactive flip card) */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
          className="z-10 order-1 lg:absolute lg:bottom-0 lg:left-1/2 lg:transform lg:-translate-x-1/2"
        >
          <ProfileFlipCard
            profileImageUrl={profileImageUrl}
            featuredItems={data?.featured ?? []}
            className="w-48 md:w-72 lg:w-100 xl:w-118 aspect-square lg:aspect-auto"
            isActivated={isActivated}
            seasonalTheme={activeTheme}
          />
        </motion.div>

        {/* 2. NAME */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ willChange: "transform, opacity" }}
          className="z-30 order-2 mt-6 lg:mt-0 lg:absolute lg:bottom-6 lg:w-full text-center pointer-events-none"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-special-gothic leading-none text-white">
            <span className="text-halloween-orange">{data?.first_name}</span>{" "}
            {data?.last_name}
          </h1>
        </motion.div>

        {/* 3. DATA (Status, Role, Message) */}
        <div className="z-40 order-3 mt-6 lg:mt-0 w-full px-6 lg:absolute lg:inset-0 lg:py-12 lg:grid lg:grid-cols-2 lg:items-center pointer-events-none">
          {/* Left Side (Status & Role) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ willChange: "transform, opacity" }}
            className="flex flex-col items-center lg:w-5/9 lg:items-start justify-center space-y-3 lg:space-y-2"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-1.5 text-zinc-400 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full ${data?.statuses.work ? "bg-green-400" : "bg-red-500"} opacity-75`}
                ></span>
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${data?.statuses.work ? "bg-green-500" : "bg-red-600"}`}
                ></span>
              </span>
              <span className="tracking-wide text-xs md:text-sm lg:text-xs font-lexend capitalize">
                {data?.statuses.work
                  ? "Available for work"
                  : "Currently employed"}
              </span>
            </div>
            {/* Role */}
            <p className="text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-wider font-lexend font-semibold text-center lg:text-left">
              {data?.role}
            </p>
          </motion.div>
          {/* Right Side (Message) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{ willChange: "transform, opacity" }}
            className="flex flex-col items-center lg:w-5/9 lg:justify-self-end justify-center mt-4 lg:mt-0"
          >
            <p className="text-zinc-400 text-sm md:text-base lg:text-lg xl:text-xl tracking-wide font-lexend text-center lg:text-right max-w-md">
              {data?.message}
            </p>
          </motion.div>
        </div>
        {/* GRADIENT SHADOW */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="z-20 w-full h-1/2 absolute bottom-0 bg-linear-to-t from-rich-black via-rich-black/60 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}

export default Main;
