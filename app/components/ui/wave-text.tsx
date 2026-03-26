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

  const CJK_RE = /[\u3000-\u9fff\uf900-\ufaff]/;

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

  // Segment text into CJK chars (wrap freely) and Latin/punctuation words (nowrap)
  // e.g. "React、Next.jsを使用し" → ["React", "、", "Next.js", "を", "使", "用", "し"]
  const segments: { text: string; isCJK: boolean }[] = [];
  let current = "";
  let currentIsCJK = false;

  for (const char of text) {
    const charIsCJK = CJK_RE.test(char);
    if (char === " ") {
      if (current) segments.push({ text: current, isCJK: currentIsCJK });
      segments.push({ text: " ", isCJK: false });
      current = "";
    } else if (charIsCJK) {
      if (current && !currentIsCJK) segments.push({ text: current, isCJK: false });
      segments.push({ text: char, isCJK: true });
      current = "";
      currentIsCJK = false;
    } else {
      if (current && currentIsCJK) {
        segments.push({ text: current, isCJK: true });
        current = "";
      }
      current += char;
      currentIsCJK = false;
    }
  }
  if (current) segments.push({ text: current, isCJK: currentIsCJK });

  const hasCJK = segments.some((s) => s.isCJK);

  // Pure Latin text: group by word to prevent mid-word breaks
  if (!hasCJK) {
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

  // Mixed CJK + Latin: CJK chars wrap freely, Latin words stay as nowrap blocks
  let globalIndex = 0;

  return (
    <span
      className={className}
      style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {segments.map((seg, si) => {
        const startIndex = globalIndex;
        globalIndex += seg.text.length;

        if (seg.text === " ") {
          return <span key={si}>&nbsp;</span>;
        }

        // CJK char: individual flex item, wraps freely
        if (seg.isCJK) {
          const dist = Math.abs(startIndex - activeWave);
          const isLifted = activeWave >= 0 && dist < waveWidth;
          const lift = isLifted
            ? Math.cos((dist / waveWidth) * (Math.PI / 2)) * -3
            : 0;

          return (
            <span
              key={si}
              style={{
                display: "inline-block",
                transform: `translateY(${lift}px)`,
                transition: "transform 0.25s ease-out",
              }}
            >
              {seg.text}
            </span>
          );
        }

        // Latin word: nowrap block
        return (
          <span key={si} style={{ whiteSpace: "nowrap" }}>
            {seg.text.split("").map((char, ci) => renderChar(char, startIndex + ci))}
          </span>
        );
      })}
    </span>
  );
}
