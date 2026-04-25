// app/(flow)/_layout.tsx - Simplified version
import { Stack } from 'expo-router';

export default function FlowLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#E8DDD0' },
      }}
    />
  );
}
