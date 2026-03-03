import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Code2, Layers, Palette, Server } from "lucide-react";

const stats = [
  { value: "3+", label: "Anos de experiência" },
  { value: "30+", label: "Projetos entregues" },
  { value: "15+", label: "Clientes satisfeitos" },
  { value: "∞", label: "Linhas de código" },
];

const expertise = [
  {
    icon: Code2,
    title: "Frontend",
    desc: "React, TypeScript, Next.js, CSS/SASS, Tailwind, animações avançadas",
    highlight: true,
  },
  {
    icon: Server,
    title: "Backend",
    desc: "Node.js, Python, PHP, REST APIs, SQL, PostgreSQL",
    highlight: false,
  },
  {
    icon: Layers,
    title: "Full-Stack",
    desc: "Arquitetura de sistemas, bancos de dados, APIs completas",
    highlight: false,
  },
  {
    icon: Palette,
    title: "UI/UX",
    desc: "Design de interfaces, design systems, prototipação, acessibilidade",
    highlight: false,
  },
];

const codeCards = [
  {
    filename: "stack.config.ts",
    lang: "typescript",
    code: `import type { StackConfig } from "@types/dev";

// @ts-check — runtime validated
const stack: StackConfig = {
  frontend: {
    framework: "React" as const,
    lang: ["TypeScript", "JavaScript"],
    meta: "Next.js",
    ui: ["Tailwind CSS", "CSS3", "SASS"],
    animation: ["Framer Motion"],
  },
  backend: {
    runtime: ["Node.js"],
    languages: ["Python", "PHP"],
    database: ["PostgreSQL", "SQL"],
    api: ["REST"],
  },
} satisfies StackConfig;

export default stack;`,
  },
  {
    filename: "profile.js",
    lang: "javascript",
    code: `const { Octokit } = require("@octokit/rest");

const octokit = new Octokit();

async function fetchProfile() {
  const { data } = await octokit.users
    .getByUsername({ username: "UmTioAii" });

  return {
    login: data.login,
    url: "https://github.com/UmTioAii",
    repos: await octokit.repos.listForUser({
      username: "UmTioAii",
      sort: "updated",
    }),
    featured: [
      "acesso-e",
      "project-word-game",
      "memo-ry",
    ],
  };
}

module.exports = fetchProfile;`,
  },
  {
    filename: "experience.py",
    lang: "python",
    code: `from dataclasses import dataclass
from typing import Optional

@dataclass
class CareerNode:
    role: str
    company: str
    start: int
    end: Optional[int] = None
    stack: list[str] = None

timeline = [
    CareerNode(
        role="Full-Stack Developer",
        company="Freelancer",
        start=2025,
        stack=["React", "Node.js", "Python"],
    ),
    CareerNode(
        role="Frontend Developer",
        company="Projetos Avulsos",
        start=2024,
        end=2025,
        stack=["React", "TypeScript", "Tailwind"],
    ),
    CareerNode(
        role="Junior Frontend",
        company="Riversoft",
        start=2023,
        end=2024,
        stack=["JavaScript", "CSS", "HTML"],
    ),
]`,
  },
  {
    filename: "skills.php",
    lang: "php",
    code: `<?php

class Skill {
    public string $name;
    public int $level;
    public string $type;

    public function __construct(
        string $name,
        int $level,
        string $type
    ) {
        $this->name = $name;
        $this->level = $level;
        $this->type = $type;
    }
}

$skills = [
    new Skill("JavaScript", 95, "core"),
    new Skill("HTML5", 95, "core"),
    new Skill("CSS / SASS", 90, "core"),
    new Skill("Figma", 92, "core"),
    new Skill("Node.js", 88, "advanced"),
    new Skill("TypeScript", 80, "advanced"),
    new Skill("React", 80, "advanced"),
    new Skill("Python", 80, "advanced"),
    new Skill("Next.js", 78, "learning"),
    new Skill("Tailwind CSS", 67, "learning"),
];

?>`,
  },
];

