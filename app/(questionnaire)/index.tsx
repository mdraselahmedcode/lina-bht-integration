import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function QuestionnaireIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/(questionnaire)/life-phase');
  }, []);

  return null;
}
