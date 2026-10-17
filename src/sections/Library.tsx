import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { useContent } from "../content/ContentProvider";

// Маршрут каждой карточки не редактируется через админку, сопоставляется по индексу.
const ROUTES = ["/blog", "/library", "/podcasts", "/library"];

type LibraryContent = {
  eyebrow: string;
  title: string;
  lede: string;
  ctaLabel: string;
  items: { kind: string; title: string; meta: string }[];
};

export function Library() {
  const { eyebrow, title, lede, ctaLabel, items } = useContent<LibraryContent>("home.library");

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

        <div className="lib">
          {items.map((item, i) => (
            <Link
              key={item.title}
              to={ROUTES[i]}
              className="card libCard reveal"
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
            >
              <span className="libCard__kind">{item.kind}</span>
              <h3 className="libCard__title">{item.title}</h3>
              <span className="libCard__meta">{item.meta}</span>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: "3rem" }}>
          <Button to="/library" variant="quiet">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
