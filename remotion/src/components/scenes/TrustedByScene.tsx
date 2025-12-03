import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from "remotion";
import { AnimatedHeading } from "../common/AnimatedText";
import { COLORS } from "../../styles/colors";
import { TYPOGRAPHY, SPACING, SPRING_CONFIGS, scaleDuration } from "../../styles/constants";
import { GlassCard, FloatingOrb, RadialGlow, Vignette, CountUpText } from "../effects";

interface ClientLogoProps {
  name: string;
  index: number;
  startFrame: number;
}

const ClientLogo: React.FC<ClientLogoProps> = ({ name, index, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = index * scaleDuration(10);
  const logoStartFrame = startFrame + delay;

  const scale = spring({
    frame: frame - logoStartFrame,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  const opacity = interpolate(
    frame,
    [logoStartFrame, logoStartFrame + scaleDuration(20)],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Subtle pulse effect - faster
  const pulse = interpolate(
    frame,
    [logoStartFrame + scaleDuration(45) + index * scaleDuration(10), logoStartFrame + scaleDuration(60) + index * scaleDuration(10), logoStartFrame + scaleDuration(75) + index * scaleDuration(10)],
    [1, 1.03, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Glow intensity animation
  const glowOpacity = interpolate(
    frame,
    [logoStartFrame + scaleDuration(45), logoStartFrame + scaleDuration(60), logoStartFrame + scaleDuration(75)],
    [0, 0.3, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale * pulse})`,
        position: "relative",
      }}
    >
      {/* Glow effect */}
      <div
        style={{
          position: "absolute",
          inset: -10,
          borderRadius: 20,
          background: COLORS.primary,
          filter: "blur(20px)",
          opacity: glowOpacity,
        }}
      />
      <GlassCard
        delay={0}
        borderRadius={16}
        blurIntensity="sm"
        glowIntensity="none"
        shadowIntensity="sm"
        backgroundColor="rgba(255, 255, 255, 0.95)"
        borderColor="rgba(255, 255, 255, 0.9)"
      >
        <div
          style={{
            width: 200,
            height: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: 24,
              fontWeight: 800,
              color: COLORS.primary,
              letterSpacing: "0.03em",
            }}
          >
            {name}
          </span>
        </div>
      </GlassCard>
    </div>
  );
};

interface StatCardProps {
  value: number;
  suffix: string;
  label: string;
  index: number;
  startFrame: number;
}

const StatCard: React.FC<StatCardProps> = ({ value, suffix, label, index, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = index * scaleDuration(12);
  const statStartFrame = startFrame + delay;

  const opacity = interpolate(
    frame,
    [statStartFrame, statStartFrame + scaleDuration(20)],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  const translateY = interpolate(
    frame,
    [statStartFrame, statStartFrame + scaleDuration(25)],
    [25, 0],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateRight: "clamp",
    }
  );

  const scale = spring({
    frame: frame - statStartFrame,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
      }}
    >
      <GlassCard
        delay={0}
        borderRadius={20}
        blurIntensity="md"
        glowIntensity="sm"
        shadowIntensity="sm"
        backgroundColor="rgba(27, 31, 51, 0.03)"
        borderColor="rgba(27, 31, 51, 0.08)"
      >
        <div
          style={{
            padding: "24px 40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <CountUpText
            endValue={value}
            startFrame={statStartFrame}
            duration={scaleDuration(30)}
            suffix={suffix}
            fontSize={52}
            fontWeight={800}
            color={COLORS.primary}
          />
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: 14,
              color: COLORS.textSecondary,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontWeight: 500,
            }}
          >
            {label}
          </span>
        </div>
      </GlassCard>
    </div>
  );
};

export const TrustedByScene: React.FC = () => {
  const frame = useCurrentFrame();

  const clients = ["MSD", "GENERALI", "Biogen", "MARS"];

  // Stats data - numeric for count up
  const stats = [
    { value: 60, suffix: "%", label: "of Big 4 pricing" },
    { value: 15, suffix: "+", label: "years expertise" },
    { value: 100, suffix: "%", label: "senior consultants" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.white} 0%, ${COLORS.offWhite} 100%)`,
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
      {/* Background effects */}
      <FloatingOrb
        size={300}
        color={COLORS.primaryLight}
        initialX={1600}
        initialY={200}
        floatRangeX={25}
        floatRangeY={20}
        blur={100}
        opacity={0.12}
        delay={0}
      />
      <FloatingOrb
        size={250}
        color={COLORS.accent}
        initialX={150}
        initialY={750}
        floatRangeX={30}
        floatRangeY={25}
        blur={80}
        opacity={0.1}
        delay={10}
      />

      <RadialGlow
        color={COLORS.primary}
        size={600}
        x="50%"
        y="35%"
        opacity={0.08}
        blur={120}
        pulseIntensity={0.06}
        pulseDuration={90}
      />

      {/* Section Header */}
      <AnimatedHeading
        text="Trusted by Industry Leaders"
        startFrame={0}
        fontSize={TYPOGRAPHY.heading.medium}
        color={COLORS.primary}
      />

      {/* Client Logos */}
      <div
        style={{
          display: "flex",
          gap: 28,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {clients.map((client, index) => (
          <ClientLogo
            key={client}
            name={client}
            index={index}
            startFrame={scaleDuration(30)}
          />
        ))}
      </div>

      {/* Stats Section */}
      <div
        style={{
          display: "flex",
          gap: 40,
          marginTop: 20,
        }}
      >
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            index={index}
            startFrame={scaleDuration(85)}
          />
        ))}
      </div>

      {/* Subtle vignette */}
      <Vignette intensity={0.12} color="rgba(27, 31, 51, 1)" />
    </AbsoluteFill>
  );
};
