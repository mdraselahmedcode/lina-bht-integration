// app/(flow)/routines/ai-routine-generate/ai-routine.tsx
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import CustomHeader from '@/components/header/CustomHeader';
import { LAYOUT } from '@/constants/constants';
import { useScreenReady } from '@/hooks/useScreenReady';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import { AiAssistantIcon, SunIcon, MoonIcon, CalendarIcon, TrashBinIcon } from '@/components/icons';
import { useToast } from '@/hooks/useToast';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
import { GradientProgressBar } from '@/components/GradientProgressBar';
import { LinearGradient } from 'expo-linear-gradient';

// Placeholder images from different sources
const PLACEHOLDER_IMAGES = {
  cleanser: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&h=100&fit=crop',
  serum: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&h=100&fit=crop',
  moisturizer: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=100&h=100&fit=crop',
  sunscreen: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=100&h=100&fit=crop',
  exfoliant: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=100&h=100&fit=crop',
  mask: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=100&h=100&fit=crop',
  default: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&h=100&fit=crop',
};

// Function to get image based on category
const getImageForCategory = (category: string): string => {
  const categoryLower = category.toLowerCase();
  if (categoryLower.includes('cleanser')) return PLACEHOLDER_IMAGES.cleanser;
  if (categoryLower.includes('serum')) return PLACEHOLDER_IMAGES.serum;
  if (categoryLower.includes('moisturizer')) return PLACEHOLDER_IMAGES.moisturizer;
  if (categoryLower.includes('sunscreen') || categoryLower.includes('spf'))
    return PLACEHOLDER_IMAGES.sunscreen;
  if (categoryLower.includes('exfoliant')) return PLACEHOLDER_IMAGES.exfoliant;
  if (categoryLower.includes('mask')) return PLACEHOLDER_IMAGES.mask;
  return PLACEHOLDER_IMAGES.default;
};

interface RoutineData {
  id: string;
  name: string;
  reasons?: ReasonPoint[];
  morningRoutine?: RoutineStep[];
  nightRoutine?: RoutineStep[];
  weeklyRoutine?: RoutineStep[];
}

interface RoutineStep {
  id: string;
  title: string;
  category: string;
  instructions: string;
  imageUrl?: string;
}

interface ReasonPoint {
  id: string;
  title: string;
}

type PhaseType = 'repair' | 'balance' | 'maintenance';

// Helper function to chunk array into rows of 2
const chunkArray = <T,>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

const ReasonPointsGrid = ({ points }: { points: ReasonPoint[] }) => {
  if (!points || points.length === 0) return null;

  const rows = chunkArray(points, 2);

  return (
    <View className="gap-3">
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} className="flex-row justify-between gap-3">
          {row.map((point) => (
            <View key={point.id} className="flex-1 flex-row items-start">
              <View
                style={{
                  backgroundColor: '#361A0D',
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  borderTopWidth: 0,
                  borderWidth: 0.5,
                  borderBottomWidth: 1.3,
                  borderLeftColor: '#ffffff',
                  borderRightColor: '#ffffff',
                  borderBottomColor: '#FFFFFF',
                  marginRight: 12,
                  marginTop: 6,
                }}
              />
              <Text
                className="flex-1 font-outfitMedium text-[14px]"
                style={{
                  color: '#2E2117',
                  textShadowColor: '#FFFFFF',
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
                }}>
                {point.title}
              </Text>
            </View>
          ))}
          {row.length === 1 && <View className="flex-1" />}
        </View>
      ))}
    </View>
  );
};

