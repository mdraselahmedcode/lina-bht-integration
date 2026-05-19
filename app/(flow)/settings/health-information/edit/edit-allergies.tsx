import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, useWindowDimensions, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/header/CustomHeader';
import { LAYOUT } from '@/constants/constants';
import { useToast } from '@/hooks/useToast';
import { useScreenReady } from '@/hooks/useScreenReady';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import { CheckIconButton } from '@/components/CheckIconButton';
import InputField from '@/components/inputs/Input';
import VectorBg from '@/components/VectorBg';
import { useGetAllergiesQuery, useUpdateAllergiesMutation } from '@/store/api/onboardingApi';
import { extractApiError } from '@/utils/apiError';

const ALLERGY_OPTIONS = [
  { id: 'fragrance', label: 'Fragrance', value: 'Fragrance' },
  { id: 'parabens', label: 'Parabens', value: 'Parabens' },
  { id: 'formaldehyde', label: 'Formaldehyde', value: 'Formaldehyde' },
  { id: 'phenoxyethanol', label: 'Phenoxyethanol', value: 'Phenoxyethanol' },
  { id: 'retinol', label: 'Retinol', value: 'Retinol' },
  { id: 'salicylic-acid', label: 'Salicylic Acid', value: 'Salicylic Acid' },
];

const PREDEFINED_VALUES = ALLERGY_OPTIONS.map((o) => o.value);

export default function EditAllergiesScreen() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const { width: screenWidth } = useWindowDimensions();

  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [customAllergiesList, setCustomAllergiesList] = useState<string[]>([]);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customAllergy, setCustomAllergy] = useState('');

  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(20)).current;

  const {
    data: savedAllergies,
    isLoading,
    isError,
    refetch,
  } = useGetAllergiesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateAllergies, { isLoading: isSaving }] = useUpdateAllergiesMutation();

  const { isRendering, isContentReady, renderError } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  // ✅ Pre-fill from API
  useEffect(() => {
    if (!savedAllergies?.allergies?.length) return;
    const predefined = savedAllergies.allergies.filter((a) => PREDEFINED_VALUES.includes(a));
    const custom = savedAllergies.allergies.filter((a) => !PREDEFINED_VALUES.includes(a));
    setSelectedAllergies(predefined);
    if (custom.length > 0) {
      setCustomAllergiesList(custom);
      setShowCustomInput(true);
    }
  }, [savedAllergies]);

  React.useEffect(() => {
    if (showCustomInput) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      slideAnim.setValue(20);
    }
  }, [showCustomInput]);

  const toggleAllergy = (value: string) => {
    if (value === 'none') {
      setSelectedAllergies([]);
      setCustomAllergiesList([]);
      setShowCustomInput(false);
      setCustomAllergy('');
    } else if (value === 'other') {
      setShowCustomInput(!showCustomInput);
      if (showCustomInput) setCustomAllergy('');
    } else {
      setSelectedAllergies((prev) =>
        prev.includes(value) ? prev.filter((a) => a !== value) : [...prev, value]
      );
    }
  };

  const handleSave = async () => {
    let finalAllergies = [...selectedAllergies];
    let finalCustomList = [...customAllergiesList];

    if (showCustomInput && customAllergy.trim()) {
      const newAllergy = customAllergy.trim();
      if (!finalAllergies.includes(newAllergy)) {
        finalAllergies.push(newAllergy);
        finalCustomList.push(newAllergy);
      }
    }

    try {
      await updateAllergies({
        allergies: finalAllergies,
        custom_text: finalCustomList.length > 0 ? finalCustomList.join(', ') : null,
      }).unwrap();

      showSuccess('Allergies updated successfully');
      router.back();
    } catch (error: any) {
      showError(extractApiError(error, 'Failed to update. Please try again.'));
    }
  };

  const getColumnsCount = () => {
    if (screenWidth < 380) return 1;
    if (screenWidth < 600) return 2;
    return 3;
  };
  const columns = getColumnsCount();

  const allAllergyOptions = [
    ...ALLERGY_OPTIONS,
    ...customAllergiesList.map((a, i) => ({ id: `custom_${i}`, label: a, value: a })),
  ];

  const noneSelected = selectedAllergies.length === 0 && customAllergiesList.length === 0;

  if (isRendering || isLoading) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1">
        <VectorBg />
        <LoadingScreen loadingText="Loading allergies..." transparent />
      </SafeAreaView>
    );
  }

  if (renderError || isError) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title="Edit Allergies" height={50} backButton={true} />
        <ErrorScreen message={renderError ?? 'Failed to load.'} onRetry={refetch} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
      <CustomHeader title="Edit Allergies" height={50} backButton={true} />
      <VectorBg />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: LAYOUT.screen.scrollViewPaddingBottom + 40,
          paddingTop: 24,
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled">
        <View
          className="px-container"
          style={{
            opacity: isContentReady ? 1 : 0,
            transform: [{ translateY: isContentReady ? 0 : 10 }],
          }}>
          {/* Allergy grid */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {allAllergyOptions.map((option) => {
              const isSelected = selectedAllergies.includes(option.value);
              return (
                <View
                  key={option.id}
                  style={{
                    width: columns === 1 ? '100%' : `${100 / columns - 2}%`,
                    marginBottom: 12,
                  }}>
                  <PrimaryButton
                    title={option.label}
                    onPress={() => toggleAllergy(option.value)}
                    leftIcon={
                      <CheckIconButton
                        value={isSelected}
                        onValueChange={() => toggleAllergy(option.value)}
                        activeColor="#759A52"
                        inactiveColor="#361A0D"
                        size={24}
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
                    }}
                  />
                </View>
              );
            })}
          </View>

          {/* None */}
          <PrimaryButton
            title="None of the above"
            onPress={() => toggleAllergy('none')}
            leftIcon={
              <CheckIconButton
                value={noneSelected}
                onValueChange={() => toggleAllergy('none')}
                activeColor="#759A52"
                inactiveColor="#361A0D"
                size={24}
              />
            }
            height={54}
            gradientColors={['#e2d2c1', '#e2d2c1']}
            textClassName={noneSelected ? 'text-[#759A52]' : 'text-[#4A3F35]'}
            textStyle={{ fontSize: 14, fontFamily: 'Outfit-Medium', textAlign: 'center' }}
          />

          {/* Other */}
          <View className="mt-4">
            <PrimaryButton
              title="Other"
              onPress={() => toggleAllergy('other')}
              leftIcon={
                <CheckIconButton
                  value={showCustomInput}
                  onValueChange={() => toggleAllergy('other')}
                  activeColor="#759A52"
                  inactiveColor="#361A0D"
                  size={24}
                />
              }
              height={54}
              gradientColors={['#e2d2c1', '#e2d2c1']}
              textClassName={showCustomInput ? 'text-[#759A52]' : 'text-[#4A3F35]'}
              textStyle={{ fontSize: 14, fontFamily: 'Outfit-Medium', textAlign: 'center' }}
            />
          </View>

          {/* Custom input */}
          {showCustomInput && (
            <Animated.View
              style={{ marginTop: 16, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
              <InputField
                value={customAllergy}
                handler={(_, val) => setCustomAllergy(val)}
                placeHolder="Enter your allergy (e.g., Latex, Dust, etc.)"
                showLabel={false}
                height={56}
                withShadow={true}
                borderRadius={100}
                inputStyle={{ fontSize: 13 }}
                animated={true}
                animationDuration={200}
                initialOpacity={0}
              />
            </Animated.View>
          )}

          <View className="mt-8">
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
