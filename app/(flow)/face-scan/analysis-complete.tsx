// app/(flow)/face-scan/analysis-complete.tsx (Fixed scrolling)
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/header/CustomHeader';
import { LAYOUT } from '@/constants/constants';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
import { IInCircleIcon } from '@/components/icons/IInCircleIcon';
import CircularProgress from '@/components/home/CircularProgress';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import PillowBadge from '@/components/buttons/PillowBadge';
import { SignInCuttedCircleIcon } from '@/components/icons';

const AiAnalysisCompleteScreen = () => {
  return (
    <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
      <CustomHeader title="Analysis Complete" height={50} backButton />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
          paddingTop: 10,
          flexGrow: 1,
        }}
        className="flex-1">
        <View className="px-container">
          {/* Progress Card */}
          <BorderlessShadowCard
            style={{
              paddingVertical: 40,
              paddingHorizontal: 24,
              alignItems: 'center',
            }}>
            <CircularProgress progress={78} />
            <Text
              className="mt-6 text-center font-outfit text-[16px]"
              style={{ color: '#2A2118CC' }}>
              Your skin barrier is slightly compromised today. Focus on hydration and soothing
              ingredients.
            </Text>
          </BorderlessShadowCard>

          {/* Detected Conditions Section */}
          <View className="mt-3">
            <Text className="mb-2 text-start font-outfitMedium text-[16px] text-[#2E2117]">
              Detected Conditions
            </Text>

            {/* Mild Redness */}
            <BorderlessShadowCard
              b_tl={0}
              b_tr={0}
              b_bl={0}
              b_br={0}
              style={{
                paddingVertical: 16,
                paddingHorizontal: 24,
                marginBottom: 12,
              }}>
              <View className="flex-row items-start gap-3">
                <IInCircleIcon size={24} color="#7A5D3E" />
                <View className="flex-1">
                  <View className="flex-row items-center justify-between">
                    <Text className="font-outfitMedium text-[14px] text-[#2A2118]">
                      Mild Redness
                    </Text>
                    <PillowBadge
                      title="Medium"
                      textStyle={{ color: '#361A0D' }}
                      style={{ backgroundColor: '#CAA78933' }}
                    />
                  </View>
                  <Text className="mt-1.5 font-outfit text-[12px]" style={{ color: '#2A2118B2' }}>
                    Concentrated around the cheeks. Likely due to mild barrier compromise.
                  </Text>
                </View>
              </View>
            </BorderlessShadowCard>

            {/* Dehydration */}
            <BorderlessShadowCard
              b_tl={0}
              b_tr={0}
              b_bl={0}
              b_br={0}
              style={{
                paddingVertical: 16,
                paddingHorizontal: 24,
                marginBottom: 12,
              }}>
              <View className="flex-row items-start gap-3">
                <SignInCuttedCircleIcon size={24} color="#7A8B6A" />
                <View className="flex-1">
                  <View className="flex-row items-center justify-between">
                    <Text className="font-outfitMedium text-[14px] text-[#2A2118]">
                      Dehydration
                    </Text>
                    <PillowBadge title="Low" textStyle={{ color: '#7A8B6A' }} />
                  </View>
                  <Text className="mt-1.5 font-outfit text-[12px]" style={{ color: '#2A2118B2' }}>
                    Slight lack of moisture in the T-zone.
                  </Text>
                </View>
              </View>
            </BorderlessShadowCard>

            {/* Pores */}
            <BorderlessShadowCard
              b_tl={0}
              b_tr={0}
              b_bl={24}
              b_br={24}
              style={{
                paddingVertical: 16,
                paddingHorizontal: 24,
                marginBottom: 24,
              }}>
              <View className="flex-row items-start gap-3">
                <SignInCuttedCircleIcon size={24} color="#7A8B6A" />
                <View className="flex-1">
                  <View className="flex-row items-center justify-between">
                    <Text className="font-outfitMedium text-[14px] text-[#2A2118]">Pores</Text>
                    <PillowBadge title="Low" textStyle={{ color: '#7A8B6A' }} />
                  </View>
                  <Text className="mt-1.5 font-outfit text-[12px]" style={{ color: '#2A2118B2' }}>
                    Normal appearance, slight congestion on nose.
                  </Text>
                </View>
              </View>
            </BorderlessShadowCard>

            {/* Button */}
            <PrimaryButton
              title="View Recommended Routine"
              onPress={() => {}}
              style={{ marginBottom: 20 }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AiAnalysisCompleteScreen;

const styles = StyleSheet.create({});
