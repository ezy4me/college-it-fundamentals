import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { MarkdownRenderer, MarkdownToc } from "@/features/RenderMarkdown";
import { fetchMarkdown } from "@/shared/lib/utils/fetchMarkdown";
import {
  extractHeadings,
  type HeadingInfo,
} from "@/features/RenderMarkdown/lib/extractHeadings";
import { ErrorMessage } from "@/entities/ErrorMessage/ui/ErrorMessage";
import { LoadingMessage } from "@/entities/LoadingMessage/ui/LoadingMessage";
import createSlugify from "@/shared/lib/utils/slugify";
import styles from "./LecturePage.module.scss";
import { useAnchorScroll } from "@/shared/lib/hooks/useAnchorScroll";

export const LecturePage = () => {
  const { id, tab, materialId } = useParams<{
    id: string;
    tab: string;
    materialId: string;
  }>();
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [headings, setHeadings] = useState<HeadingInfo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasPdf, setHasPdf] = useState<boolean | null>(null);

  const slugifyRef = useRef(createSlugify());

  useAnchorScroll();

  useEffect(() => {
    if (!id || !tab || !materialId) {
      setError("Некорректный адрес страницы.");
      return;
    }

    const path = `/content/${id}/${tab}/${materialId}.md`;
    console.log(path);

    fetchMarkdown(path)
      .then((md) => {
        setMarkdown(md);
        const extracted = extractHeadings(md, slugifyRef.current);
        setHeadings(extracted);
      })
      .catch((err) => setError(err.message || "Неизвестная ошибка"));

    checkPdfExists();
  }, [id, tab, materialId]);

  const getPdfUrl = (fileName: string) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
    return `${baseUrl}/pdf/files/${fileName}`;
  };

  const checkPdfExists = async () => {
    if (!id || !tab || !materialId) return;

    try {
      const pdfFileName = `${id}_${tab}_${materialId}.pdf`;
      const pdfUrl = getPdfUrl(pdfFileName);

      console.log("Проверяем PDF по URL:", pdfUrl); // Добавим лог для отладки

      const response = await fetch(pdfUrl, { method: "HEAD" });

      console.log("Статус ответа:", response.status); // Лог статуса

      setHasPdf(response.ok);
    } catch (error) {
      console.error("Ошибка при проверке PDF:", error);
      setHasPdf(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!id || !tab || !materialId || hasPdf === false) return;

    setIsDownloading(true);
    try {
      const pdfFileName = `${id}_${tab}_${materialId}.pdf`;
      const pdfUrl = getPdfUrl(pdfFileName);

      const response = await fetch(pdfUrl);

      if (!response.ok) {
        throw new Error("PDF файл не найден");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = pdfFileName;

      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Ошибка при скачивании PDF:", error);
      alert("PDF файл не найден для данного материала");
      setHasPdf(false);
    } finally {
      setIsDownloading(false);
    }
  };

  // Добавим отладочную информацию
  console.log("hasPdf:", hasPdf);
  console.log("id, tab, materialId:", id, tab, materialId);

  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!markdown) return <LoadingMessage />;

  return (
    <div className={styles.page}>
      <MarkdownRenderer
        markdown={markdown}
        headings={headings}
        onDownloadPdf={hasPdf ? handleDownloadPdf : undefined}
        isDownloading={isDownloading}
      />
      <hr className={styles.pageDivider} />
      <MarkdownToc headings={headings} />
    </div>
  );
};
