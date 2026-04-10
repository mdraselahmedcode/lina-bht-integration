// app/(flow)/settings/health-information/Allergies.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/header/CustomHeader';
import { LAYOUT } from '@/constants/constants';
import { useToast } from '@/hooks/useToast';
import { useScreenReady } from '@/hooks/useScreenReady';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';
import PrimaryVariantButton from '@/components/buttons/PrimaryVariantButton';
import { InfoRow } from '@/components/personalInfo/InfoRow';

export default function AllergiesSettingsScreen() {
  const router = useRouter();
  const [allergies, setAllergies] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { isRendering, isContentReady, renderError } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  useEffect(() => {
    loadAllergies();
  }, []);

  const loadAllergies = async () => {
    try {
      const saved = await AsyncStorage.getItem('user_allergies');
      if (saved) {
        setAllergies(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading allergies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDisplayText = () => {
    if (allergies.length === 0) return 'None';
    if (allergies.length <= 3) return allergies.join(', ');
    return `${allergies.slice(0, 3).join(', ')} +${allergies.length - 3} more`;
  };

  const handleEdit = () => {
    router.push('/(flow)/settings/health-information/edit/edit-allergies');
  };

  const handleRetry = () => {
    router.replace('/(flow)/settings/health-information/Allergies');
  };

  if (isRendering || isLoading) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <LoadingScreen loadingText="Loading allergies..." />
      </SafeAreaView>
    );
  }

  if (renderError) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title="Allergies" height={50} backButton={true} />
        <ErrorScreen message={renderError} onRetry={handleRetry} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
      <CustomHeader title="Allergies" height={50} backButton={true} />

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
            onPress={handleEdit}
            borderTopLeftRadius={24}
            borderTopRightRadius={24}
            borderBottomLeftRadius={24}
            borderBottomRightRadius={24}
            title="Edit Allergies"
            style={{ marginTop: 24 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
