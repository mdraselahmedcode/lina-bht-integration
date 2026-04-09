// // hooks/useNavigationLogic.ts
// import { useEffect } from 'react';
// import { useRouter, useSegments } from 'expo-router';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// interface NavigationLogicProps {
//   isAppReady: boolean;
//   hasSeenOnboarding: boolean | null;
//   isAuthenticated: boolean;
// }

// export const useNavigationLogic = ({
//   isAppReady,
//   hasSeenOnboarding,
//   isAuthenticated,
// }: NavigationLogicProps) => {
//   const segments = useSegments();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isAppReady) return;

//     const inOnboardingGroup = segments[0] === '(onboarding)';
//     const inAuthGroup = segments[0] === '(auth)';
//     const inQuestionnaireGroup = segments[0] === '(questionnaire)';
//     const inMainGroup = segments[0] === '(main)';
//     const inFlowGroup = segments[0] === '(flow)';

//     const inFaceScanGroup = segments[1] === 'face-scan';
//     const inHairScanGroup = segments[1] === 'hair-scan';
//     const inProductScanGroup = segments[1] === 'product-scan';

//     // Allow navigation in all scan groups
//     if (inFaceScanGroup || inHairScanGroup || inProductScanGroup) {
//       return;
//     }

//     // Allow navigation in flow group (camera, loading screens)
//     if (inFlowGroup) {
//       return;
//     }

//     // Allow navigation in questionnaire group
//     if (inQuestionnaireGroup) {
//       return;
//     }

//     // Check for force onboarding flag (set by DevMenu)
//     const checkForceOnboarding = async () => {
//       const forceOnboarding = await AsyncStorage.getItem('forceOnboarding');
//       if (forceOnboarding === 'true') {
//         if (!inOnboardingGroup) {
//           // Clear the force flag
//           await AsyncStorage.removeItem('forceOnboarding');
//           router.replace('/(onboarding)');
//         }
//         return true;
//       }
//       return false;
//     };

//     // Execute force onboarding check synchronously to avoid race conditions
//     checkForceOnboarding().then((isForced) => {
//       if (isForced) return;

//       // Navigation rules for main app flow
//       if (!hasSeenOnboarding && !inOnboardingGroup) {
//         router.replace('/(onboarding)');
//       } else if (hasSeenOnboarding && !isAuthenticated && !inAuthGroup) {
//         router.replace('/(auth)/login');
//       } else if (hasSeenOnboarding && isAuthenticated && !inMainGroup) {
//         router.replace('/(main)');
//       } else if (hasSeenOnboarding && isAuthenticated && inAuthGroup) {
//         router.replace('/(main)');
//       } else if (hasSeenOnboarding && !isAuthenticated && inMainGroup) {
//         router.replace('/(auth)/login');
//       }
//     });
//   }, [isAppReady, hasSeenOnboarding, isAuthenticated, segments, router]);
// };

import { useEffect, useRef } from 'react';
import { useRouter, useSegments } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NavigationLogicProps {
  isAppReady: boolean;
  hasSeenOnboarding: boolean | null;
  isAuthenticated: boolean;
}

export const useNavigationLogic = ({
  isAppReady,
  hasSeenOnboarding,
  isAuthenticated,
}: NavigationLogicProps) => {
  const segments = useSegments();
  const router = useRouter();
  const isNavigating = useRef(false);
  const lastRoute = useRef<string>('');

  useEffect(() => {
    if (!isAppReady) return;

    // Prevent multiple navigation attempts
    if (isNavigating.current) return;

    const currentRoute = segments.join('/');

    // Prevent re-navigation to same route
    if (lastRoute.current === currentRoute) return;

    const inOnboardingGroup = segments[0] === '(onboarding)';
    const inAuthGroup = segments[0] === '(auth)';
    const inQuestionnaireGroup = segments[0] === '(questionnaire)';
    const inMainGroup = segments[0] === '(main)';
    const inFlowGroup = segments[0] === '(flow)';

    // Check if user has completed questionnaire
    const checkQuestionnaireStatus = async () => {
      const hasCompletedQuestionnaire = await AsyncStorage.getItem('hasCompletedQuestionnaire');
      return hasCompletedQuestionnaire === 'true';
    };

    const determineNavigation = async () => {
      isNavigating.current = true;

      try {
        // Priority 1: Allow all camera/scan flows - highest priority
        if (inFlowGroup) {
          isNavigating.current = false;
          lastRoute.current = currentRoute;
          return;
        }

        // Priority 2: Allow questionnaire flow
        if (inQuestionnaireGroup) {
          isNavigating.current = false;
          lastRoute.current = currentRoute;
          return;
        }

        // Priority 3: Check for force onboarding (dev mode)
        const forceOnboarding = await AsyncStorage.getItem('forceOnboarding');
        if (forceOnboarding === 'true') {
          if (!inOnboardingGroup) {
            await AsyncStorage.removeItem('forceOnboarding');
            router.replace('/(onboarding)');
          }
          isNavigating.current = false;
          return;
        }

        // Priority 4: Main navigation rules
        if (!hasSeenOnboarding && !inOnboardingGroup) {
          router.replace('/(onboarding)');
        } else if (hasSeenOnboarding && !isAuthenticated && !inAuthGroup) {
          router.replace('/(auth)/login');
        } else if (hasSeenOnboarding && isAuthenticated && !inMainGroup) {
          // Check if user needs to complete questionnaire
          const hasCompletedQuestionnaire = await checkQuestionnaireStatus();

          if (!hasCompletedQuestionnaire && !inQuestionnaireGroup) {
            router.replace('/(questionnaire)/life-phase');
          } else if (hasCompletedQuestionnaire && !inMainGroup) {
            router.replace('/(main)');
          }
        }
      } catch (error) {
        console.error('Navigation error:', error);
      } finally {
        setTimeout(() => {
          isNavigating.current = false;
        }, 500);
      }
    };

    determineNavigation();
  }, [isAppReady, hasSeenOnboarding, isAuthenticated, segments]);
};
