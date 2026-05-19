// // constants/lifePhaseConstants.tsx
// import React from 'react';
// import { MenoPauseIcon, PeriodIcon, PostpartumIcon, PregnantIcon } from '@/components/icons';
// import { PhaseOption } from '@/types/lifePhase';

// export const CURRENT_PHASE: PhaseOption[] = [
//   {
//     id: 'period',
//     label: 'On my period',
//     value: 'period',
//     leftIcon: (color: string) => (
//       <PeriodIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
//     ),
//   },
//   {
//     id: 'pregnant',
//     label: 'Pregnant',
//     value: 'pregnant',
//     leftIcon: (color: string) => (
//       <PregnantIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
//     ),
//   },
//   {
//     id: 'postpartum',
//     label: 'Postpartum',
//     value: 'postpartum',
//     leftIcon: (color: string) => (
//       <PostpartumIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
//     ),
//   },
//   {
//     id: 'menopause',
//     label: 'Menopause',
//     value: 'menopause',
//     leftIcon: (color: string) => (
//       <MenoPauseIcon size={24} color={color} style={{ marginLeft: 6 }} />
//     ),
//   },
//   {
//     id: 'other',
//     label: 'Other',
//     value: 'other',
//     leftIcon: null,
//   },
// ];

// constants/lifePhaseConstants.tsx
import React from 'react';
import { MenoPauseIcon, PeriodIcon, PostpartumIcon, PregnantIcon } from '@/components/icons';
import { PhaseOption } from '@/types/lifePhase';
import { lifePhaseType } from '@/store/api/onboardingApi';

export const CURRENT_PHASE = [
  {
    id: 'period',
    label: 'On my period',
    value: 'on my period' as lifePhaseType, // ✅ matches API
    leftIcon: (color: string) => (
      <PeriodIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
  {
    id: 'pregnant',
    label: 'Pregnant',
    value: 'pregnant' as lifePhaseType,
    leftIcon: (color: string) => (
      <PregnantIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
  {
    id: 'postpartum',
    label: 'Postpartum',
    value: 'postpartum' as lifePhaseType,
    leftIcon: (color: string) => (
      <PostpartumIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
  {
    id: 'menopause',
    label: 'Menopause',
    value: 'menopause' as lifePhaseType,
    leftIcon: (color: string) => (
      <MenoPauseIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
  {
    id: 'none',
    label: 'None',
    value: 'none' as lifePhaseType,
  },
  {
    id: 'other',
    label: 'Other',
    value: 'other' as lifePhaseType,
  },
];
