// // app/(questionnaire)/allergies.tsx
// import React, { useState } from 'react';
// import { View, Text, ScrollView, useWindowDimensions, Animated, Easing } from 'react-native';
// import { useRouter } from 'expo-router';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import FormLayout from '@/components/layouts/FormLayout';
// import PrimaryButton from '@/components/buttons/PrimaryButton';
// import AuthFormTitle from '@/components/texts/auth/FormTitle';
// import { useToast } from '@/hooks/useToast';
// import { useScreenReady } from '@/hooks/useScreenReady';
// import LoadingScreen from '@/components/loading/LoadingScreen';
// import ErrorScreen from '@/components/errors/ErrorScreen';
// import { CheckIconButton } from '@/components/CheckIconButton';
// import InputField from '@/components/inputs/Input';

// const ALLERGY_OPTIONS = [
//   { id: 'fragrance', label: 'Fragrance', value: 'Fragrance' },
//   { id: 'parabens', label: 'Parabens', value: 'Parabens' },
//   { id: 'formaldehyde', label: 'Formaldehyde', value: 'Formaldehyde' },
//   { id: 'phenoxyethanol', label: 'Phenoxyethanol', value: 'Phenoxyethanol' },
//   { id: 'retinol', label: 'Retinol', value: 'Retinol' },
//   { id: 'salicylic-acid', label: 'Salicylic Acid', value: 'Salicylic Acid' },
// ];

// export default function AllergiesScreen() {
//   const router = useRouter();
//   const { showError } = useToast();
//   const { width: screenWidth } = useWindowDimensions();
//   const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
//   const [showCustomInput, setShowCustomInput] = useState(false);
//   const [customAllergy, setCustomAllergy] = useState('');
//   const [customAllergiesList, setCustomAllergiesList] = useState<string[]>([]);

//   // Animation values
//   const fadeAnim = React.useRef(new Animated.Value(0)).current;
//   const slideAnim = React.useRef(new Animated.Value(20)).current;

//   const { isRendering, isContentReady, renderError } = useScreenReady({
//     dependencies: [],
//     delay: 100,
//     initialReady: false,
//   });

//   React.useEffect(() => {
//     if (showCustomInput) {
//       Animated.parallel([
//         Animated.timing(fadeAnim, {
//           toValue: 1,
//           duration: 300,
//           easing: Easing.out(Easing.cubic),
//           useNativeDriver: true,
//         }),
//         Animated.timing(slideAnim, {
//           toValue: 0,
//           duration: 300,
//           easing: Easing.out(Easing.cubic),
//           useNativeDriver: true,
//         }),
//       ]).start();
//     } else {
//       fadeAnim.setValue(0);
//       slideAnim.setValue(20);
//     }
//   }, [showCustomInput]);

//   const toggleAllergy = (allergyValue: string) => {
//     if (allergyValue === 'none') {
//       setSelectedAllergies([]);
//       setCustomAllergiesList([]);
//       setShowCustomInput(false);
//       setCustomAllergy('');
//     } else if (allergyValue === 'other') {
//       setShowCustomInput(!showCustomInput);
//       if (!showCustomInput) {
//         setCustomAllergy('');
//       }
//     } else {
//       if (selectedAllergies.includes(allergyValue)) {
//         setSelectedAllergies(selectedAllergies.filter((item) => item !== allergyValue));
//       } else {
//         setSelectedAllergies([...selectedAllergies, allergyValue]);
//       }
//     }
//   };

//   const handleContinue = async () => {
//     // If custom input is shown and has value, add it before continuing
//     let finalSelectedAllergies = [...selectedAllergies];
//     let finalCustomList = [...customAllergiesList];

//     if (showCustomInput && customAllergy.trim()) {
//       const newAllergy = customAllergy.trim();
//       if (!finalSelectedAllergies.includes(newAllergy)) {
//         finalSelectedAllergies.push(newAllergy);
//         finalCustomList.push(newAllergy);
//       }
//     }

//     // if (finalSelectedAllergies.length === 0) {
//     //   showError('Please select at least one allergy or enter a custom allergy');
//     //   return;
//     // }

