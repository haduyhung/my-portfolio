"use client";

import { useMemo } from "react";
import { useLocale } from "next-intl";
import { getReviewSettingsHref, getReviewWords, type ReviewConfig } from "@/app/constants/japanese-review";
import { ExercisePlayer } from "../exercises/exercise-player";
import { useReviewDataset } from "./use-review-dataset";
import { ReviewError, ReviewLoading } from "./review-state";

export function ReviewSession({ config }: { config: ReviewConfig | null }) {
  const locale = useLocale();
  const lang = locale === "vi" ? "vi" : locale === "fr" ? "fr" : "en";
  const { state, retry } = useReviewDataset(config !== null);
  const words = useMemo(
    () => state.status === "ready" && state.dataset && config ? getReviewWords(state.dataset, config) : [],
    [state, config],
  );

  if (state.status === "loading") return <ReviewLoading />;
  if (state.status === "error") return <ReviewError message="Không tải được từ vựng. Bạn hãy thử lại." onRetry={retry} />;
  if (!config) return <ReviewError message="Cấu hình ôn tập không hợp lệ. Hãy chọn khoảng bài từ 1 đến 50 và một loại bài tập." />;
  const backHref = getReviewSettingsHref(config);
  if (words.length === 0) return <ReviewError message="Không tìm thấy đủ dữ liệu cho khoảng bài này. Hãy chọn lại khoảng bài." backHref={backHref} />;

  return <ExercisePlayer key={`${config.from}-${config.to}-${config.exerciseType}-${lang}`}
    words={words} lang={lang} exerciseType={config.exerciseType} backHref={backHref} backLabel="Về cài đặt" />;
}
