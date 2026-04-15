// import React, { useState } from 'react';
// import { View, Text, ScrollView, useWindowDimensions } from 'react-native';
// import { useRouter } from 'expo-router';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import FormLayout from '@/components/layouts/FormLayout';
// import PrimaryButton from '@/components/buttons/PrimaryButton';
// import AuthFormTitle from '@/components/texts/auth/FormTitle';
// import { useToast } from '@/hooks/useToast';
// import { useScreenReady } from '@/hooks/useScreenReady';
// import LoadingScreen from '@/components/loading/LoadingScreen';
// import ErrorScreen from '@/components/errors/ErrorScreen';
// import { RadioButton } from '@/components/buttons/RadioButton';

// const ALLERGY_OPTIONS = [
//   { id: 'fragrance', label: 'Fragrance', value: 'Fragrance' },
//   { id: 'parabens', label: 'Parabens', value: 'Parabens' },
//   { id: 'formaldehyde', label: 'Formaldehyde', value: 'Formaldehyde' },
//   { id: 'phenoxyethanol', label: 'Phenoxyethanol', value: 'Phenoxyethanol' },
//   { id: 'retinol', label: 'Retinol', value: 'Retinol' },
//   { id: 'salicylic-acid', label: 'Salicylic Acid', value: 'Salicylic Acid' },
//   { id: 'benzoyl-peroxide', label: 'Benzoyl Peroxide', value: 'Benzoyl Peroxide' },
//   { id: 'alcohol-denat', label: 'Alcohol Denat', value: 'Alcohol Denat' },
//   { id: 'oxybenzone', label: 'Oxybenzone', value: 'Oxybenzone' },
//   { id: 'nickel', label: 'Nickel', value: 'Nickel' },
//   { id: 'sulfates', label: 'Sulfates', value: 'Sulfates' },
//   { id: 'alcohol', label: 'Alcohol', value: 'Alcohol' },
// ];

// export default function AllergiesScreen() {
//   const router = useRouter();
//   const { showError } = useToast();
//   const { width: screenWidth } = useWindowDimensions();
//   const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
//   const { isRendering, isContentReady, renderError } = useScreenReady({
//     dependencies: [],
//     delay: 100,
//     initialReady: false,
//   });

//   const toggleAllergy = (allergyValue: string) => {
//     if (allergyValue === 'none') {
//       setSelectedAllergies([]);
//     } else {
//       if (selectedAllergies.includes(allergyValue)) {
//         setSelectedAllergies(selectedAllergies.filter((item) => item !== allergyValue));
//       } else {
//         setSelectedAllergies([...selectedAllergies, allergyValue]);
//       }
//     }
//   };

//   const handleContinue = async () => {
//     try {
//       await AsyncStorage.setItem('user_allergies', JSON.stringify(selectedAllergies));
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

//   if (isRendering) {
//     return <LoadingScreen loadingText="Loading allergy options..." />;
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
//             {ALLERGY_OPTIONS.map((allergy) => {
//               const isSelected = selectedAllergies.includes(allergy.value);

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
//                       <RadioButton
//                         value={isSelected}
//                         onValueChange={() => toggleAllergy(allergy.value)}
//                         activeColor="#759A52"
//                         inactiveColor="#FFFFFF80"
//                         size={34}
//                         innerCircleSize={20}
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
//           <View className="mt-2">
//             <PrimaryButton
//               title="None of the above"
//               onPress={() => toggleAllergy('none')}
//               leftIcon={
//                 <RadioButton
//                   value={selectedAllergies.length === 0}
//                   onValueChange={() => toggleAllergy('none')}
//                   activeColor="#759A52"
//                   inactiveColor="#FFFFFF80"
//                   size={34}
//                   innerCircleSize={20}
//                 />
//               }
//               height={54}
//               gradientColors={['#e2d2c1', '#e2d2c1']}
//               textClassName={selectedAllergies.length === 0 ? 'text-[#759A52]' : 'text-[#4A3F35]'}
//               textStyle={{
//                 fontSize: 14,
//                 fontFamily: 'Outfit-Medium',
//                 textAlign: 'center',
//               }}
//             />
//           </View>

