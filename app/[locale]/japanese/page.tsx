"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "../../../i18n/navigation";

const SECTIONS = [
  {
    href: "/japanese/hiragana",
    title: "Hiragana",
    subtitle: "ひらがな",
    description: "46 ký tự cơ bản của bảng Hiragana",
    emoji: "あ",
  },
  {
    href: "/japanese/katakana",
    title: "Katakana",
    subtitle: "カタカナ",
    description: "46 ký tự cơ bản của bảng Katakana",
    emoji: "ア",
  },
];

export default function JapanesePage() {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("jp_auth") !== "1") {
      router.replace("/secret" as any);
    }
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold">Ôn luyện tiếng Nhật</h1>
        <p className="mt-2 text-muted-foreground">Chọn bảng chữ cái để bắt đầu</p>
      </motion.div>

      <div className="flex flex-col gap-4 sm:flex-row">
        {SECTIONS.map((section, i) => (
          <motion.button
            key={section.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => router.push(section.href as any)}
            className="group flex w-64 flex-col items-center gap-3 rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:border-primary hover:shadow-md text-left"
          >
            <span className="text-5xl transition-transform group-hover:scale-110">
              {section.emoji}
            </span>
            <div className="text-center">
              <p className="font-semibold">{section.title}</p>
              <p className="text-lg text-muted-foreground">{section.subtitle}</p>
              <p className="mt-1 text-xs text-muted-foreground">{section.description}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        onClick={() => {
          sessionStorage.removeItem("jp_auth");
          router.push("/" as any);
        }}
        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        Đăng xuất
      </motion.button>
    </div>
  );
}
