import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FormLayout from '@/components/layouts/FormLayout';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import AuthFormTitle from '@/components/texts/auth/FormTitle';
import AuthTextBodySmall from '@/components/texts/auth/AuthTextBodySmall';
import { useToast } from '@/hooks/useToast';

import { LowBudgetIcon, NormalSkinIcon, PremiumBudgetIcon } from '@/components/icons';
import { CheckInCircleIcon } from '@/components/icons/CheckInCircleIcon';
import { useScreenReady } from '@/hooks/useScreenReady';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';

// ==================== BUDGET OPTIONS ====================
const BUDGET_OPTIONS = [
  {
    id: 'budget',
    label: 'Budget-friendly (Under $20)',
    value: 'budget',
    leftIcon: (color: string) => (
      <LowBudgetIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
  {
    id: 'mid',
    label: 'Mid-range ($20 - $50)',
    value: 'mid',
    leftIcon: (color: string) => (
      <NormalSkinIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
  {
    id: 'premium',
    label: 'Premium ($50 - $100)',
    value: 'premium',
    leftIcon: (color: string) => (
      <PremiumBudgetIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
  // {
  //   id: 'luxury',
  //   label: 'Luxury ($100+)',
  //   value: 'luxury',
  //   leftIcon: (color: string) => (
  //     <PremiumBudgetIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
  //   ),
  // },
];

export default function BudgetScreen() {
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);

  const { isRendering, isContentReady, renderError } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  const router = useRouter();
  const { showError, showSuccess } = useToast();

  const handleComplete = async () => {
    if (!selectedBudget) {
      showError('Please select your budget preference');
      return;
    }

    try {
      await AsyncStorage.setItem('user_budget', selectedBudget);
      await AsyncStorage.setItem('hasCompletedQuestionnaire', 'true');

      showSuccess('Profile setup complete!');
      router.replace('/(main)');
    } catch (error) {
      showError('Failed to save. Please try again.');
    }
  };

  const handleRetry = () => {
    router.replace('/(questionnaire)/budget');
  };

  // Show loading while screen is rendering
  if (isRendering) {
    <LoadingScreen />;
  }

  // Show error if rendering failed
  if (renderError) {
    return (
      <FormLayout>
        <ErrorScreen message={renderError} onRetry={handleRetry} />
      </FormLayout>
    );
  }

  return (
    <FormLayout>
      <View
        className="px-container py-9"
        style={{
          opacity: isContentReady ? 1 : 0,
          transform: [{ translateY: isContentReady ? 0 : 10 }],
        }}>
        <View className="mb-10">
          <AuthFormTitle text="What is your budget?" />
          <Text className="text-center font-outfit text-[14px] text-titleTextColor">
            Let’s tailor your product recommendations to your preferred budget
          </Text>
        </View>

        {/* ==================== BUDGET OPTIONS ==================== */}
        <View className="mb-8 gap-3">
          {BUDGET_OPTIONS.map((option) => {
            const isSelected = selectedBudget === option.value;

            const activeColor = '#759A52';
            const inactiveColor = '#361A0D';
            const iconColor = isSelected ? activeColor : inactiveColor;

            return (
              <PrimaryButton
                key={option.id}
                title={option.label}
                onPress={() => setSelectedBudget(option.value)}
                leftIcon={option.leftIcon(iconColor)}
                rightIcon={
                  <CheckInCircleIcon
                    size={24}
                    color={isSelected ? '#759A52' : '#361A0D'}
                    style={{ marginRight: 6 }}
                  />
                }
                height={56}
                gradientColors={['#e2d2c1', '#e2d2c1']}
                textClassName={isSelected ? 'text-[#759A52]' : 'text-[#4A3F35]'}
                textStyle={{
                  fontSize: 14,
                  fontFamily: 'Outfit-Regular',
                  width: '100%',
                  textAlign: 'left',
                  marginLeft: 40,
                }}
              />
            );
          })}
        </View>

        <PrimaryButton title="Complete Setup" onPress={handleComplete} className="mb-3" />
      </View>
    </FormLayout>
  );
}
