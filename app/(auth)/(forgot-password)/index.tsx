import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function ForgotPasswordIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/(auth)/(forgot-password)/email');
  }, []);

  return null;
}
