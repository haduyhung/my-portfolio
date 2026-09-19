"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { loadMinnaDataset, type MinnaDataset } from "@/app/constants/minna";

type DatasetState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; dataset: MinnaDataset | null };

export function useReviewDataset(loadDataset = true) {
  const router = useRouter();
  const [state, setState] = useState<DatasetState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    void Promise.resolve().then(async () => {
      if (!active) return;
      if (localStorage.getItem("jp_auth") !== "1") {
        router.replace("/secret");
        return;
      }
      const dataset = loadDataset ? await loadMinnaDataset() : null;
      if (active) setState({ status: "ready", dataset });
    }).catch(() => {
      if (active) setState({ status: "error" });
    });
    return () => { active = false; };
  }, [router, attempt, loadDataset]);

  function retry() {
    setState({ status: "loading" });
    setAttempt((value) => value + 1);
  }

  return { state, retry };
}
