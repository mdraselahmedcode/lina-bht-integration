// screens/home/hooks/useHomeScreen.ts
import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { useHomeData } from '@/hooks/useHomeData';

export const useHomeScreen = () => {
  const { logout } = useAuth();
  const {
    homeData,
    isLoading,
    isError,
    refetch,
    updateRoutineStep,
    notificationCount,
    completedStepsCount,
    routineProgress,
  } = useHomeData();

  const handleLogout = useCallback(async () => {
    try {
      await logout();
    } catch (error) {
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  }, [logout]);

  const toggleStepCompletion = useCallback((stepId: string, currentCompleted: boolean) => {
    updateRoutineStep(stepId, !currentCompleted);
  }, [updateRoutineStep]);

  const handleQuickAction = useCallback((actionTitle: string) => {
    console.log(`${actionTitle} pressed`);
    // TODO: Navigate to appropriate screen
  }, []);

  const handleViewAllRoutines = useCallback(() => {
    console.log('View all routines pressed');
    // TODO: Navigate to routines screen
  }, []);

  const handleInsightPress = useCallback((insightId: string) => {
    console.log(`Insight ${insightId} pressed`);
    // TODO: Navigate to insight details
  }, []);

  const handleSkinProgress = useCallback(() => {
    console.log('Skin Progress pressed');
    // TODO: Navigate to progress screen
  }, []);

  return {
    // Data
    homeData,
    isLoading,
    isError,
    notificationCount,
    completedStepsCount,
    routineProgress,
    
    // Actions
    handleLogout,
    toggleStepCompletion,
    handleQuickAction,
    handleViewAllRoutines,
    handleInsightPress,
    handleSkinProgress,
    refetch,
  };
};