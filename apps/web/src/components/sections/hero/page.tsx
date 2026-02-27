"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function HeroSection() {
  const heroRef = useRef(null);

  // Fade In animation
  useLayoutEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power2.out" },
    );
  }, []);

  return (
    <section ref={heroRef} className="hero">
      <div className="hero__video-wrapper">
        <video
          className="hero__video"
          preload="metadata"
          poster="/thumb-hero-video.png"
          playsInline
          autoPlay
          loop
          muted
        >
          <source src="/hero_video_by_rico_erick.mp4" type="video/mp4" />
          <source src="/hero_video_by_rico_erick.mov" type="video/quicktime" />
          <source src="/hero_video_by_rico_erick_wav" type="video/wav" />
          <source src="/hero_video_by_rico_erick_webm" type="video/webm" />
          Seu navegador não suporta a tag de vídeo.
        </video>
        <div className="hero__overlay"></div>
      </div>

      <div className="hero__content">
        <h1 className="hero__logo">
          <Image
            src="/brand/logo-transparent.svg"
            alt="Logo"
            width={200}
            height={200}
          />
        </h1>
      </div>
      <div className="hero__credit">
        <a
          href="https://www.youtube.com/watch?v=bHRKRSJDjNY"
          target="_blank"
          rel="noopener noreferrer"
          className="hero__credit-link"
          aria-label="Video creator"
          title="Video creator"
        >
          <span className="text">@rico_erick</span>
          <span className="icon">▶</span>
        </a>
      </div>
    </section>
  );
}
