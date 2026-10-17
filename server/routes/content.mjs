import { Router } from "express";
import { getAllBlocks, getBlock, saveBlock, listVersions, getVersion } from "../db.mjs";
import { requireAuth } from "../middleware/auth.mjs";

export const contentRouter = Router();

// Публичный — сайт грузит весь контент одним запросом.
contentRouter.get("/", (req, res) => {
  res.json(getAllBlocks());
});

contentRouter.put("/:key", requireAuth, (req, res) => {
  const { key } = req.params;
  const data = req.body;
  if (data === undefined || data === null || typeof data !== "object") {
    return res.status(400).json({ error: "Тело запроса должно быть JSON-объектом" });
  }
  const result = saveBlock(key, data);
  res.json(result);
});

contentRouter.get("/:key/versions", requireAuth, (req, res) => {
  res.json(listVersions(req.params.key));
});

contentRouter.post("/:key/rollback/:versionId", requireAuth, (req, res) => {
  const { key, versionId } = req.params;
  const version = getVersion(key, Number(versionId));
  if (!version) return res.status(404).json({ error: "Версия не найдена" });
  const result = saveBlock(key, version.data);
  res.json(result);
});

// Служебный: посмотреть текущее значение одного блока без авторизации (пригождается при отладке).
contentRouter.get("/:key", (req, res) => {
  const data = getBlock(req.params.key);
  if (data === null) return res.status(404).json({ error: "Блок не найден" });
  res.json(data);
});
