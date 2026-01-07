export interface Slide {
  id: string;
  title: string;
  content: string;
  order: number;
}

export function parseSlides(markdown: string): Slide[] {
  const slides: Slide[] = [];

  const sections = markdown.split("\n---\n");

  sections.forEach((section, index) => {
    const lines = section.trim().split("\n");
    let title = `Слайд ${index + 1}`;
    let content = section;

    for (const line of lines) {
      if (line.startsWith("# ")) {
        title = line.replace("# ", "");
        content = lines.slice(1).join("\n").trim();
        break;
      }
      if (line.startsWith("## ")) {
        title = line.replace("## ", "");
        content = lines.slice(1).join("\n").trim();
        break;
      }
    }

    slides.push({
      id: `slide-${index}`,
      title: title.trim(),
      content: content.trim(),
      order: index,
    });
  });

  return slides;
}
