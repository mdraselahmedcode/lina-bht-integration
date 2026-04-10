// // hooks/useAuthState.ts
// import { useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const useAuthState = () => {
//   const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const checkAuth = async () => {
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

//   const updateAuth = async () => {
//     const token = await AsyncStorage.getItem('auth_token');
//     setIsAuthenticated(!!token);
//   };

//   useEffect(() => {
//     checkAuth();

//     // Listen for auth changes
//     const interval = setInterval(updateAuth, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   return {
//     hasSeenOnboarding,
//     isAuthenticated,
//     isLoading,
//     updateAuth,
//   };
// };
