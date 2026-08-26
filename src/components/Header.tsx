import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Header.css";

/** По ТЗ: логотип по центру, разделы по бокам, без контактов. */
const LEFT = [
  { to: "/about", label: "Обо мне" },
  { to: "/mentoring", label: "Наставничество" },
  { to: "/practices", label: "Практики" },
];

const RIGHT = [
  { to: "/library", label: "Библиотека" },
  { to: "/blog", label: "Блог" },
  { to: "/podcasts", label: "Подкасты" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`hdr${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="hdr__inner">
        <nav className="hdr__nav hdr__nav--left" aria-label="Основная навигация">
          {LEFT.map((i) => (
            <NavLink key={i.to} to={i.to} className="hdr__link">
              {i.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/" className="hdr__mark" aria-label="Логос — на главную">
          <svg viewBox="0 0 40 40" className="hdr__glyph" aria-hidden="true">
            <circle cx="20" cy="20" r="13" fill="none" stroke="currentColor" strokeWidth="0.9" />
            <circle cx="20" cy="20" r="4.6" fill="none" stroke="currentColor" strokeWidth="0.9" />
            <circle cx="20" cy="20" r="1.6" fill="currentColor" />
          </svg>
          <span className="hdr__word">Логос</span>
        </Link>

        <nav className="hdr__nav hdr__nav--right" aria-label="Дополнительная навигация">
          {RIGHT.map((i) => (
            <NavLink key={i.to} to={i.to} className="hdr__link">
              {i.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="hdr__burger"
          aria-expanded={open}
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className="hdr__sheet" hidden={!open}>
        <nav className="hdr__sheetNav">
          {[...LEFT, ...RIGHT].map((i) => (
            <NavLink key={i.to} to={i.to} className="hdr__sheetLink">
              {i.label}
            </NavLink>
          ))}
          <NavLink to="/contact" className="hdr__sheetLink">
            Контакты
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
