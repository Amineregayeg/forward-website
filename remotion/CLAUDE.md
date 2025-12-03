# Remotion Development Guide for Claude Code

## Project Overview
This is a Remotion project for creating programmatic videos using React. Videos are composed of React components that render frame-by-frame.

## Project Structure
```
remotion/
├── src/
│   ├── Root.tsx          # Registers all video compositions
│   ├── HelloWorld.tsx    # Reusable video components
│   └── index.ts          # Entry point
├── public/               # Static assets (images, fonts, audio)
├── out/                  # Rendered video output
├── remotion.config.ts    # Remotion configuration
└── package.json
```

## Core Concepts

### Composition (Main Container)
Register videos in `Root.tsx`:
```tsx
<Composition
  id="MyVideo"              // Unique identifier
  durationInFrames={300}    // Total frames (300 frames @ 30fps = 10 seconds)
  fps={30}                  // Frames per second
  width={1920}              // Video width in pixels
  height={1080}             // Video height in pixels
  component={MyComponent}   // React component to render
  defaultProps={{}}         // Default props for the component
/>
```

### Sequence (Timeline Positioning)
Control when elements appear:
```tsx
import { Sequence } from "remotion";

<Sequence from={0} durationInFrames={90}>
  <TitleScene />
</Sequence>
<Sequence from={90} durationInFrames={120}>
  <ContentScene />
</Sequence>
```

### AbsoluteFill (Full-Screen Container)
```tsx
import { AbsoluteFill } from "remotion";

<AbsoluteFill style={{ backgroundColor: "white" }}>
  {/* Content fills entire frame */}
</AbsoluteFill>
```

## Animation Hooks

### useCurrentFrame()
Get the current frame number (starts at 0):
```tsx
const frame = useCurrentFrame();
```

### useVideoConfig()
Get video dimensions and settings:
```tsx
const { fps, width, height, durationInFrames } = useVideoConfig();
```

### interpolate()
Animate values over time (linear):
```tsx
import { interpolate } from "remotion";

const opacity = interpolate(
  frame,           // Current value
  [0, 30],         // Input range (frames 0-30)
  [0, 1],          // Output range (opacity 0 to 1)
  {
    extrapolateLeft: "clamp",   // Don't go below 0
    extrapolateRight: "clamp",  // Don't go above 1
  }
);
```

### spring()
Physics-based animations (bouncy):
```tsx
import { spring } from "remotion";

const scale = spring({
  frame,
  fps,
  config: {
    damping: 200,      // Higher = less bouncy
    stiffness: 100,    // Higher = faster
    mass: 1,           // Higher = slower
  },
});
```

## Common Animation Patterns

### Fade In
```tsx
const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
```

### Slide In from Bottom
```tsx
const translateY = interpolate(frame, [0, 30], [100, 0], { extrapolateRight: "clamp" });
```

### Scale Up with Spring
```tsx
const scale = spring({ frame, fps, config: { damping: 200 } });
<div style={{ transform: `scale(${scale})` }} />
```

### Staggered Items
```tsx
{items.map((item, index) => {
  const delay = index * 10; // 10 frames between each
  const itemOpacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <div key={index} style={{ opacity: itemOpacity }}>{item}</div>;
})}
```

### Typewriter Effect
```tsx
const text = "Hello World";
const charsToShow = Math.floor(interpolate(frame, [0, 60], [0, text.length]));
<span>{text.slice(0, charsToShow)}</span>
```

## Asset Management

### Static Files
Place assets in `public/` folder:
```tsx
import { staticFile, Img, Audio, Video } from "remotion";

<Img src={staticFile("logo.png")} />
<Audio src={staticFile("background.mp3")} />
<Video src={staticFile("clip.mp4")} />
```

### Remote Assets
```tsx
<Img src="https://example.com/image.png" />
```

### Preloading
```tsx
import { prefetch } from "remotion";
const { free, waitUntilDone } = prefetch(staticFile("large-video.mp4"));
await waitUntilDone();
```

## Video Structure Best Practices

### Scene-Based Architecture
Create separate components for each scene:
```
src/
├── scenes/
│   ├── TitleScene.tsx
│   ├── IntroScene.tsx
│   ├── ContentScene.tsx
│   └── OutroScene.tsx
├── components/
│   ├── AnimatedText.tsx
│   └── Logo.tsx
├── Root.tsx
└── index.ts
```

### Composition with Multiple Scenes
```tsx
// Root.tsx
import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";

export const RemotionRoot = () => (
  <Composition
    id="MainVideo"
    component={MainVideo}
    durationInFrames={450}  // 15 seconds at 30fps
    fps={30}
    width={1920}
    height={1080}
  />
);

// MainVideo.tsx
import { Sequence } from "remotion";
import { TitleScene } from "./scenes/TitleScene";
import { ContentScene } from "./scenes/ContentScene";
import { OutroScene } from "./scenes/OutroScene";

export const MainVideo = () => (
  <>
    <Sequence from={0} durationInFrames={90}>
      <TitleScene />
    </Sequence>
    <Sequence from={90} durationInFrames={270}>
      <ContentScene />
    </Sequence>
    <Sequence from={360} durationInFrames={90}>
      <OutroScene />
    </Sequence>
  </>
);
```

## Rendering Commands

```bash
# Start development server (preview mode)
npm run start

# Render video to MP4
npm run build

# Render specific composition
npx remotion render src/index.ts CompositionId out/video.mp4

# Render with custom settings
npx remotion render src/index.ts CompositionId out/video.mp4 --codec=h264 --crf=18

# Render still image at specific frame
npx remotion still src/index.ts CompositionId out/thumbnail.png --frame=60
```

## Common Video Resolutions

| Format | Width | Height | Use Case |
|--------|-------|--------|----------|
| 1080p | 1920 | 1080 | YouTube, Standard |
| 4K | 3840 | 2160 | High Quality |
| Square | 1080 | 1080 | Instagram |
| Portrait | 1080 | 1920 | TikTok, Stories |
| 720p | 1280 | 720 | Fast rendering |

## Frame Rate Guidelines

| FPS | Use Case |
|-----|----------|
| 24 | Cinematic feel |
| 30 | Standard video |
| 60 | Smooth animations |

## Duration Calculator
- Frames = Seconds × FPS
- 30fps: 1 second = 30 frames, 10 seconds = 300 frames
- 60fps: 1 second = 60 frames, 10 seconds = 600 frames

## Tips for Claude Code

1. **Always use TypeScript** for type safety and better code generation
2. **Create reusable animation components** (AnimatedText, FadeIn, SlideIn)
3. **Use meaningful composition IDs** for easy rendering
4. **Structure videos as scenes** for easier editing
5. **Test animations at target FPS** before final render
6. **Use `staticFile()` for local assets** in public/ folder
7. **Add extrapolate clamp** to prevent animation overshoot
8. **Use spring() for natural-feeling animations**
9. **Stagger animations** for professional-looking sequences
10. **Keep components pure** - no side effects in render
