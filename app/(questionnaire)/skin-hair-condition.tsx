// import React, { useState, useRef } from 'react';
// import { View, Text, TextInput, Modal, ActivityIndicator, Animated } from 'react-native';
// import { useRouter } from 'expo-router';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import FormLayout from '@/components/layouts/FormLayout';
// import PrimaryButton from '@/components/buttons/PrimaryButton';
// import AuthFormTitle from '@/components/texts/auth/FormTitle';
// import { useToast } from '@/hooks/useToast';
// import { useScreenReady } from '@/hooks/useScreenReady';
// import {
//   CoilyOrKinkyHairIcon,
//   CrossIcon,
//   CurlyHairIcon,
//   StraightHairIcon,
//   WavyHairIcon,
// } from '@/components/icons';
// import { CheckInCircleIcon } from '@/components/icons/CheckInCircleIcon';
// import { PlusInCircleIcon } from '@/components/icons';

// // ==================== HAIR TYPE (with icons) ====================
// const HAIR_TYPE = [
//   {
//     id: 'wavy',
//     label: 'Wavy',
//     value: 'wavy',
//     leftIcon: (color: string) => (
//       <WavyHairIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
//     ),
//   },
//   {
//     id: 'straight',
//     label: 'Straight',
//     value: 'straight',
//     leftIcon: (color: string) => (
//       <StraightHairIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
//     ),
//   },
//   {
//     id: 'curly',
//     label: 'Curly',
//     value: 'curly',
//     leftIcon: (color: string) => (
//       <CurlyHairIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
//     ),
//   },
//   {
//     id: 'coily_or_kinky',
//     label: 'Coily or Kinky',
//     value: 'coily_or_kinky',
//     leftIcon: (color: string) => (
//       <CoilyOrKinkyHairIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
//     ),
//   },
// ];

// // ==================== HAIR CONCERNS (preset options) ====================
// const HAIR_CONCERNS_OPTIONS = [
//   { id: 'hair_fall', label: 'Hair Fall', value: 'hair_fall' },
//   { id: 'dandruff', label: 'Dandruff', value: 'dandruff' },
//   { id: 'dry_scalp', label: 'Dry Scalp', value: 'dry_scalp' },
//   { id: 'oily_scalp', label: 'Oily Scalp', value: 'oily_scalp' },
//   { id: 'frizz', label: 'Frizz', value: 'frizz' },
//   { id: 'damage', label: 'Damage', value: 'damage' },
// ];

// export default function HairConditionScreen() {
//   const [selectedHairType, setSelectedHairType] = useState<string | null>(null);
//   const [selectedHairConcerns, setSelectedHairConcerns] = useState<string[]>([]);

//   // Modal state
//   const [modalVisible, setModalVisible] = useState(false);
//   const [isAdding, setIsAdding] = useState(false);
//   const [currentConcern, setCurrentConcern] = useState('');

//   // Animation values
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const scaleAnim = useRef(new Animated.Value(0.95)).current;
//   const backdropAnim = useRef(new Animated.Value(0)).current;

//   const router = useRouter();
//   const { showError } = useToast();

//   const { isRendering, isContentReady } = useScreenReady({
//     dependencies: [],
//     delay: 100,
//     initialReady: false,
//   });

//   const openModal = () => {
//     setModalVisible(true);
//     Animated.parallel([
//       Animated.timing(backdropAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
//       Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
//       Animated.spring(scaleAnim, { toValue: 1, friction: 8, tension: 40, useNativeDriver: true }),
//     ]).start();
//   };

//   const closeModal = () => {
//     Animated.parallel([
//       Animated.timing(backdropAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
//       Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
//       Animated.timing(scaleAnim, { toValue: 0.95, duration: 150, useNativeDriver: true }),
//     ]).start(() => {
//       setModalVisible(false);
//       setCurrentConcern('');
//       setIsAdding(false);
//     });
//   };

//   const addConcern = () => {
//     if (!currentConcern.trim()) return;

