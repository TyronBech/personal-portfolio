import { details } from "@/data/Information.jsx";
import profile from "@/assets/images/Self.png";

function Main() {
  return (
    <div className="relative border overflow-hidden w-full h-screen bg-rich-black">

      {/* --- CONTAINER --- */}
      <div className="w-full lg:h-full flex flex-col md:justify-start mt-10 lg:mt-0 lg:justify-center items-center lg:block">

        {/* 1. PROFILE PICTURE */}
        <div className="z-10 order-1 lg:absolute lg:bottom-0 lg:left-1/2 lg:transform lg:-translate-x-1/2">
          <img
            src={profile}
            className="w-48 md:w-64 lg:w-110 xl:w-130 aspect-square lg:aspect-auto object-cover rounded-full lg:rounded-t-[3rem] lg:rounded-b-none shadow-2xl lg:shadow-none"
            alt="Profile Picture"
          />
        </div>

        {/* 2. NAME */}
        <div className="z-30 order-2 mt-6 lg:mt-0 lg:absolute lg:bottom-6 lg:w-full text-center pointer-events-none">
          <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-special-gothic leading-none text-white">
            <span className="text-halloween-orange">{details.first_name}</span>{" "}
            {details.last_name}
          </h1>
        </div>

        {/* 3. DETAILS (Status, Role, Message) */}
        <div className="z-40 order-3 mt-6 lg:mt-0 w-full px-6 lg:absolute lg:inset-0 lg:py-12 lg:grid lg:grid-cols-2 lg:items-center">
          {/* Left Side (Status & Role) */}
          <div className="flex flex-col items-center lg:w-5/9 lg:items-start justify-center space-y-3 lg:space-y-2">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-1.5 text-zinc-400 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="tracking-wide text-xs font-lexend capitalize">
                {details.status}
              </span>
            </div>
            {/* Role */}
            <p className="text-white text-2xl lg:text-3xl xl:text-5xl tracking-wider font-lexend font-semibold text-center lg:text-left">
              {details.role}
            </p>
          </div>
          {/* Right Side (Message) */}
          <div className="flex flex-col items-center lg:w-5/9 lg:justify-self-end justify-center mt-4 lg:mt-0">
            <p className="text-zinc-400 text-sm lg:text-lg xl:text-xl tracking-wide font-lexend text-center lg:text-right max-w-md">
              {details.message}
            </p>
          </div>
        </div>
        {/* GRADIENT SHADOW */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="z-20 w-full h-1/2 absolute bottom-0 bg-linear-to-t from-rich-black via-rich-black/60 to-transparent"></div>
        </div>

      </div>
    </div>
  );
}

export default Main;