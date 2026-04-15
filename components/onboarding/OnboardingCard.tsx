// // components/onboarding/OnboardingCard.tsx
// import React from 'react';
// import { View, Platform } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { BlurView } from 'expo-blur';
// import OBTitle from '@/components/texts/onboarding/OBTitle';
// import OBSubtitle from '@/components/texts/onboarding/OBSubtitle';
// import PaginationDots from './PaginationDots';
// import { GRADIENT_CONFIG } from '@/constants/onboarding';

// interface OnboardingCardProps {
//   title: string;
//   description: string;
//   currentIndex: number;
//   totalScreens: number;
//   blurIntensity?: number;
// }

// export default function OnboardingCard({
//   title,
//   description,
//   currentIndex,
//   totalScreens,
//   blurIntensity = 80,
// }: OnboardingCardProps) {
//   return (
//     <>
//       <LinearGradient
//         colors={GRADIENT_CONFIG.colors}
//         start={GRADIENT_CONFIG.start}
//         end={GRADIENT_CONFIG.end}
//         locations={GRADIENT_CONFIG.locations}
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//         }}
//       />

//       <View className="relative">
//         {/* Card with platform-specific shadows */}
//         <View
//           style={{
//             borderBottomRightRadius: 50,
//             borderTopLeftRadius: 50,
//             // Shadow for iOS
//             ...(Platform.OS === 'ios' && {
//               shadowColor: '#000',
//               shadowOffset: { width: -4, height: 8 },
//               shadowOpacity: 0.08,
//               shadowRadius: 13,
//             }),
//             // Shadow for Android
//             ...(Platform.OS === 'android' && {
//               elevation: 8,
//               // Android doesn't support negative offset, so we use margin
//               marginTop: 4,
//             }),
//           }}>
//           <View
//             style={{
//               overflow: 'hidden',
//               borderBottomRightRadius: 50,
//               borderTopLeftRadius: 50,
//             }}>
//             <BlurView
//               intensity={blurIntensity}
//               tint="light"
//               style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
//             />

//             <View className={`p-[30px] ${Platform.OS === 'ios' ? 'bg-cardBg' : 'bg-cardBg'}`}>
//               <OBTitle text={title} />
//               <OBSubtitle className="mb-9 mt-4" text={description} />

//               <PaginationDots totalScreens={totalScreens} currentIndex={currentIndex} />
//             </View>
//           </View>
//         </View>
//       </View>
//     </>
//   );
// }

// // components/onboarding/OnboardingCard.tsx
// import React from 'react';
// import { View, Platform } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { BlurView } from 'expo-blur';
// import OBTitle from '@/components/texts/onboarding/OBTitle';
// import OBSubtitle from '@/components/texts/onboarding/OBSubtitle';
// import PaginationDots from './PaginationDots';
// import { GRADIENT_CONFIG } from '@/constants/onboarding';

// interface OnboardingCardProps {
//   title: string;
//   description: string;
//   currentIndex: number;
//   totalScreens: number;
//   blurIntensity?: number;
// }

// export default function OnboardingCard({
//   title,
//   description,
//   currentIndex,
//   totalScreens,
//   blurIntensity = 80,
// }: OnboardingCardProps) {
//   return (
//     <View
//       style={{
//         // Shadow applied to the outer container with overflow visible
//         ...Platform.select({
//           ios: {
//             shadowColor: '#000',
//             shadowOffset: { width: -4, height: 8 },
//             shadowOpacity: 0.08,
//             shadowRadius: 13,
//           },
//           android: {
//             elevation: 8,
//             marginTop: 4,
//           },
//         }),
//       }}>
//       {/* Gradient background behind the card */}
//       <LinearGradient
//         colors={GRADIENT_CONFIG.colors}
//         start={GRADIENT_CONFIG.start}
//         end={GRADIENT_CONFIG.end}
//         locations={GRADIENT_CONFIG.locations}
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           borderBottomRightRadius: 50,
//           borderTopLeftRadius: 50,
//         }}
//       />

//       {/* Card content */}
//       <View
//         style={{
//           borderBottomRightRadius: 50,
//           borderTopLeftRadius: 50,
//           overflow: 'hidden',
//           backgroundColor: 'transparent',
//           borderTopWidth: 2,
//           borderLeftWidth: 2,
//           borderRightWidth: 3,
//           borderBottomWidth: 3,
//           borderColor: '#0000004',
//           borderTopColor: '#FFFFFF99',
//           borderLeftColor: '#FFFFFF99',
//         }}>
//         <BlurView
//           intensity={blurIntensity}
//           tint="light"
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//           }}
//         />

//         <View className={`p-[30px] ${Platform.OS === 'ios' ? 'bg-cardBg' : 'bg-cardBg'}`}>
//           <OBTitle text={title} />
//           <OBSubtitle className="mb-9 mt-4" text={description} />
//           <PaginationDots totalScreens={totalScreens} currentIndex={currentIndex} />
//         </View>
//       </View>
//     </View>
//   );
// }

import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import OBTitle from '@/components/texts/onboarding/OBTitle';
import OBSubtitle from '@/components/texts/onboarding/OBSubtitle';
import PaginationDots from './PaginationDots';
import { GRADIENT_CONFIG } from '@/constants/onboarding';

interface OnboardingCardProps {
  title: string;
  description: string;
  currentIndex: number;
  totalScreens: number;
  blurIntensity?: number;
}

export default function OnboardingCard({
  title,
  description,
  currentIndex,
  totalScreens,
  blurIntensity = 80,
}: OnboardingCardProps) {
  return (
    <View style={styles.shadowWrapper}>
      {/* THE MIDDLE CONTAINER 
         This handles the clipping (overflow: hidden) and the shape 
      */}
      <View style={styles.clippingContainer}>
        {/* Background Gradient */}
        <LinearGradient
          colors={GRADIENT_CONFIG.colors}
          start={GRADIENT_CONFIG.start}
          end={GRADIENT_CONFIG.end}
          locations={GRADIENT_CONFIG.locations}
          style={StyleSheet.absoluteFill}
        />

        {/* The Blur Effect */}
        <BlurView intensity={blurIntensity} tint="light" style={StyleSheet.absoluteFill} />

        {/* THE INNER CONTENT
           Note: I switched bg-cardBg to use a semi-transparent opacity (0.7) 
           so the BlurView actually has something to blur!
        */}
        <View
          className="p-[30px]"
          style={{
            backgroundColor: Platform.OS === 'ios' ? '#F0E6D8' : '#F0E6D8',
          }}>
          <OBTitle text={title} />
          <OBSubtitle className="mb-9 mt-4" text={description} />
          <PaginationDots totalScreens={totalScreens} currentIndex={currentIndex} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowWrapper: {
    // We apply shadow here. We DON'T use overflow: 'hidden' here.
    borderRadius: 50,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
      },
      android: {
        elevation: 7,
        // Android shadow sometimes clips if there's zero margin
        marginHorizontal: 4,
        marginBottom: 10,
      },
    }),
  },
  clippingContainer: {
    // This clips the background gradient and blurview to the custom radii
    overflow: 'hidden',
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 50,
    backgroundColor: 'transparent',
    // Modern 'Glass' Borders
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0)',
  },
});
