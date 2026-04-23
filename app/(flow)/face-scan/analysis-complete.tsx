// app/(flow)/scans/face-scan/ai-analysis-complete.tsx
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  useWindowDimensions,
  ImageBackground,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import CustomHeader from '@/components/header/CustomHeader';
import { LAYOUT } from '@/constants/constants';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import { AngleCapture } from '@/components/scans/MultiAngleCameraScan';
import { useScreenReady } from '@/hooks/useScreenReady';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';
import AnalysingResultScoreCard from '@/components/scans/AnalysingResultScoreCard';
import { SkinAnalysisCards } from '@/components/scans/faceScan/SkinAnalysisCards';
import { DetectedConditionsList } from '@/components/scans/DetectedConditionsList';
import { DetectedCondition } from '@/components/scans/DetectedConditionCard';
import { LifestyleFactors, LifestyleFactor } from '@/components/scans/LifestyleFactors';
import { CurvedArrowTopRightIcon } from '@/components/icons';
import PillowBadge from '@/components/buttons/PillowBadge';

import { LinearGradient } from 'expo-linear-gradient';

const SKIN_STATS = [
  { label: 'Hydration', value: '85', color: '#60A5FA' },
  { label: 'Sebum', value: '60', color: '#4ADE80' },
  { label: 'Redness', value: '38', color: '#FB7185' },
  { label: 'Texture', value: '98', color: '#FBBF24' },
  { label: 'Evenness', value: '52', color: '#A78BFA' },
];

// Static lifestyle factors data
const LIFESTYLE_FACTORS: LifestyleFactor[] = [
  {
    id: 'stress',
    label: 'Stress Score',
    value: 62,
    gradientColors: ['#FBBF24', '#D97706'],
  },
  {
    id: 'water',
    label: 'Water Intake',
    value: 74,
    gradientColors: ['#60A5FA', '#2563EB'],
  },
  {
    id: 'sleep',
    label: 'Sleep Quality',
    value: 68,
    gradientColors: ['#7A8B6A', '#059669'],
  },
];

