// constants/lifePhaseConstants.tsx
import React from 'react';
import { MenoPauseIcon, PeriodIcon, PostpartumIcon, PregnantIcon } from '@/components/icons';
import { PhaseOption } from '@/types/lifePhase';

export const CURRENT_PHASE: PhaseOption[] = [
  {
    id: 'period',
    label: 'On my period',
    value: 'period',
    leftIcon: (color: string) => (
      <PeriodIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
  {
    id: 'pregnant',
    label: 'Pregnant',
    value: 'pregnant',
    leftIcon: (color: string) => (
      <PregnantIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
  {
    id: 'postpartum',
    label: 'Postpartum',
    value: 'postpartum',
    leftIcon: (color: string) => (
      <PostpartumIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
  {
    id: 'menopause',
    label: 'Menopause',
    value: 'menopause',
    leftIcon: (color: string) => (
      <MenoPauseIcon size={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
  {
    id: 'other',
    label: 'Other',
    value: 'other',
    leftIcon: null,
  },
];
