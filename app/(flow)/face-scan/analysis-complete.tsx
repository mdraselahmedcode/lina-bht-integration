// import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useLocalSearchParams } from 'expo-router';
// import CustomHeader from '@/components/header/CustomHeader';
// import { LAYOUT } from '@/constants/constants';
// import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
// import { IInCircleIcon } from '@/components/icons/IInCircleIcon';
// import CircularProgress from '@/components/home/CircularProgress';
// import PrimaryButton from '@/components/buttons/PrimaryButton';
// import PillowBadge from '@/components/buttons/PillowBadge';
// import { SignInCuttedCircleIcon } from '@/components/icons';
// import { useRouter } from 'expo-router';
// import { AngleCapture } from '@/components/scans/MultiAngleCameraScan';

// const AiAnalysisCompleteScreen = () => {
//   const router = useRouter();
//   const { captures: capturesParam } = useLocalSearchParams();
//   const [captures, setCaptures] = useState<AngleCapture[]>([]);

//   useEffect(() => {
//     console.log('📊 ANALYSIS SCREEN - Received params:', {
//       hasCaptures: !!capturesParam,
//       capturesParam,
//     });

//     if (capturesParam) {
//       try {
//         const parsed = JSON.parse(capturesParam as string);
//         setCaptures(parsed);
//         console.log('✅ Parsed captures successfully:', parsed.length);
//       } catch (error) {
//         console.error('Error parsing captures:', error);
//       }
//     }
//   }, [capturesParam]);

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
//         <View className="px-container">
//           {/* Progress Card */}
//           <BorderlessShadowCard
//             style={{
//               paddingVertical: 40,
//               paddingHorizontal: 24,
//               alignItems: 'center',
//             }}>
//             <CircularProgress progress={78} />
//             <Text
//               className="mt-6 text-center font-outfit text-[16px]"
//               style={{ color: '#2A2118CC' }}>
//               Your skin barrier is slightly compromised today. Focus on hydration and soothing
//               ingredients.
//             </Text>
//           </BorderlessShadowCard>

//           {/* Captured Angles Preview */}
//           {captures.length > 0 && (
//             <View className="mt-3">
//               <Text className="mb-2 text-start font-outfitMedium text-[16px] text-[#2E2117]">
//                 Captured Angles
//               </Text>
//               <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
//                 <View className="flex-row gap-2">
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

import { ScrollView, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import CustomHeader from '@/components/header/CustomHeader';
import { LAYOUT } from '@/constants/constants';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
import { IInCircleIcon } from '@/components/icons/IInCircleIcon';
import CircularProgress from '@/components/home/CircularProgress';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import PillowBadge from '@/components/buttons/PillowBadge';
import { SignInCuttedCircleIcon } from '@/components/icons';
import { useRouter } from 'expo-router';
import { AngleCapture } from '@/components/scans/MultiAngleCameraScan';
import { useScreenReady } from '@/hooks/useScreenReady';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';

const AiAnalysisCompleteScreen = () => {
  const router = useRouter();
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
        // No captures found - this might be an error or just no data
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
          {/* Progress Card */}
          <BorderlessShadowCard
            style={{
              paddingVertical: 40,
              paddingHorizontal: 24,
              alignItems: 'center',
            }}>
            <CircularProgress progress={78} />
            <Text
              className="mt-6 text-center font-outfit text-[16px]"
              style={{ color: '#2A2118CC' }}>
              Your skin barrier is slightly compromised today. Focus on hydration and soothing
              ingredients.
            </Text>
          </BorderlessShadowCard>

          {/* Captured Angles Preview */}
          {captures.length > 0 && (
            <View className="mt-3">
              <Text className="mb-2 text-start font-outfitMedium text-[16px] text-[#2E2117]">
                Captured Angles
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
                <View className="flex-row gap-2">
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
