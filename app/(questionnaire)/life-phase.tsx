import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormLayout from '@/components/layouts/FormLayout';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import AuthFormTitle from '@/components/texts/auth/FormTitle';
import { useToast } from '@/hooks/useToast';
import { useScreenReady } from '@/hooks/useScreenReady';
import { CrossIcon, PeriodIcon, PostpartumIcon, PregnantIcon } from '@/components/icons';
import { CheckInCircleIcon } from '@/components/icons/CheckInCircleIcon';
import { PlusInCircleIcon } from '@/components/icons';

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
];

export default function LifePhaseScreen() {
  const [selectedCurrentPhase, setSelectedCurrentPhase] = useState<string | null>(null);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [currentAllergy, setCurrentAllergy] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [modalReady, setModalReady] = useState(false);
  const router = useRouter();
  const { showError } = useToast();

  // Use screen ready hook to prevent shadow spread
  const { isRendering, isContentReady } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  // Reset modal ready when modal opens
  useEffect(() => {
    if (modalVisible) {
      setModalReady(false);
      // Small delay to let modal render first
      setTimeout(() => {
        setModalReady(true);
      }, 50);
    }
  }, [modalVisible]);

  const addAllergy = () => {
    if (!currentAllergy.trim()) {
      return;
    }

    setIsAdding(true);

    // Simulate API call or processing
    setTimeout(() => {
      setAllergies([...allergies, currentAllergy.trim()]);
      setCurrentAllergy('');
      setIsAdding(false);
      setModalVisible(false);
      setModalReady(false);
    }, 500);
  };

  const removeAllergy = (index: number) => {
    setAllergies(allergies.filter((_, i) => i !== index));
  };

  const handleNext = async () => {
    if (!selectedCurrentPhase) {
      showError('Please select your current phase');
      return;
    }

    try {
      await AsyncStorage.setItem('user_current_phase', selectedCurrentPhase);
      await AsyncStorage.setItem('user_allergies', JSON.stringify(allergies));
      router.push('/(questionnaire)/skin-hair-condition');
    } catch (error) {
      showError('Failed to save. Please try again.');
    }
  };

  // Show loading while screen is rendering
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
          <AuthFormTitle numberOfLines={1} text="Life phase & health" />
          <Text className="text-center font-outfit text-[14px] text-titleTextColor">
            Tell us about yourself to personalize your experience
          </Text>
        </View>

        {/* Current Phase Section */}
        <View className="mb-6">
          <Text className="font-outfit text-[18px] font-semibold text-titleTextColor">
            Current Phase
          </Text>
          <Text className="mb-3 font-outfit text-[14px] text-titleTextColor">
            What is your current phase?
          </Text>
          <View className="gap-3">
            {CURRENT_PHASE.map((option) => {
              const isSelected = selectedCurrentPhase === option.value;
              const activeColor = '#759A52';
              const inactiveColor = '#361A0D';
              const iconColor = isSelected ? activeColor : inactiveColor;

              return (
                <PrimaryButton
                  key={option.id}
                  title={option.label}
                  onPress={() => setSelectedCurrentPhase(option.value)}
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

        {/* Allergies Section (Optional) */}
        <View className="mb-8">
          <Text className="font-outfit text-[18px] font-semibold text-titleTextColor">
            Allergies
          </Text>
          <Text className="mb-3 font-outfit text-[14px] text-titleTextColor">
            Do you have any allergies? (Optional)
          </Text>

          {/* Display existing allergies as PrimaryButton with close icon */}
          {allergies.length > 0 && (
            <View className="mb-4 gap-3">
              {allergies.map((allergy, index) => (
                <PrimaryButton
                  key={index}
                  title={allergy}
                  onPress={() => removeAllergy(index)}
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

          {/* Add Allergy Button */}
          <PrimaryButton
            title="Add an allergy"
            onPress={() => setModalVisible(true)}
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

      {/* Centered Modal for Adding Allergy */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => !isAdding && setModalVisible(false)}>
        <View className="flex-1 items-center justify-center bg-black/50">
          <View
            className="mx-6 rounded-3xl border-white bg-[#E8DDD0] p-6 shadow-xl"
            style={{
              width: 320,
              opacity: modalReady && !isAdding ? 1 : 0,
              transform: [{ scale: modalReady && !isAdding ? 1 : 0.95 }],
            }}>
            {isAdding ? (
              // Loading State
              <View className="items-center py-8">
                <ActivityIndicator size="large" color="#95B287" />
                <Text className="mt-4 font-outfit text-[16px] text-titleTextColor">
                  Adding allergy...
                </Text>
              </View>
            ) : (
              // Input State
              <>
                <View className="mb-4 items-center">
                  <Text className="font-outfit text-[20px] font-semibold text-titleTextColor">
                    Add Allergy
                  </Text>
                  <Text className="mt-1 text-center font-outfit text-[14px] text-titleTextColor/70">
                    Enter the allergy you want to add
                  </Text>
                </View>

                <TextInput
                  value={currentAllergy}
                  onChangeText={setCurrentAllergy}
                  placeholder="e.g., nuts, dairy, pollen"
                  placeholderTextColor="#A7A5AF"
                  className="mb-6 rounded-full border border-[#E8DDD0] bg-white px-5 py-4 font-outfit text-[16px] text-[#4A3F35]"
                  autoFocus
                />

                <View className="flex-row gap-3">
                  <PrimaryButton
                    onPress={() => setModalVisible(false)}
                    title="Cancel"
                    style={{ flex: 1 }}
                    height={54}
                  />

                  <PrimaryButton
                    gradientColors={['#95B287', '#95B287']}
                    onPress={addAllergy}
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
