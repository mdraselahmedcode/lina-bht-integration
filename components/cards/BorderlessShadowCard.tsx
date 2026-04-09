import React from 'react';
import { View, ViewStyle, StyleProp, Platform, TouchableOpacity } from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  className?: string;
  b_tl?: number;
  b_tr?: number;
  b_bl?: number;
  b_br?: number;

  // ✅ NEW
  onPress?: () => void;
  disabled?: boolean;
  activeOpacity?: number;
};

export default function BorderlessShadowCard({
  children,
  style,
  className,
  b_tl = 24,
  b_tr = 24,
  b_bl = 0,
  b_br = 0,
  onPress,
  disabled = false,
  activeOpacity = 0.9,
}: Props) {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      {...(onPress && {
        onPress,
        activeOpacity,
        disabled,
      })}
      className={`bg-[#F0E6D8] ${className ?? ''}`}
      style={[
        {
          borderTopLeftRadius: b_tl,
          borderTopRightRadius: b_tr,
          borderBottomLeftRadius: b_bl,
          borderBottomRightRadius: b_br,

          paddingHorizontal: 12,
          paddingVertical: 21,

          // Shadow
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 3, height: 3 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
            },
            android: {
              elevation: 4,
            },
          }),
        },
        style,
      ]}>
      {children}
    </Container>
  );
}
