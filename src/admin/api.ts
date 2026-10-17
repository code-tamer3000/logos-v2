async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  const body = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error((body as { error?: string } | null)?.error || `Ошибка запроса (${res.status})`);
  }
  return body as T;
}

export function login(password: string) {
  return request<{ ok: true }>("/api/auth/login", { method: "POST", body: JSON.stringify({ password }) });
}

export function logout() {
  return request<{ ok: true }>("/api/auth/logout", { method: "POST" });
}

export function getMe() {
  return request<{ authenticated: boolean }>("/api/auth/me");
}

export function getAllContent() {
  return request<Record<string, unknown>>("/api/content");
}

export function saveBlock(key: string, data: unknown) {
  return request<{ blockKey: string; data: unknown; updatedAt: string }>(
    `/api/content/${encodeURIComponent(key)}`,
    { method: "PUT", body: JSON.stringify(data) },
  );
}

export function getVersions(key: string) {
  return request<{ id: number; created_at: string }[]>(
    `/api/content/${encodeURIComponent(key)}/versions`,
  );
}

export function rollback(key: string, versionId: number) {
  return request<{ blockKey: string; data: unknown; updatedAt: string }>(
    `/api/content/${encodeURIComponent(key)}/rollback/${versionId}`,
    { method: "POST" },
  );
}

export async function uploadMedia(file: File): Promise<{ url: string }> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/media", { method: "POST", body: form });
  const body = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error((body as { error?: string } | null)?.error || `Не удалось загрузить файл (${res.status})`);
  }
  return body as { url: string };
}
