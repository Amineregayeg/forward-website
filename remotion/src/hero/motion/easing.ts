// Easing and timing utilities for Forward Hero
import { Easing } from "remotion";
import { TIMING } from "../constants/brand";

// Standard easing curves
export const EASE_OUT = Easing.out(Easing.cubic);
export const EASE_IN = Easing.in(Easing.cubic);
export const EASE_IN_OUT = Easing.inOut(Easing.cubic);
export const EASE_OUT_EXPO = Easing.out(Easing.exp);

// Bezier curves for special animations
export const OVERSHOOT_BEZIER = Easing.bezier(0.34, 1.56, 0.64, 1);
export const SMOOTH_BEZIER = Easing.bezier(0.4, 0, 0.2, 1);

// Convert seconds to frames
export const framesFromSeconds = (seconds: number): number => {
  return Math.round(seconds * TIMING.FPS);
};

// Convert frames to seconds
export const secondsFromFrames = (frames: number): number => {
  return frames / TIMING.FPS;
};

// Get progress within a range (0-1)
export const getProgress = (
  frame: number,
  start: number,
  duration: number
): number => {
  if (frame < start) return 0;
  if (frame >= start + duration) return 1;
  return (frame - start) / duration;
};

// Clamp a value between min and max
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

// Lerp between two values
export const lerp = (a: number, b: number, t: number): number => {
  return a + (b - a) * t;
};

// Smooth step function
export const smoothStep = (t: number): number => {
  return t * t * (3 - 2 * t);
};

// Smoother step function (Ken Perlin)
export const smootherStep = (t: number): number => {
  return t * t * t * (t * (t * 6 - 15) + 10);
};
