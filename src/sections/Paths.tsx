import { Link } from "react-router-dom";
import { paths } from "../data/home";

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

export function Paths() {
  return (
    <section className="section section--hairline">
      <div className="shell">
        <div className="sec__head">
          <div>
            <p className="eyebrow">Чем я могу помочь</p>
            <h2 className="h2 sec__title">Три двери в одну работу</h2>
          </div>
          <p className="lede measure-tight">
            Разные форматы, но общая основа: вернуть себе управление вниманием и построить на нём
            всё остальное.
          </p>
        </div>

        <div className="paths">
          {paths.map((p, i) => (
            <Link
              key={p.num}
              to={p.to}
              className="path reveal"
              style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
            >
              <span className="path__num">{p.num}</span>
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
