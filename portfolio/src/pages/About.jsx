import Teddy from "@/assets/images/Teddy_Bear.png";
import { details } from "@/data/Information.jsx";
import PUPT from "@/assets/svg/PUPT_Logo.svg";

function About() {
  return (
    <div id="about" className="overflow-hidden w-screen h-screen">
      <div className="grid md:grid-cols-2 h-screen w-screen">
        {/* Left Side - Image */}
        <div className="hidden md:flex md:items-center md:justify-center">
          <img src={Teddy} alt="Teddy Bear" className="w-1/2 rounded-3xl" />
        </div>
        {/* Right Side - Text Content */}
        <div className="flex items-center justify-center">
          <div className="max-w-2xl p-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-special-gothic text-white mb-6">
              About <span className="text-halloween-orange">me</span>
            </h1>
            <p className="text-zinc-400 text-md md:text-lg leading-relaxed font-lexend">
              {details.about}
            </p>
            <div className="grid md:grid-cols-4 items-center mt-3 gap-4">
              <img src={PUPT} alt="PUPT Logo" className="hidden md:block m-auto my-3 w-32 rounded-full" />
              <p className="col-span-3 text-zinc-400 text-md md:text-lg leading-relaxed font-lexend text-left">
                <span className="text-halloween-orange">Education:</span>{" "}
                <span className="text-gray-300 font-semibold">{details.school.degree} at {details.school.name}</span>,{" "}
                {details.school.branch} ({details.school.start_year} -{" "}
                {details.school.graduation_year})
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
