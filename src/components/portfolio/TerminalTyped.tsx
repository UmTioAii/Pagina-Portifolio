import { useEffect, useMemo, useRef } from "react";
import Typed from "typed.js";

interface TerminalTypedProps {
  strings: string[];
  className?: string;
  typeSpeed?: number;
  backSpeed?: number;
  loop?: boolean;
}

const TerminalTyped = ({
  strings,
  className = "",
  typeSpeed = 50,
  backSpeed = 30,
  loop = true,
}: TerminalTypedProps) => {
  const el = useRef<HTMLSpanElement>(null);

  const safeStrings = useMemo(
    () => strings.map((value) => value.normalize("NFC")),
    [strings]
  );

  useEffect(() => {
    if (!el.current) return;

    const typed = new Typed(el.current, {
      strings: safeStrings,
      typeSpeed,
      backSpeed,
      loop,
      backDelay: 2000,
      cursorChar: "▍",
      contentType: "null",
      smartBackspace: false,
    });

    return () => typed.destroy();
  }, [safeStrings, typeSpeed, backSpeed, loop]);

  return <span ref={el} className={className} />;
};

export default TerminalTyped;

