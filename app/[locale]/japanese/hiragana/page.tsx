"use client";

import { useEffect } from "react";
import { useRouter } from "../../../../i18n/navigation";
import { KanaQuiz } from "../../../components/japanese/kana-quiz";
import { HIRAGANA } from "../../../constants/japanese";

export default function HiraganaPage() {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("jp_auth") !== "1") {
      router.replace("/secret" as any);
    }
  }, [router]);

  return <KanaQuiz kana={HIRAGANA} title="Luyện Hiragana · ひらがな" />;
}
