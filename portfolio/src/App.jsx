import { ArrowRight } from "lucide-react";
import GradientText from "./components/GradientText";
import githubIcon from "./assets/svg/GitHub_Invertocat_Black.svg";

function App() {
  return (
    // CHANGE 1: Selection color updated to purple
    <div className="relative min-h-screen w-full bg-black text-white selection:bg-purple-500/30 font-sans flex flex-col items-center justify-center overflow-hidden">
      {/* --- BACKGROUND EFFECTS --- */}
      {/* Grid Pattern (Kept neutral) */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* CHANGE 2: Background Glow updated to purple */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      {/* --- MAIN CONTENT --- */}
      <main className="relative z-10 px-6 text-center max-w-3xl mx-auto">
        {/* Animated Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-1.5 text-sm text-zinc-400 backdrop-blur-md shadow-xl">
          <span className="relative flex h-2 w-2">
            {/* CHANGE 3: Ping animation colors updated to fuchsia/purple for pop */}
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          <span className="tracking-wide text-xs font-mono uppercase">
            Portfolio Under Construction
          </span>
        </div>

        {/* Headline with Decrypted Text Effect (Gradient kept neutral for contrast) */}
        <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-7xl md:text-8xl uppercase font-main">
          <span className="text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-500">
            <GradientText
              colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
              animationSpeed={8}
              showBorder={false}
              className="custom-class"
            >
              Coming Soon
            </GradientText>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mb-10 text-lg text-zinc-400 md:text-xl font-mono">
          Building something new
          {/* CHANGE 4: Terminal cursor updated to purple */}
          <span className="animate-pulse text-purple-500">_</span>
        </p>

        {/* Buttons (Kept monochrome to let the purple accents shine) */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* GitHub Button */}
          <a
            href="https://github.com/TyronBech"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto"
          >
            <button className="group relative w-full sm:w-auto flex items-center justify-center gap-2 bg-white px-8 py-3.5 text-base font-bold text-black transition-all hover:bg-zinc-200 active:scale-95 rounded-lg cursor-pointer">
              <img src={githubIcon} alt="GitHub" className="" />
              <span>Visit GitHub</span>
            </button>
          </a>

          {/* Contact Button */}
          <a href="mailto:tyronbechayda1112@gmail.com" className="w-full sm:w-auto">
            <button className="group w-full sm:w-auto flex items-center justify-center gap-2 border border-zinc-800 bg-black/50 px-8 py-3.5 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-zinc-900 hover:border-zinc-700 active:scale-95 rounded-lg cursor-pointer">
              <span>Contact Me</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-6 w-full text-center">
        <p className="text-xs text-zinc-600 font-mono tracking-widest uppercase">
          React • Tailwind • Vite
        </p>
      </footer>
    </div>
  );
}

export default App;
