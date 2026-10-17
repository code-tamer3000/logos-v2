import { Link } from "react-router-dom";
import { useContent } from "../content/ContentProvider";
import "./Footer.css";

type FooterContent = {
  claim: string;
  authorName: string;
  contactLabel: string;
  columns: { title: string; links: { to: string; label: string }[] }[];
  social: { href: string; label: string }[];
};

export function Footer() {
  const { claim, authorName, contactLabel, columns: COLUMNS, social: SOCIAL } =
    useContent<FooterContent>("footer");

  return (
    <footer className="ftr">
      <div className="ftr__horizon" aria-hidden="true" />

      <div className="shell ftr__inner">
        <div className="ftr__brand">
          <Link to="/" className="ftr__mark">
            <svg viewBox="0 0 40 40" className="ftr__glyph" aria-hidden="true">
              <circle cx="20" cy="20" r="13" fill="none" stroke="currentColor" strokeWidth="0.9" />
              <circle cx="20" cy="20" r="4.6" fill="none" stroke="currentColor" strokeWidth="0.9" />
              <circle cx="20" cy="20" r="1.6" fill="currentColor" />
            </svg>
            <span className="ftr__word">Логос</span>
          </Link>
          <p className="ftr__claim italic-serif">{claim}</p>
          <ul className="ftr__social">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="ftr__cols">
          {COLUMNS.map((col) => (
            <nav key={col.title} className="ftr__col" aria-label={col.title}>
              <h4 className="ftr__colTitle">{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="shell ftr__base">
        <span>
          © {new Date().getFullYear()} {authorName}
        </span>
        <Link to="/contact" className="ftr__contact">
          {contactLabel}
        </Link>
      </div>
    </footer>
  );
}
