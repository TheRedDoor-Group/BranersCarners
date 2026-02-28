"use client";

import { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useArrowAnimation(
  containerRef: RefObject<HTMLElement>,
  pathLeftRef: RefObject<SVGPathElement>,
  pathRightRef: RefObject<SVGPathElement>,
) {
  useGSAP(
    () => {
      const pathLeft = pathLeftRef.current;
      const pathRight = pathRightRef.current;

      if (!pathLeft || !pathRight) return;

      const lengthLeft = pathLeft.getTotalLength();
      const lengthRight = pathRight.getTotalLength();

      gsap.set([pathLeft, pathRight], {
        strokeDasharray: (i) => (i === 0 ? lengthLeft : lengthRight),
        strokeDashoffset: (i) => (i === 0 ? lengthLeft : lengthRight),
        visibility: "visible",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70px",
          end: "bottom 5%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(pathLeft, { strokeDashoffset: 0, ease: "none" }, 0)
        .to(pathRight, { strokeDashoffset: 0, ease: "none" }, 0)
        .fromTo(
          ".annotation__name",
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.5",
        );
    },
    { scope: containerRef },
  );
}
