import { createContext, useContext as useReactContext, useEffect, useState, type ReactNode } from "react";
import defaults from "../../content/defaults.json";

type ContentMap = Record<string, unknown>;

const CACHE_KEY = "site-content-cache-v1";
/** Экспортирован для SSR/тестового рендера, где нужен свой Provider без localStorage/fetch. */
export const ContentContext = createContext<ContentMap>(defaults as ContentMap);

function readCache(): ContentMap | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as ContentMap) : null;
  } catch {
    return null;
  }
}

function writeCache(data: ContentMap) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // приватный режим / квота — не критично, просто не кэшируем
  }
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentMap>(() => readCache() ?? (defaults as ContentMap));

  useEffect(() => {
    let cancelled = false;
    fetch("/api/content")
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data: ContentMap) => {
        if (cancelled) return;
        setContent(data);
        writeCache(data);
      })
      .catch(() => {
        // Сеть/сервер недоступны — остаёмся на кэше или дефолтах, сайт не должен падать.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

/** Возвращает данные блока контента по ключу (см. content/defaults.json и src/content/schema.ts). */
export function useContent<T = unknown>(blockKey: string): T {
  const content = useReactContext(ContentContext);
  const value = content[blockKey] ?? (defaults as ContentMap)[blockKey];
  return value as T;
}
