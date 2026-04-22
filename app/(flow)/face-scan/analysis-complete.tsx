// import { ScrollView, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import CustomHeader from '@/components/header/CustomHeader';
// import { LAYOUT } from '@/constants/constants';
// import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
// import { IInCircleIcon } from '@/components/icons/IInCircleIcon';
// import CircularProgress from '@/components/home/CircularProgress';
// import PrimaryButton from '@/components/buttons/PrimaryButton';
// import PillowBadge from '@/components/buttons/PillowBadge';
// import { SignInCuttedCircleIcon } from '@/components/icons';
// import { AngleCapture } from '@/components/scans/MultiAngleCameraScan';
// import { useScreenReady } from '@/hooks/useScreenReady';
// import LoadingScreen from '@/components/loading/LoadingScreen';
// import ErrorScreen from '@/components/errors/ErrorScreen';
// import AnalysingResultScoreCard from '@/components/scans/AnalysingResultScoreCard';
// import { GradientProgressBar } from '@/components/GradientProgressBar';

// const SKIN_STATS = [
//   { label: 'Hydration', value: '85', color: '#60A5FA' },
//   { label: 'Sebum', value: '60', color: '#4ADE80' },
//   { label: 'Redness', value: '38', color: '#FB7185' },
//   { label: 'Texture', value: '98', color: '#FBBF24' },
//   { label: 'Evenness', value: '52', color: '#A78BFA' },
// ];

// const AiAnalysisCompleteScreen = () => {
//   const router = useRouter();
//   const { captures: capturesParam } = useLocalSearchParams();
//   const [captures, setCaptures] = useState<AngleCapture[]>([]);
//   const [isInitialLoad, setIsInitialLoad] = useState(true);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const { isRendering, isContentReady, renderError } = useScreenReady({
//     dependencies: [captures],
//     delay: 100,
//     initialReady: false,
//   });

//   useEffect(() => {
//     loadCaptures();
//   }, [capturesParam]);

//   const loadCaptures = async () => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       console.log('📊 ANALYSIS SCREEN - Received params:', {
//         hasCaptures: !!capturesParam,
//         capturesParam,
//       });

//       if (capturesParam) {
//         const parsed = JSON.parse(capturesParam as string);
//         setCaptures(parsed);
//         console.log('✅ Parsed captures successfully:', parsed.length);
//       } else {
//         console.log('No captures found in params');
//       }
//     } catch (err) {
//       console.error('Error parsing captures:', err);
//       setError('Failed to load analysis data');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleRetry = () => {
//     loadCaptures();
//   };

//   // Mark initial load as complete after first render
//   useEffect(() => {
//     if (isContentReady && isInitialLoad) {
//       setIsInitialLoad(false);
//     }
//   }, [isContentReady]);

//   // Show initial render loading (useScreenReady) - ONLY on first load
//   if (isRendering && isInitialLoad) {
//     return (
//       <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
//         <LoadingScreen loadingText="Preparing analysis results..." />
//       </SafeAreaView>
//     );
//   }

//   // Show error if rendering failed
//   if (renderError) {
//     return (
//       <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
//         <CustomHeader title="Analysis Complete" height={50} backButton />
//         <ErrorScreen message={renderError} onRetry={handleRetry} />
//       </SafeAreaView>
//     );
//   }

//   // Show loading while data is being processed
//   if (isLoading) {
//     return (
//       <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
//         <CustomHeader title="Analysis Complete" height={50} backButton />
//         <View className="flex-1 items-center justify-center">
//           <ActivityIndicator size="large" color="#95B287" />
//           <Text className="mt-3 font-outfit text-[14px]" style={{ color: '#2E211799' }}>
//             Loading analysis results...
//           </Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   // Show error if data loading failed
//   if (error) {
//     return (
//       <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
//         <CustomHeader title="Analysis Complete" height={50} backButton />
//         <ErrorScreen message={error} onRetry={handleRetry} />
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
//       <CustomHeader title="Analysis Complete" height={50} backButton />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{
//           paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
//           paddingTop: 10,
//           flexGrow: 1,
//         }}
//         className="flex-1">
//         <View
//           className="px-container"
//           style={{
//             opacity: isContentReady ? 1 : 0,
//             transform: [{ translateY: isContentReady ? 0 : 10 }],
//           }}>
//           {/* NEW COMPONENT CALL */}
//           <AnalysingResultScoreCard stats={SKIN_STATS} />

