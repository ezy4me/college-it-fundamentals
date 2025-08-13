import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import csharp from 'react-syntax-highlighter/dist/esm/languages/hljs/csharp';
import typescript from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';

import { useState, useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import { Copy, Check } from 'lucide-react';
import styles from './CodeBlock.module.scss';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('ts', typescript);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('csharp', csharp);

interface CodeBlockProps {
  className?: string;
  children?: ReactNode;
}

const LANGUAGE_LABELS: Record<string, string> = {
  js: 'JavaScript',
  javascript: 'JavaScript',
  ts: 'TypeScript',
  typescript: 'TypeScript',
  python: 'Python',
  csharp: 'C#',
};

export const CodeBlock: FC<CodeBlockProps> = ({ className = '', children, ...props }) => {
  const match = /language-(\w+)/.exec(className);
  const codeText = String(children).replace(/\n$/, '');

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
    } catch {
      console.error('COPY ERROR');
    }
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  if (match) {
    const language = match[1];
    const label = LANGUAGE_LABELS[language.toLowerCase()] ?? language;

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <span className={styles.language}>{label}</span>
          <button
            className={styles.copyBtn}
            onClick={handleCopy}
            aria-label="Скопировать код"
            type="button"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>

        <SyntaxHighlighter
          style={vs2015}
          language={language}
          PreTag="div"
          showLineNumbers
          className={styles.code}
          {...props}
        >
          {codeText}
        </SyntaxHighlighter>
      </div>
    );
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
};
