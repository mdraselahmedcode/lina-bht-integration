// app/(flow)/settings/health-information/edit-life-phase.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
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
import { MenoPauseIcon, PeriodIcon, PostpartumIcon, PregnantIcon } from '@/components/icons';
import { CheckInCircleIcon } from '@/components/icons/CheckInCircleIcon';

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
];

export default function EditLifePhaseScreen() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();

  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { isRendering, isContentReady, renderError } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  useEffect(() => {
    loadCurrentPhase();
  }, []);

  const loadCurrentPhase = async () => {
    try {
      const savedPhase = await AsyncStorage.getItem('user_current_phase');
      if (savedPhase) {
        setSelectedPhase(savedPhase);
      }
    } catch (error) {
      console.error('Error loading phase:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!selectedPhase) {
      showError('Please select a phase');
      return;
    }

    setIsSaving(true);
    try {
      await AsyncStorage.setItem('user_current_phase', selectedPhase);
      showSuccess('Life phase updated successfully');
      router.back();
    } catch (error) {
      showError('Failed to update');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRetry = () => {
    router.replace('/(flow)/settings/health-information/edit/edit-life-phase');
  };

  if (isRendering || isLoading) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <LoadingScreen loadingText="Loading..." />
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
    <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
      <CustomHeader title="Edit Life Phase" height={50} backButton={true} />

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
            Select your current phase
          </Text>

          <View className="gap-3">
            {CURRENT_PHASE.map((option) => {
              const isSelected = selectedPhase === option.value;
              const activeColor = '#759A52';
              const inactiveColor = '#361A0D';
              const iconColor = isSelected ? activeColor : inactiveColor;

              return (
                <PrimaryButton
                  key={option.id}
                  title={option.label}
                  onPress={() => setSelectedPhase(option.value)}
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
