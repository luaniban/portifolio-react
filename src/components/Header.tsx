"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

function SunIcon() {
  return (
    <svg aria-hidden="true" className="icon" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2.5v2.6M12 18.9v2.6M4.2 4.2l1.85 1.85M17.95 17.95l1.85 1.85M2.5 12h2.6M18.9 12h2.6M4.2 19.8l1.85-1.85M17.95 6.05l1.85-1.85"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" className="icon" viewBox="0 0 24 24" fill="none">
      <path
        d="M20.5 14.6A8.6 8.6 0 1 1 9.4 3.5a7 7 0 0 0 11.1 11.1Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BrazilFlag() {
  return (
    <svg aria-hidden="true" className="flag-icon" viewBox="0 0 28 20">
      <rect width="28" height="20" rx="2.5" fill="#229e45" />
      <path d="m14 2.4 10.6 7.6L14 17.6 3.4 10 14 2.4Z" fill="#ffdf00" />
      <circle cx="14" cy="10" r="4.25" fill="#1f4e9b" />
      <path d="M10.2 8.9c2.35-1.18 5.44-1.08 7.66.28" fill="none" stroke="#fff" strokeWidth="0.62" />
    </svg>
  );
}

function UnitedStatesFlag() {
  return (
    <svg aria-hidden="true" className="flag-icon" viewBox="0 0 28 20">
      <rect width="28" height="20" rx="2.5" fill="#fff" />
      <path d="M0 0h28v2.15H0zm0 4.3h28v2.15H0zm0 4.3h28v2.15H0zm0 4.3h28v2.15H0z" fill="#c8373f" />
      <path d="M0 0h12v10.8H0z" fill="#204d8f" />
      <path d="m2.1 2.05.38 1.15 1.2.01-.97.7.36 1.14-.96-.71-.97.71.37-1.14-.98-.7 1.2-.01.37-1.15Zm4.1 2.8.38 1.15 1.2.01-.97.7.36 1.14-.97-.71-.97.71.37-1.14-.98-.7 1.2-.01.38-1.15Z" fill="#fff" />
    </svg>
  );
}

function ThemeToggle({
  className = "",
  theme,
  onToggle,
  language,
}: {
  className?: string;
  theme: "light" | "dark";
  onToggle: () => void;
  language: "pt" | "en";
}) {
  const label = language === "en"
    ? theme === "light" ? "Enable dark mode" : "Enable light mode"
    : theme === "light" ? "Ativar tema escuro" : "Ativar tema claro";

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`.trim()}
      onClick={onToggle}
      aria-label={label}
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

function LanguageSwitcher({
  className = "",
  language,
  onChange,
}: {
  className?: string;
  language: "pt" | "en";
  onChange: (language: "pt" | "en") => void;
}) {
  const [open, setOpen] = useState(false);
  const currentLanguage = language === "pt" ? "Português" : "English";
  const copy = language === "en"
    ? { current: "Current language", select: "Select language" }
    : { current: "Idioma atual", select: "Selecionar idioma" };

  function selectLanguage(nextLanguage: "pt" | "en") {
    onChange(nextLanguage);
    setOpen(false);
  }

  return (
    <div className={`language-switcher ${className}`.trim()}>
      <button
        type="button"
        className="language-toggle"
        aria-label={`${copy.current}: ${currentLanguage}`}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        {language === "pt" ? <BrazilFlag /> : <UnitedStatesFlag />}
      </button>

      {open && (
        <div className="language-menu" role="menu" aria-label={copy.select}>
          <button type="button" role="menuitemradio" aria-checked={language === "pt"} onClick={() => selectLanguage("pt")}>
            <BrazilFlag /> <span>Português</span>
          </button>
          <button type="button" role="menuitemradio" aria-checked={language === "en"} onClick={() => selectLanguage("en")}>
            <UnitedStatesFlag /> <span>English</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const { language, setLanguage } = useLanguage();
  const copy = language === "en"
    ? {
        links: [["Projects", "#projetos"], ["About", "#sobre"], ["Journey", "#trajetoria"], ["GitHub", "#github"], ["Posts", "/posts"], ["Contact", "#contato"]] as const,
        navigation: "Main navigation",
        available: "Available to talk",
        home: "Luan Ibanhez, home",
        openMenu: "Open menu",
        closeMenu: "Close menu",
        languageMenu: "Select language",
      }
    : {
        links: [["Projetos", "#projetos"], ["Sobre", "#sobre"], ["Trajetória", "#trajetoria"], ["GitHub", "#github"], ["Posts", "/posts"], ["Contato", "#contato"]] as const,
        navigation: "Navegação principal",
        available: "Disponível para conversar",
        home: "Luan Ibanhez, início",
        openMenu: "Abrir menu",
        closeMenu: "Fechar menu",
        languageMenu: "Selecionar idioma",
      };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // O tema é aplicado pelo script de layout antes da pintura. Atualizamos o
    // ícone no próximo ciclo para manter a hidratação consistente.
    const timer = window.setTimeout(() => {
      const current = document.documentElement.getAttribute("data-theme");
      setTheme(current === "light" ? "light" : "dark");
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  function navigationHref(href: string) {
    if (href.startsWith("#") && pathname !== "/") return `/${href}`;
    return href;
  }

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="header-inner container">
        <a href={pathname === "/" ? "#inicio" : "/"} className="logo logo-image" aria-label={copy.home}>
          <Image
            className="brand-avatar"
            src="/avatar-logo.png"
            alt=""
            width={64}
            height={64}
            priority
          />
        </a>

        <nav className="desktop-nav" aria-label={copy.navigation}>
          {copy.links.map(([label, href]) => (
            <a href={navigationHref(href)} key={href}>
              {label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="header-cta" href="mailto:luanibanhez.dev@gmail.com">
            <span className="header-cta-dot" aria-hidden="true" />
            {copy.available}
          </a>

          <ThemeToggle className="header-theme-toggle" theme={theme} onToggle={toggleTheme} language={language} />
          <LanguageSwitcher className="header-language-switcher" language={language} onChange={setLanguage} />

          <button
            type="button"
            className={`menu-toggle${open ? " is-open" : ""}`}
            aria-expanded={open}
            aria-label={open ? copy.closeMenu : copy.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <nav className={`mobile-nav${open ? " is-open" : ""}`} aria-label={copy.navigation}>
        {copy.links.map(([label, href]) => (
          <a href={navigationHref(href)} key={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a href="mailto:luanibanhez.dev@gmail.com" onClick={() => setOpen(false)} className="mobile-nav-cta">
          luanibanhez.dev@gmail.com
        </a>
        <ThemeToggle className="mobile-nav-theme-toggle" theme={theme} onToggle={toggleTheme} language={language} />
        <LanguageSwitcher className="mobile-language-switcher" language={language} onChange={setLanguage} />
      </nav>
    </header>
  );
}
