import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import VectorBg from '@/components/VectorBg';

export default function ForgotPasswordLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: {
            backgroundColor: 'transparent',
          },
        }}>
        <Stack.Screen name="email" />
        <Stack.Screen name="verify-code" />
        <Stack.Screen name="reset-password" />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Fallback background color
  },
});
