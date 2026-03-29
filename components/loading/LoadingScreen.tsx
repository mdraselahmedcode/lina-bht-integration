// components/loading/LoadingScreen.tsx
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

interface LoadingScreenProps {
  backgroundColor?: string;
  loaderColor?: string;
}

export default function LoadingScreen({
  backgroundColor = '#E8DDD0',
  loaderColor = '#95B287',
}: LoadingScreenProps) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor,
      }}>
      <ActivityIndicator size="large" color={loaderColor} />
    </View>
  );
}