//           {/* Captured Angles Preview */}
//           {captures.length > 0 && (
//             <View className="mt-3">
//               <Text className="mb-2 text-start font-outfitMedium text-[16px] text-[#2E2117]">
//                 Captured Angles
//               </Text>
//               <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
//                 <View className="flex-row gap-2 p-2">
//                   {captures.map((capture, idx) => (
//                     <BorderlessShadowCard
//                       key={idx}
//                       b_tl={12}
//                       b_tr={12}
//                       b_bl={12}
//                       b_br={12}
//                       style={{
//                         padding: 8,
//                         width: 80,
//                         alignItems: 'center',
//                       }}>
//                       <Image
//                         source={{ uri: capture.uri }}
//                         style={{ width: 60, height: 60, borderRadius: 30 }}
//                       />
//                       <Text className="mt-1 font-outfit text-[10px] capitalize text-[#2A2118]">
//                         {capture.angle}
//                       </Text>
//                     </BorderlessShadowCard>
//                   ))}
//                 </View>
//               </ScrollView>
//             </View>
//           )}

//           <View className="flex flex-row items-center justify-between gap-4 ">
//             <View
//               className="flex-1 p-3  "
//               style={{
//                 backgroundColor: 'transparent',
//                 borderWidth: 1,
//                 borderColor: '#FFFFFF99',
//                 borderRadius: 12,
//               }}>
//               <View className="h-[158px] w-full rounded-xl bg-red-300" />
//               <Text
//                 className="mt-3 font-OutfitBold text-[12px] text-[#2E211799]"
//                 style={{
//                   textShadowColor: '#FFFFFF', // White shadow
//                   textShadowOffset: { width: 1, height: 1 }, // Moves the shadow 1px right and 1px down
//                   textShadowRadius: 1, // Keep this low (1-2) for a crisp 3D/outline effect
//                 }}>
//                 Visible Redness (Cheeks)
//               </Text>

//               <Text
//                 className="mt-3 font-OutfitBold text-[12px] text-[#2E2117]"
//                 style={{
//                   textShadowColor: '#FFFFFF',
//                   textShadowOffset: { width: 1, height: 1 },
//                   textShadowRadius: 1,
//                 }}>
//                 Score :{' '}
//                 <Text
//                   className="font-outfit text-[12px]  "
//                   style={{
//                     textShadowColor: '#FFFFFF',
//                     textShadowOffset: { width: 1, height: 1 },
//                     textShadowRadius: 1,
//                   }}>
//                   24/100
//                 </Text>
//               </Text>

//               <GradientProgressBar
//                 style={{
//                   marginTop: 6,

//                   // borderRadius: 4,
//                   height: 10,
//                   borderWidth: 1,
//                   borderTopColor: '#c9beb177',
//                   borderLeftColor: '#c9beb177',
//                   borderBottomColor: '#FFFFFF99',
//                   borderRightColor: '#FFFFFF99',
//                 }}
//                 progress={38}
//                 gradientColors={['#F87171', '#DC2626']}
//                 backgroundColor="#ddd9d6"
//               />
//             </View>
//             <View
//               className="flex-1 p-3  "
//               style={{
//                 backgroundColor: 'transparent',
//                 borderWidth: 1,
//                 borderColor: '#FFFFFF99',
//                 borderRadius: 12,
//               }}>
//               <Text className=" font-outfitMedium text-[32px]  " style={{ color: '#2E2117' }}>
//                 72%
//               </Text>
//               <Text className="font-outfitMedium text-[16px] " style={{ color: '#2E211799' }}>
//                 Hydration Level
//               </Text>
//               <View className="mt-[15px] h-[158px] w-full rounded-xl bg-red-300 " />
//             </View>
//           </View>

