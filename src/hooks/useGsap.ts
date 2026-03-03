import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useGsapReveal = (selector: string, options?: gsap.TweenVars) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          ...options,
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [selector]);
};

export const useGsapStagger = (
  containerSelector: string,
  childSelector: string,
  stagger = 0.1
) => {
  useEffect(() => {
    const containers = document.querySelectorAll(containerSelector);
    containers.forEach((container) => {
      const children = container.querySelectorAll(childSelector);
      gsap.fromTo(
        children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [containerSelector, childSelector, stagger]);
};

export const useGsapParallax = (selector: string, speed = 0.3) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      gsap.to(el, {
        y: () => speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [selector, speed]);
};

export const useTextReveal = (selector: string) => {
  const ref = useRef<boolean>(false);

  useEffect(() => {
    if (ref.current) return;
    ref.current = true;

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      const text = el.textContent || "";
      el.textContent = "";

      const wrapper = document.createElement("span");
      wrapper.style.display = "inline-block";
      wrapper.style.overflow = "hidden";

      const inner = document.createElement("span");
      inner.textContent = text;
      inner.style.display = "inline-block";
      inner.style.transform = "translateY(100%)";

      wrapper.appendChild(inner);
      el.appendChild(wrapper);

      gsap.to(inner, {
        y: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [selector]);
};
