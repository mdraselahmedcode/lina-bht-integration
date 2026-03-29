import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#E8DDD0' } }}>
      <Stack.Screen
        name="login"
        options={{ animation: 'slide_from_right', contentStyle: { backgroundColor: '#E8DDD0' } }}
      />
      <Stack.Screen
        name="signup"
        options={{ animation: 'slide_from_right', contentStyle: { backgroundColor: '#E8DDD0' } }}
      />
    </Stack>
  );
}
