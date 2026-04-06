// components/personalInfo/InfoRow.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';

interface InfoRowProps {
  label: string;
  value: string;
  onPress?: () => void;
  isEditable?: boolean;
  isEditing: boolean;
}

export const InfoRow: React.FC<InfoRowProps> = ({
  label,
  value,
  onPress,
  isEditable = true,
  isEditing,
}) => (
  <TouchableOpacity
    onPress={isEditable && isEditing ? onPress : undefined}
    activeOpacity={isEditable && isEditing ? 0.7 : 1}
    disabled={!isEditing}>
    <BorderlessShadowCard
      b_tl={0}
      b_tr={0}
      b_bl={0}
      b_br={0}
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
          <Text className="mt-1 font-outfitMedium text-[16px]" style={{ color: '#2E2117' }}>
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
