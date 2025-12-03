import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { SPRING_CONFIGS, scaleDuration } from "../../styles/constants";

interface GlassCardProps {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  blurIntensity?: "sm" | "md" | "lg" | "xl";
  glowIntensity?: "none" | "sm" | "md" | "lg" | "xl";
  shadowIntensity?: "none" | "sm" | "md" | "lg" | "xl";
  delay?: number;
  backgroundColor?: string;
  borderColor?: string;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  width = "auto",
  height = "auto",
  borderRadius = 24,
  blurIntensity = "lg",
  glowIntensity = "sm",
  shadowIntensity = "md",
  delay = 0,
  backgroundColor = "rgba(255, 255, 255, 0.08)",
  borderColor = "rgba(255, 255, 255, 0.15)",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const adjustedFrame = Math.max(0, frame - delay);

  // Scale animation
  const scale = spring({
    frame: adjustedFrame,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  // Opacity fade in
  const opacity = interpolate(
    adjustedFrame,
    [0, scaleDuration(20)],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  // Slide up
  const translateY = interpolate(
    adjustedFrame,
    [0, scaleDuration(25)],
    [40, 0],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateRight: "clamp",
    }
  );

  // Blur values
  const blurValues = {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 20,
  };

  // Shadow styles
  const shadowStyles = {
    none: "none",
    sm: "inset 1px 1px 2px rgba(255, 255, 255, 0.25), inset -1px -1px 2px rgba(255, 255, 255, 0.25)",
    md: "inset 2px 2px 4px rgba(255, 255, 255, 0.3), inset -2px -2px 4px rgba(255, 255, 255, 0.3)",
    lg: "inset 3px 3px 6px rgba(255, 255, 255, 0.35), inset -3px -3px 6px rgba(255, 255, 255, 0.35)",
    xl: "inset 4px 4px 8px rgba(255, 255, 255, 0.4), inset -4px -4px 8px rgba(255, 255, 255, 0.4)",
  };

  // Glow styles
  const glowStyles = {
    none: "0 4px 20px rgba(0, 0, 0, 0.1)",
    sm: "0 4px 20px rgba(0, 0, 0, 0.15), 0 0 40px rgba(255, 255, 255, 0.05)",
    md: "0 8px 32px rgba(0, 0, 0, 0.2), 0 0 60px rgba(255, 255, 255, 0.08)",
    lg: "0 12px 48px rgba(0, 0, 0, 0.25), 0 0 80px rgba(255, 255, 255, 0.1)",
    xl: "0 16px 64px rgba(0, 0, 0, 0.3), 0 0 100px rgba(255, 255, 255, 0.15)",
  };

  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        backgroundColor,
        border: `1px solid ${borderColor}`,
        backdropFilter: `blur(${blurValues[blurIntensity]}px)`,
        WebkitBackdropFilter: `blur(${blurValues[blurIntensity]}px)`,
        boxShadow: `${glowStyles[glowIntensity]}, ${shadowStyles[shadowIntensity]}`,
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Inner highlight layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius,
          background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)",
          pointerEvents: "none",
        }}
      />
      {children}
    </div>
  );
};

// Simplified glass panel without animation for static elements
export const GlassPanel: React.FC<{
  children: React.ReactNode;
  borderRadius?: number;
  padding?: number;
  backgroundColor?: string;
}> = ({
  children,
  borderRadius = 16,
  padding = 24,
  backgroundColor = "rgba(255, 255, 255, 0.06)",
}) => {
  return (
    <div
      style={{
        borderRadius,
        padding,
        backgroundColor,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15), inset 1px 1px 2px rgba(255, 255, 255, 0.2)",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
};
