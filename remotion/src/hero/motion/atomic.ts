// Atomic motion blocks for Forward Hero
// Each function is stateless and deterministic

import { interpolate, Easing } from "remotion";
import { TIMING } from "../constants/brand";
import { EASE_OUT, OVERSHOOT_BEZIER, framesFromSeconds, lerp, clamp } from "./easing";

interface FadeInUpOptions {
  start: number;
  duration: number;
  fromY?: number;
  toY?: number;
}

interface CardSlideInOptions {
  start: number;
  duration: number;
  fromX: number;
  toX?: number;
  overshoot?: boolean;
}

interface FloatBobbingOptions {
  amplitude?: number;
  periodFrames?: number;
  phase?: number;
}

interface HueRotateOptions {
  periodFrames?: number;
  startHue?: number;
}

interface PacketProgressOptions {
  start: number;
  duration: number;
}

interface TextCarouselOptions {
  items: string[];
  showDuration: number;
  transitionDuration: number;
}

interface NodePulseOptions {
  periodFrames?: number;
  maxScale?: number;
  minScale?: number;
}

interface CtaGlowOptions {
  periodFrames?: number;
  minIntensity?: number;
  maxIntensity?: number;
}

// 1. Fade in with upward motion
export const fadeInUp = (
  frame: number,
  options: FadeInUpOptions
): { opacity: number; translateY: number } => {
  const { start, duration, fromY = 40, toY = 0 } = options;

  const opacity = interpolate(frame, [start, start + duration], [0, 1], {
    easing: EASE_OUT,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(frame, [start, start + duration], [fromY, toY], {
    easing: EASE_OUT,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return { opacity, translateY };
};

// 2. Card slide in with optional overshoot
export const cardSlideIn = (
  frame: number,
  options: CardSlideInOptions
): { translateX: number; opacity: number } => {
  const { start, duration, fromX, toX = 0, overshoot = false } = options;

  const easing = overshoot ? OVERSHOOT_BEZIER : EASE_OUT;

  const translateX = interpolate(frame, [start, start + duration], [fromX, toX], {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(frame, [start, start + duration * 0.5], [0, 1], {
    easing: EASE_OUT,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return { translateX, opacity };
};

// 3. Floating/bobbing motion using sine wave
export const floatBobbing = (
  frame: number,
  options: FloatBobbingOptions = {}
): number => {
  const { amplitude = 15, periodFrames = framesFromSeconds(3.5), phase = 0 } = options;

  const progress = ((frame + phase) % periodFrames) / periodFrames;
  return Math.sin(progress * Math.PI * 2) * amplitude;
};

// 4. Hue rotation for background gradient morph
export const hueRotate = (
  frame: number,
  options: HueRotateOptions = {}
): number => {
  const { periodFrames = TIMING.TOTAL_FRAMES, startHue = 0 } = options;

  const progress = (frame % periodFrames) / periodFrames;
  return startHue + progress * 360;
};

// 5. Packet progress along a path (0-1)
export const packetProgress = (
  frame: number,
  options: PacketProgressOptions
): number => {
  const { start, duration } = options;

  // Use modulus for looping
  const loopFrame = frame % TIMING.TOTAL_FRAMES;

  if (loopFrame < start) return 0;
  if (loopFrame >= start + duration) return 1;

  return (loopFrame - start) / duration;
};

// 6. Text carousel state calculator
export const textCarouselState = (
  frame: number,
  options: TextCarouselOptions
): { activeIndex: number; opacity: number; translateY: number } => {
  const { items, showDuration, transitionDuration } = options;
  const totalCycleDuration = (showDuration + transitionDuration) * items.length;

  // Use modulus for seamless looping
  const cycleFrame = frame % totalCycleDuration;

  const itemDuration = showDuration + transitionDuration;
  const activeIndex = Math.floor(cycleFrame / itemDuration) % items.length;
  const itemProgress = cycleFrame % itemDuration;

  let opacity = 1;
  let translateY = 0;

  // Fade out at end of show duration
  if (itemProgress > showDuration) {
    const transitionProgress = (itemProgress - showDuration) / transitionDuration;
    opacity = 1 - transitionProgress;
    translateY = -20 * transitionProgress;
  }
  // Fade in at start
  else if (itemProgress < transitionDuration) {
    const fadeInProgress = itemProgress / transitionDuration;
    opacity = fadeInProgress;
    translateY = 20 * (1 - fadeInProgress);
  }

  return { activeIndex, opacity, translateY };
};

// 7. Node pulsing effect
export const nodePulse = (
  frame: number,
  options: NodePulseOptions = {}
): { scale: number; glowOpacity: number } => {
  const { periodFrames = framesFromSeconds(2), maxScale = 1.15, minScale = 1 } = options;

  const progress = (frame % periodFrames) / periodFrames;
  const pulseValue = Math.sin(progress * Math.PI * 2) * 0.5 + 0.5; // 0-1

  const scale = lerp(minScale, maxScale, pulseValue);
  const glowOpacity = pulseValue * 0.6;

  return { scale, glowOpacity };
};

// 8. CTA button glow effect
export const ctaGlow = (
  frame: number,
  options: CtaGlowOptions = {}
): { shadowIntensity: number; scale: number } => {
  const { periodFrames = framesFromSeconds(2.5), minIntensity = 0.3, maxIntensity = 0.7 } = options;

  const progress = (frame % periodFrames) / periodFrames;
  const pulseValue = Math.sin(progress * Math.PI * 2) * 0.5 + 0.5;

  const shadowIntensity = lerp(minIntensity, maxIntensity, pulseValue);
  const scale = lerp(1, 1.02, pulseValue);

  return { shadowIntensity, scale };
};

// 9. Staggered entrance for multiple items
export const staggeredEntrance = (
  frame: number,
  index: number,
  baseStart: number,
  staggerDelay: number,
  duration: number
): { opacity: number; translateY: number; scale: number } => {
  const itemStart = baseStart + index * staggerDelay;

  const opacity = interpolate(frame, [itemStart, itemStart + duration], [0, 1], {
    easing: EASE_OUT,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(frame, [itemStart, itemStart + duration], [30, 0], {
    easing: EASE_OUT,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame, [itemStart, itemStart + duration], [0.9, 1], {
    easing: OVERSHOOT_BEZIER,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return { opacity, translateY, scale };
};

// 10. Path interpolation for packets
export const interpolatePath = (
  progress: number,
  points: { x: number; y: number }[]
): { x: number; y: number } => {
  if (points.length < 2) return points[0] || { x: 0, y: 0 };

  const totalSegments = points.length - 1;
  const segmentProgress = progress * totalSegments;
  const segmentIndex = Math.min(Math.floor(segmentProgress), totalSegments - 1);
  const localProgress = segmentProgress - segmentIndex;

  const start = points[segmentIndex];
  const end = points[segmentIndex + 1];

  return {
    x: lerp(start.x, end.x, localProgress),
    y: lerp(start.y, end.y, localProgress),
  };
};
