// components/wellness/BreathingExercise.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface BreathingExerciseProps {
  onClose: () => void;
}

export const BreathingExercise: React.FC<BreathingExerciseProps> = ({ onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [totalTimeRemaining, setTotalTimeRemaining] = useState(180);
  const [completedCycles, setCompletedCycles] = useState(0);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const intervalRef = useRef<any>(null);
  const totalTimeIntervalRef = useRef<any>(null);
  const currentPhaseRef = useRef<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');

  const SECONDS_PER_CYCLE = 16; // 4 phases × 4 seconds
  const TOTAL_CYCLES = 11; // 180 ÷ 16 = 11.25, so 11 full cycles

  const phases = {
    inhale: {
      duration: 4,
      text: 'Breathe In',
      next: 'hold' as const,
      instruction: 'Slowly breathe in...',
    },
    hold: {
      duration: 4,
      text: 'Hold',
      next: 'exhale' as const,
      instruction: 'Hold your breath...',
    },
    exhale: {
      duration: 4,
      text: 'Breathe Out',
      next: 'pause' as const,
      instruction: 'Slowly breathe out...',
    },
    pause: {
      duration: 4,
      text: 'Pause',
      next: 'inhale' as const,
      instruction: 'Rest...',
    },
  };

  useEffect(() => {
    if (isActive) {
      startBreathing();
      startTotalTimer();
    } else {
      stopAllTimers();
      resetAnimation();
    }
    return () => {
      stopAllTimers();
    };
  }, [isActive]);

  const stopAllTimers = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (totalTimeIntervalRef.current) {
      clearInterval(totalTimeIntervalRef.current);
      totalTimeIntervalRef.current = null;
    }
  };

  const startTotalTimer = () => {
    totalTimeIntervalRef.current = setInterval(() => {
      setTotalTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          stopAllTimers();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startBreathing = () => {
    setPhase('inhale');
    currentPhaseRef.current = 'inhale';
    setTimeLeft(4);
    startPhaseAnimation('inhale');

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          const currentPhase = currentPhaseRef.current;
          const nextPhase = phases[currentPhase].next;
          currentPhaseRef.current = nextPhase;
          setPhase(nextPhase);
          startPhaseAnimation(nextPhase);

          if (nextPhase === 'inhale') {
            setCompletedCycles((prev) => prev + 1);
          }
          return phases[nextPhase].duration;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startPhaseAnimation = (newPhase: string) => {
    if (newPhase === 'inhale') {
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 4000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
      Animated.timing(opacityAnim, {
        toValue: 0.7,
        duration: 4000,
        useNativeDriver: true,
      }).start();
    } else if (newPhase === 'exhale') {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 4000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      }).start();
    }
  };

  const resetAnimation = () => {
    scaleAnim.setValue(1);
    opacityAnim.setValue(1);
    setPhase('inhale');
    currentPhaseRef.current = 'inhale';
    setTimeLeft(4);
    setCompletedCycles(0);
    setTotalTimeRemaining(180);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale':
        return '#10B981';
      case 'hold':
        return '#F59E0B';
      case 'exhale':
        return '#8B5CF6';
      case 'pause':
        return '#6B7280';
      default:
        return '#7A8B6A';
    }
  };

  const getProgressPercentage = () => {
    const elapsed = 180 - totalTimeRemaining;
    return (elapsed / 180) * 100;
  };

  const currentCycleNumber = Math.floor((180 - totalTimeRemaining) / SECONDS_PER_CYCLE) + 1;
  const displayCycleNumber = Math.min(currentCycleNumber, TOTAL_CYCLES);

  // Create array of cycles for better display
  const cycles = Array.from({ length: TOTAL_CYCLES }, (_, i) => i + 1);

  return (
    <View className="flex-1 bg-black/50">
      <View className="flex-1 items-center justify-center px-6">
        <View
          style={{
            backgroundColor: '#F0E6D8',
            borderRadius: 32,
            padding: 20,
            width: '100%',
            alignItems: 'center',
            maxHeight: height * 0.85,
          }}>
          {/* Close Button */}
          <TouchableOpacity
            onPress={onClose}
            style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
            <Ionicons name="close" size={24} color="#361A0D" />
          </TouchableOpacity>

          {/* Timer Display */}
          {isActive && (
            <View className="mb-3 items-center">
              <Text className="font-outfitMedium text-[12px]" style={{ color: '#2E211799' }}>
                Time Remaining
              </Text>
              <Text className="font-outfitBold text-[28px]" style={{ color: '#361A0D' }}>
                {formatTime(totalTimeRemaining)}
              </Text>
            </View>
          )}

          {/* Progress Bar */}
          {isActive && (
            <View className="mb-4 w-full">
              <View
                style={{
                  height: 4,
                  backgroundColor: '#2E21173D',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}>
                <View
                  style={{
                    width: `${getProgressPercentage()}%`,
                    height: '100%',
                    backgroundColor: '#7A8B6A',
                    borderRadius: 2,
                  }}
                />
              </View>
            </View>
          )}

          {/* Title */}
          <Text className="mt-3 font-outfitMedium text-[20px]" style={{ color: '#2E2117' }}>
            {!isActive ? '3-Min Breathing' : phases[phase].text}
          </Text>

          {/* Instruction */}
          {isActive && (
            <Text className="mt-1 font-outfit text-[12px]" style={{ color: '#2E2117B2' }}>
              {phases[phase].instruction}
            </Text>
          )}

          {/* Animated Circle */}
          <View className="my-6 items-center justify-center">
            <Animated.View
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: getPhaseColor(),
                opacity: opacityAnim,
                transform: [{ scale: scaleAnim }],
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {isActive && (
                <Text className="font-outfitBold text-[40px]" style={{ color: '#FFFFFF' }}>
                  {timeLeft}
                </Text>
              )}
            </Animated.View>
          </View>

          {/* Phase Text */}
          {isActive && (
            <Text className="font-outfitMedium text-[16px]" style={{ color: getPhaseColor() }}>
              {phases[phase].text}
            </Text>
          )}

          {/* Cycle Progress Indicator - Improved spacing */}
          {isActive && (
            <View className="mt-4 w-full items-center">
              <Text className="font-outfit text-[10px]" style={{ color: '#2E211799' }}>
                Cycle Progress
              </Text>

              {/* Horizontal ScrollView for better spacing on many cycles */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: 8,
                  alignItems: 'center',
                }}
                className="mt-2">
                <View className="flex-row items-center justify-center" style={{ gap: 6 }}>
                  {cycles.map((cycle) => (
                    <View
                      key={cycle}
                      style={{
                        width: cycle === displayCycleNumber ? 10 : 7,
                        height: cycle === displayCycleNumber ? 10 : 7,
                        borderRadius: cycle === displayCycleNumber ? 5 : 3.5,
                        backgroundColor:
                          cycle < displayCycleNumber
                            ? '#10B981'
                            : cycle === displayCycleNumber
                              ? '#7A8B6A'
                              : '#2E21173D',
                        marginHorizontal: 2,
                      }}
                    />
                  ))}
                </View>
              </ScrollView>

              <Text className="mt-2 font-outfit text-[10px]" style={{ color: '#2E211799' }}>
                Cycle {displayCycleNumber} of {TOTAL_CYCLES}
              </Text>
            </View>
          )}

          {/* Start/Stop Button */}
          {!isActive ? (
            <TouchableOpacity
              onPress={() => setIsActive(true)}
              className="mt-6 w-full rounded-2xl bg-[#7A8B6A] py-4">
              <Text
                className="text-center font-outfitMedium text-[16px] "
                style={{ color: '#361A0D' }}>
                Start Exercise
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setIsActive(false)}
              className="mt-6 w-full rounded-2xl bg-[#EF4444] py-4">
              <Text
                style={{ color: '#361A0D' }}
                className=" text-center font-outfitMedium text-[16px]">
                Stop Exercise
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};
