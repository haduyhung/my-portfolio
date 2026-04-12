"use client";

import { useEffect } from "react";
import { useRouter } from "../../../../../i18n/navigation";

export default function HiraganaChartPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/japanese/hiragana" as any);
  }, [router]);

  return null;
}
