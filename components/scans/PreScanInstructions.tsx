// components/scans/PreScanInstructions.tsx
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';
import { useScreenReady } from '@/hooks/useScreenReady';
import CustomHeader from '@/components/header/CustomHeader';
import { ScrollView } from 'react-native-gesture-handler';
import { LAYOUT } from '@/constants/constants';

const { width } = Dimensions.get('window');

export interface InstructionStep {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface PreScanInstructionsProps {
  onStart: () => void;
  title?: string;
  headerTitle?: string;
  subTitle?: string;
  videoSource?: any;
  instructionSteps?: InstructionStep[];
  startButtonTitle?: string;
}

const DEFAULT_INSTRUCTION_STEPS: InstructionStep[] = [
  {
    id: 'lighting',
    icon: <Text className="text-[24px]">☀️</Text>,
    title: 'Good Lighting',
    description: 'Find a well-lit area, preferably natural daylight facing a window.',
  },
  {
    id: 'clear_face',
    icon: <Text className="text-[24px]">✨</Text>,
    title: 'Clear Face',
    description: 'Remove makeup, glasses, and pull hair back from your face.',
  },
  {
    id: 'positioning',
    icon: <Text className="text-[24px]">📱</Text>,
    title: 'Positioning',
    description: 'Hold phone at eye level, about 30cm away. Fill the oval frame.',
  },
];

export const PreScanInstructions: React.FC<PreScanInstructionsProps> = ({
  onStart,
  title = 'Prepare Your Scan',
  headerTitle = 'Scan Instructions',
  subTitle = '',
  videoSource,
  instructionSteps = DEFAULT_INSTRUCTION_STEPS,
  startButtonTitle = 'Start Scan',
}) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const videoRef = useRef<Video>(null);

  const { isRendering, isContentReady, renderError } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  useEffect(() => {
    if (isContentReady && isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [isContentReady]);

  const handleRetry = () => {
    setIsInitialLoad(true);
    setTimeout(() => {
      setIsInitialLoad(false);
    }, 100);
  };

  if (isRendering && isInitialLoad) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <LoadingScreen loadingText="Preparing instructions..." />
      </SafeAreaView>
    );
  }

  if (renderError) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title={headerTitle} height={50} backButton />
        <ErrorScreen message={renderError} onRetry={handleRetry} />
      </SafeAreaView>
    );
  }

  const videoWidth = width - 48;
  const videoHeight = videoWidth * 0.56;

  return (
    <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
      <CustomHeader title={headerTitle} subtitle={subTitle} height={50} backButton />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
          paddingTop: 10,
          marginTop: 40,
          flexGrow: 1,
        }}
        className="flex-1">
        <View
          className="px-container"
          style={{
            opacity: isContentReady ? 1 : 0,
            transform: [{ translateY: isContentReady ? 0 : 10 }],
            paddingBottom: 40,
          }}>
          {/* Video Player */}
          {videoSource && (
            <View className="items-center justify-center">
              <View
                style={{
                  width: videoWidth,
                  height: videoHeight,
                  borderRadius: 24,
                  borderWidth: 2,
                  borderColor: '#361A0D',
                  backgroundColor: '#F0E6D8',
                  overflow: 'hidden',
                }}>
                <Video
                  ref={videoRef}
                  source={videoSource}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode={ResizeMode.COVER}
                  shouldPlay={true}
                  isLooping={true}
                  isMuted={true}
                />
              </View>
            </View>
          )}

          <Text className="mt-6 text-start font-outfitMedium text-[16px] text-[#2E2117]">
            {title}
          </Text>

          {/* Instructions Container */}
          <BorderlessShadowCard
            b_tl={24}
            b_tr={24}
            b_bl={24}
            b_br={24}
            style={{
              paddingVertical: 24,
              paddingHorizontal: 24,
              gap: 16,
              marginTop: 12,
              borderWidth: 2,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderColor: '#FFFFFF66',
            }}>
            {instructionSteps.map((step, index) => (
              <View key={step.id} className="flex-row items-center gap-3">
                <BorderlessShadowCard
                  b_tl={6}
                  b_tr={6}
                  b_bl={6}
                  b_br={6}
                  style={{
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {step.icon}
                </BorderlessShadowCard>
                <View className="flex-1">
                  <Text
                    className="font-outfitMedium text-[14px] leading-5"
                    style={{ color: '#2A2118' }}>
                    {step.title}
                  </Text>
                  <Text className="mt-[2px] font-outfit text-[12px] text-titleTextColor/60">
                    {step.description}
                  </Text>
                </View>
              </View>
            ))}
          </BorderlessShadowCard>

          <PrimaryButton
            onPress={onStart}
            title={startButtonTitle}
            style={{ paddingVertical: 24 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
