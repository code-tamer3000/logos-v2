import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import { useContent } from "../content/ContentProvider";
import { RichText } from "../content/RichText";
import "./Hero.css";

type HeroContent = {
  eyebrow: string;
  title: string;
  lede: string;
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
  scrollLabel: string;
};

export function Hero() {
  const { eyebrow, title, lede, ctaPrimaryLabel, ctaSecondaryLabel, scrollLabel } =
    useContent<HeroContent>("home.hero");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Автоплей может быть отклонён — тогда просто остаётся статичный кадр
    v.play().catch(() => undefined);
  }, []);

  return (
    <section className="hero">
      <div className="hero__media">
        <video
          ref={videoRef}
          className={`hero__video${ready ? " is-ready" : ""}`}
          src="/media/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setReady(true)}
          aria-hidden="true"
        />
        <div className="hero__scrim" aria-hidden="true" />
        <div className="hero__sun" aria-hidden="true" />
        <div className="hero__vignette" aria-hidden="true" />
      </div>

      <div className="shell hero__inner">
        <p className="eyebrow eyebrow--plain hero__eyebrow">{eyebrow}</p>

        <h1 className="display hero__title">
          <RichText text={title} />
        </h1>

        <p className="lede hero__lede">{lede}</p>

        <div className="hero__cta">
          <Button to="/practices">{ctaPrimaryLabel}</Button>
          <Button to="/mentoring" variant="ghost">
            {ctaSecondaryLabel}
          </Button>
        </div>
      </div>

      <a className="hero__scroll" href="#about" aria-label="Листать дальше">
        <span className="hero__scrollWord">{scrollLabel}</span>
        <span className="hero__scrollLine" aria-hidden="true" />
      </a>
    </section>
  );
}
