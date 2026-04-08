// hooks/useProgressData.ts
import { useState, useMemo } from 'react';
import { ScanType, ScoreData, BeforeAfterItem } from '@/types/progress';

// Face Scan Data
const faceWeeklyScores: ScoreData[] = [
  { week: 'W1', score: 45, date: 'Jan 1' },
  { week: 'W2', score: 52, date: 'Jan 8' },
  { week: 'W3', score: 48, date: 'Jan 15' },
  { week: 'W4', score: 58, date: 'Jan 22' },
  { week: 'W5', score: 65, date: 'Jan 29' },
  { week: 'W6', score: 72, date: 'Feb 5' },
  { week: 'W7', score: 78, date: 'Feb 12' },
  { week: 'W8', score: 82, date: 'Feb 19' },
];

const hairWeeklyScores: ScoreData[] = [
  { week: 'W1', score: 38, date: 'Jan 1' },
  { week: 'W2', score: 42, date: 'Jan 8' },
  { week: 'W3', score: 45, date: 'Jan 15' },
  { week: 'W4', score: 50, date: 'Jan 22' },
  { week: 'W5', score: 55, date: 'Jan 29' },
  { week: 'W6', score: 60, date: 'Feb 5' },
  { week: 'W7', score: 65, date: 'Feb 12' },
  { week: 'W8', score: 68, date: 'Feb 19' },
];

const faceBeforeAfterData: BeforeAfterItem[] = [
  {
    id: '1',
    before: 'https://randomuser.me/api/portraits/women/68.jpg',
    after: 'https://randomuser.me/api/portraits/women/44.jpg',
    date: 'Week 1 → Week 8',
    message: 'Noticeable reduction in redness and improved hydration.',
  },
  {
    id: '2',
    before: 'https://randomuser.me/api/portraits/women/32.jpg',
    after: 'https://randomuser.me/api/portraits/women/55.jpg',
    date: 'Week 2 → Week 6',
    message: 'Significant improvement in skin texture and glow.',
  },
  {
    id: '3',
    before: 'https://randomuser.me/api/portraits/women/91.jpg',
    after: 'https://randomuser.me/api/portraits/women/79.jpg',
    date: 'Week 3 → Week 7',
    message: 'Reduced pore size and better skin barrier function.',
  },
];

const hairBeforeAfterData: BeforeAfterItem[] = [
  {
    id: '1',
    before: 'https://randomuser.me/api/portraits/women/68.jpg',
    after: 'https://randomuser.me/api/portraits/women/44.jpg',
    date: 'Week 1 → Week 8',
    message: 'Reduced dandruff and improved scalp health.',
  },
  {
    id: '2',
    before: 'https://randomuser.me/api/portraits/women/32.jpg',
    after: 'https://randomuser.me/api/portraits/women/55.jpg',
    date: 'Week 2 → Week 6',
    message: 'Less oiliness and healthier hair follicles.',
  },
  {
    id: '3',
    before: 'https://randomuser.me/api/portraits/women/91.jpg',
    after: 'https://randomuser.me/api/portraits/women/79.jpg',
    date: 'Week 3 → Week 7',
    message: 'Reduced scalp irritation and stronger hair.',
  },
];

export const useProgressData = (scanType: ScanType) => {
  const currentScores = scanType === 'face' ? faceWeeklyScores : hairWeeklyScores;
  const currentBeforeAfter = scanType === 'face' ? faceBeforeAfterData : hairBeforeAfterData;

  const improvement = useMemo(() => {
    const firstScore = currentScores[0]?.score || 0;
    const lastScore = currentScores[currentScores.length - 1]?.score || 0;
    return ((lastScore - firstScore) / firstScore) * 100;
  }, [currentScores]);

  const chartData = useMemo(() => {
    return currentScores.map((item) => ({
      value: item.score,
      label: item.week,
      dataPointText: item.score.toString(),
    }));
  }, [currentScores]);

  return {
    scores: currentScores,
    beforeAfterData: currentBeforeAfter,
    chartData,
    improvement,
  };
};
