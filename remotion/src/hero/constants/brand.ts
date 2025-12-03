// Forward Hero Brand Constants
// Data Pipeline Cinematic - 12s seamless loop at 60fps

export const BRAND_COLORS = {
  // Primary palette
  NAVY: "#0F1A2E",
  NAVY_LIGHT: "#1a2842",
  TEAL: "#00A8A8",
  ELECTRIC_TEAL: "#00D4D4",
  OFF_WHITE: "#F5F7FA",
  WHITE: "#FFFFFF",

  // Gradients
  NAVY_GRADIENT_START: "#0F1A2E",
  NAVY_GRADIENT_END: "#1a3055",

  // Accents
  GLOW_TEAL: "rgba(0, 212, 212, 0.3)",
  GLOW_NAVY: "rgba(15, 26, 46, 0.8)",
};

// Timing configuration
export const TIMING = {
  FPS: 60,
  TOTAL_FRAMES: 900, // 15 seconds (extended for outro)
  TOTAL_SECONDS: 15,
};

// Act boundaries (in frames)
export const ACTS = {
  // Act 1: Intro & background reveal
  ACT_1_START: 0,
  ACT_1_END: 72, // 0s - 1.2s

  // Act 2: Hero reveal (cards + pipeline)
  ACT_2_START: 72,
  ACT_2_END: 240, // 1.2s - 4s

  // Act 3: Details (carousel + CTA)
  ACT_3_START: 240,
  ACT_3_END: 420, // 4s - 7s

  // Act 4: Steady state
  ACT_4_START: 420,
  ACT_4_END: 660, // 7s - 11s

  // Act 5: Outro - Logo reveal
  ACT_5_START: 660, // 11s
  ACT_5_END: 900, // 15s (4 seconds for outro)

  // Fade out timing for content layers
  CONTENT_FADE_OUT_START: 600, // 10s - start fading
  CONTENT_FADE_OUT_END: 680, // ~11.3s - fully faded
};

// Copy content
export const COPY = {
  // Headlines
  H1: "Chaos becomes orchestrated CRM.",
  SUBHEADLINE: "Forward designs resilient architectures, orchestrates CRM data flows, and makes Salesforce safer and more effective.",

  // Carousel items
  CAROUSEL: [
    "Unify data from scattered CRMs and tools.",
    "Make Salesforce Marketing Cloud governance-safe.",
    "Operationalize lifecycle marketing with clean data.",
    "Train your teams to own the architecture.",
  ],

  // Card content
  CARDS: [
    {
      title: "Data Sources",
      bullets: ["Multiple CRM systems", "Marketing platforms", "Customer touchpoints"],
    },
    {
      title: "Governed Pipeline",
      bullets: ["GDPR compliant flows", "Audit-ready architecture", "Real-time sync"],
    },
    {
      title: "Unified CRM View",
      bullets: ["Single source of truth", "360-degree customer", "Actionable insights"],
    },
  ],

  // CTA
  CTA_TEXT: "Schedule a diagnostic call",
  CTA_ALT: "Discuss your architecture",
};

// Layout constants
export const LAYOUT = {
  // Canvas
  WIDTH: 1920,
  HEIGHT: 1080,

  // Text area (left side)
  TEXT_AREA_WIDTH: 0.4, // 40% of screen
  TEXT_MARGIN_LEFT: 100,
  TEXT_MARGIN_TOP: 200,

  // Cards area (right side)
  CARDS_AREA_START: 0.5, // Start at 50%
  CARD_WIDTH: 340,
  CARD_HEIGHT: 220,
  CARD_GAP: 24,

  // Pipeline
  PIPELINE_Y_CENTER: 540,
  NODE_RADIUS: 24,
  PACKET_SIZE: 16,
};

// Typography
export const TYPOGRAPHY = {
  FONT_FAMILY: "'SF Pro Display', 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",

  H1_SIZE: 64,
  H1_LINE_HEIGHT: 1.1,
  H1_WEIGHT: 700,

  SUBHEAD_SIZE: 24,
  SUBHEAD_LINE_HEIGHT: 1.5,
  SUBHEAD_WEIGHT: 400,

  CAROUSEL_SIZE: 20,
  CAROUSEL_LINE_HEIGHT: 1.4,

  CARD_TITLE_SIZE: 22,
  CARD_BULLET_SIZE: 14,

  CTA_SIZE: 18,
  CTA_WEIGHT: 600,
};
