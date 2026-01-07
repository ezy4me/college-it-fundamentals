import { Download, Presentation } from "lucide-react";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { CodeBlock } from "@/shared/ui/CodeBlock";
import { ImageBlock } from "@/shared/ui/ImageBlock";

import styles from "./MarkdownRenderer.module.scss";

import type { HeadingInfo } from "../lib/extractHeadings";

interface Props {
  markdown: string;
  headings: HeadingInfo[];
  onDownloadPdf?: () => void;
  onOpenPresentation?: () => void;
  isDownloading?: boolean;
}

function getText(children: React.ReactNode): string {
  if (typeof children === "string") return children;

  if (Array.isArray(children)) {
    return children.map(getText).join("");
  }

  if (React.isValidElement(children)) {
    const el = children as React.ReactElement<{ children?: React.ReactNode }>;
    return getText(el.props.children ?? "");
  }

  return "";
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

export const MarkdownRenderer = ({
  markdown,
  headings,
  onDownloadPdf,
  onOpenPresentation,
  isDownloading = false,
}: Props) => {
  const handleDownload = () => {
    if (onDownloadPdf) {
      onDownloadPdf();
    }
  };

  const handlePresentation = () => {
    if (onOpenPresentation) {
      onOpenPresentation();
    }
  };

  return (
    <div className={styles.markdown}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children, ...props }) => {
            const text = getText(children);
            const id = getHeadingIdByText(1, text, headings);
            return (
              <div className={styles.h1Container}>
                <h1 {...props} id={id} className={styles.markdownH1}>
                  {children}
                </h1>
                {(onOpenPresentation || onDownloadPdf) && (
                  <div className={styles.headerButtons}>
                    {onOpenPresentation && (
                      <button
                        onClick={handlePresentation}
                        className={styles.presentationButton}
                        title="Открыть презентацию">
                        <Presentation size={20} />
                      </button>
                    )}
                    {onDownloadPdf && (
                      <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className={styles.downloadButton}
                        title="Скачать PDF">
                        {isDownloading ? (
                          <div className={styles.spinner} />
                        ) : (
                          <Download size={20} />
                        )}
                      </button>
                    )}
                    
                  </div>
                )}
              </div>
            );
          },
          h2: ({ children, ...props }) => {
            const text = getText(children);
            const id = getHeadingIdByText(2, text, headings);
            return (
              <h2 {...props} id={id} className={styles.markdownH2}>
                {children}
              </h2>
            );
          },
          h3: ({ children, ...props }) => {
            const text = getText(children);
            const id = getHeadingIdByText(3, text, headings);
            return (
              <h3 {...props} id={id} className={styles.markdownH3}>
                {children}
              </h3>
            );
          },
          p: (props) => <div {...props} className={styles.markdownParagraph} />,
          img: (props) => <ImageBlock {...props} />,
          code: (props) => <CodeBlock {...props} />,
          a: (props) => <a {...props} className={styles.markdownLink} />,
          blockquote: (props) => (
            <blockquote {...props} className={styles.markdownBlockquote} />
          ),
          table: (props) => (
            <div className={styles.markdownTableWrapper}>
              <table {...props} className={styles.markdownTable} />
            </div>
          ),
          caption: (props) => (
            <caption {...props} className={styles.markdownTableCaption} />
          ),
          ul: (props) => <ul {...props} className={styles.markdownList} />,
          ol: (props) => <ol {...props} className={styles.markdownList} />,
          li: (props) => <li {...props} className={styles.markdownListItem} />,
          hr: (props) => <hr {...props} className={styles.markdownDivider} />,
        }}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
};