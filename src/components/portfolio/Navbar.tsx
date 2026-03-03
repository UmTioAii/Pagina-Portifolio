import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Menu, X, Terminal } from "lucide-react";

const navLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "Projetos", href: "#projetos" },
  
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">
          <a href="#" className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-primary" />
            <span className="text-lg font-extrabold tracking-tight font-mono">
              <span className="text-primary">&lt;</span>
              <span className="text-foreground">Daniel</span>
              <span className="text-primary">/&gt;</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 tracking-wider uppercase font-mono"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
              className="px-5 py-2.5 bg-primary text-primary-foreground text-xs font-bold tracking-wider uppercase hover:bg-primary/90 transition-colors duration-300 font-mono"
            >
              Contato
            </a>
          </nav>

          {/* Mobile */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-foreground z-50 relative"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-3xl font-bold text-foreground hover:text-primary transition-colors font-mono"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setMobileOpen(false)}
            className="mt-4 px-8 py-4 bg-primary text-primary-foreground font-bold tracking-wider uppercase font-mono"
          >
            Contato
          </a>
        </div>
      )}
    </>
  );
};

export default Navbar;
