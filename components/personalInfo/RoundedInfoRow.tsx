// components/personalInfo/RoundedInfoRow.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';

interface RoundedInfoRowProps {
  label: string;
  value: string;
  onPress?: () => void;
  isEditable?: boolean;
  isEditing: boolean;
  borderRadius?: number;
  topRounded?: boolean;
  bottomRounded?: boolean;
}

export const RoundedInfoRow: React.FC<RoundedInfoRowProps> = ({
  label,
  value,
  onPress,
  isEditable = true,
  isEditing,
  borderRadius = 100,
  topRounded = true,
  bottomRounded = true,
}) => {
  return (
    <TouchableOpacity
      onPress={isEditable && isEditing ? onPress : undefined}
      activeOpacity={isEditable && isEditing ? 0.7 : 1}
      disabled={!isEditing}>
      <BorderlessShadowCard
        b_tl={topRounded ? borderRadius : 0}
        b_tr={topRounded ? borderRadius : 0}
        b_bl={bottomRounded ? borderRadius : 0}
        b_br={bottomRounded ? borderRadius : 0}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 24,
          backgroundColor: isEditing ? '#F0E6D8' : '#E8DDD0',
          borderWidth: 2,
          borderColor: isEditing ? '#FFFFFF' : 'transparent',
        }}>
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="font-outfit text-[12px]" style={{ color: '#2E211766' }}>
              {label}
            </Text>
            <Text className="mt-1 font-outfit text-[16px]" style={{ color: '#2E2117' }}>
              {value}
            </Text>
          </View>
          {isEditing && (
            <View className="ml-2">
              <Ionicons name="chevron-down" size={18} color="#361A0D" />
            </View>
          )}
        </View>
      </BorderlessShadowCard>
    </TouchableOpacity>
  );
};
