import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';
import type{ Root, Heading, Text, InlineCode } from 'mdast';

export interface HeadingInfo {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(markdown: string, slugify: (text: string) => string): HeadingInfo[] {
  const tree = unified().use(remarkParse).parse(markdown) as Root;
  const headings: HeadingInfo[] = [];

  visit(tree, 'heading', (node: Heading) => {
    const level = node.depth;

    const text = node.children
      .filter((child): child is Text | InlineCode => child.type === 'text' || child.type === 'inlineCode')
      .map((child) => child.value)
      .join('');

    const id = slugify(text);

    headings.push({ id, text, level });
  });

  return headings;
}
