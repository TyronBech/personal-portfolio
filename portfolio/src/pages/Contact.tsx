import { Mail, Phone, Linkedin, Github } from "lucide-react";
import type { PortfolioData } from "@/types/portfolio";
import { motion } from "framer-motion";
import { useSeasonalTheme } from "@/hooks/useSeasonalTheme";
import { PumpkinDecoration } from "@/components/halloween";
import { CrimeSceneBanner } from "@/components/halloween";

interface ContactProps {
  data: PortfolioData | null;
}

function Contact({ data }: ContactProps): React.JSX.Element {
  const { activeTheme } = useSeasonalTheme(data);

  const text = activeTheme !== "normal" ? "text-sm md:text-base text-white font-lexend max-w-md mx-auto" : "text-sm md:text-base text-zinc-400 font-lexend max-w-md mx-auto";

  return (
    <div
      id="contact"
      className="relative w-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* Halloween Pumpkin Component at Very Bottom Left */}
      {activeTheme === "halloween" && <PumpkinDecoration />}
      {/* Halloween Crime Scene Banner Component */}
      {activeTheme === "halloween" && <CrimeSceneBanner />}

      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6 }}
        style={{ willChange: "transform, opacity" }}
        className="text-center mb-12 z-10"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-special-gothic text-white mb-4">
          Let's <span className="text-halloween-orange">Connect</span>
        </h1>
        <p className={text}>
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your vision.
        </p>
        <p className={text}>
          Feel free to reach out through any of the platforms below!
        </p>
      </motion.div>

      {/* Main Contact Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.2, type: "spring", bounce: 0.3 }}
        style={{ willChange: "transform, opacity" }}
        className="w-full max-w-4xl bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Side: Direct Contact */}
          <div className="space-y-8">
            <h3 className="text-2xl font-special-gothic text-white italic">
              Drop a line
            </h3>

            <div className="space-y-6">
              <motion.a
                whileHover={{ scale: 1.02, x: 5 }}
                href={`mailto:${data?.email}`}
                className="group flex items-center gap-4 text-zinc-300 hover:text-halloween-orange transition-colors"
              >
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-halloween-orange/50 transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider font-lexend font-medium">
                    Email
                  </p>
                  <p className="font-lexend font-medium text-sm md:text-base">
                    {data?.email}
                  </p>
                </div>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02, x: 5 }}
                href={`tel:${data?.phone}`}
                className="group flex items-center gap-4 text-zinc-300 hover:text-halloween-orange transition-colors"
              >
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-halloween-orange/50 transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider font-lexend font-medium">
                    Phone
                  </p>
                  <p className="font-lexend font-medium text-sm md:text-base">
                    {data?.phone}
                  </p>
                </div>
              </motion.a>
            </div>
          </div>

          {/* Right Side: Social Media */}
          <div className="space-y-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-special-gothic text-white italic mb-6">
                Connect Elsewhere
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {data?.socials.map((social) => {
                  let Icon = Mail;
                  if (social.name.toLowerCase().includes("linkedin"))
                    Icon = Linkedin;
                  if (social.name.toLowerCase().includes("github"))
                    Icon = Github;

                  return (
                    <motion.a
                      key={social.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-halloween-orange/50 hover:bg-white/10 transition-all group"
                    >
                      <Icon className="w-5 h-5 text-zinc-400 group-hover:text-halloween-orange transition-colors" />
                      <span className="font-lexend font-medium text-sm text-zinc-300 group-hover:text-white transition-colors">
                        {social.name}
                      </span>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-between items-center text-xs text-zinc-500 font-lexend">
              <span>Location:</span>
              <span className="text-zinc-300 font-medium">
                {data?.address.city}, {data?.address.country}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Footer-like text */}
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{ willChange: "opacity" }}
        className="mt-12 text-zinc-600 text-xs font-lexend tracking-widest uppercase"
      >
        © {new Date().getFullYear()} — Built with Passion
      </motion.p>
    </div>
  );
}

export default Contact;
