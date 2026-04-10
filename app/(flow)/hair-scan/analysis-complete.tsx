// app/(flow)/hair-scan/analysis-complete.tsx
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import CustomHeader from '@/components/header/CustomHeader';
import { LAYOUT } from '@/constants/constants';
import { IInCircleIcon } from '@/components/icons/IInCircleIcon';

export default function HairAnalysisComplete() {
  const detectedConditions = [
    { id: 1, name: 'Dandruff', severity: 'Mild', icon: '❄️' },
    { id: 2, name: 'Oily Scalp', severity: 'Moderate', icon: '💧' },
    { id: 3, name: 'Scalp Irritation', severity: 'Mild', icon: '🔴' },
    { id: 4, name: 'Dry Ends', severity: 'Moderate', icon: '🍂' },
  ];

  return (
    <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
      <CustomHeader title="Hair Analysis Complete" height={40} backButton />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
          paddingTop: 24,
        }}
        className="flex-1 px-container">
        <View className="mt-3">
          <Text className="mb-3 text-start font-outfitMedium text-[16px] text-[#2E2117]">
            Detected Conditions
          </Text>

          {detectedConditions.map((condition) => (
            <View
              key={condition.id}
              style={{
                backgroundColor: '#E8DDD0',
                paddingVertical: 16,
                paddingHorizontal: 20,
                marginBottom: 12,
                borderRadius: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-[#F5EDE3]">
                  <Text style={{ fontSize: 20 }}>{condition.icon}</Text>
                </View>
                <View>
                  <Text className="font-outfitMedium text-[15px] text-[#2E2117]">
                    {condition.name}
                  </Text>
                  <Text className="font-outfit text-[12px] text-[#2E2117CC]">
                    {condition.severity}
                  </Text>
                </View>
              </View>
              <IInCircleIcon size={24} color="#7A5D3E" />
            </View>
          ))}
        </View>

        <View className="mb-8 mt-6">
          <View
            style={{
              backgroundColor: 'white',
              paddingVertical: 20,
              paddingHorizontal: 20,
              borderRadius: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 2,
            }}>
            <Text className="mb-2 font-outfitMedium text-[14px] text-[#2E2117]">
              Hair Care Recommendations
            </Text>
            <Text className="font-outfit text-[12px] leading-5 text-[#2E2117CC]">
              Use anti-dandruff shampoo twice a week. Avoid heavy conditioners near the scalp.
              Consider scalp massage to improve blood circulation. Use moisturizing treatments for
              dry ends.
            </Text>
          </View>
        </View>

        <View className="mb-8 flex-row gap-3">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-1 rounded-2xl bg-[#F5EDE3] py-4">
            <Text className="text-center font-outfitMedium text-[16px] text-[#2E2117]">
              New Scan
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(main)')}
            className="flex-1 rounded-2xl bg-[#2E2117] py-4">
            <Text className="text-center font-outfitMedium text-[16px] text-white">Done</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
