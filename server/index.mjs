import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { authRouter } from "./routes/auth.mjs";
import { contentRouter } from "./routes/content.mjs";
import { mediaRouter, uploadsDir } from "./routes/media.mjs";
import { seed } from "./seed.mjs";

for (const key of ["JWT_SECRET", "ADMIN_PASSWORD_HASH"]) {
  if (!process.env[key]) {
    console.error(`Не задана переменная окружения ${key}. Скопируйте .env.example в .env.`);
    process.exit(1);
  }
}

seed();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "..", "dist");

const app = express();
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/content", contentRouter);
app.use("/api/media", mediaRouter);

app.use("/uploads", express.static(uploadsDir));
app.use(express.static(distDir));

// SPA-роутинг: любой не-API путь отдаёт index.html, дальше маршруты разбирает react-router.
// Express 5 больше не принимает голый "*" как паттерн маршрута, поэтому — middleware без пути.
app.use((req, res, next) => {
  if (req.method !== "GET" && req.method !== "HEAD") return next();
  res.sendFile(path.join(distDir, "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
