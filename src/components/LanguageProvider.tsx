"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "pt" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        if (localStorage.getItem("language") === "en") setLanguageState("en");
      } catch {}
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    document.documentElement.lang = nextLanguage === "en" ? "en" : "pt-BR";
    document.documentElement.setAttribute("data-language", nextLanguage);

    try {
      localStorage.setItem("language", nextLanguage);
    } catch {}
  };

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) throw new Error("useLanguage must be used within LanguageProvider");

  return context;
}
