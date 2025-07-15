export async function fetchMarkdown(path: string): Promise<string> {
  try {
    const response = await fetch(path);
    const text = await response.text();

    const isHtml = text.trim().startsWith('<!DOCTYPE html>') || text.includes('<head>');

    if (!response.ok || isHtml) {
      throw new Error(`Файл ${path} не найден или некорректный формат`);
    }

    return text;
  } catch (err) {
    throw new Error(`Ошибка загрузки файла: ${path}`);
    console.log(err);
  }
}
