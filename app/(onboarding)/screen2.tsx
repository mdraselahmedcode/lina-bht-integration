// app/(onboarding)/screen2.tsx
import React, { useState, useEffect } from 'react';
import { View, ImageBackground, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import IconBadge from '@/components/icons/modified/IconBadge';
import { ArrowRightIcon } from '@/components/icons';
import OnboardingHeader from '@/components/onboarding/OnboardingHeader';
import OnboardingCard from '@/components/onboarding/OnboardingCard';
import { ONBOARDING_DATA } from '@/constants/onboarding';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function OnboardingScreen2() {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      LayoutAnimation.configureNext({
        duration: 300,
        create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
        },
        update: {
          type: LayoutAnimation.Types.easeInEaseOut,
        },
      });
      setIsReady(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    router.push('/(onboarding)/screen3');
  };

  const handleBack = () => {
    router.back();
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    router.replace('/(auth)/login');
  };

  const data = ONBOARDING_DATA[1];

  return (
    <View className="flex-1 bg-[#E8DDD0]">
      <View
        className="flex-1"
        style={{
          zIndex: 1,
          opacity: isReady ? 1 : 0,
        }}>
        <ImageBackground
          source={data.backgroundImage}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 0,
          }}
          resizeMode="cover"
        />

        <OnboardingHeader showBack={true} onBack={handleBack} onSkip={handleSkip} />

        <View className="flex-1" />

        <SafeAreaView edges={['bottom']} className="px-container pb-4">
          <OnboardingCard
            title={data.title}
            description={data.description}
            currentIndex={1}
            totalScreens={ONBOARDING_DATA.length}
          />

          <PrimaryButton
            title={data.buttonText}
            onPress={handleNext}
            rightIcon={<IconBadge icon={<ArrowRightIcon size={24} color="#FFFFFF" />} />}
            style={{ marginVertical: 24 }}
          />
        </SafeAreaView>
      </View>
    </View>
  );
}