//     try {
//       const allAllergies = {
//         selected: finalSelectedAllergies,
//         custom: finalCustomList,
//       };
//       await AsyncStorage.setItem('user_allergies', JSON.stringify(allAllergies));
//       router.push('/(questionnaire)/skin-hair-condition');
//     } catch (error) {
//       console.error('Error saving allergies:', error);
//       showError('Failed to save. Please try again.');
//     }
//   };

//   const handleRetry = () => {
//     router.replace('/(questionnaire)/allergies');
//   };

//   // Determine number of columns based on screen width
//   const getColumnsCount = () => {
//     if (screenWidth < 380) return 1;
//     if (screenWidth < 600) return 2;
//     return 3;
//   };

//   const columns = getColumnsCount();

//   // Combine predefined options with custom allergies
//   const allAllergyOptions = [
//     ...ALLERGY_OPTIONS,
//     ...customAllergiesList.map((allergy, index) => ({
//       id: `custom_${index}`,
//       label: allergy,
//       value: allergy,
//     })),
//   ];

//   if (isRendering) {
//     return <LoadingScreen loadingText="Loading allergy options..." transparent={true} />;
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
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
//         <View
//           className="px-container py-9"
//           style={{
//             opacity: isContentReady ? 1 : 0,
//             transform: [{ translateY: isContentReady ? 0 : 10 }],
//           }}>
//           <View className="mb-8">
//             <AuthFormTitle text="Allergies" />
//             <Text className="text-center font-outfit text-[14px] text-titleTextColor">
//               Do you have any allergies?
//             </Text>
//           </View>

//           {/* Allergies Grid - Responsive columns using flex */}
//           <View
//             style={{
//               flexDirection: 'row',
//               flexWrap: 'wrap',
//               justifyContent: 'space-between',
//             }}>
//             {allAllergyOptions.map((allergy) => {
//               const isSelected = selectedAllergies.includes(allergy.value);
//               const isCustom = customAllergiesList.includes(allergy.value);

//               return (
//                 <View
//                   key={allergy.id}
//                   style={{
//                     width: columns === 1 ? '100%' : `${100 / columns - 2}%`,
//                     marginBottom: 12,
//                   }}>
//                   <PrimaryButton
//                     title={allergy.label}
//                     onPress={() => toggleAllergy(allergy.value)}
//                     leftIcon={
//                       <CheckIconButton
//                         value={isSelected}
//                         onValueChange={() => toggleAllergy(allergy.value)}
//                         activeColor="#759A52"
//                         inactiveColor="#361A0D"
//                         size={24}
//                       />
//                     }
//                     height={54}
//                     gradientColors={['#e2d2c1', '#e2d2c1']}
//                     textClassName={isSelected ? 'text-[#759A52]' : 'text-[#4A3F35]'}
//                     textStyle={{
//                       fontSize: columns === 1 ? 14 : 12,
//                       fontFamily: 'Outfit-Medium',
//                       textAlign: 'center',
//                       flexWrap: 'wrap',
//                       flexShrink: 1,
//                       marginLeft: columns === 1 ? 0 : 10,
//                     }}
//                   />
//                 </View>
//               );
//             })}
//           </View>

//           {/* None of the above option - Full width */}
//           <View className="mt-0">
//             <PrimaryButton
//               title="None of the above"
//               onPress={() => toggleAllergy('none')}
//               leftIcon={
//                 <CheckIconButton
//                   value={selectedAllergies.length === 0 && customAllergiesList.length === 0}
//                   onValueChange={() => toggleAllergy('none')}
//                   activeColor="#759A52"
//                   inactiveColor="#361A0D"
//                   size={24}
//                 />
//               }
//               height={54}
//               gradientColors={['#e2d2c1', '#e2d2c1']}
//               textClassName={
//                 selectedAllergies.length === 0 && customAllergiesList.length === 0
//                   ? 'text-[#759A52]'
//                   : 'text-[#4A3F35]'
//               }
//               textStyle={{
//                 fontSize: 14,
//                 fontFamily: 'Outfit-Medium',
//                 textAlign: 'center',
//               }}
//             />
//           </View>

