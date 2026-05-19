import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FormLayout from '@/components/layouts/FormLayout';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import AuthFormTitle from '@/components/texts/auth/FormTitle';
import { useToast } from '@/hooks/useToast';
import { LowBudgetIcon, NormalSkinIcon, PremiumBudgetIcon } from '@/components/icons';
import { useScreenReady } from '@/hooks/useScreenReady';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';
import { CheckIconButton } from '@/components/CheckIconButton';
import { useGetBudgetQuery, useSaveBudgetMutation, BudgetType } from '@/store/api/onboardingApi';
import { useAuth } from '@/hooks/useAuth';
import { extractApiError } from '@/utils/apiError';

const BUDGET_OPTIONS = [
  {
    id: 'budget',
    label: 'Budget-friendly',
    value: 'budget-friendly' as BudgetType,
    leftIcon: (color: string) => (
      <LowBudgetIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
  {
    id: 'mid',
    label: 'Mid-range',
    value: 'mid-range' as BudgetType,
    leftIcon: (color: string) => (
      <NormalSkinIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
  {
    id: 'premium',
    label: 'Premium',
    value: 'premium' as BudgetType,
    leftIcon: (color: string) => (
      <PremiumBudgetIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
];

export default function BudgetScreen() {
  const router = useRouter();
  const { showError, showSuccess } = useToast();
  const [selectedBudget, setSelectedBudget] = useState<BudgetType | null>(null);

  // ✅ Fetch previously saved budget
  const { data: savedBudget, isLoading: isLoadingSaved } = useGetBudgetQuery();

  // ✅ Save mutation
  const [saveBudget, { isLoading: isSaving }] = useSaveBudgetMutation();
  const { updateUser } = useAuth();

  const { isRendering, isContentReady, renderError } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  // ✅ Pre-fill from saved data
  useEffect(() => {
    if (savedBudget?.budget) {
      setSelectedBudget(savedBudget.budget);
    }
  }, [savedBudget]);

  const handleComplete = async () => {
    if (!selectedBudget) {
      showError('Please select your budget preference');
      return;
    }

    try {
      await saveBudget({ budget: selectedBudget }).unwrap();

      // ✅ Mark onboarding complete in Redux + AsyncStorage
      await updateUser({ onboarding_completed: true });

      await AsyncStorage.multiSet([
        ['user_budget', selectedBudget],
        ['hasCompletedQuestionnaire', 'true'],
      ]);

      showSuccess('Profile setup complete!');
      router.replace('/(main)');
    } catch (error: any) {
      console.error('Error saving budget:', error);
      showError(extractApiError(error, 'Failed to save. Please try again.'));
    }
  };

  const handleRetry = () => {
    router.replace('/(questionnaire)/budget');
  };

  if (isRendering || isLoadingSaved) {
    return <LoadingScreen loadingText="Loading budget options..." />;
  }

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
          <AuthFormTitle style={{ fontSize: 32 }} text="What is your budget?" />
          <Text className="mt-2 text-center font-outfit text-[14px] text-titleTextColor/60">
            Let&apos;s tailor your product recommendations to your preferred budget
          </Text>
        </View>

        <View className="mb-8 gap-3">
          {BUDGET_OPTIONS.map((option) => {
            const isSelected = selectedBudget === option.value;
            const iconColor = isSelected ? '#759A52' : '#361A0D';

            return (
              <PrimaryButton
                key={option.id}
                title={option.label}
                onPress={() => setSelectedBudget(option.value)}
                leftIcon={option.leftIcon(iconColor)}
                rightIcon={
                  <CheckIconButton
                    value={isSelected}
                    onValueChange={() => setSelectedBudget(option.value)}
                    activeColor="#759A52"
                    inactiveColor="#361A0D"
                    size={24}
                    marginRight={15}
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

        <PrimaryButton
          title={isSaving ? 'Saving...' : 'Complete Setup'}
          onPress={handleComplete}
          className="mb-3"
          disabled={isSaving}
        />
      </View>
    </FormLayout>
  );
}
