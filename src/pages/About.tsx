import { Page } from "./Page";
import { Placeholder } from "../components/Placeholder";
import { useContent } from "../content/ContentProvider";
import { RichText } from "../content/RichText";
import { ImageSlot } from "../content/ImageSlot";

type AboutPageContent = {
  eyebrow: string;
  title: string;
  lede: string;
  todo: string[];
  portraitImage?: string;
  portraitNote: string;
  positionEyebrow: string;
  positionTitle: string;
  positionBody: string;
  fieldsEyebrow: string;
  fieldsTitle: string;
  fields: { title: string; note: string }[];
};

export default function About() {
  const {
    eyebrow,
    title,
    lede,
    todo,
    portraitImage,
    portraitNote,
    positionEyebrow,
    positionTitle,
    positionBody,
    fieldsEyebrow,
    fieldsTitle,
    fields,
  } = useContent<AboutPageContent>("page.about");

  return (
    <Page eyebrow={eyebrow} title={<RichText text={title} />} lede={lede} todo={todo}>
      <section className="section section--hairline">
        <div className="shell about__grid">
          <div className="about__portrait reveal">
            <ImageSlot
              src={portraitImage}
              alt="Портрет автора"
              fallback={<Placeholder label="Портрет автора" note={portraitNote} ratio="4 / 5" />}
            />
          </div>

          <div className="reveal" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <p className="eyebrow">{positionEyebrow}</p>
            <h2 className="h2 sec__title">{positionTitle}</h2>
            <div style={{ marginTop: "2rem" }}>
              <RichText text={positionBody} paragraphClassName="lede measure" />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--hairline">
        <div className="shell">
          <div className="sec__head">
            <div>
              <p className="eyebrow">{fieldsEyebrow}</p>
              <h2 className="h2 sec__title">{fieldsTitle}</h2>
            </div>
          </div>
          <div className="shop">
            {fields.map((f, i) => (
              <article
                key={f.title}
                className="card reveal"
                style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              >
                <h3 className="shopCard__title" style={{ marginTop: 0, fontSize: "1.5rem" }}>
                  {f.title}
                </h3>
                <p className="shopCard__lede">{f.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Page>
  );
}
