// app/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function RootIndex() {
  const router = useRouter();

  useEffect(() => {
    // Small delay to ensure navigation is ready
    const timer = setTimeout(() => {
      router.replace('/(onboarding)');
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
