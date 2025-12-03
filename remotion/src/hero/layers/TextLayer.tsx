// Layer 4: Text Layer
// H1, Subheadline, Value Prop Carousel, CTA, Logo

import React from "react";
import { interpolate, Easing } from "remotion";
import { BRAND_COLORS, ACTS, COPY, LAYOUT, TYPOGRAPHY, TIMING } from "../constants/brand";
import { fadeInUp, textCarouselState, ctaGlow } from "../motion/atomic";
import { framesFromSeconds, EASE_OUT } from "../motion/easing";

interface TextLayerProps {
  frame: number;
  width: number;
  height: number;
}

// Forward Logo SVG component
const ForwardLogo: React.FC<{ size: number; opacity: number }> = ({ size, opacity }) => (
  <svg
    viewBox="0 0 180 250"
    style={{ width: size, height: size * (250 / 180), opacity }}
  >
    <polygon fill={BRAND_COLORS.OFF_WHITE} points="107.14 79.12 0 0 0 79.12 107.14 79.12" />
    <polygon
      fill={BRAND_COLORS.OFF_WHITE}
      points="171.19 126.42 116.26 85.86 116.26 116.26 36.4 116.26 36.4 142.94 116.26 142.94 116.26 170.02 171.19 126.42"
    />
    <polygon fill={BRAND_COLORS.OFF_WHITE} points="36.4 233.42 103.59 180.08 36.4 180.08 36.4 233.42" />
  </svg>
);

