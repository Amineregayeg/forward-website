import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from "remotion";
import { AnimatedHeading } from "../common/AnimatedText";
import { ForwardIcon } from "../common/ForwardLogo";
import { COLORS } from "../../styles/colors";
import { TYPOGRAPHY, SPACING, SPRING_CONFIGS } from "../../styles/constants";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
  startFrame: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  index,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = index * 20;
  const cardStartFrame = startFrame + delay;

  const scale = spring({
    frame: frame - cardStartFrame,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  const opacity = interpolate(
    frame,
    [cardStartFrame, cardStartFrame + 30],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const translateY = interpolate(
    frame,
    [cardStartFrame, cardStartFrame + 40],
    [60, 0],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Subtle hover-like effect
  const hoverScale = interpolate(
    frame,
    [cardStartFrame + 80, cardStartFrame + 100, cardStartFrame + 120],
    [1, 1.02, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <div
      style={{
        width: 340,
        padding: 36,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        boxShadow: "0 8px 40px rgba(27, 31, 51, 0.08)",
        border: `1px solid ${COLORS.lightGray}`,
        opacity,
        transform: `translateY(${translateY}px) scale(${scale * hoverScale})`,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: 14,
          backgroundColor: `${COLORS.primary}10`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
        }}
      >
        {icon}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: COLORS.primary,
          margin: 0,
          fontFamily: TYPOGRAPHY.fontFamily,
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
          lineHeight: 1.5,
        }}
      >
        {description}
      </p>
    </div>
  );
};

export const ServicesScene: React.FC = () => {
  const frame = useCurrentFrame();

  const services = [
    {
      title: "CRM Consulting",
      description: "Governance-first architecture with audit-ready compliance from Day 1",
      icon: "🎯",
    },
    {
      title: "Integrations",
      description: "Safe Salesforce, Veeva & Marketing Cloud integrations that scale",
      icon: "🔗",
    },
    {
      title: "Training",
      description: "Enablement programs that build internal expertise and independence",
      icon: "📚",
    },
  ];

  // Background animation
  const bgY = interpolate(frame, [0, 450], [0, -20], {
    easing: Easing.linear,
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.offWhite,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: SPACING.page,
        gap: SPACING.section,
      }}
    >
      {/* Background decorative element */}
      <div
        style={{
          position: "absolute",
          top: bgY,
          right: -100,
          opacity: 0.02,
          transform: "rotate(10deg)",
        }}
      >
        <ForwardIcon size={600} color={COLORS.primary} />
      </div>

      {/* Section Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <AnimatedHeading
          text="What We Do"
          startFrame={0}
          fontSize={TYPOGRAPHY.heading.medium}
          color={COLORS.primary}
        />
        <p
          style={{
            fontSize: TYPOGRAPHY.body.medium,
            color: COLORS.textSecondary,
            margin: 0,
            fontFamily: TYPOGRAPHY.fontFamily,
            textAlign: "center",
            maxWidth: 700,
            opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [30, 60], [20, 0], { extrapolateRight: "clamp" })}px)`,
          }}
        >
          Expert solutions for regulated industries: Healthcare, Pharma, Insurance
        </p>
      </div>

      {/* Service Cards */}
      <div
        style={{
          display: "flex",
          gap: 32,
          justifyContent: "center",
        }}
      >
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            {...service}
            index={index}
            startFrame={80}
          />
        ))}
      </div>

      {/* Bottom highlight */}
      <div
        style={{
          display: "flex",
          gap: 40,
          marginTop: 20,
          opacity: interpolate(frame, [300, 350], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        {["GDPR Compliant", "HIPAA Ready", "Senior Experts Only"].map((badge, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: 14,
              color: COLORS.textMuted,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            <span style={{ color: COLORS.success }}>✓</span>
            {badge}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
