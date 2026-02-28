"use client";

import { useEffect } from "react";

export function useNoiseBackground(containerRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx || !containerRef.current) return;

    canvas.width = 100;
    canvas.height = 100;

    const generateNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;

        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = 10;
      }

      ctx.putImageData(imageData, 0, 0);
    };

    let animationId: number;

    const updateBackground = () => {
      generateNoise();

      if (containerRef.current) {
        containerRef.current.style.backgroundImage = `url(${canvas.toDataURL()})`;
      }

      animationId = requestAnimationFrame(updateBackground);
    };

    updateBackground();

    return () => cancelAnimationFrame(animationId);
  }, [containerRef]);
}
