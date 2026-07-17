"use client";

import { useEffect, useState } from "react";

const links = [
  ["Projetos", "#projetos"],
  ["Sobre", "#sobre"],
  ["Trajetória", "#trajetoria"],
  ["Contato", "#contato"],
] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="header-inner container">
        <a href="#inicio" className="logo" aria-label="Luan Ibanhez — início">
          <span className="logo-mark" aria-hidden="true" />
          luan<span className="logo-accent">.ibanhez</span>
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {links.map(([label, href]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="mailto:luanibanhez.dev@gmail.com">
          <span className="header-cta-dot" aria-hidden="true" />
          Disponível — vamos conversar
        </a>

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

      <nav className={`mobile-nav${open ? " is-open" : ""}`} aria-label="Navegação mobile">
        {links.map(([label, href]) => (
          <a href={href} key={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a href="mailto:luanibanhez.dev@gmail.com" onClick={() => setOpen(false)} className="mobile-nav-cta">
          luanibanhez.dev@gmail.com
        </a>
      </nav>
    </header>
  );
}
