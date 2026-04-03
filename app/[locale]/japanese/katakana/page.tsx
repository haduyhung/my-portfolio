"use client";

import { useEffect } from "react";
import { useRouter } from "../../../../i18n/navigation";
import { KanaQuiz } from "../../../components/japanese/kana-quiz";
import { KATAKANA } from "../../../constants/japanese";

export default function KatakanaPage() {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("jp_auth") !== "1") {
      router.replace("/secret" as any);
    }
  }, [router]);

  return <KanaQuiz kana={KATAKANA} title="Luyện Katakana · カタカナ" />;
}
