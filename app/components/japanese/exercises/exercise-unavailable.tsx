import type { ExerciseProps } from "./exercise-props";

export function ExerciseUnavailable({ onExit, exitLabel = "Về bài học", reason }: Pick<ExerciseProps, "onExit" | "exitLabel"> & { reason?: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="font-medium">Chưa đủ dữ liệu để luyện tập</p>
      <p className="max-w-md text-sm text-muted-foreground">{reason ?? "Hãy chọn thêm bài hoặc đổi loại bài tập."}</p>
      <button onClick={onExit} className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
        {exitLabel}
      </button>
    </div>
  );
}
