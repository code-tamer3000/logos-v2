import { Router } from "express";
import multer from "multer";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { insertMedia, listMedia } from "../db.mjs";
import { requireAuth } from "../middleware/auth.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const uploadsDir = path.join(__dirname, "..", "uploads");

const ALLOWED_MIME = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/svg+xml": ".svg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = ALLOWED_MIME[file.mimetype] || path.extname(file.originalname) || "";
    cb(null, `${randomUUID()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME[file.mimetype]) {
      return cb(new Error("Разрешены только jpg, png, webp, svg"));
    }
    cb(null, true);
  },
});

export const mediaRouter = Router();

mediaRouter.post("/", requireAuth, (req, res) => {
  upload.single("file")(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: "Файл не получен" });

    const record = insertMedia({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mime: req.file.mimetype,
      size: req.file.size,
    });
    res.json({ ...record, url: `/uploads/${record.filename}` });
  });
});

mediaRouter.get("/", requireAuth, (req, res) => {
  const items = listMedia().map((m) => ({
    id: m.id,
    url: `/uploads/${m.filename}`,
    originalName: m.original_name,
    mime: m.mime,
    size: m.size,
    createdAt: m.created_at,
  }));
  res.json(items);
});
