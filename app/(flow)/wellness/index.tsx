// import {
//   Alert,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   LayoutChangeEvent,
// } from 'react-native';
// import React, { useState, useRef } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import CustomHeader from '@/components/header/CustomHeader';
// import { LAYOUT } from '@/constants/constants';
// import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
// import PrimaryButton from '@/components/buttons/PrimaryButton';
// import { LoveIcon, ThreeCurvedIcon, ZLikeIcon } from '@/components/icons';
// import { useAuth } from '@/hooks/useAuth';
// import { useToast } from '@/hooks/useToast';
// import { CircularIconButton } from '@/components/buttons/CircularIconButton';
// import PillowBadge from '@/components/buttons/PillowBadge';

// const WellnessScreen = () => {
//   const [stressLevel, setStressLevel] = useState(50);
//   const [barWidth, setBarWidth] = useState(0);
//   const barRef = useRef<View>(null);

//   const { logout } = useAuth();
//   const { showSuccess, showError } = useToast();

//   const handleLogout = async () => {
//     try {
//       await logout();
//       showSuccess('You have been logged out successfully');
//     } catch (error) {
//       showError('Failed to log out. Please try again.');
//     }
//   };

//   const handleStressLog = () => {
//     let stressText = '';
//     if (stressLevel <= 20) stressText = 'Very Calm';
//     else if (stressLevel <= 40) stressText = 'Calm';
//     else if (stressLevel <= 60) stressText = 'Moderate';
//     else if (stressLevel <= 80) stressText = 'Stressed';
//     else stressText = 'Highly Stressed';

//     showSuccess(`Stress level logged: ${stressText} (${Math.round(stressLevel)}%)`);
//   };

//   const handleBarPress = (event: any) => {
//     if (!barWidth) return;

//     const { locationX } = event.nativeEvent;
//     const percentage = (locationX / barWidth) * 100;
//     const newValue = Math.min(100, Math.max(0, percentage));
//     setStressLevel(newValue);
//   };

//   const handleBarLayout = (event: LayoutChangeEvent) => {
//     const { width } = event.nativeEvent.layout;
//     setBarWidth(width);
//   };

//   const getStressText = () => {
//     if (stressLevel <= 20) return 'Very Calm';
//     if (stressLevel <= 40) return 'Calm';
//     if (stressLevel <= 60) return 'Moderate';
//     if (stressLevel <= 80) return 'Stressed';
//     return 'Highly Stressed';
//   };

//   const getStressColor = () => {
//     if (stressLevel <= 20) return '#10B981';
//     if (stressLevel <= 40) return '#84CC16';
//     if (stressLevel <= 60) return '#F59E0B';
//     if (stressLevel <= 80) return '#F97316';
//     return '#EF4444';
//   };

//   return (
//     <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
//       <CustomHeader title="Wellness" height={50} backButton={true} />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{
//           paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
//           paddingTop: 10,
//           flexGrow: 1,
//         }}
//         className="flex-1">
//         <View className="px-container">
//           {/* Daily Stress Check-in Card */}
//           <BorderlessShadowCard
//             style={{
//               paddingVertical: 16,
//               paddingHorizontal: 24,
//             }}>
//             <View className="flex-row gap-3">
//               <CircularIconButton size={32} icon={<ZLikeIcon size={20} color="#F59E0B" />} />
//               <View className="flex-1">
//                 <Text className="font-outfitMedium text-[16px]" style={{ color: '#2A2118' }}>
//                   Daily Stress Check-in
//                 </Text>
//                 <Text className="mt-[6px] font-outfit text-[12px]" style={{ color: '#2A2118B2' }}>
//                   High stress increases cortisol, which can lead to breakouts. How are you feeling
//                   today?
//                 </Text>
//               </View>
//             </View>

