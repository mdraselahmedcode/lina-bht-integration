// components/ui/Avatar.tsx
import React from 'react';
import { View, Image, ViewStyle, StyleProp, ImageStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AvatarProps {
  source?: string; // URL or local image path
  size?: number;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  backgroundColor?: string;
  iconColor?: string;
  iconSize?: number;
  fallbackIcon?: string; // Ionicon name, e.g., 'person', 'user', 'person-circle'
  onError?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  size = 51,
  style,
  imageStyle,
  backgroundColor = '#E5E0D8',
  iconColor = '#361A0D',
  iconSize,
  fallbackIcon = 'person',
  onError,
}) => {
  const [imageError, setImageError] = React.useState(false);
  const iconDimension = iconSize || size * 0.5;

  // If there's a source and no error, show the image
  if (source && !imageError) {
    return (
      <View
        style={[
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            overflow: 'hidden',
            backgroundColor,
          },
          style,
        ]}>
        <Image
          source={{ uri: source }}
          style={[
            {
              width: '100%',
              height: '100%',
            },
            imageStyle,
          ]}
          resizeMode="cover"
          onError={() => {
            setImageError(true);
            onError?.();
          }}
        />
      </View>
    );
  }

  // Show default icon
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}>
      <Ionicons name={fallbackIcon as any} size={iconDimension} color={iconColor} />
    </View>
  );
};
