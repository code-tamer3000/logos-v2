export type PathKey = string | number;

export function getAtPath(obj: unknown, path: PathKey[]): unknown {
  let cur = obj;
  for (const key of path) {
    if (cur == null) return undefined;
    cur = (cur as Record<PathKey, unknown>)[key];
  }
  return cur;
}

/** Иммутабельно возвращает копию obj с изменённым значением по пути path. */
export function setAtPath<T>(obj: T, path: PathKey[], value: unknown): T {
  if (path.length === 0) return value as T;
  const [key, ...rest] = path;
  const isArrayKey = typeof key === "number";

  if (Array.isArray(obj)) {
    const copy = obj.slice();
    copy[key as number] = setAtPath(copy[key as number], rest, value);
    return copy as T;
  }

  const source = (obj ?? (isArrayKey ? [] : {})) as Record<PathKey, unknown>;
  const copy: Record<PathKey, unknown> = { ...source };
  copy[key] = setAtPath(copy[key], rest, value);
  return copy as T;
}
