import { Button } from "../components/Button";
import { useContent } from "../content/ContentProvider";
import { RichText } from "../content/RichText";

type AttentionContent = {
  eyebrow: string;
  title: string;
  intro: string;
  effectsHeading: string;
  effectsNote: string;
  ctaLabel: string;
  botEyebrow: string;
  botTitle: string;
  botText: string;
  botList: string[];
  botCtaLabel: string;
};

export function Attention() {
  const {
    eyebrow,
    title,
    intro,
    effectsHeading,
    effectsNote,
    ctaLabel,
    botEyebrow,
    botTitle,
    botText,
    botList,
    botCtaLabel,
  } = useContent<AttentionContent>("home.attention");
  const { items: effects } = useContent<{ items: string[] }>("shared.effects");

  return (
    <section className="section section--hairline attn">
      <div className="shell">
        <div className="sec__head">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="h2 sec__title">
              <RichText text={title} />
            </h2>
          </div>
          <p className="lede measure-tight">{intro}</p>
        </div>

        <div className="attn__grid">
          <div className="reveal">
            <h3 className="h3">{effectsHeading}</h3>
            <ul className="attn__effects">
              {effects.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
            <p className="lede" style={{ marginTop: "1.75rem", fontSize: "0.875rem" }}>
              {effectsNote}
            </p>
            <div style={{ marginTop: "2.25rem" }}>
              <Button to="/practices">{ctaLabel}</Button>
            </div>
          </div>

          <aside
            className="card attn__bot reveal"
            style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
          >
            <p className="eyebrow eyebrow--plain">{botEyebrow}</p>
            <h3 className="attn__botTitle">{botTitle}</h3>
            <p className="attn__botText">{botText}</p>
            <ul className="attn__effects" style={{ marginTop: "1.5rem" }}>
              {botList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="attn__botCta">
              <Button href="https://t.me/" variant="ghost">
                {botCtaLabel}
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
