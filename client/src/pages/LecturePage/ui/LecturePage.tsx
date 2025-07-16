import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { MarkdownRenderer, MarkdownToc } from '@/features/RenderMarkdown';
import { fetchMarkdown } from '@/shared/lib/utils/fetchMarkdown';
import { extractHeadings, type HeadingInfo } from '@/features/RenderMarkdown/lib/extractHeadings';
import { ErrorMessage } from '@/entities/ErrorMessage/ui/ErrorMessage';
import { LoadingMessage } from '@/entities/LoadingMessage/ui/LoadingMessage';
import createSlugify from '@/shared/lib/utils/slugify';
import styles from './LecturePage.module.scss';
import { useAnchorScroll } from "@/shared/lib/hooks/useAnchorScroll";

export const LecturePage = () => {
  const { id, tab, materialId } = useParams<{ id: string; tab: string; materialId: string }>();
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [headings, setHeadings] = useState<HeadingInfo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const slugifyRef = useRef(createSlugify());

  useAnchorScroll();

  useEffect(() => {
    if (!id || !tab || !materialId) {
      setError('Некорректный адрес страницы.');
      return;
    }

    const path = `/content/${id}/${tab}/${materialId}.md`;

    fetchMarkdown(path)
      .then((md) => {
        setMarkdown(md);

        const extracted = extractHeadings(md, slugifyRef.current);
        setHeadings(extracted);
      })
      .catch((err) => setError(err.message || 'Неизвестная ошибка'));
  }, [id, tab, materialId]);

  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!markdown) return <LoadingMessage />;

  return (
    <div className={styles.page}>
      <MarkdownRenderer markdown={markdown} headings={headings} />
      <MarkdownToc headings={headings} />
    </div>
  );
};
