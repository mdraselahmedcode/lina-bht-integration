// import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useAuth } from '@/hooks/useAuth';
// import HomeHeader from '@/components/header/HomeHeader';
// import ShadowCard from '@/components/cards/ShadowCard';
// import { LAYOUT } from '@/constants/constants';
// import HeaderPrimary from '@/components/texts/HeaderPrimary';
// import Subtitle from '@/components/texts/Subtitle';
// import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
// import CircularProgress from '@/components/home/CircularProgress';
// import { ScanProductIcon } from '@/components/icons/ScanProductIcon';
// import {
//   AiAssistantIcon,
//   DailyInsightIcon,
//   RoutineIcon,
//   ScanSkinIcon,
//   SkinNutritionIcon,
//   SkinProgressIcon,
//   SunIcon,
// } from '@/components/icons';
// import { Ionicons } from '@expo/vector-icons';
// import { CheckInCircleIcon } from '@/components/icons/CheckInCircleIcon';
// import { BorderCircleIcon } from '@/components/icons/BorderCircleIcon';
// import TextBodySmall from '@/components/texts/TextBodySmall';
// import { DotWideIcon } from '@/components/icons/DotWideIcon';

// export default function HomeScreen() {
//   const { logout } = useAuth();

//   const handleLogout = async () => {
//     try {
//       await logout();
//     } catch (error) {
//       Alert.alert('Error', 'Failed to logout. Please try again.');
//     }
//   };

