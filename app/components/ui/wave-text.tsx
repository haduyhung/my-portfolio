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

  const hasSpaces = text.includes(" ");

  const renderChar = (char: string, globalIndex: number) => {
    const dist = Math.abs(globalIndex - activeWave);
    const isLifted = activeWave >= 0 && dist < waveWidth;
    const lift = isLifted
      ? Math.cos((dist / waveWidth) * (Math.PI / 2)) * -3
      : 0;

    return (
      <span
        key={globalIndex}
        style={{
          display: "inline-block",
          transform: `translateY(${lift}px)`,
          transition: "transform 0.25s ease-out",
        }}
      >
        {char}
      </span>
    );
  };

  // Languages with spaces: group by word to prevent mid-word breaks
  if (hasSpaces) {
    const words = text.split(" ");
    let charIndex = 0;

    return (
      <span className={className}>
        {words.map((word, wi) => {
          const startIndex = charIndex;
          charIndex += word.length + 1;

          return (
            <span key={wi}>
              <span style={{ whiteSpace: "nowrap" }}>
                {word.split("").map((char, ci) => renderChar(char, startIndex + ci))}
              </span>
              {wi < words.length - 1 && " "}
            </span>
          );
        })}
      </span>
    );
  }

  // Languages without spaces (Japanese, Chinese, etc.): render char by char
  return (
    <span className={className} style={{ wordBreak: "break-word" }}>
      {text.split("").map((char, i) => renderChar(char, i))}
    </span>
  );
}
