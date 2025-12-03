'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { cn } from '@/lib/utils';
import SectionTwoRibbon from './section-two-ribbon';

// Map texts to their corresponding illustrations
const illustrationMap: Record<string, string> = {
  'Resilient CRM architectures': '/illustrations/Cloud hosting-cuate.svg',
  'Safe Salesforce & Veeva integrations': '/illustrations/Secure data-amico.svg',
  'Lifecycle marketing that performs': '/illustrations/Mobile Marketing-amico.svg',
  'Training that sticks': '/illustrations/Coding workshop-bro.svg',
};

interface ScrollTextSwapProps {
  texts: string[];
  className?: string;
  textClassName?: string;
}

export default function ScrollTextSwap({
  texts,
  className,
  textClassName,
}: ScrollTextSwapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Progress bar width
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div
      ref={containerRef}
      className={cn('relative', className)}
      style={{ height: `${(texts.length + 1) * 100}vh` }}
    >
      {/* Sticky container for text */}
      <div className="sticky top-0 h-screen flex items-center">
        {/* Diagonal ribbon behind content */}
        <SectionTwoRibbon
          scrollYProgress={scrollYProgress}
          totalTexts={texts.length}
        />

        {/* Progress bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/20 z-10">
          <motion.div
            className="h-full bg-white origin-left"
            style={{ width: progressWidth }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Text */}
            <div className="relative h-[200px] flex items-center">
              {texts.map((text, index) => (
                <ScrollTextItem
                  key={index}
                  text={text}
                  index={index}
                  total={texts.length}
                  scrollYProgress={scrollYProgress}
                  className={textClassName}
                />
              ))}
            </div>

            {/* Right side - Illustrations */}
            <div className="relative h-[400px] hidden lg:flex items-center justify-center">
              {texts.map((text, index) => (
                <ScrollIllustrationItem
                  key={index}
                  src={illustrationMap[text] || ''}
                  alt={text}
                  index={index}
                  total={texts.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ScrollTextItemProps {
  text: string;
  index: number;
  total: number;
  scrollYProgress: any;
  className?: string;
}

function ScrollTextItem({
  text,
  index,
  total,
  scrollYProgress,
  className,
}: ScrollTextItemProps) {
  // Calculate the range for this text item
  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const fadeInEnd = start + segmentSize * 0.3;
  const fadeOutStart = start + segmentSize * 0.7;
  const end = (index + 1) * segmentSize;

  // Opacity: fade in, stay visible, fade out
  const opacity = useTransform(
    scrollYProgress,
    [start, fadeInEnd, fadeOutStart, end],
    [0, 1, 1, 0]
  );

  // Blur effect
  const blur = useTransform(
    scrollYProgress,
    [start, fadeInEnd, fadeOutStart, end],
    [10, 0, 0, 10]
  );

  // Y position: slight movement
  const y = useTransform(
    scrollYProgress,
    [start, fadeInEnd, fadeOutStart, end],
    [30, 0, 0, -30]
  );

  return (
    <motion.p
      style={{
        opacity,
        y,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
      }}
      className={cn(
        'absolute inset-0 flex items-center text-4xl md:text-5xl lg:text-6xl font-semibold text-white max-w-xl',
        className
      )}
    >
      {text}
    </motion.p>
  );
}

interface ScrollIllustrationItemProps {
  src: string;
  alt: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

function ScrollIllustrationItem({
  src,
  alt,
  index,
  total,
  scrollYProgress,
}: ScrollIllustrationItemProps) {
  // Calculate the range for this illustration (synced with text)
  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const fadeInEnd = start + segmentSize * 0.3;
  const fadeOutStart = start + segmentSize * 0.7;
  const end = (index + 1) * segmentSize;

  // Opacity: fade in, stay visible, fade out
  const opacity = useTransform(
    scrollYProgress,
    [start, fadeInEnd, fadeOutStart, end],
    [0, 1, 1, 0]
  );

  // Blur effect: starts blurred, becomes sharp, blurs on exit
  const blur = useTransform(
    scrollYProgress,
    [start, fadeInEnd, fadeOutStart, end],
    [12, 0, 0, 12]
  );

  // Scale: subtle grow on entrance, shrink on exit
  const scale = useTransform(
    scrollYProgress,
    [start, fadeInEnd, fadeOutStart, end],
    [0.8, 1, 1, 0.85]
  );

  // X position: slide in from right, slide out to right
  const x = useTransform(
    scrollYProgress,
    [start, fadeInEnd, fadeOutStart, end],
    [60, 0, 0, -40]
  );

  // Rotation: subtle rotation for dynamic feel
  const rotate = useTransform(
    scrollYProgress,
    [start, fadeInEnd, fadeOutStart, end],
    [5, 0, 0, -3]
  );

  if (!src) return null;

  return (
    <motion.div
      style={{
        opacity,
        scale,
        x,
        rotate,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
      }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain max-w-[380px] max-h-[380px]"
      />
    </motion.div>
  );
}
