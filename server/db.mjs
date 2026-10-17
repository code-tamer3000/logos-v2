import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";
import path from "node:path";

// SQLite встроен в Node (22.5+), поэтому используем его вместо better-sqlite3 —
// без нативной сборки/бинарников, которые могут не подойти к окружению VPS.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = process.env.DB_PATH || path.join(__dirname, "data.sqlite");

export const db = new DatabaseSync(DB_PATH);
db.exec("PRAGMA journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS content_blocks (
    block_key TEXT PRIMARY KEY,
    data TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS content_versions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    block_key TEXT NOT NULL,
    data TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_content_versions_block_key
    ON content_versions (block_key, created_at DESC);

  CREATE TABLE IF NOT EXISTS media (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL,
    original_name TEXT NOT NULL,
    mime TEXT NOT NULL,
    size INTEGER NOT NULL,
    created_at TEXT NOT NULL
  );
`);

const VERSIONS_TO_KEEP = Number(process.env.VERSIONS_TO_KEEP || 20);

/** Текущее значение блока, либо null если блок ещё не существует. */
export function getBlock(blockKey) {
  const row = db.prepare("SELECT data FROM content_blocks WHERE block_key = ?").get(blockKey);
  return row ? JSON.parse(row.data) : null;
}

export function getAllBlocks() {
  const rows = db.prepare("SELECT block_key, data FROM content_blocks").all();
  const out = {};
  for (const row of rows) out[row.block_key] = JSON.parse(row.data);
  return out;
}

/** Сохраняет блок и добавляет версию в историю; обрезает историю до VERSIONS_TO_KEEP. */
export function saveBlock(blockKey, data) {
  const now = new Date().toISOString();
  const json = JSON.stringify(data);

  db.exec("BEGIN");
  try {
    db.prepare(
      `INSERT INTO content_blocks (block_key, data, updated_at) VALUES (?, ?, ?)
       ON CONFLICT(block_key) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`,
    ).run(blockKey, json, now);

    db.prepare("INSERT INTO content_versions (block_key, data, created_at) VALUES (?, ?, ?)").run(
      blockKey,
      json,
      now,
    );

    db.prepare(
      `DELETE FROM content_versions
       WHERE block_key = ? AND id NOT IN (
         SELECT id FROM content_versions WHERE block_key = ? ORDER BY id DESC LIMIT ?
       )`,
    ).run(blockKey, blockKey, VERSIONS_TO_KEEP);

    db.exec("COMMIT");
  } catch (err) {
    db.exec("ROLLBACK");
    throw err;
  }

  return { blockKey, data, updatedAt: now };
}

/** Идемпотентный сид: не трогает уже существующие блоки. */
export function seedBlockIfMissing(blockKey, data) {
  const existing = getBlock(blockKey);
  if (existing !== null) return false;
  saveBlock(blockKey, data);
  return true;
}

export function listVersions(blockKey) {
  return db
    .prepare("SELECT id, created_at FROM content_versions WHERE block_key = ? ORDER BY id DESC")
    .all(blockKey);
}

export function getVersion(blockKey, versionId) {
  const row = db
    .prepare("SELECT id, data, created_at FROM content_versions WHERE block_key = ? AND id = ?")
    .get(blockKey, versionId);
  return row ? { id: row.id, data: JSON.parse(row.data), createdAt: row.created_at } : null;
}

export function insertMedia({ filename, originalName, mime, size }) {
  const now = new Date().toISOString();
  const info = db
    .prepare(
      "INSERT INTO media (filename, original_name, mime, size, created_at) VALUES (?, ?, ?, ?, ?)",
    )
    .run(filename, originalName, mime, size, now);
  return { id: info.lastInsertRowid, filename, originalName, mime, size, createdAt: now };
}

export function listMedia() {
  return db.prepare("SELECT * FROM media ORDER BY id DESC").all();
}
