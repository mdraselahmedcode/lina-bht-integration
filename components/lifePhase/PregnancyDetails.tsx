// components/lifePhase/PregnancyDetails.tsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import { CircularIconButton } from '@/components/buttons/CircularIconButton';
import { MinusIcon, PlusIcon, SecureIcon } from '@/components/icons';

interface PregnancyDetailsProps {
  pregnancyMonth: number;
  onMonthChange: (increment: boolean) => void;
  onMonthSelect: (month: number) => void;
}

export const PregnancyDetails: React.FC<PregnancyDetailsProps> = ({
  pregnancyMonth,
  onMonthChange,
  onMonthSelect,
}) => {
  return (
    <View className="mt-6">
      <Text className="font-outfit text-[18px]" style={{ color: '#361A0D' }}>
        Pregnancy Details
      </Text>
      <Text className="font-outfit text-[14px] text-[#2E2117A3]">
        How many months pregnant are you?
      </Text>

      <PrimaryButton
        leftIcon={
          <SecureIcon size={24} color="#F59E0B" style={{ marginRight: 6, marginLeft: 8 }} />
        }
        style={{ marginTop: 12, justifyContent: 'center' }}
        textStyle={{ fontSize: 12, fontFamily: 'Outfit-Regular', color: '#B45309CC' }}
        title="We'll avoid pregnancy-unsafe ingredients."
      />

      <View className="mt-6 flex-row items-center justify-between">
        <CircularIconButton
          onPress={() => onMonthChange(false)}
          size={56}
          icon={<MinusIcon width={24} height={4} color="#361A0D" />}
        />
        <View className="items-center justify-center px-4">
          <Text className="font-outfitMedium text-[36px]" style={{ color: '#2E2117' }}>
            {pregnancyMonth}
          </Text>
          <Text className="font-outfitMedium text-[16px]" style={{ color: '#2E2117' }}>
            Month{pregnancyMonth !== 1 ? 's' : ''}
          </Text>
        </View>
        <CircularIconButton
          onPress={() => onMonthChange(true)}
          size={56}
          icon={<PlusIcon size={34} color="#361A0D" />}
        />
      </View>

      {/* Month Dots - Horizontally Centered */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-6"
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View className="flex-row items-center justify-center gap-3 px-4">
          {Array.from({ length: 9 }).map((_, index) => {
            const month = index + 1;
            const isActive = pregnancyMonth === month;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => onMonthSelect(month)}
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: 20,
                  backgroundColor: isActive ? '#361A0D' : '#977857',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* <Text
                  style={{
                    color: isActive ? '#FFFFFF' : '#361A0D',
                    fontFamily: 'Outfit-Medium',
                    fontSize: 14,
                  }}>
                  {month}
                </Text> */}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
