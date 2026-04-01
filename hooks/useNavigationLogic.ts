// // hooks/useNavigationLogic.ts
// import { useEffect } from 'react';
// import { useRouter, useSegments } from 'expo-router';

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
//     const inQuestionnaireGroup = segments[0] === '(questionnaire)'; // ✅ Add questionnaire check
//     const inMainGroup = segments[0] === '(main)';

//     const FORCE_ONBOARDING = false;

//     if (FORCE_ONBOARDING) {
//       if (!inOnboardingGroup) {
//         router.replace('/(onboarding)');
//       }
//       return;
//     }

//     // ✅ If user is in questionnaire, let them complete it
//     if (inQuestionnaireGroup) {
//       return;
//     }

//     // Navigation rules
//     if (!hasSeenOnboarding && !inOnboardingGroup) {
//       router.replace('/(onboarding)');
//     } else if (hasSeenOnboarding && !isAuthenticated && !inAuthGroup) {
//       router.replace('/(auth)/login');
//     } else if (hasSeenOnboarding && isAuthenticated && !inMainGroup) {
//       router.replace('/(main)');
//     } else if (hasSeenOnboarding && isAuthenticated && inAuthGroup) {
//       router.replace('/(main)');
//     } else if (hasSeenOnboarding && !isAuthenticated && inMainGroup) {
//       router.replace('/(auth)/login');
//     }
//   }, [isAppReady, hasSeenOnboarding, isAuthenticated, segments, router]);
// };


// hooks/useNavigationLogic.ts
import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';

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

  useEffect(() => {
    if (!isAppReady) return;

    const inOnboardingGroup = segments[0] === '(onboarding)';
    const inAuthGroup = segments[0] === '(auth)';
    const inQuestionnaireGroup = segments[0] === '(questionnaire)';
    const inMainGroup = segments[0] === '(main)';
    const inFlowGroup = segments[0] === '(flow)'; // ✅ Add flow group check

    // hooks/useNavigationLogic.ts
    // Add these to your flow groups
    const inFaceScanGroup = segments[0] === 'face-scan';
    const inHairScanGroup = segments[0] === 'hair-scan';
    const inProductScanGroup = segments[0] === 'product-scan';

    // Allow navigation in all scan groups
    if (inFaceScanGroup || inHairScanGroup || inProductScanGroup) {
      return;
    }


    const FORCE_ONBOARDING = false;

    if (FORCE_ONBOARDING) {
      if (!inOnboardingGroup) {
        router.replace('/(onboarding)');
      }
      return;
    }

    // ✅ Allow navigation in flow group (camera, loading screens)
    if (inFlowGroup) {
      return;
    }

    // ✅ Allow navigation in questionnaire group
    if (inQuestionnaireGroup) {
      return;
    }

    // Navigation rules for main app flow
    if (!hasSeenOnboarding && !inOnboardingGroup) {
      router.replace('/(onboarding)');
    } else if (hasSeenOnboarding && !isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (hasSeenOnboarding && isAuthenticated && !inMainGroup) {
      router.replace('/(main)');
    } else if (hasSeenOnboarding && isAuthenticated && inAuthGroup) {
      router.replace('/(main)');
    } else if (hasSeenOnboarding && !isAuthenticated && inMainGroup) {
      router.replace('/(auth)/login');
    }
  }, [isAppReady, hasSeenOnboarding, isAuthenticated, segments, router]);
};
