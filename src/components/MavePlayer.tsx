import { useState } from "react";
import "./MavePlayer.css";

type Props = {
  /** Идентификатор подкаста в mave (из ссылки на выпуск) */
  podcast: string;
  /**
   * Номер выпуска в mave. Если не указан — плеер показывает
   * плейлист со всеми выпусками и обновляется сам.
   */
  episode?: number | string;
  /** Заголовок — показывается на превью до загрузки плеера */
  title?: string;
  meta?: string;
  /** Акцентный цвет плеера. mave принимает только формат rgb(r, g, b) */
  color?: string;
  showDate?: boolean;
  showMute?: boolean;
  allowDownload?: boolean;
  /**
   * true — iframe грузится сразу.
   * По умолчанию показываем своё превью и подключаем mave по клику:
   * три-четыре сторонних iframe на странице заметно бьют по загрузке.
   */
  eager?: boolean;
  /** Высота iframe. Для одного выпуска mave требует 235px */
  height?: number;
};

/** Solar Flare из палитры — mave ждёт именно rgb(), hex не понимает */
const ACCENT = "rgb(240, 232, 208)";

export function MavePlayer({
  podcast,
  episode,
  title,
  meta,
  color = ACCENT,
  showDate = true,
  showMute = true,
  allowDownload = true,
  eager = false,
  height = episode === undefined ? 600 : 235,
}: Props) {
  const [active, setActive] = useState(eager);

  const src =
    `https://player.mave.digital/?podcast=${encodeURIComponent(podcast)}` +
    (episode === undefined ? "" : `&episode=${encodeURIComponent(String(episode))}`) +
    `&color=${encodeURIComponent(color)}` +
    `&mute=${showMute ? 1 : 0}` +
    `&date=${showDate ? 1 : 0}` +
    `&download=${allowDownload ? 1 : 0}`;

  if (!active) {
    return (
      <button type="button" className="mave mave--facade" onClick={() => setActive(true)}>
        <span className="mave__play" aria-hidden="true">
          <svg viewBox="0 0 12 14" width="12" height="14">
            <path d="M1 1l10 6-10 6z" fill="currentColor" />
          </svg>
        </span>
        <span className="mave__text">
          {title && <span className="mave__title">{title}</span>}
          <span className="mave__meta">{meta ?? "Слушать выпуск"}</span>
        </span>
        <span className="mave__brand">mave</span>
      </button>
    );
  }

  return (
    <div className="mave">
      <iframe
        src={src}
        title={title ? `Плеер: ${title}` : "Плеер подкаста"}
        loading="lazy"
        allow="autoplay"
        style={{ width: "100%" }}
        height={height}
        scrolling="no"
        frameBorder="no"
      />
    </div>
  );
}
