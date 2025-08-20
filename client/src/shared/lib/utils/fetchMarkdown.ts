export async function fetchMarkdown(path: string): Promise<string> {
  try {
    const cacheBypassPath = `${path}?t=${Date.now()}`;
    const response = await fetch(cacheBypassPath);
    const text = await response.text();

    const isHtml = text.trim().startsWith('<!doctype html>');

    if (!response.ok || isHtml) {
      throw new Error(`Файл ${path} не найден или имеет некорректный формат`);
    }

    return text;
  } catch (err) {
    console.error(err);
    throw new Error(`Ошибка загрузки файла: ${path}`);
  }
}
