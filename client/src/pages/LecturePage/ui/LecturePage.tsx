import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MarkdownRenderer } from "@/features/RenderMarkdown";
import { fetchMarkdown } from "@/shared/lib/utils/fetchMarkdown";
import { ErrorMessage } from "@/entities/ErrorMessage/ui/ErrorMessage";
import { LoadingMessage } from "@/entities/LoadingMessage/ui/LoadingMessage";
import styles from "./LecturePage.module.scss";

export const LecturePage = () => {
  const { id, tab, materialId } = useParams<{
    id: string;
    tab: string;
    materialId: string;
  }>();

  const [markdown, setMarkdown] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !tab || !materialId) {
      setError("Некорректный адрес страницы.");
      return;
    }

    const path = `/content/${id}/${tab}/${materialId}.md`;

    fetchMarkdown(path)
      .then(setMarkdown)
      .catch((err) => setError(err.message || "Неизвестная ошибка"));
  }, [id, tab, materialId]);

  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!markdown) return <LoadingMessage />;

  return (
    <div className={styles.page}>
      <MarkdownRenderer markdown={markdown} />
    </div>
  );
};
