import { Fragment } from "react";

/**
 * Рендерит текст из админки с маленькой инлайн-разметкой:
 * "\n"   — перенос строки (<br/>)
 * "\n\n" — разрыв абзаца (для многоабзацных текстов)
 * "{{...}}" — акцентная вставка (<span className="italic-serif accent">)
 */
function renderInline(line: string, keyPrefix: string) {
  const parts = line.split(/(\{\{[^}]*\}\})/g);
  return parts.map((part, i) => {
    if (part.startsWith("{{") && part.endsWith("}}")) {
      return (
        <span key={`${keyPrefix}-${i}`} className="italic-serif accent">
          {part.slice(2, -2)}
        </span>
      );
    }
    return <Fragment key={`${keyPrefix}-${i}`}>{part}</Fragment>;
  });
}

type Props = {
  text: string;
  /** Класс для каждого сгенерированного <p> в многоабзацном режиме (напр. "lede measure"). */
  paragraphClassName?: string;
};

export function RichText({ text, paragraphClassName }: Props) {
  const paragraphs = text.split("\n\n");

  if (paragraphs.length === 1) {
    const lines = text.split("\n");
    return (
      <>
        {lines.map((line, i) => (
          <Fragment key={i}>
            {i > 0 && <br />}
            {renderInline(line, String(i))}
          </Fragment>
        ))}
      </>
    );
  }

  return (
    <div className="richtext">
      {paragraphs.map((para, pi) => (
        <p key={pi} className={paragraphClassName}>
          {para.split("\n").map((line, li) => (
            <Fragment key={li}>
              {li > 0 && <br />}
              {renderInline(line, `${pi}-${li}`)}
            </Fragment>
          ))}
        </p>
      ))}
    </div>
  );
}