const highlightCode = (line: string) => {
  const escapeHtml = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  // Tokenize approach: protect highlighted fragments to avoid regex collisions
  const tokens: string[] = [];
  const placeholder = (html: string) => {
    const idx = tokens.length;
    tokens.push(html);
    return String.fromCharCode(0xe000 + idx);
  };

  let result = escapeHtml(line);

  // 1. Comments (// or #)
  result = result.replace(
    /(\/\/.*|#(?![\w<!]).*)/g,
    (m) => placeholder(`<span style="color: hsl(0 0% 50%); font-style: italic;">${m}</span>`)
  );

  // 2. Strings (double and single quoted)
  result = result.replace(
    /(".*?"|'.*?')/g,
    (m) => placeholder(`<span style="color: hsl(0 90% 55%)">${m}</span>`)
  );

  // 3. PHP tags (escaped)
  result = result.replace(
    /(&lt;\?php|\?&gt;)/g,
    (m) => placeholder(`<span style="color: hsl(0 70% 70%)">${m}</span>`)
  );

  // 4. PHP variables
  result = result.replace(
    /(\$\w+)/g,
    (m) => placeholder(`<span style="color: hsl(var(--primary))">${m}</span>`)
  );

  // 5. Python decorators
  result = result.replace(
    /(@\w+)/g,
    (m) => placeholder(`<span style="color: hsl(var(--primary))">${m}</span>`)
  );

  // 6. Keywords
  result = result.replace(
    /\b(export|const|new|true|null|import|from|async|function|await|return|default|module|require|class|public|def|None|self|as)\b/g,
    (m) => placeholder(`<span style="color: hsl(0 70% 70%)">${m}</span>`)
  );

  // 7. Types
  result = result.replace(
    /\b(type|interface|string|number|int|str|list|bool|Optional|readonly|satisfies)\b/g,
    (m) => placeholder(`<span style="color: hsl(200 70% 65%)">${m}</span>`)
  );

  // 8. Numbers (disabled to avoid false positives while typing)
  // result = result.replace(
  //   /\b(\d+)\b/g,
  //   (m) => placeholder(`<span style="color: hsl(var(--primary))">${m}</span>`)
  // );

  // Restore placeholders
  result = result.replace(/[\uE000-\uF8FF]/g, (ch) => {
    const idx = ch.charCodeAt(0) - 0xe000;
    return tokens[idx] ?? ch;
  });

  return result;
};

// Typing animation component for code lines
const TypedCodeBlock = ({
  code,
  onComplete,
}: {
  code: string;
  onComplete: () => void;
}) => {
  const codeChars = Array.from(code);
  const totalChars = codeChars.length;
  const [charCount, setCharCount] = useState(0);
  const completedRef = useRef(false);

  useEffect(() => {
    setCharCount(0);
    completedRef.current = false;
  }, [code]);

  useEffect(() => {
    if (charCount >= totalChars) {
      if (!completedRef.current) {
        completedRef.current = true;
        const timeout = setTimeout(onComplete, 5000);
        return () => clearTimeout(timeout);
      }
      return;
    }
    const speed = 18 + Math.random() * 12;
    const timer = setTimeout(() => setCharCount((c) => c + 1), speed);
    return () => clearTimeout(timer);
  }, [charCount, totalChars, onComplete]);

  // UTF-safe visible text build (handles accents and multibyte chars correctly)
  const visibleText = codeChars.slice(0, charCount).join("");
  const visibleLines = visibleText.split("\n");

  return (
    <div>
      {visibleLines.map((line, i) => (
        <div key={i} className="flex gap-4 px-2 -mx-2 rounded">
          <span className="text-muted-foreground/40 select-none w-5 text-right shrink-0">
            {i + 1}
          </span>
          <span
            className="text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: highlightCode(line) }}
          />
          {i === visibleLines.length - 1 && charCount < totalChars && (
            <span className="text-primary animate-pulse ml-0">▍</span>
          )}
        </div>
      ))}
    </div>
  );
};

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCard, setActiveCard] = useState(0);
  const [typingKey, setTypingKey] = useState(0);

  const goToNext = useCallback(() => {
    setActiveCard((prev) => (prev + 1) % codeCards.length);
    setTypingKey((k) => k + 1);
  }, []);

  const handleDotClick = (action: "close" | "minimize" | "next") => {
    if (action === "minimize") {
      setActiveCard((prev) => (prev - 1 + codeCards.length) % codeCards.length);
    } else {
      setActiveCard((prev) => (prev + 1) % codeCards.length);
    }
    setTypingKey((k) => k + 1);
  };

  const handleIndicatorClick = (i: number) => {
    setActiveCard(i);
    setTypingKey((k) => k + 1);
  };

  const currentCard = codeCards[activeCard];

  return (
    <section id="sobre" className="py-32 px-4 md:px-8 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-20"
        >
          <span className="text-primary font-mono text-sm">01</span>
          <div className="h-px w-16 bg-primary" />
          <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-mono">
            about.me
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-8"
            >
              Frontend{" "}
              <span className="text-gradient">obsessed</span>,
              <br />
              Full-Stack
              <br />
              <span className="italic font-light text-muted-foreground">por natureza.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted-foreground text-lg leading-relaxed mb-6"
            >
              Desenvolvedor Full-Stack com paixão obsessiva por interfaces.
              Acredito que o frontend é onde a mágica acontece — onde código
              se transforma em experiência, e pixels em emoção.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              Do backend sólido em <span className="text-foreground font-medium">Node.js</span> e{" "}
              <span className="text-foreground font-medium">Python</span> ao frontend refinado com{" "}
              <span className="text-primary font-medium">React</span> e{" "}
              <span className="text-primary font-medium">TypeScript</span> — construo
              aplicações completas com obsessão por cada detalhe visual.
            </motion.p>

            {/* Expertise cards */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {expertise.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                  className={`p-5 border transition-colors duration-300 group cursor-default ${
                    item.highlight
                      ? "border-primary/50 bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 mb-3 ${
                      item.highlight ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                    } transition-colors`}
                  />
                  <h4 className="text-sm font-bold mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div>
            {/* Code window with typing animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card border border-border overflow-hidden mb-10"
            >
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleDotClick("close")}
                    className="w-3 h-3 rounded-full bg-[hsl(0_70%_55%)] hover:bg-[hsl(0_80%_60%)] transition-colors cursor-pointer"
                    aria-label="Próximo cartão"
                  />
                  <button
                    onClick={() => handleDotClick("minimize")}
                    className="w-3 h-3 rounded-full bg-[hsl(45_80%_55%)] hover:bg-[hsl(45_90%_60%)] transition-colors cursor-pointer"
                    aria-label="Cartão anterior"
                  />
                  <button
                    onClick={() => handleDotClick("next")}
                    className="w-3 h-3 rounded-full bg-[hsl(120_50%_45%)] hover:bg-[hsl(120_60%_50%)] transition-colors cursor-pointer"
                    aria-label="Próximo cartão"
                  />
                </div>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeCard}
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs font-mono text-muted-foreground ml-2"
                  >
                    {currentCard.filename}
                  </motion.span>
                </AnimatePresence>
                {/* Card indicator dots */}
                <div className="ml-auto flex gap-1.5">
                  {codeCards.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleIndicatorClick(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-colors cursor-pointer ${
                        i === activeCard ? "bg-primary" : "bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Code content with typing */}
              <div className="p-5 font-mono text-xs leading-6 overflow-x-auto min-h-[280px] relative">
                <TypedCodeBlock
                  key={typingKey}
                  code={currentCard.code}
                  onComplete={goToNext}
                />
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
                  className="border-l-2 border-primary pl-4"
                >
                  <span className="text-3xl md:text-4xl font-bold text-gradient block">
                    {stat.value}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1 font-mono">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
