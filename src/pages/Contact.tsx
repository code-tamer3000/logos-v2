import { useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { Button } from "../components/Button";
import { useContent } from "../content/ContentProvider";
import { RichText } from "../content/RichText";
import "./Contact.css";

type ContactContent = {
  eyebrow: string;
  title: string;
  lede: string;
  nameLabel: string;
  contactLabel: string;
  messageLabel: string;
  consentLabel: string;
  submitLabel: string;
  submitDoneLabel: string;
  successMessage: string;
  sideTitle: string;
  sideNote: string;
  channels: { label: string; value: string; href: string }[];
};

export default function Contact() {
  const {
    eyebrow,
    title,
    lede,
    nameLabel,
    contactLabel,
    messageLabel,
    consentLabel,
    submitLabel,
    submitDoneLabel,
    successMessage,
    sideTitle,
    sideNote,
    channels: CHANNELS,
  } = useContent<ContactContent>("page.contact");
  useReveal();
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="pageHead">
        <div className="pageHead__glow" aria-hidden="true" />
        <div className="shell pageHead__inner">
          <p className="eyebrow eyebrow--plain">{eyebrow}</p>
          <h1 className="display pageHead__title">
            <RichText text={title} />
          </h1>
          <p className="lede measure pageHead__lede">{lede}</p>
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
              <span className="field__label">{nameLabel}</span>
              <input className="field__input" type="text" name="name" required />
            </label>

            <label className="field">
              <span className="field__label">{contactLabel}</span>
              <input className="field__input" type="text" name="contact" required />
            </label>

            <label className="field">
              <span className="field__label">{messageLabel}</span>
              <textarea className="field__input" name="message" rows={5} required />
            </label>

            <label className="consent">
              <input type="checkbox" required />
              <span>{consentLabel}</span>
            </label>

            <div style={{ marginTop: "0.5rem" }}>
              <Button>{sent ? submitDoneLabel : submitLabel}</Button>
            </div>

            {sent && <p className="contact__ok">{successMessage}</p>}
          </form>

          <aside className="contact__side reveal" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <h2 className="h3">{sideTitle}</h2>
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
              {sideNote}
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
