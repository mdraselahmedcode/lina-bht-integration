// components/scans/LifestyleFactors.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { ZLikeIcon } from '@/components/icons';
import { GradientProgressBar } from '@/components/GradientProgressBar';

export interface LifestyleFactor {
  id: string;
  label: string;
  value: number;
  gradientColors: [string, string];
}

interface LifestyleFactorsProps {
  factors: LifestyleFactor[];
  title?: string;
  showIcon?: boolean;
}

export const LifestyleFactors: React.FC<LifestyleFactorsProps> = ({
  factors,
  title = 'Lifestyle Factors',
  showIcon = true,
}) => {
  if (!factors || factors.length === 0) {
    return null;
  }

  return (
    <View className="mt-6">
      {/* Header */}
      <View className="flex-row items-center gap-3">
        {showIcon && <ZLikeIcon size={24} color={'#977857'} />}
        <Text className="text-start font-outfitMedium text-[16px] text-[#2E2117]">{title}</Text>
      </View>

      {/* Factors Container */}
      <View
        className="mt-3 w-full p-3"
        style={{
          borderWidth: 1,
          borderRadius: 24,
          borderColor: '#FFFFFF99',
        }}>
        {factors.map((factor, index) => (
          <View
            key={factor.id}
            style={{
              marginTop: index > 0 ? 12 : 0,
            }}>
            {/* Factor Label and Value Row */}
            <View className="w-full flex-row items-center justify-between">
              <Text
                className="font-outfitMedium text-[13px]"
                style={{
                  color: '#2E2117',
                  textShadowColor: '#FFFFFF',
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
                }}>
                {factor.label}
              </Text>
              <Text
                className="font-outfitMedium text-[12px]"
                style={{
                  color: '#2E2117',
                  textShadowColor: '#FFFFFF',
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
                }}>
                {factor.value}%
              </Text>
            </View>

            {/* Progress Bar */}
            <GradientProgressBar
              height={10}
              progress={factor.value}
              gradientColors={factor.gradientColors}
              backgroundColor="#ddd9d6"
              style={{
                marginTop: 6,
                height: 10,
                borderRadius: 10,
                overflow: 'hidden',
                borderWidth: 1,
                borderTopColor: '#c9beb177',
                borderLeftColor: '#c9beb177',
                borderBottomColor: '#FFFFFF99',
                borderRightColor: '#FFFFFF99',
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
};
