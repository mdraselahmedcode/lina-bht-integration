// import React, { useState } from 'react';
// import { View, Text } from 'react-native';
// import { useRouter } from 'expo-router';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import FormLayout from '@/components/layouts/FormLayout';
// import PrimaryButton from '@/components/buttons/PrimaryButton';

// import AuthFormTitle from '@/components/texts/auth/FormTitle';
// import { useToast } from '@/hooks/useToast';
// import { useScreenReady } from '@/hooks/useScreenReady';
// import { MenoPauseIcon, PeriodIcon, PostpartumIcon, PregnantIcon } from '@/components/icons';
// import { CheckInCircleIcon } from '@/components/icons/CheckInCircleIcon';
// import LoadingScreen from '@/components/loading/LoadingScreen';
// import ErrorScreen from '@/components/errors/ErrorScreen';

// const CURRENT_PHASE = [
//   {
//     id: 'period',
//     label: 'On my period',
//     value: 'period',
//     leftIcon: (color: string) => (
//       <PeriodIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
//     ),
//   },
//   {
//     id: 'pregnant',
//     label: 'Pregnant',
//     value: 'pregnant',
//     leftIcon: (color: string) => (
//       <PregnantIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
//     ),
//   },
//   {
//     id: 'postpartum',
//     label: 'Postpartum',
//     value: 'postpartum',
//     leftIcon: (color: string) => (
//       <PostpartumIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
//     ),
//   },
//   {
//     id: 'menopause',
//     label: 'Menopause',
//     value: 'menopause',
//     leftIcon: (color: string) => (
//       <MenoPauseIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
//     ),
//   },
//   {
//     id: 'other',
//     label: 'Other',
//     value: 'other',
//     leftIcon: (color: string) => null,
//   },
// ];

// export default function LifePhaseScreen() {
//   const [selectedCurrentPhase, setSelectedCurrentPhase] = useState<string | null>(null);
//   const [isDealingWithAllergies, setIsDealingWithAllergies] = useState<boolean | null>(null);
//   const router = useRouter();
//   const { showError } = useToast();

//   const { isRendering, renderError, isContentReady } = useScreenReady({
//     dependencies: [],
//     delay: 100,
//     initialReady: false,
//   });

//   const handleAllergyResponse = (value: boolean) => {
//     setIsDealingWithAllergies(value);
//     // Use setTimeout to ensure state is updated before navigation
//     setTimeout(() => {
//       handleNext(value);
//     }, 0);
//   };

//   const handleNext = async (allergyValue: boolean) => {
//     // Validate current phase selection
//     if (!selectedCurrentPhase) {
//       showError('Please select your current phase');
//       return;
//     }

//     try {
//       // Save current phase
//       await AsyncStorage.setItem('user_current_phase', selectedCurrentPhase);

//       // Save allergy status
//       await AsyncStorage.setItem('user_is_dealing_with_allergies', allergyValue.toString());

//       // If user is dealing with allergies, navigate to allergies screen
//       if (allergyValue) {
//         router.push('/(questionnaire)/allergies');
//       } else {
//         // Otherwise, go to skin hair condition
//         router.push('/(questionnaire)/skin-hair-condition');
//       }
//     } catch (error) {
//       console.error('Error saving data:', error);
//       showError('Failed to save. Please try again.');
//     }
//   };

//   const handleRetry = () => {
//     router.replace('/(questionnaire)/life-phase');
//   };

//   if (isRendering) {
//     return <LoadingScreen loadingText="Getting to know you..." />;
//   }

//   if (renderError) {
//     return (
//       <FormLayout>
//         <ErrorScreen message={renderError} onRetry={handleRetry} />
//       </FormLayout>
//     );
//   }

//   return (
//     <FormLayout>
//       <View
//         className="px-container py-9"
//         style={{
//           opacity: isContentReady ? 1 : 0,
//           transform: [{ translateY: isContentReady ? 0 : 10 }],
//         }}>
//         <View className={'mb-10'}>
//           <AuthFormTitle numberOfLines={1} text="Life phase & health" />
//           <Text className="text-center font-outfit text-[14px] text-titleTextColor">
//             Tell us about yourself to personalize your experience
//           </Text>
//         </View>

//         <View className="">
//           <Text className="font-outfit text-[18px] font-semibold text-titleTextColor">
//             Current Phase
//           </Text>
//           <Text className="mb-3 font-outfit text-[14px] text-titleTextColor">
//             What is your current phase?
//           </Text>
//           <View className="gap-3">
//             {CURRENT_PHASE.map((option) => {
//               const isSelected = selectedCurrentPhase === option.value;
//               const activeColor = '#759A52';
//               const inactiveColor = '#361A0D';
//               const iconColor = isSelected ? activeColor : inactiveColor;

