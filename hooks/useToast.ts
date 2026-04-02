// hooks/useToast.ts
import Toast from 'react-native-toast-message';

export const useToast = () => {
  const showSuccess = (message: string, title: string = 'Success') => {
    Toast.show({
      type: 'success',
      text1: title,
      text2: message,
      position: 'top',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 50,
    });
  };

  const showError = (message: string, title: string = 'Error') => {
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
      position: 'top',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 50,
    });
  };

  const showInfo = (message: string, title: string = 'Info') => {
    Toast.show({
      type: 'info',
      text1: title,
      text2: message,
      position: 'top',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 50,
    });
  };

  const showWarning = (message: string, title: string = 'Warning') => {
    Toast.show({
      type: 'info', // You can add a custom warning type if needed
      text1: title,
      text2: message,
      position: 'top',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 50,
    });
  };

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };
};
