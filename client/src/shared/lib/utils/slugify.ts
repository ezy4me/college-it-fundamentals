export default function createSlugify() {
  const slugCounts = new Map<string, number>();

  return (text: string) => {
    let slug = text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s]+/g, "-")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!slug) {
      slug = "section";
    }

    const count = slugCounts.get(slug) ?? 0;
    slugCounts.set(slug, count + 1);

    return count === 0 ? slug : `${slug}-${count}`;
  };
}
