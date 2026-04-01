"use client";

import { motion } from "framer-motion";
import { useState, useCallback } from "react";

const ICONS = [
  // Left side
  { label: "React", icon: "⚛️", x: "15%", y: "15%" },
  { label: "</>", icon: "</>", x: "10%", y: "30%" },
  { label: "Next.js", icon: "▲", x: "18%", y: "45%" },
  { label: "JS", icon: "JS", x: "8%", y: "58%" },
  { label: "Node", icon: "⬢", x: "16%", y: "72%" },
  { label: "npm", icon: "npm", x: "12%", y: "85%" },
  { label: "Redux", icon: "↻", x: "22%", y: "22%" },
  // Right side
  { label: "TypeScript", icon: "TS", x: "82%", y: "15%" },
  { label: "{ }", icon: "{ }", x: "88%", y: "30%" },
  { label: "Git", icon: "⎇", x: "80%", y: "45%" },
  { label: "CSS", icon: "✦", x: "90%", y: "58%" },
  { label: "API", icon: "↔", x: "84%", y: "72%" },
  { label: "HTML", icon: "< >", x: "86%", y: "85%" },
  { label: "Tailwind", icon: "🌊", x: "78%", y: "22%" },
  // Top & bottom center-ish
  { label: "Vite", icon: "⚡", x: "30%", y: "10%" },
  { label: "Docker", icon: "🐳", x: "68%", y: "10%" },
  { label: "SQL", icon: "DB", x: "28%", y: "88%" },
  { label: "REST", icon: "⇄", x: "70%", y: "88%" },
];

const FLOAT_PATTERNS = [
  { x: [0, -5, 3, 0], y: [0, -6, 2, 0], duration: 7.2 },
  { x: [0, 4, -3, 0], y: [0, 5, -4, 0], duration: 6.5 },
  { x: [0, -3, 5, 0], y: [0, -4, 3, 0], duration: 8.1 },
  { x: [0, 5, -2, 0], y: [0, 3, -5, 0], duration: 7.8 },
  { x: [0, -4, 2, 0], y: [0, 5, -3, 0], duration: 6.9 },
  { x: [0, 3, -4, 0], y: [0, -5, 4, 0], duration: 7.4 },
  { x: [0, -2, 4, 0], y: [0, -3, 5, 0], duration: 8.3 },
  { x: [0, 4, -5, 0], y: [0, 4, -2, 0], duration: 6.7 },
  { x: [0, -5, 2, 0], y: [0, -4, 5, 0], duration: 7.6 },
  { x: [0, 3, -3, 0], y: [0, 5, -5, 0], duration: 8.0 },
  { x: [0, -4, 4, 0], y: [0, 6, -3, 0], duration: 7.0 },
  { x: [0, 5, -4, 0], y: [0, -3, 5, 0], duration: 6.8 },
  { x: [0, -3, 3, 0], y: [0, -5, 4, 0], duration: 7.9 },
  { x: [0, 4, -2, 0], y: [0, 4, -6, 0], duration: 8.2 },
  { x: [0, -5, 5, 0], y: [0, -4, 2, 0], duration: 7.3 },
  { x: [0, 3, -5, 0], y: [0, 5, -3, 0], duration: 6.6 },
  { x: [0, -2, 3, 0], y: [0, -6, 4, 0], duration: 7.7 },
  { x: [0, 4, -4, 0], y: [0, 3, -4, 0], duration: 8.4 },
];

function FloatingIcon({
  label,
  icon,
  x,
  y,
  pattern,
  index,
}: {
  label: string;
  icon: string;
  x: string;
  y: string;
  pattern: (typeof FLOAT_PATTERNS)[0];
  index: number;
}) {
  const [tapped, setTapped] = useState(false);

  const handleTap = useCallback(() => {
    setTapped(true);
    setTimeout(() => setTapped(false), 600);
  }, []);

  const isText = icon.length > 1 && !icon.match(/[\u{1F000}-\u{1FFFF}]/u);

  return (
    <motion.div
      className="absolute flex cursor-pointer select-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 0.5,
        scale: tapped ? 1.4 : 1,
        x: pattern.x,
        y: pattern.y,
      }}
      transition={{
        opacity: { duration: 0.6, delay: 0.8 + index * 0.08 },
        scale: {
          duration: tapped ? 0.3 : 0.6,
          delay: tapped ? 0 : 0.8 + index * 0.08,
          type: tapped ? "spring" : "tween",
          stiffness: 300,
          damping: 10,
        },
        x: { repeat: Infinity, duration: pattern.duration, ease: "easeInOut" },
        y: { repeat: Infinity, duration: pattern.duration, ease: "easeInOut" },
      }}
      drag
      dragConstraints={{ left: -60, right: 60, top: -60, bottom: 60 }}
      dragElastic={0.15}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
      whileHover={{ opacity: 0.85, scale: 1.2 }}
      whileDrag={{ opacity: 0.9, scale: 1.3 }}
      onTap={handleTap}
      title={label}
    >
      {isText ? (
        <span className="text-sm font-bold text-foreground/60">{icon}</span>
      ) : (
        <span className="text-xl">{icon}</span>
      )}
    </motion.div>
  );
}

export function FloatingIcons() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden [&>*]:pointer-events-auto">
      {ICONS.map((item, i) => (
        <FloatingIcon
          key={item.label}
          {...item}
          pattern={FLOAT_PATTERNS[i % FLOAT_PATTERNS.length]}
          index={i}
        />
      ))}
    </div>
  );
}