//             {/* Stress Level Indicator */}
//             <View className="mt-6">
//               {/* Progress Bar Container */}
//               <TouchableOpacity
//                 activeOpacity={0.8}
//                 onPress={handleBarPress}
//                 onLayout={handleBarLayout}
//                 style={{
//                   height: 40,
//                   justifyContent: 'center',
//                 }}>
//                 <View
//                   ref={barRef}
//                   style={{
//                     height: 10,
//                     backgroundColor: '#2E21173D',
//                     borderRadius: 8,
//                     overflow: 'hidden',
//                   }}>
//                   {/* Colored Progress */}
//                   <View
//                     style={{
//                       width: `${stressLevel}%`,
//                       height: '100%',
//                       backgroundColor: getStressColor(),
//                       borderRadius: 8,
//                     }}
//                   />
//                 </View>

//                 {/* Draggable Pointer */}
//                 <View
//                   style={{
//                     position: 'absolute',
//                     left: `${stressLevel}%`,
//                     marginLeft: -8,
//                     width: 16,
//                     height: 16,
//                     borderRadius: 8,
//                     backgroundColor: '#361A0D',
//                     borderWidth: 2,
//                     borderColor: '#FFFFFF',
//                     shadowColor: '#000',
//                     shadowOffset: { width: 0, height: 2 },
//                     shadowOpacity: 0.25,
//                     shadowRadius: 4,
//                     elevation: 4,
//                   }}
//                 />
//               </TouchableOpacity>

//               {/* Labels */}
//               <View className="mb-2 flex-row justify-between">
//                 <Text className="font-outfit text-[12px]" style={{ color: '#361A0D' }}>
//                   Very Calm
//                 </Text>
//                 <Text className="font-outfit text-[12px]" style={{ color: '#361A0D' }}>
//                   Highly Stressed
//                 </Text>
//               </View>

//               {/* Current Selection Text */}
//               <View className="mt-3 items-center">
//                 <Text className="font-outfitMedium text-[14px]" style={{ color: getStressColor() }}>
//                   Current: {getStressText()}
//                 </Text>
//               </View>
//             </View>

//             {/* Log Stress Level Button */}
//             <PrimaryButton
//               title="Log Stress Level"
//               onPress={handleStressLog}
//               style={{ marginTop: 16 }}
//             />
//           </BorderlessShadowCard>

//           <BorderlessShadowCard
//             b_tl={0}
//             b_tr={0}
//             b_bl={0}
//             b_br={0}
//             style={{
//               marginTop: 12,
//               paddingVertical: 16,
//               paddingHorizontal: 24,
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <CircularIconButton
//               style={{ backgroundColor: '#CAA78933' }}
//               size={76}
//               icon={<ThreeCurvedIcon width={26} height={24} />}
//             />
//             <Text className="mt-3 font-outfitMedium text-[20px]  " style={{ color: '#2E2117' }}>
//               3-Min Breathing
//             </Text>
//             <Text
//               className="mt-[6px] text-center font-outfit text-[14px] "
//               style={{ color: '#2E211799' }}>
//               Lower your cortisol levels instantly with guided box breathing.
//             </Text>
//             <PrimaryButton title="Start Exercise" style={{ width: '100%', marginTop: 12 }} />
//           </BorderlessShadowCard>

//           <BorderlessShadowCard
//             b_tl={0}
//             b_tr={0}
//             b_bl={24}
//             b_br={24}
//             style={{
//               marginTop: 12,
//               paddingVertical: 16,
//               paddingHorizontal: 24,
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <View className="flex-row gap-3">
//               <CircularIconButton size={32} icon={<LoveIcon size={20} color="#EC4899" />} />
//               <View className="flex-1">
//                 <Text className="font-outfitMedium text-[16px]" style={{ color: '#2A2118' }}>
//                   Cycle Syncing
//                 </Text>
//                 <Text className="mt-[6px] font-outfit text-[12px]" style={{ color: '#2A2118B2' }}>
//                   You are in your <Text className="font-OutfitBold text-[12px] ">Luteal Phase</Text>{' '}
//                   Progesterone is rising, which may increase sebum production.
//                 </Text>
//               </View>
//             </View>
//             <View
//               className=" "
//               style={{
//                 height: 1,
//                 width: '100%',
//                 backgroundColor: '#2E211733',
//                 marginVertical: 12,
//               }}
//             />
//             <Text
//               className="w-full text-start font-outfitMedium text-[16px] "
//               style={{ color: '#2A2118' }}>
//               AI Routine Adjustment
//             </Text>
//             <Text className="font-outfit text-[12px] " style={{ color: '#2A2118B2' }}>
//               We&apos;ve added a gentle BHA exfoliant to your night routine to prevent clogged pores
//             </Text>
//           </BorderlessShadowCard>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default WellnessScreen;

