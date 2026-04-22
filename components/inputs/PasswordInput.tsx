// import React, { useState } from 'react';
// import {
//   KeyboardType,
//   TextInput,
//   TextStyle,
//   TouchableOpacity,
//   View,
//   ViewStyle,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Shadow } from 'react-native-shadow-2';
// import InputLabel from '../texts/InputLabel';
// import { EyeCloseIcon, EyeOpenIcon } from '../icons';

// interface PasswordInputProps {
//   keyboard?: string;
//   style?: ViewStyle;
//   inputStyle?: TextStyle;
//   placeHolder?: string;
//   label?: string;
//   error?: boolean;
//   handler?: (name: string, value: string) => void;
//   value?: string;
//   name?: string;
//   required?: boolean;
//   showLabel?: boolean;
//   onBlur?: (value: string) => void;
//   withShadow?: boolean;
//   gradientColors?: readonly [string, string, ...string[]];
//   iconColor?: string;
//   iconSize?: number;
//   height?: number;
// }

// export default function PasswordInput({
//   keyboard = 'default',
//   style,
//   inputStyle,
//   placeHolder = 'Enter your password',
//   label = 'Password',
//   error = false,
//   handler,
//   value,
//   name,
//   required = true,
//   showLabel = false,
//   onBlur,
//   withShadow = true,
//   gradientColors = ['#ede4d9', '#ede4d9', '#ede4d9'],
//   iconColor = '#78531880',
//   iconSize = 24,
//   height = 56,
// }: PasswordInputProps) {
//   const [focused, setFocused] = useState(false);
//   const [showPassword, setShowPassword] = useState(true);

//   // Get border colors based on state
//   const getBorderColors = () => {
//     // if (error) {
//     //   return {
//     //     top: 'rgba(255, 0, 0, 0.21)',
//     //     left: 'rgba(255, 0, 0, 0.21)',
//     //     right: 'rgba(255, 0, 0, 0.21)',
//     //     bottom: 'rgba(255, 0, 0, 0.21)',
//     //   };
//     // }
//     if (focused) {
//       return {
//         top: 'rgba(255, 255, 255, 1)',
//         left: 'rgba(255, 255, 255, 1)',
//         right: 'rgba(255, 255, 255, 1)',
//         bottom: 'rgba(255, 255, 255, 1)',
//       };
//     }
//     return {
//       top: 'rgba(255, 255, 255, 1)',
//       left: 'rgba(255, 255, 255, 1)',
//       right: 'rgba(255, 255, 255, 1)',
//       bottom: 'rgba(255, 255, 255, 1)',
//     };
//   };

//   const borderColors = getBorderColors();

//   const InputContent = (
//     <View>
//       {showLabel && (
//         <InputLabel
//           style={{
//             color: error ? '#FF4444' : focused ? '#361A0D' : '#4A3F35',
//             marginBottom: 8,
//             fontWeight: '500',
//           }}
//           text={label}
//         />
//       )}

//       <View style={{ position: 'relative' }}>
//         <LinearGradient
//           colors={gradientColors}
//           start={{ x: 0.14, y: 0 }}
//           end={{ x: 0.85, y: 1 }}
//           style={{
//             height: height,
//             borderRadius: 100,
//             borderTopWidth: 2,
//             borderLeftWidth: 2,
//             borderRightWidth: 2,
//             borderBottomWidth: 2,
//             borderTopColor: borderColors.top,
//             borderLeftColor: borderColors.left,
//             borderRightColor: borderColors.right,
//             borderBottomColor: borderColors.bottom,
//           }}>
//           <TextInput
//             onFocus={() => setFocused(true)}
//             onBlur={() => {
//               setFocused(false);
//               onBlur?.(value + '');
//             }}
//             secureTextEntry={showPassword}
//             value={value}
//             style={{
//               color: '#4A3F35',
//               fontSize: 16,
//               paddingHorizontal: 24,
//               paddingVertical: 14,
//               borderRadius: 100,
//               minHeight: 56,
//               textAlignVertical: 'center',
//               fontFamily: 'Outfit-Regular',
//               paddingRight: iconSize + 32, // Space for eye icon
//               ...inputStyle,
//             }}
//             placeholder={placeHolder}
//             placeholderTextColor="#83735A"
//             keyboardType={keyboard as KeyboardType}
//             onChangeText={(text) => handler?.(name as string, text)}
//           />
//         </LinearGradient>

