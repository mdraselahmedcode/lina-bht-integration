// components/error/ErrorScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ErrorScreenProps {
  message?: string;
  onRetry?: () => void;
  backgroundColor?: string;
  buttonColor?: string;
  textColor?: string;
}

export default function ErrorScreen({
  message = 'Something went wrong. Please try again.',
  onRetry,
  backgroundColor = '#E8DDD0',
  buttonColor = '#95B287',
  textColor = '#361A0D',
}: ErrorScreenProps) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor,
        paddingHorizontal: 24,
      }}>
      <Text
        style={{
          fontSize: 16,
          fontFamily: 'Outfit-Regular',
          color: '#FF6B6B',
          textAlign: 'center',
          marginBottom: 20,
        }}>
        ⚠️ {message}
      </Text>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          style={{
            backgroundColor: buttonColor,
            paddingHorizontal: 32,
            paddingVertical: 12,
            borderRadius: 30,
          }}>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 16,
              fontFamily: 'Outfit-Medium',
            }}>
            Try Again
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
