// app/(flow)/wellness/index.tsx
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  LayoutChangeEvent,
  Modal,
  Animated,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/header/CustomHeader';
import { LAYOUT } from '@/constants/constants';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import { LoveIcon, ThreeCurvedIcon, ZLikeIcon } from '@/components/icons';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { CircularIconButton } from '@/components/buttons/CircularIconButton';
import { BreathingExercise } from '@/components/wellness/BreathingExercise';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';
import { useScreenReady } from '@/hooks/useScreenReady';
import { useRouter } from 'expo-router';

const WellnessScreen = () => {
  const router = useRouter();
  const [stressLevel, setStressLevel] = useState(50);
  const [barWidth, setBarWidth] = useState(0);
  const [showBreathingModal, setShowBreathingModal] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const barRef = useRef<View>(null);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  // Screen ready state for smooth transitions
  const { isRendering, isContentReady, renderError } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  const { logout } = useAuth();
  const { showSuccess, showError } = useToast();

  // Start animation when content is ready
  useEffect(() => {
    if (isContentReady && !isContentLoaded) {
      setIsContentLoaded(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isContentReady, isContentLoaded]);

  const handleStressLog = () => {
    let stressText = '';
    if (stressLevel <= 20) stressText = 'Very Calm';
    else if (stressLevel <= 40) stressText = 'Calm';
    else if (stressLevel <= 60) stressText = 'Moderate';
    else if (stressLevel <= 80) stressText = 'Stressed';
    else stressText = 'Highly Stressed';

    showSuccess(`Stress level logged: ${stressText} (${Math.round(stressLevel)}%)`);
  };

  const handleBarPress = (event: any) => {
    if (!barWidth) return;

    const { locationX } = event.nativeEvent;
    const percentage = (locationX / barWidth) * 100;
    const newValue = Math.min(100, Math.max(0, percentage));
    setStressLevel(newValue);
  };

  const handleBarLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setBarWidth(width);
  };

  const getStressText = () => {
    if (stressLevel <= 20) return 'Very Calm';
    if (stressLevel <= 40) return 'Calm';
    if (stressLevel <= 60) return 'Moderate';
    if (stressLevel <= 80) return 'Stressed';
    return 'Highly Stressed';
  };

  const getStressColor = () => {
    if (stressLevel <= 20) return '#10B981';
    if (stressLevel <= 40) return '#84CC16';
    if (stressLevel <= 60) return '#F59E0B';
    if (stressLevel <= 80) return '#F97316';
    return '#EF4444';
  };

  const handleRetry = () => {
    router.replace('/(flow)/wellness');
  };

  // Show initial render loading (useScreenReady)
  if (isRendering) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <LoadingScreen loadingText="Creating your calm space..." />
      </SafeAreaView>
    );
  }

  // Show error if rendering failed
  if (renderError) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title="Wellness" height={50} backButton={true} />
        <ErrorScreen message={renderError} onRetry={handleRetry} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
      <CustomHeader title="Wellness" height={50} backButton={true} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
          paddingTop: 10,
          flexGrow: 1,
        }}
        className="flex-1">
        <Animated.View
          className="px-container"
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}>
          {/* Daily Stress Check-in Card */}
          <BorderlessShadowCard
            style={{
              paddingVertical: 16,
              paddingHorizontal: 24,
            }}>
            <View className="flex-row gap-3">
              <CircularIconButton size={32} icon={<ZLikeIcon size={20} color="#F59E0B" />} />
              <View className="flex-1">
                <Text className="font-outfitMedium text-[16px]" style={{ color: '#2A2118' }}>
                  Daily Stress Check-in
                </Text>
                <Text className="mt-[6px] font-outfit text-[12px]" style={{ color: '#2A2118B2' }}>
                  High stress increases cortisol, which can lead to breakouts. How are you feeling
                  today?
                </Text>
              </View>
            </View>

            {/* Stress Level Indicator */}
            <View className="mt-6">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleBarPress}
                onLayout={handleBarLayout}
                style={{
                  height: 40,
                  justifyContent: 'center',
                }}>
                <View
                  ref={barRef}
                  style={{
                    height: 10,
                    backgroundColor: '#2E21173D',
                    borderRadius: 8,
                    overflow: 'hidden',
                  }}>
                  <View
                    style={{
                      width: `${stressLevel}%`,
                      height: '100%',
                      backgroundColor: getStressColor(),
                      borderRadius: 8,
                    }}
                  />
                </View>

                <View
                  style={{
                    position: 'absolute',
                    left: `${stressLevel}%`,
                    marginLeft: -8,
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    backgroundColor: '#361A0D',
                    borderWidth: 2,
                    borderColor: '#FFFFFF',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 4,
                  }}
                />
              </TouchableOpacity>

              <View className="mb-2 flex-row justify-between">
                <Text className="font-outfit text-[12px]" style={{ color: '#361A0D' }}>
                  Very Calm
                </Text>
                <Text className="font-outfit text-[12px]" style={{ color: '#361A0D' }}>
                  Highly Stressed
                </Text>
              </View>

              <View className="mt-3 items-center">
                <Text className="font-outfitMedium text-[14px]" style={{ color: getStressColor() }}>
                  Current: {getStressText()}
                </Text>
              </View>
            </View>

            <PrimaryButton
              title="Log Stress Level"
              onPress={handleStressLog}
              style={{ marginTop: 16 }}
            />
          </BorderlessShadowCard>

          {/* Breathing Exercise Card */}
          <BorderlessShadowCard
            b_tl={0}
            b_tr={0}
            b_bl={0}
            b_br={0}
            style={{
              marginTop: 12,
              paddingVertical: 16,
              paddingHorizontal: 24,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CircularIconButton
              style={{ backgroundColor: '#CAA78933' }}
              size={76}
              icon={<ThreeCurvedIcon width={26} height={24} />}
            />
            <Text className="mt-3 font-outfitMedium text-[20px]" style={{ color: '#2E2117' }}>
              3-Min Breathing
            </Text>
            <Text
              className="mt-[6px] text-center font-outfit text-[14px]"
              style={{ color: '#2E211799' }}>
              Lower your cortisol levels instantly with guided box breathing.
            </Text>
            <PrimaryButton
              title="Start Exercise"
              onPress={() => setShowBreathingModal(true)}
              style={{ width: '100%', marginTop: 12 }}
            />
          </BorderlessShadowCard>

          {/* Cycle Syncing Card */}
          <BorderlessShadowCard
            b_tl={0}
            b_tr={0}
            b_bl={24}
            b_br={24}
            style={{
              marginTop: 12,
              paddingVertical: 16,
              paddingHorizontal: 24,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View className="flex-row gap-3">
              <CircularIconButton size={32} icon={<LoveIcon size={20} color="#EC4899" />} />
              <View className="flex-1">
                <Text className="font-outfitMedium text-[16px]" style={{ color: '#2A2118' }}>
                  Cycle Syncing
                </Text>
                <Text className="mt-[6px] font-outfit text-[12px]" style={{ color: '#2A2118B2' }}>
                  You are in your <Text className="font-OutfitBold text-[12px]">Luteal Phase</Text>{' '}
                  Progesterone is rising, which may increase sebum production.
                </Text>
              </View>
            </View>
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: '#2E211733',
                marginVertical: 12,
              }}
            />
            <Text
              className="w-full text-start font-outfitMedium text-[16px]"
              style={{ color: '#2A2118' }}>
              AI Routine Adjustment
            </Text>
            <Text className="font-outfit text-[12px]" style={{ color: '#2A2118B2' }}>
              We&apos;ve added a gentle BHA exfoliant to your night routine to prevent clogged pores
            </Text>
          </BorderlessShadowCard>
        </Animated.View>
      </ScrollView>

      {/* Breathing Exercise Modal */}
      <Modal
        visible={showBreathingModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowBreathingModal(false)}>
        <BreathingExercise onClose={() => setShowBreathingModal(false)} />
      </Modal>
    </SafeAreaView>
  );
};

export default WellnessScreen;

const styles = StyleSheet.create({});
