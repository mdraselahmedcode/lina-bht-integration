import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import VectorBg from '@/components/VectorBg';

export default function QuestionnaireLayout() {
  return (
    <View style={styles.container}>
      {/* SVG Background */}
      <VectorBg />

      {/* Stack on top */}
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: {
            backgroundColor: 'transparent',
          },
        }}>
        <Stack.Screen name="personal-info" />
        <Stack.Screen name="life-phase" />
        <Stack.Screen name="skin-hair-condition" />
        <Stack.Screen name="budget" />
        <Stack.Screen name="allergies" />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
