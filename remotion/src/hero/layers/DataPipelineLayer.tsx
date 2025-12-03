// Layer 2: Data Pipeline
// Core cinematic showing data flow from chaos to unified CRM

import React from "react";
import { interpolate } from "remotion";
import { BRAND_COLORS, ACTS, TIMING, LAYOUT } from "../constants/brand";
import { fadeInUp, nodePulse, packetProgress, interpolatePath } from "../motion/atomic";
import { framesFromSeconds, EASE_OUT } from "../motion/easing";

interface DataPipelineLayerProps {
  frame: number;
  width: number;
  height: number;
}

// Node positions along the pipeline (x, y as percentages)
// Shifted right to avoid text section (left 45% of screen)
const NODES = [
  { x: 0.48, y: 0.28, label: "CRM 1" },
  { x: 0.44, y: 0.50, label: "Marketing" },
  { x: 0.50, y: 0.72, label: "Support" },
  { x: 0.65, y: 0.50, label: "Hub" }, // Central hub
  { x: 0.78, y: 0.32, label: "Process" },
  { x: 0.78, y: 0.68, label: "Validate" },
  { x: 0.92, y: 0.50, label: "Unified" }, // Final node
];

// Connection paths between nodes (source index -> target index)
const CONNECTIONS = [
  { from: 0, to: 3 },
  { from: 1, to: 3 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 3, to: 5 },
  { from: 4, to: 6 },
  { from: 5, to: 6 },
];

// Packet configuration
const PACKETS = [
  { connectionIndex: 0, startFrame: 90, duration: 60, color: BRAND_COLORS.ELECTRIC_TEAL },
  { connectionIndex: 1, startFrame: 120, duration: 55, color: BRAND_COLORS.TEAL },
  { connectionIndex: 2, startFrame: 150, duration: 65, color: BRAND_COLORS.ELECTRIC_TEAL },
  { connectionIndex: 3, startFrame: 180, duration: 50, color: BRAND_COLORS.ELECTRIC_TEAL },
  { connectionIndex: 4, startFrame: 200, duration: 50, color: BRAND_COLORS.TEAL },
  { connectionIndex: 5, startFrame: 240, duration: 45, color: BRAND_COLORS.ELECTRIC_TEAL },
  { connectionIndex: 6, startFrame: 260, duration: 45, color: BRAND_COLORS.TEAL },
  // Looping packets for steady state
  { connectionIndex: 0, startFrame: 400, duration: 60, color: BRAND_COLORS.ELECTRIC_TEAL },
  { connectionIndex: 1, startFrame: 430, duration: 55, color: BRAND_COLORS.TEAL },
  { connectionIndex: 2, startFrame: 460, duration: 65, color: BRAND_COLORS.ELECTRIC_TEAL },
  { connectionIndex: 3, startFrame: 490, duration: 50, color: BRAND_COLORS.ELECTRIC_TEAL },
  { connectionIndex: 4, startFrame: 510, duration: 50, color: BRAND_COLORS.TEAL },
  { connectionIndex: 5, startFrame: 550, duration: 45, color: BRAND_COLORS.ELECTRIC_TEAL },
  { connectionIndex: 6, startFrame: 570, duration: 45, color: BRAND_COLORS.TEAL },
  // More loop packets
  { connectionIndex: 0, startFrame: 620, duration: 60, color: BRAND_COLORS.ELECTRIC_TEAL },
  { connectionIndex: 1, startFrame: 650, duration: 55, color: BRAND_COLORS.TEAL },
  { connectionIndex: 2, startFrame: 680, duration: 65, color: BRAND_COLORS.ELECTRIC_TEAL },
];

