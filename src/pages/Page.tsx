import type { ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";
import { Placeholder } from "../components/Placeholder";
import { Button } from "../components/Button";
import { useContent } from "../content/ContentProvider";
import { ImageSlot } from "../content/ImageSlot";
import "./Page.css";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lede: string;
  /** Что ещё предстоит наполнить — из «Сводки: где не хватает текста» в ТЗ */
  todo?: string[];
  children?: ReactNode;
};

type GenericInProgressContent = {
  eyebrow: string;
  title: string;
  intro: string;
  ctaLabel: string;
  placeholderLabel: string;
  placeholderImage?: string;
};

/** Общий каркас внутренних страниц. Наполнение — по мере готовности текстов. */
export function Page({ eyebrow, title, lede, todo, children }: Props) {
  const inProgress = useContent<GenericInProgressContent>("page.genericInProgress");
  useReveal([title]);

  return (
    <>
      <section className="pageHead">
        <div className="pageHead__glow" aria-hidden="true" />
        <div className="shell pageHead__inner">
          <p className="eyebrow eyebrow--plain">{eyebrow}</p>
          <h1 className="display pageHead__title">{title}</h1>
          <p className="lede measure pageHead__lede">{lede}</p>
        </div>
      </section>

      {children}

      {todo && (
        <section className="section section--hairline">
          <div className="shell pageTodo">
            <div className="reveal">
              <p className="eyebrow">{inProgress.eyebrow}</p>
              <h2 className="h2 sec__title">{inProgress.title}</h2>
              <p className="lede measure" style={{ marginTop: "1.5rem" }}>
                {inProgress.intro}
              </p>
              <ul className="pageTodo__list">
                {todo.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div style={{ marginTop: "2.5rem" }}>
                <Button to="/contact" variant="ghost">
                  {inProgress.ctaLabel}
                </Button>
              </div>
            </div>

            <div className="reveal" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
              <ImageSlot
                src={inProgress.placeholderImage}
                alt={inProgress.placeholderLabel}
                fallback={<Placeholder label={inProgress.placeholderLabel} ratio="1 / 1" />}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
