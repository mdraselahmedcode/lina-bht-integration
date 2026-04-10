// components/buttons/OnboardingButton.tsx (More customizable)
import React from 'react';
import {
  TouchableOpacity,
  Text,
  Platform,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import IconBadge from '@/components/icons/modified/IconBadge';
import { ArrowRightIcon } from '@/components/icons';

interface OnboardingButtonProps {
  title?: string;
  onPress: () => void;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconColor?: string;
  gradientColors?: readonly [string, string, ...string[]];
  withShadow?: boolean;
  height?: number;
  borderRadius?: number;
}

export default function OnboardingButton({
  title = 'Get Started',
  onPress,
  rightIcon,
  leftIcon,
  isLoading = false,
  disabled = false,
  className = '',
  style,
  textStyle,
  iconColor = '#FFFFFF',
  gradientColors = ['#e2d2c1', '#e2d2c1'],
  withShadow = true,
  height = 64,
  borderRadius = 100,
}: OnboardingButtonProps) {
  const isDisabled = disabled || isLoading;

  const ButtonContent = (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        height,
        borderRadius,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        borderTopWidth: 1.5,
        borderLeftWidth: 1.5,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.7)',
        borderLeftColor: 'rgba(255, 255, 255, 0.6)',
        borderRightColor: 'rgba(255, 255, 255, 0.5)',
        borderBottomColor: 'rgba(255, 255, 255, 0.5)',
      }}>
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="small" color="#361A0D" />
        </View>
      ) : (
        <>
          <View style={{ width: 40, alignItems: 'flex-start' }}>{leftIcon && leftIcon}</View>

          <Text className="font-outfitMedium text-[20px]" style={[{ color: '#361A0D' }, textStyle]}>
            {title}
          </Text>

          <View style={{ width: 40, alignItems: 'flex-end' }}>
            {rightIcon ? (
              rightIcon
            ) : (
              <IconBadge icon={<ArrowRightIcon size={24} color={iconColor} />} />
            )}
          </View>
        </>
      )}
    </LinearGradient>
  );

  if (!withShadow) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.7}
        style={[{ borderRadius }, style]}
        className={className}>
        {ButtonContent}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      style={[
        {
          borderRadius,
          // Shadow for iOS
          ...(Platform.OS === 'ios' && {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 3,
          }),
          // Shadow for Android
          ...(Platform.OS === 'android' && {
            elevation: 3,
          }),
        },
        style,
      ]}
      className={className}>
      {ButtonContent}
    </TouchableOpacity>
  );
}
