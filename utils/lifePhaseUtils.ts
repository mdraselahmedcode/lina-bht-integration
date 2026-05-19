// utils/lifePhaseUtils.ts

export const parseLifePhase = (lifePhase: string | null | undefined) => {
  if (!lifePhase) return { phase: null, customText: '', pregnancyMonth: 1 };

  // "pregnant (6)" → { phase: 'pregnant', pregnancyMonth: 6 }
  const pregnantMatch = lifePhase.match(/^pregnant\s*\((\d+)\)$/);
  if (pregnantMatch) {
    return { phase: 'pregnant', customText: '', pregnancyMonth: parseInt(pregnantMatch[1], 10) };
  }

  // "other: some text" → { phase: 'other', customText: 'some text' }
  const otherMatch = lifePhase.match(/^other:\s*(.+)$/);
  if (otherMatch) {
    return { phase: 'other', customText: otherMatch[1], pregnancyMonth: 1 };
  }

  // "none", "menopause", "period", etc.
  return { phase: lifePhase, customText: '', pregnancyMonth: 1 };
};
