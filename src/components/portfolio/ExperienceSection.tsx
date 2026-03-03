import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    role: "Desenvolvedor Full-Stack",
    company: "Projetos & Freelancer",
    period: "2025 — Presente",
    description:
      "Desenvolvimento full-stack de aplicações web completas, APIs e integrações. Atuação como desenvolvedor independente em projetos variados.",
    stack: ["React", "TypeScript", "Node.js", "Python", "PHP"],
  },
  {
    role: "Desenvolvedor Web Frontend (React)",
    company: "Projetos Avulsos",
    period: "2024",
    description:
      "Desenvolvimento de interfaces modernas com React, foco em performance, responsividade e experiência do usuário.",
    stack: ["React", "TypeScript", "CSS", "Tailwind"],
  },
  {
    role: "Desenvolvedor Frontend Junior",
    company: "Riversoft (Freelancer)",
    period: "2023",
    description:
      "Construção de interfaces responsivas, implementação de layouts e componentes reutilizáveis.",
    stack: ["JavaScript", "CSS", "HTML", "React"],
  },
];

const ExperienceSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 px-4 md:px-8 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-primary font-mono text-sm">04</span>
          <div className="h-px w-16 bg-primary" />
          <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-mono">
            experiência
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-4xl md:text-6xl font-bold mb-20"
        >
          Minha <span className="text-gradient">trajetória</span>
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-border to-transparent" />

          <div className="space-y-0">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.12 }}
                className="group relative pl-8 md:pl-20 py-10 md:py-14 border-b border-border hover:bg-card/30 transition-colors duration-300 cursor-default"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-8 top-12 md:top-16 -translate-x-1/2">
                  <div className="w-3 h-3 rounded-full border-2 border-primary bg-background group-hover:bg-primary transition-colors duration-300" />
                </div>

                <div className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-12">
                  <div>
                    <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground mb-1">
                      {exp.period}
                    </p>
                    <p className="text-primary text-sm font-medium font-mono">{exp.company}</p>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                      {exp.role}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed max-w-xl mb-4">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-[10px] font-mono border border-border text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
