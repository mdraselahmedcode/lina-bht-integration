// // import { StyleSheet, Text, View } from 'react-native'
// // import React from 'react'
// // import { SafeAreaView } from 'react-native-safe-area-context'
// // import CustomHeader from '@/components/header/CustomHeader'
// // import { ScrollView } from 'react-native-gesture-handler'
// // import { LAYOUT } from '@/constants/constants'
// // import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard'
// // import { IInCircleIcon } from '@/components/icons/IInCircleIcon'

// // const AiAnalysisCompleteScreen = () => {
// //   return (
// //     <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">

// //       <CustomHeader title='Analysis Complete' height={40} />
// //       <ScrollView
// //         showsVerticalScrollIndicator={false}
// //         contentContainerStyle={{
// //           paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
// //           marginTop: 24,
// //         }}
// //         className="flex-1 px-container"
// //       >



// //         <View className='mt-3'>
// //           <Text className='font-outfitMedium text-[16px] text-[#2E2117] text-start '>Detected Conditions</Text>
// //           <BorderlessShadowCard onPress={() => { }} style={{ paddingVertical: 16, paddingHorizontal: 24 }} >
// //             <IInCircleIcon size={24} color='#7A5D3E' />
// //           </BorderlessShadowCard>
// //         </View>
// //       </ScrollView>
// //     </SafeAreaView>
// //   )
// // }

// // export default AiAnalysisCompleteScreen

// // const styles = StyleSheet.create({})

// // app/(flow)/scans/ai-analysis-complete.tsx
// import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
// import React from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useLocalSearchParams, router } from 'expo-router';
// import CustomHeader from '@/components/header/CustomHeader';
// import { LAYOUT } from '@/constants/constants';
// import { IInCircleIcon } from '@/components/icons/IInCircleIcon';

// const AiAnalysisCompleteScreen = () => {
//     // const { imageUri, scanType } = useLocalSearchParams();

//     // Sample detected conditions data
//     const detectedConditions = [
//         { id: 1, name: 'Dehydration', severity: 'Moderate', icon: '💧' },
//         { id: 2, name: 'Redness', severity: 'Mild', icon: '🔴' },
//         { id: 3, name: 'Enlarged Pores', severity: 'Mild', icon: '🔘' },
//     ];

//     return (
//         <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
//             <CustomHeader title="Analysis Complete" height={40} backButton />

//             <ScrollView
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={{
//                     paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
//                     paddingTop: 24,
//                 }}
//                 className="flex-1 px-container"
//             >
//                 {/* Detected Conditions Section */}
//                 <View className="mt-3">
//                     <Text className="font-outfitMedium text-[16px] text-[#2E2117] text-start mb-3">
//                         Detected Conditions
//                     </Text>

//                     {/* Conditions List - Using simple View instead of BorderlessShadowCard */}
//                     {detectedConditions.map((condition) => (
//                         <View
//                             key={condition.id}
//                             style={{
//                                 backgroundColor: 'white',
//                                 paddingVertical: 16,
//                                 paddingHorizontal: 20,
//                                 marginBottom: 12,
//                                 borderRadius: 16,
//                                 shadowColor: '#000',
//                                 shadowOffset: { width: 0, height: 2 },
//                                 shadowOpacity: 0.05,
//                                 shadowRadius: 8,
//                                 elevation: 2,
//                                 flexDirection: 'row',
//                                 alignItems: 'center',
//                                 justifyContent: 'space-between'
//                             }}
//                         >
//                             <View className="flex-row items-center gap-3">
//                                 <View className="w-10 h-10 rounded-full bg-[#F5EDE3] items-center justify-center">
//                                     <Text style={{ fontSize: 20 }}>{condition.icon}</Text>
//                                 </View>
//                                 <View>
//                                     <Text className="font-outfitMedium text-[15px] text-[#2E2117]">
//                                         {condition.name}
//                                     </Text>
//                                     <Text className="font-outfit text-[12px] text-[#2E2117CC]">
//                                         {condition.severity}
//                                     </Text>
//                                 </View>
//                             </View>
//                             <IInCircleIcon size={24} color="#7A5D3E" />
//                         </View>
//                     ))}
//                 </View>

//                 {/* Additional Info Section */}
//                 <View className="mt-6 mb-8">
//                     <View
//                         style={{
//                             backgroundColor: 'white',
//                             paddingVertical: 20,
//                             paddingHorizontal: 20,
//                             borderRadius: 16,
//                             shadowColor: '#000',
//                             shadowOffset: { width: 0, height: 2 },
//                             shadowOpacity: 0.05,
//                             shadowRadius: 8,
//                             elevation: 2,
//                         }}
//                     >
//                         <Text className="font-outfitMedium text-[14px] text-[#2E2117] mb-2">
//                             Recommendations
//                         </Text>
//                         <Text className="font-outfit text-[12px] text-[#2E2117CC] leading-5">
//                             Based on your skin analysis, we recommend hydrating products and gentle cleansers to address the detected conditions.
//                         </Text>
//                     </View>
//                 </View>

//                 {/* Action Buttons */}
//                 <View className="flex-row gap-3 mb-8">
//                     <TouchableOpacity
//                         onPress={() => router.back()}
//                         className="flex-1 bg-[#F5EDE3] py-4 rounded-2xl"
//                     >
//                         <Text className="text-center font-outfitMedium text-[16px] text-[#2E2117]">
//                             New Scan
//                         </Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         onPress={() => router.push('/(main)')}
//                         className="flex-1 bg-[#2E2117] py-4 rounded-2xl"
//                     >
//                         <Text className="text-center font-outfitMedium text-[16px] text-white">
//                             Done
//                         </Text>
//                     </TouchableOpacity>
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// export default AiAnalysisCompleteScreen;

// const styles = StyleSheet.create({});