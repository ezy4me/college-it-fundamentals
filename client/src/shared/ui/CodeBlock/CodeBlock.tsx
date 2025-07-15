import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './CodeBlock.module.scss';
import type { FC, ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  className?: string;
  children?: ReactNode;
}

export const CodeBlock: FC<CodeBlockProps> = ({ className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');
  const [copied, setCopied] = useState(false);

  const codeText = String(children).replace(/\n$/, '');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
    } catch {
      console.log("COPY ERROR");
      
    }
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  if (match) {
    return (
      <div className={styles.wrapper}>
        <button
          className={styles.copyBtn}
          onClick={handleCopy}
          aria-label="Copy code"
          type="button"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
        <SyntaxHighlighter
          style={okaidia}
          language={match[1]}
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
