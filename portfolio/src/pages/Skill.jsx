import ScrollVelocity from "@/components/ScrollVelocity.jsx";
import { details } from "@/data/Information.jsx";

function Skill() {
  const skillsOneLine = details.skills.join(" • ") + " •";
  return (
    <div className="w-full text-md pt-24">
      <ScrollVelocity
        texts={[skillsOneLine]}
        velocity={50}
        className="text-zinc-700 text-5xl tracking-tight font-lexend"
      />
    </div>
  );
}

export default Skill;
