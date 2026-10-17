import { Link } from "react-router-dom";
import { useContent } from "../content/ContentProvider";

// Маршрут каждой карточки не редактируется через админку, сопоставляется по индексу.
const ROUTES = ["/practices", "/practices", "/practices"];

type ShopContent = {
  eyebrow: string;
  title: string;
  lede: string;
  linkLabel: string;
  items: { title: string; lede: string; price: string; status: string }[];
};

export function Shop() {
  const { eyebrow, title, lede, linkLabel, items } = useContent<ShopContent>("home.shop");

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

        <div className="shop">
          {items.map((p, i) => (
            <article
              key={p.title}
              className="card reveal"
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
            >
              <span className="shopCard__status">{p.status}</span>
              <h3 className="shopCard__title">{p.title}</h3>
              <p className="shopCard__lede">{p.lede}</p>
              <div className="shopCard__foot">
                <span className="shopCard__price">{p.price}</span>
                <Link to={ROUTES[i]} className="shopCard__link">
                  {linkLabel}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
