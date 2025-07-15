export type LectureContentBlock =
  | { type: 'header'; level: number; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'code'; language: string; code: string }
  | { type: 'image'; src: string; alt?: string };

export interface LectureJson {
  title: string;
  content: LectureContentBlock[];
}
