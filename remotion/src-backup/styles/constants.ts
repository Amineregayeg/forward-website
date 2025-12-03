// Animation timing constants
export const FPS = 30;

// Spring animation configs (from PDF best practices)
export const SPRING_CONFIGS = {
  fast: { damping: 8, mass: 0.5, stiffness: 150 },
  smooth: { damping: 8, mass: 1, stiffness: 100 },
  sluggish: { damping: 12, mass: 1.5, stiffness: 50 },
  bouncy: { damping: 4, mass: 1, stiffness: 150 },
  premium: { damping: 200, mass: 1, stiffness: 100 },
};

// Scene durations in frames (at 30fps)
export const SCENE_DURATIONS = {
  intro: 300,        // 10 seconds
  services: 450,     // 15 seconds
  trustedBy: 240,    // 8 seconds
  cta: 210,          // 7 seconds
};

// Scene start frames
export const SCENE_STARTS = {
  intro: 0,
  services: SCENE_DURATIONS.intro,
  trustedBy: SCENE_DURATIONS.intro + SCENE_DURATIONS.services,
  cta: SCENE_DURATIONS.intro + SCENE_DURATIONS.services + SCENE_DURATIONS.trustedBy,
};

// Total video duration
export const TOTAL_DURATION =
  SCENE_DURATIONS.intro +
  SCENE_DURATIONS.services +
  SCENE_DURATIONS.trustedBy +
  SCENE_DURATIONS.cta; // 1200 frames = 40 seconds

// Typography
export const TYPOGRAPHY = {
  fontFamily: "'SF Pro Display', 'Inter', system-ui, -apple-system, sans-serif",
  heading: {
    large: 72,
    medium: 56,
    small: 42,
  },
  body: {
    large: 28,
    medium: 24,
    small: 18,
  },
};

// Spacing
export const SPACING = {
  page: 120,
  section: 60,
  element: 40,
};
