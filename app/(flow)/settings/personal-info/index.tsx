import { ScrollView, View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import CustomHeader from '@/components/header/CustomHeader';
import { LAYOUT } from '@/constants/constants';
import { InfoRow } from '@/components/personalInfo/InfoRow';
import { AvatarCard } from '@/components/personalInfo/AvatarCard';
import PrimaryVariantButton from '@/components/buttons/PrimaryVariantButton';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';
import { useGetProfileQuery } from '@/store/api/profileApi';
import { countries, languages, genders } from '@/types/personalInfo';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getLabelForCode = (
  items: { id: string; label: string; value: string }[],
  code: string | null | undefined
) => items.find((i) => i.value === code)?.label ?? code ?? 'Not set';

const formatDate = (isoDate: string | null | undefined) => {
  if (!isoDate) return 'Not set';
  return new Date(isoDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function PersonalInfoScreen() {
  const router = useRouter();
  const {
    data: profile,
    isLoading,
    isError,
    refetch,
  } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <LoadingScreen loadingText="Loading your personal information..." />
      </SafeAreaView>
    );
  }

  if (isError || !profile) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title="Personal Info" height={50} backButton={true} />
        <ErrorScreen message="Failed to load profile." onRetry={refetch} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
      <CustomHeader title="Personal Info" height={50} backButton={true} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
          paddingTop: 30,
          flexGrow: 1,
        }}
        className="flex-1">
        <View className="px-container" style={{ gap: 12 }}>
          <AvatarCard isEditing={false} avatarUrl={profile.avatar_url} onAvatarChange={() => {}} />

          <InfoRow
            label="Name"
            value={profile.full_name || 'Not set'}
            isEditing={false}
            labelColor="#2E2117"
            valueColor="#2E2117B2"
          />

          <InfoRow
            label="Email"
            value={profile.email}
            isEditing={false}
            labelColor="#2E2117"
            valueColor="#2E2117B2"
          />

          <InfoRow
            label="Gender"
            value={getLabelForCode(genders, profile.gender)}
            isEditing={false}
            labelColor="#2E2117"
            valueColor="#2E2117B2"
          />

          <InfoRow
            label="Date of Birth"
            value={formatDate(profile.date_of_birth)}
            isEditing={false}
            labelColor="#2E2117"
            valueColor="#2E2117B2"
          />

          <InfoRow
            label="Language"
            value={getLabelForCode(languages, profile.language)}
            isEditing={false}
            labelColor="#2E2117"
            valueColor="#2E2117B2"
          />

          <InfoRow
            label="Country"
            value={getLabelForCode(countries, profile.country)}
            isEditing={false}
            labelColor="#2E2117"
            valueColor="#2E2117B2"
          />

          <PrimaryVariantButton
            onPress={() => router.push('/(flow)/settings/personal-info/edit')}
            borderTopLeftRadius={0}
            borderTopRightRadius={0}
            borderBottomLeftRadius={24}
            borderBottomRightRadius={24}
            title="Edit Profile"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
