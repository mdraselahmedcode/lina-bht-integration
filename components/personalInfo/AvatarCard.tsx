// components/personalInfo/AvatarCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
import { Avatar } from '@/components/ui/Avatar';

interface AvatarCardProps {
  isEditing: boolean;
  onPress: () => void;
}

export const AvatarCard: React.FC<AvatarCardProps> = ({ isEditing, onPress }) => (
  <BorderlessShadowCard
    style={{
      paddingVertical: 24,
      paddingHorizontal: 24,
      alignItems: 'center',
    }}>
    <TouchableOpacity onPress={onPress} disabled={!isEditing} activeOpacity={0.7}>
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 4, height: 5 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 8,
          borderRadius: 999,
          borderWidth: 2,
          borderColor: '#759A52',
        }}>
        <Avatar
          source="https://randomuser.me/api/portraits/women/64.jpg"
          size={102}
          fallbackIcon="person-circle"
          iconColor="#361A0D"
          backgroundColor="#E5E0D8"
        />
      </View>
      {isEditing && (
        <View className="absolute bottom-0 right-0 rounded-full bg-[#7A8B6A] p-2">
          <Ionicons name="camera" size={14} color="#FFFFFF" />
        </View>
      )}
    </TouchableOpacity>
    <Text className="mt-3 font-outfitMedium text-[16px]" style={{ color: '#2A2118' }}>
      {isEditing ? 'Tap to change photo' : 'Upload Photo'}
    </Text>
  </BorderlessShadowCard>
);
