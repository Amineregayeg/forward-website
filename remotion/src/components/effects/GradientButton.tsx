import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { SPRING_CONFIGS, scaleDuration } from "../../styles/constants";

interface GradientButtonProps {
  children: React.ReactNode;
  delay?: number;
  width?: number | string;
  height?: number;
  borderRadius?: number;
  gradientColors?: [string, string, string];
  backgroundColor?: string;
  textColor?: string;
  fontSize?: number;
  fontWeight?: number;
  spinDuration?: number; // frames for one full rotation
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  delay = 0,
  width = "auto",
  height = 56,
  borderRadius = 28,
  gradientColors = ["#a2aeff", "#3749be", "#a2aeff"],
  backgroundColor = "#ffffff",
  textColor = "#1b1f33",
  fontSize = 20,
  fontWeight = 600,
  spinDuration = 60, // 2 seconds at 30fps
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const adjustedFrame = Math.max(0, frame - delay);

  // Scale animation on entry
  const scale = spring({
    frame: adjustedFrame,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  // Opacity fade in
  const opacity = interpolate(
    adjustedFrame,
    [0, scaleDuration(15)],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  // Continuous rotation for the gradient
  const rotation = interpolate(
    frame,
    [0, spinDuration],
    [0, 360],
    { extrapolateRight: "extend" }
  );

  // Glow pulse effect
  const glowIntensity = interpolate(
    frame,
    [0, 30, 60],
    [0.3, 0.5, 0.3],
    { extrapolateRight: "extend" }
  );

  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        height,
        overflow: "hidden",
        borderRadius,
        padding: 2,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {/* Rotating gradient border */}
      <div
        style={{
          position: "absolute",
          inset: -1000,
          background: `conic-gradient(from ${rotation}deg at 50% 50%, ${gradientColors[0]} 0%, ${gradientColors[1]} 50%, ${gradientColors[2]} 100%)`,
        }}
      />

      {/* Glow effect */}
      <div
        style={{
          position: "absolute",
          inset: -10,
          background: `conic-gradient(from ${rotation}deg at 50% 50%, ${gradientColors[0]} 0%, ${gradientColors[1]} 50%, ${gradientColors[2]} 100%)`,
          filter: "blur(20px)",
          opacity: glowIntensity,
        }}
      />

      {/* Button content */}
      <span
        style={{
          position: "relative",
          display: "inline-flex",
          height: "100%",
          width,
          cursor: "pointer",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: borderRadius - 2,
          backgroundColor,
          paddingLeft: 40,
          paddingRight: 40,
          fontSize,
          fontWeight,
          color: textColor,
          backdropFilter: "blur(12px)",
          fontFamily: "'SF Pro Display', 'Inter', system-ui, sans-serif",
        }}
      >
        {children}
      </span>
    </div>
  );
};

// Simpler variant with static gradient for less visual noise
export const StaticGradientButton: React.FC<GradientButtonProps> = ({
  children,
  delay = 0,
  width = "auto",
  height = 56,
  borderRadius = 28,
  gradientColors = ["#a2aeff", "#3749be", "#a2aeff"],
  backgroundColor = "#ffffff",
  textColor = "#1b1f33",
  fontSize = 20,
  fontWeight = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const adjustedFrame = Math.max(0, frame - delay);

  const scale = spring({
    frame: adjustedFrame,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  const opacity = interpolate(
    adjustedFrame,
    [0, scaleDuration(20)],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        height,
        overflow: "hidden",
        borderRadius,
        padding: 2,
        opacity,
        transform: `scale(${scale})`,
        background: `linear-gradient(135deg, ${gradientColors[0]} 0%, ${gradientColors[1]} 50%, ${gradientColors[2]} 100%)`,
        boxShadow: `0 4px 20px rgba(55, 73, 190, 0.3)`,
      }}
    >
      <span
        style={{
          position: "relative",
          display: "inline-flex",
          height: "100%",
          width,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: borderRadius - 2,
          backgroundColor,
          paddingLeft: 40,
          paddingRight: 40,
          fontSize,
          fontWeight,
          color: textColor,
          fontFamily: "'SF Pro Display', 'Inter', system-ui, sans-serif",
        }}
      >
        {children}
      </span>
    </div>
  );
};
