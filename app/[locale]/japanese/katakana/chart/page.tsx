"use client";

import { useEffect } from "react";
import { useRouter } from "../../../../../i18n/navigation";

export default function KatakanaChartPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/japanese/katakana" as any);
  }, [router]);

  return null;
}