//               return (
//                 <PrimaryButton
//                   key={option.id}
//                   title={option.label}
//                   onPress={() => setSelectedCurrentPhase(option.value)}
//                   leftIcon={option.leftIcon ? option.leftIcon(iconColor) : null}
//                   rightIcon={
//                     isSelected ? (
//                       <CheckInCircleIcon size={24} color="#759A52" style={{ marginRight: 6 }} />
//                     ) : (
//                       <CheckInCircleIcon size={24} color="#361A0D" style={{ marginRight: 6 }} />
//                     )
//                   }
//                   height={54}
//                   gradientColors={['#e2d2c1', '#e2d2c1']}
//                   textClassName={isSelected ? 'text-[#759A52]' : 'text-[#4A3F35]'}
//                   textStyle={{
//                     fontSize: 14,
//                     fontFamily: 'Outfit-Regular',
//                     width: '100%',
//                     textAlign: 'left',
//                     marginLeft: 24,
//                   }}
//                 />
//               );
//             })}
//           </View>
//         </View>

//         <Text className="mt-6 font-outfitMedium text-[16px]" style={{ color: '#361A0D' }}>
//           Are you currently in the stage of selecting or eliminating allergies?
//         </Text>

//         <View className="my-6 h-[1px] bg-[#361A0D77]" />

//         <View className="flex-row items-center justify-between gap-3">
//           <PrimaryButton
//             textStyle={{ fontFamily: 'Outfit-Medium', fontSize: 14 }}
//             title="Yes, I am"
//             height={45}
//             onPress={() => handleAllergyResponse(true)}
//             className="flex-1"
//           />
//           <PrimaryButton
//             textStyle={{ fontFamily: 'Outfit-Medium', fontSize: 14 }}
//             title="No, not yet"
//             height={45}
//             onPress={() => handleAllergyResponse(false)}
//             className="flex-1"
//           />
//         </View>
//       </View>
//     </FormLayout>
//   );
// }

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormLayout from '@/components/layouts/FormLayout';
import PrimaryButton from '@/components/buttons/PrimaryButton';

import AuthFormTitle from '@/components/texts/auth/FormTitle';
import { useToast } from '@/hooks/useToast';
import { useScreenReady } from '@/hooks/useScreenReady';
import {
  MenoPauseIcon,
  PeriodIcon,
  PostpartumIcon,
  PregnantIcon,
  SignInCuttedCircleIcon,
  WaveInHeartIcon,
} from '@/components/icons';
import { CheckInCircleIcon } from '@/components/icons/CheckInCircleIcon';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
import InputField from '@/components/inputs/Input';

