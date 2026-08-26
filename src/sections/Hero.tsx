import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import "./Hero.css";

export function Hero() {
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
        <p className="eyebrow eyebrow--plain hero__eyebrow">
          Константин Логос · Исследователь сознания
        </p>

        <h1 className="display hero__title">
          Единственное, чем человек
          <br />
          управляет по‑настоящему, —
          <br />
          <span className="italic-serif accent">это его внимание</span>
        </h1>

        <p className="lede hero__lede">
          Психология сознания, трансперсональный подход и живая практика. Учу направлять,
          удерживать и переключать фокус — базовый навык, из которого растут спокойствие, ясность и
          внутренняя опора.
        </p>

        <div className="hero__cta">
          <Button to="/practices">Практики на внимание</Button>
          <Button to="/mentoring" variant="ghost">
            Наставничество
          </Button>
        </div>
      </div>

      <a className="hero__scroll" href="#about" aria-label="Листать дальше">
        <span className="hero__scrollWord">Листать</span>
        <span className="hero__scrollLine" aria-hidden="true" />
      </a>
    </section>
  );
}