//           {/* Detected Conditions Section */}
//           <View className="mt-3">
//             <Text className="mb-2 text-start font-outfitMedium text-[16px] text-[#2E2117]">
//               Detected Conditions
//             </Text>

//             {/* Mild Redness */}
//             <BorderlessShadowCard
//               b_tl={0}
//               b_tr={0}
//               b_bl={0}
//               b_br={0}
//               style={{
//                 paddingVertical: 16,
//                 paddingHorizontal: 24,
//                 marginBottom: 12,
//               }}>
//               <View className="flex-row items-start gap-3">
//                 <IInCircleIcon size={24} color="#7A5D3E" />
//                 <View className="flex-1">
//                   <View className="flex-row items-center justify-between">
//                     <Text className="font-outfitMedium text-[14px] text-[#2A2118]">
//                       Mild Redness
//                     </Text>
//                     <PillowBadge
//                       title="Medium"
//                       textStyle={{ color: '#361A0D' }}
//                       style={{ backgroundColor: '#CAA78933' }}
//                     />
//                   </View>
//                   <Text className="mt-1.5 font-outfit text-[12px]" style={{ color: '#2A2118B2' }}>
//                     Concentrated around the cheeks. Likely due to mild barrier compromise.
//                   </Text>
//                 </View>
//               </View>
//             </BorderlessShadowCard>

//             {/* Dehydration */}
//             <BorderlessShadowCard
//               b_tl={0}
//               b_tr={0}
//               b_bl={0}
//               b_br={0}
//               style={{
//                 paddingVertical: 16,
//                 paddingHorizontal: 24,
//                 marginBottom: 12,
//               }}>
//               <View className="flex-row items-start gap-3">
//                 <SignInCuttedCircleIcon size={24} color="#7A8B6A" />
//                 <View className="flex-1">
//                   <View className="flex-row items-center justify-between">
//                     <Text className="font-outfitMedium text-[14px] text-[#2A2118]">
//                       Dehydration
//                     </Text>
//                     <PillowBadge title="Low" textStyle={{ color: '#7A8B6A' }} />
//                   </View>
//                   <Text className="mt-1.5 font-outfit text-[12px]" style={{ color: '#2A2118B2' }}>
//                     Slight lack of moisture in the T-zone.
//                   </Text>
//                 </View>
//               </View>
//             </BorderlessShadowCard>

//             {/* Pores */}
//             <BorderlessShadowCard
//               b_tl={0}
//               b_tr={0}
//               b_bl={24}
//               b_br={24}
//               style={{
//                 paddingVertical: 16,
//                 paddingHorizontal: 24,
//                 marginBottom: 24,
//               }}>
//               <View className="flex-row items-start gap-3">
//                 <SignInCuttedCircleIcon size={24} color="#7A8B6A" />
//                 <View className="flex-1">
//                   <View className="flex-row items-center justify-between">
//                     <Text className="font-outfitMedium text-[14px] text-[#2A2118]">Pores</Text>
//                     <PillowBadge title="Low" textStyle={{ color: '#7A8B6A' }} />
//                   </View>
//                   <Text className="mt-1.5 font-outfit text-[12px]" style={{ color: '#2A2118B2' }}>
//                     Normal appearance, slight congestion on nose.
//                   </Text>
//                 </View>
//               </View>
//             </BorderlessShadowCard>

//             {/* Button */}
//             <PrimaryButton
//               title="View Recommended Routine"
//               onPress={() => {
//                 router.push('/(main)/routines');
//               }}
//               style={{ marginBottom: 20 }}
//             />
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default AiAnalysisCompleteScreen;

// const styles = StyleSheet.create({});

// app/(flow)/scans/face-scan/ai-analysis-complete.tsx (or wherever your file is)
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import CustomHeader from '@/components/header/CustomHeader';
import { LAYOUT } from '@/constants/constants';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
import { IInCircleIcon } from '@/components/icons/IInCircleIcon';
import CircularProgress from '@/components/home/CircularProgress';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import PillowBadge from '@/components/buttons/PillowBadge';
import { SignInCuttedCircleIcon } from '@/components/icons';
import { AngleCapture } from '@/components/scans/MultiAngleCameraScan';
import { useScreenReady } from '@/hooks/useScreenReady';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';
import AnalysingResultScoreCard from '@/components/scans/AnalysingResultScoreCard';
import { SkinAnalysisCards } from '@/components/scans/faceScan/SkinAnalysisCards';

