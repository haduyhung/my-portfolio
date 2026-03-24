"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "../../../i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale = locale === "en" ? "vi" : "en";

  function handleSwitch() {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <button
      onClick={handleSwitch}
      className="rounded-full border border-border px-2.5 py-1 text-xs font-semibold transition-colors hover:bg-secondary hover:text-foreground"
      aria-label={`Switch to ${nextLocale === "vi" ? "Vietnamese" : "English"}`}
    >
      {locale === "en" ? "VI" : "EN"}
    </button>
  );
}
