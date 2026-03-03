import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, ArrowUpRight, Send } from "lucide-react";

const socials = [
  { name: "GitHub", handle: "@UmTioAii", href: "https://github.com/UmTioAii" },
  { name: "LinkedIn", handle: "/in/danielanastacio", href: "#" },
];

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contato" className="py-32 px-4 md:px-8 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-primary font-mono text-sm">05</span>
          <div className="h-px w-16 bg-primary" />
          <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-mono">
            contato
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8"
            >
              Vamos
              <br />
              <span className="text-gradient">construir</span>
              <br />
              juntos<span className="text-primary">_</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-3 mb-12"
            >
              <div className="flex items-center gap-3 text-muted-foreground font-mono text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span>contato@danielanastacio.dev</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground font-mono text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Pouso Alegre - MG, Brasil</span>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {socials.map((social, i) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="group flex items-center justify-between py-4 border-b border-border hover:border-primary/50 transition-colors duration-300"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-medium group-hover:text-primary transition-colors duration-300">
                      {social.name}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {social.handle}
                    </span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 border border-border border-b-0 bg-card">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-primary/60" />
                <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
              </div>
              <span className="text-xs font-mono text-muted-foreground ml-2">
                enviar-mensagem.sh
              </span>
            </div>

            <form
              className="border border-border bg-card/50 p-8 space-y-8"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="space-y-2">
                <label className="text-xs tracking-widest uppercase text-muted-foreground font-mono flex items-center gap-2">
                  <span className="text-primary">$</span> nome
                </label>
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none transition-colors duration-300 font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs tracking-widest uppercase text-muted-foreground font-mono flex items-center gap-2">
                  <span className="text-primary">$</span> email
                </label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none transition-colors duration-300 font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs tracking-widest uppercase text-muted-foreground font-mono flex items-center gap-2">
                  <span className="text-primary">$</span> mensagem
                </label>
                <textarea
                  rows={4}
                  placeholder="Descreva seu projeto..."
                  className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none transition-colors duration-300 font-mono text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-primary text-primary-foreground font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-primary/90 transition-colors duration-300"
              >
                <Send className="w-4 h-4" />
                <span className="font-mono">Enviar Mensagem</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
