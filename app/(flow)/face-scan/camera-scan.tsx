// app/(flow)/face-scan/camera-scan.tsx
import React from 'react';
import { BaseCameraScan } from '@/components/scans/BaseCameraScan';
import { useLocalSearchParams } from 'expo-router';

export default function FaceCameraScan() {
  const { scanType } = useLocalSearchParams();
  
  return (
    <BaseCameraScan
      scanType="face-scan"
      title="Position your face within the frame"
      subtitle="Ensure good lighting for best results"
    />
  );
}