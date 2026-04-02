// app/(flow)/face-scan/analysis-compatibility-check.tsx (Fixed scrolling)
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/header/CustomHeader';
import { LAYOUT } from '@/constants/constants';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import { LockIcon } from '@/components/icons';
import IconBadge from '@/components/icons/modified/IconBadge';
import { StarWithDoublePlusIcon } from '@/components/icons/StarWithDoublePlusIcon';
import { useRouter } from 'expo-router';

const AskingUpgradeToPremiumScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
      <CustomHeader title="Go Premium" height={50} backButton />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
          marginTop: LAYOUT.screen.scrollViewPaddingTop,
          flexGrow: 1,
        }}
        className="flex-1">
        <View className="flex-1 items-center justify-center px-container  ">
          {/* very danger */}
          <BorderlessShadowCard
            b_tl={24}
            b_tr={24}
            b_bl={24}
            b_br={24}
            style={{
              width: 123,
              height: 124,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#F0E6D8',
            }}>
            <View className="relative">
              <LockIcon size={32} color="#361A0D" />
              <IconBadge
                size={32}
                style={{
                  backgroundColor: '#FFFFFF',

                  // ✅ Bottom-right shadow
                  shadowColor: '#000',
                  shadowOffset: { width: 2, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3,
                  elevation: 4, // Android

                  position: 'absolute',
                  bottom: -20,
                  right: -24,
                }}
                icon={<StarWithDoublePlusIcon style={{}} size={16} color="#361A0D" />}
              />
            </View>
          </BorderlessShadowCard>
          <Text className="mt-6 font-outfitMedium text-[24px] " style={{ color: '#361A0D' }}>
            Premium Feature
          </Text>
          <Text
            className="mt-[6px] text-center font-outfit text-[14px] "
            style={{ color: '#2E211799' }}>
            Unlock 1-on-1 personalized skincare coaching with our advanced AI assistant.{' '}
          </Text>
          <PrimaryButton
            onPress={() => {
              router.push('/(flow)/profile/premium-plan-screen');
            }}
            title="Upgrade to Premium"
            style={{ marginTop: 64, width: '100%' }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AskingUpgradeToPremiumScreen;

const styles = StyleSheet.create({});
