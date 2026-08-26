/**
 * Перегенерирует src/data/podcasts.ts из RSS-фида подкаста на mave.
 * Запуск: npm run sync:podcast
 */
import { readFileSync, writeFileSync } from "node:fs";
import { XMLParser } from "fast-xml-parser";

const FEED = "https://cloud.mave.digital/67394";
const OUT = new URL("../src/data/podcasts.ts", import.meta.url);

const MONTHS = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

const strip = (s) =>
  String(s ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

const q = (s) => JSON.stringify(s);

const res = await fetch(FEED);
if (!res.ok) throw new Error(`RSS вернул ${res.status}`);

const feed = new XMLParser({ ignoreAttributes: false }).parse(await res.text());
const items = [].concat(feed.rss.channel.item ?? []);

const episodes = items
  .map((it) => {
    const num = Number(String(it.link ?? "").match(/\/ep-(\d+)/)?.[1]);
    if (!num) return null;

    const d = new Date(it.pubDate);
    const secs = Number(it["itunes:duration"] ?? 0);
    let note = strip(it.description);
    if (note.length > 190) note = note.slice(0, 190).replace(/\s+\S*$/, "") + "…";

    return {
      episode: num,
      title: strip(it.title),
      date: `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`,
      duration: `${Math.round(secs / 60)} мин`,
      note,
    };
  })
  .filter(Boolean)
  .sort((a, b) => b.episode - a.episode);

const body = episodes
  .map(
    (e) =>
      `  {\n    episode: ${e.episode},\n    title: ${q(e.title)},\n` +
      `    date: ${q(e.date)},\n    duration: ${q(e.duration)},\n    note: ${q(e.note)},\n  },`,
  )
  .join("\n");

// Шапку файла сохраняем как есть — меняем только массив выпусков
const src = readFileSync(OUT, "utf8");
const marker = "export const episodes: Episode[] = [";
const next =
  src.slice(0, src.indexOf(marker) + marker.length) + "\n" + body + "\n];\n";

writeFileSync(OUT, next);
console.log(`Обновлено выпусков: ${episodes.length} (свежий — ep-${episodes[0].episode})`);
