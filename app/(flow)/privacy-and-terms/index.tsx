// /* eslint-disable import/no-unresolved */
// import { ScrollView, StyleSheet, Text, View } from 'react-native';
// import React from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import CustomHeader from '@/components/header/CustomHeader';
// import { LAYOUT } from '@/constants/constants';
// import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
// import { ProtectionIcon } from '@/components/icons';
// import { CircularIconButton } from '@/components/buttons/CircularIconButton';

// interface PrivacySection {
//   id: string;
//   number: string;
//   title: string;
//   description: string;
// }

// const PrivacyAndTermsScreen = () => {
//   // Privacy sections data - can be fetched from admin panel later
//   const privacySections: PrivacySection[] = [
//     {
//       id: '1',
//       number: '1',
//       title: 'Your Facial Scans',
//       description:
//         'All facial scans are processed locally on your device when possible. When sent to our servers for advanced AI analysis, they are encrypted in transit and immediately deleted after the analysis is complete. We do not store your photos unless you explicitly save them to your Progress gallery.',
//     },
//     {
//       id: '2',
//       number: '2',
//       title: 'Health Data',
//       description:
//         'Information regarding your hormone cycle, stress levels, and skin conditions is stored securely and never shared with third-party advertisers. This data is used strictly to personalize your skincare routine and AI recommendations.',
//     },
//     {
//       id: '3',
//       number: '3',
//       title: 'AI Conversations',
//       description:
//         'Conversations with the Waxi AI assistant are anonymized and may be used to improve our diagnostic models. You can opt out of this data sharing in your account settings.',
//     },
//     {
//       id: '4',
//       number: '4',
//       title: 'Subscription Terms',
//       description:
//         'Premium subscriptions are billed automatically according to your selected billing cycle. You can cancel at any time before the next billing period. Refunds are handled according to the App Store or Google Play Store policies.',
//     },
//   ];

//   return (
//     <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
//       <CustomHeader title="Privacy & Terms" height={50} backButton={true} />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{
//           paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
//           paddingTop: 10,
//           flexGrow: 1,
//         }}
//         className="flex-1">
//         <View className="px-container">
//           {/* Single Borderless Shadow Card containing all content */}
//           <BorderlessShadowCard
//             b_tl={24}
//             b_tr={24}
//             b_bl={24}
//             b_br={24}
//             style={{
//               paddingVertical: 20,
//               paddingHorizontal: 24,
//               marginTop: 12,
//             }}>
//             {/* Data Protection Header */}
//             <View className="mb-6 flex-row items-center gap-3">
//               <CircularIconButton size={32} icon={<ProtectionIcon size={20} color="#361A0D" />} />
//               <Text className="font-outfitMedium text-[16px]" style={{ color: '#2A2118' }}>
//                 Data Protection
//               </Text>
//             </View>

//             {/* Privacy Sections with Numbering */}
//             {privacySections.map((section, index) => (
//               <View key={section.id} className={index !== privacySections.length - 1 ? 'mb-6' : ''}>
//                 <View className="flex-row items-start gap-2">
//                   <Text className="font-outfitMedium text-[16px]" style={{ color: '#2A2118' }}>
//                     {section.number}.
//                   </Text>
//                   <Text
//                     className="flex-1 font-outfitMedium text-[16px]"
//                     style={{ color: '#2A2118' }}>
//                     {section.title}
//                   </Text>
//                 </View>
//                 <Text
//                   className="mt-2 font-outfit text-[13px] leading-5"
//                   style={{ color: '#2A2118B2' }}>
//                   {section.description}
//                 </Text>
//                 {index !== privacySections.length - 1 && (
//                   <View className="mt-4 h-[1px] w-full bg-[#2E21171A]" />
//                 )}
//               </View>
//             ))}
//           </BorderlessShadowCard>

//           {/* Last Updated Text */}
//           <Text className="mt-3 text-center font-outfit text-[12px]" style={{ color: '#2E2117B2' }}>
//             Last updated: October 24, 2023
//           </Text>
//           <Text className="text-center font-outfit text-[12px]" style={{ color: '#2E2117B2' }}>
//             For full legal terms, please visit skinsense.com/legal
//           </Text>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default PrivacyAndTermsScreen;

// const styles = StyleSheet.create({});

/* eslint-disable import/no-unresolved */
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/header/CustomHeader';
import { LAYOUT } from '@/constants/constants';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
import { ProtectionIcon } from '@/components/icons';
import { CircularIconButton } from '@/components/buttons/CircularIconButton';
import { useScreenReady } from '@/hooks/useScreenReady';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';

interface PrivacySection {
  id: string;
  number: string;
  title: string;
  description: string;
}

