import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const techStack = {
  "Frontend (foco)": [
    { name: "React", level: 80 },
    { name: "TypeScript", level: 80 },
    { name: "JavaScript", level: 95 },
    { name: "CSS / SASS", level: 90 },
    { name: "HTML5", level: 95 },
    { name: "Next.js", level: 78 },
    { name: "Tailwind CSS", level: 67 },
    { name: "Framer Motion", level: 35 },
  ],
  Backend: [
    { name: "Node.js", level: 88 },
    { name: "Python", level: 80 },
    { name: "PHP", level: 75 },
    { name: "REST APIs", level: 90 },
    { name: "SQL", level: 78 },
    { name: "PostgreSQL", level: 82 },
  ],
  "DevOps & Tools": [
    { name: "Git", level: 78 },
    { name: "Docker", level: 67 },
    { name: "AWS", level: 45 },
    { name: "Figma", level: 92 },
    { name: "Linux", level: 72 },
    { name: "CI/CD", level: 85 },
  ],
};

const TechStackSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 px-4 md:px-8 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-primary font-mono text-sm">03</span>
          <div className="h-px w-16 bg-primary" />
          <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-mono">
            tech.stack
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-4xl md:text-6xl font-bold mb-20"
        >
          Tecnologias & <span className="text-gradient">Skills</span>
        </motion.h2>

        <div className="grid lg:grid-cols-3 gap-12">
          {Object.entries(techStack).map(([category, skills], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 + catIndex * 0.12 }}
            >
              <h3
                className={`text-lg font-bold mb-6 flex items-center gap-3 ${
                  catIndex === 0 ? "text-primary" : "text-foreground"
                }`}
              >
                {catIndex === 0 && (
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                )}
                {category}
              </h3>

              <div className="space-y-4">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    className="group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + catIndex * 0.12 + i * 0.05 }}
                  >
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-mono text-foreground group-hover:text-primary transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1 bg-secondary overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-primary/60"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 + catIndex * 0.12 + i * 0.05, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
