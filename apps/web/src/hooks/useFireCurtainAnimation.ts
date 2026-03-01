"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useLayoutEffect } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useFireCurtainAnimation({
  heroRef,
  fireCurtainRef,
}: {
  heroRef: React.RefObject<HTMLElement | null>;
  fireCurtainRef: React.RefObject<HTMLElement | null>;
}) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!heroRef.current || !fireCurtainRef.current) return;

      gsap.fromTo(
        heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.out" },
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
        },
      });

      tl.to(
        fireCurtainRef.current,
        {
          y: "0vh",
          ease: "none",
        },
        0,
      );

      tl.to(
        [".hero__content", ".hero__credit"],
        {
          scale: 0.8,
          opacity: 0,
          duration: 0.5,
        },
        0,
      );

      tl.to(
        ".hero__overlay",
        {
          backgroundColor: "rgba(0, 0, 0, 1)",
          ease: "power2.in",
        },
        0,
      );
    }, heroRef);

    return () => ctx.revert();
  }, [heroRef, fireCurtainRef]);
}
