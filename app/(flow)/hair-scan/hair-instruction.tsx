// // components/scans/PreScanInstructions.tsx
// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { router } from 'expo-router';
// import { Video, ResizeMode } from 'expo-av';
// import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
// import PrimaryButton from '@/components/buttons/PrimaryButton';
// import LoadingScreen from '@/components/loading/LoadingScreen';
// import ErrorScreen from '@/components/errors/ErrorScreen';
// import { useScreenReady } from '@/hooks/useScreenReady';
// import CustomHeader from '@/components/header/CustomHeader';
// import { ScrollView } from 'react-native-gesture-handler';
// import { LAYOUT } from '@/constants/constants';
// import { ManBottomLessIcon, ProfileIcon, SquareFrameIcon, SunIcon } from '@/components/icons';

// const { width } = Dimensions.get('window');

// interface PreScanInstructionsProps {
//   onStart: () => void;
// }

// export const PreScanInstructions: React.FC<PreScanInstructionsProps> = ({ onStart }) => {
//   const [isInitialLoad, setIsInitialLoad] = useState(true);
//   const videoRef = useRef<Video>(null);

//   // Screen ready state for smooth transitions
//   const { isRendering, isContentReady, renderError } = useScreenReady({
//     dependencies: [],
//     delay: 100,
//     initialReady: false,
//   });

//   // Mark initial load as complete after first render
//   useEffect(() => {
//     if (isContentReady && isInitialLoad) {
//       setIsInitialLoad(false);
//     }
//   }, [isContentReady]);

//   const handleRetry = () => {
//     setIsInitialLoad(true);
//     setTimeout(() => {
//       setIsInitialLoad(false);
//     }, 100);
//   };

//   // Show initial render loading (useScreenReady) - ONLY on first load
//   if (isRendering && isInitialLoad) {
//     return (
//       <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
//         <LoadingScreen loadingText="Preparing instructions..." />
//       </SafeAreaView>
//     );
//   }

//   // Show error if rendering failed
//   if (renderError) {
//     return (
//       <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
//         <CustomHeader title="Face Scan Instructions" height={50} backButton />
//         <ErrorScreen message={renderError} onRetry={handleRetry} />
//       </SafeAreaView>
//     );
//   }

//   // Responsive video size
//   const videoWidth = width - 48; // Full width minus padding
//   const videoHeight = videoWidth * 0.56; // 16:9 aspect ratio

//   return (
//     <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
//       <CustomHeader title="Face Scan Instructions" height={50} backButton />

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
//             paddingBottom: 40,
//           }}>
//           {/* Video Player with rounded corners */}
//           <View className="items-center justify-center">
//             <View
//               style={{
//                 width: videoWidth,
//                 height: videoHeight,
//                 borderRadius: 24,
//                 borderWidth: 2,
//                 borderColor: '#361A0D',
//                 backgroundColor: '#F0E6D8',
//                 overflow: 'hidden',
//               }}>
//               <Video
//                 ref={videoRef}
//                 source={require('@/assets/videos/face_scan_guide.mp4')}
//                 style={{ width: '100%', height: '100%' }}
//                 resizeMode={ResizeMode.COVER}
//                 shouldPlay={true}
//                 isLooping={true}
//                 isMuted={true}
//               />
//             </View>
//           </View>

//           <Text className="mt-6 text-start font-outfitMedium text-[16px] text-[#2E2117]">
//             For best results, follow these steps :
//           </Text>
//           {/* Single BorderlessShadowCard container for all instructions */}
//           <BorderlessShadowCard
//             b_tl={24}
//             b_tr={24}
//             b_bl={24}
//             b_br={24}
//             style={{
//               paddingVertical: 24,
//               paddingHorizontal: 24,
//               gap: 16,
//               marginTop: 12,
//               borderWidth: 2,
//               borderLeftWidth: 1,
//               borderRightWidth: 1,
//               borderColor: '#FFFFFF66',
//             }}>
//             {/* Natural Light */}
//             <View className="flex-row items-center gap-3 ">
//               <BorderlessShadowCard
//                 b_tl={6}
//                 b_tr={6}
//                 b_bl={6}
//                 b_br={6}
//                 style={{
//                   width: 40,
//                   height: 40,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <SunIcon size={24} color="#F59E0B" />
//               </BorderlessShadowCard>
//               <View className="flex-1">
//                 <Text
//                   className="font-outfitMedium text-[14px] leading-5 "
//                   style={{
//                     color: '#2A2118',
//                   }}>
//                   Good Lighting
//                 </Text>
//                 <Text className="mt-[2px] font-outfit text-[12px] text-titleTextColor/60">
//                   Find a well-lit area, preferably natural daylight facing a window.
//                 </Text>
//               </View>
//             </View>

//             {/* No Makeup */}
//             <View className="flex-row items-center gap-3 ">
//               <BorderlessShadowCard
//                 b_tl={6}
//                 b_tr={6}
//                 b_bl={6}
//                 b_br={6}
//                 style={{
//                   width: 40,
//                   height: 40,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <ManBottomLessIcon size={24} color="#3B82F6" />
//               </BorderlessShadowCard>
//               <View className="flex-1">
//                 <Text
//                   className="font-outfitMedium text-[14px] leading-5 "
//                   style={{
//                     color: '#2A2118',
//                   }}>
//                   Clear Face
//                 </Text>
//                 <Text className="mt-[2px] font-outfit text-[12px] text-titleTextColor/60">
//                   Remove makeup, glasses, and pull hair back from your face.
//                 </Text>
//               </View>
//             </View>

//             {/* No Filters */}
//             <View className="flex-row items-center gap-3 ">
//               <BorderlessShadowCard
//                 b_tl={6}
//                 b_tr={6}
//                 b_bl={6}
//                 b_br={6}
//                 style={{
//                   width: 40,
//                   height: 40,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <SquareFrameIcon size={24} color="#7A8B6A" />
//               </BorderlessShadowCard>
//               <View className="flex-1">
//                 <Text
//                   className="font-outfitMedium text-[14px] leading-5 "
//                   style={{
//                     color: '#2A2118',
//                   }}>
//                   Positioning
//                 </Text>
//                 <Text className="mt-[2px] font-outfit text-[12px] text-titleTextColor/60">
//                   Hold phone at eye level, about 30cm away. Fill the oval frame.
//                 </Text>
//               </View>
//             </View>
//           </BorderlessShadowCard>

//           <PrimaryButton onPress={onStart} title="Start Scan" style={{ paddingVertical: 24 }} />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };
