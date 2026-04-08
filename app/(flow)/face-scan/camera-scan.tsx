// // app/(flow)/face-scan/camera-scan.tsx
// import React from 'react';
// import { BaseCameraScan } from '@/components/scans/BaseCameraScan';
// import { useLocalSearchParams } from 'expo-router';

// export default function FaceCameraScan() {
//   const { scanType } = useLocalSearchParams();

//   return (
//     <BaseCameraScan
//       scanType="face-scan"
//       title="Position your face within the frame"
//       subtitle="Ensure good lighting for best results"
//     />
//   );
// }

import React from 'react';
import { MultiAngleCameraScan } from '@/components/scans/MultiAngleCameraScan';
import { useLocalSearchParams } from 'expo-router';

export default function FaceCameraScan() {
  const { scanType } = useLocalSearchParams();

  return (
    <MultiAngleCameraScan
      scanType="face-scan"
      requiredAngles={['front', 'left', 'right', 'up', 'down']}
      autoCapture={true}
      onAngleCaptured={(angle, index, total) => {
        console.log(`✅ Captured ${angle} angle (${index}/${total})`);
      }}
    />
  );
}
