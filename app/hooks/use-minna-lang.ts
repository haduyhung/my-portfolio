"use client";

import { useState, useEffect } from "react";

export type MinnaLang = "en" | "fr" | "vi";

export function useMinnaLang(): [MinnaLang, (l: MinnaLang) => void] {
  const [lang, setLang] = useState<MinnaLang>("vi");

  useEffect(() => {
    const stored = localStorage.getItem("minna_lang") as MinnaLang | null;
    if (stored === "en" || stored === "fr" || stored === "vi") {
      setLang(stored);
    }
  }, []);

  const changeLang = (l: MinnaLang) => {
    localStorage.setItem("minna_lang", l);
    setLang(l);
  };

  return [lang, changeLang];
}
