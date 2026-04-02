// components/ui/AvatarWithBadge.tsx
import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import { Avatar } from './Avatar';
import { Ionicons } from '@expo/vector-icons';

interface AvatarWithBadgeProps {
  source?: string;
  size?: number;
  badgeCount?: number;
  showBadge?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const AvatarWithBadge: React.FC<AvatarWithBadgeProps> = ({
  source,
  size = 51,
  badgeCount,
  showBadge = true,
  style,
  onPress,
}) => {
  const showBadgeIndicator = showBadge && badgeCount && badgeCount > 0;

  return (
    <View style={[{ position: 'relative' }, style]}>
      <Avatar source={source} size={size} />

      {/* Badge for premium/verified */}
      {showBadgeIndicator && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: size * 0.35,
            height: size * 0.35,
            borderRadius: size * 0.175,
            backgroundColor: '#10B981',
            borderWidth: 2,
            borderColor: '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons name="checkmark" size={size * 0.2} color="#FFFFFF" />
        </View>
      )}
    </View>
  );
};
