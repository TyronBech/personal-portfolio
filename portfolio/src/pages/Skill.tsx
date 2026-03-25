import type { PortfolioData } from "@/types/portfolio";
import MarqueeRow from "@/components/MarqueeRow";
import EdgeFades from "@/components/EdgeFades";

// ─── Inline styles for the keyframe animation ────────────────────────────────
const MARQUEE_STYLE = `
  @keyframes marquee-left {
    from { transform: translateX(0); }
    to { transform: translateX(calc(-50% - 1.25rem)); }
  }
  @keyframes marquee-right {
    from { transform: translateX(calc(-50% - 1.25rem)); }
    to { transform: translateX(0); }
  }
  .marquee-track-left {
    display: flex;
    width: max-content;
    animation: marquee-left 28s linear infinite;
    will-change: transform;
  }
  .marquee-track-right {
    display: flex;
    width: max-content;
    animation: marquee-right 22s linear infinite;
    will-change: transform;
  }
`;

// ─── Main exported component ──────────────────────────────────────────────────
export default function Skill({ data }: { data?: PortfolioData | null }) {
  const skills = data?.skills && data.skills.length > 0 ? data.skills : [];

  // Split into two rows for visual interest
  const mid = Math.ceil(skills.length / 2);
  const row1 = skills.slice(0, mid);
  const row2 = skills.slice(mid);

  return (
    <>
      <style>{MARQUEE_STYLE}</style>
      <section className="relative w-full bg-rich-black py-14 flex flex-col gap-7 overflow-hidden">
        <EdgeFades />
        <MarqueeRow skills={row1} reverse={false} />
        <MarqueeRow skills={row2} reverse={true} />
      </section>
    </>
  );
}

