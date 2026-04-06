// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (token: string, userData?: any) => {
    try {
      await AsyncStorage.setItem('auth_token', token);
      if (userData?.email) {
        await AsyncStorage.setItem('user_email', userData.email);
      }
      setIsAuthenticated(true);
      // Use replace to clear navigation stack
      router.replace('/(main)');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Clear all auth-related data
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('user_email');
      await AsyncStorage.removeItem('user_data'); // If you store user data

      // Clear any routine progress if you want to reset on logout
      // await AsyncStorage.removeItem('routineProgress');
      // await AsyncStorage.removeItem('customRoutineSteps');

      setIsAuthenticated(false);

      // Use replace to clear navigation stack and prevent going back
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth,
  };
};

// // hooks/useAuth.ts (Combined - This is the only one you need)
// import { useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useRouter } from 'expo-router';

// export const useAuth = () => {
//   const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();

//   // Check auth state on mount
//   useEffect(() => {
//     checkAuthState();
//   }, []);

//   const checkAuthState = async () => {
//     try {
//       const onboardingValue = await AsyncStorage.getItem('hasSeenOnboarding');
//       setHasSeenOnboarding(onboardingValue === 'true');

//       const token = await AsyncStorage.getItem('auth_token');
//       setIsAuthenticated(!!token);
//     } catch (error) {
//       console.warn('Error loading app data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const login = async (token: string, userData?: any) => {
//     try {
//       await AsyncStorage.setItem('auth_token', token);
//       if (userData?.email) {
//         await AsyncStorage.setItem('user_email', userData.email);
//       }
//       setIsAuthenticated(true);
//       router.replace('/(main)');
//     } catch (error) {
//       console.error('Login failed:', error);
//       throw error;
//     }
//   };

//   const logout = async () => {
//     try {
//       await AsyncStorage.removeItem('auth_token');
//       await AsyncStorage.removeItem('user_email');
//       setIsAuthenticated(false);
//       router.replace('/(auth)/login');
//     } catch (error) {
//       console.error('Logout failed:', error);
//       throw error;
//     }
//   };

//   const completeOnboarding = async () => {
//     await AsyncStorage.setItem('hasSeenOnboarding', 'true');
//     setHasSeenOnboarding(true);
//   };

//   return {
//     hasSeenOnboarding,
//     isAuthenticated,
//     isLoading,
//     login,
//     logout,
//     completeOnboarding,
//     checkAuthState,
//   };
// };
