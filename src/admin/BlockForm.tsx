import { useRef, useState } from "react";
import type { ArrayField, Field, ObjectSchema } from "../content/schema";
import { getAtPath, setAtPath, type PathKey } from "./objectPath";
import { uploadMedia } from "./api";

type ChangeFn = (path: PathKey[], value: unknown) => void;

function TextField({ value, onChange, multiline }: { value: unknown; onChange: (v: string) => void; multiline?: boolean }) {
  const v = typeof value === "string" ? value : "";
  if (multiline) {
    return <textarea className="adminField__input adminField__input--area" value={v} onChange={(e) => onChange(e.target.value)} />;
  }
  return <input className="adminField__input" type="text" value={v} onChange={(e) => onChange(e.target.value)} />;
}

function ImageField({ value, onChange }: { value: unknown; onChange: (v: string) => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const url = typeof value === "string" ? value : "";

  async function handleFile(file: File) {
    setBusy(true);
    setError(null);
    try {
      const { url } = await uploadMedia(file);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось загрузить файл");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="adminField__image">
      {url ? (
        <img src={url} alt="" className="adminField__imagePreview" />
      ) : (
        <div className="adminField__imagePreview adminField__imagePreview--empty">нет картинки</div>
      )}
      <div className="adminField__imageActions">
        <button
          type="button"
          className="adminBtn adminBtn--ghost"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
        >
          {busy ? "Загрузка…" : url ? "Заменить" : "Загрузить"}
        </button>
        {url && (
          <button type="button" className="adminBtn adminBtn--ghost" onClick={() => onChange("")}>
            Убрать
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/svg+xml"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleFile(file);
            e.target.value = "";
          }}
        />
      </div>
      {error && <p className="adminField__error">{error}</p>}
    </div>
  );
}

function ArrayEditor({
  field,
  value,
  path,
  onChange,
}: {
  field: ArrayField;
  value: unknown;
  path: PathKey[];
  onChange: ChangeFn;
}) {
  const items = Array.isArray(value) ? value : [];
  // LeafField.kind — строка ("text"/"textarea"/...); ObjectSchema — карта полей,
  // так что field.of.kind (если есть ключ "kind" среди полей) будет объектом Field, не строкой.
  const isObjectItems = typeof (field.of as { kind?: unknown }).kind !== "string";

  function emptyItem(): unknown {
    if (isObjectItems) {
      const out: Record<string, unknown> = {};
      for (const [key, f] of Object.entries(field.of as ObjectSchema)) {
        out[key] = f.kind === "array" ? [] : "";
      }
      return out;
    }
    return "";
  }

  function replaceArray(next: unknown[]) {
    onChange(path, next);
  }

  return (
    <div className="adminField__array">
      {items.map((item, i) => (
        <div key={i} className="adminField__arrayItem">
          {!field.fixedLength && (
            <div className="adminField__arrayItemBar">
              <span className="adminField__arrayIndex">
                {field.itemLabel ?? "Пункт"} {i + 1}
              </span>
              <div className="adminField__arrayItemActions">
                <button
                  type="button"
                  className="adminBtn adminBtn--tiny"
                  disabled={i === 0}
                  onClick={() => {
                    const next = items.slice();
                    [next[i - 1], next[i]] = [next[i], next[i - 1]];
                    replaceArray(next);
                  }}
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="adminBtn adminBtn--tiny"
                  disabled={i === items.length - 1}
                  onClick={() => {
                    const next = items.slice();
                    [next[i], next[i + 1]] = [next[i + 1], next[i]];
                    replaceArray(next);
                  }}
                >
                  ↓
                </button>
                <button
                  type="button"
                  className="adminBtn adminBtn--tiny adminBtn--danger"
                  onClick={() => replaceArray(items.filter((_, idx) => idx !== i))}
                >
                  Удалить
                </button>
              </div>
            </div>
          )}
          {isObjectItems ? (
            <div className="adminField__nested">
              {Object.entries(field.of as ObjectSchema).map(([key, f]) => (
                <FieldEditor
                  key={key}
                  field={f}
                  value={(item as Record<string, unknown>)?.[key]}
                  path={[...path, i, key]}
                  onChange={onChange}
                />
              ))}
            </div>
          ) : (
            <FieldEditor field={field.of as Field} value={item} path={[...path, i]} onChange={onChange} />
          )}
        </div>
      ))}
      {!field.fixedLength && (
        <button
          type="button"
          className="adminBtn adminBtn--ghost"
          onClick={() => replaceArray([...items, emptyItem()])}
        >
          + Добавить
        </button>
      )}
    </div>
  );
}

export function FieldEditor({
  field,
  value,
  path,
  onChange,
}: {
  field: Field;
  value: unknown;
  path: PathKey[];
  onChange: ChangeFn;
}) {
  switch (field.kind) {
    case "text":
      return <TextField value={value} onChange={(v) => onChange(path, v)} />;
    case "textarea":
    case "richtext":
      return <TextField value={value} onChange={(v) => onChange(path, v)} multiline />;
    case "image":
      return <ImageField value={value} onChange={(v) => onChange(path, v)} />;
    case "array":
      return <ArrayEditor field={field} value={value} path={path} onChange={onChange} />;
    case "object":
      return (
        <div className="adminField__nested">
          {Object.entries(field.fields).map(([key, f]) => (
            <LabeledField
              key={key}
              field={f}
              value={(value as Record<string, unknown>)?.[key]}
              path={[...path, key]}
              onChange={onChange}
            />
          ))}
        </div>
      );
  }
}

function LabeledField({
  field,
  value,
  path,
  onChange,
}: {
  field: Field;
  value: unknown;
  path: PathKey[];
  onChange: ChangeFn;
}) {
  if (field.kind === "richtext") {
    return (
      <label className="adminField">
        <span className="adminField__label">
          {field.label} <em className="adminField__hint">(перенос строки — Enter, новый абзац — пустая строка, {"{{"}акцент{"}}"})</em>
        </span>
        <FieldEditor field={field} value={value} path={path} onChange={onChange} />
      </label>
    );
  }
  return (
    <label className="adminField">
      <span className="adminField__label">{field.label}</span>
      <FieldEditor field={field} value={value} path={path} onChange={onChange} />
    </label>
  );
}

export function BlockForm({
  schema,
  value,
  onChange,
}: {
  schema: ObjectSchema;
  value: unknown;
  onChange: (next: unknown) => void;
}) {
  function handleFieldChange(path: PathKey[], v: unknown) {
    onChange(setAtPath(value, path, v));
  }

  return (
    <div className="adminForm">
      {Object.entries(schema).map(([key, field]) => (
        <LabeledField
          key={key}
          field={field}
          value={getAtPath(value, [key])}
          path={[key]}
          onChange={handleFieldChange}
        />
      ))}
    </div>
  );
}