//     setIsAdding(true);

//     setTimeout(() => {
//       setSelectedHairConcerns([...selectedHairConcerns, currentConcern.trim()]);
//       setCurrentConcern('');
//       setIsAdding(false);
//       closeModal();
//     }, 500);
//   };

//   const removeConcern = (index: number) => {
//     setSelectedHairConcerns(selectedHairConcerns.filter((_, i) => i !== index));
//   };

//   const handleNext = async () => {
//     if (!selectedHairType) {
//       showError('Please select your hair type');
//       return;
//     }

//     try {
//       await AsyncStorage.setItem('user_hair_type', selectedHairType);
//       await AsyncStorage.setItem('user_hair_concerns', JSON.stringify(selectedHairConcerns));
//       router.push('/(questionnaire)/budget');
//     } catch (error) {
//       showError('Failed to save. Please try again.');
//     }
//   };

//   if (isRendering) {
//     return (
//       <FormLayout>
//         <View className="flex-1 items-center justify-center px-container">
//           <ActivityIndicator size="large" color="#95B287" />
//         </View>
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
//           <AuthFormTitle numberOfLines={1} text="Hair Profile" />
//           <Text className="text-center font-outfit text-[14px] text-titleTextColor">
//             Tell us about your hair to personalize your experience
//           </Text>
//         </View>

//         {/* Hair Type Section */}
//         <View className="mb-6">
//           <Text className="font-outfit text-[18px] font-semibold text-titleTextColor">
//             Hair Type
//           </Text>
//           <Text className="mb-3 font-outfit text-[14px] text-titleTextColor">
//             How would you describe your hair?
//           </Text>
//           <View className="gap-3">
//             {HAIR_TYPE.map((option) => {
//               const isSelected = selectedHairType === option.value;
//               const activeColor = '#759A52';
//               const inactiveColor = '#361A0D';
//               const iconColor = isSelected ? activeColor : inactiveColor;

//               return (
//                 <PrimaryButton
//                   key={option.id}
//                   title={option.label}
//                   onPress={() => setSelectedHairType(option.value)}
//                   leftIcon={option.leftIcon(iconColor)}
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
//                     marginLeft: 28,
//                   }}
//                 />
//               );
//             })}
//           </View>
//         </View>

//         {/* Hair Concerns Section */}
//         <View className="mb-8">
//           <Text className="font-outfit text-[18px] font-semibold text-titleTextColor">
//             Hair Concerns
//           </Text>
//           <Text className="mb-3 font-outfit text-[14px] text-titleTextColor">
//             What hair concerns do you have? (Select all that apply)
//           </Text>

//           {/* Existing Hair Concerns */}
//           {selectedHairConcerns.length > 0 && (
//             <View className="mb-4 gap-3">
//               {selectedHairConcerns.map((concern, index) => (
//                 <PrimaryButton
//                   key={`concern-${index}`}
//                   title={concern}
//                   onPress={() => removeConcern(index)}
//                   rightIcon={<CrossIcon size={24} color="#361A0D99" />}
//                   height={54}
//                   gradientColors={['#e2d2c1', '#e2d2c1']}
//                   textStyle={{
//                     fontSize: 14,
//                     fontFamily: 'Outfit-Regular',
//                   }}
//                 />
//               ))}
//             </View>
//           )}

//           {/* Preset Hair Concerns */}
//           <View className="mb-4 flex-row flex-wrap gap-3">
//             {HAIR_CONCERNS_OPTIONS.map((option) => (
//               <PrimaryButton
//                 key={option.id}
//                 title={option.label}
//                 onPress={() => {
//                   if (!selectedHairConcerns.includes(option.value)) {
//                     setSelectedHairConcerns([...selectedHairConcerns, option.value]);
//                   }
//                 }}
//                 height={40}
//                 withShadow={false}
//                 gradientColors={['#E8DDD0', '#E8DDD0']}
//                 textClassName="text-[#4A3F35]"
//                 textStyle={{ fontSize: 14 }}
//                 className="px-4"
//               />
//             ))}
//           </View>

