// app/(questionnaire)/skin-hair-condition.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, useWindowDimensions, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormLayout from '@/components/layouts/FormLayout';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import AuthFormTitle from '@/components/texts/auth/FormTitle';
import { useToast } from '@/hooks/useToast';
import { useScreenReady } from '@/hooks/useScreenReady';
import {
  CoilyOrKinkyHairIcon,
  CombinationSkinIcon,
  CurlyHairIcon,
  DrySkinIcon,
  NormalSkinIcon,
  OilySkinIcon,
  SensitiveSkinIcon,
  StraightHairIcon,
  WavyHairIcon,
} from '@/components/icons';
import { RadioButton } from '@/components/buttons/RadioButton';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';
import { CheckIconButton } from '@/components/CheckIconButton';
import InputField from '@/components/inputs/Input';
import { useGetSkinHairQuery, useSaveSkinHairMutation } from '@/store/api/onboardingApi';

const SKIN_TYPE = [
  {
    id: 'dry',
    label: 'Dry',
    value: 'dry',
    leftIcon: (color: string) => (
      <DrySkinIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
  {
    id: 'combination',
    label: 'Combination',
    value: 'combination',
    leftIcon: (color: string) => (
      <CombinationSkinIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
  {
    id: 'normal',
    label: 'Normal',
    value: 'normal',
    leftIcon: (color: string) => (
      <NormalSkinIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
  {
    id: 'oily',
    label: 'Oily',
    value: 'oily',
    leftIcon: (color: string) => (
      <OilySkinIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
  {
    id: 'sensitive',
    label: 'Sensitive',
    value: 'sensitive',
    leftIcon: (color: string) => (
      <SensitiveSkinIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
];

const SKIN_CONCERNS_OPTIONS = [
  { id: 'acne', label: 'Acne, Pimple', value: 'acne' },
  { id: 'irritation', label: 'Irritation, redness', value: 'irritation' },
  { id: 'pigmentation', label: 'Pigmentation', value: 'pigmentation' },
  { id: 'dullness', label: 'Dullness', value: 'dullness' },
  { id: 'none', label: 'No concerns', value: 'none' },
];

const HAIR_CONCERNS_OPTIONS = [
  { id: 'hair_fall', label: 'Hair fall', value: 'hair fall' },
  { id: 'dandruff', label: 'Dandruff', value: 'dandruff' },
  { id: 'oily_scalp', label: 'Oily Scalp', value: 'oily scalp' },
  { id: 'dry_scalp', label: 'Dry Scalp', value: 'dry scalp' },
  { id: 'none', label: 'No concerns', value: 'none' },
];

const PREDEFINED_SKIN_CONCERNS = SKIN_CONCERNS_OPTIONS.map((o) => o.value);
const PREDEFINED_HAIR_CONCERNS = HAIR_CONCERNS_OPTIONS.map((o) => o.value);

const HAIR_TYPE = [
  {
    id: 'wavy',
    label: 'Wavy',
    value: 'wavy',
    leftIcon: (color: string) => (
      <WavyHairIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
  {
    id: 'straight',
    label: 'Straight',
    value: 'straight',
    leftIcon: (color: string) => (
      <StraightHairIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
  {
    id: 'curly',
    label: 'Curly',
    value: 'curly',
    leftIcon: (color: string) => (
      <CurlyHairIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
  {
    id: 'coily_or_kinky',
    label: 'Coily or Kinky',
    value: 'coily_or_kinky',
    leftIcon: (color: string) => (
      <CoilyOrKinkyHairIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
];

export default function SkinHairConditionScreen() {
  const router = useRouter();
  const { showError } = useToast();
  const { width: screenWidth } = useWindowDimensions();

  const [selectedSkinType, setSelectedSkinType] = useState<string | null>(null);
  const [selectedSkinConcerns, setSelectedSkinConcerns] = useState<string[]>([]);
  const [selectedHairType, setSelectedHairType] = useState<string | null>(null);
  const [selectedHairConcerns, setSelectedHairConcerns] = useState<string[]>([]);

  const [showSkinCustomInput, setShowSkinCustomInput] = useState(false);
  const [skinCustomConcern, setSkinCustomConcern] = useState('');
  const [skinCustomConcernsList, setSkinCustomConcernsList] = useState<string[]>([]);

  const [showHairCustomInput, setShowHairCustomInput] = useState(false);
  const [hairCustomConcern, setHairCustomConcern] = useState('');
  const [hairCustomConcernsList, setHairCustomConcernsList] = useState<string[]>([]);

  const skinFadeAnim = React.useRef(new Animated.Value(0)).current;
  const skinSlideAnim = React.useRef(new Animated.Value(20)).current;
  const hairFadeAnim = React.useRef(new Animated.Value(0)).current;
  const hairSlideAnim = React.useRef(new Animated.Value(20)).current;

  // ✅ Fetch previously saved data
  const { data: savedSkinHair, isLoading: isLoadingSaved } = useGetSkinHairQuery();

  // ✅ Save mutation
  const [saveSkinHair, { isLoading: isSaving }] = useSaveSkinHairMutation();

  const { isRendering, isContentReady, renderError } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  // ✅ Pre-fill from saved data
  useEffect(() => {
    if (!savedSkinHair) return;

    if (savedSkinHair.skin_type) {
      setSelectedSkinType(savedSkinHair.skin_type);
    }

    if (savedSkinHair.hair_type) {
      setSelectedHairType(savedSkinHair.hair_type);
    }

    if (savedSkinHair.skin_concerns?.length) {
      // ✅ Only accept values that match our current predefined list
      const predefined = savedSkinHair.skin_concerns.filter((c) =>
        PREDEFINED_SKIN_CONCERNS.includes(c)
      );
      const custom = savedSkinHair.skin_concerns.filter(
        (c) => !PREDEFINED_SKIN_CONCERNS.includes(c)
      );
      setSelectedSkinConcerns(predefined);
      if (custom.length > 0) {
        setSkinCustomConcernsList(custom);
        setShowSkinCustomInput(true);
      }
    }

    if (savedSkinHair.hair_concerns?.length) {
      const predefined = savedSkinHair.hair_concerns.filter((c) =>
        PREDEFINED_HAIR_CONCERNS.includes(c)
      );
      const custom = savedSkinHair.hair_concerns.filter(
        (c) => !PREDEFINED_HAIR_CONCERNS.includes(c)
      );
      setSelectedHairConcerns(predefined);
      if (custom.length > 0) {
        setHairCustomConcernsList(custom);
        setShowHairCustomInput(true);
      }
    }
  }, [savedSkinHair]);

  React.useEffect(() => {
    if (showSkinCustomInput) {
      Animated.parallel([
        Animated.timing(skinFadeAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(skinSlideAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      skinFadeAnim.setValue(0);
      skinSlideAnim.setValue(20);
    }
  }, [showSkinCustomInput]);

  React.useEffect(() => {
    if (showHairCustomInput) {
      Animated.parallel([
        Animated.timing(hairFadeAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(hairSlideAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      hairFadeAnim.setValue(0);
      hairSlideAnim.setValue(20);
    }
  }, [showHairCustomInput]);

  const toggleSkinConcern = (concernValue: string) => {
    if (concernValue === 'skin_other') {
      setShowSkinCustomInput(!showSkinCustomInput);
      if (!showSkinCustomInput) setSkinCustomConcern('');
    } else if (concernValue === 'none') {
      // ✅ Selecting "No concerns" clears everything else
      if (selectedSkinConcerns.includes('none')) {
        setSelectedSkinConcerns([]);
      } else {
        setSelectedSkinConcerns(['none']);
        setSkinCustomConcernsList([]);
        setSkinCustomConcern('');
        setShowSkinCustomInput(false);
      }
    } else {
      // ✅ Selecting any real concern removes "none"
      setSelectedSkinConcerns((prev) => {
        const withoutNone = prev.filter((item) => item !== 'none');
        return withoutNone.includes(concernValue)
          ? withoutNone.filter((item) => item !== concernValue)
          : [...withoutNone, concernValue];
      });
    }
  };

  const toggleHairConcern = (concernValue: string) => {
    if (concernValue === 'hair_other') {
      setShowHairCustomInput(!showHairCustomInput);
      if (!showHairCustomInput) setHairCustomConcern('');
    } else if (concernValue === 'none') {
      // ✅ Selecting "No concerns" clears everything else
      if (selectedHairConcerns.includes('none')) {
        setSelectedHairConcerns([]);
      } else {
        setSelectedHairConcerns(['none']);
        setHairCustomConcernsList([]);
        setHairCustomConcern('');
        setShowHairCustomInput(false);
      }
    } else {
      // ✅ Selecting any real concern removes "none"
      setSelectedHairConcerns((prev) => {
        const withoutNone = prev.filter((item) => item !== 'none');
        return withoutNone.includes(concernValue)
          ? withoutNone.filter((item) => item !== concernValue)
          : [...withoutNone, concernValue];
      });
    }
  };

  const handleNext = async () => {
    if (!selectedSkinType) {
      showError('Please select your skin type');
      return;
    }
    if (!selectedHairType) {
      showError('Please select your hair type');
      return;
    }

    // ✅ Only send predefined values in the concerns arrays
    let finalSkinConcerns = selectedSkinConcerns.filter(
      (c) => PREDEFINED_SKIN_CONCERNS.includes(c) && c !== 'none'
    );
    let finalHairConcerns = selectedHairConcerns.filter(
      (c) => PREDEFINED_HAIR_CONCERNS.includes(c) && c !== 'none'
    );

    // ✅ Custom concerns go ONLY to skin_other / hair_other
    let finalSkinCustomList = [...skinCustomConcernsList];
    let finalHairCustomList = [...hairCustomConcernsList];

    if (showSkinCustomInput && skinCustomConcern.trim()) {
      const newConcern = skinCustomConcern.trim();
      if (!finalSkinCustomList.includes(newConcern)) {
        finalSkinCustomList.push(newConcern);
      }
    }

    if (showHairCustomInput && hairCustomConcern.trim()) {
      const newConcern = hairCustomConcern.trim();
      if (!finalHairCustomList.includes(newConcern)) {
        finalHairCustomList.push(newConcern);
      }
    }

    console.log('🔍 Sending skin_concerns:', finalSkinConcerns);
    console.log('🔍 Sending hair_concerns:', finalHairConcerns);
    console.log('🔍 Sending skin_other:', finalSkinCustomList);
    console.log('🔍 Sending hair_other:', finalHairCustomList);

    try {
      await saveSkinHair({
        skin_type: selectedSkinType,
        skin_concerns: finalSkinConcerns,
        hair_type: selectedHairType,
        hair_concerns: finalHairConcerns,
        skin_other: finalSkinCustomList.length > 0 ? finalSkinCustomList.join(', ') : null,
        hair_other: finalHairCustomList.length > 0 ? finalHairCustomList.join(', ') : null,
      }).unwrap();

      await AsyncStorage.multiSet([
        ['user_skin_type', selectedSkinType],
        ['user_skin_concerns', JSON.stringify(finalSkinConcerns)],
        ['user_skin_custom_concerns', JSON.stringify(finalSkinCustomList)],
        ['user_hair_type', selectedHairType],
        ['user_hair_concerns', JSON.stringify(finalHairConcerns)],
        ['user_hair_custom_concerns', JSON.stringify(finalHairCustomList)],
      ]);

      router.push('/(questionnaire)/budget');
    } catch (error: any) {
      console.error('Error saving skin/hair data:', error);
      showError(error?.data?.message || error?.data?.detail || 'Failed to save. Please try again.');
    }
  };

  const handleRetry = () => {
    router.replace('/(questionnaire)/skin-hair-condition');
  };

  const getColumnsCount = () => {
    if (screenWidth < 380) return 1;
    if (screenWidth < 600) return 2;
    return 3;
  };

  const columns = getColumnsCount();

  const allSkinConcerns = [
    ...SKIN_CONCERNS_OPTIONS,
    ...skinCustomConcernsList.map((concern, index) => ({
      id: `skin_custom_${index}`,
      label: concern,
      value: concern,
    })),
    { id: 'skin_other', label: 'Other', value: 'skin_other' },
  ];

  const allHairConcerns = [
    ...HAIR_CONCERNS_OPTIONS,
    ...hairCustomConcernsList.map((concern, index) => ({
      id: `hair_custom_${index}`,
      label: concern,
      value: concern,
    })),
    { id: 'hair_other', label: 'Other', value: 'hair_other' },
  ];

  if (isRendering || isLoadingSaved) {
    return <LoadingScreen loadingText="Loading your preferences..." transparent={true} />;
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
            <AuthFormTitle text="Skin & Hair" />
            <Text className="text-center font-outfit text-[14px] text-titleTextColor">
              Tell us your current skin and hair condition
            </Text>
          </View>

          {/* ── SKIN TYPE ── */}
          <View className="mb-6">
            <Text className="font-outfit text-[18px] font-semibold text-titleTextColor">
              Skin Type
            </Text>
            <Text className="mb-3 font-outfit text-[14px] text-titleTextColor">
              How would you describe your skin?
            </Text>
            <View className="gap-3">
              {SKIN_TYPE.map((option) => {
                const isSelected = selectedSkinType === option.value;
                const iconColor = isSelected ? '#759A52' : '#361A0D';
                return (
                  <PrimaryButton
                    key={option.id}
                    title={option.label}
                    onPress={() => setSelectedSkinType(option.value)}
                    leftIcon={option.leftIcon(iconColor)}
                    rightIcon={
                      <RadioButton
                        value={isSelected}
                        onValueChange={() => setSelectedSkinType(option.value)}
                        activeColor="#679838"
                        inactiveColor="#FFFFFF80"
                        size={34}
                        innerCircleSize={20}
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
          </View>

          {/* ── SKIN CONCERNS ── */}
          <View className="mb-6">
            <Text className="font-outfit text-[18px] font-semibold text-titleTextColor">
              Skin Concerns
            </Text>
            <Text className="mb-3 font-outfit text-[14px] text-titleTextColor">
              What skin concerns do you have? (Select all that apply)
            </Text>
            <View
              style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {allSkinConcerns.map((option) => {
                const isOther = option.value === 'skin_other';
                const isSelected = isOther
                  ? showSkinCustomInput
                  : selectedSkinConcerns.includes(option.value);
                return (
                  <View
                    key={option.id}
                    style={{
                      width: columns === 1 ? '100%' : `${100 / columns - 2}%`,
                      marginBottom: 12,
                    }}>
                    <PrimaryButton
                      title={option.label}
                      onPress={() => toggleSkinConcern(option.value)}
                      leftIcon={
                        <CheckIconButton
                          value={isSelected}
                          onValueChange={() => toggleSkinConcern(option.value)}
                          activeColor="#759A52"
                          inactiveColor="#361A0D"
                          size={24}
                          marginLeft={10}
                        />
                      }
                      height={56}
                      withShadow={true}
                      gradientColors={['#E8DDD0', '#E8DDD0']}
                      textClassName={isSelected ? 'text-[#759A52]' : 'text-[#4A3F35]'}
                      textStyle={{
                        fontSize: columns === 1 ? 15 : 13,
                        fontFamily: 'Outfit-Medium',
                        textAlign: 'center',
                        flexWrap: 'wrap',
                        flexShrink: 1,
                        marginLeft: columns === 1 ? 0 : 8,
                      }}
                    />
                  </View>
                );
              })}
            </View>
            {showSkinCustomInput && (
              <Animated.View
                style={{
                  marginTop: 16,
                  opacity: skinFadeAnim,
                  transform: [{ translateY: skinSlideAnim }],
                }}>
                <InputField
                  value={skinCustomConcern}
                  handler={(_, val) => setSkinCustomConcern(val)}
                  placeHolder="Enter your skin concern (e.g., Rosacea, Eczema, etc.)"
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
          </View>

          {/* ── HAIR TYPE ── */}
          <View className="mb-6">
            <Text className="font-outfit text-[18px] font-semibold text-titleTextColor">
              Hair Type
            </Text>
            <Text className="mb-3 font-outfit text-[14px] text-titleTextColor">
              How would you describe your hair?
            </Text>
            <View className="gap-3">
              {HAIR_TYPE.map((option) => {
                const isSelected = selectedHairType === option.value;
                const iconColor = isSelected ? '#759A52' : '#361A0D';
                return (
                  <PrimaryButton
                    key={option.id}
                    title={option.label}
                    onPress={() => setSelectedHairType(option.value)}
                    leftIcon={option.leftIcon(iconColor)}
                    rightIcon={
                      <RadioButton
                        value={isSelected}
                        onValueChange={() => setSelectedHairType(option.value)}
                        activeColor="#679838"
                        inactiveColor="#FFFFFF80"
                        size={34}
                        innerCircleSize={20}
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
          </View>

          {/* ── HAIR CONCERNS ── */}
          <View className="mb-8">
            <Text className="font-outfit text-[18px] font-semibold text-titleTextColor">
              Hair Concerns
            </Text>
            <Text className="mb-3 font-outfit text-[14px] text-titleTextColor">
              What hair concerns do you have? (Select all that apply)
            </Text>
            <View
              style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {allHairConcerns.map((option) => {
                const isOther = option.value === 'hair_other';
                const isSelected = isOther
                  ? showHairCustomInput
                  : selectedHairConcerns.includes(option.value);
                return (
                  <View
                    key={option.id}
                    style={{
                      width: columns === 1 ? '100%' : `${100 / columns - 2}%`,
                      marginBottom: 12,
                    }}>
                    <PrimaryButton
                      title={option.label}
                      onPress={() => toggleHairConcern(option.value)}
                      leftIcon={
                        <CheckIconButton
                          value={isSelected}
                          onValueChange={() => toggleHairConcern(option.value)}
                          activeColor="#759A52"
                          inactiveColor="#361A0D"
                          size={24}
                          marginLeft={10}
                        />
                      }
                      height={56}
                      withShadow={true}
                      gradientColors={['#E8DDD0', '#E8DDD0']}
                      textClassName={isSelected ? 'text-[#759A52]' : 'text-[#4A3F35]'}
                      textStyle={{
                        fontSize: columns === 1 ? 15 : 13,
                        fontFamily: 'Outfit-Medium',
                        textAlign: 'center',
                        flexWrap: 'wrap',
                        flexShrink: 1,
                        marginLeft: columns === 1 ? 0 : 8,
                      }}
                    />
                  </View>
                );
              })}
            </View>
            {showHairCustomInput && (
              <Animated.View
                style={{
                  marginTop: 16,
                  opacity: hairFadeAnim,
                  transform: [{ translateY: hairSlideAnim }],
                }}>
                <InputField
                  value={hairCustomConcern}
                  handler={(_, val) => setHairCustomConcern(val)}
                  placeHolder="Enter your hair concern (e.g., Split ends, Frizz, etc.)"
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
          </View>

          <PrimaryButton
            title={isSaving ? 'Saving...' : 'Continue'}
            onPress={handleNext}
            className="mb-3"
            disabled={isSaving}
          />
        </View>
      </ScrollView>
    </FormLayout>
  );
}
