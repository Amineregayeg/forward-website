import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from "remotion";
import { AnimatedHeading } from "../common/AnimatedText";
import { COLORS } from "../../styles/colors";
import { TYPOGRAPHY, SPACING, SPRING_CONFIGS, scaleDuration } from "../../styles/constants";
import { GlassCard, FloatingOrb, RadialGlow, Vignette, WordByWordText } from "../effects";

interface ServiceCardProps {
  title: string;
  description: string;
  index: number;
  startFrame: number;
  accentColor: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  index,
  startFrame,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = index * scaleDuration(15);
  const cardStartFrame = startFrame + delay;

  const scale = spring({
    frame: frame - cardStartFrame,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  const opacity = interpolate(
    frame,
    [cardStartFrame, cardStartFrame + scaleDuration(25)],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const translateY = interpolate(
    frame,
    [cardStartFrame, cardStartFrame + scaleDuration(30)],
    [50, 0],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Subtle hover-like effect - faster
  const hoverScale = interpolate(
    frame,
    [cardStartFrame + scaleDuration(60), cardStartFrame + scaleDuration(75), cardStartFrame + scaleDuration(90)],
    [1, 1.02, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Accent bar animation
  const barWidth = interpolate(
    frame,
    [cardStartFrame + scaleDuration(15), cardStartFrame + scaleDuration(35)],
    [0, 60],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale * hoverScale})`,
      }}
    >
      <GlassCard
        delay={0}
        borderRadius={24}
        blurIntensity="md"
        glowIntensity="sm"
        shadowIntensity="md"
        backgroundColor="rgba(255, 255, 255, 0.85)"
        borderColor="rgba(255, 255, 255, 0.9)"
      >
        <div
          style={{
            width: 320,
            padding: 36,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {/* Accent bar */}
          <div
            style={{
              width: barWidth,
              height: 4,
              background: `linear-gradient(90deg, ${accentColor}, ${accentColor}80)`,
              borderRadius: 2,
            }}
          />

          {/* Title */}
          <h3
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: COLORS.primary,
              margin: 0,
              fontFamily: TYPOGRAPHY.fontFamily,
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            style={{
              fontSize: 16,
              color: COLORS.textSecondary,
              margin: 0,
              fontFamily: TYPOGRAPHY.fontFamily,
              lineHeight: 1.6,
            }}
          >
            {description}
          </p>
        </div>
      </GlassCard>
    </div>
  );
};

export const ServicesScene: React.FC = () => {
  const frame = useCurrentFrame();

  const services = [
    {
      title: "CRM Consulting",
      description: "Governance-first architecture with audit-ready compliance from Day 1",
      accentColor: COLORS.primary,
    },
    {
      title: "Integrations",
      description: "Safe Salesforce, Veeva & Marketing Cloud integrations that scale",
      accentColor: COLORS.primaryLight,
    },
    {
      title: "Training",
      description: "Enablement programs that build internal expertise and independence",
      accentColor: COLORS.accent,
    },
  ];

  // Background animation - faster
  const bgY = interpolate(frame, [0, 315], [0, -15], {
    easing: Easing.linear,
  });

  // Badges animation - faster
  const badgesOpacity = interpolate(frame, [scaleDuration(220), scaleDuration(260)], [0, 1], {
    extrapolateRight: "clamp",
  });

  const badgesY = interpolate(frame, [scaleDuration(220), scaleDuration(260)], [20, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.offWhite} 0%, ${COLORS.white} 100%)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: SPACING.page,
        gap: SPACING.section,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background floating orbs */}
      <FloatingOrb
        size={350}
        color={COLORS.primary}
        initialX={100}
        initialY={150}
        floatRangeX={20}
        floatRangeY={15}
        blur={100}
        opacity={0.08}
        delay={0}
      />
      <FloatingOrb
        size={250}
        color={COLORS.accent}
        initialX={1700}
        initialY={600}
        floatRangeX={30}
        floatRangeY={20}
        blur={80}
        opacity={0.1}
        delay={15}
      />

      {/* Radial glow for depth */}
      <RadialGlow
        color={COLORS.primaryLight}
        size={1000}
        x="50%"
        y="60%"
        opacity={0.12}
        blur={200}
        pulseIntensity={0.05}
        pulseDuration={120}
      />

      {/* Section Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <AnimatedHeading
          text="What We Do"
          startFrame={0}
          fontSize={TYPOGRAPHY.heading.medium}
          color={COLORS.primary}
        />
        <div style={{ maxWidth: 700, textAlign: "center" }}>
          <WordByWordText
            text="Expert solutions for regulated industries: Healthcare, Pharma, Insurance"
            startFrame={scaleDuration(25)}
            framesPerWord={scaleDuration(5)}
            fontSize={TYPOGRAPHY.body.medium}
            fontWeight={400}
            color={COLORS.textSecondary}
            lineHeight={1.5}
          />
        </div>
      </div>

      {/* Service Cards */}
      <div
        style={{
          display: "flex",
          gap: 36,
          justifyContent: "center",
        }}
      >
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            accentColor={service.accentColor}
            index={index}
            startFrame={scaleDuration(60)}
          />
        ))}
      </div>

      {/* Bottom highlights */}
      <div
        style={{
          display: "flex",
          gap: 40,
          marginTop: 24,
          opacity: badgesOpacity,
          transform: `translateY(${badgesY}px)`,
        }}
      >
        {["GDPR Compliant", "HIPAA Ready", "Senior Experts Only"].map((badge, i) => {
          const badgeDelay = i * scaleDuration(8);
          const individualOpacity = interpolate(
            frame,
            [scaleDuration(220) + badgeDelay, scaleDuration(245) + badgeDelay],
            [0, 1],
            { extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontFamily: TYPOGRAPHY.fontFamily,
                fontSize: 14,
                color: COLORS.textMuted,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                opacity: individualOpacity,
                padding: "8px 16px",
                borderRadius: 8,
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(4px)",
                border: "1px solid rgba(255, 255, 255, 0.6)",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: COLORS.success,
                }}
              />
              {badge}
            </div>
          );
        })}
      </div>

      {/* Subtle vignette */}
      <Vignette intensity={0.1} color="rgba(27, 31, 51, 1)" />
    </AbsoluteFill>
  );
};
