"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";

interface WaveTextProps {
  text: string;
  className?: string;
  interval?: number; // ms between waves
  waveWidth?: number; // how many chars lift at once
}

export function WaveText({
  text,
  className,
  interval = 6000,
  waveWidth = 3,
}: WaveTextProps) {
  const [activeWave, setActiveWave] = useState<number>(-1);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const runWave = useCallback(() => {
    let pos = 0;
    const len = text.length;
    const speed = 25;

    const step = () => {
      setActiveWave(pos);
      pos++;
      if (pos <= len) {
        setTimeout(step, speed);
      } else {
        setActiveWave(-1);
      }
    };

    step();
  }, [text]);

  useEffect(() => {
    const startLoop = () => {
      runWave();
      timeoutRef.current = setTimeout(startLoop, interval);
    };

    timeoutRef.current = setTimeout(startLoop, 5000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [interval, runWave]);

  return (
    <span className={className}>
      {text.split("").map((char, i) => {
        const distFromWave = Math.abs(i - activeWave);
        const isLifted = activeWave >= 0 && distFromWave < waveWidth;
        const lift = isLifted
          ? Math.cos((distFromWave / waveWidth) * (Math.PI / 2)) * -3
          : 0;

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              transform: `translateY(${lift}px)`,
              transition: "transform 0.25s ease-out",
              whiteSpace: char === " " ? "pre" : undefined,
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}
