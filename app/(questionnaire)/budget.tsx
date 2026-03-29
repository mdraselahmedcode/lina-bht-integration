import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormLayout from '@/components/layouts/FormLayout';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import AuthFormTitle from '@/components/texts/auth/FormTitle';
import AuthTextBodySmall from '@/components/texts/auth/AuthTextBodySmall';
import { useToast } from '@/hooks/useToast';

const BUDGET_OPTIONS = [
  { id: 'budget', label: 'Budget-friendly (Under $20)', value: 'budget', range: 'under_20' },
  { id: 'mid', label: 'Mid-range ($20 - $50)', value: 'mid', range: '20_50' },
  { id: 'premium', label: 'Premium ($50 - $100)', value: 'premium', range: '50_100' },
  { id: 'luxury', label: 'Luxury ($100+)', value: 'luxury', range: '100_plus' },
];

export default function BudgetScreen() {
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const router = useRouter();
  const { showError, showSuccess } = useToast();

  const handleComplete = async () => {
    if (!selectedBudget) {
      showError('Please select your budget preference');
      return;
    }

    try {
      await AsyncStorage.setItem('user_budget', selectedBudget);

      // Mark questionnaire as completed
      await AsyncStorage.setItem('hasCompletedQuestionnaire', 'true');

      showSuccess('Profile setup complete!');

      // Navigate to main app
      router.replace('/(main)');
    } catch (error) {
      showError('Failed to save. Please try again.');
    }
  };

  const handleSkip = () => {
    router.replace('/(main)');
  };

  return (
    <FormLayout>
      <View className="px-container pb-[40px]">
        <AuthFormTitle text="Budget Preference" className={'mb-4'} />
        <AuthTextBodySmall
          text="Select your budget range for product recommendations"
          className="mb-8 text-center text-[#4A3F35]"
        />

        {/* Budget Options */}
        <View className="mb-8 gap-4">
          {BUDGET_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => setSelectedBudget(option.value)}
              className={`rounded-2xl border-2 p-5 ${
                selectedBudget === option.value
                  ? 'border-[#95B287] bg-[#95B287]/10'
                  : 'border-[#E8DDD0] bg-white'
              }`}>
              <Text
                className={`font-outfit text-lg font-semibold ${
                  selectedBudget === option.value ? 'text-[#95B287]' : 'text-[#4A3F35]'
                }`}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <PrimaryButton title="Complete Setup" onPress={handleComplete} className="mb-3" />

        <TouchableOpacity onPress={handleSkip} className="mt-2 py-2">
          <Text className="text-center font-outfit text-[#4A3F35]">Skip for now</Text>
        </TouchableOpacity>
      </View>
    </FormLayout>
  );
}
