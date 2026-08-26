import "./Placeholder.css";

type Props = {
  /** Что должно занять это место — подпись видна прямо в макете */
  label: string;
  /** Соотношение сторон, напр. "4 / 5", "16 / 9" */
  ratio?: string;
  /** Пояснение помельче */
  note?: string;
  round?: boolean;
};

export function Placeholder({ label, ratio = "4 / 5", note, round }: Props) {
  return (
    <figure
      className={`ph${round ? " ph--round" : ""}`}
      style={{ aspectRatio: ratio }}
      aria-label={`Плейсхолдер изображения: ${label}`}
    >
      <div className="ph__grain" aria-hidden="true" />
      <div className="ph__glow" aria-hidden="true" />
      <figcaption className="ph__body">
        <svg viewBox="0 0 24 24" className="ph__icon" aria-hidden="true">
          <rect
            x="2.5"
            y="4.5"
            width="19"
            height="15"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle cx="8.5" cy="9.5" r="1.6" fill="currentColor" opacity=".7" />
          <path
            d="M3 16.5l5-4.2 4 3.2 3.5-2.8 5.5 4.3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
        <span className="ph__label">{label}</span>
        {note && <span className="ph__note">{note}</span>}
      </figcaption>
    </figure>
  );
}
