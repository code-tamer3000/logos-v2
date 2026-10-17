import { useEffect, useState, type ReactNode } from "react";
import { getMe, login } from "./api";

export function AdminAuthGate({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<"checking" | "in" | "out">("checking");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getMe()
      .then((res) => setStatus(res.authenticated ? "in" : "out"))
      .catch(() => setStatus("out"));
  }, []);

  if (status === "checking") return <div className="adminLogin">Проверяю сессию…</div>;

  if (status === "out") {
    return (
      <div className="adminLogin">
        <form
          className="adminLogin__form"
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            setError(null);
            try {
              await login(password);
              setStatus("in");
            } catch (err) {
              setError(err instanceof Error ? err.message : "Не удалось войти");
            } finally {
              setBusy(false);
            }
          }}
        >
          <h1 className="adminLogin__title">Админка сайта</h1>
          <label className="adminField">
            <span className="adminField__label">Пароль</span>
            <input
              className="adminField__input"
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && <p className="adminField__error">{error}</p>}
          <button type="submit" className="adminBtn adminBtn--solid" disabled={busy}>
            {busy ? "Вхожу…" : "Войти"}
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
