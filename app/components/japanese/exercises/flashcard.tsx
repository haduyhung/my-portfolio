"use client";

import { useState, useCallback, useRef, useEffect, type KeyboardEvent } from "react";
import { motion, type PanInfo } from "framer-motion";
import type { ExerciseProps } from "./exercise-props";
import { useExerciseTimeouts } from "./use-exercise-timeouts";
import { getMeaning, shuffle } from "./exercise-data";
import { ExerciseUnavailable } from "./exercise-unavailable";
import type { MinnaWord } from "../../../constants/minna";

interface FlashcardProps extends ExerciseProps {
  reverse?: boolean;
}

export function ReverseFlashcard(props: ExerciseProps) {
  return <Flashcard {...props} reverse />;
}

export function Flashcard({ words, lang, onExit, onRestart, exitLabel = "Về bài học", reverse = false }: FlashcardProps) {
  const schedule = useExerciseTimeouts();
  const answeringRef = useRef(false);
  const draggingRef = useRef(false);
  const suppressClickRef = useRef(false);
  const cardRef = useRef<HTMLButtonElement>(null);
  const flipRef = useRef<HTMLButtonElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);
  const [deck, setDeck] = useState<MinnaWord[]>(() => shuffle(words));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<MinnaWord[]>([]);
  const [unknown, setUnknown] = useState<MinnaWord[]>([]);
  const [done, setDone] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const current = deck[index];
  const total = deck.length;

  const title = reverse ? "Flashcard đảo ngược" : "Flashcard";
  const showJapanese = reverse ? flipped : !flipped;

  useEffect(() => {
    // Keep keyboard users in the exercise when answer buttons disappear.
    (done ? resultRef.current : cardRef.current)?.focus({ preventScroll: true });
  }, [index, done, reviewMode]);

  const handleFlip = () => {
    if (!answeringRef.current && !draggingRef.current && !done && current) {
      cardRef.current?.focus({ preventScroll: true });
      setFlipped((value) => !value);
    }
  };

  const handleAnswer = useCallback(
    (didKnow: boolean) => {
      if (answeringRef.current || !current || !flipped || done) return;
      answeringRef.current = true;
      setTransitioning(true);
      cardRef.current?.focus({ preventScroll: true });
      if (didKnow) {
        setKnown((k) => [...k, current]);
      } else {
        setUnknown((u) => [...u, current]);
      }
      schedule(() => {
        answeringRef.current = false;
        setTransitioning(false);
        setFlipped(false);
        if (index + 1 >= total) {
          setDone(true);
        } else {
          setIndex((i) => i + 1);
        }
      }, 150);
    },
    [current, index, total, schedule, flipped, done]
  );

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = Math.min(80, (cardRef.current?.offsetWidth ?? 360) * 0.22);
    if (event.type !== "pointercancel" && Math.abs(info.offset.x) >= threshold && Math.abs(info.offset.x) > Math.abs(info.offset.y)) {
      handleAnswer(info.offset.x > 0);
    }
    // Keep click suppressed until the next pointer gesture: touch browsers can
    // dispatch their synthetic click after the drag callback and its timers.
    schedule(() => { draggingRef.current = false; }, 0);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.defaultPrevented) return;
    const target = event.target;
    if (!(target instanceof HTMLElement)
      || target.isContentEditable
      || target.closest('input, textarea, select, [role="textbox"], [role="combobox"], [role="slider"], [role="spinbutton"]')) return;

    const isFlipKey = event.key === " " || event.key === "Enter";
    const isAnswerKey = event.key === "ArrowLeft" || event.key === "ArrowRight";
    if (!isFlipKey && !isAnswerKey) return;
    const control = target.closest('button, a, [role="button"], [role="link"]');
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.nativeEvent.isComposing) {
      // Returning alone still lets native Enter/Space click a focused button.
      if (isFlipKey && (control === flipRef.current || control?.hasAttribute("aria-keyshortcuts"))) {
        event.preventDefault();
      }
      return;
    }
    if (event.repeat || answeringRef.current || draggingRef.current) {
      event.preventDefault();
      return;
    }

    // Enter/Space must still activate the focused answer or exit button normally.
    if (isFlipKey && control && control !== cardRef.current && control !== flipRef.current) return;
    if (isAnswerKey && control && control.tagName === "A") return;
    event.preventDefault();
    if (isFlipKey) handleFlip();
    else if (flipped) handleAnswer(event.key === "ArrowRight");
  };

  const handleReviewUnknown = () => {
    if (!unknown.length) return;
    answeringRef.current = false;
    draggingRef.current = false;
    suppressClickRef.current = false;
    setDeck(shuffle(unknown));
    setIndex(0);
    setKnown([]);
    setUnknown([]);
    setFlipped(false);
    setDone(false);
    setReviewMode(true);
    setTransitioning(false);
  };


  if (!current) return <ExerciseUnavailable onExit={onExit} exitLabel={exitLabel} />;

  if (done) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-3 text-center"
        >
          <div className="text-5xl">
            {unknown.length === 0 ? "🎉" : unknown.length <= total * 0.2 ? "👏" : "💪"}
          </div>
          <h2 ref={resultRef} tabIndex={-1} className="text-2xl font-bold">Kết quả</h2>
          <div className="flex gap-6 text-sm">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-green-500">{known.length}</span>
              <span className="text-muted-foreground">Đã biết</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-red-500">{unknown.length}</span>
              <span className="text-muted-foreground">Chưa biết</span>
            </div>
          </div>
        </motion.div>
        <div className="flex flex-col gap-3 w-56">
          {unknown.length > 0 && (
            <button
              onClick={handleReviewUnknown}
              className="rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Ôn lại {unknown.length} từ chưa biết
            </button>
          )}
          <button
            onClick={onRestart}
            className="rounded-lg border border-border py-2.5 text-sm transition-colors hover:bg-secondary"
          >
            Làm lại từ đầu
          </button>
          <button
            onClick={onExit}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
          >
            {exitLabel}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div onKeyDown={handleKeyDown} className="flex min-h-[calc(100dvh-3.5rem)] flex-col items-center justify-center overflow-x-clip px-6 pt-6 pb-32 md:p-6">
      <div className="w-full max-w-sm">
        {/* Progress */}
        <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>{reviewMode ? `Ôn lại · ${title}` : title}</span>
          <span>{index + 1} / {total}</span>
        </div>
        <div className="mb-6 h-1.5 w-full rounded-full bg-secondary">
          <motion.div
            className="h-1.5 rounded-full bg-primary"
            animate={{ width: `${(index / total) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Card */}
        <motion.button
          key={index}
          ref={cardRef}
          type="button"
          aria-pressed={flipped}
          aria-disabled={transitioning}
          aria-keyshortcuts="Space Enter ArrowLeft ArrowRight"
          className="block h-72 w-full cursor-grab select-none rounded-2xl active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:h-80"
          style={{ perspective: 1000, touchAction: "pan-y" }}
          drag={transitioning ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.85}
          dragMomentum={false}
          dragSnapToOrigin
          onPointerDown={() => {
            draggingRef.current = false;
            suppressClickRef.current = false;
          }}
          onDragStart={() => {
            draggingRef.current = true;
            suppressClickRef.current = true;
          }}
          onDragEnd={handleDragEnd}
          onClick={() => { if (!suppressClickRef.current) handleFlip(); }}
        >
          <motion.span
            key={`${index}-${flipped}`}
            style={{ touchAction: "pan-y" }}
            initial={{ rotateY: flipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className={`flex h-full w-full flex-col overflow-y-auto rounded-2xl border p-6 text-center shadow-sm md:p-8 ${
              flipped ? "border-primary/30 bg-primary/5" : "border-border bg-card"
            }`}
          >
            <span className="my-auto flex w-full shrink-0 flex-col items-center gap-3 break-words">
              {showJapanese ? (
                <>
                  {current.kanji && (
                    <span className="max-w-full text-4xl font-medium md:text-5xl">{current.kanji}</span>
                  )}
                  <span
                    className={current.kanji ? "max-w-full text-xl text-muted-foreground" : "max-w-full text-4xl font-medium md:text-5xl"}
                  >
                    {current.kana}
                  </span>
                  {reverse && <span className="max-w-full text-sm text-muted-foreground">{current.romaji}</span>}
                </>
              ) : (
                <>
                  <span className="max-w-full text-lg font-semibold">{getMeaning(current, reverse ? "vi" : lang)}</span>
                  {!reverse && (
                    <>
                      <span className="max-w-full text-sm text-muted-foreground">{current.romaji}</span>
                      <span className="max-w-full text-xs text-muted-foreground">{current.kana}</span>
                    </>
                  )}
                </>
              )}
            </span>
          </motion.span>
        </motion.button>

        {/* Action buttons */}
        <div
          role="group"
          aria-label="Thao tác thẻ"
          className="fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-10 mx-auto flex max-w-sm gap-3 rounded-2xl border border-border bg-card/95 p-3 shadow-lg backdrop-blur-sm md:static md:mt-4 md:max-w-none md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none"
        >
          {!flipped ? (
            <button
              ref={flipRef}
              type="button"
              onClick={handleFlip}
              disabled={transitioning}
              className="w-full rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
            >
              Lật thẻ
            </button>
          ) : (
            <>
              <button
                type="button"
                disabled={transitioning}
                aria-keyshortcuts="ArrowLeft"
                onClick={() => { if (!draggingRef.current) handleAnswer(false); }}
                className="flex-1 rounded-xl border border-red-500/30 bg-red-500/5 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
              >
                ← Chưa biết
              </button>
              <button
                type="button"
                disabled={transitioning}
                aria-keyshortcuts="ArrowRight"
                onClick={() => { if (!draggingRef.current) handleAnswer(true); }}
                className="flex-1 rounded-xl border border-green-500/30 bg-green-500/5 py-3 text-sm font-medium text-green-600 transition-colors hover:bg-green-500/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
              >
                Biết rồi →
              </button>
            </>
          )}
        </div>

        <div className="mt-3 flex justify-end">
          <button
            onClick={onExit}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {exitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
