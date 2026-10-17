import { useContent } from "../content/ContentProvider";
import { RichText } from "../content/RichText";

type QuoteContent = { text: string; attribution: string };

export function Quote() {
  const { text, attribution } = useContent<QuoteContent>("home.quote");

  return (
    <section className="section quote">
      <div className="quote__glow" aria-hidden="true" />
      <div className="shell">
        <blockquote className="reveal">
          <p className="quote__text italic-serif">
            <RichText text={text} />
          </p>
          <footer className="quote__attr">{attribution}</footer>
        </blockquote>
      </div>
    </section>
  );
}
