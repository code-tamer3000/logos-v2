import { useEffect, useState } from "react";
import { blockGroups, blockSchemas } from "../content/schema";
import { getAllContent, logout, saveBlock } from "./api";
import { AdminAuthGate } from "./AdminAuthGate";
import { BlockForm } from "./BlockForm";
import { VersionHistory } from "./VersionHistory";
import "./admin.css";

function Editor({
  blockKey,
  label,
  initialValue,
}: {
  blockKey: string;
  label: string;
  initialValue: unknown;
}) {
  const [draft, setDraft] = useState(initialValue);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [historyKey, setHistoryKey] = useState(0);

  useEffect(() => {
    setDraft(initialValue);
    setSavedAt(null);
    setError(null);
  }, [blockKey, initialValue]);

  const schema = blockSchemas[blockKey];
  if (!schema) return <p className="adminHint">Для блока «{blockKey}» нет схемы формы.</p>;

  return (
    <div className="adminEditor">
      <div className="adminEditor__main">
        <div className="adminEditor__head">
          <h2 className="adminEditor__title">{label}</h2>
          <button
            type="button"
            className="adminBtn adminBtn--solid"
            disabled={saving}
            onClick={async () => {
              setSaving(true);
              setError(null);
              try {
                await saveBlock(blockKey, draft);
                setSavedAt(Date.now());
                setHistoryKey((k) => k + 1);
              } catch (err) {
                setError(err instanceof Error ? err.message : "Не удалось сохранить");
              } finally {
                setSaving(false);
              }
            }}
          >
            {saving ? "Сохраняю…" : "Сохранить"}
          </button>
        </div>
        {error && <p className="adminField__error">{error}</p>}
        {savedAt && !error && <p className="adminHint adminHint--ok">Сохранено.</p>}
        <BlockForm schema={schema} value={draft} onChange={setDraft} />
      </div>

      <aside className="adminEditor__history">
        <h3 className="adminEditor__historyTitle">История версий</h3>
        <VersionHistory key={historyKey} blockKey={blockKey} onRestored={setDraft} />
      </aside>
    </div>
  );
}

function AdminShell() {
  const [content, setContent] = useState<Record<string, unknown> | null>(null);
  const [selected, setSelected] = useState<string>(blockGroups[0].blocks[0].key);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllContent()
      .then(setContent)
      .catch((err) => setError(err instanceof Error ? err.message : "Не удалось загрузить контент"));
  }, []);

  const selectedLabel =
    blockGroups.flatMap((g) => g.blocks).find((b) => b.key === selected)?.label ?? selected;

  return (
    <div className="adminShell">
      <nav className="adminSidebar">
        <div className="adminSidebar__head">
          <span className="adminSidebar__title">Разделы</span>
          <button type="button" className="adminBtn adminBtn--tiny" onClick={() => void logout().then(() => location.reload())}>
            Выйти
          </button>
        </div>
        {blockGroups.map((group) => (
          <div key={group.title} className="adminSidebar__group">
            <p className="adminSidebar__groupTitle">{group.title}</p>
            {group.blocks.map((b) => (
              <button
                key={b.key}
                type="button"
                className={`adminSidebar__item${b.key === selected ? " is-active" : ""}`}
                onClick={() => setSelected(b.key)}
              >
                {b.label}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <main className="adminMain">
        {error && <p className="adminField__error">{error}</p>}
        {!content && !error && <p className="adminHint">Загрузка контента…</p>}
        {content && (
          <Editor key={selected} blockKey={selected} label={selectedLabel} initialValue={content[selected]} />
        )}
      </main>
    </div>
  );
}

export function AdminApp() {
  return (
    <AdminAuthGate>
      <AdminShell />
    </AdminAuthGate>
  );
}
