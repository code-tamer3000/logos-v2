import { useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { Button } from "../components/Button";
import { MavePlayer } from "../components/MavePlayer";
import { MAVE_PODCAST, PODCAST, PLATFORMS, episodes } from "../data/podcasts";
import "./Podcasts.css";

const STEP = 8;

export default function Podcasts() {
  useReveal([]);
  const [shown, setShown] = useState(STEP);
  const [latest, ...rest] = episodes;
  const visible = rest.slice(0, shown);

  return (
    <>
      <section className="pageHead">
        <div className="pageHead__glow" aria-hidden="true" />
        <div className="shell pageHead__inner">
          <p className="eyebrow eyebrow--plain">Подкаст</p>
          <h1 className="display pageHead__title">
            О духовном
            <br />
            <span className="italic-serif accent">субъективно</span>
          </h1>
          <p className="lede measure pageHead__lede">{PODCAST.description}</p>
          <p className="pageHead__count">
            {episodes.length} выпуск{episodes.length % 10 === 1 ? "" : "ов"} · слушать здесь или на
            любой платформе
          </p>
        </div>
      </section>

      {/* ── Свежий выпуск ──────────────────────────────────── */}
      <section className="section">
        <div className="shell">
          <div className="latest reveal">
            <div className="latest__head">
              <span className="latest__badge">Свежий выпуск</span>
              <h2 className="h3 latest__title">{latest.title}</h2>
              <p className="latest__meta">
                Выпуск {latest.episode} · {latest.date} · {latest.duration}
              </p>
              <p className="lede latest__note">{latest.note}</p>
            </div>
            <MavePlayer
              podcast={MAVE_PODCAST}
              episode={latest.episode}
              title={latest.title}
              meta={`${latest.date} · ${latest.duration}`}
              eager
            />
          </div>
        </div>
      </section>

      {/* ── Архив ──────────────────────────────────────────── */}
      <section className="section section--hairline">
        <div className="shell">
          <div className="sec__head sec__head--stack">
            <div>
              <p className="eyebrow">Архив</p>
              <h2 className="h2 sec__title">Все выпуски</h2>
            </div>
          </div>

          <ul className="epList">
            {visible.map((ep, i) => (
              <li
                key={ep.episode}
                className="reveal"
                style={{ "--reveal-delay": `${Math.min(i, 6) * 70}ms` } as React.CSSProperties}
              >
                <MavePlayer
                  podcast={MAVE_PODCAST}
                  episode={ep.episode}
                  title={ep.title}
                  meta={`Выпуск ${ep.episode} · ${ep.date} · ${ep.duration}`}
                />
              </li>
            ))}
          </ul>

          {shown < rest.length && (
            <div style={{ marginTop: "2.5rem" }}>
              <Button variant="ghost" onClick={() => setShown((v) => v + STEP)}>
                Показать ещё ({rest.length - shown})
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ── Платформы ──────────────────────────────────────── */}
      <section className="section section--hairline">
        <div className="shell">
          <div className="sec__head">
            <div>
              <p className="eyebrow">Слушать</p>
              <h2 className="h2 sec__title">Где удобно</h2>
            </div>
            <p className="lede measure-tight">
              Подкаст расходится по всем площадкам. Подпишитесь там, где слушаете обычно — новые
              выпуски придут сами.
            </p>
          </div>

          <div className="platforms">
            {PLATFORMS.map((p, i) => (
              <a
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="card platform reveal"
                style={{ "--reveal-delay": `${Math.min(i, 6) * 70}ms` } as React.CSSProperties}
              >
                <span className="platform__label">{p.label}</span>
                <svg viewBox="0 0 16 16" className="platform__arrow" aria-hidden="true">
                  <path
                    d="M4 12L12 4M12 4H5.5M12 4v6.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ))}
          </div>

          <div style={{ marginTop: "3rem" }}>
            <Button to="/contact" variant="quiet">
              Предложить тему выпуска
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