//           {/* Add Custom Hair Concern Button */}
//           <PrimaryButton
//             title="Add custom concern"
//             onPress={openModal}
//             height={54}
//             gradientColors={['#e2d2c1', '#e2d2c1']}
//             textClassName="text-[#4A3F35]"
//             leftIcon={<PlusInCircleIcon size={34} color="#95B287" />}
//             textStyle={{
//               fontSize: 16,
//               fontFamily: 'Outfit-Medium',
//             }}
//           />
//         </View>

//         <PrimaryButton title="Continue" onPress={handleNext} className="mb-3" />
//       </View>

//       {/* Modal for Adding Custom Concern */}
//       <Modal
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={closeModal}
//         animationType="none">
//         <Animated.View
//           className="flex-1 items-center justify-center"
//           style={{
//             backgroundColor: backdropAnim.interpolate({
//               inputRange: [0, 1],
//               outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)'],
//             }),
//           }}>
//           <Animated.View
//             className="mx-6 rounded-3xl bg-[#E8DDD0] p-6 shadow-xl"
//             style={{ width: 320, opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
//             {isAdding ? (
//               <View className="items-center py-8">
//                 <ActivityIndicator size="large" color="#95B287" />
//                 <Text className="mt-4 font-outfit text-[16px] text-titleTextColor">
//                   Adding hair concern...
//                 </Text>
//               </View>
//             ) : (
//               <>
//                 <View className="mb-4 items-center">
//                   <Text className="font-outfit text-[20px] font-semibold text-titleTextColor">
//                     Add Hair Concern
//                   </Text>
//                   <Text className="mt-1 text-center font-outfit text-[14px] text-titleTextColor/70">
//                     Enter the hair concern you want to add
//                   </Text>
//                 </View>

//                 <TextInput
//                   value={currentConcern}
//                   onChangeText={setCurrentConcern}
//                   placeholder="e.g., split ends, thinning, breakage"
//                   placeholderTextColor="#A7A5AF"
//                   className="mb-6 rounded-full border border-[#E8DDD0] bg-white px-5 py-4 font-outfit text-[16px] text-[#4A3F35]"
//                   autoFocus
//                 />

//                 <View className="flex-row gap-3">
//                   <PrimaryButton
//                     onPress={closeModal}
//                     title="Cancel"
//                     style={{ flex: 1 }}
//                     height={54}
//                   />
//                   <PrimaryButton
//                     gradientColors={['#95B287', '#95B287']}
//                     onPress={addConcern}
//                     title="Add"
//                     style={{ flex: 1 }}
//                     height={54}
//                   />
//                 </View>
//               </>
//             )}
//           </Animated.View>
//         </Animated.View>
//       </Modal>
//     </FormLayout>
//   );
// }

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Modal, ActivityIndicator, Animated } from 'react-native';
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
  CrossIcon,
  CurlyHairIcon,
  DrySkinIcon,
  NormalSkinIcon,
  OilySkinIcon,
  SensitiveSkinIcon,
  StraightHairIcon,
  WavyHairIcon,
} from '@/components/icons';
import { CheckInCircleIcon } from '@/components/icons/CheckInCircleIcon';
import { PlusInCircleIcon } from '@/components/icons';

// ==================== SKIN TYPE (with icons) ====================
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
    id: 'oily',
    label: 'Oily',
    value: 'oily',
    leftIcon: (color: string) => (
      <OilySkinIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
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
    id: 'sensitive',
    label: 'Sensitive',
    value: 'sensitive',
    leftIcon: (color: string) => (
      <SensitiveSkinIcon width={24} height={24} color={color} style={{ marginLeft: 6 }} />
    ),
  },
];

