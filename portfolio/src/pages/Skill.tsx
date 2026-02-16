import ScrollVelocity from "@/components/ScrollVelocity";
import type { PortfolioData } from "@/types/portfolio";

interface SkillProps {
  data: PortfolioData | null;
}

function Skill({ data }: SkillProps): React.JSX.Element {
  const skillsOneLine = data?.skills.join("\u00A0•\u00A0") + "\u00A0•\u00A0";
  return (
    <div className="w-full text-base pt-24 pb-12">
      <ScrollVelocity
        texts={[skillsOneLine]}
        velocity={50}
        className="text-zinc-700 text-5xl tracking-tight font-lexend"
      />
    </div>
  );
}

export default Skill;
