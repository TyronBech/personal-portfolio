import SkillCell from "./SkillCell";
import type { SkillItem } from "./SkillCell";

export function Dot() {
  return <span className="text-zinc-700 opacity-50 select-none">•</span>;
}

export default function MarqueeRow({ skills, reverse = false }: { skills: SkillItem[], reverse?: boolean }) {
  // Duplicate for seamless loop
  const doubled = [...skills, ...skills];
  const trackClass = reverse ? "marquee-track-right" : "marquee-track-left";

  return (
    <div className="overflow-hidden w-full">
      <div className={`${trackClass} items-center gap-10`}>
        {doubled.map((skill, i) => (
          <span key={i} className="inline-flex items-center gap-2">
            <SkillCell skill={skill} />
            <Dot />
          </span>
        ))}
      </div>
    </div>
  );
}