const Node: React.FC<{
  x: number;
  y: number;
  frame: number;
  index: number;
  isHub?: boolean;
  isFinal?: boolean;
}> = ({ x, y, frame, index, isHub = false, isFinal = false }) => {
  // Staggered entrance
  const entranceStart = ACTS.ACT_1_START + index * 8;
  const { opacity, translateY } = fadeInUp(frame, {
    start: entranceStart,
    duration: 30,
    fromY: 20,
  });

  // Pulsing effect
  const { scale, glowOpacity } = nodePulse(frame, {
    periodFrames: framesFromSeconds(2 + index * 0.3),
    maxScale: isHub ? 1.1 : 1.08,
    minScale: 1,
  });

  const size = isHub ? 48 : isFinal ? 56 : 36;
  const innerSize = size * 0.5;

  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2 + translateY,
        width: size,
        height: size,
        opacity,
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          inset: -15,
          borderRadius: "50%",
          background: isFinal
            ? BRAND_COLORS.ELECTRIC_TEAL
            : isHub
            ? BRAND_COLORS.TEAL
            : BRAND_COLORS.TEAL,
          filter: "blur(15px)",
          opacity: glowOpacity * 0.5,
          transform: `scale(${scale})`,
        }}
      />

      {/* Outer ring */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${BRAND_COLORS.TEAL}, ${BRAND_COLORS.ELECTRIC_TEAL})`,
          transform: `scale(${scale})`,
        }}
      />

      {/* Inner circle */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: innerSize,
          height: innerSize,
          borderRadius: "50%",
          background: isFinal ? BRAND_COLORS.ELECTRIC_TEAL : BRAND_COLORS.OFF_WHITE,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      />
    </div>
  );
};

const Connection: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  frame: number;
  index: number;
}> = ({ x1, y1, x2, y2, frame, index }) => {
  const entranceStart = ACTS.ACT_1_START + 30 + index * 5;

  // Animate line drawing
  const lineProgress = interpolate(frame, [entranceStart, entranceStart + 40], [0, 1], {
    easing: EASE_OUT,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

  return (
    <div
      style={{
        position: "absolute",
        left: x1,
        top: y1,
        width: length * lineProgress,
        height: 2,
        background: `linear-gradient(90deg, ${BRAND_COLORS.TEAL}60, ${BRAND_COLORS.ELECTRIC_TEAL}40)`,
        transformOrigin: "left center",
        transform: `rotate(${angle}deg)`,
        borderRadius: 1,
      }}
    />
  );
};

const Packet: React.FC<{
  connection: { from: number; to: number };
  startFrame: number;
  duration: number;
  color: string;
  frame: number;
  nodes: { x: number; y: number }[];
}> = ({ connection, startFrame, duration, color, frame, nodes }) => {
  // Calculate packet position
  const loopFrame = frame % TIMING.TOTAL_FRAMES;

  if (loopFrame < startFrame || loopFrame > startFrame + duration) {
    return null;
  }

  const progress = (loopFrame - startFrame) / duration;

  const startNode = nodes[connection.from];
  const endNode = nodes[connection.to];

  const x = startNode.x + (endNode.x - startNode.x) * progress;
  const y = startNode.y + (endNode.y - startNode.y) * progress;

  const size = 14;

  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: 4,
        background: color,
        boxShadow: `0 0 20px ${color}, 0 0 40px ${color}50`,
      }}
    />
  );
};

export const DataPipelineLayer: React.FC<DataPipelineLayerProps> = ({
  frame,
  width,
  height,
}) => {
  // Convert node positions to pixels
  const nodePositions = NODES.map((node) => ({
    x: node.x * width,
    y: node.y * height,
  }));

  // Layer fade in
  const fadeIn = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Layer fade out for outro
  const fadeOut = interpolate(
    frame,
    [ACTS.CONTENT_FADE_OUT_START, ACTS.CONTENT_FADE_OUT_END],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const layerOpacity = Math.min(fadeIn, fadeOut);

  return (
    <div
      style={{
        position: "absolute",
        width,
        height,
        opacity: layerOpacity,
      }}
    >
      {/* Connections */}
      {CONNECTIONS.map((conn, index) => (
        <Connection
          key={`conn-${index}`}
          x1={nodePositions[conn.from].x}
          y1={nodePositions[conn.from].y}
          x2={nodePositions[conn.to].x}
          y2={nodePositions[conn.to].y}
          frame={frame}
          index={index}
        />
      ))}

      {/* Packets */}
      {PACKETS.map((packet, index) => (
        <Packet
          key={`packet-${index}`}
          connection={CONNECTIONS[packet.connectionIndex]}
          startFrame={packet.startFrame}
          duration={packet.duration}
          color={packet.color}
          frame={frame}
          nodes={nodePositions}
        />
      ))}

      {/* Nodes */}
      {NODES.map((node, index) => (
        <Node
          key={`node-${index}`}
          x={nodePositions[index].x}
          y={nodePositions[index].y}
          frame={frame}
          index={index}
          isHub={index === 3}
          isFinal={index === 6}
        />
      ))}
    </div>
  );
};
