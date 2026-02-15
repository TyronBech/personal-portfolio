import ScrollVelocity from "@/components/ScrollVelocity.jsx";
import { usePortfolio } from "@/hooks/usePortfolio";

function Skill() {
  const { data, loading } = usePortfolio();

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

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
