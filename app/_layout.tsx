// app/_layout.tsx
import '../global.css';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import LoadingScreen from '@/components/loading/LoadingScreen';
import { useFontLoading } from '@/hooks/useFontLoading';
import { toastConfig } from '@/config/toastConfig';
import CustomSplashScreen from '@/components/CustomSplashScreen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const fontsLoaded = useFontLoading();
  const [isReady, setIsReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const prepare = async () => {
      if (fontsLoaded && !showSplash) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, [fontsLoaded, showSplash]);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // Show custom splash screen
  if (showSplash) {
    return <CustomSplashScreen onAnimationComplete={handleSplashComplete} />;
  }

  // Show loading screen while preparing
  if (!fontsLoaded || !isReady) {
    return <LoadingScreen loadingText="The system is getting ready for you" transparent={false} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" backgroundColor="#E8DDD0" translucent={false} />

        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#E8DDD0' },
          }}>
          <Stack.Screen name="(onboarding)" options={{ animation: 'fade' }} />
          <Stack.Screen name="(auth)" options={{ animation: 'fade' }} />
          <Stack.Screen name="(questionnaire)" options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="(main)" options={{ animation: 'fade' }} />
          <Stack.Screen name="(flow)" options={{ animation: 'slide_from_right' }} />
        </Stack>

        <Toast config={toastConfig} />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
