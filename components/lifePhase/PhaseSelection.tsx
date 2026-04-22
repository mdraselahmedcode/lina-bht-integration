// components/lifePhase/PhaseSelection.tsx
import React from 'react';
import { View, Text } from 'react-native';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import { CheckInCircleIcon } from '@/components/icons/CheckInCircleIcon';
import { PhaseOption } from '@/types/lifePhase';

interface PhaseSelectionProps {
  phases: PhaseOption[];
  selectedPhase: string | null;
  onSelectPhase: (value: string) => void;
}

export const PhaseSelection: React.FC<PhaseSelectionProps> = ({
  phases,
  selectedPhase,
  onSelectPhase,
}) => {
  return (
    <View>
      <Text className="font-outfit text-[18px] font-semibold text-titleTextColor">
        Current Phase
      </Text>
      <Text className="mb-3 font-outfit text-[14px] text-[#2E2117A3]">
        What is your current phase?
      </Text>

      <View className="gap-3">
        {phases.map((option, index) => {
          const isSelected = selectedPhase === option.value;
          const activeColor = '#679838';
          const inactiveColor = '#361A0D';
          const iconColor = isSelected ? activeColor : inactiveColor;

          return (
            <PrimaryButton
              key={option.id}
              title={option.label}
              onPress={() => onSelectPhase(option.value)}
              leftIcon={option.leftIcon ? option.leftIcon(iconColor) : null}
              rightIcon={
                isSelected ? (
                  <CheckInCircleIcon size={24} color="#679838" style={{ marginRight: 6 }} />
                ) : (
                  <CheckInCircleIcon size={24} color="#361A0D" style={{ marginRight: 6 }} />
                )
              }
              height={54}
              gradientColors={['#e2d2c1', '#e2d2c1']}
              textClassName={isSelected ? 'text-[#679838]' : 'text-[#4A3F35]'}
              textStyle={{
                fontSize: 14,
                fontFamily: 'Outfit-Regular',
                width: '100%',
                textAlign: 'left',
                marginLeft: 24,
              }}
              animated={true}
              animationDuration={200 + index * 50} // Staggered animation
              initialOpacity={0}
            />
          );
        })}
      </View>
    </View>
  );
};
