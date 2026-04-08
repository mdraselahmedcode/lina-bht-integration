// components/progress/TabFilter.tsx
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
import { TabType } from '@/types/progress';

interface TabFilterProps {
  activeTab: TabType;
  onSelect: (tab: TabType) => void;
}

export const TabFilter: React.FC<TabFilterProps> = ({ activeTab, onSelect }) => {
  return (
    <BorderlessShadowCard
      b_tl={24}
      b_tr={24}
      b_bl={0}
      b_br={0}
      style={{
        paddingVertical: 20,
        paddingHorizontal: 24,
        marginBottom: 16,
      }}>
      <View className="flex-row gap-4">
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => onSelect('analytics')}
          style={{ flex: 1 }}>
          <BorderlessShadowCard
            b_tl={6}
            b_tr={6}
            b_bl={6}
            b_br={6}
            style={{
              paddingVertical: 8,
              alignItems: 'center',
              backgroundColor: activeTab === 'analytics' ? '#F0E6D8' : '#E8DDD0',
            }}>
            <Text
              className="font-outfitMedium text-[14px]"
              style={{ color: activeTab === 'analytics' ? '#7A8B6A' : '#2E211780' }}>
              Analytics
            </Text>
          </BorderlessShadowCard>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => onSelect('beforeAfter')}
          style={{ flex: 1 }}>
          <BorderlessShadowCard
            b_tl={6}
            b_tr={6}
            b_bl={6}
            b_br={6}
            style={{
              paddingVertical: 8,
              alignItems: 'center',
              backgroundColor: activeTab === 'beforeAfter' ? '#F0E6D8' : '#E8DDD0',
            }}>
            <Text
              className="font-outfitMedium text-[14px]"
              style={{ color: activeTab === 'beforeAfter' ? '#7A8B6A' : '#2E211780' }}>
              Before & After
            </Text>
          </BorderlessShadowCard>
        </TouchableOpacity>
      </View>
    </BorderlessShadowCard>
  );
};
