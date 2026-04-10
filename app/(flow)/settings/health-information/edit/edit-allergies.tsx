// app/(flow)/settings/health-information/edit-allergies.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/header/CustomHeader';
import { LAYOUT } from '@/constants/constants';
import { useToast } from '@/hooks/useToast';
import { useScreenReady } from '@/hooks/useScreenReady';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';
import PrimaryButton from '@/components/buttons/PrimaryButton';
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

export default function EditAllergiesScreen() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const { width: screenWidth } = useWindowDimensions();

  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { isRendering, isContentReady, renderError } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  useEffect(() => {
    loadAllergies();
  }, []);

  const loadAllergies = async () => {
    try {
      const saved = await AsyncStorage.getItem('user_allergies');
      if (saved) {
        setSelectedAllergies(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading allergies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAllergy = (allergyValue: string) => {
    if (selectedAllergies.includes(allergyValue)) {
      setSelectedAllergies(selectedAllergies.filter((item) => item !== allergyValue));
    } else {
      setSelectedAllergies([...selectedAllergies, allergyValue]);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await AsyncStorage.setItem('user_allergies', JSON.stringify(selectedAllergies));
      showSuccess('Allergies updated successfully');
      router.back();
    } catch (error) {
      showError('Failed to update');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRetry = () => {
    router.replace('/(flow)/settings/health-information/edit/edit-allergies');
  };

  // Determine number of columns based on screen width
  const getColumnsCount = () => {
    if (screenWidth < 380) return 1;
    if (screenWidth < 600) return 2;
    return 3;
  };

  const columns = getColumnsCount();

  if (isRendering || isLoading) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <LoadingScreen loadingText="Loading allergies..." />
      </SafeAreaView>
    );
  }

  if (renderError) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title="Edit Allergies" height={50} backButton={true} />
        <ErrorScreen message={renderError} onRetry={handleRetry} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
      <CustomHeader title="Edit Allergies" height={50} backButton={true} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
          paddingTop: 24,
          flexGrow: 1,
        }}
        className="flex-1">
        <View
          className="px-container"
          style={{
            opacity: isContentReady ? 1 : 0,
            transform: [{ translateY: isContentReady ? 0 : 10 }],
          }}>
          <Text className="mb-4 font-outfit text-[16px] text-titleTextColor">
            Select your allergies (multiple selection)
          </Text>

          {/* Allergies Grid - Responsive columns */}
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

          <View className="mt-6 gap-3">
            <PrimaryButton
              title={isSaving ? 'Saving...' : 'Save Changes'}
              onPress={handleSave}
              disabled={isSaving}
              isLoading={isSaving}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
