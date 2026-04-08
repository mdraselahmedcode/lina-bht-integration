import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Text,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CameraCaptureIcon } from '@/components/icons/CameraCaptureIcon';

const { width, height } = Dimensions.get('window');

export interface AngleCapture {
  angle: 'front' | 'left' | 'right' | 'up' | 'down';
  uri: string;
  base64?: string;
  timestamp: number;
}

interface MultiAngleCameraScanProps {
  scanType: string;
  onComplete?: (captures: AngleCapture[]) => void;
  onAngleCaptured?: (angle: string, index: number, total: number) => void;
  requiredAngles?: Array<'front' | 'left' | 'right' | 'up' | 'down'>;
  autoCapture?: boolean;
}

const ANGLE_CONFIG = {
  front: { label: 'Front', instruction: 'Look straight ahead' },
  left: { label: 'Left', instruction: 'Turn your head to the left' },
  right: { label: 'Right', instruction: 'Turn your head to the right' },
  up: { label: 'Up', instruction: 'Tilt your head up' },
  down: { label: 'Down', instruction: 'Tilt your head down' },
};

export const MultiAngleCameraScan: React.FC<MultiAngleCameraScanProps> = ({
  scanType,
  onComplete,
  onAngleCaptured,
  requiredAngles = ['front', 'left', 'right', 'up', 'down'],
  autoCapture = true,
}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isTakingPicture, setIsTakingPicture] = useState(false);
  const [currentAngleIndex, setCurrentAngleIndex] = useState(0);
  const [capturedAngles, setCapturedAngles] = useState<AngleCapture[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [hasNavigated, setHasNavigated] = useState(false);

  const cameraRef = useRef<any>(null);
  const insets = useSafeAreaInsets();
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Animation values
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const checkmarkAnim = useRef(new Animated.Value(0)).current;

  const currentAngle = requiredAngles[currentAngleIndex];
  const currentConfig = ANGLE_CONFIG[currentAngle];
  const progress = (capturedAngles.length / requiredAngles.length) * 100;
  const isComplete = capturedAngles.length === requiredAngles.length;

  // Debug logging
  useEffect(() => {
    console.log('📊 State Update:', {
      captured: capturedAngles.length,
      total: requiredAngles.length,
      isComplete: isComplete,
      hasNavigated: hasNavigated,
      currentAngle: currentAngle,
    });
  }, [capturedAngles, isComplete, hasNavigated, currentAngle]);

  // Handle navigation when complete
  useEffect(() => {
    if (isComplete && capturedAngles.length > 0 && !hasNavigated) {
      console.log('🎉 ALL ANGLES CAPTURED! Navigating now...');
      setHasNavigated(true);

      // Store captures in params
      const capturesJson = JSON.stringify(capturedAngles);
      console.log('Captures JSON length:', capturesJson.length);

      // Navigate to loading screen
      router.replace({
        pathname: '/(flow)/face-scan/loading-screen',
        params: {
          captures: capturesJson,
          scanType: scanType,
        },
      });
    }
  }, [isComplete, capturedAngles, hasNavigated, scanType]);

  useEffect(() => {
    startScanAnimation();
    startPulseAnimation();

    return () => {
      scanLineAnim.stopAnimation();
      pulseAnim.stopAnimation();
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
    };
  }, []);

  // Start countdown when angle changes
  useEffect(() => {
    if (
      autoCapture &&
      currentAngle &&
      !isTakingPicture &&
      !isComplete &&
      capturedAngles.length === currentAngleIndex
    ) {
      startCountdown();
    }

    return () => {
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
    };
  }, [
    currentAngleIndex,
    currentAngle,
    isComplete,
    isTakingPicture,
    capturedAngles.length,
    autoCapture,
  ]);

  const startCountdown = () => {
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
    }

    let count = 3;
    setCountdown(count);

    countdownTimerRef.current = setInterval(() => {
      count--;
      setCountdown(count);
      if (count < 0) {
        if (countdownTimerRef.current) {
          clearInterval(countdownTimerRef.current);
          countdownTimerRef.current = null;
        }
        if (!isTakingPicture && !isComplete) {
          takePicture();
        }
      }
    }, 1000);
  };

  const startScanAnimation = () => {
    Animated.loop(
      Animated.timing(scanLineAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.02,
          duration: 1500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const animateCheckmark = () => {
    checkmarkAnim.setValue(0);
    Animated.spring(checkmarkAnim, { toValue: 1, friction: 3, useNativeDriver: true }).start();
    setTimeout(() => checkmarkAnim.setValue(0), 800);
  };

  const takePicture = async () => {
    console.log('📸 Taking picture for:', currentAngle);

    if (!cameraRef.current || isTakingPicture || !currentAngle || isComplete) {
      console.log('❌ Cannot take picture');
      return;
    }

    setIsTakingPicture(true);
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.9,
        base64: true,
      });

      console.log('✅ Picture taken for:', currentAngle);

      const newCapture: AngleCapture = {
        angle: currentAngle,
        uri: photo.uri,
        base64: photo.base64,
        timestamp: Date.now(),
      };

      const updatedCaptures = [...capturedAngles, newCapture];
      setCapturedAngles(updatedCaptures);

      animateCheckmark();
      onAngleCaptured?.(currentAngle, currentAngleIndex + 1, requiredAngles.length);

      // Move to next angle if not complete
      if (currentAngleIndex + 1 < requiredAngles.length) {
        console.log('➡️ Moving to next angle:', requiredAngles[currentAngleIndex + 1]);
        setCurrentAngleIndex(currentAngleIndex + 1);
        setIsTakingPicture(false);
        setCountdown(null);
      } else {
        console.log('🏁 Last angle captured! Waiting for navigation...');
        setIsTakingPicture(false);
        setCountdown(null);
        // The useEffect will handle navigation
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('Error', 'Failed to capture image. Please try again.');
      setIsTakingPicture(false);
    }
  };

  const retakeLastAngle = () => {
    if (capturedAngles.length > 0 && !isComplete) {
      console.log('🔄 Retaking last angle...');
      const newCaptures = capturedAngles.slice(0, -1);
      setCapturedAngles(newCaptures);
      setCurrentAngleIndex(newCaptures.length);
      setCountdown(null);
      setHasNavigated(false);

      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
        countdownTimerRef.current = null;
      }
    }
  };

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="mb-4 text-white">We need camera permission to scan</Text>
        <TouchableOpacity onPress={requestPermission} className="rounded-lg bg-blue-500 px-6 py-3">
          <Text className="font-semibold text-white">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const guideWidth = width * 0.75;
  const guideHeight = height * 0.45;
  const cornerSize = 40;
  const lineWidth = 4;
  const translateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, guideHeight - lineWidth],
  });

  return (
    <View className="flex-1 bg-black">
      <CameraView ref={cameraRef} style={StyleSheet.absoluteFillObject} facing="front" />

      <View className="absolute inset-0">
        <View className="absolute inset-0 bg-black/50" />

        {/* Back button */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            position: 'absolute',
            top: Math.max(insets.top, 16),
            left: Math.max(insets.left, 16),
            width: 44,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: 22,
            zIndex: 10,
          }}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>

        {/* Progress indicator */}
        <View
          style={{
            position: 'absolute',
            top: Math.max(insets.top, 16),
            right: Math.max(insets.right, 16),
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: 20,
            paddingHorizontal: 12,
            paddingVertical: 6,
            zIndex: 10,
          }}>
          <Text className="font-outfit text-white">
            {capturedAngles.length}/{requiredAngles.length}
          </Text>
        </View>

        {/* Progress bar */}
        <View
          style={{
            position: 'absolute',
            top: Math.max(insets.top + 50, 66),
            left: 20,
            right: 20,
            height: 4,
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderRadius: 2,
            zIndex: 10,
          }}>
          <View
            style={{
              width: `${progress}%`,
              height: 4,
              backgroundColor: '#00E676',
              borderRadius: 2,
            }}
          />
        </View>

        {/* Angle indicator dots */}
        <View
          style={{
            position: 'absolute',
            top: Math.max(insets.top + 70, 86),
            left: 0,
            right: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 8,
            zIndex: 10,
          }}>
          {requiredAngles.map((angle, idx) => (
            <View
              key={angle}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: idx < capturedAngles.length ? '#00E676' : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </View>

        <View className="flex-1 items-center justify-center">
          <Animated.View
            style={{
              width: guideWidth,
              height: guideHeight,
              position: 'relative',
              transform: [{ scale: pulseAnim }],
            }}>
            {/* Corner Brackets */}
            <View
              style={{
                position: 'absolute',
                top: -2,
                left: -2,
                width: cornerSize,
                height: cornerSize,
              }}>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: cornerSize,
                  height: lineWidth,
                  backgroundColor: '#E8DDD0',
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: lineWidth,
                  height: cornerSize,
                  backgroundColor: '#E8DDD0',
                }}
              />
            </View>
            <View
              style={{
                position: 'absolute',
                top: -2,
                right: -2,
                width: cornerSize,
                height: cornerSize,
              }}>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: cornerSize,
                  height: lineWidth,
                  backgroundColor: '#E8DDD0',
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: lineWidth,
                  height: cornerSize,
                  backgroundColor: '#E8DDD0',
                }}
              />
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: -2,
                left: -2,
                width: cornerSize,
                height: cornerSize,
              }}>
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: cornerSize,
                  height: lineWidth,
                  backgroundColor: '#E8DDD0',
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: lineWidth,
                  height: cornerSize,
                  backgroundColor: '#E8DDD0',
                }}
              />
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: -2,
                right: -2,
                width: cornerSize,
                height: cornerSize,
              }}>
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: cornerSize,
                  height: lineWidth,
                  backgroundColor: '#E8DDD0',
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: lineWidth,
                  height: cornerSize,
                  backgroundColor: '#E8DDD0',
                }}
              />
            </View>

            {/* Scanning line */}
            {/* <Animated.View
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: 3,
                backgroundColor: '#E8DDD0',
                shadowColor: '#E8DDD0',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 10,
                elevation: 5,
                zIndex: 20,
                transform: [{ translateY }],
              }}>
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: -10,
                  height: 23,
                  backgroundColor: '#361A0D33',
                }}
              />
            </Animated.View> */}

            {/* Border */}
            {/* <View
              style={{
                position: 'absolute',
                top: -2,
                left: -2,
                right: -2,
                bottom: -2,
                borderWidth: 1,
                borderColor: '#361A0D55',
                zIndex: -2,
                borderRadius: 12,
              }}
            /> */}

            {/* Checkmark overlay when captured */}
            <Animated.View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,230,118,0.8)',
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                opacity: checkmarkAnim,
                transform: [
                  {
                    scale: checkmarkAnim.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] }),
                  },
                ],
              }}>
              <Ionicons name="checkmark-circle" size={60} color="white" />
            </Animated.View>
          </Animated.View>

          {/* Instructions */}
          <View
            style={{
              position: 'absolute',
              bottom: 120 + insets.bottom,
              left: 0,
              right: 0,
              alignItems: 'center',
            }}>
            {!isComplete ? (
              <>
                <Text className="mb-2 text-center font-outfitMedium text-base text-white">
                  {currentConfig?.instruction || 'Position your face'}
                </Text>
                <Text className="text-center font-outfit text-sm text-white/70">
                  {currentConfig?.label || currentAngle} angle - Step {currentAngleIndex + 1} of{' '}
                  {requiredAngles.length}
                </Text>
                {countdown !== null && countdown >= 0 && (
                  <View className="mt-4 h-16 w-16 items-center justify-center rounded-full bg-white/20">
                    <Text className="text-3xl font-bold text-white">{countdown}</Text>
                  </View>
                )}
              </>
            ) : (
              <>
                <Text className="mb-2 text-center font-outfitMedium text-base text-white">
                  ✓ Complete! Processing...
                </Text>
              </>
            )}
          </View>
        </View>

        {/* Action buttons - hide when complete */}
        {!isComplete && (
          <View
            style={{
              position: 'absolute',
              bottom: Math.max(insets.bottom + 20, 30),
              left: 0,
              right: 0,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingHorizontal: 40,
            }}>
            {capturedAngles.length > 0 && (
              <TouchableOpacity onPress={retakeLastAngle} activeOpacity={0.7}>
                <View className="h-14 w-14 items-center justify-center rounded-full bg-white/20">
                  <Ionicons name="refresh" size={28} color="white" />
                </View>
              </TouchableOpacity>
            )}

            {/* <TouchableOpacity onPress={takePicture} activeOpacity={0.7} disabled={isTakingPicture}>
              <CameraCaptureIcon size={80} />
            </TouchableOpacity> */}

            <View style={{ width: 56 }} />
          </View>
        )}
      </View>
    </View>
  );
};
