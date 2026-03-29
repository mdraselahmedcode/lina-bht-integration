import React from 'react';
import { StyleProp } from 'react-native';
import { View, ViewStyle } from 'react-native';

type IconBadgeProps = {
  icon: React.ReactNode;
  size?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

export default function IconBadge({ icon, size = 48, className = '', style }: IconBadgeProps) {
  return (
    <View
      style={[{ width: size, height: size }, style]}
      className={`items-center justify-center rounded-[49px] border-[2px] border-[#FFFFFF4D] bg-[#95B287A3]  ${className}`}>
      {icon}
    </View>
  );
}
