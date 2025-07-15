import ReactMarkdown from 'react-markdown';
import { CodeBlock } from '@/shared';
import { ImageBlock } from '@/shared';
import styles from './MarkdownRenderer.module.scss';

interface Props {
  markdown: string;
}

export const MarkdownRenderer = ({ markdown }: Props) => {
  return (
    <div className={styles.markdown}>
      <ReactMarkdown
        components={{
          h1: (props) => <h1 className={styles.h1} {...props} />,
          h2: (props) => <h2 className={styles.h2} {...props} />,
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
