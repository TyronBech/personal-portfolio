import type { PortfolioData } from "@/types/portfolio";
import MarqueeRow from "@/components/MarqueeRow";
import EdgeFades from "@/components/EdgeFades";

// ─── Main exported component ──────────────────────────────────────────────────
export default function Skill({ data }: { data?: PortfolioData | null }) {
  const skills = data?.skills && data.skills.length > 0 ? data.skills : [];

  // Split into two rows for visual interest
  const mid = Math.ceil(skills.length / 2);
  const row1 = skills.slice(0, mid);
  const row2 = skills.slice(mid);

  return (
    <section className="relative w-full bg-rich-black py-18 flex flex-col gap-7 overflow-hidden">
      <EdgeFades />
      <MarqueeRow skills={row1} reverse={false} />
      <MarqueeRow skills={row2} reverse={true} />
    </section>
  );
}

