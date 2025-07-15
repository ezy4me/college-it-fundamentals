export async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Ошибка загрузки JSON: ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}
