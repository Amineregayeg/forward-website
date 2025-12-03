import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from "remotion";
import { AnimatedHeading } from "../common/AnimatedText";
import { COLORS } from "../../styles/colors";
import { TYPOGRAPHY, SPACING, SPRING_CONFIGS } from "../../styles/constants";

interface ClientLogoProps {
  name: string;
  index: number;
  startFrame: number;
}

const ClientLogo: React.FC<ClientLogoProps> = ({ name, index, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = index * 12;
  const logoStartFrame = startFrame + delay;

  const scale = spring({
    frame: frame - logoStartFrame,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  const opacity = interpolate(
    frame,
    [logoStartFrame, logoStartFrame + 25],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Subtle pulse effect
  const pulse = interpolate(
    frame,
    [logoStartFrame + 60 + index * 15, logoStartFrame + 80 + index * 15, logoStartFrame + 100 + index * 15],
    [1, 1.05, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <div
      style={{
        width: 220,
        height: 100,
        backgroundColor: COLORS.white,
        borderRadius: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 24px rgba(27, 31, 51, 0.06)",
        border: `1px solid ${COLORS.lightGray}`,
        opacity,
        transform: `scale(${scale * pulse})`,
      }}
    >
      <span
        style={{
          fontFamily: TYPOGRAPHY.fontFamily,
          fontSize: 22,
          fontWeight: 700,
          color: COLORS.primary,
          letterSpacing: "0.02em",
        }}
      >
        {name}
      </span>
    </div>
  );
};

export const TrustedByScene: React.FC = () => {
  const frame = useCurrentFrame();

  const clients = ["MSD", "GENERALI", "Biogen", "MARS"];

  // Stats data
  const stats = [
    { value: "60%", label: "of Big 4 pricing" },
    { value: "15+", label: "years expertise" },
    { value: "100%", label: "senior consultants" },
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
      }}
    >
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
          gap: 32,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {clients.map((client, index) => (
          <ClientLogo
            key={client}
            name={client}
            index={index}
            startFrame={40}
          />
        ))}
      </div>

      {/* Stats Section */}
      <div
        style={{
          display: "flex",
          gap: 80,
          marginTop: 40,
        }}
      >
        {stats.map((stat, index) => {
          const statDelay = 120 + index * 20;
          const opacity = interpolate(
            frame,
            [statDelay, statDelay + 30],
            [0, 1],
            { extrapolateRight: "clamp" }
          );
          const translateY = interpolate(
            frame,
            [statDelay, statDelay + 30],
            [30, 0],
            {
              easing: Easing.out(Easing.cubic),
              extrapolateRight: "clamp",
            }
          );

          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                opacity,
                transform: `translateY(${translateY}px)`,
              }}
            >
              <span
                style={{
                  fontFamily: TYPOGRAPHY.fontFamily,
                  fontSize: 48,
                  fontWeight: 800,
                  color: COLORS.primary,
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontFamily: TYPOGRAPHY.fontFamily,
                  fontSize: 16,
                  color: COLORS.textSecondary,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
