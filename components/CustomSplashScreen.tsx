// components/CustomSplashScreen.tsx
import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, Easing, Dimensions } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import VectorBg from '@/components/VectorBg';

const { width, height } = Dimensions.get('window');

interface CustomSplashScreenProps {
  onAnimationComplete: () => void;
  minimumDisplayTime?: number;
}

export default function CustomSplashScreen({
  onAnimationComplete,
  minimumDisplayTime = 2500,
}: CustomSplashScreenProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const startTime = useRef(Date.now());

  // Responsive sizing based on screen width - MEDIUM VERSION
  const getLogoSize = () => {
    // Medium base sizes (between original and large)
    const baseWidth = 140; // Was 180, now 140
    const baseHeight = 200; // Was 260, now 200
    const screenWidth = width;

    // For smaller screens (under 380px), use 85% of base size
    if (screenWidth < 380) {
      return { width: baseWidth * 0.85, height: baseHeight * 0.85 };
    }
    // For medium screens (380-600px), use 90% of base size
    if (screenWidth < 600) {
      return { width: baseWidth * 0.9, height: baseHeight * 0.9 };
    }
    // For larger screens, use full base size
    return { width: baseWidth, height: baseHeight };
  };

  const logoSize = getLogoSize();

  // Animation scales (adjusted for medium logo)
  const maxScale = 1.05; // Very subtle breathing
  const exitScale = 1.1; // Slight zoom out on exit

  useEffect(() => {
    // Hide the native splash screen immediately
    SplashScreen.hideAsync();

    // Subtle breathing animation
    const breathingAnimation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: maxScale,
            duration: 1500,
            easing: Easing.inOut(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.95,
            duration: 1500,
            easing: Easing.inOut(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.inOut(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.inOut(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    breathingAnimation.start();

    const timer = setTimeout(() => {
      breathingAnimation.stop();
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: exitScale,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start(() => {
        onAnimationComplete();
      });
    }, minimumDisplayTime);

    return () => {
      breathingAnimation.stop();
      clearTimeout(timer);
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#E8DDD0' }}>
      <VectorBg />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Animated.Image
          source={require('@/assets/images/splash_screen_logo.png')}
          style={{
            width: logoSize.width,
            height: logoSize.height,
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
