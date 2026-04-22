// // components/buttons/CheckIconButton.tsx
// import React, { useEffect } from 'react';
// import { TouchableOpacity } from 'react-native';
// import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';
// import {
//   CircleCornerCuttedIcon,
//   SignInCircleWithFillIcon,
//   SignInCuttedCircleIcon,
// } from '@/components/icons';

// interface CheckIconButtonProps {
//   value: boolean;
//   onValueChange: (value: boolean) => void;
//   activeColor?: string;
//   inactiveColor?: string;
//   size?: number;
// }

// export const CheckIconButton: React.FC<CheckIconButtonProps> = ({
//   value,
//   onValueChange,
//   activeColor = '#759A52',
//   inactiveColor = '#361A0D',
//   size = 24,
// }) => {
//   const scale = useSharedValue(value ? 1 : 0);

//   // Update the scale when value prop changes
//   useEffect(() => {
//     scale.value = withSpring(value ? 1 : 0, {
//       damping: 15,
//       stiffness: 100,
//     });
//   }, [value, scale]);

//   const handlePress = () => {
//     onValueChange(!value);
//   };

//   const iconScaleStyle = useAnimatedStyle(() => ({
//     transform: [{ scale: scale.value }],
//   }));

//   return (
//     <TouchableOpacity
//       onPress={handlePress}
//       activeOpacity={0.7}
//       style={{
//         width: size,
//         height: size,
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}>
//       {/* Default icon (unchecked state) */}
//       <Animated.View style={{ position: 'absolute', opacity: value ? 0 : 1 }}>
//         <CircleCornerCuttedIcon size={size} color={inactiveColor} />
//       </Animated.View>

//       {/* Selected icon (checked state) with scale animation */}
//       <Animated.View style={[iconScaleStyle, { position: 'absolute' }]}>
//         {/* <SignInCircleWithFillIcon size={size} color={activeColor} /> */}
//         <SignInCuttedCircleIcon size={size} color={inactiveColor} />
//       </Animated.View>
//     </TouchableOpacity>
//   );
// };
import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';
import { CircleCornerCuttedIcon, SignInCuttedCircleIcon } from '@/components/icons';

interface CheckIconButtonProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  activeColor?: string;
  inactiveColor?: string;
  size?: number;
  marginLeft?: number;
  marginRight?: number;
}

export const CheckIconButton: React.FC<CheckIconButtonProps> = ({
  value,
  onValueChange,
  activeColor = '#679838',
  inactiveColor = '#361A0D',
  size = 24,
  marginRight = 0,
  marginLeft = 0,
}) => {
  const opacity = useSharedValue(value ? 1 : 0);

  // Trigger the fade when value changes
  useEffect(() => {
    opacity.value = withTiming(value ? 1 : 0, {
      duration: 250, // Smooth transition speed
    });
  }, [value]);

  const handlePress = () => {
    onValueChange(!value);
  };

  // Style for the checked icon (fades in)
  const checkedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  // Style for the unchecked icon (fades out)
  const uncheckedStyle = useAnimatedStyle(() => ({
    opacity: 1 - opacity.value,
  }));

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={{
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {/* Unchecked State Icon */}
      <Animated.View style={[uncheckedStyle, { position: 'absolute' }]}>
        <CircleCornerCuttedIcon
          size={size}
          color={inactiveColor}
          style={{ marginRight: marginRight, marginLeft: marginLeft }}
        />
      </Animated.View>

      {/* Checked State Icon */}
      <Animated.View style={[checkedStyle, { position: 'absolute' }]}>
        <SignInCuttedCircleIcon
          size={size}
          color={activeColor}
          style={{ marginRight: marginRight, marginLeft: marginLeft }}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};
