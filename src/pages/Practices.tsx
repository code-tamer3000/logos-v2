import { useReveal } from "../hooks/useReveal";
import { Button } from "../components/Button";
import { Placeholder } from "../components/Placeholder";
import { Faq } from "../components/Faq";
import { useContent } from "../content/ContentProvider";
import { RichText } from "../content/RichText";
import { ImageSlot } from "../content/ImageSlot";
import "./Practices.css";

type PracticesContent = {
  hero: {
    eyebrow: string;
    title: string;
    lede: string;
    ctaPrimaryLabel: string;
    ctaSecondaryLabel: string;
  };
  groupPhotoImage?: string;
  groupPhotoNote: string;
  problem: { eyebrow: string; title: string; intro: string; symptoms: string[] };
  insight: { eyebrow: string; title: string; body: string };
  quote: { text: string };
  solution: { eyebrow: string; title: string; body: string };
  resultsEyebrow: string;
  resultsTitle: string;
  audience: { eyebrow: string; title: string; intro: string; items: { who: string; why: string }[] };
  program: { eyebrow: string; title: string; weeks: { n: string; title: string; note: string }[] };
  formats: {
    eyebrow: string;
    title: string;
    intro: string;
    ctaLabel: string;
    items: {
      status: string;
      title: string;
      lede: string;
      tiers: { name: string; price: string }[];
    }[];
  };
  author: {
    photoImage?: string;
    photoNote: string;
    eyebrow: string;
    title: string;
    creds: { title: string; note: string }[];
    quote: string;
  };
  faqEyebrow: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  finalCta: { title: string; lede: string; ctaPrimaryLabel: string; ctaSecondaryLabel: string };
};