//           {/* Continue Button */}
//           <View className="mt-8">
//             <PrimaryButton title="Continue" onPress={handleContinue} className="mb-3" />
//           </View>
//         </View>
//       </ScrollView>
//     </FormLayout>
//   );
// }

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
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
  const [customAllergies, setCustomAllergies] = useState<
    Array<{ id: string; label: string; value: string }>
  >([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [manualAllergyInput, setManualAllergyInput] = useState('');
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

  const handleAddManualAllergy = () => {
    if (!manualAllergyInput.trim()) {
      showError('Please enter an allergy');
      return;
    }

    const newAllergy = {
      id: `custom-${Date.now()}`,
      label: manualAllergyInput.trim(),
      value: manualAllergyInput.trim(),
    };

    setCustomAllergies([...customAllergies, newAllergy]);
    setSelectedAllergies([...selectedAllergies, newAllergy.value]);
    setManualAllergyInput('');
    setModalVisible(false);
  };

  const handleRemoveCustomAllergy = (allergyValue: string) => {
    setCustomAllergies(customAllergies.filter((a) => a.value !== allergyValue));
    setSelectedAllergies(selectedAllergies.filter((a) => a !== allergyValue));
  };

  const handleContinue = async () => {
    try {
      const allAllergies = {
        selected: selectedAllergies,
        custom: customAllergies.map((a) => a.value),
      };
      await AsyncStorage.setItem('user_allergies', JSON.stringify(allAllergies));
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

  // Combine predefined allergies with custom allergies
  const allAllergyOptions = [...ALLERGY_OPTIONS, ...customAllergies];

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
            {allAllergyOptions.map((allergy) => {
              const isSelected = selectedAllergies.includes(allergy.value);
              const isCustom = customAllergies.some((c) => c.value === allergy.value);

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

          {/* Add Manual Allergy Button */}
          <View className="mb-2 mt-2">
            <PrimaryButton
              title="+ Add manually"
              onPress={() => setModalVisible(true)}
              height={54}
              gradientColors={['#e2d2c1', '#e2d2c1']}
              textClassName="text-[#759A52]"
              textStyle={{
                fontSize: 14,
                fontFamily: 'Outfit-Medium',
                textAlign: 'center',
              }}
            />
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

      {/* Modal for manual allergy input */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1 items-center justify-center bg-black/50 ">
          <View className="m-6 w-11/12 max-w-md rounded-2xl bg-[#E8DDD0] p-6">
            <Text className="mb-4 text-center font-outfitMedium text-xl text-[#2A2118]">
              Add Allergy Manually
            </Text>

            <Text className="mb-2 font-outfit text-[14px] text-[#361A0D]">
              Enter the allergy name
            </Text>

            <TextInput
              className="mb-4 rounded-xl border border-[#e2d2c1] bg-[#f9f5f0] p-3 font-outfit text-[16px]"
              placeholder="e.g., Latex, Dust, Peanuts..."
              placeholderTextColor="#999"
              value={manualAllergyInput}
              onChangeText={setManualAllergyInput}
              autoFocus={true}
              autoCapitalize="words"
            />

            <View className="flex-row gap-3">
              <TouchableOpacity
                className="flex-1 rounded-xl border border-[#e2d2c1] bg-white py-3"
                onPress={() => {
                  setModalVisible(false);
                  setManualAllergyInput('');
                }}>
                <Text className="text-center font-outfitMedium text-[#361A0D]">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 rounded-xl bg-[#759A52] py-3"
                onPress={handleAddManualAllergy}>
                <Text className="text-center font-outfitMedium text-white">Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </FormLayout>
  );
}
