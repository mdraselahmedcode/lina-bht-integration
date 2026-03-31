// screens/home/components/SkinHealthCard.tsx
import React from 'react';
import { View, Text } from 'react-native';
import ShadowCard from '@/components/cards/ShadowCard';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
import CircularProgress from '@/components/home/CircularProgress';
import HeaderPrimary from '@/components/texts/HeaderPrimary';
import Subtitle from '@/components/texts/Subtitle';
import { SkinMetric } from '@/types/home';

interface SkinHealthCardProps {
  score: number;
  description: string;
  metrics: SkinMetric[];
}

export const SkinHealthCard: React.FC<SkinHealthCardProps> = ({ score, description, metrics }) => {
  return (
    <ShadowCard style={{ borderBottomColor: '#FFFFFF66', borderBottomWidth: 2 }}>
      <View className="flex-row items-center gap-7">
        <CircularProgress progress={score} />
        <View className="flex-1">
          <HeaderPrimary text="Skin Health" style={{ color: '#2A2118' }} />
          <Subtitle style={{ color: '#2A2118CC', fontSize: 16 }} text={description} />
        </View>
      </View>

      <View className="mt-6 flex-row items-center gap-4">
        {metrics.map((metric) => (
          <View key={metric.id} className="flex-1">
            <BorderlessShadowCard b_bl={12} b_br={12} b_tl={12} b_tr={12}>
              <View className="flex-row items-center justify-center gap-1">
                <View
                  className="h-[10] w-[10] rounded-full"
                  style={{ backgroundColor: metric.color }}
                />
                <Text className="font-outfitMedium text-[12px] text-[#2A211899]">
                  {metric.label}
                </Text>
              </View>
              <Text className="mt-3 text-center font-outfitMedium text-[16px]">{metric.value}</Text>
            </BorderlessShadowCard>
          </View>
        ))}
      </View>
    </ShadowCard>
  );
};
