import React, { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Featured } from "@/types/portfolio";
import { urlFor } from "@/data/sanity";
import { FeaturedFullscreen } from "@/components/Featured";

// ─── Types ────────────────────────────────────────────────────────────────────

type FlipState = "normal" | "flipped" | "modal";

interface ProfileFlipCardProps {
  profileImageUrl: string;
  featuredItems: Featured[];
  className?: string;
  isActivated: boolean;
  seasonalTheme?: "halloween" | "christmas" | "birthday" | "normal";
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * ProfileFlipCard
 *
 * 3-state interactive card:
 *  0. "normal"  – shows the profile image; clickable
 *  1. "flipped" – Z-axis flip reveals a random featured item's image
 *  2. "modal"   – second click expands to a full-screen overlay with details
 *
 * Clicking anywhere while in "modal" state resets back to "normal".
 */
export function ProfileFlipCard({
  profileImageUrl,
  featuredItems,
  className = "",
  isActivated,
  seasonalTheme = "normal",
}: ProfileFlipCardProps): React.JSX.Element {
  const [flipState, setFlipState] = useState<FlipState>("normal");
  const [featured, setFeatured] = useState<Featured | null>(null);

  const borderHoverClass =
    seasonalTheme === "christmas"
      ? "border-red-500/0 hover:border-red-500/80"
      : seasonalTheme === "halloween"
      ? "border-orange-500/0 hover:border-orange-500/80"
      : seasonalTheme === "birthday"
      ? "border-amber-400/0 hover:border-amber-400/80"
      : "border-halloween-orange/0 hover:border-halloween-orange/80";


  const pickRandomFeatured = useCallback((): Featured | null => {
    if (!featuredItems || featuredItems.length === 0) return null;
    return featuredItems[Math.floor(Math.random() * featuredItems.length)];
  }, [featuredItems]);

  // ── State machine ──────────────────────────────────────────────────────────

  const handleCardClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      if (!isActivated) return;

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
        return;
      }

      if (flipState === "flipped") {
        setFlipState("modal");
        return;
      }
    },
    [flipState, pickRandomFeatured, isActivated],
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
        className={`relative ${className}`}
        style={{ perspective: "1200px" }}
        onClick={handleCardClick}
      >
        <motion.div
          style={{
            transformStyle: "preserve-3d",
            position: "relative",
            cursor:
              (isActivated && flipState === "normal") || flipState === "flipped"
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
              className="w-full aspect-square lg:aspect-auto object-cover rounded-full lg:rounded-t-[3rem] lg:rounded-b-none shadow-2xl lg:shadow-none select-none block"
              alt="Profile Picture"
              draggable={false}
            />
            {flipState === "normal" && isActivated && (
              <motion.div
                className={`absolute inset-0 rounded-full lg:rounded-t-[3rem] lg:rounded-b-none border-3 ${borderHoverClass} transition-colors duration-300`}
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
                className="absolute inset-0 rounded-full lg:rounded-t-[3rem] lg:rounded-b-none border-3 border-halloween-orange/0 hover:border-halloween-orange/80 transition-colors duration-300 flex items-end lg:hidden justify-center pb-4"
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
