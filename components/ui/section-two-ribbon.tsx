'use client';

import { motion, MotionValue, useTransform } from 'motion/react';

interface SectionTwoRibbonProps {
  scrollYProgress: MotionValue<number>;
  totalTexts: number;
}

/**
 * SectionTwoRibbon - A decorative diagonal ribbon that appears behind section 2 content
 *
 * CUSTOMIZATION POINTS:
 *
 * 1. DIAGONAL ANGLE: Adjust the `skewX` value in the style prop
 *    - Current: -12deg (slight diagonal)
 *    - More diagonal: -20deg
 *    - Less diagonal: -5deg
 *
 * 2. SIZE/POSITION: Adjust these Tailwind classes:
 *    - Width: `w-[80%]` (percentage of container width)
 *    - Height: `h-[300px]` (fixed height of ribbon)
 *    - Vertical position: `top-1/2 -translate-y-1/2` (centered vertically)
 *    - Horizontal position: `left-[10%]` (offset from left)
 *
 * 3. TIMING: Adjust the ranges in useTransform calls below:
 *    - fadeInStart/fadeInEnd: When ribbon fades in (relative to text 1)
 *    - fadeOutStart/fadeOutEnd: When ribbon fades out (relative to text 4)
 */
export default function SectionTwoRibbon({
  scrollYProgress,
  totalTexts,
}: SectionTwoRibbonProps) {
  const segmentSize = 1 / totalTexts;

  // TIMING CUSTOMIZATION:
  // Fade in during first 30% of text 1's duration
  const fadeInStart = 0;
  const fadeInEnd = segmentSize * 0.3; // ~0.075 for 4 texts

  // Fade out during last 50% of text 4's duration
  const fadeOutStart = (totalTexts - 1) * segmentSize + segmentSize * 0.5; // ~0.875 for 4 texts
  const fadeOutEnd = 1;

  // Opacity: fade in with text 1, stay visible, fade out with text 4
  const opacity = useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0, 0.08, 0.08, 0] // Max opacity is 0.08 for subtlety
  );

  // Y position: slight upward motion on entrance, slight downward on exit
  const y = useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [50, 0, 0, -50]
  );

  // Scale: subtle scale effect
  const scale = useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0.95, 1, 1, 0.95]
  );

  // Logo animation transforms - professional entrance/exit
  // Scale: starts small, grows to full size, shrinks on exit
  const logoScale = useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0.85, 1, 1, 0.9]
  );

  // Y position: slides up on entrance, slides down on exit
  const logoY = useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [40, 0, 0, -30]
  );

  // Blur effect: starts blurred, becomes sharp, blurs on exit
  const logoBlur = useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [8, 0, 0, 6]
  );

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Main ribbon - center */}
      <motion.div
        style={{ opacity, y, scale }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* DIAGONAL ANGLE: Adjust skewX value to change the slant */}
        {/* Negative = slants left, Positive = slants right */}
        <div
          className="w-[90%] h-[280px] bg-white rounded-lg"
          style={{ transform: 'skewX(-12deg)' }}
        />
      </motion.div>

      {/* Animated Logo - bottom right */}
      {/* LOGO CUSTOMIZATION:
       * - Size: w-[140px] h-[175px]
       * - Position: bottom-[12%] right-[8%]
       * - Opacity: adjust fill rgba values (currently 0.35)
       */}
      <motion.div
        style={{
          opacity,
          scale: logoScale,
          y: logoY,
          filter: useTransform(logoBlur, (v) => `blur(${v}px)`),
        }}
        className="absolute bottom-[12%] right-[8%]"
      >
        <svg
          viewBox="0 0 180 250"
          className="w-[140px] h-[175px]"
        >
          <polygon
            fill="rgba(255,255,255,0.6)"
            points="107.14 79.12 0 0 0 79.12 107.14 79.12"
          />
          <polygon
            fill="rgba(255,255,255,0.6)"
            points="171.19 126.42 116.26 85.86 116.26 116.26 36.4 116.26 36.4 142.94 116.26 142.94 116.26 170.02 171.19 126.42"
          />
          <polygon
            fill="rgba(255,255,255,0.6)"
            points="36.4 233.42 103.59 180.08 36.4 180.08 36.4 233.42"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
