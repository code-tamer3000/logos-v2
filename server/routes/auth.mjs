import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const COOKIE_NAME = "session";
const isProd = process.env.NODE_ENV === "production";

export const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const { password } = req.body || {};
  if (typeof password !== "string" || !password) {
    return res.status(400).json({ error: "Введите пароль" });
  }
  const ok = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  if (!ok) return res.status(401).json({ error: "Неверный пароль" });

  const token = jwt.sign({ sub: "admin" }, JWT_SECRET, { expiresIn: "30d" });
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  res.json({ ok: true });
});

authRouter.post("/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.json({ ok: true });
});

authRouter.get("/me", (req, res) => {
  const token = req.cookies?.session;
  if (!token) return res.json({ authenticated: false });
  try {
    jwt.verify(token, JWT_SECRET);
    res.json({ authenticated: true });
  } catch {
    res.json({ authenticated: false });
  }
});
