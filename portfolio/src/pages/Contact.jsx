import { details } from "@/data/Information.jsx";
import { Mail, Phone, Linkedin, Github, ArrowRight } from 'lucide-react';

function Contact() {
  return (
    <div id="contact" className="w-screen flex flex-col items-center justify-center px-6 py-24">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-special-gothic text-white mb-4">
          Let's <span className="text-halloween-orange">Connect</span>
        </h1>
        <p className="text-sm md:text-base text-zinc-400 font-lexend max-w-md mx-auto">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. 
        </p>
        <p className="text-sm md:text-base text-zinc-400 font-lexend max-w-md mx-auto">
          Feel free to reach out through any of the platforms below!
        </p>
      </div>

      {/* Main Contact Card */}
      <div className="w-full max-w-4xl bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Left Side: Direct Contact */}
          <div className="space-y-8">
            <h3 className="text-2xl font-special-gothic text-white italic">Drop a line</h3>
            
            <div className="space-y-6">
              <a href={`mailto:${details.email}`} className="group flex items-center gap-4 text-zinc-300 hover:text-halloween-orange transition-colors">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-halloween-orange/50 transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-lexend uppercase tracking-widest">Email Me</p>
                  <p className="text-xs md:text-base font-lexend">{details.email}</p>
                </div>
              </a>

              <a href={`tel:${details.phone}`} className="group flex items-center gap-4 text-zinc-300 hover:text-halloween-orange transition-colors">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-halloween-orange/50 transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-lexend uppercase tracking-widest">Call Me</p>
                  <p className="text-xs md:text-base font-lexend">{details.phone}</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Side: Socials & Extras */}
          <div className="flex flex-col justify-between">
            <h3 className="text-2xl font-special-gothic text-white italic mb-6 md:mb-0">Social Spaces</h3>
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <a 
                href={details.socials[1].url} 
                target="_blank" 
                className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-halloween-orange/10 hover:border-halloween-orange/50 transition-all group"
              >
                <Linkedin className="w-8 h-8 text-zinc-400 group-hover:text-halloween-orange mb-2" />
                <span className="text-sm md:text-base font-lexend text-zinc-300">{details.socials[1].name}</span>
              </a>

              <a 
                href={details.socials[0].url} 
                target="_blank" 
                className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-halloween-orange/10 hover:border-halloween-orange/50 transition-all group"
              >
                <Github className="w-8 h-8 text-zinc-400 group-hover:text-halloween-orange mb-2" />
                <span className="text-sm font-lexend text-zinc-300">{details.socials[0].name}</span>
              </a>
            </div>

            {/* A "Status" indicator makes it feel live */}
            <div className="mt-8 flex items-center gap-2 text-zinc-500 text-sm font-lexend">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              Available for new projects
            </div>
          </div>

        </div>
      </div>
      {/* Footer-like text */}
      <p className="mt-12 text-zinc-600 text-xs font-lexend tracking-widest uppercase">
        © {new Date().getFullYear()} — Built with Passion
      </p>
    </div>
  );
}

export default Contact;