// hooks/useFormValidation.ts
import { useToast } from './useToast';

export const useFormValidation = () => {
  const { showError } = useToast();

  const validateSignUp = (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    const { name, email, password, confirmPassword } = data;

    if (!name) {
      showError('Please enter your full name');
      return false;
    }

    if (!email) {
      showError('Please enter your email address');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError('Please enter a valid email address');
      return false;
    }

    if (!password) {
      showError('Please enter a password');
      return false;
    }

    if (password.length < 8) {
      showError('Password must be at least 8 characters long');
      return false;
    }

    // must contain at least one letter
    const letterRegex = /[a-zA-Z]/;
    if (!letterRegex.test(password)) {
      showError('Password must contain at least one letter');
      return false;
    }

    if (!confirmPassword) {
      showError('Please confirm your password');
      return false;
    }

    if (password !== confirmPassword) {
      showError('Passwords do not match');
      return false;
    }

    return true;
  };

  const validateLogin = (data: { email: string; password: string }) => {
    const { email, password } = data;

    if (!email) {
      showError('Please enter your email address');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError('Please enter a valid email address');
      return false;
    }

    if (!password) {
      showError('Please enter your password');
      return false;
    }

    return true;
  };

  return {
    validateSignUp,
    validateLogin,
  };
};
