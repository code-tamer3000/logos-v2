import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { seedBlockIfMissing } from "./db.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const defaultsPath = path.join(__dirname, "..", "content", "defaults.json");

export function seed() {
  const defaults = JSON.parse(readFileSync(defaultsPath, "utf-8"));
  let created = 0;
  for (const [blockKey, data] of Object.entries(defaults)) {
    if (seedBlockIfMissing(blockKey, data)) created += 1;
  }
  return { total: Object.keys(defaults).length, created };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = seed();
  console.log(`Сид контента: ${result.created} новых блоков из ${result.total}.`);
}
