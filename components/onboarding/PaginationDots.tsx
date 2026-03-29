// components/onboarding/PaginationDots.tsx
import React from 'react';
import { View } from 'react-native';

interface PaginationDotsProps {
  totalScreens: number;
  currentIndex: number;
  activeColor?: string;
  inactiveColor?: string;
}

export default function PaginationDots({
  totalScreens,
  currentIndex,
  activeColor = '#361A0D',
  inactiveColor = '#361A0D55',
}: PaginationDotsProps) {
  return (
    <View className="flex-row justify-start">
      {Array.from({ length: totalScreens }).map((_, index) => (
        <View
          key={index}
          className={`mr-2 h-[10px] rounded-full ${currentIndex === index ? 'w-8' : 'w-8'}`}
          style={{
            backgroundColor: currentIndex === index ? activeColor : inactiveColor,
          }}
        />
      ))}
    </View>
  );
}
