import { details } from "@/data/Information.jsx";
import profile from "@/assets/images/Self.png";

function Main() {
  return (
    <div className="relative overflow-hidden w-screen h-screen">
      {/* Profile Picture */}
      <div className="z-1 absolute -bottom-10 left-1/2 transform -translate-x-1/2">
        <img
          src={profile}
          className="w-140 rounded-t-4xl"
          alt="Profile Picture"
        ></img>
      </div>
      {/* Name */}
      <div className="z-3 absolute bottom-0 w-full text-white text-center">
        <h1 className="text-[150px] font-special-gothic mb-6">
          <span className="text-halloween-orange">{details.first_name}</span>{" "}
          {details.last_name}
        </h1>
      </div>
      {/* Bottom Shadow and Content */}
      <div className="absolute w-screen h-screen">
        <div className="z-2 bg-linear-to-t from-rich-black via-[#1f202256] to-transparent w-full h-2/4 absolute bottom-0"></div>
      </div>
      {/* Content */}
      <div className="z-4 absolute top-0 left-0 w-screen h-screen grid grid-cols-2">
        {/* Left Side */}
        <div className="flex flex-col items-start justify-center mr-62">
          <div className="mb-2 ml-20 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-1.5 text-sm text-zinc-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-halloween-orange"></span>
            </span>
            <span className="tracking-wide text-xs font-lexend capitalize">
              {details.status}
            </span>
          </div>
          <p className="text-white text-5xl tracking-wider font-lexend font-semibold mx-20">{details.role}</p>
        </div>
        {/* Right Side */}
        <div className="flex flex-col items-end justify-center ml-62">
          <p className="mt-7 text-zinc-400 text-xl tracking-wide font-lexend mx-20 text-left">
            {details.message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
