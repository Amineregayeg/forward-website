import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS } from "../../styles/colors";
import { TYPOGRAPHY } from "../../styles/constants";

interface AnimatedHeadingProps {
  text: string;
  startFrame?: number;
  duration?: number;
  color?: string;
  fontSize?: number;
  fontWeight?: number;
  textAlign?: "left" | "center" | "right";
  maxWidth?: number;
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  text,
  startFrame = 0,
  duration = 40,
  color = COLORS.primary,
  fontSize = TYPOGRAPHY.heading.medium,
  fontWeight = 700,
  textAlign = "center",
  maxWidth = 1000,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + duration * 0.4],
    [0, 1],
    {
      easing: Easing.out(Easing.quad),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const translateY = interpolate(
    frame,
    [startFrame, startFrame + duration * 0.4],
    [40, 0],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const scale = interpolate(
    frame,
    [startFrame, startFrame + duration * 0.3],
    [0.95, 1],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <h1
      style={{
        fontSize,
        fontWeight,
        color,
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        margin: 0,
        fontFamily: TYPOGRAPHY.fontFamily,
        letterSpacing: "-0.02em",
        lineHeight: 1.1,
        textAlign,
        maxWidth,
      }}
    >
      {text}
    </h1>
  );
};

interface AnimatedSubheadingProps {
  text: string;
  startFrame?: number;
  duration?: number;
  color?: string;
  fontSize?: number;
  maxWidth?: number;
}

export const AnimatedSubheading: React.FC<AnimatedSubheadingProps> = ({
  text,
  startFrame = 0,
  duration = 35,
  color = COLORS.textSecondary,
  fontSize = TYPOGRAPHY.body.large,
  maxWidth = 800,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + duration * 0.5],
    [0, 1],
    {
      easing: Easing.out(Easing.quad),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const translateY = interpolate(
    frame,
    [startFrame, startFrame + duration * 0.5],
    [25, 0],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <p
      style={{
        fontSize,
        fontWeight: 400,
        color,
        opacity,
        transform: `translateY(${translateY}px)`,
        margin: 0,
        fontFamily: TYPOGRAPHY.fontFamily,
        lineHeight: 1.5,
        textAlign: "center",
        maxWidth,
      }}
    >
      {text}
    </p>
  );
};

interface StaggeredListProps {
  items: string[];
  staggerDelay?: number;
  startFrame?: number;
  itemDuration?: number;
  color?: string;
  fontSize?: number;
  icon?: string;
}

export const StaggeredFeatureList: React.FC<StaggeredListProps> = ({
  items,
  staggerDelay = 15,
  startFrame = 0,
  itemDuration = 40,
  color = COLORS.primary,
  fontSize = TYPOGRAPHY.body.large,
  icon = "",
}) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {items.map((item, index) => {
        const itemStartFrame = startFrame + index * staggerDelay;
        const itemEndFrame = itemStartFrame + itemDuration;

        const opacity = interpolate(
          frame,
          [itemStartFrame, itemEndFrame],
          [0, 1],
          {
            easing: Easing.out(Easing.quad),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }
        );

        const slideX = interpolate(
          frame,
          [itemStartFrame, itemEndFrame],
          [-40, 0],
          {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }
        );

        const scale = interpolate(
          frame,
          [itemStartFrame, itemStartFrame + itemDuration * 0.5],
          [0.9, 1],
          {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }
        );

        return (
          <div
            key={index}
            style={{
              opacity,
              transform: `translateX(${slideX}px) scale(${scale})`,
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize,
              fontWeight: 600,
              color,
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            {icon && (
              <span style={{ fontSize: fontSize * 1.2 }}>{icon}</span>
            )}
            {item}
          </div>
        );
      })}
    </div>
  );
};

// Character by character reveal for premium effect
export const CharacterReveal: React.FC<{
  text: string;
  startFrame?: number;
  duration?: number;
  color?: string;
  fontSize?: number;
}> = ({
  text,
  startFrame = 0,
  duration = 60,
  color = COLORS.primary,
  fontSize = TYPOGRAPHY.heading.large,
}) => {
  const frame = useCurrentFrame();
  const chars = text.split("");
  const charsPerFrame = chars.length / duration;

  return (
    <div
      style={{
        display: "flex",
        fontWeight: 700,
        fontFamily: TYPOGRAPHY.fontFamily,
        fontSize,
        letterSpacing: "-0.02em",
      }}
    >
      {chars.map((char, i) => {
        const charStartFrame = startFrame + i / charsPerFrame;
        const charOpacity = interpolate(
          frame,
          [charStartFrame, charStartFrame + 5],
          [0, 1],
          {
            easing: Easing.out(Easing.quad),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }
        );

        const charY = interpolate(
          frame,
          [charStartFrame, charStartFrame + 5],
          [10, 0],
          {
            easing: Easing.out(Easing.quad),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }
        );

        return (
          <span
            key={i}
            style={{
              opacity: charOpacity,
              color,
              transform: `translateY(${charY}px)`,
              display: "inline-block",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </div>
  );
};
