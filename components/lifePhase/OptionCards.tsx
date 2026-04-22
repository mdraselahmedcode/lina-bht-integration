// components/lifePhase/OptionCards.tsx
import React from 'react';
import { View, Text } from 'react-native';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
import { SignInCuttedCircleIcon, WaveInHeartIcon } from '@/components/icons';

interface OptionCardsProps {
  onSelectNone: () => void;
  onSelectIssues: () => void;
}

export const OptionCards: React.FC<OptionCardsProps> = ({ onSelectNone, onSelectIssues }) => {
  return (
    <>
      <BorderlessShadowCard
        onPress={onSelectNone}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          paddingVertical: 14,
          paddingHorizontal: 24,
          marginBottom: 12,
          borderTopWidth: 1.1,
          borderLeftWidth: 1.5,
          borderRightWidth: 1,
          borderBottomWidth: 1,
          borderTopColor: 'rgba(255, 255, 255, 0.7)',
          borderLeftColor: 'rgba(255, 255, 255, 0.8)',
          borderRightColor: 'rgba(255, 255, 255, 0)',
          borderBottomColor: 'rgba(255, 255, 255, 0)',
        }}>
        <View className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2E21170D]">
          <SignInCuttedCircleIcon size={18} color="#361A0D" />
        </View>
        <View>
          <Text className="font-outfitMedium text-[16px] text-[#361A0D]">None</Text>
          <Text className="font-outfit text-[12px] text-[#2E2117A3]">
            No health conditions to report
          </Text>
        </View>
      </BorderlessShadowCard>

      <BorderlessShadowCard
        onPress={onSelectIssues}
        b_tl={0}
        b_tr={0}
        b_bl={24}
        b_br={24}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          paddingVertical: 14,
          paddingHorizontal: 24,
          borderTopWidth: 1.1,
          borderLeftWidth: 1.5,
          borderRightWidth: 1,
          borderBottomWidth: 1,
          borderTopColor: 'rgba(255, 255, 255, 0.7)',
          borderLeftColor: 'rgba(255, 255, 255, 0.8)',
          borderRightColor: 'rgba(255, 255, 255, 0)',
          borderBottomColor: 'rgba(255, 255, 255, 0)',
        }}>
        <View className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2E21170D]">
          <WaveInHeartIcon size={18} color="#361A0D" />
        </View>
        <View>
          <Text className="font-outfitMedium text-[16px] text-[#361A0D]">I have issues</Text>
          <Text className="font-outfit text-[12px] text-[#2E2117A3]">
            Select your health concerns below
          </Text>
        </View>
      </BorderlessShadowCard>
    </>
  );
};
