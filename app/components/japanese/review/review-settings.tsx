"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { ArrowRight, BookOpen, Check, Layers, RotateCcw } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel,
  SelectTrigger, SelectValue,
} from "@/app/components/ui/select";
import { EXERCISES } from "@/app/constants/japanese-exercises";
import {
  DEFAULT_REVIEW_CONFIG, REVIEW_LESSONS, getReviewSessionHref,
  getReviewSettingsHref, getReviewWords, isReviewRange, parseReviewConfig,
  type ReviewConfig, type ReviewSearchParams,
} from "@/app/constants/japanese-review";
import { getExerciseAvailability } from "../exercises/exercise-data";
import { useReviewDataset } from "./use-review-dataset";
import { ReviewError, ReviewLoading } from "./review-state";

export function ReviewSettings() {
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  // Back navigation can restore cached server props from before a native history update.
  // Initialize from the current URL, while keeping invalid in-progress ranges editable.
  const [initialConfig] = useState(() => {
    const query: ReviewSearchParams = {};
    searchParams.forEach((_, key) => {
      const values = searchParams.getAll(key);
      query[key] = values.length > 1 ? values : values[0];
    });
    return parseReviewConfig(query);
  });
  const lang = locale === "vi" ? "vi" : locale === "fr" ? "fr" : "en";
  const { state, retry } = useReviewDataset(initialConfig !== null);
  const [config, setConfig] = useState(initialConfig ?? DEFAULT_REVIEW_CONFIG);
  const rangeValid = isReviewRange(config.from, config.to);
  const words = useMemo(
    () => state.status === "ready" && state.dataset ? getReviewWords(state.dataset, config) : [],
    [state, config],
  );
  const availability = useMemo(
    () => getExerciseAvailability(words, config.exerciseType, lang),
    [words, config.exerciseType, lang],
  );

  function updateConfig(next: ReviewConfig) {
    setConfig(next);
    const query = getReviewSettingsHref(next).split("?")[1];
    // Keep the current locale and restore settings on reload without leaving the form.
    window.history.replaceState(null, "", `${window.location.pathname}?${query}`);
  }

  function startReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (rangeValid && availability.available) {
      updateConfig(config);
      router.push(getReviewSessionHref(config));
    }
  }

  if (state.status === "loading") return <ReviewLoading />;
  if (state.status === "error") return <ReviewError message="Không tải được từ vựng. Bạn hãy thử lại." onRetry={retry} />;
  if (!initialConfig) return <ReviewError message="Cấu hình ôn tập không hợp lệ. Hãy chọn khoảng bài từ 1 đến 50 và một loại bài tập." />;

  const exercise = EXERCISES.find((item) => item.type === config.exerciseType)!;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
      <div className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <RotateCcw size={14} aria-hidden="true" /> Minna no Nihongo
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Ôn tập</h1>
        <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
          Chọn khoảng bài và cách luyện tập để ôn lại những từ bạn đã học.
        </p>
      </div>

      <form onSubmit={startReview} className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <div className="space-y-6">
          <fieldset className="min-w-0 rounded-2xl border border-border bg-card p-5 sm:p-6">
            <legend className="sr-only">Khoảng bài</legend>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-muted-foreground"><BookOpen size={18} aria-hidden="true" /></span>
              <div>
                <h2 className="font-semibold">Khoảng bài</h2>
                <p className="text-xs text-muted-foreground">Chọn trong 50 bài của Quyển 1 và Quyển 2.</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {([{ key: "from", label: "Từ bài" }, { key: "to", label: "Đến bài" }] as const).map(({ key, label }) => (
                <div key={key}>
                  <label htmlFor={`review-${key}`} className="mb-2 block text-sm font-medium">{label}</label>
                  <Select value={String(config[key])}
                    onValueChange={(value) => updateConfig({ ...config, [key]: Number(value) })}>
                    <SelectTrigger id={`review-${key}`}
                      aria-invalid={!rangeValid} aria-describedby={!rangeValid ? "review-range-error" : undefined}
                      className="w-full rounded-xl bg-background data-[size=default]:h-12">
                      <SelectValue placeholder="Chọn bài" />
                    </SelectTrigger>
                    <SelectContent position="popper" align="start" className="max-h-72 rounded-xl">
                      {([1, 2] as const).map((book) => (
                        <SelectGroup key={book}>
                          <SelectLabel>Quyển {book}</SelectLabel>
                          {REVIEW_LESSONS.filter((id) => book === 1 ? id <= 25 : id >= 26).map((id) => (
                            <SelectItem key={id} value={String(id)}>Bài {id}</SelectItem>
                          ))}
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
            {!rangeValid && <p id="review-range-error" role="alert" className="mt-3 text-sm text-destructive">Bài bắt đầu phải nhỏ hơn hoặc bằng bài kết thúc.</p>}
          </fieldset>

          <fieldset className="min-w-0 rounded-2xl border border-border bg-card p-5 sm:p-6">
            <legend className="sr-only">Loại bài tập</legend>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-muted-foreground"><Layers size={18} aria-hidden="true" /></span>
              <div>
                <h2 className="font-semibold">Loại bài tập</h2>
                <p className="text-xs text-muted-foreground">Chọn một cách luyện tập cho lượt ôn này.</p>
              </div>
            </div>
            <div className="space-y-2">
              {EXERCISES.map((item) => (
                <label key={item.type} className="block cursor-pointer">
                  <input type="radio" name="exerciseType" value={item.type} checked={config.exerciseType === item.type}
                    onChange={() => updateConfig({ ...config, exerciseType: item.type })} className="peer sr-only" />
                  <span className="flex items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:bg-secondary/50 peer-checked:border-primary peer-checked:bg-primary/5 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary">
                    <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-xl">{item.emoji}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium">{item.label}</span>
                      <span className="block text-xs leading-5 text-muted-foreground">{item.desc}</span>
                    </span>
                    <span aria-hidden="true" className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${config.exerciseType === item.type ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>
                      {config.exerciseType === item.type && <Check size={13} />}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 lg:sticky lg:top-20">
          <h2 className="text-sm font-semibold">Lượt ôn của bạn</h2>
          <div aria-live="polite" aria-atomic="true" className="mt-4">
            {rangeValid ? (
              <>
                <p className="text-2xl font-bold tracking-tight">{config.from === config.to ? `Bài ${config.from}` : `Bài ${config.from}–${config.to}`}</p>
                <p className="mt-1 text-sm text-muted-foreground">{config.to - config.from + 1} bài · {words.length.toLocaleString("vi-VN")} từ vựng</p>
                <p className="mt-4 flex items-center gap-2 border-t border-border pt-4 text-sm"><span aria-hidden="true">{exercise.emoji}</span> {exercise.label}</p>
                {config.exerciseType === "reading-quiz" && <p className="mt-2 text-xs leading-5 text-muted-foreground">{availability.wordCount.toLocaleString("vi-VN")} từ có Kanji để luyện cách đọc.</p>}
              </>
            ) : <p className="text-sm text-muted-foreground">Chọn lại khoảng bài để xem nội dung ôn tập.</p>}
          </div>
          {rangeValid && !availability.available && <p role="alert" className="mt-4 text-xs leading-5 text-destructive">{words.length === 0 ? "Không tìm thấy đủ dữ liệu cho khoảng bài này." : availability.reason}</p>}
          <button type="submit" disabled={!rangeValid || !availability.available}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40">
            Bắt đầu ôn tập <ArrowRight size={16} aria-hidden="true" />
          </button>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">Ôn toàn bộ từ phù hợp với loại bài tập trong khoảng bạn chọn.</p>
        </div>
      </form>
    </div>
  );
}
