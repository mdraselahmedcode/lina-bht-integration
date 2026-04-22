// // types/lifePhase.ts
// export interface PhaseOption {
//   id: string;
//   label: string;
//   value: string;
//   leftIcon: ((color: string) => React.ReactNode) | null;
// }

// export interface LifePhaseData {
//   selectedPhase: string | null;
//   customPhase: string;
//   pregnancyMonth: number;
// }

import { ReactNode } from 'react';

export interface PhaseOption {
  id: string;
  label: string;
  value: string;
  leftIcon: ((color: string) => ReactNode) | null;
}

export interface LifePhaseData {
  selectedPhase: string | null;
  customPhase: string;
  pregnancyMonth: number;
}

export type PhaseIconType = 'period' | 'pregnant' | 'postpartum' | 'menopause';
