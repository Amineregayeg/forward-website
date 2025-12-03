import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { scaleDuration } from "../../styles/constants";

interface AnimatedGradientProps {
  colors: string[];
  angle?: number;
  animateAngle?: boolean;
  angleRange?: [number, number];
  duration?: number;
}

export const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  colors,
  angle = 135,
  animateAngle = true,
  angleRange = [135, 180],
  duration = 300,
}) => {
  const frame = useCurrentFrame();

  const currentAngle = animateAngle
    ? interpolate(frame, [0, duration], angleRange, { extrapolateRight: "clamp" })
    : angle;

  const gradient = `linear-gradient(${currentAngle}deg, ${colors.join(", ")})`;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: gradient,
      }}
    />
  );
};

interface FloatingOrbProps {
  size: number;
  color: string;
  initialX: number;
  initialY: number;
  floatRangeX?: number;
  floatRangeY?: number;
  duration?: number;
  blur?: number;
  opacity?: number;
  delay?: number;
}

export const FloatingOrb: React.FC<FloatingOrbProps> = ({
  size,
  color,
  initialX,
  initialY,
  floatRangeX = 50,
  floatRangeY = 30,
  duration = 180,
  blur = 80,
  opacity = 0.3,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);

  // Smooth floating motion using sine wave
  const cycleProgress = (adjustedFrame % duration) / duration;
  const offsetX = Math.sin(cycleProgress * Math.PI * 2) * floatRangeX;
  const offsetY = Math.cos(cycleProgress * Math.PI * 2) * floatRangeY;

  // Fade in
  const orbOpacity = interpolate(
    adjustedFrame,
    [0, scaleDuration(30)],
    [0, opacity],
    { extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        left: initialX + offsetX,
        top: initialY + offsetY,
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        filter: `blur(${blur}px)`,
        opacity: orbOpacity,
        pointerEvents: "none",
      }}
    />
  );
};

interface GridPatternProps {
  cellSize?: number;
  lineColor?: string;
  lineWidth?: number;
  opacity?: number;
  animate?: boolean;
}

export const GridPattern: React.FC<GridPatternProps> = ({
  cellSize = 60,
  lineColor = "rgba(255, 255, 255, 0.1)",
  lineWidth = 1,
  opacity = 1,
  animate = true,
}) => {
  const frame = useCurrentFrame();

  const gridOpacity = animate
    ? interpolate(frame, [0, scaleDuration(40)], [0, opacity], { extrapolateRight: "clamp" })
    : opacity;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: gridOpacity,
        backgroundImage: `
          linear-gradient(${lineColor} ${lineWidth}px, transparent ${lineWidth}px),
          linear-gradient(90deg, ${lineColor} ${lineWidth}px, transparent ${lineWidth}px)
        `,
        backgroundSize: `${cellSize}px ${cellSize}px`,
        pointerEvents: "none",
      }}
    />
  );
};

interface RadialGlowProps {
  color: string;
  size?: number;
  x?: string;
  y?: string;
  opacity?: number;
  blur?: number;
  pulseIntensity?: number;
  pulseDuration?: number;
}

export const RadialGlow: React.FC<RadialGlowProps> = ({
  color,
  size = 600,
  x = "50%",
  y = "50%",
  opacity = 0.4,
  blur = 100,
  pulseIntensity = 0.1,
  pulseDuration = 60,
}) => {
  const frame = useCurrentFrame();

  // Subtle pulse effect
  const pulse = interpolate(
    frame % pulseDuration,
    [0, pulseDuration / 2, pulseDuration],
    [1, 1 + pulseIntensity, 1]
  );

  const glowOpacity = interpolate(
    frame,
    [0, scaleDuration(30)],
    [0, opacity],
    { extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size * pulse,
        height: size * pulse,
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        opacity: glowOpacity,
        pointerEvents: "none",
      }}
    />
  );
};

interface NoiseOverlayProps {
  opacity?: number;
  animate?: boolean;
}

export const NoiseOverlay: React.FC<NoiseOverlayProps> = ({
  opacity = 0.03,
  animate = true,
}) => {
  const frame = useCurrentFrame();

  // Subtle noise animation
  const noiseOffset = animate ? (frame * 10) % 200 : 0;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundPosition: `${noiseOffset}px ${noiseOffset}px`,
        pointerEvents: "none",
        mixBlendMode: "overlay",
      }}
    />
  );
};

interface ScanLinesProps {
  lineHeight?: number;
  opacity?: number;
}

export const ScanLines: React.FC<ScanLinesProps> = ({
  lineHeight = 4,
  opacity = 0.05,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent ${lineHeight}px,
          rgba(0, 0, 0, 0.3) ${lineHeight}px,
          rgba(0, 0, 0, 0.3) ${lineHeight * 2}px
        )`,
        pointerEvents: "none",
      }}
    />
  );
};

interface VignetteProps {
  intensity?: number;
  color?: string;
}

export const Vignette: React.FC<VignetteProps> = ({
  intensity = 0.4,
  color = "rgba(0, 0, 0, 1)",
}) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(ellipse at center, transparent 40%, ${color.replace("1)", `${intensity})`)} 100%)`,
        pointerEvents: "none",
      }}
    />
  );
};
