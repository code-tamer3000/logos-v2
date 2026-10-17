import { Button } from "../components/Button";
import { Placeholder } from "../components/Placeholder";
import { useContent } from "../content/ContentProvider";
import { RichText } from "../content/RichText";
import { ImageSlot } from "../content/ImageSlot";

type AboutContent = {
  portraitNote: string;
  portraitImage?: string;
  eyebrow: string;
  title: string;
  body: string;
  creds: { title: string; note: string }[];
  ctaLabel: string;
};

export function About() {
  const { portraitNote, portraitImage, eyebrow, title, body, creds, ctaLabel } =
    useContent<AboutContent>("home.about");

  return (
    <section className="section section--hairline" id="about">
      <div className="shell about__grid">
        <div className="about__portrait reveal">
          <ImageSlot
            src={portraitImage}
            alt="Портрет автора"
            fallback={<Placeholder label="Портрет автора" note={portraitNote} ratio="4 / 5" />}
          />
        </div>

        <div className="reveal" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h2 sec__title">
            <RichText text={title} />
          </h2>

          <p className="lede measure" style={{ marginTop: "2rem" }}>
            {body}
          </p>

          <ul className="about__creds">
            {creds.map((c) => (
              <li key={c.title}>
                <strong>{c.title}</strong>
                {c.note}
              </li>
            ))}
          </ul>

          <Button to="/about" variant="ghost">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