const AiAnalysisCompleteScreen = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { captures: capturesParam } = useLocalSearchParams();
  const [captures, setCaptures] = useState<AngleCapture[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isRendering, isContentReady, renderError } = useScreenReady({
    dependencies: [captures],
    delay: 100,
    initialReady: false,
  });

  useEffect(() => {
    loadCaptures();
  }, [capturesParam]);

  const loadCaptures = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('📊 ANALYSIS SCREEN - Received params:', {
        hasCaptures: !!capturesParam,
        capturesParam,
      });

      if (capturesParam) {
        const parsed = JSON.parse(capturesParam as string);
        setCaptures(parsed);
        console.log('✅ Parsed captures successfully:', parsed.length);
      } else {
        console.log('No captures found in params');
      }
    } catch (err) {
      console.error('Error parsing captures:', err);
      setError('Failed to load analysis data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    loadCaptures();
  };

  // Mark initial load as complete after first render
  useEffect(() => {
    if (isContentReady && isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [isContentReady]);

  // Show initial render loading (useScreenReady) - ONLY on first load
  if (isRendering && isInitialLoad) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <LoadingScreen loadingText="Preparing analysis results..." />
      </SafeAreaView>
    );
  }

  // Show error if rendering failed
  if (renderError) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title="Analysis Complete" height={50} backButton />
        <ErrorScreen message={renderError} onRetry={handleRetry} />
      </SafeAreaView>
    );
  }

  // Show loading while data is being processed
  if (isLoading) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title="Analysis Complete" height={50} backButton />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#95B287" />
          <Text className="mt-3 font-outfit text-[14px]" style={{ color: '#2E211799' }}>
            Loading analysis results...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Show error if data loading failed
  if (error) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title="Analysis Complete" height={50} backButton />
        <ErrorScreen message={error} onRetry={handleRetry} />
      </SafeAreaView>
    );
  }

  // Get the first captured image for face preview
  const faceImageUri = captures.length > 0 ? captures[0].uri : undefined;

  // Define your detected conditions data
  const detectedConditions: DetectedCondition[] = [
    {
      id: 'redness',
      title: 'Mild Redness',
      severity: 'Medium',
      description: 'Your skin barrier is slightly compromised, likely due to over-exfoliation.',
      progressValue: 45,
      progressColor: ['#FBBF24', '#D97706'],
      faceImageUri: faceImageUri,
      faceArea: { x: 100, y: 150, width: 80, height: 80 },
    },
    {
      id: 'dehydration',
      title: 'Dehydration',
      severity: 'Low',
      description: 'Requires attention and targeted care.',
      progressValue: 25,
      progressColor: ['#60A5FA', '#2563EB'],
      faceImageUri: faceImageUri,
    },
    {
      id: 'pores',
      title: 'Pores',
      severity: 'Low',
      description: 'Normal appearance, slight congestion on nose.',
      progressValue: 25,
      progressColor: ['#A78BFA', '#8B5CF6'],
      faceImageUri: faceImageUri,
    },
  ];

  return (
    <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
      <CustomHeader title="Analysis Complete" height={50} backButton />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
          paddingTop: 10,
          flexGrow: 1,
        }}
        className="flex-1">
        <View
          className="px-container"
          style={{
            opacity: isContentReady ? 1 : 0,
            transform: [{ translateY: isContentReady ? 0 : 10 }],
          }}>
          {/* NEW COMPONENT CALL */}
          <AnalysingResultScoreCard stats={SKIN_STATS} />

          {/* Captured Angles Preview */}
          {captures.length > 0 && (
            <View className="">
              <Text className="mb-2 text-start font-outfitMedium text-[16px] text-[#2E2117]">
                Captured Angles
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
                <View className="flex-row gap-2 p-2">
                  {captures.map((capture, idx) => (
                    <BorderlessShadowCard
                      key={idx}
                      b_tl={12}
                      b_tr={12}
                      b_bl={12}
                      b_br={12}
                      style={{
                        padding: 8,
                        width: 80,
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{ uri: capture.uri }}
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                      />
                      <Text className="mt-1 font-outfit text-[10px] capitalize text-[#2A2118]">
                        {capture.angle}
                      </Text>
                    </BorderlessShadowCard>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}

          {/* Skin Analysis Cards - Face Image & Hydration Chart */}
          <SkinAnalysisCards
            faceImageUri={faceImageUri}
            hydrationLevel={72}
            rednessScore={24}
            rednessProgress={38}
            rednessLabel="Visible Redness (Cheeks)"
          />

          {/* Detected Conditions Section */}
          <DetectedConditionsList
            conditions={detectedConditions}
            title="Detected Conditions"
            showIcon={true}
            showFaceImages={true}
          />

          {/* Lifestyle Factors Section */}
          <LifestyleFactors factors={LIFESTYLE_FACTORS} title="Lifestyle Factors" showIcon={true} />

          {/* Header */}
          <View className="mt-6">
            <View className="w-full flex-row justify-between ">
              <View className=" flex-row items-center gap-3 ">
                <CurvedArrowTopRightIcon size={24} color={'#977857'} />
                <Text className="text-start font-outfitMedium text-[16px] text-[#2E2117]">
                  Prognostic Timeline
                </Text>
              </View>
              <PillowBadge
                title="14 Days"
                style={{ backgroundColor: '#e9e3dc', paddingHorizontal: 12, paddingVertical: 2 }}
                textStyle={{ color: '#7A5D3E', fontSize: 12 }}
              />
            </View>
            {/* <View
              className="mt-3 w-full  "
              style={{
                backgroundColor: 'red',
                padding: 12,
                borderTopWidth: 5,
                borderBottomWidth: 5,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderLeftColor: '#FFFFFF99',
                borderRightColor: '#FFFFFF99',
                borderTopColor: '#faf7f4',
                borderBottomColor: '#faf7f4',
                borderRadius: 24,

                minHeight: 244,
              }}>
              <Text>Hello there</Text>
            </View> */}

            <ImageBackground
              source={require('@/assets/images/prognostic_timeline_bg_face.jpg')}
              imageStyle={{ borderRadius: 24 }} // Ensures the image follows the container curve
              className="mt-3 w-full"
              style={{
                minHeight: 244,
                borderWidth: 0.5,
                borderTopWidth: 3,
                borderBottomWidth: 3,
                borderColor: '#FFFFFF99', // Default side color
                borderTopColor: '#faf7f4',
                borderBottomColor: '#faf7f4',
                borderRadius: 24,
                overflow: 'hidden', // Required for borderRadius to work on children
              }}>
              <LinearGradient
                // Left to Right: 90deg equivalent is start: [0, 0], end: [1, 0]
                colors={[
                  '#F6E7D5',
                  'rgba(242, 221, 197, 0.94)',
                  'rgba(239, 222, 202, 0.6)',
                  'rgba(255, 234, 208, 0.44)',
                  'rgba(232, 221, 208, 0)',
                ]}
                locations={[0, 0.52, 0.67, 0.82, 1]} // Matches your % stops
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                }}
              />

              {/* Content Layer */}
              <View style={{ padding: 12 }}>
                <View className="w-full flex-row items-center ">
                  <View
                    className="h-16 w-16  "
                    style={{
                      backgroundColor: 'red',
                      borderRadius: 16,
                      borderWidth: 0.5,
                      borderTopWidth: 2,
                      borderBottomWidth: 2,
                      borderColor: '#FFFFFF99', // Default side color
                      borderTopColor: '#faf7f4',
                      borderBottomColor: '#faf7f4',
                    }}
                  />
                  <View
                    className=""
                    style={{
                      width: 12,
                      height: 12,
                      backgroundColor: '#977857',
                      borderRadius: 999,
                      marginRight: 12,
                      marginLeft: 9,
                    }}
                  />
                  <View>
                    <Text className="font-outfitMedium text-[14px] " style={{ color: '#2E2117' }}>
                      Today
                    </Text>
                    <Text className=" font-outfit text-[12px] text-[#2E211799] ">
                      (Fragile Barrier)
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ padding: 12 }}>
                <View className="w-full flex-row items-center ">
                  <View
                    className="h-16 w-16  "
                    style={{
                      backgroundColor: 'red',
                      borderRadius: 16,
                      borderWidth: 0.5,
                      borderTopWidth: 2,
                      borderBottomWidth: 2,
                      borderColor: '#FFFFFF99', // Default side color
                      borderTopColor: '#faf7f4',
                      borderBottomColor: '#faf7f4',
                    }}
                  />
                  <View
                    className=""
                    style={{
                      width: 12,
                      height: 12,
                      backgroundColor: '#977857',
                      borderRadius: 999,
                      marginRight: 12,
                      marginLeft: 9,
                    }}
                  />
                  <View>
                    <Text className="font-outfitMedium text-[14px] " style={{ color: '#2E2117' }}>
                      +7 Days
                    </Text>
                    <Text className=" font-outfit text-[12px] text-[#2E211799] ">
                      (Prediction 1)
                    </Text>
                    <Text className=" font-outfitMedium text-[12px] text-[#7A8B6A] ">
                      Hydration +18%
                    </Text>
                    <Text className=" font-outfitMedium text-[12px] text-[#7A8B6A] ">
                      Redness -12%
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ padding: 12 }}>
                <View className="w-full flex-row items-center ">
                  <View
                    className="h-16 w-16  "
                    style={{
                      backgroundColor: 'red',
                      borderRadius: 16,
                      borderWidth: 0.5,
                      borderTopWidth: 2,
                      borderBottomWidth: 2,
                      borderColor: '#FFFFFF99', // Default side color
                      borderTopColor: '#faf7f4',
                      borderBottomColor: '#faf7f4',
                    }}
                  />
                  <View
                    className=""
                    style={{
                      width: 12,
                      height: 12,
                      backgroundColor: '#977857',
                      borderRadius: 999,
                      marginRight: 12,
                      marginLeft: 9,
                    }}
                  />
                  <View>
                    <Text className="font-outfitMedium text-[14px] " style={{ color: '#2E2117' }}>
                      +14 Days
                    </Text>
                    <Text className=" font-outfit text-[12px] text-[#2E211799] ">
                      (Prediction 2)
                    </Text>
                    <Text className=" font-outfitMedium text-[12px] text-[#7A8B6A] ">
                      Barrier 92%
                    </Text>
                    <Text className=" font-outfitMedium text-[12px] text-[#7A8B6A] ">
                      Evenness +25%
                    </Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
          {/* Button */}
          <PrimaryButton
            title="Generate Your Routine"
            onPress={() => {
              router.push('/(main)/routines');
            }}
            style={{ marginBottom: 20, marginTop: 24 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AiAnalysisCompleteScreen;

const styles = StyleSheet.create({});
