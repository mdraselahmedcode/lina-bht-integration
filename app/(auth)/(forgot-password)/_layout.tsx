import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import VectorBg from '@/components/VectorBg';

export default function ForgotPasswordLayout() {
  return (
    <View style={styles.container}>
      <VectorBg />

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
  },
});