const PrivacyAndTermsScreen = () => {
  const [privacySections, setPrivacySections] = useState<PrivacySection[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Screen ready state for smooth transitions
  const { isRendering, isContentReady, renderError } = useScreenReady({
    dependencies: [privacySections],
    delay: 100,
    initialReady: false,
  });

  // Privacy sections data - can be fetched from admin panel later
  const defaultPrivacySections: PrivacySection[] = [
    {
      id: '1',
      number: '1',
      title: 'Your Facial Scans',
      description:
        'All facial scans are processed locally on your device when possible. When sent to our servers for advanced AI analysis, they are encrypted in transit and immediately deleted after the analysis is complete. We do not store your photos unless you explicitly save them to your Progress gallery.',
    },
    {
      id: '2',
      number: '2',
      title: 'Health Data',
      description:
        'Information regarding your hormone cycle, stress levels, and skin conditions is stored securely and never shared with third-party advertisers. This data is used strictly to personalize your skincare routine and AI recommendations.',
    },
    {
      id: '3',
      number: '3',
      title: 'AI Conversations',
      description:
        'Conversations with the Waxi AI assistant are anonymized and may be used to improve our diagnostic models. You can opt out of this data sharing in your account settings.',
    },
    {
      id: '4',
      number: '4',
      title: 'Subscription Terms',
      description:
        'Premium subscriptions are billed automatically according to your selected billing cycle. You can cancel at any time before the next billing period. Refunds are handled according to the App Store or Google Play Store policies.',
    },
  ];

  useEffect(() => {
    loadPrivacyData();
  }, []);

  const loadPrivacyData = async () => {
    setIsDataLoading(true);
    setError(null);
    try {
      // Simulate API call delay (remove this if data is static)
      await new Promise((resolve) => setTimeout(resolve, 300));
      setPrivacySections(defaultPrivacySections);
    } catch (err) {
      setError('Failed to load privacy data');
      console.error('Error loading privacy data:', err);
    } finally {
      setIsDataLoading(false);
    }
  };

  const handleRetry = () => {
    loadPrivacyData();
  };

  // Show initial render loading (useScreenReady)
  if (isRendering) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <LoadingScreen loadingText="Preparing privacy information..." />
      </SafeAreaView>
    );
  }

  // Show error if rendering failed
  if (renderError) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title="Privacy & Terms" height={50} backButton={true} />
        <ErrorScreen message={renderError} onRetry={handleRetry} />
      </SafeAreaView>
    );
  }

  // Show data loading state
  if (isDataLoading) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <LoadingScreen loadingText="Loading privacy information..." />
      </SafeAreaView>
    );
  }

  // Show error if data loading failed
  if (error) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title="Privacy & Terms" height={50} backButton={true} />
        <ErrorScreen message={error} onRetry={handleRetry} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
      <CustomHeader title="Privacy & Terms" height={50} backButton={true} />

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
          {/* Single Borderless Shadow Card containing all content */}
          <BorderlessShadowCard
            b_tl={24}
            b_tr={24}
            b_bl={24}
            b_br={24}
            style={{
              paddingVertical: 20,
              paddingHorizontal: 24,
              marginTop: 12,
            }}>
            {/* Data Protection Header */}
            <View className="mb-6 flex-row items-center gap-3">
              <CircularIconButton size={32} icon={<ProtectionIcon size={20} color="#361A0D" />} />
              <Text className="font-outfitMedium text-[16px]" style={{ color: '#2A2118' }}>
                Data Protection
              </Text>
            </View>

            {/* Privacy Sections with Numbering */}
            {privacySections.map((section, index) => (
              <View key={section.id} className={index !== privacySections.length - 1 ? 'mb-6' : ''}>
                <View className="flex-row items-start gap-2">
                  <Text className="font-outfitMedium text-[16px]" style={{ color: '#2A2118' }}>
                    {section.number}.
                  </Text>
                  <Text
                    className="flex-1 font-outfitMedium text-[16px]"
                    style={{ color: '#2A2118' }}>
                    {section.title}
                  </Text>
                </View>
                <Text
                  className="mt-2 font-outfit text-[13px] leading-5"
                  style={{ color: '#2A2118B2' }}>
                  {section.description}
                </Text>
                {index !== privacySections.length - 1 && (
                  <View className="mt-4 h-[1px] w-full bg-[#2E21171A]" />
                )}
              </View>
            ))}
          </BorderlessShadowCard>

          {/* Last Updated Text */}
          <Text className="mt-3 text-center font-outfit text-[12px]" style={{ color: '#2E2117B2' }}>
            Last updated: October 24, 2023
          </Text>
          <Text className="text-center font-outfit text-[12px]" style={{ color: '#2E2117B2' }}>
            For full legal terms, please visit skinsense.com/legal
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyAndTermsScreen;

const styles = StyleSheet.create({});
