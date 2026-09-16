import { Button } from "../components/Button";
import { Placeholder } from "../components/Placeholder";
import { useContent } from "../content/ContentProvider";
import { ImageSlot } from "../content/ImageSlot";

type SredaContent = {
  eyebrow: string;
  title: string;
  body: string;
  ctaLabel: string;
  coverImage?: string;
  coverNote: string;
};

export function Sreda() {
  const { eyebrow, title, body, ctaLabel, coverImage, coverNote } = useContent<SredaContent>("home.sreda");

  return (
    <section className="section section--hairline">
      <div className="shell">
        <div className="sreda reveal">
          <div className="sreda__body">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="h2 sec__title">{title}</h2>
            <p className="lede measure" style={{ marginTop: "1.5rem" }}>
              {body}
            </p>
            <div style={{ marginTop: "2.25rem" }}>
              <Button href="https://school.focusinside.ru/SREDA" variant="ghost">
                {ctaLabel}
              </Button>
            </div>
          </div>

          <ImageSlot
            src={coverImage}
            alt="Обложка сообщества «Среда»"
            fallback={<Placeholder label="Обложка сообщества «Среда»" note={coverNote} ratio="5 / 4" />}
          />
        </div>
      </div>
    </section>
  );
}
