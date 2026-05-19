// app/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootIndex() {
  const router = useRouter();

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const [[, accessToken], [, userRaw], [, hasCompletedQuestionnaire]] =
          await AsyncStorage.multiGet(['access_token', 'user', 'hasCompletedQuestionnaire']);

        if (accessToken && userRaw) {
          const user = JSON.parse(userRaw);

          // ✅ Check both the user object AND the questionnaire flag
          const onboardingDone =
            user.onboarding_completed === true || hasCompletedQuestionnaire === 'true';

          if (onboardingDone) {
            router.replace('/(main)');
          } else {
            router.replace('/(questionnaire)/life-phase');
          }
        } else {
          router.replace('/(onboarding)');
        }
      } catch {
        router.replace('/(onboarding)');
      }
    };

    bootstrap();
  }, []);

  return null;
}
