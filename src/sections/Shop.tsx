import { Link } from "react-router-dom";
import { products } from "../data/home";

export function Shop() {
  return (
    <section className="section section--hairline">
      <div className="shell">
        <div className="sec__head">
          <div>
            <p className="eyebrow">Магазин</p>
            <h2 className="h2 sec__title">Продукты и форматы</h2>
          </div>
          <p className="lede measure-tight">
            Цифровые продукты открываются сразу после оплаты. Индивидуальная работа — только после
            разговора: сначала понимаем, подходим ли друг другу.
          </p>
        </div>

        <div className="shop">
          {products.map((p, i) => (
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
                <Link to={p.to} className="shopCard__link">
                  Подробнее
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
