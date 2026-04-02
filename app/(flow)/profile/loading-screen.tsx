import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing, Image } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PremiumLoadingScreen() {
  const outerRingAnim = useRef(new Animated.Value(0)).current;
  const middleRingAnim = useRef(new Animated.Value(0)).current;
  const innerRingAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startLoadingAnimation();

    const timer = setTimeout(() => {
      router.replace('/(main)/profile');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const startLoadingAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.timing(outerRingAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(middleRingAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(innerRingAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const outerRotate = outerRingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const middleRotate = middleRingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg'],
  });

  const innerRotate = innerRingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView edges={[]} className="flex-1 bg-backgroundColor">
      <Animated.View className="flex-1 items-center justify-center" style={{ opacity: fadeAnim }}>
        <View className="items-center justify-center">
          {/* Rotating Rings */}
          <View className="relative items-center justify-center" style={{ width: 95, height: 95 }}>
            <Animated.View
              style={{
                position: 'absolute',
                width: 95,
                height: 95,
                borderRadius: 47.5,
                borderWidth: 1.5,
                borderColor: '#E5D5C0',
                borderTopColor: '#361A0D',
                transform: [{ rotate: outerRotate }],
              }}
            />
            <Animated.View
              style={{
                position: 'absolute',
                width: 75,
                height: 75,
                borderRadius: 37.5,
                borderWidth: 1.8,
                borderColor: '#D4BDA5',
                borderTopColor: '#5A3A2A',
                transform: [{ rotate: middleRotate }],
              }}
            />
            <Animated.View
              style={{
                position: 'absolute',
                width: 55,
                height: 55,
                borderRadius: 27.5,
                borderWidth: 2,
                borderColor: '#C4B7AA',
                borderTopColor: '#8B5A3C',
                transform: [{ rotate: innerRotate }],
              }}
            />

            {/* Center PNG Image - Centered within the rings */}
            <View className="absolute inset-0 items-center justify-center">
              <Image
                source={require('@/assets/icons/upgradePlanLoadingIcon.png')}
                style={{ width: 32, height: 32 }}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Loading Text */}
          <View className="mt-4 items-center">
            <Text className="font-outfitMedium text-[24px]" style={{ color: '#2E2117' }}>
              Processing Payment
            </Text>
            <Text
              className="mt-2 px-8 text-center font-outfit text-[14px]"
              style={{ color: '#2E2117CC' }}>
              Securely connecting to Stripe...
            </Text>
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}
