import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/header/CustomHeader';
import { LAYOUT } from '@/constants/constants';
import { useScreenReady } from '@/hooks/useScreenReady';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';
import PrimaryVariantButton from '@/components/buttons/PrimaryVariantButton';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
import { InfoRow } from '@/components/personalInfo/InfoRow';
import { MenoPauseIcon, PeriodIcon, PostpartumIcon, PregnantIcon } from '@/components/icons';
import VectorBg from '@/components/VectorBg';
import { useGetLifePhaseQuery } from '@/store/api/onboardingApi';
import { useGetProfileQuery } from '@/store/api/profileApi';
import { parseLifePhase } from '@/utils/lifePhaseUtils';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PHASE_LABELS: Record<string, string> = {
  'on my period': 'On my period', // ✅ was 'period'
  pregnant: 'Pregnant',
  postpartum: 'Postpartum',
  menopause: 'Menopause',
  none: 'None',
};

const PhaseIcon = ({ phase }: { phase: string | null }) => {
  const props = { width: 20, height: 20, color: '#7A8B6A' };
  switch (phase) {
    case 'on my period': // ✅ was 'period'
      return <PeriodIcon {...props} />;
    case 'pregnant':
      return <PregnantIcon {...props} />;
    case 'postpartum':
      return <PostpartumIcon {...props} />;
    case 'menopause':
      return <MenoPauseIcon {...props} />;
    default:
      return null;
  }
};

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function LifePhaseHealthScreen() {
  const router = useRouter();

  const {
    data: lifePhaseData,
    isLoading,
    isError,
    refetch,
  } = useGetLifePhaseQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: profileData } = useGetProfileQuery();

  const { isRendering, isContentReady, renderError } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  const { phase, customText, pregnancyMonth } = parseLifePhase(lifePhaseData?.life_phase);

  // Use gender from profile API
  const isFemale = profileData?.gender === 'female';

  const getPhaseDisplayLabel = () => {
    if (phase === 'other') return customText || 'Other';
    return PHASE_LABELS[phase ?? ''] ?? 'Not set';
  };

  const handleRetry = () => {
    refetch();
    router.replace('/(flow)/settings/health-information/life-phase-health');
  };

  if (isRendering || isLoading) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1">
        <VectorBg />
        <LoadingScreen loadingText="Loading health information..." />
      </SafeAreaView>
    );
  }

  if (renderError || isError) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title="Life Phase" height={50} backButton={true} />
        <ErrorScreen message={renderError ?? 'Failed to load.'} onRetry={handleRetry} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
      <CustomHeader title="Life Phase" height={50} backButton={true} />
      <VectorBg />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
          paddingTop: 30,
          flexGrow: 1,
        }}
        className="flex-1">
        <View
          className="px-container"
          style={{
            opacity: isContentReady ? 1 : 0,
            transform: [{ translateY: isContentReady ? 0 : 10 }],
          }}>
          {isFemale ? (
            <>
              <InfoRow
                label="Current Phase"
                value={getPhaseDisplayLabel()}
                isEditing={false}
                labelColor="#2E2117"
                valueColor="#2E2117B2"
              />

              {/* Custom phase badge */}
              {phase === 'other' && customText && (
                <View className="mt-2 flex-row items-center gap-2">
                  <PhaseIcon phase={phase} />
                  <Text className="font-outfit text-[12px]" style={{ color: '#7A8B6A' }}>
                    Custom phase
                  </Text>
                </View>
              )}

              {/* Pregnancy details */}
              {phase === 'pregnant' && pregnancyMonth && (
                <BorderlessShadowCard
                  b_tl={16}
                  b_tr={16}
                  b_bl={16}
                  b_br={16}
                  style={{
                    marginTop: 12,
                    paddingVertical: 16,
                    paddingHorizontal: 20,
                    backgroundColor: '#F5F0EB',
                    borderWidth: 1,
                    borderColor: '#E8DDD0',
                  }}>
                  <View className="flex-row items-center gap-3">
                    <View className="h-12 w-12 items-center justify-center rounded-full bg-[#97785720]">
                      <PregnantIcon width={24} height={24} color="#977857" />
                    </View>
                    <View className="flex-1">
                      <Text
                        className="font-outfitSemiBold text-[15px]"
                        style={{ color: '#2E2117' }}>
                        Pregnancy Details
                      </Text>
                      <Text
                        className="mt-1 font-outfitMedium text-[14px]"
                        style={{ color: '#977857' }}>
                        {pregnancyMonth} month{pregnancyMonth !== 1 ? 's' : ''} pregnant
                      </Text>
                    </View>
                  </View>
                </BorderlessShadowCard>
              )}

              <PrimaryVariantButton
                onPress={() =>
                  router.push('/(flow)/settings/health-information/edit/edit-life-phase')
                }
                borderTopLeftRadius={100}
                borderTopRightRadius={100}
                borderBottomLeftRadius={100}
                borderBottomRightRadius={100}
                title="Edit Phase"
                style={{ marginTop: 24 }}
              />
            </>
          ) : (
            <BorderlessShadowCard
              b_tl={24}
              b_tr={24}
              b_bl={24}
              b_br={24}
              style={{
                paddingVertical: 24,
                paddingHorizontal: 20,
                alignItems: 'center',
              }}>
              <Text className="text-center font-outfit text-[16px]" style={{ color: '#2E2117' }}>
                Life phase tracking is specifically designed for women&apos;s health cycles.
              </Text>
              <Text
                className="mt-2 text-center font-outfit text-[14px]"
                style={{ color: '#2E2117B2' }}>
                This feature helps track menstrual cycles, pregnancy, and menopause stages.
              </Text>
            </BorderlessShadowCard>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
