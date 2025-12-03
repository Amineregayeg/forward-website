// Layer 1: Floating Shapes
// Abstract blobs that float with subtle motion

import React from "react";
import { BRAND_COLORS, TIMING, ACTS } from "../constants/brand";
import { floatBobbing } from "../motion/atomic";
import { framesFromSeconds } from "../motion/easing";
import { interpolate } from "remotion";

interface FloatingShapesLayerProps {
  frame: number;
  width: number;
  height: number;
}

interface FloatingShape {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  periodFrames: number;
  phase: number;
  amplitude: number;
  blur: number;
  rotation?: number;
}

const SHAPES: FloatingShape[] = [
  {
    id: 1,
    x: 0.15, // percent of width
    y: 0.2,
    size: 350,
    color: BRAND_COLORS.TEAL,
    opacity: 0.12,
    periodFrames: framesFromSeconds(4.2),
    phase: 0,
    amplitude: 25,
    blur: 80,
  },
  {
    id: 2,
    x: 0.75,
    y: 0.25,
    size: 280,
    color: BRAND_COLORS.ELECTRIC_TEAL,
    opacity: 0.08,
    periodFrames: framesFromSeconds(3.5),
    phase: 100,
    amplitude: 20,
    blur: 60,
  },
  {
    id: 3,
    x: 0.85,
    y: 0.7,
    size: 400,
    color: BRAND_COLORS.TEAL,
    opacity: 0.15,
    periodFrames: framesFromSeconds(5),
    phase: 200,
    amplitude: 30,
    blur: 100,
  },
  {
    id: 4,
    x: 0.25,
    y: 0.75,
    size: 200,
    color: BRAND_COLORS.ELECTRIC_TEAL,
    opacity: 0.1,
    periodFrames: framesFromSeconds(3.8),
    phase: 150,
    amplitude: 18,
    blur: 50,
  },
  {
    id: 5,
    x: 0.55,
    y: 0.15,
    size: 180,
    color: BRAND_COLORS.NAVY_LIGHT,
    opacity: 0.25,
    periodFrames: framesFromSeconds(4.5),
    phase: 50,
    amplitude: 15,
    blur: 40,
  },
];

export const FloatingShapesLayer: React.FC<FloatingShapesLayerProps> = ({
  frame,
  width,
  height,
}) => {
  // Fade in shapes during Act 1
  const fadeIn = interpolate(frame, [0, 72], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Fade out for outro (partial - keep some atmosphere)
  const fadeOut = interpolate(
    frame,
    [ACTS.CONTENT_FADE_OUT_START, ACTS.CONTENT_FADE_OUT_END],
    [1, 0.3],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const layerOpacity = Math.min(fadeIn, fadeOut);

  return (
    <div
      style={{
        position: "absolute",
        width,
        height,
        opacity: layerOpacity,
        pointerEvents: "none",
      }}
    >
      {SHAPES.map((shape) => {
        // Calculate bobbing offset
        const yOffset = floatBobbing(frame, {
          amplitude: shape.amplitude,
          periodFrames: shape.periodFrames,
          phase: shape.phase,
        });

        // Slight horizontal drift
        const xOffset = floatBobbing(frame, {
          amplitude: shape.amplitude * 0.3,
          periodFrames: shape.periodFrames * 1.3,
          phase: shape.phase + 100,
        });

        // Slow rotation
        const rotation = (frame / shape.periodFrames) * 10;

        return (
          <div
            key={shape.id}
            style={{
              position: "absolute",
              left: shape.x * width - shape.size / 2 + xOffset,
              top: shape.y * height - shape.size / 2 + yOffset,
              width: shape.size,
              height: shape.size,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${shape.color} 0%, transparent 70%)`,
              filter: `blur(${shape.blur}px)`,
              opacity: shape.opacity,
              transform: `rotate(${rotation}deg)`,
            }}
          />
        );
      })}

      {/* Elongated shape for variety */}
      <div
        style={{
          position: "absolute",
          left: "60%",
          top: "60%",
          width: 500,
          height: 200,
          borderRadius: "50%",
          background: `linear-gradient(90deg, ${BRAND_COLORS.TEAL}20, ${BRAND_COLORS.ELECTRIC_TEAL}10)`,
          filter: "blur(70px)",
          transform: `translateY(${floatBobbing(frame, { amplitude: 20, periodFrames: framesFromSeconds(4), phase: 0 })}px) rotate(-15deg)`,
          opacity: 0.3,
        }}
      />
    </div>
  );
};
