import { useState } from "react";
import { Button } from "../components/Button";
import { useContent } from "../content/ContentProvider";
import { RichText } from "../content/RichText";

type FinalCtaContent = {
  eyebrow: string;
  title: string;
  lede: string;
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
  formPlaceholder: string;
  formSubmitLabel: string;
  formSubmitDoneLabel: string;
  hintDefault: string;
  hintSent: string;
};

export function FinalCta() {
  const {
    eyebrow,
    title,
    lede,
    ctaPrimaryLabel,
    ctaSecondaryLabel,
    formPlaceholder,
    formSubmitLabel,
    formSubmitDoneLabel,
    hintDefault,
    hintSent,
  } = useContent<FinalCtaContent>("home.finalCta");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="section final">
      <div className="final__glow" aria-hidden="true" />
      <div className="shell final__inner">
        <p className="eyebrow eyebrow--plain reveal">{eyebrow}</p>

        <h2 className="h2 final__title reveal" style={{ marginTop: "1.5rem" }}>
          <RichText text={title} />
        </h2>

        <p className="lede final__lede reveal">{lede}</p>

        <div className="final__cta reveal">
          <Button href="https://t.me/">{ctaPrimaryLabel}</Button>
          <Button to="/contact" variant="ghost">
            {ctaSecondaryLabel}
          </Button>
        </div>

        <form
          className="final__form reveal"
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: подключить рассылку (форма пока не отправляет данные)
            setSent(true);
          }}
        >
          <input
            className="final__input"
            type="email"
            required
            placeholder={formPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email для рассылки"
          />
          <Button>{sent ? formSubmitDoneLabel : formSubmitLabel}</Button>
        </form>

        <p className="final__hint reveal">{sent ? hintSent : hintDefault}</p>
      </div>
    </section>
  );
}
