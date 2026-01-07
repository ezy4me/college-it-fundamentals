import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';

import { MarkdownRenderer } from '@/features/RenderMarkdown';
import { extractHeadings } from '@/features/RenderMarkdown/lib/extractHeadings';
import createSlugify from '@/shared/lib/utils/slugify';

import styles from './PresentationModal.module.scss';

interface Slide {
  id: string;
  title: string;
  content: string;
  order: number;
}

interface PresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: Slide[];
  title: string;
}

export const PresentationModal: React.FC<PresentationModalProps> = ({
  isOpen,
  onClose,
  slides,
  title,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const slugify = createSlugify();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPrevSlide();
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        goToNextSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSlideIndex]);

  const goToPrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const goToNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startX = touch.clientX;
    
    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      const endX = touch.clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goToNextSlide(); 
        } else {
          goToPrevSlide(); 
        }
      }
    };
    
    document.addEventListener('touchend', handleTouchEnd, { once: true });
  };

  if (!isOpen) return null;

  const currentSlide = slides[currentSlideIndex];
  const progress = ((currentSlideIndex + 1) / slides.length) * 100;
  const headings = extractHeadings(currentSlide.content, slugify);

  return (
    <div 
      className={`${styles.modalOverlay} ${isFullscreen ? styles.fullscreen : ''}`}
      onClick={onClose}
      onTouchStart={handleTouchStart}
    >
      <div 
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Верхняя панель */}
        <div className={styles.topBar}>
          <div className={styles.titleSection}>
            <h2 className={styles.presentationTitle}>{title}</h2>
            <span className={styles.slideCounter}>
              {currentSlideIndex + 1} из {slides.length}
            </span>
          </div>
          
          <div className={styles.controls}>
            <button 
              className={styles.controlButton}
              onClick={toggleFullscreen}
              title={isFullscreen ? "Выйти из полноэкранного режима (F)" : "Полный экран (F)"}
            >
              {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>
            <button 
              className={styles.controlButton} 
              onClick={onClose}
              title="Закрыть (Esc)"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Прогресс-бар */}
        <div className={styles.progressBarContainer}>
          <div 
            className={styles.progressBar}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Слайд */}
        <div className={styles.slideContainer}>
          <div className={styles.slideContent}>
            <h3 className={styles.slideTitle}>{currentSlide.title}</h3>
            <div className={styles.slideBody}>
              <MarkdownRenderer 
                markdown={currentSlide.content}
                headings={headings}
              />
            </div>
          </div>
        </div>

        {/* Навигация */}
        <div className={styles.navigation}>
          <button
            className={`${styles.navButton} ${currentSlideIndex === 0 ? styles.disabled : ''}`}
            onClick={goToPrevSlide}
            disabled={currentSlideIndex === 0}
            title="Предыдущий слайд (←, PageUp)"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className={styles.slideIndicators}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.slideIndicator} ${index === currentSlideIndex ? styles.active : ''}`}
                onClick={() => setCurrentSlideIndex(index)}
                title={`Перейти к слайду ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            className={`${styles.navButton} ${currentSlideIndex === slides.length - 1 ? styles.disabled : ''}`}
            onClick={goToNextSlide}
            disabled={currentSlideIndex === slides.length - 1}
            title="Следующий слайд (→, PageDown, Пробел)"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};