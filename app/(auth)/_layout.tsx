// app/(auth)/_layout.tsx
import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import VectorBg from '@/components/VectorBg';

export default function AuthLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* SVG Background */}
      <VectorBg />

      {/* Stack on top */}
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: {
            backgroundColor: 'transparent', // Change to transparent
          },
        }}>
        <Stack.Screen
          name="login"
          options={{
            animation: 'slide_from_right',
            contentStyle: { backgroundColor: 'transparent' },
          }}
        />

        <Stack.Screen
          name="signup"
          options={{
            animation: 'slide_from_right',
            contentStyle: { backgroundColor: 'transparent' },
          }}
        />

        <Stack.Screen
          name="verify-code-s"
          options={{
            animation: 'slide_from_right',
            contentStyle: { backgroundColor: 'transparent' },
          }}
        />

        <Stack.Screen
          name="(forgot-password)"
          options={{
            animation: 'slide_from_right',
            contentStyle: { backgroundColor: 'transparent' },
          }}
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8DDD0',
  },
});
