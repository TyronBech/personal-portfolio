import { useRef, useEffect, useState } from "react";
import SkillCell from "./SkillCell";
import type { SkillItem } from "./SkillCell";

export function Dot() {
  return <span className="text-zinc-700 opacity-50 select-none">•</span>;
}

export default function MarqueeRow({ skills, reverse = false }: { skills: SkillItem[], reverse?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<number | null>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const half = Math.round(trackRef.current.scrollWidth / 2);
    setOffset(half);
  }, [skills]);

  const doubled = [...skills, ...skills];
  const trackClass = reverse ? "marquee-track-right" : "marquee-track-left";

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={trackRef}
        className={`${trackClass} items-center gap-2`}
        style={
          offset != null
            ? ({ "--marquee-offset": `${offset}px` } as React.CSSProperties)
            : { visibility: "hidden" }
        }
      >
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