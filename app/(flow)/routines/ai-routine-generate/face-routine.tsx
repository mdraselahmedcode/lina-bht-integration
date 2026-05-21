// app/(flow)/routines/ai-routine-generate/face-routine.tsx
import { ScrollView, Text, View, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import CustomHeader from '@/components/header/CustomHeader';
import { LAYOUT } from '@/constants/constants';
import { useScreenReady } from '@/hooks/useScreenReady';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import { SunIcon, MoonIcon, CalendarIcon, TrashBinIcon } from '@/components/icons';
import { useToast } from '@/hooks/useToast';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
import {
  useGenerateFaceRoutineMutation,
  useSaveRoutineMutation,
  FaceRoutineStep,
  FaceRoutineResponse,
} from '@/store/api/routineApi';

// ── Category → product image map ──────────────────────────────────────────────
const CATEGORY_IMAGES: Record<string, string> = {
  cleanser: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&h=100&fit=crop',
  serum: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&h=100&fit=crop',
  moisturizer: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=100&h=100&fit=crop',
  sunscreen: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=100&h=100&fit=crop',
  toner: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=100&h=100&fit=crop',
  mask: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=100&h=100&fit=crop',
  eye_cream: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&h=100&fit=crop',
  exfoliant: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=100&h=100&fit=crop',
  default: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&h=100&fit=crop',
};

const getImageForCategory = (category: string): string => {
  const lower = category.toLowerCase();
  for (const key of Object.keys(CATEGORY_IMAGES)) {
    if (lower.includes(key)) return CATEGORY_IMAGES[key];
  }
  return CATEGORY_IMAGES.default;
};

// ── Reason points grid ────────────────────────────────────────────────────────
const chunkArray = <T,>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) chunks.push(array.slice(i, i + size));
  return chunks;
};

const ReasonPointsGrid = ({ points }: { points: string[] }) => {
  if (!points?.length) return null;
  const rows = chunkArray(points, 2);
  return (
    <View className="gap-3">
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} className="flex-row justify-between gap-3">
          {row.map((title, idx) => (
            <View key={idx} className="flex-1 flex-row items-start">
              <View
                style={{
                  backgroundColor: '#361A0D',
                  width: 10,
                  height: 10,
                  borderRadius: 999,
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
                {title}
              </Text>
            </View>
          ))}
          {row.length === 1 && <View className="flex-1" />}
        </View>
      ))}
    </View>
  );
};

