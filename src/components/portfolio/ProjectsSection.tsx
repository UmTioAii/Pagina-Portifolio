import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Acesso-E",
    category: "Frontend · React",
    description:
      "Plataforma de acessibilidade digital com interface intuitiva e recursos de navegação otimizados.",
    tags: ["TypeScript 92.5%", "PLpgSQL 5.2%", "CSS 1.5%"],
    color: "0 90% 55%",
    href: "https://acesso-e.vercel.app",
  },
  {
    title: "Project Word",
    category: "Frontend · Game",
    description:
      "Jogo estilo TERMO, com pontuação, estilo moderno e animações fluidas. Ranking global e categorias.",
    tags: ["TypeScript 91.8%", "CSS 5.2%", "PLpgSQL 2.3%"],
    color: "220 80% 55%",
    href: "https://project-word-game.vercel.app",
  },
  {
    title: "Memo-ry",
    category: "Frontend · Produtividade",
    description:
      "Aplicação To-do com lista de prioridade, preview de links e colagem de imagem. Interface responsiva e moderna.",
    tags: ["TypeScript 96.7%", "CSS 2.0%"],
    color: "150 70% 45%",
    href: "https://memo-ry.vercel.app",
  },
  {
    title: "Bud Budget",
    category: "Frontend · Finanças",
    description:
      "Plataforma de gerenciamento de economias pessoais com dashboard interativo, animações fluidas e modelos inteligentes para controle financeiro.",
    tags: ["TypeScript 97.9%", "CSS 1.7%", "Other 0.4%"],
    color: "45 85% 55%",
    href: "https://bud-budget.vercel.app",
  },
];

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative cursor-pointer"
    >
      <a href={project.href} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative overflow-hidden border border-border bg-card transition-colors duration-300 hover:border-primary/50">
          {/* Project visual area */}
          <div className="relative h-[240px] md:h-[300px] overflow-hidden">
            <div
              className="absolute inset-0 transition-transform duration-500"
              style={{
                background: `radial-gradient(ellipse at 30% 50%, hsl(${project.color} / 0.12), transparent 70%)`,
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
            />

            {/* Number */}
            <div className="absolute top-6 left-6">
              <span
                className="text-7xl font-extrabold opacity-10"
                style={{ color: `hsl(${project.color})` }}
              >
                0{index + 1}
              </span>
            </div>

            {/* Action button */}
            <div
              className="absolute bottom-6 right-6 transition-all duration-300"
              style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? "translateY(0)" : "translateY(12px)",
              }}
            >
              <div className="w-11 h-11 bg-primary text-primary-foreground flex items-center justify-center">
                <ExternalLink className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-7">
            <div className="flex items-center gap-3 mb-3">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: `hsl(${project.color})` }}
              />
              <span className="text-xs tracking-widest uppercase text-muted-foreground font-mono">
                {project.category}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>

            <p className="text-muted-foreground leading-relaxed mb-5 text-sm">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-mono border border-border text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom accent */}
          <div
            className="h-[2px] transition-transform duration-500 origin-left"
            style={{
              background: `hsl(${project.color})`,
              transform: isHovered ? "scaleX(1)" : "scaleX(0)",
            }}
          />
        </div>
      </a>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projetos" className="py-32 px-4 md:px-8 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-primary font-mono text-sm">02</span>
          <div className="h-px w-16 bg-primary" />
          <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-mono">
            projetos
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold">
            Trabalhos <span className="text-gradient">selecionados</span>
          </h2>
          <div className="h-px bg-gradient-to-r from-primary to-transparent mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
