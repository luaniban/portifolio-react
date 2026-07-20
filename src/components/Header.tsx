"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  ["Projetos", "#projetos"],
  ["Sobre", "#sobre"],
  ["Trajetória", "#trajetoria"],
  ["GitHub", "#github"],
  ["Contato", "#contato"],
] as const;

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

function ThemeToggle({
  className = "",
  theme,
  onToggle,
}: {
  className?: string;
  theme: "light" | "dark";
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className={`theme-toggle ${className}`.trim()}
      onClick={onToggle}
      aria-label={theme === "light" ? "Ativar tema escuro" : "Ativar tema claro"}
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

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

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="header-inner container">
        <a href="#inicio" className="logo logo-image" aria-label="Luan Ibanhez, início">
          <Image
            className="brand-avatar"
            src="/avatar-logo.png"
            alt=""
            width={64}
            height={64}
            priority
          />
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {links.map(([label, href]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="header-cta" href="mailto:luanibanhez.dev@gmail.com">
            <span className="header-cta-dot" aria-hidden="true" />
            Disponível para conversar
          </a>

          <ThemeToggle className="header-theme-toggle" theme={theme} onToggle={toggleTheme} />

          <button
            type="button"
            className={`menu-toggle${open ? " is-open" : ""}`}
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <nav className={`mobile-nav${open ? " is-open" : ""}`} aria-label="Navegação mobile">
        {links.map(([label, href]) => (
          <a href={href} key={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a href="mailto:luanibanhez.dev@gmail.com" onClick={() => setOpen(false)} className="mobile-nav-cta">
          luanibanhez.dev@gmail.com
        </a>
        <ThemeToggle className="mobile-nav-theme-toggle" theme={theme} onToggle={toggleTheme} />
      </nav>
    </header>
  );
}
