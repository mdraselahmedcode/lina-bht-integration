// app/(main)/scan/loading-screen.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing, Dimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraIcon } from '@/components/icons';

const { width, height } = Dimensions.get('window');

export default function LoadingScreen() {
    const { imageUri, scanType } = useLocalSearchParams();

    // Animation values
    const outerRingAnim = useRef(new Animated.Value(0)).current;
    const middleRingAnim = useRef(new Animated.Value(0)).current;
    const innerRingAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Start loading animation
        startLoadingAnimation();

        // Simulate AI analysis (3 seconds)
        const timer = setTimeout(() => {
            // Navigate to results screen after analysis
            //   router.replace({
            //     pathname: '/scan/results',
            //     params: { 
            //       imageUri: imageUri,
            //       scanType: scanType 
            //     }
            //   });
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const startLoadingAnimation = () => {
        // Fade in content
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();

        // Rotate outer ring
        Animated.loop(
            Animated.timing(outerRingAnim, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();

        // Rotate middle ring (opposite direction)
        Animated.loop(
            Animated.timing(middleRingAnim, {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();

        // Rotate inner ring
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
        <SafeAreaView edges={[]} className="flex-1 bg-white">
            <Animated.View
                className="flex-1 items-center justify-center"
                style={{ opacity: fadeAnim }}>

                {/* Loading Circle with 3 borders */}
                <View className="relative items-center justify-center" style={{ width: 95, height: 95 }}>
                    {/* Outer Ring */}
                    <Animated.View
                        style={{
                            position: 'absolute',
                            width: 95,
                            height: 95,
                            borderRadius: 47.5,
                            borderWidth: 2,
                            borderColor: '#E5E7EB',
                            borderTopColor: '#3B82F6',
                            transform: [{ rotate: outerRotate }],
                        }}
                    />

                    {/* Middle Ring */}
                    <Animated.View
                        style={{
                            position: 'absolute',
                            width: 75,
                            height: 75,
                            borderRadius: 37.5,
                            borderWidth: 2,
                            borderColor: '#E5E7EB',
                            borderTopColor: '#8B5CF6',
                            transform: [{ rotate: middleRotate }],
                        }}
                    />

                    {/* Inner Ring */}
                    <Animated.View
                        style={{
                            position: 'absolute',
                            width: 55,
                            height: 55,
                            borderRadius: 27.5,
                            borderWidth: 2,
                            borderColor: '#E5E7EB',
                            borderTopColor: '#EC489A',
                            transform: [{ rotate: innerRotate }],
                        }}
                    />

                    {/* Center Camera Icon */}
                    <View className="items-center justify-center">
                        <CameraIcon size={30} color="#3B82F6" />
                    </View>
                </View>

                {/* Loading Text */}
                <View className="mt-8 items-center">
                    <Text className="text-2xl font-semibold text-gray-900 mb-3">
                        AI Analyzing
                    </Text>
                    <Text className="text-base text-gray-600 text-center px-8">
                        Detecting hydration levels, pores, and redness...
                    </Text>
                </View>
            </Animated.View>
        </SafeAreaView>
    );
}