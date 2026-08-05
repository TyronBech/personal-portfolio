import React from "react";
import { motion } from "framer-motion";
import type { SeasonalThemeType } from "@/lib/seasonalConfig";

interface SeasonalDecorationsProps {
  theme: SeasonalThemeType;
}

export function SeasonalDecorations({ theme }: SeasonalDecorationsProps): React.JSX.Element | null {
  if (theme === "normal") return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden select-none">
      {theme === "halloween" && <HalloweenDecorations />}
      {theme === "christmas" && <ChristmasDecorations />}
    </div>
  );
}

// ─── HALLOWEEN DECORATIONS ───────────────────────────────────────────────────

function HalloweenDecorations(): React.JSX.Element {
  return (
    <>
      {/* Center Screen Halloween Ambient Blur Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 md:w-175 h-125 md:h-175 bg-orange-600/15 rounded-full blur-[140px] pointer-events-none z-0 opacity-25" />
    </>
  );
}

// ─── CHRISTMAS DECORATIONS ──────────────────────────────────────────────────

function ChristmasDecorations(): React.JSX.Element {
  const snowflakes = Array.from({ length: 14 }).map((_, i) => ({
    id: i,
    left: `${(i * 7.5 + (i % 3) * 2) % 100}%`,
    size: 12 + (i % 4) * 6,
    duration: 6 + (i % 5) * 2,
    delay: (i % 4) * 1.5,
  }));

  return (
    <>
      {/* Center Screen Christmas Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 md:w-175 h-125 md:h-175 bg-red-600/10 rounded-full blur-[140px] pointer-events-none z-0 opacity-35" />

      {/* Falling Snowflakes */}
      {snowflakes.map((sf) => (
        <motion.div
          key={sf.id}
          className="fixed top-0 text-white/70 drop-shadow-[0_0_6px_rgba(255,255,255,0.8)] z-30"
          style={{ left: sf.left }}
          initial={{ y: -30, opacity: 0 }}
          animate={{
            y: ["0vh", "105vh"],
            x: [0, 15, -15, 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: sf.duration,
            repeat: Infinity,
            ease: "linear",
            delay: sf.delay,
          }}
        >
          <svg width={sf.size} height={sf.size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14 4L12 8L10 4L12 0ZM12 16L14 20L12 24L10 20L12 16ZM0 12L4 10L8 12L4 14L0 12ZM16 12L20 10L24 12L20 14L16 12ZM3.5 3.5L7.5 6L6 7.5L3.5 3.5ZM16.5 16.5L20.5 19L19 20.5L16.5 16.5ZM20.5 3.5L16.5 6.5L18 8L20.5 3.5ZM3.5 20.5L7.5 17.5L6 16L3.5 20.5Z" />
          </svg>
        </motion.div>
      ))}
    </>
  );
}
