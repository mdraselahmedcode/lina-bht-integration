// components/progress/BeforeAfterCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
import { BeforeAfterItem } from '@/types/progress';

interface BeforeAfterCardProps {
  item: BeforeAfterItem;
  isFirst: boolean;
  isLast: boolean;
  onImagePress: (imageUrl: string) => void;
}

export const BeforeAfterCard: React.FC<BeforeAfterCardProps> = ({
  item,
  isFirst,
  isLast,
  onImagePress,
}) => {
  return (
    <BorderlessShadowCard
      b_tl={isFirst ? 0 : 0}
      b_tr={isFirst ? 0 : 0}
      b_bl={isLast ? 24 : 0}
      b_br={isLast ? 24 : 0}
      style={{
        paddingVertical: 16,
        paddingHorizontal: 16,
      }}>
      <Text className="mb-3 text-center font-outfitMedium text-[14px]" style={{ color: '#2E2117' }}>
        {item.date}
      </Text>

      <View className="flex-row justify-between gap-4">
        {/* Before Image */}
        <TouchableOpacity
          onPress={() => onImagePress(item.before)}
          activeOpacity={0.9}
          className="flex-1">
          <Text className="mb-2 text-center font-outfit text-[12px]" style={{ color: '#2E211799' }}>
            Before
          </Text>
          <View
            style={{
              height: 180,
              backgroundColor: '#F5EDE3',
              borderRadius: 12,
              overflow: 'hidden',
            }}>
            <Image
              source={{ uri: item.before }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </View>
        </TouchableOpacity>

        {/* After Image */}
        <TouchableOpacity
          onPress={() => onImagePress(item.after)}
          activeOpacity={0.9}
          className="flex-1">
          <Text className="mb-2 text-center font-outfit text-[12px]" style={{ color: '#2E211799' }}>
            After
          </Text>
          <View
            style={{
              height: 180,
              backgroundColor: '#F5EDE3',
              borderRadius: 12,
              overflow: 'hidden',
            }}>
            <Image
              source={{ uri: item.after }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Result Message */}
      <View className="mt-4">
        <Text
          className="text-center font-outfit text-[12px] leading-5"
          style={{ color: '#2E2117B2' }}>
          {item.message}
        </Text>
      </View>
    </BorderlessShadowCard>
  );
};
