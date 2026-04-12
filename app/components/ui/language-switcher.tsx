"use client";

import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "../../../i18n/navigation";

const LOCALES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(code: string) {
    if (code !== locale) {
      router.replace(pathname, { locale: code });
    }
    setIsOpen(false);
  }

  const current = LOCALES.find((l) => l.code === locale);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs font-semibold transition-colors hover:bg-secondary hover:text-foreground"
        aria-label="Switch language"
        aria-expanded={isOpen}
      >
        <Globe size={14} />
        {current?.code.toUpperCase()}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 min-w-35 overflow-hidden rounded-lg border border-border bg-background shadow-lg">
          {LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => handleSelect(l.code)}
              className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-secondary ${
                l.code === locale
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