const CURRENT_PHASE = [
  {
    id: 'period',
    label: 'On my period',
    value: 'period',
    leftIcon: (color: string) => (
      <PeriodIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
  {
    id: 'pregnant',
    label: 'Pregnant',
    value: 'pregnant',
    leftIcon: (color: string) => (
      <PregnantIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
  {
    id: 'postpartum',
    label: 'Postpartum',
    value: 'postpartum',
    leftIcon: (color: string) => (
      <PostpartumIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
  {
    id: 'menopause',
    label: 'Menopause',
    value: 'menopause',
    leftIcon: (color: string) => (
      <MenoPauseIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
  {
    id: 'other',
    label: 'Other',
    value: 'other',
    leftIcon: (color: string) => null,
  },
];

export default function LifePhaseScreen() {
  const [selectedCurrentPhase, setSelectedCurrentPhase] = useState<string | null>(null);
  const [showPhaseSelection, setShowPhaseSelection] = useState(false);
  const [customPhase, setCustomPhase] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const router = useRouter();
  const { showError } = useToast();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  const { isRendering, renderError, isContentReady } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  useEffect(() => {
    if (showPhaseSelection) {
      // Animate content in when phase selection becomes visible
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset animations when hidden
      fadeAnim.setValue(0);
      slideAnim.setValue(20);
    }
  }, [showPhaseSelection]);

  const handleOptionSelect = async (option: 'none' | 'issues') => {
    if (option === 'none') {
      await AsyncStorage.setItem('user_has_health_conditions', 'false');
      await AsyncStorage.setItem('user_current_phase', 'none');
      router.push('/(questionnaire)/skin-hair-condition');
    } else {
      setShowPhaseSelection(true);
    }
  };

  const handlePhaseSelect = (phaseValue: string) => {
    if (phaseValue === 'other') {
      setShowCustomInput(true);
      setSelectedCurrentPhase('other');
    } else {
      setSelectedCurrentPhase(phaseValue);
      saveAndNavigate(phaseValue);
    }
  };

  const saveAndNavigate = async (phaseValue: string, customValue?: string) => {
    try {
      await AsyncStorage.setItem('user_has_health_conditions', 'true');
      await AsyncStorage.setItem('user_current_phase', phaseValue);

      if (phaseValue === 'other' && customValue) {
        await AsyncStorage.setItem('user_custom_phase', customValue);
      }

      router.push('/(questionnaire)/skin-hair-condition');
    } catch (error) {
      console.error('Error saving data:', error);
      showError('Failed to save. Please try again.');
    }
  };

  const handleCustomPhaseSubmit = () => {
    if (!customPhase.trim()) {
      showError('Please enter your current phase');
      return;
    }
    saveAndNavigate('other', customPhase.trim());
  };

  const handleRetry = () => {
    router.replace('/(questionnaire)/life-phase');
  };

  if (isRendering) {
    return <LoadingScreen loadingText="Getting to know you..." />;
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
        <View className={'mb-10'}>
          <AuthFormTitle numberOfLines={1} text="Life phase & health" />
          <Text className="text-center font-outfit text-[14px] text-titleTextColor">
            Tell us about yourself to personalize your experience
          </Text>
        </View>

        {/* Option Cards */}
        <BorderlessShadowCard
          onPress={() => handleOptionSelect('none')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            paddingVertical: 14,
            paddingHorizontal: 24,
            marginBottom: 12,
            borderTopWidth: 1.1,
            borderLeftWidth: 1.5,
            borderRightWidth: 1,
            borderBottomWidth: 1,
            borderTopColor: 'rgba(255, 255, 255, 0.7)',
            borderLeftColor: 'rgba(255, 255, 255, 0.8)',
            borderRightColor: 'rgba(255, 255, 255, 0)',
            borderBottomColor: 'rgba(255, 255, 255, 0)',
          }}>
          <View className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2E21170D]">
            <SignInCuttedCircleIcon size={18} color="#361A0D" />
          </View>
          <View>
            <Text className="font-outfitMedium text-[16px] text-[#361A0D]">None</Text>
            <Text className="font-outfit text-[12px] text-[#2E2117A3]">
              No health conditions to report
            </Text>
          </View>
        </BorderlessShadowCard>

        <BorderlessShadowCard
          onPress={() => handleOptionSelect('issues')}
          b_tl={0}
          b_tr={0}
          b_bl={24}
          b_br={24}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            paddingVertical: 14,
            paddingHorizontal: 24,
            borderTopWidth: 1.1,
            borderLeftWidth: 1.5,
            borderRightWidth: 1,
            borderBottomWidth: 1,
            borderTopColor: 'rgba(255, 255, 255, 0.7)',
            borderLeftColor: 'rgba(255, 255, 255, 0.8)',
            borderRightColor: 'rgba(255, 255, 255, 0)',
            borderBottomColor: 'rgba(255, 255, 255, 0)',
          }}>
          <View className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2E21170D]">
            <WaveInHeartIcon size={18} color="#361A0D" />
          </View>
          <View>
            <Text className="font-outfitMedium text-[16px] text-[#361A0D]">I have issues</Text>
            <Text className="font-outfit text-[12px] text-[#2E2117A3]">
              Select your health concerns below
            </Text>
          </View>
        </BorderlessShadowCard>

        {/* Current Phase Section - Animated */}
        {showPhaseSelection && (
          <Animated.View
            style={{
              marginTop: 24,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}>
            <Text className="font-outfit text-[18px] font-semibold text-titleTextColor">
              Current Phase
            </Text>
            <Text className="mb-3 font-outfit text-[14px] text-titleTextColor">
              What is your current phase?
            </Text>

            <View className="gap-3">
              {CURRENT_PHASE.map((option) => {
                const isSelected = selectedCurrentPhase === option.value && !showCustomInput;
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

            {/* Custom Input Section */}
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
                  handler={(_, value) => setCustomPhase(value)}
                  placeHolder="e.g., Trying to conceive, Perimenopause, etc."
                  showLabel={false}
                  height={56}
                  withShadow={true}
                  borderRadius={100}
                  inputStyle={{ fontSize: 13 }}
                />
                <PrimaryButton
                  title="Continue"
                  onPress={handleCustomPhaseSubmit}
                  height={54}
                  gradientColors={['#e2d2c1', '#e2d2c1']}
                  style={{ marginTop: 16 }}
                  textStyle={{
                    fontSize: 14,
                    fontFamily: 'Outfit-Medium',
                  }}
                />
              </Animated.View>
            )}
          </Animated.View>
        )}
      </View>
    </FormLayout>
  );
}
