// types/progress.ts
export type TabType = 'analytics' | 'beforeAfter';
export type ScanType = 'face' | 'hair';

export interface ScoreData {
  week: string;
  score: number;
  date: string;
}

export interface BeforeAfterItem {
  id: string;
  before: string;
  after: string;
  date: string;
  message: string;
}
