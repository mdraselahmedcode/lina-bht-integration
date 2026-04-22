// components/lifePhase/PhaseIcon.tsx
import React from 'react';
import { MenoPauseIcon, PeriodIcon, PostpartumIcon, PregnantIcon } from '@/components/icons';
import { PhaseIconType } from '@/types/phaseIcon';

interface PhaseIconProps {
  type: PhaseIconType;
  color: string;
}

export function PhaseIcon({ type, color }: PhaseIconProps) {
  const iconProps = { width: 24, height: 24, color, style: { marginLeft: 6 } };
  const menoProps = { size: 24, color, style: { marginLeft: 6 } };

  switch (type) {
    case 'period':
      return <PeriodIcon {...iconProps} />;
    case 'pregnant':
      return <PregnantIcon {...iconProps} />;
    case 'postpartum':
      return <PostpartumIcon {...iconProps} />;
    case 'menopause':
      return <MenoPauseIcon {...menoProps} />;
    default:
      return null;
  }
}