// const styles = StyleSheet.create({});

// app/(flow)/wellness/index.tsx
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  LayoutChangeEvent,
  Modal,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/header/CustomHeader';
import { LAYOUT } from '@/constants/constants';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import { LoveIcon, ThreeCurvedIcon, ZLikeIcon } from '@/components/icons';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { CircularIconButton } from '@/components/buttons/CircularIconButton';
import { BreathingExercise } from '@/components/wellness/BreathingExercise';

const WellnessScreen = () => {
  const [stressLevel, setStressLevel] = useState(50);
  const [barWidth, setBarWidth] = useState(0);
  const [showBreathingModal, setShowBreathingModal] = useState(false);
  const barRef = useRef<View>(null);

  const { logout } = useAuth();
  const { showSuccess, showError } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      showSuccess('You have been logged out successfully');
    } catch (error) {
      showError('Failed to log out. Please try again.');
    }
  };

  const handleStressLog = () => {
    let stressText = '';
    if (stressLevel <= 20) stressText = 'Very Calm';
    else if (stressLevel <= 40) stressText = 'Calm';
    else if (stressLevel <= 60) stressText = 'Moderate';
    else if (stressLevel <= 80) stressText = 'Stressed';
    else stressText = 'Highly Stressed';

    showSuccess(`Stress level logged: ${stressText} (${Math.round(stressLevel)}%)`);
  };

  const handleBarPress = (event: any) => {
    if (!barWidth) return;

    const { locationX } = event.nativeEvent;
    const percentage = (locationX / barWidth) * 100;
    const newValue = Math.min(100, Math.max(0, percentage));
    setStressLevel(newValue);
  };

  const handleBarLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setBarWidth(width);
  };

  const getStressText = () => {
    if (stressLevel <= 20) return 'Very Calm';
    if (stressLevel <= 40) return 'Calm';
    if (stressLevel <= 60) return 'Moderate';
    if (stressLevel <= 80) return 'Stressed';
    return 'Highly Stressed';
  };

  const getStressColor = () => {
    if (stressLevel <= 20) return '#10B981';
    if (stressLevel <= 40) return '#84CC16';
    if (stressLevel <= 60) return '#F59E0B';
    if (stressLevel <= 80) return '#F97316';
    return '#EF4444';
  };

  return (
    <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
      <CustomHeader title="Wellness" height={50} backButton={true} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
          paddingTop: 10,
          flexGrow: 1,
        }}
        className="flex-1">
        <View className="px-container">
          {/* Daily Stress Check-in Card */}
          <BorderlessShadowCard
            style={{
              paddingVertical: 16,
              paddingHorizontal: 24,
            }}>
            <View className="flex-row gap-3">
              <CircularIconButton size={32} icon={<ZLikeIcon size={20} color="#F59E0B" />} />
              <View className="flex-1">
                <Text className="font-outfitMedium text-[16px]" style={{ color: '#2A2118' }}>
                  Daily Stress Check-in
                </Text>
                <Text className="mt-[6px] font-outfit text-[12px]" style={{ color: '#2A2118B2' }}>
                  High stress increases cortisol, which can lead to breakouts. How are you feeling
                  today?
                </Text>
              </View>
            </View>

            {/* Stress Level Indicator */}
            <View className="mt-6">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleBarPress}
                onLayout={handleBarLayout}
                style={{
                  height: 40,
                  justifyContent: 'center',
                }}>
                <View
                  ref={barRef}
                  style={{
                    height: 10,
                    backgroundColor: '#2E21173D',
                    borderRadius: 8,
                    overflow: 'hidden',
                  }}>
                  <View
                    style={{
                      width: `${stressLevel}%`,
                      height: '100%',
                      backgroundColor: getStressColor(),
                      borderRadius: 8,
                    }}
                  />
                </View>

                <View
                  style={{
                    position: 'absolute',
                    left: `${stressLevel}%`,
                    marginLeft: -8,
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    backgroundColor: '#361A0D',
                    borderWidth: 2,
                    borderColor: '#FFFFFF',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 4,
                  }}
                />
              </TouchableOpacity>

              <View className="mb-2 flex-row justify-between">
                <Text className="font-outfit text-[12px]" style={{ color: '#361A0D' }}>
                  Very Calm
                </Text>
                <Text className="font-outfit text-[12px]" style={{ color: '#361A0D' }}>
                  Highly Stressed
                </Text>
              </View>

              <View className="mt-3 items-center">
                <Text className="font-outfitMedium text-[14px]" style={{ color: getStressColor() }}>
                  Current: {getStressText()}
                </Text>
              </View>
            </View>

            <PrimaryButton
              title="Log Stress Level"
              onPress={handleStressLog}
              style={{ marginTop: 16 }}
            />
          </BorderlessShadowCard>

          {/* Breathing Exercise Card */}
          <BorderlessShadowCard
            b_tl={0}
            b_tr={0}
            b_bl={0}
            b_br={0}
            style={{
              marginTop: 12,
              paddingVertical: 16,
              paddingHorizontal: 24,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CircularIconButton
              style={{ backgroundColor: '#CAA78933' }}
              size={76}
              icon={<ThreeCurvedIcon width={26} height={24} />}
            />
            <Text className="mt-3 font-outfitMedium text-[20px]" style={{ color: '#2E2117' }}>
              3-Min Breathing
            </Text>
            <Text
              className="mt-[6px] text-center font-outfit text-[14px]"
              style={{ color: '#2E211799' }}>
              Lower your cortisol levels instantly with guided box breathing.
            </Text>
            <PrimaryButton
              title="Start Exercise"
              onPress={() => setShowBreathingModal(true)}
              style={{ width: '100%', marginTop: 12 }}
            />
          </BorderlessShadowCard>

          {/* Cycle Syncing Card */}
          <BorderlessShadowCard
            b_tl={0}
            b_tr={0}
            b_bl={24}
            b_br={24}
            style={{
              marginTop: 12,
              paddingVertical: 16,
              paddingHorizontal: 24,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View className="flex-row gap-3">
              <CircularIconButton size={32} icon={<LoveIcon size={20} color="#EC4899" />} />
              <View className="flex-1">
                <Text className="font-outfitMedium text-[16px]" style={{ color: '#2A2118' }}>
                  Cycle Syncing
                </Text>
                <Text className="mt-[6px] font-outfit text-[12px]" style={{ color: '#2A2118B2' }}>
                  You are in your <Text className="font-OutfitBold text-[12px]">Luteal Phase</Text>{' '}
                  Progesterone is rising, which may increase sebum production.
                </Text>
              </View>
            </View>
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: '#2E211733',
                marginVertical: 12,
              }}
            />
            <Text
              className="w-full text-start font-outfitMedium text-[16px]"
              style={{ color: '#2A2118' }}>
              AI Routine Adjustment
            </Text>
            <Text className="font-outfit text-[12px]" style={{ color: '#2A2118B2' }}>
              We&apos;ve added a gentle BHA exfoliant to your night routine to prevent clogged pores
            </Text>
          </BorderlessShadowCard>
        </View>
      </ScrollView>

      {/* Breathing Exercise Modal */}
      <Modal
        visible={showBreathingModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowBreathingModal(false)}>
        <BreathingExercise onClose={() => setShowBreathingModal(false)} />
      </Modal>
    </SafeAreaView>
  );
};

export default WellnessScreen;

const styles = StyleSheet.create({});
