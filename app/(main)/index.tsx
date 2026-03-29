import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/hooks/useAuth';

export default function HomeScreen() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-6 py-4">
        <View className="mb-6 flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-gray-900">Welcome! 👋</Text>
          <TouchableOpacity onPress={handleLogout} className="rounded-lg bg-red-500 px-4 py-2">
            <Text className="text-white">Logout</Text>
          </TouchableOpacity>
        </View>

        <View className="rounded-2xl bg-white p-6 shadow-sm">
          <Text className="text-lg font-semibold text-gray-900">Today's Routine</Text>
          <Text className="mt-2 text-gray-500">Complete your morning skincare routine</Text>
          <TouchableOpacity className="mt-4 rounded-xl bg-blue-500 py-3">
            <Text className="text-center font-semibold text-white">Start Routine</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
