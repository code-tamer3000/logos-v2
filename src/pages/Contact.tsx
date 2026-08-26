import { useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { Button } from "../components/Button";
import "./Contact.css";

const CHANNELS = [
  { label: "Telegram", value: "@logos", href: "https://t.me/" },
  { label: "WhatsApp", value: "+7 000 000-00-00", href: "https://wa.me/" },
  { label: "Почта", value: "hello@logos.ru", href: "mailto:hello@logos.ru" },
];

export default function Contact() {
  useReveal();
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="pageHead">
        <div className="pageHead__glow" aria-hidden="true" />
        <div className="shell pageHead__inner">
          <p className="eyebrow eyebrow--plain">Контакты</p>
          <h1 className="display pageHead__title">
            Начнём с <span className="italic-serif accent">разговора</span>
          </h1>
          <p className="lede measure pageHead__lede">
            Напишите пару слов о запросе — что происходит и чего хочется. Я отвечу и предложу
            формат, который подойдёт именно вам. Или сразу скажу, если это не моя история.
          </p>
        </div>
      </section>

      <section className="section section--hairline">
        <div className="shell contact">
          <form
            className="contact__form reveal"
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: подключить отправку заявки (бэкенд / CRM)
              setSent(true);
            }}
          >
            <label className="field">
              <span className="field__label">Как вас зовут</span>
              <input className="field__input" type="text" name="name" required />
            </label>

            <label className="field">
              <span className="field__label">Email или телефон</span>
              <input className="field__input" type="text" name="contact" required />
            </label>

            <label className="field">
              <span className="field__label">Что привело</span>
              <textarea className="field__input" name="message" rows={5} required />
            </label>

            <label className="consent">
              <input type="checkbox" required />
              <span>
                Согласен на обработку персональных данных в соответствии с политикой
                конфиденциальности
              </span>
            </label>

            <div style={{ marginTop: "0.5rem" }}>
              <Button>{sent ? "Заявка отправлена" : "Отправить заявку"}</Button>
            </div>

            {sent && <p className="contact__ok">Спасибо. Я свяжусь с вами в течение пары дней.</p>}
          </form>

          <aside className="contact__side reveal" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <h2 className="h3">Или напрямую</h2>
            <ul className="contact__channels">
              {CHANNELS.map((c) => (
                <li key={c.label}>
                  <a href={c.href} target="_blank" rel="noreferrer">
                    <span className="contact__chLabel">{c.label}</span>
                    <span className="contact__chValue">{c.value}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="lede" style={{ marginTop: "2.5rem", fontSize: "0.875rem" }}>
              Живые занятия проходят в Краснодаре. Онлайн — из любой точки мира.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
