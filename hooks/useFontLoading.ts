import { useFonts } from 'expo-font';

export const useFontLoading = () => {
  const [fontsLoaded] = useFonts({
    // Didot
    'GFSDidot-Regular': require('@/assets/fonts/GFSDidot-Regular.ttf'),

    // Outfit
    'Outfit-Regular': require('@/assets/fonts/Outfit-Regular.ttf'),
    'Outfit-Medium': require('@/assets/fonts/Outfit-Medium.ttf'),
    'Outfit-SemiBold': require('@/assets/fonts/Outfit-SemiBold.ttf'),
    'Outfit-Bold': require('@/assets/fonts/Outfit-Bold.ttf'),
    'Outfit-ExtraBold': require('@/assets/fonts/Outfit-ExtraBold.ttf'),

    // Poppins
    'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Italic': require('@/assets/fonts/Poppins-Italic.ttf'),
    'Poppins-Medium': require('@/assets/fonts/Poppins-Medium.ttf'),
    'Poppins-MediumItalic': require('@/assets/fonts/Poppins-MediumItalic.ttf'),
    'Poppins-SemiBold': require('@/assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-SemiBoldItalic': require('@/assets/fonts/Poppins-SemiBoldItalic.ttf'),
    'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
    'Poppins-BoldItalic': require('@/assets/fonts/Poppins-BoldItalic.ttf'),
    'Poppins-ExtraBold': require('@/assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraBoldItalic': require('@/assets/fonts/Poppins-ExtraBoldItalic.ttf'),

    // Primous
    'Primous-Regular' : require('@/assets/fonts/Primous-Regular.ttf'),
    'Primous-Italic' : require('@/assets/fonts/Primous-Italic.ttf'),
    


  });

  return fontsLoaded;
};