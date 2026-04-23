// components/scans/DetectedConditionsList.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { StarWithDoublePlusIcon } from '@/components/icons/StarWithDoublePlusIcon';
import { DetectedConditionCard, DetectedCondition } from './DetectedConditionCard';

interface DetectedConditionsListProps {
  conditions: DetectedCondition[];
  title?: string;
  showIcon?: boolean;
  showFaceImages?: boolean; // Added: toggle face images for all conditions
  onConditionImagePress?: (condition: DetectedCondition) => void; // Added: handle image press
}

export const DetectedConditionsList: React.FC<DetectedConditionsListProps> = ({
  conditions,
  title = 'Detected Conditions',
  showIcon = true,
  showFaceImages = false,
  onConditionImagePress,
}) => {
  if (!conditions || conditions.length === 0) {
    return null;
  }

  return (
    <View className="mt-6">
      {/* Header */}
      <View className="flex-row items-center gap-3">
        {showIcon && (
          <StarWithDoublePlusIcon size={24} color={'#977857'} style={{ marginBottom: 12 }} />
        )}
        <Text className="mb-3 text-start font-outfitMedium text-[16px] text-[#2E2117]">
          {title}
        </Text>
      </View>

      {/* Conditions List */}
      {conditions.map((condition, index) => (
        <DetectedConditionCard
          key={condition.id}
          condition={condition}
          isLast={index === conditions.length - 1}
          showFaceImage={showFaceImages}
          onImagePress={onConditionImagePress}
        />
      ))}
    </View>
  );
};
