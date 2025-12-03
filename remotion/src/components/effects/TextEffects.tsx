import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";
import { SPRING_CONFIGS, scaleDuration } from "../../styles/constants";

const LETTERS_AND_SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

interface RandomizedTextProps {
  text: string;
  startFrame?: number;
  scrambleDuration?: number; // frames of initial scramble
  revealSpeed?: number; // frames per character reveal
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  fontFamily?: string;
}

export const RandomizedText: React.FC<RandomizedTextProps> = ({
  text,
  startFrame = 0,
  scrambleDuration = 15,
  revealSpeed = 2,
  fontSize = 48,
  fontWeight = 700,
  color = "#1b1f33",
  fontFamily = "'SF Pro Display', 'Inter', system-ui, sans-serif",
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - startFrame);

  // Generate deterministic "random" character based on frame and position
  const getRandomChar = (position: number, currentFrame: number): string => {
    const seed = (position * 7 + currentFrame * 13) % LETTERS_AND_SYMBOLS.length;
    return LETTERS_AND_SYMBOLS[seed];
  };

  // Calculate which characters are revealed
  const revealedChars = Math.floor(
    Math.max(0, adjustedFrame - scrambleDuration) / revealSpeed
  );

  // Build the display text
  const displayText = text.split("").map((char, index) => {
    if (char === " ") return " ";
    if (index < revealedChars) {
      return char;
    }
    if (adjustedFrame > 0) {
      return getRandomChar(index, adjustedFrame);
    }
    return char;
  }).join("");

  // Opacity animation
  const opacity = interpolate(
    adjustedFrame,
    [0, scaleDuration(10)],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  return (
    <span
      style={{
        fontSize,
        fontWeight,
        color,
        fontFamily,
        opacity,
        letterSpacing: "0.02em",
      }}
    >
      {displayText}
    </span>
  );
};

interface GlitchTextProps {
  text: string;
  startFrame?: number;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  glitchIntensity?: "sm" | "md" | "lg";
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  startFrame = 0,
  fontSize = 48,
  fontWeight = 700,
  color = "#1b1f33",
  glitchIntensity = "md",
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - startFrame);

  const intensityMap = { sm: 2, md: 4, lg: 8 };
  const intensity = intensityMap[glitchIntensity];

  // Create glitch offset effect
  const glitchActive = (adjustedFrame % 30) < 3; // Glitch every 30 frames for 3 frames
  const offsetX = glitchActive ? ((adjustedFrame * 7) % intensity) - intensity / 2 : 0;
  const offsetY = glitchActive ? ((adjustedFrame * 11) % intensity) - intensity / 2 : 0;

  const opacity = interpolate(
    adjustedFrame,
    [0, scaleDuration(15)],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Red channel offset */}
      {glitchActive && (
        <span
          style={{
            position: "absolute",
            left: -offsetX,
            top: -offsetY,
            fontSize,
            fontWeight,
            color: "rgba(255, 0, 0, 0.5)",
            fontFamily: "'SF Pro Display', 'Inter', system-ui, sans-serif",
            opacity: 0.7,
          }}
        >
          {text}
        </span>
      )}
      {/* Cyan channel offset */}
      {glitchActive && (
        <span
          style={{
            position: "absolute",
            left: offsetX,
            top: offsetY,
            fontSize,
            fontWeight,
            color: "rgba(0, 255, 255, 0.5)",
            fontFamily: "'SF Pro Display', 'Inter', system-ui, sans-serif",
            opacity: 0.7,
          }}
        >
          {text}
        </span>
      )}
      {/* Main text */}
      <span
        style={{
          position: "relative",
          fontSize,
          fontWeight,
          color,
          fontFamily: "'SF Pro Display', 'Inter', system-ui, sans-serif",
          opacity,
        }}
      >
        {text}
      </span>
    </div>
  );
};

interface TypewriterTextProps {
  text: string;
  startFrame?: number;
  charsPerFrame?: number;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  showCursor?: boolean;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  startFrame = 0,
  charsPerFrame = 0.5,
  fontSize = 24,
  fontWeight = 400,
  color = "#1b1f33",
  showCursor = true,
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - startFrame);

  const charsToShow = Math.min(
    text.length,
    Math.floor(adjustedFrame * charsPerFrame)
  );

  const cursorVisible = (adjustedFrame % 30) < 15; // Blink every 0.5 seconds

  return (
    <span
      style={{
        fontSize,
        fontWeight,
        color,
        fontFamily: "'SF Pro Display', 'Inter', system-ui, sans-serif",
      }}
    >
      {text.slice(0, charsToShow)}
      {showCursor && charsToShow < text.length && (
        <span style={{ opacity: cursorVisible ? 1 : 0 }}>|</span>
      )}
    </span>
  );
};

interface CountUpTextProps {
  endValue: number;
  startFrame?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
}

export const CountUpText: React.FC<CountUpTextProps> = ({
  endValue,
  startFrame = 0,
  duration = 30,
  prefix = "",
  suffix = "",
  fontSize = 48,
  fontWeight = 800,
  color = "#1b1f33",
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - startFrame);

  const currentValue = Math.round(
    interpolate(
      adjustedFrame,
      [0, duration],
      [0, endValue],
      {
        easing: Easing.out(Easing.cubic),
        extrapolateRight: "clamp",
      }
    )
  );

  const opacity = interpolate(
    adjustedFrame,
    [0, scaleDuration(10)],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  const scale = spring({
    frame: adjustedFrame,
    fps: 30,
    config: SPRING_CONFIGS.smooth,
  });

  return (
    <span
      style={{
        fontSize,
        fontWeight,
        color,
        fontFamily: "'SF Pro Display', 'Inter', system-ui, sans-serif",
        opacity,
        transform: `scale(${scale})`,
        display: "inline-block",
      }}
    >
      {prefix}{currentValue}{suffix}
    </span>
  );
};

interface WordByWordTextProps {
  text: string;
  startFrame?: number;
  framesPerWord?: number;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  lineHeight?: number;
}

export const WordByWordText: React.FC<WordByWordTextProps> = ({
  text,
  startFrame = 0,
  framesPerWord = 8,
  fontSize = 32,
  fontWeight = 500,
  color = "#1b1f33",
  lineHeight = 1.4,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const adjustedFrame = Math.max(0, frame - startFrame);

  const words = text.split(" ");

  return (
    <span
      style={{
        fontSize,
        fontWeight,
        color,
        fontFamily: "'SF Pro Display', 'Inter', system-ui, sans-serif",
        lineHeight,
      }}
    >
      {words.map((word, index) => {
        const wordStartFrame = index * framesPerWord;
        const wordOpacity = interpolate(
          adjustedFrame,
          [wordStartFrame, wordStartFrame + scaleDuration(10)],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const wordY = interpolate(
          adjustedFrame,
          [wordStartFrame, wordStartFrame + scaleDuration(12)],
          [20, 0],
          {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }
        );

        return (
          <span
            key={index}
            style={{
              display: "inline-block",
              opacity: wordOpacity,
              transform: `translateY(${wordY}px)`,
              marginRight: "0.3em",
            }}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
};
