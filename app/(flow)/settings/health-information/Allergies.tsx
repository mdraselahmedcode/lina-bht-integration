// app/(flow)/settings/health-information/Allergies.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/header/CustomHeader';
import { LAYOUT } from '@/constants/constants';
import { useScreenReady } from '@/hooks/useScreenReady';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';
import PrimaryVariantButton from '@/components/buttons/PrimaryVariantButton';
import { InfoRow } from '@/components/personalInfo/InfoRow';
import VectorBg from '@/components/VectorBg';
import { useGetAllergiesQuery } from '@/store/api/onboardingApi';

export default function AllergiesSettingsScreen() {
  const router = useRouter();

  const {
    data: allergiesData,
    isLoading,
    isError,
    refetch,
  } = useGetAllergiesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const { isRendering, isContentReady, renderError } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  const allergies = allergiesData?.allergies ?? [];

  const getDisplayText = () => {
    if (allergies.length === 0) return 'None';
    if (allergies.length <= 3) return allergies.join(', ');
    return `${allergies.slice(0, 3).join(', ')} +${allergies.length - 3} more`;
  };

  const handleRetry = () => refetch();

  if (isRendering || isLoading) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1">
        <VectorBg />
        <LoadingScreen loadingText="Loading allergies..." />
      </SafeAreaView>
    );
  }

  if (renderError || isError) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title="Allergies" height={50} backButton={true} />
        <ErrorScreen message={renderError ?? 'Failed to load.'} onRetry={handleRetry} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
      <CustomHeader title="Allergies" height={50} backButton={true} />
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
          <InfoRow
            label="Your Allergies"
            value={getDisplayText()}
            isEditing={false}
            labelColor="#2E2117"
            valueColor="#2E2117B2"
          />

          <PrimaryVariantButton
            onPress={() => router.push('/(flow)/settings/health-information/edit/edit-allergies')}
            borderTopLeftRadius={100}
            borderTopRightRadius={100}
            borderBottomLeftRadius={100}
            borderBottomRightRadius={100}
            title="Edit Allergies"
            style={{ marginTop: 24 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
