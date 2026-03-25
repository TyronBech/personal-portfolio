import { urlFor } from "@/data/sanity";
import type { PortfolioData } from "@/types/portfolio";
import type { SanityImageSource } from "@sanity/image-url";

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

// ─── Separator dot ────────────────────────────────────────────────────────────
function Dot() {
  return <span className="text-zinc-700 opacity-50 select-none">•</span>;
}

// ─── A single skill cell ──────────────────────────────────────────────────────
type SkillItem = { name: string; color?: string; svg?: React.ReactNode; icon?: SanityImageSource };

function SkillCell({ skill }: { skill: SkillItem }) {
  const ICON_SIZE = 44;

  return (
    <span
      className="group relative flex items-center justify-center shrink-0 cursor-default px-6"
      style={{ height: ICON_SIZE }}
    >
      {/* Invisible spacer to set track width dynamically based on max size of either text or icon */}
      <span 
        className="font-main font-bold invisible whitespace-nowrap px-4" 
        aria-hidden="true"
        style={{
          fontSize: "clamp(0.9rem, 2vw, 1.15rem)",
          letterSpacing: "-0.02em",
        }}
      >
        {skill.name}
      </span>

      {/* Text layer */}
      <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out group-hover:opacity-0 group-hover:-translate-y-3">
        <span
          className="font-main font-bold text-zinc-400 whitespace-nowrap"
          style={{
            fontSize: "clamp(0.9rem, 2vw, 1.15rem)",
            letterSpacing: "-0.02em",
          }}
        >
          {skill.name}
        </span>
      </span>

      {/* Icon layer */}
      <span className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-3 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 p-1">
        {skill.icon ? (
          <img 
            src={urlFor(skill.icon).url()} 
            alt={`${skill.name} icon`} 
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <span style={{ width: ICON_SIZE, height: ICON_SIZE, display: "flex", justifyContent: "center" }}>
            {skill.svg}
          </span>
        )}
      </span>
    </span>
  );
}

// ─── One marquee row ──────────────────────────────────────────────────────────
function MarqueeRow({ skills, reverse = false }: { skills: SkillItem[], reverse?: boolean }) {
  // Duplicate for seamless loop
  const doubled = [...skills, ...skills];
  const trackClass = reverse ? "marquee-track-right" : "marquee-track-left";

  return (
    <div className="overflow-hidden w-full">
      <div className={`${trackClass} items-center gap-10`}>
        {doubled.map((skill, i) => (
          <span key={i} className="inline-flex items-center gap-10">
            <SkillCell skill={skill} />
            <Dot />
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Fade edge masks ──────────────────────────────────────────────────────────
function EdgeFades() {
  return (
    <>
      <div className="absolute top-0 bottom-0 left-0 w-32 z-10 pointer-events-none bg-linear-to-r from-rich-black to-transparent" />
      <div className="absolute top-0 bottom-0 right-0 w-32 z-10 pointer-events-none bg-linear-to-l from-rich-black to-transparent" />
    </>
  );
}

// ─── Main exported component ──────────────────────────────────────────────────
export default function SkillMarquee({ data }: { data?: PortfolioData | null }) {
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