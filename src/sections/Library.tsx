import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { library } from "../data/home";

export function Library() {
  return (
    <section className="section section--hairline">
      <div className="shell">
        <div className="sec__head">
          <div>
            <p className="eyebrow">Библиотека знаний</p>
            <h2 className="h2 sec__title">Начать можно бесплатно</h2>
          </div>
          <p className="lede measure-tight">
            Статьи, практики, подкасты и видео — растущее хранилище. Часть открыта всем, часть
            прикреплена к продуктам и появляется в личном кабинете после покупки.
          </p>
        </div>

        <div className="lib">
          {library.map((item, i) => (
            <Link
              key={item.title}
              to={item.to}
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
            Вся библиотека
          </Button>
        </div>
      </div>
    </section>
  );
}
