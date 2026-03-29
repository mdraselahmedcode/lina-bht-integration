// components/onboarding/OnboardingCard.tsx
import React from 'react';
import { View, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Shadow } from 'react-native-shadow-2';
import OBTitle from '@/components/texts/onboarding/OBTitle';
import OBSubtitle from '@/components/texts/onboarding/OBSubtitle';
import PaginationDots from './PaginationDots';
import { GRADIENT_CONFIG } from '@/constants/onboarding';

interface OnboardingCardProps {
  title: string;
  description: string;
  currentIndex: number;
  totalScreens: number;
  blurIntensity?: number;
}

export default function OnboardingCard({
  title,
  description,
  currentIndex,
  totalScreens,
  blurIntensity = 80,
}: OnboardingCardProps) {
  return (
    <>
      <LinearGradient
        colors={GRADIENT_CONFIG.colors}
        start={GRADIENT_CONFIG.start}
        end={GRADIENT_CONFIG.end}
        locations={GRADIENT_CONFIG.locations}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      <View className="relative">
        <Shadow
          distance={13}
          startColor="rgba(0,0,0,0.08)"
          offset={[-4, 8]}
          stretch
          containerStyle={{ width: '100%' }}
          style={{
            borderBottomRightRadius: 50,
            borderTopLeftRadius: 50,
          }}>
          <View className="relative overflow-hidden rounded-br-[50px] rounded-tl-[50px]">
            <BlurView
              intensity={blurIntensity}
              tint="light"
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            />

            <View className={`p-[30px] ${Platform.OS === 'ios' ? 'bg-cardBg/40' : 'bg-cardBg/80'}`}>
              <OBTitle text={title} />
              <OBSubtitle className="mb-9 mt-4" text={description} />

              <PaginationDots totalScreens={totalScreens} currentIndex={currentIndex} />
            </View>
          </View>
        </Shadow>
      </View>
    </>
  );
}
