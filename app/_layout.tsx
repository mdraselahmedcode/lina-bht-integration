// app/_layout.tsx
import '../global.css';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import LoadingScreen from '@/components/loading/LoadingScreen';
import { useFontLoading } from '@/hooks/useFontLoading';
import { useAuthState } from '@/hooks/useAuthState';
import { useNavigationLogic } from '@/hooks/useNavigationLogic';
import { toastConfig } from '@/config/toastConfig';
import { DevMenu } from '@/components/dev/DevMenu';
import { FloatingDevButton } from '@/components/dev/FloatingDevButton';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [devMenuVisible, setDevMenuVisible] = useState(false);
  const fontsLoaded = useFontLoading();
  const { hasSeenOnboarding, isAuthenticated, isLoading: isAuthLoading } = useAuthState();

  useEffect(() => {
    if (fontsLoaded && !isAuthLoading) {
      setIsAppReady(true);
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isAuthLoading]);

  useNavigationLogic({
    isAppReady,
    hasSeenOnboarding,
    isAuthenticated,
  });

  if (!fontsLoaded || !isAppReady) {
    return <LoadingScreen />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" backgroundColor="#E8DDD0" translucent={false} />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#E8DDD0' } }}>
          <Stack.Screen
            name="(onboarding)"
            options={{ animation: 'fade', contentStyle: { backgroundColor: '#E8DDD0' } }}
          />
          <Stack.Screen
            name="(auth)"
            options={{ animation: 'fade', contentStyle: { backgroundColor: '#E8DDD0' } }}
          />
          <Stack.Screen
            name="(questionnaire)"
            options={{
              animation: 'slide_from_right',
              contentStyle: { backgroundColor: '#E8DDD0' },
            }}
          />
          <Stack.Screen
            name="(main)"
            options={{ animation: 'fade', contentStyle: { backgroundColor: '#E8DDD0' } }}
          />
          <Stack.Screen
            name="(flow)"
            options={{
              animation: 'slide_from_right',
              contentStyle: { backgroundColor: '#E8DDD0' },
            }}
          />
        </Stack>
        <Toast config={toastConfig} />

        {/* Dev Menu Trigger - Only in development mode */}
        {__DEV__ && (
          <>
            <FloatingDevButton onPress={() => setDevMenuVisible(true)} />
            <DevMenu visible={devMenuVisible} onClose={() => setDevMenuVisible(false)} />
          </>
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

// // app/_layout.tsx
// import '../global.css';
// import { useEffect, useState } from 'react';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { Stack, useRouter, useSegments } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { StatusBar } from 'expo-status-bar';
// import Toast from 'react-native-toast-message';
// import LoadingScreen from '@/components/loading/LoadingScreen';
// import { useFontLoading } from '@/hooks/useFontLoading';
// import { useAuth } from '@/hooks/useAuth'; // Import the consolidated hook
// import { toastConfig } from '@/config/toastConfig';
// import { FloatingDevButton } from '@/components/dev/FloatingDevButton';
// import { DevMenu } from '@/components/dev/DevMenu';

// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const [isAppReady, setIsAppReady] = useState(false);
//   const [devMenuVisible, setDevMenuVisible] = useState(false);
//   const fontsLoaded = useFontLoading();
//   const { hasSeenOnboarding, isAuthenticated, isLoading: isAuthLoading } = useAuth();
//   const segments = useSegments();
//   const router = useRouter();

//   // Simple initial navigation - runs once when app is ready
//   useEffect(() => {
//     if (!isAppReady) return;

//     const inOnboardingGroup = segments[0] === '(onboarding)';
//     const inAuthGroup = segments[0] === '(auth)';
//     const inMainGroup = segments[0] === '(main)';
//     const inFlowGroup = segments[0] === '(flow)';
//     const inQuestionnaireGroup = segments[0] === '(questionnaire)';

//     // Allow flow and questionnaire screens without redirect
//     if (inFlowGroup || inQuestionnaireGroup) {
//       return;
//     }

//     // Only redirect if we're in the wrong place
//     if (hasSeenOnboarding === false && !inOnboardingGroup) {
//       router.replace('/(onboarding)');
//     } else if (
//       hasSeenOnboarding === true &&
//       !isAuthenticated &&
//       !inAuthGroup &&
//       !inOnboardingGroup
//     ) {
//       router.replace('/(auth)/login');
//     } else if (hasSeenOnboarding === true && isAuthenticated && !inMainGroup && !inAuthGroup) {
//       router.replace('/(main)');
//     }
//   }, [isAppReady, hasSeenOnboarding, isAuthenticated, segments]);

//   useEffect(() => {
//     if (fontsLoaded && !isAuthLoading) {
//       setIsAppReady(true);
//       SplashScreen.hideAsync();
//     }
//   }, [fontsLoaded, isAuthLoading]);

//   if (!fontsLoaded || !isAppReady || hasSeenOnboarding === null) {
//     return <LoadingScreen />;
//   }

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <SafeAreaProvider>
//         <StatusBar style="dark" backgroundColor="#E8DDD0" translucent={false} />
//         <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#E8DDD0' } }}>
//           <Stack.Screen name="(onboarding)" options={{ animation: 'fade' }} />
//           <Stack.Screen name="(auth)" options={{ animation: 'fade' }} />
//           <Stack.Screen name="(questionnaire)" options={{ animation: 'slide_from_right' }} />
//           <Stack.Screen name="(main)" options={{ animation: 'fade' }} />
//           <Stack.Screen name="(flow)" options={{ animation: 'slide_from_right' }} />
//         </Stack>
//         <Toast config={toastConfig} />
//         {__DEV__ && (
//           <>
//             <FloatingDevButton onPress={() => setDevMenuVisible(true)} />
//             <DevMenu visible={devMenuVisible} onClose={() => setDevMenuVisible(false)} />
//           </>
//         )}
//       </SafeAreaProvider>
//     </GestureHandlerRootView>
//   );
// }
