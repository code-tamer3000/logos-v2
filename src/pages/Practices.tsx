import { useReveal } from "../hooks/useReveal";
import { Button } from "../components/Button";
import { Placeholder } from "../components/Placeholder";
import { Faq } from "../components/Faq";
import { effects } from "../data/home";
import { symptoms, audience, weeks, formats, faq } from "../data/practices";
import "./Practices.css";

export default function Practices() {
  useReveal();

  return (
    <>
      {/* ── Оффер ──────────────────────────────────────────── */}
      <section className="pageHead">
        <div className="pageHead__glow" aria-hidden="true" />
        <div className="shell pageHead__inner">
          <p className="eyebrow eyebrow--plain">Практики на внимание</p>
          <h1 className="display pageHead__title">
            Верните себе способность
            <br />
            <span className="italic-serif accent">концентрироваться</span>
          </h1>
          <p className="lede measure pageHead__lede">
            Живая осознанность: практики для ума и бизнеса. Онлайн и офлайн в Краснодаре — для тех,
            кто устал от стресса и хочет управлять вниманием. 8 недель, 10 минут в день.
          </p>
          <div className="hero__cta" style={{ animation: "none", marginTop: "2.5rem" }}>
            <Button to="/contact">Записаться</Button>
            <Button to="/practices/free" variant="ghost">
              Первое занятие бесплатно
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell reveal">
          <Placeholder
            label="Групповое живое занятие"
            note="Люди медитируют, тёплый свет, широкий кадр"
            ratio="21 / 9"
          />
        </div>
      </section>

      {/* ── Проблема ───────────────────────────────────────── */}
      <section className="section section--hairline">
        <div className="shell">
          <div className="sec__head">
            <div>
              <p className="eyebrow">Знакомо?</p>
              <h2 className="h2 sec__title">
                День пролетел,
                <br />а вы словно не жили его
              </h2>
            </div>
            <p className="lede measure-tight">
              Только хаотично переключались между делами, новостями, тревогами и мессенджерами. Мы
              привыкли жаловаться на усталость, но редко думаем: может, мы разучились управлять
              своим вниманием?
            </p>
          </div>

          <ul className="symptoms">
            {symptoms.map((s, i) => (
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
            <p className="eyebrow">Почему это происходит</p>
            <h2 className="h2 sec__title">Внимание — не бесконечный ресурс</h2>
          </div>
          <div className="reveal" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <p className="lede">
              Каждый день мы тратим его на тревожные мысли о прошлом и будущем, бесполезные
              уведомления, мысленные споры и бесконечное переключение задач, которое съедает больше
              энергии, чем сама работа.
            </p>
            <p className="lede" style={{ marginTop: "1.5rem" }}>
              Мозг расходует бо́льшую часть энергии на ментальную деятельность. Чем больше хаоса во
              внимании, тем сильнее опустошение. В конце дня мы чувствуем себя выжатыми — хотя
              физически ничего не делали.
            </p>
            <p className="lede" style={{ marginTop: "1.5rem" }}>
              Это и есть бедность внимания: вы постоянно фокусируетесь на внешнем шуме, но почти
              никогда — на том, что действительно важно. Самое неприятное — мы перестаём замечать
              потерю.
            </p>
          </div>
        </div>
      </section>

      {/* ── Цитата ─────────────────────────────────────────── */}
      <section className="section quote">
        <div className="quote__glow" aria-hidden="true" />
        <div className="shell">
          <blockquote className="reveal">
            <p className="quote__text italic-serif">
              Внимание — это мышца.
              <br />
              <span className="accent">Её можно тренировать</span>
            </p>
          </blockquote>
        </div>
      </section>

      {/* ── Решение ────────────────────────────────────────── */}
      <section className="section section--hairline">
        <div className="shell insight">
          <div className="reveal">
            <p className="eyebrow">Решение</p>
            <h2 className="h2 sec__title">Майндфулнес</h2>
          </div>
          <div className="reveal" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <p className="lede">
              Древние буддийские практики не только изучают природу внимания, но и предлагают
              инструменты для его развития. В западном обществе они получили название mindfulness —
              тот же навык, очищенный от религиозного контекста и упакованный в понятные техники.
            </p>
            <p className="lede" style={{ marginTop: "1.5rem" }}>
              Его изучают в университетах, применяют в психотерапии, учат в корпорациях и школах.
              Постепенно мы возвращаем фокус себе, успокаиваем ментальный шум и сохраняем
              психическую энергию, которая больше не расплёскивается по сторонам.
            </p>
          </div>
        </div>
      </section>

      {/* ── Эффекты ────────────────────────────────────────── */}
      <section className="section section--hairline">
        <div className="shell">
          <div className="sec__head sec__head--stack">
            <div>
              <p className="eyebrow">Результат</p>
              <h2 className="h2 sec__title">Что происходит при регулярной практике</h2>
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
              <p className="eyebrow">Кому подходит</p>
              <h2 className="h2 sec__title">Найдите себя</h2>
            </div>
            <p className="lede measure-tight">
              Присоединиться может любой желающий, независимо от религии и мировоззрения. Практики
              светские и подходят всем.
            </p>
          </div>
          <div className="shop">
            {audience.map((a, i) => (
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
              <p className="eyebrow">Программа</p>
              <h2 className="h2 sec__title">
                8 недель — от хаоса
                <br />к управляемому вниманию
              </h2>
            </div>
          </div>
          <ol className="weeks">
            {weeks.map((w, i) => (
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
              <p className="eyebrow">Форматы и цены</p>
              <h2 className="h2 sec__title">Как заниматься</h2>
            </div>
            <p className="lede measure-tight">
              Запись — через форму или мессенджер. Сначала бесплатная консультация 20 минут: поймём,
              какой формат вам подходит.
            </p>
          </div>

          <div className="formats">
            {formats.map((f, i) => (
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
                    Записаться
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
            <Placeholder label="Фото ведущего" note="С занятия или студийный портрет" ratio="4 / 5" />
          </div>
          <div className="reveal" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <p className="eyebrow">Автор и ведущий</p>
            <h2 className="h2 sec__title">Константин Логос</h2>
            <ul className="about__creds">
              <li>
                <strong>Трансперсональный психолог</strong>Московский институт психоанализа
              </li>
              <li>
                <strong>Автор системы целостного развития человека</strong>Предприниматель с 2015
                года
              </li>
              <li>
                <strong>Преподаватель практик осознанности</strong>Личный опыт медитации — 5 лет
              </li>
            </ul>
            <p className="lede italic-serif" style={{ fontSize: "1.35rem" }}>
              «Я не учу верить, я даю инструменты, которые работают независимо от мировоззрения»
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section className="section section--hairline">
        <div className="shell">
          <div className="sec__head sec__head--stack">
            <div>
              <p className="eyebrow">Вопросы</p>
              <h2 className="h2 sec__title">Частые вопросы</h2>
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
            Первое занятие —<br />
            <span className="italic-serif accent">бесплатно</span>
          </h2>
          <p className="lede final__lede reveal">
            Вы получите не конспект, а реальный навык, который останется с вами после занятий.
            Начните сегодня.
          </p>
          <div className="final__cta reveal">
            <Button to="/contact">Записаться на пробную встречу</Button>
            <Button href="https://t.me/" variant="ghost">
              Открыть Telegram-бота
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
