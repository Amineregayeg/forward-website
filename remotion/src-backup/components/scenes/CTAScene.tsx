import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from "remotion";
import { ForwardLogo, ForwardIcon } from "../common/ForwardLogo";
import { AnimatedHeading, AnimatedSubheading } from "../common/AnimatedText";
import { COLORS } from "../../styles/colors";
import { TYPOGRAPHY, SPACING, SPRING_CONFIGS } from "../../styles/constants";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background gradient animation
  const gradientAngle = interpolate(frame, [0, 210], [135, 180], {
    easing: Easing.linear,
  });

  // CTA Button animation
  const buttonScale = spring({
    frame: frame - 80,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  const buttonOpacity = interpolate(frame, [80, 110], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Button glow pulse
  const glowOpacity = interpolate(
    frame,
    [120, 150, 180],
    [0.3, 0.6, 0.3],
    { extrapolateRight: "clamp" }
  );

  // Contact info animation
  const contactOpacity = interpolate(frame, [140, 170], [0, 1], {
    extrapolateRight: "clamp",
  });

  const contactY = interpolate(frame, [140, 170], [20, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });

  // Floating background icons
  const float1Y = interpolate(frame, [0, 210], [0, -30], { easing: Easing.linear });
  const float2Y = interpolate(frame, [0, 210], [0, 20], { easing: Easing.linear });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradientAngle}deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: SPACING.page,
        gap: SPACING.element,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorative icons */}
      <div
        style={{
          position: "absolute",
          top: 60 + float1Y,
          left: 100,
          opacity: 0.05,
          transform: "rotate(-15deg)",
        }}
      >
        <ForwardIcon size={250} color={COLORS.white} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 80 + float2Y,
          right: 120,
          opacity: 0.05,
          transform: "rotate(20deg)",
        }}
      >
        <ForwardIcon size={300} color={COLORS.white} />
      </div>

      {/* Main Content */}
      <AnimatedHeading
        text="Ready to Transform Your CRM?"
        startFrame={0}
        fontSize={TYPOGRAPHY.heading.medium}
        color={COLORS.white}
        maxWidth={900}
      />

      <AnimatedSubheading
        text="Book a discovery workshop and see how Forward can accelerate your digital transformation"
        startFrame={30}
        color="rgba(255, 255, 255, 0.8)"
        fontSize={TYPOGRAPHY.body.large}
        maxWidth={800}
      />

      {/* CTA Button */}
      <div
        style={{
          marginTop: 20,
          position: "relative",
        }}
      >
        {/* Glow effect */}
        <div
          style={{
            position: "absolute",
            inset: -10,
            background: COLORS.white,
            borderRadius: 24,
            filter: "blur(20px)",
            opacity: glowOpacity,
          }}
        />

        {/* Button */}
        <button
          style={{
            position: "relative",
            backgroundColor: COLORS.white,
            color: COLORS.primary,
            padding: "24px 64px",
            fontSize: 22,
            fontWeight: 700,
            fontFamily: TYPOGRAPHY.fontFamily,
            border: "none",
            borderRadius: 16,
            cursor: "pointer",
            transform: `scale(${buttonScale})`,
            opacity: buttonOpacity,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          }}
        >
          Schedule Your Discovery Call
        </button>
      </div>

      {/* Contact Info */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          marginTop: 30,
          opacity: contactOpacity,
          transform: `translateY(${contactY}px)`,
        }}
      >
        <span
          style={{
            fontFamily: TYPOGRAPHY.fontFamily,
            fontSize: 18,
            color: "rgba(255, 255, 255, 0.7)",
          }}
        >
          contact@forward-consulting.fr
        </span>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 8,
          }}
        >
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: 14,
              color: "rgba(255, 255, 255, 0.5)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            France  |  EU/EMEA
          </span>
        </div>
      </div>

      {/* Bottom Logo */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          opacity: interpolate(frame, [170, 200], [0, 0.3], { extrapolateRight: "clamp" }),
        }}
      >
        <svg viewBox="0 0 180 250" style={{ width: 40, height: 56 }}>
          <polygon fill={COLORS.white} points="107.14 79.12 0 0 0 79.12 107.14 79.12" />
          <polygon fill={COLORS.white} points="171.19 126.42 116.26 85.86 116.26 116.26 36.4 116.26 36.4 142.94 116.26 142.94 116.26 170.02 171.19 126.42" />
          <polygon fill={COLORS.white} points="36.4 233.42 103.59 180.08 36.4 180.08 36.4 233.42" />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
