import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { ForwardLogo, ForwardIcon } from "../common/ForwardLogo";
import { AnimatedHeading, AnimatedSubheading } from "../common/AnimatedText";
import { COLORS, GRADIENTS } from "../../styles/colors";
import { TYPOGRAPHY, SPACING } from "../../styles/constants";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Background gradient animation
  const gradientAngle = interpolate(frame, [0, 300], [135, 180], {
    easing: Easing.linear,
  });

  // Background decorative elements
  const bgOpacity = interpolate(frame, [0, 60], [0, 0.03], {
    extrapolateRight: "clamp",
  });

  // Tagline animation
  const taglineDelay = 80;

  // Subtext animation
  const subtextDelay = 130;

  // Decorative line
  const lineWidth = interpolate(frame, [180, 240], [0, 200], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });

  const lineOpacity = interpolate(frame, [180, 210], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradientAngle}deg, ${COLORS.offWhite} 0%, ${COLORS.white} 50%, ${COLORS.offWhite} 100%)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: SPACING.element,
        padding: SPACING.page,
      }}
    >
      {/* Background decorative icons */}
      <div
        style={{
          position: "absolute",
          top: 80,
          right: 120,
          opacity: bgOpacity,
          transform: "rotate(15deg)",
        }}
      >
        <ForwardIcon size={300} color={COLORS.primary} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 80,
          opacity: bgOpacity * 0.7,
          transform: "rotate(-10deg)",
        }}
      >
        <ForwardIcon size={200} color={COLORS.primary} />
      </div>

      {/* Main Logo */}
      <ForwardLogo size={280} showText={true} delay={10} />

      {/* Tagline */}
      <div style={{ marginTop: 20 }}>
        <AnimatedHeading
          text="CRM, Training & Consulting"
          startFrame={taglineDelay}
          fontSize={TYPOGRAPHY.heading.small}
          color={COLORS.textSecondary}
          fontWeight={500}
        />
      </div>

      {/* Subtext */}
      <AnimatedSubheading
        text="Enterprise-grade Salesforce & Marketing Cloud expertise for regulated industries"
        startFrame={subtextDelay}
        fontSize={TYPOGRAPHY.body.large}
        maxWidth={900}
      />

      {/* Decorative line */}
      <div
        style={{
          width: lineWidth,
          height: 3,
          backgroundColor: COLORS.primary,
          borderRadius: 2,
          opacity: lineOpacity,
          marginTop: 20,
        }}
      />

      {/* Bottom badge */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          display: "flex",
          alignItems: "center",
          gap: 12,
          opacity: interpolate(frame, [200, 240], [0, 0.6], { extrapolateRight: "clamp" }),
        }}
      >
        <span
          style={{
            fontFamily: TYPOGRAPHY.fontFamily,
            fontSize: 16,
            color: COLORS.textMuted,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Trusted by Enterprise Leaders
        </span>
      </div>
    </AbsoluteFill>
  );
};