// ==================== SKIN CONCERNS (preset options) ====================
const SKIN_CONCERNS_OPTIONS = [
  { id: 'acne', label: 'Acne', value: 'acne' },
  { id: 'wrinkles', label: 'Wrinkles', value: 'wrinkles' },
  { id: 'dark_spots', label: 'Dark Spots', value: 'dark_spots' },
  { id: 'redness', label: 'Redness', value: 'redness' },
  { id: 'dullness', label: 'Dullness', value: 'dullness' },
  { id: 'large_pores', label: 'Large Pores', value: 'large_pores' },
];

// ==================== HAIR TYPE (with icons) ====================
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

// ==================== HAIR CONCERNS (preset options) ====================
const HAIR_CONCERNS_OPTIONS = [
  { id: 'hair_fall', label: 'Hair Fall', value: 'hair_fall' },
  { id: 'dandruff', label: 'Dandruff', value: 'dandruff' },
  { id: 'dry_scalp', label: 'Dry Scalp', value: 'dry_scalp' },
  { id: 'oily_scalp', label: 'Oily Scalp', value: 'oily_scalp' },
  { id: 'frizz', label: 'Frizz', value: 'frizz' },
  { id: 'damage', label: 'Damage', value: 'damage' },
];

export default function SkinHairConditionScreen() {
  const [selectedSkinType, setSelectedSkinType] = useState<string | null>(null);
  const [selectedSkinConcerns, setSelectedSkinConcerns] = useState<string[]>([]);
  const [selectedHairType, setSelectedHairType] = useState<string | null>(null);
  const [selectedHairConcerns, setSelectedHairConcerns] = useState<string[]>([]);

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentConcern, setCurrentConcern] = useState('');
  const [concernType, setConcernType] = useState<'skin' | 'hair'>('skin');
  const [modalReady, setModalReady] = useState(false);

  const router = useRouter();
  const { showError } = useToast();

  const { isRendering, isContentReady } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  // Reset modal ready when modal opens
  useEffect(() => {
    if (modalVisible) {
      setModalReady(false);
      setTimeout(() => {
        setModalReady(true);
      }, 50);
    }
  }, [modalVisible]);

  const openModal = (type: 'skin' | 'hair') => {
    setConcernType(type);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentConcern('');
    setIsAdding(false);
    setModalReady(false);
  };

  const addConcern = () => {
    if (!currentConcern.trim()) return;

    setIsAdding(true);

    setTimeout(() => {
      const newConcern = currentConcern.trim();
      if (concernType === 'skin') {
        setSelectedSkinConcerns([...selectedSkinConcerns, newConcern]);
      } else {
        setSelectedHairConcerns([...selectedHairConcerns, newConcern]);
      }
      setCurrentConcern('');
      setIsAdding(false);
      closeModal();
    }, 500);
  };

  const removeSkinConcern = (index: number) => {
    setSelectedSkinConcerns(selectedSkinConcerns.filter((_, i) => i !== index));
  };

  const removeHairConcern = (index: number) => {
    setSelectedHairConcerns(selectedHairConcerns.filter((_, i) => i !== index));
  };

  const handleNext = async () => {
    if (!selectedSkinType) {
      showError('Please select your skin type');
      return;
    }

    try {
      await AsyncStorage.setItem('user_skin_type', selectedSkinType);
      await AsyncStorage.setItem('user_skin_concerns', JSON.stringify(selectedSkinConcerns));
      await AsyncStorage.setItem('user_hair_type', selectedHairType || '');
      await AsyncStorage.setItem('user_hair_concerns', JSON.stringify(selectedHairConcerns));
      router.push('/(questionnaire)/budget');
    } catch (error) {
      showError('Failed to save. Please try again.');
    }
  };

  if (isRendering) {
    return (
      <FormLayout>
        <View className="flex-1 items-center justify-center px-container">
          <ActivityIndicator size="large" color="#95B287" />
        </View>
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
          <AuthFormTitle numberOfLines={1} text="Skin & Hair" />
          <Text className="text-center font-outfit text-[14px] text-titleTextColor">
            Help us understand your skin and hair better
          </Text>
        </View>

        {/* ==================== SKIN SECTION ==================== */}
        {/* Skin Type Section */}
        <View className="mb-6">
          <Text className="font-outfit text-[18px] font-semibold text-titleTextColor">
            Skin Type
          </Text>
          <Text className="mb-3 font-outfit text-[14px] text-titleTextColor">
            What is your skin type?
          </Text>
          <View className="gap-3">
            {SKIN_TYPE.map((option) => {
              const isSelected = selectedSkinType === option.value;
              const activeColor = '#759A52';
              const inactiveColor = '#361A0D';
              const iconColor = isSelected ? activeColor : inactiveColor;

              return (
                <PrimaryButton
                  key={option.id}
                  title={option.label}
                  onPress={() => setSelectedSkinType(option.value)}
                  leftIcon={option.leftIcon(iconColor)}
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
        </View>

        {/* Skin Concerns Section */}
        <View className="mb-6">
          <Text className="font-outfit text-[18px] font-semibold text-titleTextColor">
            Skin Concerns
          </Text>
          <Text className="mb-3 font-outfit text-[14px] text-titleTextColor">
            What skin concerns do you have? (Select all that apply)
          </Text>

          {/* Existing Skin Concerns */}
          {selectedSkinConcerns.length > 0 && (
            <View className="mb-4 gap-3">
              {selectedSkinConcerns.map((concern, index) => (
                <PrimaryButton
                  key={`skin-concern-${index}`}
                  title={concern}
                  onPress={() => removeSkinConcern(index)}
                  rightIcon={<CrossIcon size={24} color="#361A0D99" />}
                  height={54}
                  gradientColors={['#e2d2c1', '#e2d2c1']}
                  textStyle={{
                    fontSize: 14,
                    fontFamily: 'Outfit-Regular',
                  }}
                />
              ))}
            </View>
          )}

          {/* Preset Skin Concerns */}
          <View className="mb-4 flex-row flex-wrap gap-3">
            {SKIN_CONCERNS_OPTIONS.map((option) => (
              <PrimaryButton
                key={option.id}
                title={option.label}
                onPress={() => {
                  if (!selectedSkinConcerns.includes(option.value)) {
                    setSelectedSkinConcerns([...selectedSkinConcerns, option.value]);
                  }
                }}
                height={40}
                withShadow={false}
                gradientColors={['#E8DDD0', '#E8DDD0']}
                textClassName="text-[#4A3F35]"
                textStyle={{ fontSize: 14 }}
                className="px-4"
              />
            ))}
          </View>

          {/* Add Custom Skin Concern Button */}
          <PrimaryButton
            title="Add custom concern"
            onPress={() => openModal('skin')}
            height={54}
            gradientColors={['#e2d2c1', '#e2d2c1']}
            textClassName="text-[#4A3F35]"
            leftIcon={<PlusInCircleIcon size={34} color="#95B287" />}
            textStyle={{
              fontSize: 16,
              fontFamily: 'Outfit-Medium',
            }}
          />
        </View>

        {/* ==================== HAIR SECTION ==================== */}
        {/* Hair Type Section */}
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
              const activeColor = '#759A52';
              const inactiveColor = '#361A0D';
              const iconColor = isSelected ? activeColor : inactiveColor;

              return (
                <PrimaryButton
                  key={option.id}
                  title={option.label}
                  onPress={() => setSelectedHairType(option.value)}
                  leftIcon={option.leftIcon(iconColor)}
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
                    marginLeft: 28,
                  }}
                />
              );
            })}
          </View>
        </View>

        {/* Hair Concerns Section */}
        <View className="mb-8">
          <Text className="font-outfit text-[18px] font-semibold text-titleTextColor">
            Hair Concerns
          </Text>
          <Text className="mb-3 font-outfit text-[14px] text-titleTextColor">
            What hair concerns do you have? (Select all that apply)
          </Text>

          {/* Existing Hair Concerns */}
          {selectedHairConcerns.length > 0 && (
            <View className="mb-4 gap-3">
              {selectedHairConcerns.map((concern, index) => (
                <PrimaryButton
                  key={`hair-concern-${index}`}
                  title={concern}
                  onPress={() => removeHairConcern(index)}
                  rightIcon={<CrossIcon size={24} color="#361A0D99" />}
                  height={54}
                  gradientColors={['#e2d2c1', '#e2d2c1']}
                  textStyle={{
                    fontSize: 14,
                    fontFamily: 'Outfit-Regular',
                  }}
                />
              ))}
            </View>
          )}

          {/* Preset Hair Concerns */}
          <View className="mb-4 flex-row flex-wrap gap-3">
            {HAIR_CONCERNS_OPTIONS.map((option) => (
              <PrimaryButton
                key={option.id}
                title={option.label}
                onPress={() => {
                  if (!selectedHairConcerns.includes(option.value)) {
                    setSelectedHairConcerns([...selectedHairConcerns, option.value]);
                  }
                }}
                height={40}
                withShadow={false}
                gradientColors={['#E8DDD0', '#E8DDD0']}
                textClassName="text-[#4A3F35]"
                textStyle={{ fontSize: 14 }}
                className="px-4"
              />
            ))}
          </View>

          {/* Add Custom Hair Concern Button */}
          <PrimaryButton
            title="Add custom concern"
            onPress={() => openModal('hair')}
            height={54}
            gradientColors={['#e2d2c1', '#e2d2c1']}
            textClassName="text-[#4A3F35]"
            leftIcon={<PlusInCircleIcon size={34} color="#95B287" />}
            textStyle={{
              fontSize: 16,
              fontFamily: 'Outfit-Medium',
            }}
          />
        </View>

        <PrimaryButton title="Continue" onPress={handleNext} className="mb-3" />
      </View>

      {/* Centered Modal for Adding Custom Concern */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => !isAdding && closeModal()}>
        <View className="flex-1 items-center justify-center bg-black/50">
          <View
            className="mx-6 rounded-3xl border-white bg-[#E8DDD0] p-6 shadow-xl"
            style={{
              width: 320,
              opacity: modalReady && !isAdding ? 1 : 0,
              transform: [{ scale: modalReady && !isAdding ? 1 : 0.95 }],
            }}>
            {isAdding ? (
              <View className="items-center py-8">
                <ActivityIndicator size="large" color="#95B287" />
                <Text className="mt-4 font-outfit text-[16px] text-titleTextColor">
                  Adding {concernType === 'skin' ? 'skin' : 'hair'} concern...
                </Text>
              </View>
            ) : (
              <>
                <View className="mb-4 items-center">
                  <Text className="font-outfit text-[20px] font-semibold text-titleTextColor">
                    Add {concernType === 'skin' ? 'Skin' : 'Hair'} Concern
                  </Text>
                  <Text className="mt-1 text-center font-outfit text-[14px] text-titleTextColor/70">
                    Enter the {concernType === 'skin' ? 'skin' : 'hair'} concern you want to add
                  </Text>
                </View>

                <TextInput
                  value={currentConcern}
                  onChangeText={setCurrentConcern}
                  placeholder={`e.g., ${concernType === 'skin' ? 'rosacea, eczema' : 'split ends, thinning'}`}
                  placeholderTextColor="#A7A5AF"
                  className="mb-6 rounded-full border border-[#E8DDD0] bg-white px-5 py-4 font-outfit text-[16px] text-[#4A3F35]"
                  autoFocus
                />

                <View className="flex-row gap-3">
                  <PrimaryButton
                    onPress={closeModal}
                    title="Cancel"
                    style={{ flex: 1 }}
                    height={54}
                  />
                  <PrimaryButton
                    gradientColors={['#95B287', '#95B287']}
                    onPress={addConcern}
                    title="Add"
                    style={{ flex: 1 }}
                    height={54}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </FormLayout>
  );
}