// ── Step card ─────────────────────────────────────────────────────────────────
const FaceStepCard = ({
  step,
  index,
  isFirst,
  isLast,
  onDelete,
}: {
  step: FaceRoutineStep;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  onDelete: (id: string) => void;
}) => {
  const imageUri = step.product_url || getImageForCategory(step.product_category);

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
        {/* Product image */}
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
            source={{ uri: imageUri }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </View>

        <View className="flex-1">
          {/* Category label + delete */}
          <View className="flex-row items-center justify-between">
            <Text
              style={{
                color: '#977857',
                fontFamily: 'Outfit-Medium',
                fontSize: 12,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                flexShrink: 1,
                marginRight: 8,
              }}
              numberOfLines={1}>
              {step.product_category.replace(/_/g, ' ')}
            </Text>
            <TouchableOpacity
              onPress={() => onDelete(step.id)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <TrashBinIcon size={12} color="#DC2626CC" />
            </TouchableOpacity>
          </View>

          {/* Product name */}
          <Text
            className="mt-1 font-outfitMedium text-[16px]"
            style={{
              color: '#2E2117',
              textShadowColor: '#FFFFFF',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 2,
            }}>
            {step.product_name ||
              step.product_category.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
          </Text>

          {/* Why */}
          <Text
            className="mt-1 font-outfit text-[12px] leading-5"
            style={{
              color: '#2E211799',
              textShadowColor: '#FFFFFF',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 2,
            }}>
            {step.why}
          </Text>
        </View>
      </View>
    </BorderlessShadowCard>
  );
};

// ── Routine section ───────────────────────────────────────────────────────────
const FaceRoutineSection = ({
  title,
  icon,
  steps,
  onDeleteStep,
}: {
  title: string;
  icon: React.ReactNode;
  steps: FaceRoutineStep[];
  onDeleteStep: (id: string) => void;
}) => {
  if (!steps.length) return null;
  return (
    <View className="mt-6">
      <View className="mb-1 flex-row items-center gap-3">
        {icon}
        <Text className="font-outfitMedium text-[16px]" style={{ color: '#2E2117' }}>
          {title}
        </Text>
      </View>
      {steps.map((step, index) => (
        <FaceStepCard
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

// ── Working state type ────────────────────────────────────────────────────────
interface WorkingSteps {
  morning: FaceRoutineStep[];
  night: FaceRoutineStep[];
  weekly_care: FaceRoutineStep[];
}

// ── Main screen ───────────────────────────────────────────────────────────────
const FaceRoutineScreen = () => {
  const router = useRouter();
  const { showError, showSuccess } = useToast();
  const { scan_id } = useLocalSearchParams<{ scan_id?: string }>();

  const [generateFaceRoutine, { isLoading: isGenerating }] = useGenerateFaceRoutineMutation();
  const [saveRoutine, { isLoading: isSaving }] = useSaveRoutineMutation();

  const [routineResponse, setRoutineResponse] = useState<FaceRoutineResponse | null>(null);
  const [steps, setSteps] = useState<WorkingSteps>({ morning: [], night: [], weekly_care: [] });
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { isRendering, isContentReady, renderError } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  // ── Generate ────────────────────────────────────────────────────────────────
  const runGenerate = useCallback(async () => {
    if (!scan_id) {
      setGenerateError('No scan ID provided. Please go back and try again.');
      return;
    }
    setGenerateError(null);
    setSteps({ morning: [], night: [], weekly_care: [] });

    try {
      const result = await generateFaceRoutine({ scan_id }).unwrap();
      setRoutineResponse(result);
      setSteps({
        morning: result.routine.morning ?? [],
        night: result.routine.night ?? [],
        weekly_care: result.routine.weekly_care ?? [],
      });
    } catch (err: any) {
      console.error('[FaceRoutineScreen] generate error:', err);
      setGenerateError(
        err?.data?.message ?? err?.message ?? 'Failed to generate routine. Please try again.'
      );
    }
  }, [scan_id, generateFaceRoutine]);

  useEffect(() => {
    runGenerate();
  }, []);

  useEffect(() => {
    if (isContentReady && isInitialLoad) setIsInitialLoad(false);
  }, [isContentReady]);

  // ── Local delete ────────────────────────────────────────────────────────────
  const handleDeleteStep = useCallback((stepId: string) => {
    setSteps((prev) => ({
      morning: prev.morning.filter((s) => s.id !== stepId),
      night: prev.night.filter((s) => s.id !== stepId),
      weekly_care: prev.weekly_care.filter((s) => s.id !== stepId),
    }));
  }, []);

  // ── Save ────────────────────────────────────────────────────────────────────
  const handleSaveRoutine = useCallback(async () => {
    const remainingIds = [...steps.morning, ...steps.night, ...steps.weekly_care].map((s) => s.id);

    if (remainingIds.length === 0) {
      showError('Add at least one step before saving.');
      return;
    }

    try {
      await saveRoutine({ routine_step_id: remainingIds }).unwrap();
      showSuccess('Routine saved to your profile!');
      router.replace('/(main)/routines');
    } catch (err: any) {
      console.error('[FaceRoutineScreen] save error:', err);
      showError(err?.data?.message ?? 'Failed to save routine. Please try again.');
    }
  }, [steps, saveRoutine, showSuccess, showError, router]);

  const totalSteps = steps.morning.length + steps.night.length + steps.weekly_care.length;
  const whyPoints: string[] = routineResponse?.routine.why ?? [];

  // ── Guards ──────────────────────────────────────────────────────────────────
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
        <ErrorScreen message={renderError} onRetry={runGenerate} />
      </SafeAreaView>
    );
  }

  if (isGenerating) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title="AI Routine Generator" height={50} backButton />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#95B287" />
          <Text className="mt-3 font-outfit text-[14px]" style={{ color: '#2E211799' }}>
            Analyzing your scan...
          </Text>
          <Text className="mt-1 font-outfit text-[12px]" style={{ color: '#2E211799' }}>
            Creating personalized skincare routine
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (generateError) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title="AI Routine Generator" height={50} backButton />
        <ErrorScreen message={generateError} onRetry={runGenerate} />
      </SafeAreaView>
    );
  }

  if (!routineResponse) return null;

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
      <CustomHeader
        title="AI Routine Generator"
        subtitle="Personalized based on your face scan."
        backButton
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
          paddingTop: 20,
          flexGrow: 1,
        }}
        className="flex-1">
        <View
          className="px-container"
          style={{
            opacity: isContentReady ? 1 : 0,
            transform: [{ translateY: isContentReady ? 0 : 10 }],
          }}>
          {/* Why this Routine? */}
          {whyPoints.length > 0 && (
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
                Why this Routine?
              </Text>
              <ReasonPointsGrid points={whyPoints} />
            </View>
          )}

          {/* Morning */}
          <FaceRoutineSection
            title="Morning Routine"
            icon={<SunIcon size={24} color="#F59E0B" />}
            steps={steps.morning}
            onDeleteStep={handleDeleteStep}
          />

          {/* Night */}
          <FaceRoutineSection
            title="Night Routine"
            icon={<MoonIcon size={24} color="#6366F1" />}
            steps={steps.night}
            onDeleteStep={handleDeleteStep}
          />

          {/* Weekly Care */}
          <FaceRoutineSection
            title="Weekly Care"
            icon={<CalendarIcon size={24} color="#A855F7" />}
            steps={steps.weekly_care}
            onDeleteStep={handleDeleteStep}
          />

          {/* Empty state */}
          {totalSteps === 0 && !isGenerating && (
            <View className="mt-12 items-center px-6">
              <Text
                className="text-center font-outfitMedium text-[16px]"
                style={{ color: '#2E2117' }}>
                No steps remaining
              </Text>
              <Text
                className="mt-2 text-center font-outfit text-[13px]"
                style={{ color: '#2E211799' }}>
                You&apos;ve removed all steps. Regenerate to get a fresh routine.
              </Text>
              <TouchableOpacity
                onPress={runGenerate}
                className="mt-6 rounded-full bg-[#361A0D] px-8 py-4">
                <Text className="font-outfitMedium text-[15px] text-white">Regenerate Routine</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Actions */}
          {totalSteps > 0 && (
            <View className="mt-8 gap-3">
              <PrimaryButton
                title="Save & Apply Routine"
                onPress={handleSaveRoutine}
                disabled={isSaving}
                isLoading={isSaving}
                loaderColor="#361A0D"
                style={{ marginBottom: 8 }}
              />
              <TouchableOpacity
                onPress={runGenerate}
                disabled={isGenerating}
                activeOpacity={0.6}
                className="py-4">
                <Text
                  className="text-center font-outfitMedium text-[16px]"
                  style={{ color: '#361A0D' }}>
                  Regenerate Routine
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FaceRoutineScreen;
