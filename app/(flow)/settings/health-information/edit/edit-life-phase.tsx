// app/(flow)/settings/health-information/edit/edit-life-phase.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/header/CustomHeader';
import { LAYOUT } from '@/constants/constants';
import { useToast } from '@/hooks/useToast';
import { useScreenReady } from '@/hooks/useScreenReady';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import { CircularIconButton } from '@/components/buttons/CircularIconButton';
import InputField from '@/components/inputs/Input';
import {
  MenoPauseIcon,
  PeriodIcon,
  PostpartumIcon,
  PregnantIcon,
  MinusIcon,
  PlusIcon,
} from '@/components/icons';
import { CheckInCircleIcon } from '@/components/icons/CheckInCircleIcon';
import VectorBg from '@/components/VectorBg';

import {
  LifePhaseRequest,
  lifePhaseType,
  useGetLifePhaseQuery,
  useUpdateLifePhaseMutation,
} from '@/store/api/onboardingApi';
import { parseLifePhase } from '@/utils/lifePhaseUtils';
import { extractApiError } from '@/utils/apiError';

const CURRENT_PHASE = [
  {
    id: 'period',
    label: 'On my period',
    value: 'on my period' as lifePhaseType, // ✅ was 'period'
    leftIcon: (color: string) => (
      <PeriodIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
  {
    id: 'pregnant',
    label: 'Pregnant',
    value: 'pregnant' as lifePhaseType,
    leftIcon: (color: string) => (
      <PregnantIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
  {
    id: 'postpartum',
    label: 'Postpartum',
    value: 'postpartum' as lifePhaseType,
    leftIcon: (color: string) => (
      <PostpartumIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
  {
    id: 'menopause',
    label: 'Menopause',
    value: 'menopause' as lifePhaseType,
    leftIcon: (color: string) => (
      <MenoPauseIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
  {
    id: 'none',
    label: 'None',
    value: 'none' as lifePhaseType,
    leftIcon: null,
  },
  {
    id: 'other',
    label: 'Other',
    value: 'other' as lifePhaseType,
    leftIcon: (_color: string) => null,
  },
];

export default function EditLifePhaseScreen() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();

  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [customPhase, setCustomPhase] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [pregnancyMonth, setPregnancyMonth] = useState(1);
  // const [isSaving, setIsSaving] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  const scrollViewRef = useRef<ScrollView>(null);

  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(20)).current;

  const { isRendering, isContentReady, renderError } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  useEffect(() => {
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
      // Scroll to bottom when custom input appears
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } else {
      fadeAnim.setValue(0);
      slideAnim.setValue(20);
    }
  }, [showCustomInput]);

  const { data: lifePhaseData, isLoading } = useGetLifePhaseQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateLifePhase, { isLoading: isSaving }] = useUpdateLifePhaseMutation();

  useEffect(() => {
    if (!lifePhaseData?.life_phase) return;
    const {
      phase,
      customText,
      pregnancyMonth: savedMonth,
    } = parseLifePhase(lifePhaseData.life_phase);
    if (!phase) return;
    setSelectedPhase(phase);
    if (phase === 'pregnant') setPregnancyMonth(savedMonth);
    if (phase === 'other') {
      setCustomPhase(customText);
      setShowCustomInput(true);
    }
  }, [lifePhaseData]);

  const handlePhaseSelect = (value: string) => {
    if (value === 'other') {
      setShowCustomInput(!showCustomInput);
      setSelectedPhase('other');
    } else {
      setShowCustomInput(false);
      setSelectedPhase(value);
    }
  };

  const handleMonthChange = (increment: boolean) => {
    if (increment && pregnancyMonth < 9) {
      setPregnancyMonth(pregnancyMonth + 1);
    } else if (!increment && pregnancyMonth > 1) {
      setPregnancyMonth(pregnancyMonth - 1);
    }
  };

  const handleMonthSelect = (month: number) => {
    setPregnancyMonth(month);
  };

  const handleSave = async () => {
    if (!selectedPhase) {
      showError('Please select a phase');
      return;
    }
    if (selectedPhase === 'other' && !customPhase.trim()) {
      showError('Please enter your current phase');
      return;
    }

    try {
      const payload: LifePhaseRequest = {
        current_phase: selectedPhase as lifePhaseType, // ✅ cast here
        custom_text:
          selectedPhase === 'pregnant'
            ? pregnancyMonth.toString()
            : selectedPhase === 'other'
              ? customPhase.trim()
              : null,
      };

      await updateLifePhase(payload).unwrap();

      showSuccess('Life phase updated successfully');
      router.back();
    } catch (error: any) {
      showError(extractApiError(error, 'Failed to update. Please try again.'));
    }
  };

  const handleRetry = () => {
    router.replace('/(flow)/settings/health-information/edit/edit-life-phase');
  };

  if (isRendering || isLoading) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-transparent ">
        {/* SVG Background */}
        <VectorBg />
        <LoadingScreen loadingText="Loading Life Phase options..." transparent />
      </SafeAreaView>
    );
  }

  if (renderError) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title="Edit Life Phase" height={50} backButton={true} />
        <ErrorScreen message={renderError} onRetry={handleRetry} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top', 'right']} className="flex-1 bg-transparent">
      <CustomHeader title="Edit Life Phase" height={50} backButton={true} />
      {/* SVG Background */}
      <VectorBg />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: LAYOUT.screen.scrollViewPaddingBottom + 40,
            paddingTop: 24,
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets={true}>
          <View
            className="px-container"
            style={{
              opacity: isContentReady ? 1 : 0,
              transform: [{ translateY: isContentReady ? 0 : 10 }],
            }}>
            <Text className="mb-4 font-outfit text-[16px] text-titleTextColor">
              Select your current phase
            </Text>

            <View className="gap-3">
              {CURRENT_PHASE.map((option) => {
                const isSelected =
                  option.value === 'other'
                    ? selectedPhase === 'other' // ✅ "other" is selected when phase is 'other'
                    : selectedPhase === option.value && !showCustomInput;
                const activeColor = '#759A52';
                const inactiveColor = '#361A0D';
                const iconColor = isSelected ? activeColor : inactiveColor;

                return (
                  <PrimaryButton
                    key={option.id}
                    title={option.label}
                    onPress={() => handlePhaseSelect(option.value)}
                    leftIcon={option.leftIcon ? option.leftIcon(iconColor) : null}
                    rightIcon={
                      isSelected ? (
                        <CheckInCircleIcon size={24} color="#759A52" style={{ marginRight: 6 }} />
                      ) : (
                        <CheckInCircleIcon size={24} color="#361A0D" style={{ marginRight: 6 }} />
                      )
                    }
                    height={54}
                    gradientColors={['#e2d2c1', '#e2d2c1']}
                    textClassName={isSelected ? 'text-[#759A52]' : 'text-[#4A3F35]'}
                    textStyle={{
                      fontSize: 14,
                      fontFamily: 'Outfit-Regular',
                      width: '100%',
                      textAlign: 'left',
                      marginLeft: 24,
                    }}
                  />
                );
              })}
            </View>

            {/* Custom Input Section - Only show when Other is selected */}
            {showCustomInput && (
              <Animated.View
                style={{
                  marginTop: 20,
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                }}>
                <Text className="mb-2 font-outfitMedium text-[14px] text-titleTextColor">
                  Please specify your current phase
                </Text>
                <InputField
                  value={customPhase}
                  handler={(_, val) => setCustomPhase(val)}
                  placeHolder="e.g., Trying to conceive, Perimenopause, etc."
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

            {/* Pregnancy Details - Only show when Pregnant is selected */}
            {selectedPhase === 'pregnant' && !showCustomInput && (
              <View className="mt-6">
                <Text className="font-outfit text-[18px]" style={{ color: '#361A0D' }}>
                  Pregnancy Details
                </Text>
                <Text className="font-outfit text-[14px] text-[#2E2117A3]">
                  How many months pregnant are you?
                </Text>

                <View className="mt-6 flex-row items-center justify-between">
                  <CircularIconButton
                    onPress={() => handleMonthChange(false)}
                    size={56}
                    icon={<MinusIcon width={24} height={4} color="#361A0D" />}
                  />
                  <View className="items-center justify-center px-4">
                    <Text className="font-outfitMedium text-[36px]" style={{ color: '#2E2117' }}>
                      {pregnancyMonth}
                    </Text>
                    <Text className="font-outfitMedium text-[16px]" style={{ color: '#2E2117' }}>
                      Month{pregnancyMonth !== 1 ? 's' : ''}
                    </Text>
                  </View>
                  <CircularIconButton
                    onPress={() => handleMonthChange(true)}
                    size={56}
                    icon={<PlusIcon size={34} color="#361A0D" />}
                  />
                </View>

                {/* Month Dots */}
                <View className="mt-6 flex-row flex-wrap items-center justify-center gap-3">
                  {Array.from({ length: 9 }).map((_, index) => {
                    const month = index + 1;
                    const isActive = pregnancyMonth === month;
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleMonthSelect(month)}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          backgroundColor: isActive ? '#361A0D' : '#F0E6D8',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: isActive ? '#FFFFFF' : '#361A0D',
                            fontFamily: 'Outfit-Medium',
                            fontSize: 14,
                          }}>
                          {month}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            <View className="mt-8 gap-3">
              <PrimaryButton
                title={isSaving ? 'Saving...' : 'Save Changes'}
                onPress={handleSave}
                disabled={isSaving}
                isLoading={isSaving}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
