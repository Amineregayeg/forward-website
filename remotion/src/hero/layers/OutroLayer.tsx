// Layer 5: Outro
// Centered Forward logo with icon and text animation

import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { BRAND_COLORS, ACTS, TYPOGRAPHY } from "../constants/brand";
import { EASE_OUT, OVERSHOOT_BEZIER } from "../motion/easing";

interface OutroLayerProps {
  frame: number;
  width: number;
  height: number;
}

// Forward Logo Icon (three arrows)
const ForwardIcon: React.FC<{ size: number; opacity: number; scale: number }> = ({
  size,
  opacity,
  scale,
}) => (
  <svg
    viewBox="0 0 180 250"
    style={{
      width: size,
      height: size * (250 / 180),
      opacity,
      transform: `scale(${scale})`,
    }}
  >
    <polygon fill={BRAND_COLORS.OFF_WHITE} points="107.14 79.12 0 0 0 79.12 107.14 79.12" />
    <polygon
      fill={BRAND_COLORS.OFF_WHITE}
      points="171.19 126.42 116.26 85.86 116.26 116.26 36.4 116.26 36.4 142.94 116.26 142.94 116.26 170.02 171.19 126.42"
    />
    <polygon fill={BRAND_COLORS.OFF_WHITE} points="36.4 233.42 103.59 180.08 36.4 180.08 36.4 233.42" />
  </svg>
);

export const OutroLayer: React.FC<OutroLayerProps> = ({ frame, width, height }) => {
  const { fps } = useVideoConfig();

  const outroStart = ACTS.ACT_5_START;
  const adjustedFrame = frame - outroStart;

  // Don't render before outro starts
  if (frame < outroStart - 30) return null;

  // Layer fade in
  const layerOpacity = interpolate(
    frame,
    [outroStart - 30, outroStart + 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Icon animation - appears first with spring
  const iconScale = spring({
    frame: adjustedFrame,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
      mass: 0.8,
    },
  });

  const iconOpacity = interpolate(
    adjustedFrame,
    [0, 25],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Text "Forward" animation - appears after icon
  const textDelay = 30;
  const textOpacity = interpolate(
    adjustedFrame,
    [textDelay, textDelay + 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const textY = interpolate(
    adjustedFrame,
    [textDelay, textDelay + 40],
    [30, 0],
    {
      easing: EASE_OUT,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const textScale = spring({
    frame: adjustedFrame - textDelay,
    fps,
    config: {
      damping: 15,
      stiffness: 120,
      mass: 0.6,
    },
  });

  // Subtle glow pulse for the logo
  const glowPulse = interpolate(
    adjustedFrame,
    [0, 60, 120, 180, 240],
    [0, 0.4, 0.2, 0.4, 0.2],
    { extrapolateRight: "extend" }
  );

  // Icon size
  const iconSize = 120;

  return (
    <div
      style={{
        position: "absolute",
        width,
        height,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: layerOpacity,
      }}
    >
      {/* Glow behind logo */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${BRAND_COLORS.ELECTRIC_TEAL} 0%, transparent 70%)`,
          filter: "blur(80px)",
          opacity: glowPulse,
        }}
      />

      {/* Logo container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Icon */}
        <ForwardIcon size={iconSize} opacity={iconOpacity} scale={iconScale} />

        {/* Text "Forward" */}
        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px) scale(${Math.max(0.8, textScale)})`,
          }}
        >
          <span
            style={{
              fontFamily: TYPOGRAPHY.FONT_FAMILY,
              fontSize: 72,
              fontWeight: 700,
              color: BRAND_COLORS.OFF_WHITE,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            Forward
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: interpolate(
              adjustedFrame,
              [60, 90],
              [0, 0.7],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
            transform: `translateY(${interpolate(
              adjustedFrame,
              [60, 90],
              [15, 0],
              { easing: EASE_OUT, extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )}px)`,
          }}
        >
          <span
            style={{
              fontFamily: TYPOGRAPHY.FONT_FAMILY,
              fontSize: 20,
              fontWeight: 400,
              color: `${BRAND_COLORS.OFF_WHITE}99`,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            CRM & Data Architecture
          </span>
        </div>
      </div>
    </div>
  );
};