// Word-by-word reveal for H1
const AnimatedHeadline: React.FC<{
  text: string;
  frame: number;
  startFrame: number;
}> = ({ text, frame, startFrame }) => {
  const words = text.split(" ");

  return (
    <h1
      style={{
        fontFamily: TYPOGRAPHY.FONT_FAMILY,
        fontSize: TYPOGRAPHY.H1_SIZE,
        fontWeight: TYPOGRAPHY.H1_WEIGHT,
        lineHeight: TYPOGRAPHY.H1_LINE_HEIGHT,
        color: BRAND_COLORS.OFF_WHITE,
        margin: 0,
        maxWidth: 600,
        letterSpacing: "-0.02em",
      }}
    >
      {words.map((word, index) => {
        const wordStart = startFrame + index * 6;
        const wordOpacity = interpolate(frame, [wordStart, wordStart + 15], [0, 1], {
          easing: EASE_OUT,
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const wordY = interpolate(frame, [wordStart, wordStart + 18], [25, 0], {
          easing: EASE_OUT,
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <span
            key={index}
            style={{
              display: "inline-block",
              opacity: wordOpacity,
              transform: `translateY(${wordY}px)`,
              marginRight: "0.25em",
            }}
          >
            {word}
          </span>
        );
      })}
    </h1>
  );
};

// Carousel component for value props
const ValueCarousel: React.FC<{
  items: string[];
  frame: number;
  startFrame: number;
}> = ({ items, frame, startFrame }) => {
  // Only show carousel after it starts
  if (frame < startFrame) return null;

  const adjustedFrame = frame - startFrame;

  const { activeIndex, opacity, translateY } = textCarouselState(adjustedFrame, {
    items,
    showDuration: framesFromSeconds(2.2), // Show each item for 2.2s
    transitionDuration: framesFromSeconds(0.5), // 0.5s transition
  });

  const containerOpacity = interpolate(frame, [startFrame, startFrame + 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity: containerOpacity,
        height: 60,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          opacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        {/* Indicator dot */}
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: BRAND_COLORS.ELECTRIC_TEAL,
            flexShrink: 0,
          }}
        />
        {/* Text */}
        <span
          style={{
            fontFamily: TYPOGRAPHY.FONT_FAMILY,
            fontSize: TYPOGRAPHY.CAROUSEL_SIZE,
            color: `${BRAND_COLORS.OFF_WHITE}CC`,
            lineHeight: TYPOGRAPHY.CAROUSEL_LINE_HEIGHT,
          }}
        >
          {items[activeIndex]}
        </span>
      </div>
    </div>
  );
};

// CTA Button component
const CTAButton: React.FC<{
  text: string;
  frame: number;
  startFrame: number;
}> = ({ text, frame, startFrame }) => {
  const { opacity, translateY } = fadeInUp(frame, {
    start: startFrame,
    duration: 35,
    fromY: 25,
  });

  const { shadowIntensity, scale } = ctaGlow(frame, {
    periodFrames: framesFromSeconds(2.5),
    minIntensity: 0.3,
    maxIntensity: 0.6,
  });

  // Only apply glow after entrance
  const glowActive = frame > startFrame + 35;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${glowActive ? scale : 1})`,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px 36px",
          borderRadius: 50,
          background: `linear-gradient(135deg, ${BRAND_COLORS.TEAL}, ${BRAND_COLORS.ELECTRIC_TEAL})`,
          boxShadow: glowActive
            ? `0 0 ${30 * shadowIntensity}px ${BRAND_COLORS.GLOW_TEAL}, 0 4px 20px rgba(0,0,0,0.3)`
            : "0 4px 20px rgba(0,0,0,0.3)",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            fontFamily: TYPOGRAPHY.FONT_FAMILY,
            fontSize: TYPOGRAPHY.CTA_SIZE,
            fontWeight: TYPOGRAPHY.CTA_WEIGHT,
            color: BRAND_COLORS.NAVY,
            letterSpacing: "-0.01em",
          }}
        >
          {text}
        </span>
        {/* Arrow icon */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          style={{ marginLeft: 10 }}
        >
          <path
            d="M5 12h14M12 5l7 7-7 7"
            stroke={BRAND_COLORS.NAVY}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export const TextLayer: React.FC<TextLayerProps> = ({ frame, width, height }) => {
  // Position in left 40% of screen
  const marginLeft = LAYOUT.TEXT_MARGIN_LEFT;
  const marginTop = LAYOUT.TEXT_MARGIN_TOP;

  // Logo entrance
  const logoStart = 30;
  const { opacity: logoOpacity, translateY: logoY } = fadeInUp(frame, {
    start: logoStart,
    duration: 30,
    fromY: 20,
  });

  // H1 entrance
  const h1Start = 50;

  // Subheadline entrance
  const subStart = h1Start + 40;
  const { opacity: subOpacity, translateY: subY } = fadeInUp(frame, {
    start: subStart,
    duration: 35,
    fromY: 25,
  });

  // Carousel start
  const carouselStart = ACTS.ACT_3_START;

  // CTA entrance
  const ctaStart = ACTS.ACT_3_START + 30;

  // Layer fade out for outro
  const fadeOut = interpolate(
    frame,
    [ACTS.CONTENT_FADE_OUT_START, ACTS.CONTENT_FADE_OUT_END],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        width,
        height,
        pointerEvents: "none",
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: marginLeft,
          top: marginTop,
          width: width * LAYOUT.TEXT_AREA_WIDTH,
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        {/* Logo */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `translateY(${logoY}px)`,
            marginBottom: 16,
          }}
        >
          <ForwardLogo size={45} opacity={1} />
        </div>

        {/* H1 */}
        <AnimatedHeadline text={COPY.H1} frame={frame} startFrame={h1Start} />

        {/* Subheadline */}
        <p
          style={{
            fontFamily: TYPOGRAPHY.FONT_FAMILY,
            fontSize: TYPOGRAPHY.SUBHEAD_SIZE,
            fontWeight: TYPOGRAPHY.SUBHEAD_WEIGHT,
            lineHeight: TYPOGRAPHY.SUBHEAD_LINE_HEIGHT,
            color: `${BRAND_COLORS.OFF_WHITE}B0`,
            margin: 0,
            maxWidth: 520,
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
          }}
        >
          {COPY.SUBHEADLINE}
        </p>

        {/* Value prop carousel */}
        <ValueCarousel items={COPY.CAROUSEL} frame={frame} startFrame={carouselStart} />

        {/* CTA Button */}
        <CTAButton text={COPY.CTA_TEXT} frame={frame} startFrame={ctaStart} />
      </div>
    </div>
  );
};
