import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { COLORS } from "../../styles/colors";
import { SPRING_CONFIGS } from "../../styles/constants";

interface ForwardLogoProps {
  size?: number;
  showText?: boolean;
  delay?: number;
}

export const ForwardLogo: React.FC<ForwardLogoProps> = ({
  size = 200,
  showText = true,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const adjustedFrame = Math.max(0, frame - delay);

  // Arrow 1 (top arrow) - appears first
  const arrow1Scale = spring({
    frame: adjustedFrame,
    fps,
    config: SPRING_CONFIGS.fast,
    delay: 0,
  });

  const arrow1X = interpolate(adjustedFrame, [0, 20], [-50, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });

  // Arrow 2 (middle/main arrow) - appears second
  const arrow2Scale = spring({
    frame: adjustedFrame,
    fps,
    config: SPRING_CONFIGS.smooth,
    delay: 8,
  });

  const arrow2X = interpolate(adjustedFrame, [8, 28], [-80, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });

  // Arrow 3 (bottom arrow) - appears third
  const arrow3Scale = spring({
    frame: adjustedFrame,
    fps,
    config: SPRING_CONFIGS.smooth,
    delay: 16,
  });

  const arrow3Y = interpolate(adjustedFrame, [16, 36], [30, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });

  // Text animation
  const textOpacity = interpolate(adjustedFrame, [30, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  const textX = interpolate(adjustedFrame, [30, 50], [20, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });

  // Overall scale for hover/pulse effect
  const pulseScale = interpolate(
    adjustedFrame,
    [60, 75, 90],
    [1, 1.02, 1],
    { extrapolateRight: "clamp" }
  );

  const logoScale = size / 200;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: showText ? 16 * logoScale : 0,
        transform: `scale(${pulseScale})`,
      }}
    >
      {/* Logo Icon */}
      <svg
        viewBox="0 0 180 250"
        style={{
          width: size * 0.5,
          height: size * 0.7,
        }}
      >
        {/* Top arrow (small triangle) */}
        <polygon
          fill={COLORS.primary}
          points="107.14 79.12 0 0 0 79.12 107.14 79.12"
          style={{
            transform: `translateX(${arrow1X}px) scale(${arrow1Scale})`,
            transformOrigin: "left center",
            opacity: arrow1Scale,
          }}
        />

        {/* Middle arrow (main forward arrow) */}
        <polygon
          fill={COLORS.primary}
          points="171.19 126.42 116.26 85.86 116.26 116.26 36.4 116.26 36.4 142.94 116.26 142.94 116.26 170.02 171.19 126.42"
          style={{
            transform: `translateX(${arrow2X}px) scale(${arrow2Scale})`,
            transformOrigin: "left center",
            opacity: arrow2Scale,
          }}
        />

        {/* Bottom arrow (small triangle) */}
        <polygon
          fill={COLORS.primary}
          points="36.4 233.42 103.59 180.08 36.4 180.08 36.4 233.42"
          style={{
            transform: `translateY(${arrow3Y}px) scale(${arrow3Scale})`,
            transformOrigin: "center top",
            opacity: arrow3Scale,
          }}
        />
      </svg>

      {/* Text */}
      {showText && (
        <span
          style={{
            fontFamily: "'SF Pro Display', 'Inter', system-ui, sans-serif",
            fontSize: 48 * logoScale,
            fontWeight: 700,
            color: COLORS.primary,
            letterSpacing: "-0.02em",
            opacity: textOpacity,
            transform: `translateX(${textX}px)`,
          }}
        >
          Forward
        </span>
      )}
    </div>
  );
};

// Simplified icon-only version for backgrounds
export const ForwardIcon: React.FC<{ size?: number; color?: string; opacity?: number }> = ({
  size = 100,
  color = COLORS.primary,
  opacity = 1,
}) => {
  return (
    <svg viewBox="0 0 180 250" style={{ width: size, height: size * 1.4, opacity }}>
      <polygon
        fill={color}
        points="107.14 79.12 0 0 0 79.12 107.14 79.12"
      />
      <polygon
        fill={color}
        points="171.19 126.42 116.26 85.86 116.26 116.26 36.4 116.26 36.4 142.94 116.26 142.94 116.26 170.02 171.19 126.42"
      />
      <polygon
        fill={color}
        points="36.4 233.42 103.59 180.08 36.4 180.08 36.4 233.42"
      />
    </svg>
  );
};
