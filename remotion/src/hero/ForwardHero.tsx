// Forward Hero - Main Composition
// 15-second video with outro, 1920x1080, 60fps
// Visual metaphor: chaos -> orchestration -> unified CRM view -> brand reveal

import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, Sequence } from "remotion";
import { BRAND_COLORS, TIMING, ACTS, TYPOGRAPHY } from "./constants/brand";
import { BackgroundGradient } from "./layers/BackgroundGradient";
import { FloatingShapesLayer } from "./layers/FloatingShapesLayer";
import { DataPipelineLayer } from "./layers/DataPipelineLayer";
import { UICardsLayer } from "./layers/UICardsLayer";
import { TextLayer } from "./layers/TextLayer";
import { OutroLayer } from "./layers/OutroLayer";

export const ForwardHero: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND_COLORS.NAVY,
        fontFamily: TYPOGRAPHY.FONT_FAMILY,
        overflow: "hidden",
      }}
    >
      {/* Layer 0: Background Gradient - Full duration */}
      <Sequence from={0} durationInFrames={TIMING.TOTAL_FRAMES}>
        <BackgroundGradient frame={frame} width={width} height={height} />
      </Sequence>

      {/* Layer 1: Floating Shapes - Fade in Act 1, fade out for outro */}
      <Sequence from={0} durationInFrames={TIMING.TOTAL_FRAMES}>
        <FloatingShapesLayer frame={frame} width={width} height={height} />
      </Sequence>

      {/* Layer 2: Data Pipeline - Reveal in Act 1, fade out for outro */}
      <Sequence from={0} durationInFrames={TIMING.TOTAL_FRAMES}>
        <DataPipelineLayer frame={frame} width={width} height={height} />
      </Sequence>

      {/* Layer 3: UI Cards - Appear in Act 2, fade out for outro */}
      <Sequence from={0} durationInFrames={TIMING.TOTAL_FRAMES}>
        <UICardsLayer frame={frame} width={width} height={height} />
      </Sequence>

      {/* Layer 4: Text Layer - Staggered reveal, fade out for outro */}
      <Sequence from={0} durationInFrames={TIMING.TOTAL_FRAMES}>
        <TextLayer frame={frame} width={width} height={height} />
      </Sequence>

      {/* Layer 5: Outro - Centered logo animation */}
      <Sequence from={0} durationInFrames={TIMING.TOTAL_FRAMES}>
        <OutroLayer frame={frame} width={width} height={height} />
      </Sequence>
    </AbsoluteFill>
  );
};

/*
 * LAYER ARCHITECTURE:
 *
 * Layer 0 - BackgroundGradient:
 *   - Full-screen gradient with subtle hue morphing
 *   - Radial glows and vignette
 *   - Always visible throughout
 *
 * Layer 1 - FloatingShapesLayer:
 *   - 5 abstract blobs with low opacity (0.08-0.25)
 *   - Sine-based floating motion
 *   - Fade in during Act 1, partially fade for outro
 *
 * Layer 2 - DataPipelineLayer:
 *   - 7 nodes connected by lines
 *   - Data packets flowing along connections
 *   - Nodes pulse to indicate activity
 *   - Fades out before outro
 *
 * Layer 3 - UICardsLayer:
 *   - 3 glassmorphic cards: Sources, Pipeline, Unified View
 *   - Staggered slide-in with overshoot in Act 2
 *   - Fades out before outro
 *
 * Layer 4 - TextLayer:
 *   - Forward logo (top-left area)
 *   - H1 headline with word-by-word reveal
 *   - Subheadline fade-in
 *   - Value prop carousel (Act 3+)
 *   - CTA button with glow pulse
 *   - Fades out before outro
 *
 * Layer 5 - OutroLayer:
 *   - Centered Forward logo (icon + text)
 *   - Spring-based entrance animation
 *   - Subtle glow pulse
 *   - Tagline fade-in
 *
 * TIMELINE (Acts):
 *
 * Act 1 (0-72 frames / 0-1.2s):
 *   - Background and floating shapes fade in
 *   - Pipeline nodes and connections animate in
 *   - Logo and headline begin revealing
 *
 * Act 2 (72-240 frames / 1.2-4s):
 *   - UI cards slide in with stagger
 *   - Pipeline packets begin flowing
 *   - Subheadline appears
 *
 * Act 3 (240-420 frames / 4-7s):
 *   - Value prop carousel begins cycling
 *   - CTA button appears with glow
 *   - Full visual complexity reached
 *
 * Act 4 (420-660 frames / 7-11s):
 *   - Steady state
 *   - Content begins fading at frame 600
 *
 * Act 5 (660-900 frames / 11-15s):
 *   - Outro: Centered logo animation
 *   - Icon springs in, text follows
 *   - Tagline fades in
 *
 * MOTION BLOCKS USED:
 *
 * - fadeInUp: Logo, subheadline, CTA entrance
 * - cardSlideIn: UI card entrances with overshoot
 * - floatBobbing: Shapes, cards continuous motion
 * - hueRotate: Background gradient morphing
 * - packetProgress: Data packet positions
 * - textCarouselState: Value prop cycling
 * - nodePulse: Pipeline node activity
 * - ctaGlow: CTA button idle animation
 * - staggeredEntrance: Multiple element reveals
 * - spring: Outro logo animation
 */
