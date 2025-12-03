// Impact Metrics Video
// Shows 3 animated counting metrics one at a time, centered, followed by Forward logo
// Uses same background as ForwardHero

import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { BRAND_COLORS, TYPOGRAPHY } from "./hero/constants/brand";
import { BackgroundGradient } from "./hero/layers/BackgroundGradient";
import { FloatingShapesLayer } from "./hero/layers/FloatingShapesLayer";
import { EASE_OUT } from "./hero/motion/easing";

// Configuration
const TIMING = {
  FPS: 60,
  TOTAL_FRAMES: 720, // 12 seconds
};

// Each metric timing (in frames at 60fps)
const METRIC_DURATION = 150; // 2.5s per metric (count + hold)
const COUNT_DURATION = 90; // 1.5s for counting
const TRANSITION_DURATION = 30; // 0.5s fade transition

const METRICS_CONFIG = {
  // Metric 1: frames 30-180
  METRIC_1_START: 30,
  METRIC_1_END: 30 + METRIC_DURATION,

  // Metric 2: frames 180-330
  METRIC_2_START: 30 + METRIC_DURATION,
  METRIC_2_END: 30 + METRIC_DURATION * 2,

  // Metric 3: frames 330-480
  METRIC_3_START: 30 + METRIC_DURATION * 2,
  METRIC_3_END: 30 + METRIC_DURATION * 3,

  // Logo starts after metric 3 fades
  LOGO_START: 30 + METRIC_DURATION * 3 + 30, // ~510 frames / 8.5s
};

// Impact metrics data - customize these values
const METRICS = [
  { value: 150, suffix: "+", label: "Enterprise Projects" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 60, suffix: "%", label: "Cost Savings vs Big 4" },
];

// Single Centered Animated Counter Component
const AnimatedCounter: React.FC<{
  frame: number;
  fps: number;
  startFrame: number;
  endFrame: number;
  targetValue: number;
  suffix: string;
  label: string;
}> = ({ frame, fps, startFrame, endFrame, targetValue, suffix, label }) => {
  // Don't render if outside this metric's time window
  if (frame < startFrame - 20 || frame > endFrame + 20) return null;

  // Count animation
  const countProgress = interpolate(
    frame,
    [startFrame, startFrame + COUNT_DURATION],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_OUT }
  );

  const currentValue = Math.round(targetValue * countProgress);

  // Entrance animation (fade in + slide up)
  const entranceOpacity = interpolate(
    frame,
    [startFrame, startFrame + TRANSITION_DURATION],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const entranceY = interpolate(
    frame,
    [startFrame, startFrame + 40],
    [60, 0],
    { easing: EASE_OUT, extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const entranceScale = spring({
    frame: Math.max(0, frame - startFrame),
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.8 },
  });

  // Exit animation (fade out + slide up)
  const exitOpacity = interpolate(
    frame,
    [endFrame - TRANSITION_DURATION, endFrame],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const exitY = interpolate(
    frame,
    [endFrame - TRANSITION_DURATION, endFrame],
    [0, -40],
    { easing: EASE_OUT, extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = entranceOpacity * exitOpacity;
  const translateY = entranceY + exitY;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        opacity,
        transform: `translateY(${translateY}px) scale(${Math.max(0.8, entranceScale)})`,
      }}
    >
      {/* Number with suffix */}
      <div
        style={{
          fontFamily: TYPOGRAPHY.FONT_FAMILY,
          fontSize: 160,
          fontWeight: 700,
          color: BRAND_COLORS.OFF_WHITE,
          letterSpacing: "-0.02em",
          lineHeight: 1,
          display: "flex",
          alignItems: "baseline",
        }}
      >
        <span>{currentValue}</span>
        <span
          style={{
            fontSize: 100,
            color: BRAND_COLORS.ELECTRIC_TEAL,
            marginLeft: 8,
          }}
        >
          {suffix}
        </span>
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily: TYPOGRAPHY.FONT_FAMILY,
          fontSize: 32,
          fontWeight: 500,
          color: `${BRAND_COLORS.OFF_WHITE}aa`,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  );
};

// Forward Logo Icon
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

// Logo Layer (appears after metrics)
const LogoLayer: React.FC<{ frame: number; fps: number; width: number; height: number }> = ({
  frame,
  fps,
  width,
  height,
}) => {
  const logoStart = METRICS_CONFIG.LOGO_START;
  const adjustedFrame = frame - logoStart;

  // Don't render before logo starts
  if (frame < logoStart - 30) return null;

  // Layer fade in
  const layerOpacity = interpolate(
    frame,
    [logoStart - 30, logoStart + 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Icon animation - appears first with spring
  const iconScale = spring({
    frame: Math.max(0, adjustedFrame),
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.8 },
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
    { easing: EASE_OUT, extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const textScale = spring({
    frame: Math.max(0, adjustedFrame - textDelay),
    fps,
    config: { damping: 15, stiffness: 120, mass: 0.6 },
  });

  // Subtle glow pulse for the logo
  const glowPulse = interpolate(
    adjustedFrame,
    [0, 60, 120, 180, 240],
    [0, 0.4, 0.2, 0.4, 0.2],
    { extrapolateRight: "extend" }
  );

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
      </div>
    </div>
  );
};

// Main Component
export const ImpactMetricsVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_COLORS.NAVY,
        fontFamily: TYPOGRAPHY.FONT_FAMILY,
        overflow: "hidden",
      }}
    >
      {/* Layer 0: Background Gradient */}
      <BackgroundGradient frame={frame} width={width} height={height} />

      {/* Layer 1: Floating Shapes */}
      <FloatingShapesLayer frame={frame} width={width} height={height} />

      {/* Layer 2: Metrics Display - One at a time, centered */}
      <AnimatedCounter
        frame={frame}
        fps={fps}
        startFrame={METRICS_CONFIG.METRIC_1_START}
        endFrame={METRICS_CONFIG.METRIC_1_END}
        targetValue={METRICS[0].value}
        suffix={METRICS[0].suffix}
        label={METRICS[0].label}
      />

      <AnimatedCounter
        frame={frame}
        fps={fps}
        startFrame={METRICS_CONFIG.METRIC_2_START}
        endFrame={METRICS_CONFIG.METRIC_2_END}
        targetValue={METRICS[1].value}
        suffix={METRICS[1].suffix}
        label={METRICS[1].label}
      />

      <AnimatedCounter
        frame={frame}
        fps={fps}
        startFrame={METRICS_CONFIG.METRIC_3_START}
        endFrame={METRICS_CONFIG.METRIC_3_END}
        targetValue={METRICS[2].value}
        suffix={METRICS[2].suffix}
        label={METRICS[2].label}
      />

      {/* Layer 3: Logo (appears after all metrics) */}
      <LogoLayer frame={frame} fps={fps} width={width} height={height} />
    </AbsoluteFill>
  );
};

// Export timing for Root.tsx
export const IMPACT_METRICS_TIMING = TIMING;
