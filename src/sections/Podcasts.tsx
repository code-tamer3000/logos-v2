import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { MavePlayer } from "../components/MavePlayer";
import { MAVE_PODCAST, episodes } from "../data/podcasts";

export function Podcasts() {
  const [latest, ...rest] = episodes;

  return (
    <section className="section section--hairline">
      <div className="shell">
        <div className="sec__head">
          <div>
            <p className="eyebrow">Подкаст</p>
            <h2 className="h2 sec__title">О духовном субъективно</h2>
          </div>
          <p className="lede measure-tight">
            Исследование мировых духовных традиций: ментальное здоровье, развитие психических
            возможностей и духовно-нравственный рост. Уже {episodes.length} выпуск
            {episodes.length % 10 === 1 ? "" : "ов"}.
          </p>
        </div>

        <div className="reveal" style={{ marginBottom: "1rem" }}>
          <MavePlayer
            podcast={MAVE_PODCAST}
            episode={latest.episode}
            title={latest.title}
            meta={`Свежий выпуск · ${latest.date} · ${latest.duration}`}
          />
        </div>

        <div className="pods">
          {rest.slice(0, 3).map((p, i) => (
            <Link
              key={p.episode}
              to="/podcasts"
              className="pod reveal"
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
            >
              <span className="pod__num">{String(p.episode).padStart(2, "0")}</span>
              <div>
                <h3 className="pod__title">{p.title}</h3>
                <span className="pod__meta">
                  {p.date} · {p.duration}
                </span>
              </div>
              <span className="pod__play" aria-hidden="true">
                <svg viewBox="0 0 12 14" width="11" height="13">
                  <path d="M1 1l10 6-10 6z" fill="currentColor" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: "3rem", display: "flex", gap: "1.75rem", flexWrap: "wrap" }}>
          <Button to="/podcasts" variant="quiet">
            Все выпуски
          </Button>
          <Button href="https://k-logos.mave.digital/" variant="quiet">
            Страница подкаста
          </Button>
        </div>
      </div>
    </section>
  );
}
