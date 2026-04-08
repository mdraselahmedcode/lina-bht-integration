// components/progress/ScanTypeFilter.tsx
import React from 'react';
import { View } from 'react-native';
import PrimaryVariantButton from '@/components/buttons/PrimaryVariantButton';
import { ScanType } from '@/types/progress';

interface ScanTypeFilterProps {
  activeScanType: ScanType;
  onSelect: (type: ScanType) => void;
}

export const ScanTypeFilter: React.FC<ScanTypeFilterProps> = ({ activeScanType, onSelect }) => {
  return (
    <View className="mb-4 flex-row gap-3">
      <PrimaryVariantButton
        title="Face Scan"
        onPress={() => onSelect('face')}
        style={{ flex: 1 }}
        height={64}
        withShadow={true}
        borderTopLeftRadius={24}
        borderTopRightRadius={0}
        borderBottomLeftRadius={0}
        borderBottomRightRadius={0}
        textStyle={{
          fontSize: 14,
          color: activeScanType === 'face' ? '#759A52' : '#361A0D',
        }}
      />

      <PrimaryVariantButton
        title="Hair & Scalp"
        onPress={() => onSelect('hair')}
        style={{ flex: 1 }}
        height={64}
        withShadow={true}
        borderTopLeftRadius={0}
        borderTopRightRadius={24}
        borderBottomLeftRadius={0}
        borderBottomRightRadius={0}
        textStyle={{
          fontSize: 14,
          color: activeScanType === 'hair' ? '#759A52' : '#361A0D',
        }}
      />
    </View>
  );
};
