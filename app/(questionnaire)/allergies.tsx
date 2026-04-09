import React, { useState } from 'react';
import { View, Text, ScrollView, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormLayout from '@/components/layouts/FormLayout';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import AuthFormTitle from '@/components/texts/auth/FormTitle';
import { useToast } from '@/hooks/useToast';
import { useScreenReady } from '@/hooks/useScreenReady';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';
import { RadioButton } from '@/components/buttons/RadioButton';

const ALLERGY_OPTIONS = [
  { id: 'fragrance', label: 'Fragrance', value: 'Fragrance' },
  { id: 'parabens', label: 'Parabens', value: 'Parabens' },
  { id: 'formaldehyde', label: 'Formaldehyde', value: 'Formaldehyde' },
  { id: 'phenoxyethanol', label: 'Phenoxyethanol', value: 'Phenoxyethanol' },
  { id: 'retinol', label: 'Retinol', value: 'Retinol' },
  { id: 'salicylic-acid', label: 'Salicylic Acid', value: 'Salicylic Acid' },
  { id: 'benzoyl-peroxide', label: 'Benzoyl Peroxide', value: 'Benzoyl Peroxide' },
  { id: 'alcohol-denat', label: 'Alcohol Denat', value: 'Alcohol Denat' },
  { id: 'oxybenzone', label: 'Oxybenzone', value: 'Oxybenzone' },
  { id: 'nickel', label: 'Nickel', value: 'Nickel' },
  { id: 'sulfates', label: 'Sulfates', value: 'Sulfates' },
  { id: 'alcohol', label: 'Alcohol', value: 'Alcohol' },
];

export default function AllergiesScreen() {
  const router = useRouter();
  const { showError } = useToast();
  const { width: screenWidth } = useWindowDimensions();
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const { isRendering, isContentReady, renderError } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  const toggleAllergy = (allergyValue: string) => {
    if (allergyValue === 'none') {
      setSelectedAllergies([]);
    } else {
      if (selectedAllergies.includes(allergyValue)) {
        setSelectedAllergies(selectedAllergies.filter((item) => item !== allergyValue));
      } else {
        setSelectedAllergies([...selectedAllergies, allergyValue]);
      }
    }
  };

  const handleContinue = async () => {
    try {
      await AsyncStorage.setItem('user_allergies', JSON.stringify(selectedAllergies));
      router.push('/(questionnaire)/skin-hair-condition');
    } catch (error) {
      console.error('Error saving allergies:', error);
      showError('Failed to save. Please try again.');
    }
  };

  const handleRetry = () => {
    router.replace('/(questionnaire)/allergies');
  };

  // Determine number of columns based on screen width
  const getColumnsCount = () => {
    if (screenWidth < 380) return 1;
    if (screenWidth < 600) return 2;
    return 3;
  };

  const columns = getColumnsCount();

  if (isRendering) {
    return <LoadingScreen loadingText="Loading allergy options..." />;
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
        <View
          className="px-container py-9"
          style={{
            opacity: isContentReady ? 1 : 0,
            transform: [{ translateY: isContentReady ? 0 : 10 }],
          }}>
          <View className="mb-8">
            <AuthFormTitle text="Allergies" />
            <Text className="text-center font-outfit text-[14px] text-titleTextColor">
              Do you have any allergies?
            </Text>
          </View>

          {/* Allergies Grid - Responsive columns using flex */}
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            {ALLERGY_OPTIONS.map((allergy) => {
              const isSelected = selectedAllergies.includes(allergy.value);

              return (
                <View
                  key={allergy.id}
                  style={{
                    width: columns === 1 ? '100%' : `${100 / columns - 2}%`,
                    marginBottom: 12,
                  }}>
                  <PrimaryButton
                    title={allergy.label}
                    onPress={() => toggleAllergy(allergy.value)}
                    leftIcon={
                      <RadioButton
                        value={isSelected}
                        onValueChange={() => toggleAllergy(allergy.value)}
                        activeColor="#759A52"
                        inactiveColor="#FFFFFF80"
                        size={34}
                        innerCircleSize={20}
                      />
                    }
                    height={54}
                    gradientColors={['#e2d2c1', '#e2d2c1']}
                    textClassName={isSelected ? 'text-[#759A52]' : 'text-[#4A3F35]'}
                    textStyle={{
                      fontSize: columns === 1 ? 14 : 12,
                      fontFamily: 'Outfit-Medium',
                      textAlign: 'center',
                      flexWrap: 'wrap',
                      flexShrink: 1,
                      marginLeft: columns === 1 ? 0 : 10,
                    }}
                  />
                </View>
              );
            })}
          </View>

          {/* None of the above option - Full width */}
          <View className="mt-2">
            <PrimaryButton
              title="None of the above"
              onPress={() => toggleAllergy('none')}
              leftIcon={
                <RadioButton
                  value={selectedAllergies.length === 0}
                  onValueChange={() => toggleAllergy('none')}
                  activeColor="#759A52"
                  inactiveColor="#FFFFFF80"
                  size={34}
                  innerCircleSize={20}
                />
              }
              height={54}
              gradientColors={['#e2d2c1', '#e2d2c1']}
              textClassName={selectedAllergies.length === 0 ? 'text-[#759A52]' : 'text-[#4A3F35]'}
              textStyle={{
                fontSize: 14,
                fontFamily: 'Outfit-Medium',
                textAlign: 'center',
              }}
            />
          </View>

          {/* Continue Button */}
          <View className="mt-8">
            <PrimaryButton title="Continue" onPress={handleContinue} className="mb-3" />
          </View>
        </View>
      </ScrollView>
    </FormLayout>
  );
}