//         {/* Eye Icon Button */}
//         <TouchableOpacity
//           style={{
//             position: 'absolute',
//             right: 20,
//             top: '50%',
//             transform: [{ translateY: -iconSize / 2 }], // Center vertically
//             zIndex: 10,
//           }}
//           activeOpacity={0.7}
//           onPress={() => setShowPassword(!showPassword)}>
//           {showPassword ? (
//             <EyeCloseIcon size={iconSize} color={iconColor} />
//           ) : (
//             <EyeOpenIcon size={iconSize} color={iconColor} />
//           )}
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   if (!withShadow) {
//     return <View style={style}>{InputContent}</View>;
//   }

//   // Multi-layer shadow matching button design
//   return (
//     <View style={style}>
//       <Shadow
//         stretch
//         distance={8}
//         startColor="rgba(0, 0, 0, 0.03)"
//         endColor="rgba(0, 0, 0, 0)"
//         offset={[2, 4]}
//         containerStyle={{ width: '100%' }}
//         style={{ borderRadius: 100 }}>
//         <Shadow
//           stretch
//           distance={5}
//           startColor="rgba(0, 0, 0, 0.07)"
//           endColor="rgba(0, 0, 0, 0)"
//           offset={[1.8, 3.2]}
//           containerStyle={{ width: '100%' }}
//           style={{ borderRadius: 100 }}>
//           <Shadow
//             stretch
//             distance={2.5}
//             startColor="rgba(0, 0, 0, 0.1)"
//             endColor="rgba(0, 0, 0, 0)"
//             offset={[1.2, 2.2]}
//             containerStyle={{ width: '100%' }}
//             style={{ borderRadius: 100 }}>
//             <Shadow
//               stretch
//               distance={1}
//               startColor="rgba(0, 0, 0, 0.15)"
//               endColor="rgba(0, 0, 0, 0)"
//               offset={[0.8, 1.5]}
//               containerStyle={{ width: '100%' }}
//               style={{ borderRadius: 100 }}>
//               {InputContent}
//             </Shadow>
//           </Shadow>
//         </Shadow>
//       </Shadow>
//     </View>
//   );
// }

import React, { useState, useEffect } from 'react';
import {
  KeyboardType,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Shadow } from 'react-native-shadow-2';
import InputLabel from '../texts/InputLabel';
import { EyeCloseIcon, EyeOpenIcon } from '../icons';

interface PasswordInputProps {
  keyboard?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  placeHolder?: string;
  label?: string;
  error?: boolean;
  handler?: (name: string, value: string) => void;
  value?: string;
  name?: string;
  required?: boolean;
  showLabel?: boolean;
  onBlur?: (value: string) => void;
  withShadow?: boolean;
  gradientColors?: readonly [string, string, ...string[]];
  iconColor?: string;
  iconSize?: number;
  height?: number;
  // Animation props
  animated?: boolean;
  initialOpacity?: number;
  animationDuration?: number;
}

export default function PasswordInput({
  keyboard = 'default',
  style,
  inputStyle,
  placeHolder = 'Enter your password',
  label = 'Password',
  error = false,
  handler,
  value,
  name,
  required = true,
  showLabel = false,
  onBlur,
  withShadow = true,
  gradientColors = ['#ede4d9', '#ede4d9', '#ede4d9'],
  iconColor = '#78531880',
  iconSize = 24,
  height = 56,
  animated = false,
  initialOpacity = 0,
  animationDuration = 200,
}: PasswordInputProps) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [opacityAnim] = useState(new Animated.Value(initialOpacity));

  useEffect(() => {
    if (animated) {
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }).start();
    } else {
      opacityAnim.setValue(1);
    }
  }, [animated, animationDuration]);

  // Get border colors based on state
  const getBorderColors = () => {
    if (focused) {
      return {
        top: 'rgba(255, 255, 255, 1)',
        left: 'rgba(255, 255, 255, 1)',
        right: 'rgba(255, 255, 255, 1)',
        bottom: 'rgba(255, 255, 255, 1)',
      };
    }
    return {
      top: 'rgba(255, 255, 255, 1)',
      left: 'rgba(255, 255, 255, 1)',
      right: 'rgba(255, 255, 255, 1)',
      bottom: 'rgba(255, 255, 255, 1)',
    };
  };

  const borderColors = getBorderColors();

  const InputContent = (
    <View>
      {showLabel && (
        <InputLabel
          style={{
            color: error ? '#FF4444' : focused ? '#361A0D' : '#4A3F35',
            marginBottom: 8,
            fontWeight: '500',
          }}
          text={label}
        />
      )}

      <View style={{ position: 'relative' }}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0.14, y: 0 }}
          end={{ x: 0.85, y: 1 }}
          style={{
            height: height,
            borderRadius: 100,
            borderTopWidth: 2,
            borderLeftWidth: 2,
            borderRightWidth: 2,
            borderBottomWidth: 2,
            borderTopColor: borderColors.top,
            borderLeftColor: borderColors.left,
            borderRightColor: borderColors.right,
            borderBottomColor: borderColors.bottom,
          }}>
          <TextInput
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false);
              onBlur?.(value + '');
            }}
            secureTextEntry={showPassword}
            value={value}
            style={{
              color: '#4A3F35',
              fontSize: 16,
              paddingHorizontal: 24,
              paddingVertical: 14,
              borderRadius: 100,
              minHeight: 56,
              textAlignVertical: 'center',
              fontFamily: 'Outfit-Regular',
              paddingRight: iconSize + 32,
              ...inputStyle,
            }}
            placeholder={placeHolder}
            placeholderTextColor="#83735A"
            keyboardType={keyboard as KeyboardType}
            onChangeText={(text) => handler?.(name as string, text)}
          />
        </LinearGradient>

        {/* Eye Icon Button */}
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 20,
            top: '50%',
            transform: [{ translateY: -iconSize / 2 }],
            zIndex: 10,
          }}
          activeOpacity={0.7}
          onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <EyeCloseIcon size={iconSize} color={iconColor} />
          ) : (
            <EyeOpenIcon size={iconSize} color={iconColor} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  const shadowInput = (
    <Shadow
      stretch
      distance={8}
      startColor="rgba(0, 0, 0, 0.03)"
      endColor="rgba(0, 0, 0, 0)"
      offset={[2, 4]}
      containerStyle={{ width: '100%' }}
      style={{ borderRadius: 100 }}>
      <Shadow
        stretch
        distance={5}
        startColor="rgba(0, 0, 0, 0.07)"
        endColor="rgba(0, 0, 0, 0)"
        offset={[1.8, 3.2]}
        containerStyle={{ width: '100%' }}
        style={{ borderRadius: 100 }}>
        <Shadow
          stretch
          distance={2.5}
          startColor="rgba(0, 0, 0, 0.1)"
          endColor="rgba(0, 0, 0, 0)"
          offset={[1.2, 2.2]}
          containerStyle={{ width: '100%' }}
          style={{ borderRadius: 100 }}>
          <Shadow
            stretch
            distance={1}
            startColor="rgba(0, 0, 0, 0.15)"
            endColor="rgba(0, 0, 0, 0)"
            offset={[0.8, 1.5]}
            containerStyle={{ width: '100%' }}
            style={{ borderRadius: 100 }}>
            {InputContent}
          </Shadow>
        </Shadow>
      </Shadow>
    </Shadow>
  );

  const AnimatedInputContent = animated ? (
    <Animated.View style={{ opacity: opacityAnim }}>{shadowInput}</Animated.View>
  ) : (
    shadowInput
  );

  if (!withShadow) {
    return (
      <View style={style}>
        {animated ? (
          <Animated.View style={{ opacity: opacityAnim }}>{InputContent}</Animated.View>
        ) : (
          InputContent
        )}
      </View>
    );
  }

  return <View style={style}>{AnimatedInputContent}</View>;
}