//           {/* Other Option */}
//           <View className="mt-4">
//             <PrimaryButton
//               title="Other"
//               onPress={() => toggleAllergy('other')}
//               leftIcon={
//                 <CheckIconButton
//                   value={showCustomInput}
//                   onValueChange={() => toggleAllergy('other')}
//                   activeColor="#759A52"
//                   inactiveColor="#361A0D"
//                   size={24}
//                 />
//               }
//               height={54}
//               gradientColors={['#e2d2c1', '#e2d2c1']}
//               textClassName={showCustomInput ? 'text-[#759A52]' : 'text-[#4A3F35]'}
//               textStyle={{
//                 fontSize: 14,
//                 fontFamily: 'Outfit-Medium',
//                 textAlign: 'center',
//               }}
//             />
//           </View>

//           {/* Custom Input Section */}
//           {showCustomInput && (
//             <Animated.View
//               style={{
//                 marginTop: 16,
//                 opacity: fadeAnim,
//                 transform: [{ translateY: slideAnim }],
//               }}>
//               <InputField
//                 value={customAllergy}
//                 handler={(_, val) => setCustomAllergy(val)}
//                 placeHolder="Enter your allergy (e.g., Latex, Dust, etc.)"
//                 showLabel={false}
//                 height={56}
//                 withShadow={true}
//                 borderRadius={100}
//                 inputStyle={{ fontSize: 13 }}
//                 animated={true}
//                 animationDuration={200}
//                 initialOpacity={0}
//               />
//             </Animated.View>
//           )}

//           {/* Continue Button */}
//           <View className="mt-8">
//             <PrimaryButton title="Continue" onPress={handleContinue} className="mb-3" />
//           </View>
//         </View>
//       </ScrollView>
//     </FormLayout>
//   );
// }

// app/(questionnaire)/allergies.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, useWindowDimensions, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormLayout from '@/components/layouts/FormLayout';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import AuthFormTitle from '@/components/texts/auth/FormTitle';
import { useToast } from '@/hooks/useToast';
import { useScreenReady } from '@/hooks/useScreenReady';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';
import { CheckIconButton } from '@/components/CheckIconButton';
import InputField from '@/components/inputs/Input';
import { useGetAllergiesQuery, useSaveAllergiesMutation } from '@/store/api/onboardingApi';

const ALLERGY_OPTIONS = [
  { id: 'fragrance', label: 'Fragrance', value: 'Fragrance' },
  { id: 'parabens', label: 'Parabens', value: 'Parabens' },
  { id: 'formaldehyde', label: 'Formaldehyde', value: 'Formaldehyde' },
  { id: 'phenoxyethanol', label: 'Phenoxyethanol', value: 'Phenoxyethanol' },
  { id: 'retinol', label: 'Retinol', value: 'Retinol' },
  { id: 'salicylic-acid', label: 'Salicylic Acid', value: 'Salicylic Acid' },
];

const PREDEFINED_VALUES = ALLERGY_OPTIONS.map((o) => o.value);

