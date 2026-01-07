export interface PresentationSlide {
  id: string;
  title: string;
  blocks: LectureContentBlock[]; 
  notes?: string;
  order: number;
  metadata?: {
    type?: 'theory' | 'code' | 'image' | 'quiz' | 'exercise';
    duration?: number; 
    keywords?: string[];
  };
}

export interface Presentation {
  id: string;
  lectureId: string;
  title: string;
  slides: PresentationSlide[];
  settings: {
    theme: 'light' | 'dark' | 'auto';
    showProgress: boolean;
    showNotes: boolean;
    autoAdvance: boolean;
    autoAdvanceDelay: number; 
  };
  metadata: {
    totalSlides: number;
    estimatedTime: number; 
    createdAt: string;
  };
}

export type LectureContentBlock =
  | { type: 'header'; level: number; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'code'; language: string; code: string }
  | { type: 'image'; src: string; alt?: string };