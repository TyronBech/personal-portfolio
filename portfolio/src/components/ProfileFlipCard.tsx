import React, { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Featured } from "@/types/portfolio";
import { urlFor } from "@/data/sanity";
import { FeaturedFullscreen } from "@/components/Featured";
import type { Options as ConfettiOptions } from "canvas-confetti";

// ─── Types ────────────────────────────────────────────────────────────────────

type FlipState = "normal" | "flipped" | "modal";

interface ProfileFlipCardProps {
  /** The front-face image URL (profile picture) */
  profileImageUrl: string;
  /** All featured items fetched from Sanity */
  featuredItems: Featured[];
  /** Tailwind/CSS class to match the original image's dimensions */
  className?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function fireConfetti(origin: { x: number; y: number }) {
  // Dynamic import keeps Vite's ESM happy (no require())
  const mod = await import("canvas-confetti");
  const confetti = mod.default as (options?: ConfettiOptions) => void;
  const colors = ["#ea580c", "#f97316", "#ffffff", "#a1a1aa"];

  const randomInRange = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  // Fireworks effect: 5 rapid 360-degree bursts around the card
  let bursts = 0;
  const maxBursts = 5;
  
  const interval = setInterval(() => {
    if (bursts >= maxBursts) {
      clearInterval(interval);
      return;
    }

    confetti({
      particleCount: 60,
      spread: 360,
      startVelocity: 35,
      gravity: 1.1,
      ticks: 120,
      colors,
      zIndex: 20000,
      origin: {
        x: origin.x + randomInRange(-0.05, 0.05),
        y: origin.y + randomInRange(-0.05, 0.05),
      },
    });
    bursts++;
  }, 180);
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * ProfileFlipCard
 *
 * 3-state interactive card:
 *  0. "normal"  – shows the profile image; clickable
 *  1. "flipped" – Z-axis flip reveals a random featured item's image + confetti
 *  2. "modal"   – second click expands to a full-screen overlay with details
 *
 * Clicking anywhere while in "modal" state resets back to "normal".
 */
export function ProfileFlipCard({
  profileImageUrl,
  featuredItems,
  className = "",
}: ProfileFlipCardProps): React.JSX.Element {
  const [flipState, setFlipState] = useState<FlipState>("normal");
  const [featured, setFeatured] = useState<Featured | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const pickRandomFeatured = useCallback((): Featured | null => {
    if (!featuredItems || featuredItems.length === 0) return null;
    return featuredItems[Math.floor(Math.random() * featuredItems.length)];
  }, [featuredItems]);

  // Derive origin for confetti from the card's bounding rect
  const getConfettiOrigin = useCallback(() => {
    if (!cardRef.current) return { x: 0.5, y: 0.5 };
    const rect = cardRef.current.getBoundingClientRect();
    return {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
    };
  }, []);

  // ── State machine ──────────────────────────────────────────────────────────

  const handleCardClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      if (flipState === "normal") {
        const item = pickRandomFeatured();
        if (!item) {
          console.warn(
            "[ProfileFlipCard] No featured items found in Sanity. Add documents of type 'featured' to enable the flip.",
          );
          return;
        }
        setFeatured(item);
        setFlipState("flipped");
        setTimeout(() => void fireConfetti(getConfettiOrigin()), 350);
        return;
      }

      if (flipState === "flipped") {
        setFlipState("modal");
        return;
      }
    },
    [flipState, pickRandomFeatured, getConfettiOrigin],
  );

  const resetToNormal = useCallback(() => {
    setFlipState("normal");
  }, []);

  // ESC key also resets
  useEffect(() => {
    if (flipState === "normal") return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") resetToNormal();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [flipState, resetToNormal]);

  // ── Derived values ─────────────────────────────────────────────────────────

  const isFlipped = flipState === "flipped" || flipState === "modal";
  const isModal = flipState === "modal";

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      {/* States 0 & 1: flip card only — no extra rendering */}
      <div
        ref={cardRef}
        className={`relative ${className}`}
        style={{ perspective: "1200px" }}
        onClick={handleCardClick}
      >
        <motion.div
          style={{
            transformStyle: "preserve-3d",
            position: "relative",
            cursor:
              flipState === "normal" || flipState === "flipped"
                ? "pointer"
                : "default",
          }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* FRONT FACE */}
          <div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <img
              src={profileImageUrl}
              className="w-full object-cover rounded-full lg:rounded-t-[3rem] lg:rounded-b-none shadow-2xl lg:shadow-none select-none block"
              alt="Profile Picture"
              draggable={false}
            />
            {flipState === "normal" && (
              <motion.div
                className="absolute inset-0 rounded-full lg:rounded-t-[3rem] lg:rounded-b-none border-3 border-halloween-orange/0 hover:border-halloween-orange/80 transition-colors duration-300"
                transition={{ duration: 0.2 }}
              />
            )}
          </div>

          {/* BACK FACE */}
          <div
            className="absolute inset-0"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {featured?.image ? (
              <img
                src={urlFor(featured.image).url()}
                className="w-full h-full object-cover rounded-full lg:rounded-t-[3rem] lg:rounded-b-none shadow-2xl lg:shadow-none select-none"
                alt={featured.title ?? "Featured"}
                draggable={false}
              />
            ) : (
              <div className="w-full h-full rounded-full lg:rounded-t-[3rem] lg:rounded-b-none bg-zinc-800 flex items-center justify-center">
                <span className="text-zinc-500 text-sm font-lexend">
                  No image
                </span>
              </div>
            )}
            {flipState === "flipped" && (
              <motion.div
                className="absolute inset-0 rounded-full lg:rounded-t-[3rem] lg:rounded-b-none border-3 border-halloween-orange/0 hover:border-halloween-orange/80 transition-colors duration-300 flex items-end justify-center pb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="bg-black/60 backdrop-blur-sm text-white text-xs font-lexend px-3 py-1 rounded-full">
                  tap to expand
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* State 2: portal to document.body — escapes ALL parent stacking contexts */}
      {isModal &&
        featured &&
        createPortal(
          <AnimatePresence>
            <FeaturedFullscreen
              key="featured-fullscreen"
              featured={featured}
              onClose={resetToNormal}
            />
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
