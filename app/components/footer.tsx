"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "../../i18n/navigation";
import { PERSONAL_INFO } from "../constants";

export function Footer() {
  const t = useTranslations("footer");
  const router = useRouter();
  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSecretClick = () => {
    clickCount.current += 1;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 2000);

    if (clickCount.current >= 5) {
      clickCount.current = 0;
      router.push("/secret" as any);
    }
  };

  return (
    <footer className="border-t border-border bg-card px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 text-center text-sm text-muted-foreground">
        <p>
          <span onClick={handleSecretClick} className="cursor-default select-none">&copy;</span>{" "}
          {new Date().getFullYear()} {PERSONAL_INFO.name}. {t("rights")}
        </p>
        <p>
          {t("builtWith")}{" "}
          <span className="font-medium text-foreground">Next.js</span>,{" "}
          <span className="font-medium text-foreground">Tailwind CSS</span> &{" "}
          <span className="font-medium text-foreground">Framer Motion</span>
        </p>
      </div>
    </footer>
  );
}
