import React from 'react';
import { View, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';

type SocialProvider = {
  id: string;
  icon: ImageSourcePropType;
  onPress?: () => void;
};

type Props = {
  providers: SocialProvider[];
};

export default function SocialAuthDivider({ providers }: Props) {
  return (
    <View className="my-6 w-full flex-row items-center">
      {/* Left divider */}
      <View className="bg-inputborder/50 h-[1px] flex-1" />

      {/* Social buttons */}
      <View className="mx-4 flex-row gap-5">
        {providers.map((provider) => (
          <TouchableOpacity
            key={provider.id}
            activeOpacity={0.7}
            onPress={provider.onPress}
            className="h-[57px] w-[57px] items-center justify-center rounded-full bg-gray-200">
            <Image source={provider.icon} className="h-8 w-8" resizeMode="contain" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Right divider */}
      <View className="bg-inputborder/50 h-[1px] flex-1" />
    </View>
  );
}
