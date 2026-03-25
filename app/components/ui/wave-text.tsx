"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface WaveTextProps {
  text: string;
  className?: string;
  interval?: number;
  waveWidth?: number;
}

export function WaveText({
  text,
  className,
  interval = 6000,
  waveWidth = 3,
}: WaveTextProps) {
  const [activeWave, setActiveWave] = useState<number>(-1);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

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

  const words = text.split(" ");
  let charIndex = 0;

  return (
    <span className={className} style={{ wordBreak: "break-word" }}>
      {words.map((word, wi) => {
        const startIndex = charIndex;
        charIndex += word.length + 1;

        return (
          <span key={wi}>
            <span style={{ whiteSpace: "nowrap" }}>
              {word.split("").map((char, ci) => {
                const gi = startIndex + ci;
                const dist = Math.abs(gi - activeWave);
                const isLifted = activeWave >= 0 && dist < waveWidth;
                const lift = isLifted
                  ? Math.cos((dist / waveWidth) * (Math.PI / 2)) * -3
                  : 0;

                return (
                  <span
                    key={ci}
                    style={{
                      display: "inline-block",
                      transform: `translateY(${lift}px)`,
                      transition: "transform 0.25s ease-out",
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
            {wi < words.length - 1 && " "}
          </span>
        );
      })}
    </span>
  );
}