//   return (
//     <SafeAreaView edges={['top', 'right']} className="flex-1 bg-[#E8DDD0] ">
//       <HomeHeader
//         title="Hello, Elena"
//         subtitle="Your skin is looking radiant today."
//         backButton={false}
//         // backgroundColor="lightblue"
//         height={65}
//         notificationCount={5}
//       />
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{
//           paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
//           paddingTop: LAYOUT.screen.scrollViewPaddingTop,
//         }}
//         className="flex-1 px-container"
//         style={{
//           marginTop: LAYOUT.innerPage.marginTop,
//         }}>
//         <ShadowCard style={{ borderBottomColor: '#FFFFFF66', borderBottomWidth: 2 }}>
//           <View className="flex-row items-center gap-7 ">
//             <CircularProgress progress={78} />
//             <View className="flex-1">
//               <HeaderPrimary text="Skin Health" style={{ color: '#2A2118' }} />
//               <Subtitle
//                 style={{ color: '#2A2118CC', fontSize: 16 }}
//                 text="Overall barrier is strong, but hydration is slightly low."
//               />
//             </View>
//           </View>

//           <View className="mt-6 flex-row items-center gap-4">
//             <View className="flex-1">
//               <BorderlessShadowCard b_bl={12} b_br={12} b_tl={12} b_tr={12}>
//                 <View className="flex-row items-center justify-center gap-1">
//                   <View className="h-[10] w-[10] rounded-[9999px] bg-[#60A5FA]" />
//                   <Text
//                     numberOfLines={1}
//                     ellipsizeMode="tail"
//                     className="font-outfitMedium text-[12px] text-[#2A211899]">
//                     Hydration
//                   </Text>
//                 </View>
//                 <Text className="mt-3 text-center font-outfitMedium text-[16px] ">72%</Text>
//               </BorderlessShadowCard>
//             </View>

//             <View className="flex-1">
//               <BorderlessShadowCard b_bl={12} b_br={12} b_tl={12} b_tr={12}>
//                 <View className="flex-row items-center justify-center gap-1">
//                   <View className="h-[10] w-[10] rounded-[9999px] bg-[#4ADE80]" />
//                   <Text className="font-outfitMedium text-[12px] text-[#2A211899]">Acne Risk</Text>
//                 </View>
//                 <Text
//                   numberOfLines={1}
//                   ellipsizeMode="tail"
//                   className="mt-3 text-center font-outfitMedium text-[16px] ">
//                   Low
//                 </Text>
//               </BorderlessShadowCard>
//             </View>

//             <View className="flex-1">
//               <BorderlessShadowCard b_bl={12} b_br={12} b_tl={12} b_tr={12}>
//                 <View className="flex-row items-center justify-center gap-1">
//                   <View className="h-[10] w-[10] rounded-[9999px] bg-[#FACC15]" />
//                   <Text
//                     numberOfLines={1}
//                     ellipsizeMode="tail"
//                     className="font-outfitMedium text-[12px] text-[#2A211899]">
//                     Sensitivity
//                   </Text>
//                 </View>
//                 <Text className="mt-3 text-center font-outfitMedium text-[16px] ">72%</Text>
//               </BorderlessShadowCard>
//             </View>
//           </View>
//         </ShadowCard>

//         <View className="mt-4 flex-row gap-4">
//           <BorderlessShadowCard
//             b_bl={0}
//             b_br={0}
//             b_tl={0}
//             b_tr={0}
//             style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
//             onPress={() => console.log('Scan Skin pressed')}>
//             <BorderlessShadowCard
//               b_bl={12}
//               b_br={12}
//               b_tl={12}
//               b_tr={12}
//               style={{
//                 width: 56,
//                 height: 56,
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <ScanSkinIcon size={26} color="#361A0D" />
//             </BorderlessShadowCard>
//             <Text className="mt-3 font-outfitMedium text-[16px] ">Scan Skin</Text>
//           </BorderlessShadowCard>

//           <BorderlessShadowCard
//             b_bl={0}
//             b_br={0}
//             b_tl={0}
//             b_tr={0}
//             style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
//             onPress={() => console.log('Scan Product pressed')}>
//             <BorderlessShadowCard
//               b_bl={12}
//               b_br={12}
//               b_tl={12}
//               b_tr={12}
//               style={{
//                 width: 56,
//                 height: 56,
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <ScanProductIcon size={26} color="#361A0D" />
//             </BorderlessShadowCard>
//             <Text className="mt-3 font-outfitMedium text-[16px]  ">Scan Product</Text>
//           </BorderlessShadowCard>
//         </View>

//         <View className="mt-4 flex-row gap-4">
//           <BorderlessShadowCard
//             b_bl={24}
//             b_br={24}
//             b_tl={0}
//             b_tr={0}
//             style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
//             onPress={() => console.log('Scan pressed')}>
//             <BorderlessShadowCard
//               b_bl={12}
//               b_br={12}
//               b_tl={12}
//               b_tr={12}
//               style={{
//                 width: 56,
//                 height: 56,
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <RoutineIcon size={26} color="#361A0D" />
//             </BorderlessShadowCard>
//             <Text className="mt-3 font-outfitMedium text-[16px] ">My Routine</Text>
//           </BorderlessShadowCard>

//           <BorderlessShadowCard
//             b_bl={24}
//             b_br={24}
//             b_tl={0}
//             b_tr={0}
//             style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
//             onPress={() => console.log('Scan pressed')}>
//             <BorderlessShadowCard
//               b_bl={12}
//               b_br={12}
//               b_tl={12}
//               b_tr={12}
//               style={{
//                 width: 56,
//                 height: 56,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <AiAssistantIcon size={26} color="#361A0D" />
//             </BorderlessShadowCard>

//             <Text className="mt-3 font-outfitMedium text-[16px]">AI Assistant</Text>
//           </BorderlessShadowCard>
//         </View>

//         <ShadowCard style={{ borderBottomColor: '#FFFFFF66', borderBottomWidth: 2, marginTop: 24 }}>
//           <View className="flex-row items-center justify-between">
//             <View className="flex-row items-center justify-start gap-3">
//               <View className="flex h-8 w-8 items-center justify-center rounded-full bg-white ">
//                 <SunIcon size={16} color="#F59E0B" />
//               </View>
//               <Text className="font-outfitMedium text-[16px] text-[#2A2118] ">Morning Routine</Text>
//             </View>
//             <TouchableOpacity className="flex-row items-center justify-center gap-1 ">
//               <Text className="font-outfitMedium text-[12px] text-[#C8A97E] ">View All</Text>
//               <Ionicons name="chevron-forward" size={16} color={'#C8A97E'} />
//             </TouchableOpacity>
//           </View>

//           <View className="mt-6 gap-3 ">
//             <View className="flex-row items-center justify-start gap-[6px] ">
//               <CheckInCircleIcon size={18} color="#7A8B6A" strokeWidth={2} />
//               <Text className="font-outfit text-[14px] text-[#7A8B6A] ">Gentle Oat Cleanser</Text>
//             </View>
//             <View className="flex-row items-center justify-start gap-[6px] ">
//               <BorderCircleIcon size={18} color="#2A211833" strokeWidth={2} />
//               <Text className="font-outfitMedium text-[14px] text-[#2A2118] ">
//                 Calm & Restore Serum
//               </Text>
//             </View>
//             <View className="flex-row items-center justify-start gap-[6px] ">
//               <BorderCircleIcon size={18} color="#2A211833" strokeWidth={2} />
//               <Text className="font-outfitMedium text-[14px] text-[#2A2118] ">Mineral SPF 50</Text>
//             </View>
//           </View>

//           <View className="mt-6 flex-row items-center justify-between gap-4 ">
//             <View className="flex-1">
//               {/* Track */}
//               <View
//                 style={{
//                   height: 6,
//                   backgroundColor: '#2A21180D',
//                   borderRadius: 100,
//                   overflow: 'hidden',
//                 }}>
//                 {/* Progress */}
//                 <View
//                   style={{
//                     width: '33%', // 👉 dynamic later
//                     height: '100%',
//                     backgroundColor: '#C8A97E',
//                     borderRadius: 100,
//                   }}
//                 />
//               </View>
//             </View>
//             <TextBodySmall text="1 of 3" style={{ color: '#2A211880' }} />
//           </View>
//         </ShadowCard>

//         <ShadowCard
//           b_bl={0}
//           b_br={0}
//           b_tl={0}
//           b_tr={0}
//           style={{ borderBottomColor: '#FFFFFF66', borderBottomWidth: 2, marginTop: 16 }}>
//           <TouchableOpacity
//             activeOpacity={0.6}
//             className="flex-row items-start justify-center gap-3 ">
//             <BorderlessShadowCard
//               b_bl={6}
//               b_br={6}
//               b_tl={6}
//               b_tr={6}
//               style={{
//                 width: 40,
//                 height: 40,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}>
//               <DailyInsightIcon size={18} color="#7A8B6A" />
//             </BorderlessShadowCard>
//             <View className="flex-1">
//               <Text className="font-outfitMedium text-[14px] text-[#2A2118] ">Daily Insight</Text>
//               <TextBodySmall
//                 style={{ fontFamily: 'Outfit-Regular' }}
//                 text="Humidity is low today (32%). Consider adding a hyaluronic acid serum."
//               />
//             </View>

//             <Ionicons name="chevron-forward" size={16} color={'#C8A97E'} />
//           </TouchableOpacity>

//           <TouchableOpacity
//             activeOpacity={0.6}
//             className=" mt-4 flex-row items-start justify-center gap-3 ">
//             <BorderlessShadowCard
//               b_bl={6}
//               b_br={6}
//               b_tl={6}
//               b_tr={6}
//               style={{
//                 width: 40,
//                 height: 40,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}>
//               <SkinNutritionIcon size={18} color="#7A8B6A" />
//             </BorderlessShadowCard>
//             <View className="flex-1">
//               <Text className="font-outfitMedium text-[14px] text-[#2A2118] ">Daily Insight</Text>
//               <TextBodySmall
//                 style={{ fontFamily: 'Outfit-Regular' }}
//                 text="Humidity is low today (32%). Consider adding a hyaluronic acid serum."
//               />
//             </View>

//             <Ionicons name="chevron-forward" size={16} color={'#C8A97E'} />
//           </TouchableOpacity>
//         </ShadowCard>

//         <ShadowCard b_bl={24} b_br={24} b_tl={0} b_tr={0} style={{ marginTop: 16 }}>
//           <TouchableOpacity
//             activeOpacity={0.6}
//             className=" flex-row items-start justify-center gap-3 ">
//             <BorderlessShadowCard
//               b_bl={6}
//               b_br={6}
//               b_tl={6}
//               b_tr={6}
//               style={{
//                 width: 40,
//                 height: 40,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}>
//               <SkinProgressIcon size={18} color="#7A8B6A" />
//             </BorderlessShadowCard>
//             <View className="flex-1 flex-row items-center gap-3">
//               <View>
//                 <Text className="font-outfitMedium text-[14px] text-[#2A2118] ">Skin Progress</Text>
//                 <TextBodySmall
//                   style={{ fontFamily: 'Outfit-Regular', color: '#7A8B6A' }}
//                   text="+2 pts this week"
//                 />
//               </View>
//               <DotWideIcon width={102} height={28} />
//             </View>

//             <Ionicons name="chevron-forward" size={16} color={'#C8A97E'} />
//           </TouchableOpacity>
//         </ShadowCard>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// screens/home/index.tsx
import React from 'react';
import { ScrollView, ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHeader from '@/components/header/HomeHeader';

import { useHomeScreen } from '@/components/home/hooks/useHomeScreen';
import { SkinHealthCard } from '@/components/home/SkinHealthCard';
import { QuickActionsRow } from '@/components/home/QuickActionsRow';
import { InsightsSection } from '@/components/home/InsightsSection';
import { SkinProgressCard } from '@/components/home/SkinProgressCard';
import { MorningRoutineCard } from '@/components/home/MorningRoutineCard';
import { LAYOUT } from '@/constants/constants';

export default function HomeScreen() {
  const {
    homeData,
    isLoading,
    isError,
    notificationCount,
    completedStepsCount,
    routineProgress,
    handleLogout,
    toggleStepCompletion,
    handleQuickAction,
    handleViewAllRoutines,
    handleInsightPress,
    handleSkinProgress,
    refetch,
  } = useHomeScreen();

  // Loading state
  if (isLoading) {
    return (
      <SafeAreaView
        edges={['top', 'right']}
        className="flex-1 items-center justify-center bg-[#E8DDD0]">
        <ActivityIndicator size="large" color="#759A52" />
      </SafeAreaView>
    );
  }

  // Error state
  if (isError || !homeData) {
    return (
      <SafeAreaView
        edges={['top', 'right']}
        className="flex-1 items-center justify-center bg-backgroundColor">
        <View className="items-center px-6">
          <Text className="mb-4 text-center font-outfit text-[16px] text-red-500">
            Failed to load home data
          </Text>
          <TouchableOpacity onPress={refetch} className="rounded-full bg-[#95B287] px-6 py-3">
            <Text className="font-outfit text-white">Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const { user, skinHealth, metrics, morningRoutine, insights, quickActions } = homeData;

  return (
    <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
      <HomeHeader
        title={`Hello, ${user.name}`}
        subtitle="Your skin is looking radiant today."
        backButton={false}
        height={65}
        notificationCount={notificationCount}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-container"
        contentContainerStyle={{
          paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
          paddingTop: LAYOUT.screen.scrollViewPaddingTop,
        }}
        style={{
          marginTop: LAYOUT.innerPage.marginTop,
        }}>
        <SkinHealthCard
          score={skinHealth.score}
          description={skinHealth.description}
          metrics={metrics}
        />

        <QuickActionsRow actions={quickActions} onActionPress={handleQuickAction} />

        <MorningRoutineCard
          routine={morningRoutine}
          completedStepsCount={completedStepsCount}
          routineProgress={routineProgress}
          onToggleStep={toggleStepCompletion}
          onViewAll={handleViewAllRoutines}
        />

        <InsightsSection insights={insights} onInsightPress={handleInsightPress} />

        <SkinProgressCard onPress={handleSkinProgress} />
      </ScrollView>
    </SafeAreaView>
  );
}
