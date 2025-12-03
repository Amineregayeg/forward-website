import React from "react";
import { Composition, Sequence } from "remotion";
import { AbsoluteFill } from "remotion";

// Original video components
import { IntroScene } from "./components/scenes/IntroScene";
import { ServicesScene } from "./components/scenes/ServicesScene";
import { TrustedByScene } from "./components/scenes/TrustedByScene";
import { CTAScene } from "./components/scenes/CTAScene";
import { SCENE_DURATIONS, SCENE_STARTS, TOTAL_DURATION, FPS } from "./styles/constants";

// New Forward Hero (12s seamless loop)
import { ForwardHero } from "./hero/ForwardHero";
import { TIMING } from "./hero/constants/brand";

// Impact Metrics Video
import { ImpactMetricsVideo, IMPACT_METRICS_TIMING } from "./ImpactMetricsVideo";

// Main Forward Video Component (Original 28-second video)
const ForwardVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Scene 1: Intro */}
      <Sequence from={SCENE_STARTS.intro} durationInFrames={SCENE_DURATIONS.intro}>
        <IntroScene />
      </Sequence>

      {/* Scene 2: Services */}
      <Sequence from={SCENE_STARTS.services} durationInFrames={SCENE_DURATIONS.services}>
        <ServicesScene />
      </Sequence>

      {/* Scene 3: Trusted By */}
      <Sequence from={SCENE_STARTS.trustedBy} durationInFrames={SCENE_DURATIONS.trustedBy}>
        <TrustedByScene />
      </Sequence>

      {/* Scene 4: CTA */}
      <Sequence from={SCENE_STARTS.cta} durationInFrames={SCENE_DURATIONS.cta}>
        <CTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ============================================
          NEW: Forward Hero - 12s Seamless Loop @ 60fps
          Premium hero video with data pipeline cinematic
          ============================================ */}
      <Composition
        id="ForwardHero"
        component={ForwardHero}
        durationInFrames={TIMING.TOTAL_FRAMES}
        fps={TIMING.FPS}
        width={1920}
        height={1080}
      />

      {/* ForwardHero - Square variant */}
      <Composition
        id="ForwardHero-Square"
        component={ForwardHero}
        durationInFrames={TIMING.TOTAL_FRAMES}
        fps={TIMING.FPS}
        width={1080}
        height={1080}
      />

      {/* ForwardHero - Portrait variant */}
      <Composition
        id="ForwardHero-Portrait"
        component={ForwardHero}
        durationInFrames={TIMING.TOTAL_FRAMES}
        fps={TIMING.FPS}
        width={1080}
        height={1920}
      />

      {/* ============================================
          Impact Metrics Video - 10s @ 60fps
          Animated counting metrics + logo reveal
          ============================================ */}
      <Composition
        id="ImpactMetrics"
        component={ImpactMetricsVideo}
        durationInFrames={IMPACT_METRICS_TIMING.TOTAL_FRAMES}
        fps={IMPACT_METRICS_TIMING.FPS}
        width={1920}
        height={1080}
      />

      {/* ImpactMetrics - Square variant */}
      <Composition
        id="ImpactMetrics-Square"
        component={ImpactMetricsVideo}
        durationInFrames={IMPACT_METRICS_TIMING.TOTAL_FRAMES}
        fps={IMPACT_METRICS_TIMING.FPS}
        width={1080}
        height={1080}
      />

      {/* ImpactMetrics - Portrait variant */}
      <Composition
        id="ImpactMetrics-Portrait"
        component={ImpactMetricsVideo}
        durationInFrames={IMPACT_METRICS_TIMING.TOTAL_FRAMES}
        fps={IMPACT_METRICS_TIMING.FPS}
        width={1080}
        height={1920}
      />

      {/* ============================================
          Original Forward Video - 28 seconds @ 30fps
          ============================================ */}
      <Composition
        id="ForwardVideo"
        component={ForwardVideo}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />

      {/* Individual scene compositions for testing */}
      <Composition
        id="IntroScene"
        component={IntroScene}
        durationInFrames={SCENE_DURATIONS.intro}
        fps={FPS}
        width={1920}
        height={1080}
      />

      <Composition
        id="ServicesScene"
        component={ServicesScene}
        durationInFrames={SCENE_DURATIONS.services}
        fps={FPS}
        width={1920}
        height={1080}
      />

      <Composition
        id="TrustedByScene"
        component={TrustedByScene}
        durationInFrames={SCENE_DURATIONS.trustedBy}
        fps={FPS}
        width={1920}
        height={1080}
      />

      <Composition
        id="CTAScene"
        component={CTAScene}
        durationInFrames={SCENE_DURATIONS.cta}
        fps={FPS}
        width={1920}
        height={1080}
      />

      {/* Original Social Media Variants */}
      <Composition
        id="ForwardVideo-Square"
        component={ForwardVideo}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={1080}
        height={1080}
      />

      <Composition
        id="ForwardVideo-Portrait"
        component={ForwardVideo}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
