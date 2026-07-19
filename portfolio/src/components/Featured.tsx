import React, { useEffect } from "react";
import { motion } from "framer-motion";
import type { Featured } from "@/types/portfolio";
import { urlFor } from "@/data/sanity";
import type { Options as ConfettiOptions } from "canvas-confetti";

async function fireSideConfetti() {
  const m = await import("canvas-confetti");
  const confetti = m.default as (options?: ConfettiOptions) => void;
  const colors = ["#ea580c", "#f97316", "#ffffff", "#a1a1aa"];
  const duration = 1500;
  const animationEnd = Date.now() + duration;

  (function frame() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return;
    }

    // Fire from left edge
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 80,
      origin: { x: -0.01, y: 0.65 },
      colors,
      startVelocity: 40,
      zIndex: 200,
    });

    // Fire from right edge
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 80,
      origin: { x: 1.01, y: 0.65 },
      colors,
      startVelocity: 40,
      zIndex: 200,
    });

    requestAnimationFrame(frame);
  })();
}

interface FeaturedFullscreenProps {
  featured: Featured;
  onClose: () => void;
}

/**
 * FeaturedFullscreen
 *
 * Mounted via createPortal directly on document.body so it is 100% independent
 * of any parent stacking context. Covers the entire viewport (100vw × 100vh).
 *
 * Layout (vertical, centred):
 *   dark overlay → featured image → header → sub-header → description
 *
 * Clicking anywhere on this component dismisses it.
 */
export function FeaturedFullscreen({
  featured,
  onClose,
}: FeaturedFullscreenProps): React.JSX.Element {
  useEffect(() => {
    // Fire side-by-side confetti exactly when the fullscreen modal mounts
    const timer = setTimeout(() => {
      void fireSideConfetti();
    }, 150); // Slight delay so the overlay starts fading in first
    return () => clearTimeout(timer);
  }, []);

  return (
    // Single root div: fixed inset-0 = 100vw × 100vh, covers EVERYTHING
    <div
      className="fixed inset-0 flex flex-col items-center justify-center gap-5 overflow-hidden"
      style={{ zIndex: 9999 }}
      onClick={onClose}
    >
      {/* Dark backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
      />

      {/* Content layer — above backdrop, pointer-events forwarded to root for click-to-close */}
      <div className="relative z-10 flex flex-col items-center gap-5 px-6 w-full">
        {/* Featured image — height-capped so all text fits within 100vh */}
        {featured.image && (
          <motion.img
            src={urlFor(featured.image).url()}
            alt={featured.title}
            className="max-h-[55vh] w-auto rounded-3xl object-contain select-none"
            draggable={false}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
        )}

        {/* Header */}
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-special-gothic text-white text-center leading-tight"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.18 }}
        >
          {featured.header}
        </motion.h2>

        {/* Sub header */}
        {featured.subHeader && (
          <motion.p
            className="text-halloween-orange font-lexend font-semibold text-lg sm:text-2xl tracking-widest uppercase text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.26 }}
          >
            {featured.subHeader}
          </motion.p>
        )}

        {/* Description */}
        {featured.description && (
          <motion.p
            className="text-zinc-300 font-lexend text-sm sm:text-base leading-relaxed text-center max-w-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.34 }}
          >
            {featured.description}
          </motion.p>
        )}

        {/* Dismiss hint */}
        <motion.p
          className="text-halloween-orange text-xs font-lexend hover:scale-110 transition-all duration-300 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          tap anywhere to close
        </motion.p>
      </div>
    </div>
  );
}
