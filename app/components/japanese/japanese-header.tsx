"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Menu } from "lucide-react";
import { usePathname } from "../../../i18n/navigation";
import { EXERCISES } from "../../constants/japanese-exercises";
import { parseReviewConfig, type ReviewSearchParams } from "../../constants/japanese-review";
import { ThemeToggle } from "../ui/theme-toggle";

function getExerciseLabel(type: string) {
  return EXERCISES.find((exercise) => exercise.type === type)?.label;
}

function getPageInfo(pathname: string): { title: string; subtitle?: string } {
  if (pathname === "/japanese/review" || pathname.startsWith("/japanese/review/")) {
    return { title: "Ôn tập", subtitle: "Minna no Nihongo" };
  }
  const minnaExMatch = pathname.match(/\/minna\/(\d+)\/([^/]+)$/);
  if (minnaExMatch) {
    return { title: `Bài ${minnaExMatch[1]}`, subtitle: getExerciseLabel(minnaExMatch[2]) };
  }
  const minnaLessonMatch = pathname.match(/\/minna\/(\d+)$/);
  if (minnaLessonMatch) return { title: `Bài ${minnaLessonMatch[1]}`, subtitle: "Minna no Nihongo" };
  if (pathname.includes("/minna")) return { title: "Minna no Nihongo", subtitle: "みんなの日本語" };
  if (pathname.includes("/hiragana")) return { title: "Hiragana", subtitle: "ひらがな" };
  if (pathname.includes("/katakana")) return { title: "Katakana", subtitle: "カタカナ" };
  const numbersLessonMatch = pathname.match(/\/numbers\/(\d+)$/);
  if (numbersLessonMatch) return { title: `Bài ${numbersLessonMatch[1]}`, subtitle: "Số đếm" };
  const numbersExMatch = pathname.match(/\/numbers\/(\d+)\/([^/]+)$/);
  if (numbersExMatch) {
    return { title: `Bài ${numbersExMatch[1]}`, subtitle: getExerciseLabel(numbersExMatch[2]) };
  }
  if (pathname.includes("/numbers")) return { title: "Số đếm", subtitle: "数の読み方" };
  return { title: "Tiếng Nhật", subtitle: "日本語" };
}

function ReviewSubtitle({ exerciseType }: { exerciseType: string }) {
  const searchParams = useSearchParams();
  const query: ReviewSearchParams = {};
  searchParams.forEach((value, key) => {
    const values = searchParams.getAll(key);
    query[key] = values.length > 1 ? values : value;
  });
  const config = parseReviewConfig(query, exerciseType);

  return (
    <span className="truncate text-xs text-muted-foreground">
      {config
        ? `Bài ${config.from}–${config.to} · ${getExerciseLabel(config.exerciseType)}`
        : "Cấu hình không hợp lệ"}
    </span>
  );
}

interface JapaneseHeaderProps {
  onMenuToggle: () => void;
}

export function JapaneseHeader({ onMenuToggle }: JapaneseHeaderProps) {
  const pathname = usePathname();
  const { title, subtitle } = getPageInfo(pathname);
  const reviewExercise = pathname.match(/^\/japanese\/review\/([^/]+)$/)?.[1];

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-2 border-b border-border bg-card/80 backdrop-blur-sm px-4 md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-secondary md:hidden"
          aria-label="Mở menu"
        >
          <Menu size={18} />
        </button>
        <div className="flex min-w-0 flex-col justify-center sm:flex-row sm:items-baseline sm:gap-2">
          <span className="shrink-0 text-sm font-semibold">{title}</span>
          {reviewExercise ? (
            <Suspense fallback={<span className="truncate text-xs text-muted-foreground">{subtitle}</span>}>
              <ReviewSubtitle exerciseType={reviewExercise} />
            </Suspense>
          ) : subtitle ? (
            <span className="truncate text-xs text-muted-foreground">{subtitle}</span>
          ) : null}
        </div>
      </div>
      <ThemeToggle />
    </header>
  );
}
