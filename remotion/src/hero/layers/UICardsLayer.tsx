// Layer 3: UI Cards
// Three cards representing the data journey: Sources -> Pipeline -> Unified View

import React from "react";
import { interpolate } from "remotion";
import { BRAND_COLORS, ACTS, COPY, LAYOUT, TYPOGRAPHY } from "../constants/brand";
import { cardSlideIn, floatBobbing, staggeredEntrance } from "../motion/atomic";
import { framesFromSeconds, EASE_OUT, OVERSHOOT_BEZIER } from "../motion/easing";

interface UICardsLayerProps {
  frame: number;
  width: number;
  height: number;
}

interface CardData {
  title: string;
  bullets: string[];
  accentColor: string;
}

const CARDS: CardData[] = [
  {
    ...COPY.CARDS[0],
    accentColor: BRAND_COLORS.TEAL,
  },
  {
    ...COPY.CARDS[1],
    accentColor: BRAND_COLORS.ELECTRIC_TEAL,
  },
  {
    ...COPY.CARDS[2],
    accentColor: "#00E5E5", // Brightest for final
  },
];

const Card: React.FC<{
  card: CardData;
  index: number;
  frame: number;
  baseX: number;
  baseY: number;
}> = ({ card, index, frame, baseX, baseY }) => {
  // Card entrance animation
  const entranceStart = ACTS.ACT_2_START + index * framesFromSeconds(0.2);
  const entranceDuration = framesFromSeconds(0.6);

  const { translateX, opacity: slideOpacity } = cardSlideIn(frame, {
    start: entranceStart,
    duration: entranceDuration,
    fromX: -200 - index * 50,
    overshoot: true,
  });

  // Staggered opacity and scale
  const { opacity, scale } = staggeredEntrance(
    frame,
    index,
    entranceStart,
    framesFromSeconds(0.15),
    entranceDuration
  );

  // Floating effect after entrance
  const floatY = floatBobbing(frame, {
    amplitude: 10 + index * 2,
    periodFrames: framesFromSeconds(3 + index * 0.5),
    phase: index * 100,
  });

  // Only apply float after entrance is complete
  const floatOffset = frame > entranceStart + entranceDuration ? floatY : 0;

  // Card dimensions
  const cardWidth = LAYOUT.CARD_WIDTH;
  const cardHeight = LAYOUT.CARD_HEIGHT;

  // Z-depth offset (cards slightly overlap)
  const zOffset = index * 15;

  return (
    <div
      style={{
        position: "absolute",
        left: baseX + translateX + zOffset,
        top: baseY + index * (cardHeight * 0.35) + floatOffset,
        width: cardWidth,
        opacity: Math.min(opacity, slideOpacity),
        transform: `scale(${scale})`,
        zIndex: 10 - index,
      }}
    >
      {/* Card container */}
      <div
        style={{
          width: "100%",
          padding: 28,
          borderRadius: 20,
          background: `linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)`,
          backdropFilter: "blur(20px)",
          border: `1px solid rgba(255,255,255,0.15)`,
          boxShadow: `
            0 8px 32px rgba(0,0,0,0.3),
            0 2px 8px rgba(0,0,0,0.2),
            inset 0 1px 0 rgba(255,255,255,0.1)
          `,
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            width: 50,
            height: 4,
            borderRadius: 2,
            background: `linear-gradient(90deg, ${card.accentColor}, ${card.accentColor}80)`,
            marginBottom: 16,
          }}
        />

        {/* Title */}
        <h3
          style={{
            fontFamily: TYPOGRAPHY.FONT_FAMILY,
            fontSize: TYPOGRAPHY.CARD_TITLE_SIZE,
            fontWeight: 600,
            color: BRAND_COLORS.OFF_WHITE,
            margin: 0,
            marginBottom: 16,
            letterSpacing: "-0.01em",
          }}
        >
          {card.title}
        </h3>

        {/* Bullets */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {card.bullets.map((bullet, bulletIndex) => (
            <BulletItem
              key={bulletIndex}
              text={bullet}
              accentColor={card.accentColor}
              frame={frame}
              entranceStart={entranceStart + framesFromSeconds(0.3) + bulletIndex * 8}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const BulletItem: React.FC<{
  text: string;
  accentColor: string;
  frame: number;
  entranceStart: number;
}> = ({ text, accentColor, frame, entranceStart }) => {
  const opacity = interpolate(frame, [entranceStart, entranceStart + 20], [0, 1], {
    easing: EASE_OUT,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateX = interpolate(frame, [entranceStart, entranceStart + 25], [15, 0], {
    easing: EASE_OUT,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        opacity,
        transform: `translateX(${translateX}px)`,
      }}
    >
      {/* Bullet dot */}
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: accentColor,
          flexShrink: 0,
        }}
      />
      {/* Text */}
      <span
        style={{
          fontFamily: TYPOGRAPHY.FONT_FAMILY,
          fontSize: TYPOGRAPHY.CARD_BULLET_SIZE,
          color: `${BRAND_COLORS.OFF_WHITE}CC`,
          lineHeight: 1.4,
        }}
      >
        {text}
      </span>
    </div>
  );
};

export const UICardsLayer: React.FC<UICardsLayerProps> = ({ frame, width, height }) => {
  // Position cards in center-right area
  const baseX = width * 0.58;
  const baseY = height * 0.22;

  // Layer fade in - cards only appear in Act 2+
  const fadeIn = interpolate(frame, [ACTS.ACT_2_START - 10, ACTS.ACT_2_START], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Layer fade out for outro
  const fadeOut = interpolate(
    frame,
    [ACTS.CONTENT_FADE_OUT_START, ACTS.CONTENT_FADE_OUT_END],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const layerOpacity = Math.min(fadeIn, fadeOut);

  return (
    <div
      style={{
        position: "absolute",
        width,
        height,
        opacity: layerOpacity,
      }}
    >
      {CARDS.map((card, index) => (
        <Card key={index} card={card} index={index} frame={frame} baseX={baseX} baseY={baseY} />
      ))}
    </div>
  );
};
