// Forward Brand Color System
export const COLORS = {
  // Primary brand color - deep navy
  primary: "#1b1f33",
  primaryLight: "#2a3050",
  primaryDark: "#12141f",

  // Background colors
  white: "#FFFFFF",
  offWhite: "#F8F9FC",
  lightGray: "#E5E7EB",

  // Text colors
  textPrimary: "#1b1f33",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",

  // Accent gradients (subtle, premium feel)
  gradientStart: "#1b1f33",
  gradientEnd: "#3a4166",

  // Accent colors for highlights
  accent: "#4F46E5",
  accentLight: "#6366F1",

  // Success/check colors
  success: "#10B981",
};

// Gradient presets
export const GRADIENTS = {
  primary: `linear-gradient(135deg, ${COLORS.gradientStart} 0%, ${COLORS.gradientEnd} 100%)`,
  subtle: `linear-gradient(135deg, ${COLORS.primary}15 0%, ${COLORS.primary}05 100%)`,
  heroBackground: `linear-gradient(180deg, ${COLORS.offWhite} 0%, ${COLORS.white} 100%)`,
};
