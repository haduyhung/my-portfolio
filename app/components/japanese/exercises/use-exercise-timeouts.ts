"use client";

import { useCallback, useEffect, useRef } from "react";

/** Cancel delayed feedback/round transitions when the exercise is unmounted. */
export function useExerciseTimeouts() {
  const pending = useRef(new Set<ReturnType<typeof setTimeout>>());
  useEffect(() => {
    const timers = pending.current;
    return () => {
      timers.forEach(clearTimeout);
      timers.clear();
    };
  }, []);
  return useCallback((callback: () => void, delay: number) => {
    const timer = setTimeout(() => {
      pending.current.delete(timer);
      callback();
    }, delay);
    pending.current.add(timer);
    return timer;
  }, []);
}