const SKIN_STATS = [
  { label: 'Hydration', value: '85', color: '#60A5FA' },
  { label: 'Sebum', value: '60', color: '#4ADE80' },
  { label: 'Redness', value: '38', color: '#FB7185' },
  { label: 'Texture', value: '98', color: '#FBBF24' },
  { label: 'Evenness', value: '52', color: '#A78BFA' },
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
          <View className="mt-3">
            <Text className="mb-2 text-start font-outfitMedium text-[16px] text-[#2E2117]">
              Detected Conditions
            </Text>

            {/* Mild Redness */}
            <BorderlessShadowCard
              b_tl={0}
              b_tr={0}
              b_bl={0}
              b_br={0}
              style={{
                paddingVertical: 16,
                paddingHorizontal: 24,
                marginBottom: 12,
              }}>
              <View className="flex-row items-start gap-3">
                <IInCircleIcon size={24} color="#7A5D3E" />
                <View className="flex-1">
                  <View className="flex-row items-center justify-between">
                    <Text className="font-outfitMedium text-[14px] text-[#2A2118]">
                      Mild Redness
                    </Text>
                    <PillowBadge
                      title="Medium"
                      textStyle={{ color: '#361A0D' }}
                      style={{ backgroundColor: '#CAA78933' }}
                    />
                  </View>
                  <Text className="mt-1.5 font-outfit text-[12px]" style={{ color: '#2A2118B2' }}>
                    Concentrated around the cheeks. Likely due to mild barrier compromise.
                  </Text>
                </View>
              </View>
            </BorderlessShadowCard>

            {/* Dehydration */}
            <BorderlessShadowCard
              b_tl={0}
              b_tr={0}
              b_bl={0}
              b_br={0}
              style={{
                paddingVertical: 16,
                paddingHorizontal: 24,
                marginBottom: 12,
              }}>
              <View className="flex-row items-start gap-3">
                <SignInCuttedCircleIcon size={24} color="#7A8B6A" />
                <View className="flex-1">
                  <View className="flex-row items-center justify-between">
                    <Text className="font-outfitMedium text-[14px] text-[#2A2118]">
                      Dehydration
                    </Text>
                    <PillowBadge title="Low" textStyle={{ color: '#7A8B6A' }} />
                  </View>
                  <Text className="mt-1.5 font-outfit text-[12px]" style={{ color: '#2A2118B2' }}>
                    Slight lack of moisture in the T-zone.
                  </Text>
                </View>
              </View>
            </BorderlessShadowCard>

            {/* Pores */}
            <BorderlessShadowCard
              b_tl={0}
              b_tr={0}
              b_bl={24}
              b_br={24}
              style={{
                paddingVertical: 16,
                paddingHorizontal: 24,
                marginBottom: 24,
              }}>
              <View className="flex-row items-start gap-3">
                <SignInCuttedCircleIcon size={24} color="#7A8B6A" />
                <View className="flex-1">
                  <View className="flex-row items-center justify-between">
                    <Text className="font-outfitMedium text-[14px] text-[#2A2118]">Pores</Text>
                    <PillowBadge title="Low" textStyle={{ color: '#7A8B6A' }} />
                  </View>
                  <Text className="mt-1.5 font-outfit text-[12px]" style={{ color: '#2A2118B2' }}>
                    Normal appearance, slight congestion on nose.
                  </Text>
                </View>
              </View>
            </BorderlessShadowCard>

            {/* Button */}
            <PrimaryButton
              title="View Recommended Routine"
              onPress={() => {
                router.push('/(main)/routines');
              }}
              style={{ marginBottom: 20 }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AiAnalysisCompleteScreen;

const styles = StyleSheet.create({});
