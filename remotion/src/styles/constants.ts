// Animation timing constants
export const FPS = 30;

// Spring animation configs (from PDF best practices) - faster configs
export const SPRING_CONFIGS = {
  fast: { damping: 12, mass: 0.4, stiffness: 200 },
  smooth: { damping: 10, mass: 0.8, stiffness: 140 },
  sluggish: { damping: 15, mass: 1.2, stiffness: 80 },
  bouncy: { damping: 6, mass: 0.8, stiffness: 200 },
  premium: { damping: 180, mass: 0.8, stiffness: 140 },
  snappy: { damping: 20, mass: 0.5, stiffness: 300 },
};

// Scene durations in frames (at 30fps) - 30% faster
export const SCENE_DURATIONS = {
  intro: 210,        // 7 seconds (was 10)
  services: 315,     // 10.5 seconds (was 15)
  trustedBy: 168,    // 5.6 seconds (was 8)
  cta: 147,          // 4.9 seconds (was 7)
};

// Scene start frames
export const SCENE_STARTS = {
  intro: 0,
  services: SCENE_DURATIONS.intro,
  trustedBy: SCENE_DURATIONS.intro + SCENE_DURATIONS.services,
  cta: SCENE_DURATIONS.intro + SCENE_DURATIONS.services + SCENE_DURATIONS.trustedBy,
};

// Total video duration - 840 frames = 28 seconds (was 40)
export const TOTAL_DURATION =
  SCENE_DURATIONS.intro +
  SCENE_DURATIONS.services +
  SCENE_DURATIONS.trustedBy +
  SCENE_DURATIONS.cta;

// Typography
export const TYPOGRAPHY = {
  fontFamily: "'SF Pro Display', 'Inter', system-ui, -apple-system, sans-serif",
  heading: {
    large: 80,
    medium: 60,
    small: 44,
  },
  body: {
    large: 28,
    medium: 22,
    small: 16,
  },
};

// Spacing
export const SPACING = {
  page: 100,
  section: 50,
  element: 32,
};

// Animation timing multiplier (30% faster = 0.7)
export const TIMING_SCALE = 0.7;

// Helper function to scale animation durations
export const scaleDuration = (frames: number): number => Math.round(frames * TIMING_SCALE);

// Easing presets for Remotion
export const EASING_PRESETS = {
  smooth: [0.4, 0, 0.2, 1] as const,
  snappy: [0.6, 0, 0.2, 1] as const,
  bouncy: [0.34, 1.56, 0.64, 1] as const,
  elastic: [0.68, -0.55, 0.27, 1.55] as const,
};
