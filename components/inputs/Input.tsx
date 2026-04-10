// components/inputs/Input.tsx
import React, { useState } from 'react';
import { KeyboardType, TextInput, TextStyle, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Shadow } from 'react-native-shadow-2';
import InputLabel from '../texts/InputLabel';

interface InputFieldProps {
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
  multiline?: boolean;
  numberOfLines?: number;
  secureTextEntry?: boolean;
  withShadow?: boolean;
  height?: number;
  gradientColors?: readonly [string, string, ...string[]];

  // Border radius customization (optional - won't affect existing usage)
  borderRadius?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
}

export default function InputField({
  keyboard = 'default',
  style,
  inputStyle,
  placeHolder = 'Please enter',
  label = 'Enter your',
  error = false,
  handler,
  value,
  name,
  required = true,
  showLabel = false,
  onBlur,
  multiline = false,
  numberOfLines = 1,
  secureTextEntry = false,
  withShadow = true,
  height = 56,
  gradientColors = ['#ede4d9', '#ede4d9'],

  borderRadius, // New - optional
  borderTopLeftRadius, // New - optional
  borderTopRightRadius, // New - optional
  borderBottomLeftRadius, // New - optional
  borderBottomRightRadius, // New - optional
}: InputFieldProps) {
  const [focused, setFocused] = useState(false);

  // Calculate final border radius values (maintain backward compatibility)
  const getBorderRadius = () => {
    if (borderRadius !== undefined) {
      // If new borderRadius is provided, use it for all corners
      return {
        topLeft: borderRadius,
        topRight: borderRadius,
        bottomLeft: borderRadius,
        bottomRight: borderRadius,
      };
    }
    // Default to 100 (rounded) for backward compatibility
    return {
      topLeft: borderTopLeftRadius ?? 100,
      topRight: borderTopRightRadius ?? 100,
      bottomLeft: borderBottomLeftRadius ?? 100,
      bottomRight: borderBottomRightRadius ?? 100,
    };
  };

  const radius = getBorderRadius();

  // Get border colors based on state
  const getBorderColors = () => {
    if (error) {
      return {
        top: 'rgba(255, 255, 255, 1)',
        left: 'rgba(255, 255, 255, 1)',
        right: 'rgba(255, 255, 255, 1)',
        bottom: 'rgba(255, 255, 255, 1)',
      };
    }
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
            color: error ? '#FF4444' : focused ? '#361A0D' : '#323135',
            marginBottom: 8,
            fontWeight: '500',
          }}
          text={label}
        />
      )}

      <LinearGradient
        colors={gradientColors}
        start={{ x: 0.14, y: 0 }}
        end={{ x: 0.85, y: 1 }}
        style={{
          height: height,
          borderTopLeftRadius: radius.topLeft,
          borderTopRightRadius: radius.topRight,
          borderBottomLeftRadius: radius.bottomLeft,
          borderBottomRightRadius: radius.bottomRight,
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
          value={value}
          style={{
            color: '#4A3F35',
            fontSize: 16,
            paddingHorizontal: 24,
            paddingVertical: multiline ? 14 : 14,
            borderRadius: radius.topLeft, // Match the input's internal border radius
            minHeight: multiline ? 100 : 56,
            textAlignVertical: multiline ? 'top' : 'center',
            fontFamily: 'Outfit-Regular',
            ...inputStyle,
          }}
          placeholder={placeHolder}
          placeholderTextColor="#83735A"
          keyboardType={keyboard as KeyboardType}
          onChangeText={(text) => handler?.(name as string, text)}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          secureTextEntry={secureTextEntry}
        />
      </LinearGradient>
    </View>
  );

  if (!withShadow) {
    return <View style={style}>{InputContent}</View>;
  }

  // Multi-layer shadow matching button design
  return (
    <View style={style}>
      <Shadow
        stretch
        distance={8}
        startColor="rgba(0, 0, 0, 0.03)"
        endColor="rgba(0, 0, 0, 0)"
        offset={[2, 4]}
        containerStyle={{ width: '100%' }}
        style={{
          borderTopLeftRadius: radius.topLeft,
          borderTopRightRadius: radius.topRight,
          borderBottomLeftRadius: radius.bottomLeft,
          borderBottomRightRadius: radius.bottomRight,
        }}>
        <Shadow
          stretch
          distance={5}
          startColor="rgba(0, 0, 0, 0.07)"
          endColor="rgba(0, 0, 0, 0)"
          offset={[1.8, 3.2]}
          containerStyle={{ width: '100%' }}
          style={{
            borderTopLeftRadius: radius.topLeft,
            borderTopRightRadius: radius.topRight,
            borderBottomLeftRadius: radius.bottomLeft,
            borderBottomRightRadius: radius.bottomRight,
          }}>
          <Shadow
            stretch
            distance={2.5}
            startColor="rgba(0, 0, 0, 0.1)"
            endColor="rgba(0, 0, 0, 0)"
            offset={[1.2, 2.2]}
            containerStyle={{ width: '100%' }}
            style={{
              borderTopLeftRadius: radius.topLeft,
              borderTopRightRadius: radius.topRight,
              borderBottomLeftRadius: radius.bottomLeft,
              borderBottomRightRadius: radius.bottomRight,
            }}>
            <Shadow
              stretch
              distance={1}
              startColor="rgba(0, 0, 0, 0.15)"
              endColor="rgba(0, 0, 0, 0)"
              offset={[0.8, 1.5]}
              containerStyle={{ width: '100%' }}
              style={{
                borderTopLeftRadius: radius.topLeft,
                borderTopRightRadius: radius.topRight,
                borderBottomLeftRadius: radius.bottomLeft,
                borderBottomRightRadius: radius.bottomRight,
              }}>
              {InputContent}
            </Shadow>
          </Shadow>
        </Shadow>
      </Shadow>
    </View>
  );
}
