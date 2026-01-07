import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import { ErrorMessage } from "@/entities/ErrorMessage/ui/ErrorMessage";
import { LoadingMessage } from "@/entities/LoadingMessage/ui/LoadingMessage";
import { parseSlides } from "@/features/Presentation/lib/simpleParser";
import { PresentationModal } from "@/features/Presentation/ui/PresentationModal/PresentationModal";
import { MarkdownRenderer, MarkdownToc } from "@/features/RenderMarkdown";
import { extractHeadings, type HeadingInfo } from "@/features/RenderMarkdown/lib/extractHeadings";
import { useAnchorScroll } from "@/shared/lib/hooks/useAnchorScroll";
import { fetchMarkdown } from "@/shared/lib/utils/fetchMarkdown";
import createSlugify from "@/shared/lib/utils/slugify";

import styles from "./LecturePage.module.scss";

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

  const [showPresentation, setShowPresentation] = useState(false);
  const [presentationSlides, setPresentationSlides] = useState<any[]>([]);
  const [presentationTitle, setPresentationTitle] = useState("");

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

  const checkPresentationExists = async () => {
    if (!id || !materialId) return null;

    try {
      const presentationPath = `/content/${id}/presentations/${materialId}.md`;
      const response = await fetch(presentationPath);

      if (response.ok) {
        const presentationMarkdown = await response.text();
        const slides = parseSlides(presentationMarkdown);
        const titleMatch = presentationMarkdown.match(/^# (.+)$/m);
        setPresentationTitle(titleMatch ? titleMatch[1] : "Презентация");
        setPresentationSlides(slides);
        return true;
      }
      return false;
    } catch (error) {
      console.log("Презентация не найдена:", error);
      return false;
    }
  };

  const handleOpenPresentation = async () => {
    if (presentationSlides.length > 0) {
      setShowPresentation(true);
      return;
    }

    const hasPresentation = await checkPresentationExists();
    if (hasPresentation) {
      setShowPresentation(true);
    } else {
      alert("Презентация для этой лекции не найдена.");
    }
  };

  const getPdfUrl = (fileName: string) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
    return `${baseUrl}/pdf/files/${fileName}`;
  };

  const checkPdfExists = async () => {
    if (!id || !tab || !materialId) return;

    try {
      const pdfFileName = `${id}_${tab}_${materialId}.pdf`;
      const pdfUrl = getPdfUrl(pdfFileName);

      console.log("Проверяем PDF по URL:", pdfUrl);

      const response = await fetch(pdfUrl, { method: "HEAD" });

      console.log("Статус ответа:", response.status);

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

  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!markdown) return <LoadingMessage />;

  return (
    <>
      <div className={styles.page}>
        <MarkdownRenderer
          markdown={markdown}
          headings={headings}
          onDownloadPdf={hasPdf ? handleDownloadPdf : undefined}
          onOpenPresentation={handleOpenPresentation}
          isDownloading={isDownloading}
        />
        <hr className={styles.pageDivider} />
        <MarkdownToc headings={headings} />
      </div>

      {showPresentation && presentationSlides.length > 0 && (
        <PresentationModal
          isOpen={showPresentation}
          onClose={() => setShowPresentation(false)}
          slides={presentationSlides}
          title={presentationTitle}
        />
      )}
    </>
  );
};
