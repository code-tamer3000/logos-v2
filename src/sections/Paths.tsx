import { Link } from "react-router-dom";
import { useContent } from "../content/ContentProvider";

const ARROW = (
  <svg viewBox="0 0 16 16" className="path__arrow" aria-hidden="true">
    <path
      d="M2 8h11M9 4l4 4-4 4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Маршрут и номер каждой карточки — не редактируются через админку (чтобы правка
// текста не могла случайно сломать внутреннюю ссылку), сопоставляются по индексу.
const ROUTES = [
  { num: "01", to: "/mentoring" },
  { num: "02", to: "/practices" },
  { num: "03", to: "/products" },
  { num: "04", to: "/products" },
];

type PathsContent = {
  eyebrow: string;
  title: string;
  lede: string;
  items: { title: string; lede: string; meta: string }[];
};

export function Paths() {
  const { eyebrow, title, lede, items } = useContent<PathsContent>("home.paths");

  return (
    <section className="section section--hairline">
      <div className="shell">
        <div className="sec__head">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="h2 sec__title">{title}</h2>
          </div>
          <p className="lede measure-tight">{lede}</p>
        </div>

        <div className="paths">
          {items.map((p, i) => (
            <Link
              key={ROUTES[i].num}
              to={ROUTES[i].to}
              className="path reveal"
              style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
            >
              <span className="path__num">{ROUTES[i].num}</span>
              <h3 className="path__title">{p.title}</h3>
              <p className="path__lede">{p.lede}</p>
              <div className="path__foot">
                <span className="path__meta">{p.meta}</span>
                {ARROW}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
