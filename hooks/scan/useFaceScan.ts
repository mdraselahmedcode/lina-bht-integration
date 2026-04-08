import { useRef, useState } from 'react';

type AngleType = 'front' | 'left' | 'right' | 'up' | 'down';

const STEPS: AngleType[] = ['front', 'left', 'right', 'up', 'down'];

export const useFaceScan = (onCapture: () => void) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [isAligned, setIsAligned] = useState(false);

  const stableCountRef = useRef(0);
  const lastPositionRef = useRef<{ x: number; y: number } | null>(null);

  const currentAngle = STEPS[stepIndex];

  const checkAngle = (face: any) => {
    const yaw = face.yawAngle || 0;
    const roll = face.rollAngle || 0;

    switch (currentAngle) {
      case 'front':
        return Math.abs(yaw) < 5;

      case 'left':
        return yaw < -15;

      case 'right':
        return yaw > 15;

      case 'up':
        return roll < -10;

      case 'down':
        return roll > 10;

      default:
        return false;
    }
  };

  const checkDistance = (face: any) => {
    const width = face.bounds.size.width;

    if (width < 100) return false;
    if (width > 300) return false;

    return true;
  };

  const onFacesDetected = ({ faces }: any) => {
    if (!faces || faces.length === 0) {
      setIsAligned(false);
      stableCountRef.current = 0;
      return;
    }

    const face = faces[0];

    if (!checkDistance(face)) {
      setIsAligned(false);
      stableCountRef.current = 0;
      return;
    }

    if (!checkAngle(face)) {
      setIsAligned(false);
      stableCountRef.current = 0;
      return;
    }

    const x = face.bounds.origin.x;
    const y = face.bounds.origin.y;

    if (lastPositionRef.current) {
      const dx = Math.abs(lastPositionRef.current.x - x);
      const dy = Math.abs(lastPositionRef.current.y - y);

      if (dx < 5 && dy < 5) {
        stableCountRef.current += 1;
      } else {
        stableCountRef.current = 0;
      }
    }

    lastPositionRef.current = { x, y };

    if (stableCountRef.current > 10) {
      setIsAligned(true);
      stableCountRef.current = 0;
      onCapture();
    }
  };

  const nextStep = () => {
    if (stepIndex < STEPS.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  };

  const getInstruction = () => {
    switch (currentAngle) {
      case 'front':
        return 'Look straight';
      case 'left':
        return 'Turn your face left';
      case 'right':
        return 'Turn your face right';
      case 'up':
        return 'Look up';
      case 'down':
        return 'Look down';
    }
  };

  return {
    currentAngle,
    isAligned,
    onFacesDetected,
    nextStep,
    instruction: getInstruction(),
    stepIndex,
    totalSteps: STEPS.length,
  };
};
