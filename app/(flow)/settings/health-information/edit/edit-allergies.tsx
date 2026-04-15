// // app/(flow)/settings/health-information/edit-allergies.tsx
// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, useWindowDimensions } from 'react-native';
// import { useRouter } from 'expo-router';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import CustomHeader from '@/components/header/CustomHeader';
// import { LAYOUT } from '@/constants/constants';
// import { useToast } from '@/hooks/useToast';
// import { useScreenReady } from '@/hooks/useScreenReady';
// import LoadingScreen from '@/components/loading/LoadingScreen';
// import ErrorScreen from '@/components/errors/ErrorScreen';
// import PrimaryButton from '@/components/buttons/PrimaryButton';
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

// export default function EditAllergiesScreen() {
//   const router = useRouter();
//   const { showSuccess, showError } = useToast();
//   const { width: screenWidth } = useWindowDimensions();

//   const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
//   const [isSaving, setIsSaving] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const { isRendering, isContentReady, renderError } = useScreenReady({
//     dependencies: [],
//     delay: 100,
//     initialReady: false,
//   });

//   useEffect(() => {
//     loadAllergies();
//   }, []);

//   const loadAllergies = async () => {
//     try {
//       const saved = await AsyncStorage.getItem('user_allergies');
//       if (saved) {
//         setSelectedAllergies(JSON.parse(saved));
//       }
//     } catch (error) {
//       console.error('Error loading allergies:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const toggleAllergy = (allergyValue: string) => {
//     if (selectedAllergies.includes(allergyValue)) {
//       setSelectedAllergies(selectedAllergies.filter((item) => item !== allergyValue));
//     } else {
//       setSelectedAllergies([...selectedAllergies, allergyValue]);
//     }
//   };

//   const handleSave = async () => {
//     setIsSaving(true);
//     try {
//       await AsyncStorage.setItem('user_allergies', JSON.stringify(selectedAllergies));
//       showSuccess('Allergies updated successfully');
//       router.back();
//     } catch (error) {
//       showError('Failed to update');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleRetry = () => {
//     router.replace('/(flow)/settings/health-information/edit/edit-allergies');
//   };

//   // Determine number of columns based on screen width
//   const getColumnsCount = () => {
//     if (screenWidth < 380) return 1;
//     if (screenWidth < 600) return 2;
//     return 3;
//   };

//   const columns = getColumnsCount();

//   if (isRendering || isLoading) {
//     return (
//       <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
//         <LoadingScreen loadingText="Loading allergies..." />
//       </SafeAreaView>
//     );
//   }

//   if (renderError) {
//     return (
//       <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
//         <CustomHeader title="Edit Allergies" height={50} backButton={true} />
//         <ErrorScreen message={renderError} onRetry={handleRetry} />
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
//       <CustomHeader title="Edit Allergies" height={50} backButton={true} />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{
//           paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
//           paddingTop: 24,
//           flexGrow: 1,
//         }}
//         className="flex-1">
//         <View
//           className="px-container"
//           style={{
//             opacity: isContentReady ? 1 : 0,
//             transform: [{ translateY: isContentReady ? 0 : 10 }],
//           }}>
//           <Text className="mb-4 font-outfit text-[16px] text-titleTextColor">
//             Select your allergies (multiple selection)
//           </Text>

//           {/* Allergies Grid - Responsive columns */}
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

//           <View className="mt-6 gap-3">
//             <PrimaryButton
//               title={isSaving ? 'Saving...' : 'Save Changes'}
//               onPress={handleSave}
//               disabled={isSaving}
//               isLoading={isSaving}
//             />
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// app/(flow)/settings/health-information/edit-allergies.tsx
import React, { useState, useEffect } from 'react';
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

interface CustomAllergy {
  id: string;
  label: string;
  value: string;
}

// Mock initial data - replace with API call later
const MOCK_SELECTED_ALLERGIES = ['Fragrance', 'Parabens'];
const MOCK_CUSTOM_ALLERGIES: CustomAllergy[] = [];

export default function EditAllergiesScreen() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const { width: screenWidth } = useWindowDimensions();

  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [customAllergies, setCustomAllergies] = useState<CustomAllergy[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [manualAllergyInput, setManualAllergyInput] = useState('');
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
      // TODO: Replace with actual API call
      // const response = await api.getAllergies();
      // setSelectedAllergies(response.data.selected);
      // setCustomAllergies(response.data.custom);

      // Using mock data for now
      setTimeout(() => {
        setSelectedAllergies(MOCK_SELECTED_ALLERGIES);
        setCustomAllergies(MOCK_CUSTOM_ALLERGIES);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error loading allergies:', error);
      setSelectedAllergies([]);
      setCustomAllergies([]);
      setIsLoading(false);
    }
  };

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

    // Check if allergy already exists (case insensitive)
    const exists = [...ALLERGY_OPTIONS, ...customAllergies].some(
      (a) => a.value.toLowerCase() === manualAllergyInput.trim().toLowerCase()
    );

    if (exists) {
      showError('This allergy already exists in the list');
      return;
    }

    const newAllergy: CustomAllergy = {
      id: `custom-${Date.now()}`,
      label: manualAllergyInput.trim(),
      value: manualAllergyInput.trim(),
    };

    setCustomAllergies([...customAllergies, newAllergy]);
    setSelectedAllergies([...selectedAllergies, newAllergy.value]);
    setManualAllergyInput('');
    setModalVisible(false);
    showSuccess('Allergy added successfully');
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Replace with actual API call
      // await api.updateAllergies({
      //   selected: selectedAllergies,
      //   custom: customAllergies.map((a) => a.value)
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      showSuccess('Allergies updated successfully');
      router.back();
    } catch (error) {
      console.error('Error saving allergies:', error);
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

  // Combine predefined allergies with custom allergies
  const allAllergyOptions = [...ALLERGY_OPTIONS, ...customAllergies];

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

          {/* Save Changes Button */}
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

      {/* Modal for manual allergy input */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1 items-center justify-center bg-black/50">
          <View className="m-6 w-11/12 max-w-md rounded-2xl bg-[#E8DDD0] p-6">
            <Text className="mb-4 text-center font-outfitMedium text-xl text-[#361A0D]">
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
    </SafeAreaView>
  );
}
