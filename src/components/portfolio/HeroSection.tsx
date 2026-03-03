import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Terminal } from "lucide-react";
import Scene3D from "./Scene3D";
import TerminalTyped from "./TerminalTyped";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const codeStrings = [
    "const dev = new FullStackDev();",
    "dev.name = 'Daniel Anastácio';",
    "dev.skills = ['React', 'Node.js', 'TypeScript'];",
    "dev.passion = 'Frontend Architecture';",
    "await dev.buildAmazingThings();",
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <Scene3D />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] z-[1]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Terminal badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-10"
        >
          <Terminal className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs text-muted-foreground tracking-widest uppercase font-mono">
            Desenvolvedor Full-Stack · Foco em Frontend
          </span>
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <h1
            className="text-[clamp(2.5rem,9vw,6rem)] font-extrabold leading-[0.95] tracking-tighter mb-2"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            <span className="text-foreground">DANIEL</span>
          </h1>
          <h1
            className="text-[clamp(2.5rem,9vw,6rem)] font-extrabold leading-[0.95] tracking-tighter"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            <span className="text-gradient glow-text">ANASTÁCIO</span>
            <span className="text-primary">_</span>
          </h1>
        </motion.div>

        {/* Terminal typing effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-10 mb-10 inline-flex items-center gap-3 px-6 py-4 bg-card/80 backdrop-blur-md border border-border font-mono text-sm"
        >
          <span className="text-primary">❯</span>
          <TerminalTyped
            strings={codeStrings}
            className="text-muted-foreground"
            typeSpeed={40}
            backSpeed={20}
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Desenvolvedor Full-Stack com foco em{" "}
          <span className="text-primary font-medium">Frontend</span> —
          criando interfaces de alta performance com{" "}
          <span className="text-foreground">React</span>,{" "}
          <span className="text-foreground">TypeScript</span> e{" "}
          <span className="text-foreground">Node.js</span>.
        </motion.p>

        {/* Tech badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex flex-wrap justify-center gap-2 mt-8 mb-12"
        >
          {["React", "TypeScript", "Node.js", "Python", "PHP", "CSS", "HTML", "JS"].map(
            (tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-mono border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-300"
              >
                {tech}
              </span>
            )
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projetos"
            className="group relative px-8 py-4 bg-primary text-primary-foreground font-bold text-sm tracking-wider uppercase overflow-hidden glow-sm"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>Ver Projetos</span>
              <span className="font-mono text-xs opacity-60">~/projects</span>
            </span>
          </a>
          <a
            href="#contato"
            className="px-8 py-4 border border-border text-foreground font-semibold text-sm tracking-wider uppercase hover:border-primary hover:text-primary transition-colors duration-300"
          >
            <span className="flex items-center gap-2">
              <span>Contato</span>
              <span className="font-mono text-xs text-muted-foreground">→</span>
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-xs text-muted-foreground tracking-widest uppercase font-mono">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-primary" />
        </motion.div>
      </motion.div>

      {/* Side decoration */}
      <motion.div
        className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary to-transparent mx-auto" />
        <span
          className="text-[10px] text-muted-foreground tracking-[0.3em] uppercase font-mono"
          style={{ writingMode: "vertical-lr" }}
        >
          React · Node · TS · Python
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary to-transparent mx-auto" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
