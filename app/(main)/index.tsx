// screens/home/index.tsx
import React from 'react';
import { ScrollView, ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHeader from '@/components/header/HomeHeader';

import { useHomeScreen } from '@/components/home/hooks/useHomeScreen';
import { SkinHealthCard } from '@/components/home/SkinHealthCard';
import { QuickActionsRow } from '@/components/home/QuickActionsRow';
// import { InsightsSection } from '@/components/home/InsightsSection';
import { SkinProgressCard } from '@/components/home/SkinProgressCard';
import { MorningRoutineCard } from '@/components/home/MorningRoutineCard';
import { LAYOUT } from '@/constants/constants';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';

export default function HomeScreen() {
  const {
    homeData,
    isLoading,
    isError,
    notificationCount,
    completedStepsCount,
    routineProgress,
    handleLogout,
    toggleStepCompletion,
    handleQuickAction,
    handleViewAllRoutines,
    handleInsightPress,
    handleSkinProgress,
    refetch,
  } = useHomeScreen();

  // Loading state from API
  if (isLoading) {
    return <LoadingScreen loadingText="Loading your dashboard..." />;
  }

  // Error state from API
  if (isError || !homeData) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <ErrorScreen message="Failed to load home data" onRetry={refetch} />
      </SafeAreaView>
    );
  }

  const { user, skinHealth, metrics, morningRoutine, insights, quickActions } = homeData;

  return (
    <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
      <HomeHeader
        title={`Hello, ${user.name}`}
        subtitle="Your skin is looking radiant today."
        backButton={false}
        height={65}
        notificationCount={notificationCount}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-container"
        contentContainerStyle={{
          paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
          paddingTop: LAYOUT.screen.scrollViewPaddingTop,
        }}
        style={{
          marginTop: LAYOUT.innerPage.marginTop,
        }}>
        <SkinHealthCard
          score={skinHealth.score}
          description={skinHealth.description}
          metrics={metrics}
        />

        <QuickActionsRow actions={quickActions} onActionPress={handleQuickAction} />

        <MorningRoutineCard
          routine={morningRoutine}
          completedStepsCount={completedStepsCount}
          routineProgress={routineProgress}
          onToggleStep={toggleStepCompletion}
          onViewAll={handleViewAllRoutines}
        />

        {/* <InsightsSection insights={insights} onInsightPress={handleInsightPress} /> */}

        <SkinProgressCard onPress={handleSkinProgress} />
      </ScrollView>
    </SafeAreaView>
  );
}
