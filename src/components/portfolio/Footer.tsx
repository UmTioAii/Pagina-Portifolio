import { Terminal } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-4 md:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground font-mono">
            © {new Date().getFullYear()} Daniel Anastácio · Todos os direitos reservados
          </span>
        </div>
        <p className="text-sm text-muted-foreground font-mono flex items-center gap-1.5">
          Feito com <span className="text-primary">❤</span> e muito{" "}
          <span className="text-primary">café</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
