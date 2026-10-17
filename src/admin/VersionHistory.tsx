import { useEffect, useState } from "react";
import { getVersions, rollback } from "./api";

type Version = { id: number; created_at: string };

const fmt = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
});

export function VersionHistory({
  blockKey,
  onRestored,
}: {
  blockKey: string;
  onRestored: (data: unknown) => void;
}) {
  const [versions, setVersions] = useState<Version[] | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setVersions(null);
    getVersions(blockKey)
      .then(setVersions)
      .catch((err) => setError(err instanceof Error ? err.message : "Не удалось загрузить историю"));
  }, [blockKey]);

  if (error) return <p className="adminField__error">{error}</p>;
  if (!versions) return <p className="adminHint">Загрузка истории…</p>;
  if (versions.length === 0) return <p className="adminHint">История пуста — ещё не было сохранений.</p>;

  return (
    <ul className="adminHistory">
      {versions.map((v, i) => (
        <li key={v.id} className="adminHistory__row">
          <span className="adminHistory__date">{fmt.format(new Date(v.created_at))}</span>
          {i === 0 ? (
            <span className="adminHistory__current">текущая</span>
          ) : (
            <button
              type="button"
              className="adminBtn adminBtn--tiny"
              disabled={busyId !== null}
              onClick={async () => {
                setBusyId(v.id);
                try {
                  const result = await rollback(blockKey, v.id);
                  onRestored(result.data);
                  const fresh = await getVersions(blockKey);
                  setVersions(fresh);
                } catch (err) {
                  setError(err instanceof Error ? err.message : "Не удалось восстановить версию");
                } finally {
                  setBusyId(null);
                }
              }}
            >
              {busyId === v.id ? "Восстанавливаю…" : "Восстановить"}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
