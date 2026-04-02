// import { Stack } from 'expo-router';

// export default function AuthLayout() {
//   return (
//     <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#E8DDD0' } }}>
//       <Stack.Screen
//         name="login"
//         options={{ animation: 'slide_from_right', contentStyle: { backgroundColor: '#E8DDD0' } }}
//       />
//       <Stack.Screen
//         name="signup"
//         options={{ animation: 'slide_from_right', contentStyle: { backgroundColor: '#E8DDD0' } }}
//       />
//     </Stack>
//   );
// }

import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import VectorBg from '@/components/VectorBg';

export default function AuthLayout() {
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
            backgroundColor: '#E8DDD0', // IMPORTANT
          },
        }}>
        <Stack.Screen
          name="login"
          options={{
            animation: 'slide_from_right',
            contentStyle: { backgroundColor: '#E8DDD0' },
          }}
        />

        <Stack.Screen
          name="signup"
          options={{
            animation: 'slide_from_right',
            contentStyle: { backgroundColor: '#E8DDD0' },
          }}
        />

        <Stack.Screen
          name="(forgot-password)"
          options={{
            animation: 'slide_from_right',
            contentStyle: { backgroundColor: '#E8DDD0' },
          }}
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