export default function Practices() {
  useReveal();
  const {
    hero,
    groupPhotoImage,
    groupPhotoNote,
    problem,
    insight,
    quote,
    solution,
    resultsEyebrow,
    resultsTitle,
    audience,
    program,
    formats,
    author,
    faqEyebrow,
    faqTitle,
    faq,
    finalCta,
  } = useContent<PracticesContent>("page.practices");
  const { items: effects } = useContent<{ items: string[] }>("shared.effects");

  return (
    <>
      {/* ── Оффер ──────────────────────────────────────────── */}
      <section className="pageHead">
        <div className="pageHead__glow" aria-hidden="true" />
        <div className="shell pageHead__inner">
          <p className="eyebrow eyebrow--plain">{hero.eyebrow}</p>
          <h1 className="display pageHead__title">
            <RichText text={hero.title} />
          </h1>
          <p className="lede measure pageHead__lede">{hero.lede}</p>
          <div className="hero__cta" style={{ animation: "none", marginTop: "2.5rem" }}>
            <Button to="/contact">{hero.ctaPrimaryLabel}</Button>
            <Button to="/practices/free" variant="ghost">
              {hero.ctaSecondaryLabel}
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell reveal">
          <ImageSlot
            src={groupPhotoImage}
            alt="Групповое живое занятие"
            fallback={<Placeholder label="Групповое живое занятие" note={groupPhotoNote} ratio="21 / 9" />}
          />
        </div>
      </section>

      {/* ── Проблема ───────────────────────────────────────── */}
      <section className="section section--hairline">
        <div className="shell">
          <div className="sec__head">
            <div>
              <p className="eyebrow">{problem.eyebrow}</p>
              <h2 className="h2 sec__title">
                <RichText text={problem.title} />
              </h2>
            </div>
            <p className="lede measure-tight">{problem.intro}</p>
          </div>

          <ul className="symptoms">
            {problem.symptoms.map((s, i) => (
              <li
                key={s}
                className="reveal"
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              >
                <span className="symptoms__mark" aria-hidden="true">
                  ✳
                </span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Почему так ─────────────────────────────────────── */}
      <section className="section section--hairline">
        <div className="shell insight">
          <div className="reveal">
            <p className="eyebrow">{insight.eyebrow}</p>
            <h2 className="h2 sec__title">{insight.title}</h2>
          </div>
          <div className="reveal" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <RichText text={insight.body} paragraphClassName="lede" />
          </div>
        </div>
      </section>

      {/* ── Цитата ─────────────────────────────────────────── */}
      <section className="section quote">
        <div className="quote__glow" aria-hidden="true" />
        <div className="shell">
          <blockquote className="reveal">
            <p className="quote__text italic-serif">
              <RichText text={quote.text} />
            </p>
          </blockquote>
        </div>
      </section>

      {/* ── Решение ────────────────────────────────────────── */}
      <section className="section section--hairline">
        <div className="shell insight">
          <div className="reveal">
            <p className="eyebrow">{solution.eyebrow}</p>
            <h2 className="h2 sec__title">{solution.title}</h2>
          </div>
          <div className="reveal" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <RichText text={solution.body} paragraphClassName="lede" />
          </div>
        </div>
      </section>

      {/* ── Эффекты ────────────────────────────────────────── */}
      <section className="section section--hairline">
        <div className="shell">
          <div className="sec__head sec__head--stack">
            <div>
              <p className="eyebrow">{resultsEyebrow}</p>
              <h2 className="h2 sec__title">{resultsTitle}</h2>
            </div>
          </div>
          <ul className="attn__effects" style={{ marginTop: 0 }}>
            {effects.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Кому подходит ──────────────────────────────────── */}
      <section className="section section--hairline">
        <div className="shell">
          <div className="sec__head">
            <div>
              <p className="eyebrow">{audience.eyebrow}</p>
              <h2 className="h2 sec__title">{audience.title}</h2>
            </div>
            <p className="lede measure-tight">{audience.intro}</p>
          </div>
          <div className="shop">
            {audience.items.map((a, i) => (
              <article
                key={a.who}
                className="card reveal"
                style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              >
                <h3 className="shopCard__title" style={{ marginTop: 0, fontSize: "1.4rem" }}>
                  {a.who}
                </h3>
                <p className="shopCard__lede">{a.why}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Программа ──────────────────────────────────────── */}
      <section className="section section--hairline">
        <div className="shell">
          <div className="sec__head">
            <div>
              <p className="eyebrow">{program.eyebrow}</p>
              <h2 className="h2 sec__title">
                <RichText text={program.title} />
              </h2>
            </div>
          </div>
          <ol className="weeks">
            {program.weeks.map((w, i) => (
              <li
                key={w.n}
                className="week reveal"
                style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
              >
                <span className="week__n">Неделя {w.n}</span>
                <h3 className="week__title">{w.title}</h3>
                <p className="week__note">{w.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Форматы и цены ─────────────────────────────────── */}
      <section className="section section--hairline">
        <div className="shell">
          <div className="sec__head">
            <div>
              <p className="eyebrow">{formats.eyebrow}</p>
              <h2 className="h2 sec__title">{formats.title}</h2>
            </div>
            <p className="lede measure-tight">{formats.intro}</p>
          </div>

          <div className="formats">
            {formats.items.map((f, i) => (
              <article
                key={f.title}
                className="card reveal"
                style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
              >
                <span className="shopCard__status">{f.status}</span>
                <h3 className="shopCard__title">{f.title}</h3>
                <p className="shopCard__lede">{f.lede}</p>
                <ul className="tiers">
                  {f.tiers.map((t) => (
                    <li key={t.name}>
                      <span>{t.name}</span>
                      <span className="tiers__price">{t.price}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: "2rem" }}>
                  <Button to="/contact" variant="ghost">
                    {formats.ctaLabel}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Автор ──────────────────────────────────────────── */}
      <section className="section section--hairline">
        <div className="shell about__grid">
          <div className="reveal">
            <ImageSlot
              src={author.photoImage}
              alt="Фото ведущего"
              fallback={<Placeholder label="Фото ведущего" note={author.photoNote} ratio="4 / 5" />}
            />
          </div>
          <div className="reveal" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <p className="eyebrow">{author.eyebrow}</p>
            <h2 className="h2 sec__title">{author.title}</h2>
            <ul className="about__creds">
              {author.creds.map((c) => (
                <li key={c.title}>
                  <strong>{c.title}</strong>
                  {c.note}
                </li>
              ))}
            </ul>
            <p className="lede italic-serif" style={{ fontSize: "1.35rem" }}>
              {author.quote}
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section className="section section--hairline">
        <div className="shell">
          <div className="sec__head sec__head--stack">
            <div>
              <p className="eyebrow">{faqEyebrow}</p>
              <h2 className="h2 sec__title">{faqTitle}</h2>
            </div>
          </div>
          <Faq items={faq} />
        </div>
      </section>

      {/* ── Финальный призыв ───────────────────────────────── */}
      <section className="section final">
        <div className="final__glow" aria-hidden="true" />
        <div className="shell final__inner">
          <h2 className="h2 final__title reveal">
            <RichText text={finalCta.title} />
          </h2>
          <p className="lede final__lede reveal">{finalCta.lede}</p>
          <div className="final__cta reveal">
            <Button to="/contact">{finalCta.ctaPrimaryLabel}</Button>
            <Button href="https://t.me/" variant="ghost">
              {finalCta.ctaSecondaryLabel}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