export default function AllergiesScreen() {
  const router = useRouter();
  const { showError } = useToast();
  const { width: screenWidth } = useWindowDimensions();
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customAllergy, setCustomAllergy] = useState('');
  const [customAllergiesList, setCustomAllergiesList] = useState<string[]>([]);

  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(20)).current;

  // ✅ Fetch previously saved allergies
  const { data: savedAllergies, isLoading: isLoadingSaved } = useGetAllergiesQuery();

  // ✅ Save allergies mutation
  const [saveAllergies, { isLoading: isSaving }] = useSaveAllergiesMutation();

  const { isRendering, isContentReady, renderError } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  // ✅ Pre-fill with previously saved allergies
  useEffect(() => {
    if (savedAllergies?.allergies && savedAllergies.allergies.length > 0) {
      const predefined = savedAllergies.allergies.filter((a) => PREDEFINED_VALUES.includes(a));
      const custom = savedAllergies.allergies.filter((a) => !PREDEFINED_VALUES.includes(a));
      setSelectedAllergies(predefined);
      if (custom.length > 0) {
        setCustomAllergiesList(custom);
        setSelectedAllergies((prev) => [...prev, ...custom]);
      }
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

  const toggleAllergy = (allergyValue: string) => {
    if (allergyValue === 'none') {
      setSelectedAllergies([]);
      setCustomAllergiesList([]);
      setShowCustomInput(false);
      setCustomAllergy('');
    } else if (allergyValue === 'other') {
      setShowCustomInput(!showCustomInput);
      if (!showCustomInput) {
        setCustomAllergy('');
      }
    } else {
      if (selectedAllergies.includes(allergyValue)) {
        setSelectedAllergies(selectedAllergies.filter((item) => item !== allergyValue));
      } else {
        setSelectedAllergies([...selectedAllergies, allergyValue]);
      }
    }
  };

  const handleContinue = async () => {
    let finalSelectedAllergies = [...selectedAllergies];
    let finalCustomList = [...customAllergiesList];

    // Add any typed custom allergy that hasn't been added yet
    if (showCustomInput && customAllergy.trim()) {
      const newAllergy = customAllergy.trim();
      if (!finalSelectedAllergies.includes(newAllergy)) {
        finalSelectedAllergies.push(newAllergy);
        finalCustomList.push(newAllergy);
      }
    }

    try {
      // ✅ Call the API
      await saveAllergies({
        allergies: finalSelectedAllergies,
        custom_text: finalCustomList.length > 0 ? finalCustomList.join(', ') : null,
      }).unwrap();

      // ✅ Also persist locally as backup
      await AsyncStorage.setItem(
        'user_allergies',
        JSON.stringify({
          selected: finalSelectedAllergies,
          custom: finalCustomList,
        })
      );

      router.push('/(questionnaire)/skin-hair-condition');
    } catch (error: any) {
      console.error('Error saving allergies:', error);
      showError(error?.data?.message || 'Failed to save. Please try again.');
    }
  };

  const handleRetry = () => {
    router.replace('/(questionnaire)/allergies');
  };

  const getColumnsCount = () => {
    if (screenWidth < 380) return 1;
    if (screenWidth < 600) return 2;
    return 3;
  };

  const columns = getColumnsCount();

  const allAllergyOptions = [
    ...ALLERGY_OPTIONS,
    ...customAllergiesList.map((allergy, index) => ({
      id: `custom_${index}`,
      label: allergy,
      value: allergy,
    })),
  ];

  if (isRendering || isLoadingSaved) {
    return <LoadingScreen loadingText="Loading allergy options..." transparent={true} />;
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

          {/* Allergies Grid */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {allAllergyOptions.map((allergy) => {
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
                      <CheckIconButton
                        value={isSelected}
                        onValueChange={() => toggleAllergy(allergy.value)}
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
                      marginLeft: columns === 1 ? 0 : 10,
                    }}
                  />
                </View>
              );
            })}
          </View>

          {/* None of the above */}
          <View className="mt-0">
            <PrimaryButton
              title="None of the above"
              onPress={() => toggleAllergy('none')}
              leftIcon={
                <CheckIconButton
                  value={selectedAllergies.length === 0 && customAllergiesList.length === 0}
                  onValueChange={() => toggleAllergy('none')}
                  activeColor="#759A52"
                  inactiveColor="#361A0D"
                  size={24}
                />
              }
              height={54}
              gradientColors={['#e2d2c1', '#e2d2c1']}
              textClassName={
                selectedAllergies.length === 0 && customAllergiesList.length === 0
                  ? 'text-[#759A52]'
                  : 'text-[#4A3F35]'
              }
              textStyle={{ fontSize: 14, fontFamily: 'Outfit-Medium', textAlign: 'center' }}
            />
          </View>

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

          {/* Custom Input */}
          {showCustomInput && (
            <Animated.View
              style={{
                marginTop: 16,
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}>
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

          {/* Continue Button */}
          <View className="mt-8">
            <PrimaryButton
              title={isSaving ? 'Saving...' : 'Continue'}
              onPress={handleContinue}
              className="mb-3"
              disabled={isSaving}
            />
          </View>
        </View>
      </ScrollView>
    </FormLayout>
  );
}
