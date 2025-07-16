import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from '@/shared/ui/CodeBlock';
import { ImageBlock } from '@/shared/ui/ImageBlock';
import styles from './MarkdownRenderer.module.scss';
import type { HeadingInfo } from '../lib/extractHeadings';

interface Props {
  markdown: string;
  headings: HeadingInfo[];
}

function getText(children: React.ReactNode): string {
  if (typeof children === 'string') return children;

  if (Array.isArray(children)) {
    return children.map(getText).join('');
  }

  if (React.isValidElement(children)) {
    const el = children as React.ReactElement<{ children?: React.ReactNode }>;
    return getText(el.props.children ?? '');
  }

  return '';
}


function getHeadingIdByText(
  level: number,
  text: string,
  headings: HeadingInfo[]
): string | undefined {
  const match = headings.find(
    (h) => h.level === level && h.text.trim() === text.trim()
  );
  return match?.id;
}

export const MarkdownRenderer = ({ markdown, headings }: Props) => {
  return (
    <div className={styles.markdown}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children, ...props }) => {
            const text = getText(children);
            const id = getHeadingIdByText(1, text, headings);
            return (
              <h1 {...props} id={id} className={styles.h1}>
                {children}
              </h1>
            );
          },
          h2: ({ children, ...props }) => {
            const text = getText(children);
            const id = getHeadingIdByText(2, text, headings);
            return (
              <h2 {...props} id={id} className={styles.h2}>
                {children}
              </h2>
            );
          },
          h3: ({ children, ...props }) => {
            const text = getText(children);
            const id = getHeadingIdByText(3, text, headings);
            return (
              <h3 {...props} id={id} className={styles.h3}>
                {children}
              </h3>
            );
          },
          p: (props) => <p className={styles.paragraph} {...props} />,
          code: CodeBlock,
          img: ImageBlock,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};
