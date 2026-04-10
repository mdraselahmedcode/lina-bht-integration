// components/onboarding/OnboardingCard.tsx
import React from 'react';
import { View, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
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
        {/* Card with platform-specific shadows */}
        <View
          style={{
            borderBottomRightRadius: 50,
            borderTopLeftRadius: 50,
            // Shadow for iOS
            ...(Platform.OS === 'ios' && {
              shadowColor: '#000',
              shadowOffset: { width: -4, height: 8 },
              shadowOpacity: 0.08,
              shadowRadius: 13,
            }),
            // Shadow for Android
            ...(Platform.OS === 'android' && {
              elevation: 8,
              // Android doesn't support negative offset, so we use margin
              marginTop: 4,
            }),
          }}>
          <View
            style={{
              overflow: 'hidden',
              borderBottomRightRadius: 50,
              borderTopLeftRadius: 50,
            }}>
            <BlurView
              intensity={blurIntensity}
              tint="light"
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            />

            <View className={`p-[30px] ${Platform.OS === 'ios' ? 'bg-cardBg' : 'bg-cardBg'}`}>
              <OBTitle text={title} />
              <OBSubtitle className="mb-9 mt-4" text={description} />

              <PaginationDots totalScreens={totalScreens} currentIndex={currentIndex} />
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
