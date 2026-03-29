import { Stack } from 'expo-router';

export default function QuestionnaireLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#E8DDD0' },
      }}>
      <Stack.Screen name="life-phase" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="skin-hair-condition" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="budget" options={{ animation: 'slide_from_right' }} />
    </Stack>
  );
}
