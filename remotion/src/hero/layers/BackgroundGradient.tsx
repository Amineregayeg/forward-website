// Layer 0: Background Gradient
// Full-screen gradient that morphs hue over 12s loop

import React from "react";
import { BRAND_COLORS, TIMING } from "../constants/brand";
import { hueRotate } from "../motion/atomic";

interface BackgroundGradientProps {
  frame: number;
  width: number;
  height: number;
}

export const BackgroundGradient: React.FC<BackgroundGradientProps> = ({
  frame,
  width,
  height,
}) => {
  // Subtle hue shift over the full loop
  const hueShift = hueRotate(frame, {
    periodFrames: TIMING.TOTAL_FRAMES,
    startHue: 0,
  });

  // Keep the shift very subtle (0-15 degrees)
  const subtleHue = (hueShift * 15) / 360;

  return (
    <div
      style={{
        position: "absolute",
        width,
        height,
        overflow: "hidden",
      }}
    >
      {/* Base gradient layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(
            ${135 + subtleHue}deg,
            ${BRAND_COLORS.NAVY} 0%,
            ${BRAND_COLORS.NAVY_LIGHT} 50%,
            ${BRAND_COLORS.NAVY} 100%
          )`,
        }}
      />

      {/* Radial glow in center-right (where cards will be) */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "25%",
          transform: "translate(50%, -50%)",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${BRAND_COLORS.GLOW_TEAL} 0%, transparent 70%)`,
          filter: "blur(80px)",
          opacity: 0.3,
        }}
      />

      {/* Secondary glow (left side, subtle) */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(0, 168, 168, 0.15) 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      {/* Vignette overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, transparent 40%, ${BRAND_COLORS.NAVY} 100%)`,
          opacity: 0.5,
        }}
      />

      {/* Subtle noise texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
};
