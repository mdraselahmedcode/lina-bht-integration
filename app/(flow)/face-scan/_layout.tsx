// app/(flow)/face-scan/_layout.tsx
import { Stack } from 'expo-router';

export default function FaceScanLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="camera-scan" />
      <Stack.Screen name="loading-screen" />
      <Stack.Screen name="analysis-complete" />
    </Stack>
  );
}