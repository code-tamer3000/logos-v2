import { Page } from "./Page";
import { Button } from "../components/Button";
import { useContent } from "../content/ContentProvider";
import { RichText } from "../content/RichText";

type MentoringContent = {
  eyebrow: string;
  title: string;
  lede: string;
  todo: string[];
  branches: { status: string; title: string; lede: string; price: string }[];
  orderEyebrow: string;
  orderTitle: string;
  orderBody: string;
  orderQuote: string;
  orderCtaLabel: string;
};

export default function Mentoring() {
  const {
    eyebrow,
    title,
    lede,
    todo,
    branches: BRANCHES,
    orderEyebrow,
    orderTitle,
    orderBody,
    orderQuote,
    orderCtaLabel,
  } = useContent<MentoringContent>("page.mentoring");

  return (
    <Page eyebrow={eyebrow} title={<RichText text={title} />} lede={lede} todo={todo}>
      <section className="section section--hairline">
        <div className="shell">
          <div className="shop">
            {BRANCHES.map((b, i) => (
              <article
                key={b.title}
                className="card reveal"
                style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
              >
                <span className="shopCard__status">{b.status}</span>
                <h3 className="shopCard__title">{b.title}</h3>
                <p className="shopCard__lede">{b.lede}</p>
                <div className="shopCard__foot">
                  <span className="shopCard__price" style={{ fontSize: "1.05rem" }}>
                    {b.price}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--hairline">
        <div className="shell">
          <div className="reveal" style={{ maxWidth: "70ch" }}>
            <p className="eyebrow">{orderEyebrow}</p>
            <h2 className="h2 sec__title">{orderTitle}</h2>
            <p className="lede" style={{ marginTop: "2rem" }}>
              {orderBody}
            </p>
            <p className="lede italic-serif" style={{ marginTop: "1.5rem", fontSize: "1.35rem" }}>
              {orderQuote}
            </p>
            <div style={{ marginTop: "2.5rem" }}>
              <Button to="/contact">{orderCtaLabel}</Button>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}
