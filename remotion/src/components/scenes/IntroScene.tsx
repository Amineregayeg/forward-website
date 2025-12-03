import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from "remotion";
import { ForwardLogo } from "../common/ForwardLogo";
import { COLORS } from "../../styles/colors";
import { TYPOGRAPHY, SPACING, SPRING_CONFIGS, scaleDuration } from "../../styles/constants";
import { GlassCard, FloatingOrb, RadialGlow, Vignette, RandomizedText, WordByWordText } from "../effects";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background gradient animation - faster
  const gradientAngle = interpolate(frame, [0, 210], [135, 180], {
    easing: Easing.linear,
  });

  // Tagline animation - faster timing
  const taglineDelay = scaleDuration(60);

  // Subtext animation - faster timing
  const subtextDelay = scaleDuration(90);

  // Decorative line animation - faster
  const lineWidth = interpolate(frame, [scaleDuration(120), scaleDuration(160)], [0, 200], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });

  const lineOpacity = interpolate(frame, [scaleDuration(120), scaleDuration(140)], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Bottom badge - faster
  const badgeOpacity = interpolate(frame, [scaleDuration(140), scaleDuration(170)], [0, 0.8], {
    extrapolateRight: "clamp",
  });

  const badgeY = interpolate(frame, [scaleDuration(140), scaleDuration(170)], [20, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });

  // Logo container scale for glass effect
  const logoContainerScale = spring({
    frame: frame - 5,
    fps,
    config: SPRING_CONFIGS.smooth,
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
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background floating orbs */}
      <FloatingOrb
        size={400}
        color={COLORS.primaryLight}
        initialX={1500}
        initialY={200}
        floatRangeX={30}
        floatRangeY={20}
        blur={120}
        opacity={0.15}
        delay={10}
      />
      <FloatingOrb
        size={300}
        color={COLORS.accent}
        initialX={200}
        initialY={700}
        floatRangeX={40}
        floatRangeY={25}
        blur={100}
        opacity={0.1}
        delay={20}
      />
      <FloatingOrb
        size={200}
        color={COLORS.primary}
        initialX={1600}
        initialY={800}
        floatRangeX={25}
        floatRangeY={35}
        blur={80}
        opacity={0.08}
        delay={30}
      />

      {/* Radial glow behind logo */}
      <RadialGlow
        color={COLORS.primaryLight}
        size={800}
        x="50%"
        y="45%"
        opacity={0.2}
        blur={150}
        pulseIntensity={0.08}
        pulseDuration={90}
      />

      {/* Main Logo in Glass Card */}
      <div
        style={{
          transform: `scale(${logoContainerScale})`,
        }}
      >
        <GlassCard
          delay={0}
          borderRadius={32}
          blurIntensity="lg"
          glowIntensity="md"
          shadowIntensity="lg"
          backgroundColor="rgba(255, 255, 255, 0.7)"
          borderColor="rgba(255, 255, 255, 0.9)"
        >
          <div style={{ padding: "40px 60px" }}>
            <ForwardLogo size={240} showText={true} delay={5} />
          </div>
        </GlassCard>
      </div>

      {/* Tagline with Randomized Text Effect */}
      <div style={{ marginTop: 30 }}>
        <RandomizedText
          text="CRM, Training & Consulting"
          startFrame={taglineDelay}
          scrambleDuration={scaleDuration(20)}
          revealSpeed={scaleDuration(3)}
          fontSize={TYPOGRAPHY.heading.small}
          fontWeight={500}
          color={COLORS.textSecondary}
        />
      </div>

      {/* Subtext with Word by Word */}
      <div style={{ maxWidth: 900, textAlign: "center" }}>
        <WordByWordText
          text="Enterprise-grade Salesforce & Marketing Cloud expertise for regulated industries"
          startFrame={subtextDelay}
          framesPerWord={scaleDuration(6)}
          fontSize={TYPOGRAPHY.body.large}
          fontWeight={400}
          color={COLORS.textSecondary}
          lineHeight={1.5}
        />
      </div>

      {/* Animated decorative line */}
      <div
        style={{
          width: lineWidth,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${COLORS.primary}, transparent)`,
          borderRadius: 2,
          opacity: lineOpacity,
          marginTop: 24,
        }}
      />

      {/* Bottom badge in glass panel */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          opacity: badgeOpacity,
          transform: `translateY(${badgeY}px)`,
        }}
      >
        <div
          style={{
            padding: "16px 32px",
            borderRadius: 12,
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          }}
        >
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: 14,
              color: COLORS.textMuted,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Trusted by Enterprise Leaders
          </span>
        </div>
      </div>

      {/* Subtle vignette for depth */}
      <Vignette intensity={0.15} color="rgba(27, 31, 51, 1)" />
    </AbsoluteFill>
  );
};