const RoutineStepCard = ({
  step,
  index,
  isFirst,
  isLast,
  onDelete,
}: {
  step: RoutineStep;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  onDelete?: (stepId: string) => void;
}) => {
  // Use provided imageUrl or generate from category
  const imageSource = step.imageUrl || getImageForCategory(step.category);

  return (
    <BorderlessShadowCard
      style={{
        padding: 12,
        marginTop: index === 0 ? 12 : 0,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#FFFFFF99',
        borderRadius: 24,
      }}
      b_tl={isFirst ? 24 : 0}
      b_tr={isFirst ? 24 : 0}
      b_bl={isLast ? 24 : 0}
      b_br={isLast ? 24 : 0}>
      <View className="flex-row items-start gap-3">
        {/* Product Image */}
        <View
          style={{
            width: 64,
            height: 72,
            borderRadius: 12,
            borderWidth: 1.5,
            borderColor: '#FFFFFF99',
            borderLeftWidth: 0.6,
            borderRightWidth: 0.6,
            borderLeftColor: '#97908b33',
            borderRightColor: '#97908b33',
            backgroundColor: '#F0E6D8',
            overflow: 'hidden',
          }}>
          <Image
            source={{ uri: imageSource }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </View>

        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            <Text
              style={{
                color: '#977857',
                fontFamily: 'Outfit-Medium',
                fontSize: 12,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}>
              {step.category}
            </Text>
            {onDelete && (
              <TouchableOpacity
                onPress={() => onDelete(step.id)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <TrashBinIcon size={12} color="#DC2626CC" />
              </TouchableOpacity>
            )}
          </View>
          <Text
            className="mt-1 font-outfitMedium text-[16px]"
            style={{
              color: '#2E2117',
              textShadowColor: '#FFFFFF',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 2,
            }}>
            {step.title}
          </Text>
          <Text
            className="mt-1 font-outfit text-[12px] leading-5"
            style={{
              color: '#2E211799',
              textShadowColor: '#FFFFFF',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 2,
            }}>
            {step.instructions}
          </Text>
        </View>
      </View>
    </BorderlessShadowCard>
  );
};

const RoutineSection = ({
  title,
  icon,
  steps,
  onDeleteStep,
}: {
  title: string;
  icon: React.ReactNode;
  steps: RoutineStep[];
  onDeleteStep?: (stepId: string) => void;
}) => {
  if (!steps || steps.length === 0) return null;

  return (
    <View className="mt-6">
      <View className="mb-1 flex-row items-center gap-3">
        {icon}
        <Text className="font-outfitMedium text-[16px]" style={{ color: '#2E2117' }}>
          {title}
        </Text>
      </View>

      {steps.map((step, index) => (
        <RoutineStepCard
          key={step.id}
          step={step}
          index={index}
          isFirst={index === 0}
          isLast={index === steps.length - 1}
          onDelete={onDeleteStep}
        />
      ))}
    </View>
  );
};

const AiRoutineScreen = () => {
  const router = useRouter();
  const { showError, showSuccess } = useToast();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [routineData, setRoutineData] = useState<RoutineData | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<PhaseType>('repair');
  const [phaseProgress, setPhaseProgress] = useState(33);

  const { isRendering, isContentReady, renderError } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  useEffect(() => {
    loadRoutineData();
  }, []);

  const handlePhaseSelect = (phase: PhaseType) => {
    setSelectedPhase(phase);
    if (phase === 'repair') {
      setPhaseProgress(33);
    } else if (phase === 'balance') {
      setPhaseProgress(66);
    } else {
      setPhaseProgress(100);
    }
  };

  const loadRoutineData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockData: RoutineData = {
        id: 'ai_routine_1',
        name: 'Personalized Skincare Routine',
        reasons: [
          { id: '1', title: 'Mild Acne Detected' },
          { id: '2', title: 'Regulate Sebum' },
          { id: '3', title: 'Fragrance Free' },
          { id: '4', title: 'Budget Friendly' },
        ],
        morningRoutine: [
          {
            id: 'step_1',
            title: 'Gentle Oat Cleanser',
            category: 'CLEANSER',
            instructions: 'Massage onto damp skin for 60 seconds, rinse with lukewarm water.',
          },
          {
            id: 'step_2',
            title: 'Vitamin C Serum',
            category: 'SERUM',
            instructions: 'Apply 3-4 drops to slightly damp skin. Pat gently.',
          },
          {
            id: 'step_3',
            title: 'Daily Hydrating Moisturizer',
            category: 'MOISTURIZER',
            instructions: 'Apply a thin layer to face and neck.',
          },
          {
            id: 'step_4',
            title: 'Mineral SPF 50',
            category: 'SUNSCREEN',
            instructions: 'Apply generously as the final step.',
          },
        ],
        nightRoutine: [
          {
            id: 'step_5',
            title: 'Cleansing Balm',
            category: 'CLEANSER',
            instructions:
              'Massage onto dry skin to melt makeup/SPF. Emulsify with water and rinse.',
          },
          {
            id: 'step_6',
            title: 'Barrier Repair Cream',
            category: 'MOISTURIZER',
            instructions: 'Apply a generous layer to lock in moisture.',
          },
        ],
        weeklyRoutine: [
          {
            id: 'step_7',
            title: 'AHA/BHA Exfoliant',
            category: 'EXFOLIANT',
            instructions: 'Apply a thin layer after cleansing. Leave for 10 minutes, then rinse.',
          },
          {
            id: 'step_8',
            title: 'Hydrating Sheet Mask',
            category: 'MASK',
            instructions:
              'Apply after cleansing. Leave for 15-20 minutes, then pat in excess serum.',
          },
        ],
      };

      setRoutineData(mockData);
    } catch (err) {
      console.error('Error loading routine:', err);
      setError('Failed to load AI-generated routine');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    loadRoutineData();
  };

  const handleSaveRoutine = async () => {
    try {
      showSuccess('Routine saved to your profile!');
      // router.back();
      router.replace('/(main)/routines');
    } catch (err) {
      showError('Failed to save routine');
    }
  };

  const handleRegenerate = () => {
    loadRoutineData();
  };

  const handleDeleteStep = (stepId: string) => {
    console.log('Delete step:', stepId);
    showSuccess('Step removed from routine');
  };

  useEffect(() => {
    if (isContentReady && isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [isContentReady]);

  if (isRendering && isInitialLoad) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <LoadingScreen loadingText="Preparing AI routine..." />
      </SafeAreaView>
    );
  }

  if (renderError) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title="AI Routine Generator" height={50} backButton />
        <ErrorScreen message={renderError} onRetry={handleRetry} />
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title="AI Routine Generator" height={50} backButton />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#95B287" />
          <Text className="mt-3 font-outfit text-[14px]" style={{ color: '#2E211799' }}>
            Analyzing your skin profile...
          </Text>
          <Text className="mt-1 font-outfit text-[12px]" style={{ color: '#2E211799' }}>
            Creating personalized routine
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !routineData) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title="AI Routine Generator" height={50} backButton />
        <ErrorScreen message={error || 'Failed to load routine'} onRetry={handleRetry} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
      <CustomHeader
        title="AI Routine Generator"
        subtitle="Personalized based on your latest scan."
        backButton
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
          paddingTop: 20,
          flexGrow: 1,
        }}
        className="flex-1"
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleRegenerate}
            colors={['#95B287']}
          />
        }>
        <View
          className="px-container"
          style={{
            opacity: isContentReady ? 1 : 0,
            transform: [{ translateY: isContentReady ? 0 : 10 }],
          }}>
          {/* Why this Routine? Section */}
          {routineData.reasons && routineData.reasons.length > 0 && (
            <View
              className="mb-4 gap-3 bg-transparent p-4"
              style={{
                borderWidth: 1,
                borderColor: '#FFFFFF99',
                borderRadius: 24,
                borderTopWidth: 2,
                borderBottomWidth: 2,
              }}>
              <Text
                className="font-outfitMedium text-[20px]"
                style={{
                  color: '#2E2117',
                  textShadowColor: '#FFFFFF',
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
                }}>
                Why this Routine ?
              </Text>
              <ReasonPointsGrid points={routineData.reasons} />
            </View>
          )}

          {/* Phase Filter Section */}
          <View className="mb-0 mt-6">
            {/* Progress Bar with Circle */}
            <View className="relative mb-3">
              <GradientProgressBar
                progress={phaseProgress}
                height={8}
                gradientColors={['#977857', '#B89474', '#7A5D3E']}
                gradientLocations={[0.25, 0.6036, 0.9571]}
                backgroundColor="#2E21173D"
                borderRadius={10}
              />
              {/* Circle Indicator with Gradient */}
              <View
                style={{
                  position: 'absolute',
                  left: `${phaseProgress}%`,
                  top: -4,
                  marginLeft: -16,
                }}>
                <LinearGradient
                  colors={['#977857', '#B89474', '#7A5D3E']}
                  locations={[0.25, 0.6036, 0.9571]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    borderWidth: 0,
                    borderColor: '#FFFFFF',
                  }}
                />
              </View>
            </View>

            <View className="mt-3 flex-row justify-between gap-3">
              <TouchableOpacity
                onPress={() => handlePhaseSelect('repair')}
                className="flex-1 rounded-xl py-3"
                style={{
                  backgroundColor: selectedPhase === 'repair' ? '#97785720' : 'transparent',
                  borderWidth: 1,
                  borderColor: selectedPhase === 'repair' ? '#977857' : '#FFFFFF99',
                }}>
                <Text
                  className="text-center font-outfitMedium text-[14px]"
                  style={{
                    color: selectedPhase === 'repair' ? '#977857' : '#2E2117',
                    textShadowColor: '#FFFFFF',
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 2,
                  }}>
                  Repair Phase
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handlePhaseSelect('balance')}
                className="flex-1 rounded-xl py-3"
                style={{
                  backgroundColor: selectedPhase === 'balance' ? '#97785720' : 'transparent',
                  borderWidth: 1,
                  borderColor: selectedPhase === 'balance' ? '#977857' : '#FFFFFF99',
                }}>
                <Text
                  className="text-center font-outfitMedium text-[14px]"
                  style={{
                    color: selectedPhase === 'balance' ? '#977857' : '#2E2117',
                    textShadowColor: '#FFFFFF',
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 2,
                  }}>
                  Balance Phase
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handlePhaseSelect('maintenance')}
                className="flex-1 rounded-xl py-3"
                style={{
                  backgroundColor: selectedPhase === 'maintenance' ? '#97785720' : 'transparent',
                  borderWidth: 1,
                  borderColor: selectedPhase === 'maintenance' ? '#977857' : '#FFFFFF99',
                }}>
                <Text
                  className="text-center font-outfitMedium text-[14px]"
                  style={{
                    color: selectedPhase === 'maintenance' ? '#977857' : '#2E2117',
                    textShadowColor: '#FFFFFF',
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 2,
                  }}>
                  Maintenance
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Morning Routine */}
          <RoutineSection
            title="Morning Routine"
            icon={<SunIcon size={24} color="#F59E0B" />}
            steps={routineData.morningRoutine || []}
            onDeleteStep={handleDeleteStep}
          />

          {/* Night Routine */}
          {routineData.nightRoutine && routineData.nightRoutine.length > 0 && (
            <RoutineSection
              title="Night Routine"
              icon={<MoonIcon size={24} color="#6366F1" />}
              steps={routineData.nightRoutine}
              onDeleteStep={handleDeleteStep}
            />
          )}

          {/* Weekly Routine */}
          {routineData.weeklyRoutine && routineData.weeklyRoutine.length > 0 && (
            <RoutineSection
              title="Weekly Care"
              icon={<CalendarIcon size={24} color="#A855F7" />}
              steps={routineData.weeklyRoutine}
              onDeleteStep={handleDeleteStep}
            />
          )}

          {/* Action Buttons */}
          <View className="mt-8 gap-3">
            <PrimaryButton
              title="Save & Apply Routine"
              onPress={handleSaveRoutine}
              style={{ marginBottom: 8 }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AiRoutineScreen;

const styles = StyleSheet.create({});
