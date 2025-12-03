import { Composition, Sequence } from "remotion";
import { IntroScene } from "./components/scenes/IntroScene";
import { ServicesScene } from "./components/scenes/ServicesScene";
import { TrustedByScene } from "./components/scenes/TrustedByScene";
import { CTAScene } from "./components/scenes/CTAScene";
import { AbsoluteFill } from "remotion";
import { SCENE_DURATIONS, SCENE_STARTS, TOTAL_DURATION, FPS } from "./styles/constants";

// Main Forward Video Component
const ForwardVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Scene 1: Intro (0-10s) */}
      <Sequence from={SCENE_STARTS.intro} durationInFrames={SCENE_DURATIONS.intro}>
        <IntroScene />
      </Sequence>

      {/* Scene 2: Services (10-25s) */}
      <Sequence from={SCENE_STARTS.services} durationInFrames={SCENE_DURATIONS.services}>
        <ServicesScene />
      </Sequence>

      {/* Scene 3: Trusted By (25-33s) */}
      <Sequence from={SCENE_STARTS.trustedBy} durationInFrames={SCENE_DURATIONS.trustedBy}>
        <TrustedByScene />
      </Sequence>

      {/* Scene 4: CTA (33-40s) */}
      <Sequence from={SCENE_STARTS.cta} durationInFrames={SCENE_DURATIONS.cta}>
        <CTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Main Forward Video - 40 seconds */}
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

      {/* Social Media Variants */}
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
