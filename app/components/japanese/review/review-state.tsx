"use client";

import { LoaderCircle, RotateCcw } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function ReviewLoading() {
  return (
    <div role="status" className="flex min-h-[calc(100dvh-3.5rem)] items-center justify-center gap-3 p-6 text-sm text-muted-foreground">
      <LoaderCircle size={20} className="animate-spin" aria-hidden="true" />
      Đang tải từ vựng...
    </div>
  );
}

export function ReviewError({ message, onRetry, backHref = "/japanese/review" }: {
  message: string;
  onRetry?: () => void;
  backHref?: string;
}) {
  return (
    <div className="flex min-h-[calc(100dvh-3.5rem)] flex-col items-center justify-center gap-4 p-6 text-center">
      <p role="alert" className="max-w-md text-sm text-muted-foreground">{message}</p>
      {onRetry ? (
        <button onClick={onRetry} className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          <RotateCcw size={16} aria-hidden="true" /> Thử lại
        </button>
      ) : (
        <Link href={backHref} className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          Về cài đặt
        </Link>
      )}
    </div>
  );
}
