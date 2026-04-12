"use client";

import { Menu } from "lucide-react";
import { usePathname } from "../../../i18n/navigation";
import { ThemeToggle } from "../ui/theme-toggle";

function getPageInfo(pathname: string): { title: string; subtitle?: string } {
  const minnaExMatch = pathname.match(/\/minna\/(\d+)\/([^/]+)$/);
  if (minnaExMatch) {
    const typeMap: Record<string, string> = {
      "flashcard": "Flashcard",
      "meaning-quiz": "Quiz nghĩa",
      "reading-quiz": "Quiz đọc",
      "typing-quiz": "Quiz gõ",
      "matching": "Nối từ",
    };
    return { title: `Bài ${minnaExMatch[1]}`, subtitle: typeMap[minnaExMatch[2]] ?? minnaExMatch[2] };
  }
  const minnaLessonMatch = pathname.match(/\/minna\/(\d+)$/);
  if (minnaLessonMatch) return { title: `Bài ${minnaLessonMatch[1]}`, subtitle: "Minna no Nihongo" };
  if (pathname.includes("/minna")) return { title: "Minna no Nihongo", subtitle: "みんなの日本語" };
  if (pathname.includes("/hiragana")) return { title: "Hiragana", subtitle: "ひらがな" };
  if (pathname.includes("/katakana")) return { title: "Katakana", subtitle: "カタカナ" };
  return { title: "Tiếng Nhật", subtitle: "日本語" };
}

interface JapaneseHeaderProps {
  onMenuToggle: () => void;
}

export function JapaneseHeader({ onMenuToggle }: JapaneseHeaderProps) {
  const pathname = usePathname();
  const { title, subtitle } = getPageInfo(pathname);

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-card/80 backdrop-blur-sm px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-secondary md:hidden"
          aria-label="Mở menu"
        >
          <Menu size={18} />
        </button>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold">{title}</span>
          {subtitle && (
            <span className="text-xs text-muted-foreground">{subtitle}</span>
          )}
        </div>
      </div>
      <ThemeToggle />
    </header>
  );
}
