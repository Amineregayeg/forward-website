import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from "remotion";
import { ForwardLogo } from "../common/ForwardLogo";
import { AnimatedHeading, AnimatedSubheading } from "../common/AnimatedText";
import { COLORS } from "../../styles/colors";
import { TYPOGRAPHY, SPACING, SPRING_CONFIGS, scaleDuration } from "../../styles/constants";
import { GradientButton, FloatingOrb, RadialGlow, Vignette, RandomizedText } from "../effects";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background gradient animation - faster
  const gradientAngle = interpolate(frame, [0, 147], [135, 180], {
    easing: Easing.linear,
  });

  // Contact info animation - faster
  const contactOpacity = interpolate(frame, [scaleDuration(100), scaleDuration(120)], [0, 1], {
    extrapolateRight: "clamp",
  });

  const contactY = interpolate(frame, [scaleDuration(100), scaleDuration(120)], [15, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });

  // Floating background logo animation
  const float1Y = interpolate(frame, [0, 147], [0, -20], { easing: Easing.linear });
  const float2Y = interpolate(frame, [0, 147], [0, 15], { easing: Easing.linear });

  // Bottom logo animation
  const bottomLogoOpacity = interpolate(frame, [scaleDuration(120), scaleDuration(140)], [0, 0.4], {
    extrapolateRight: "clamp",
  });

  const bottomLogoScale = spring({
    frame: frame - scaleDuration(120),
    fps,
    config: SPRING_CONFIGS.smooth,
  });

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
      {/* Background floating orbs */}
      <FloatingOrb
        size={500}
        color="rgba(255, 255, 255, 0.1)"
        initialX={1500}
        initialY={100 + float1Y}
        floatRangeX={40}
        floatRangeY={30}
        blur={150}
        opacity={0.3}
        delay={0}
      />
      <FloatingOrb
        size={400}
        color="rgba(255, 255, 255, 0.08)"
        initialX={200}
        initialY={700 + float2Y}
        floatRangeX={30}
        floatRangeY={40}
        blur={120}
        opacity={0.25}
        delay={10}
      />
      <FloatingOrb
        size={300}
        color={COLORS.accent}
        initialX={1700}
        initialY={800}
        floatRangeX={25}
        floatRangeY={20}
        blur={100}
        opacity={0.15}
        delay={20}
      />

      {/* Radial glow for depth */}
      <RadialGlow
        color="rgba(255, 255, 255, 0.2)"
        size={800}
        x="50%"
        y="45%"
        opacity={0.4}
        blur={180}
        pulseIntensity={0.1}
        pulseDuration={60}
      />

      {/* Background decorative Forward arrows */}
      <div
        style={{
          position: "absolute",
          top: 50 + float1Y,
          left: 80,
          opacity: 0.04,
          transform: "rotate(-15deg)",
        }}
      >
        <svg viewBox="0 0 180 250" style={{ width: 200, height: 280 }}>
          <polygon fill={COLORS.white} points="107.14 79.12 0 0 0 79.12 107.14 79.12" />
          <polygon fill={COLORS.white} points="171.19 126.42 116.26 85.86 116.26 116.26 36.4 116.26 36.4 142.94 116.26 142.94 116.26 170.02 171.19 126.42" />
          <polygon fill={COLORS.white} points="36.4 233.42 103.59 180.08 36.4 180.08 36.4 233.42" />
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 60 + float2Y,
          right: 100,
          opacity: 0.04,
          transform: "rotate(20deg)",
        }}
      >
        <svg viewBox="0 0 180 250" style={{ width: 240, height: 336 }}>
          <polygon fill={COLORS.white} points="107.14 79.12 0 0 0 79.12 107.14 79.12" />
          <polygon fill={COLORS.white} points="171.19 126.42 116.26 85.86 116.26 116.26 36.4 116.26 36.4 142.94 116.26 142.94 116.26 170.02 171.19 126.42" />
          <polygon fill={COLORS.white} points="36.4 233.42 103.59 180.08 36.4 180.08 36.4 233.42" />
        </svg>
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
        startFrame={scaleDuration(25)}
        color="rgba(255, 255, 255, 0.85)"
        fontSize={TYPOGRAPHY.body.large}
        maxWidth={800}
      />

      {/* CTA Button with Rotating Gradient */}
      <div style={{ marginTop: 30 }}>
        <GradientButton
          delay={scaleDuration(55)}
          height={64}
          borderRadius={32}
          gradientColors={["#a2aeff", "#ffffff", "#a2aeff"]}
          backgroundColor={COLORS.white}
          textColor={COLORS.primary}
          fontSize={22}
          fontWeight={700}
          spinDuration={90}
        >
          Schedule Your Discovery Call
        </GradientButton>
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
        {/* Email with glass effect */}
        <div
          style={{
            padding: "12px 24px",
            borderRadius: 12,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
          }}
        >
          <RandomizedText
            text="contact@forward-consulting.fr"
            startFrame={scaleDuration(100)}
            scrambleDuration={scaleDuration(15)}
            revealSpeed={scaleDuration(2)}
            fontSize={18}
            fontWeight={500}
            color="rgba(255, 255, 255, 0.9)"
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 8,
          }}
        >
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: 14,
              color: "rgba(255, 255, 255, 0.5)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              fontWeight: 500,
            }}
          >
            France
          </span>
          <div
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
            }}
          />
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: 14,
              color: "rgba(255, 255, 255, 0.5)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              fontWeight: 500,
            }}
          >
            EU/EMEA
          </span>
        </div>
      </div>

      {/* Bottom Logo */}
      <div
        style={{
          position: "absolute",
          bottom: 35,
          opacity: bottomLogoOpacity,
          transform: `scale(${bottomLogoScale})`,
        }}
      >
        <svg viewBox="0 0 180 250" style={{ width: 36, height: 50 }}>
          <polygon fill={COLORS.white} points="107.14 79.12 0 0 0 79.12 107.14 79.12" />
          <polygon fill={COLORS.white} points="171.19 126.42 116.26 85.86 116.26 116.26 36.4 116.26 36.4 142.94 116.26 142.94 116.26 170.02 171.19 126.42" />
          <polygon fill={COLORS.white} points="36.4 233.42 103.59 180.08 36.4 180.08 36.4 233.42" />
        </svg>
      </div>

      {/* Subtle vignette for depth */}
      <Vignette intensity={0.25} color="rgba(0, 0, 0, 1)" />
    </AbsoluteFill>
  );
};
