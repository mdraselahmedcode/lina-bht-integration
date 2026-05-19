import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import FormLayout from '@/components/layouts/FormLayout';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import InputField from '@/components/inputs/Input';
import AuthFormTitle from '@/components/texts/auth/FormTitle';
import { useToast } from '@/hooks/useToast';
import ForgotPasswordFields from '@/components/formFields/ForgotPasswordFields';
import { useScreenReady } from '@/hooks/useScreenReady';
import ErrorScreen from '@/components/errors/ErrorScreen';
import LoadingScreen from '@/components/loading/LoadingScreen';
import { useForgotPasswordMutation } from '@/store/api/authApi';
import { extractApiError } from '@/utils/apiError';

export default function EmailScreen() {
  const router = useRouter();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { fields, setFields } = ForgotPasswordFields();
  const { showError, showSuccess } = useToast();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const { isRendering, isContentReady, renderError } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  const getField = (name: string) => fields.find((f) => f.name === name);
  const updateField = (name: string, value: string) =>
    setFields((prev) => prev.map((f) => (f.name === name ? { ...f, value, error: false } : f)));

  const handleSendCode = async () => {
    const email = (getField('email')?.value as string)?.trim() || '';

    if (!email) {
      showError('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError('Please enter a valid email address');
      return;
    }

    try {
      await forgotPassword({ email }).unwrap();
      showSuccess('If this email is registered, a reset code has been sent.');
      router.push({
        pathname: '/(auth)/(forgot-password)/verify-code',
        params: { email },
      });
    } catch (error: any) {
      showError(extractApiError(error, 'Failed to send verification code. Please try again.'));
    }
  };

  const handleRetry = () => router.replace('/(auth)/(forgot-password)/email');

  useEffect(() => {
    if (isContentReady && isInitialLoad) setIsInitialLoad(false);
  }, [isContentReady]);

  if (isRendering && isInitialLoad) {
    return (
      <FormLayout>
        <LoadingScreen loadingText="Just a sec..." backgroundColor="transparent" />
      </FormLayout>
    );
  }

  if (renderError) {
    return (
      <FormLayout>
        <ErrorScreen message={renderError} onRetry={handleRetry} />
      </FormLayout>
    );
  }

  return (
    <FormLayout>
      <View
        className="px-container py-9"
        style={{
          opacity: isContentReady ? 1 : 0,
          transform: [{ translateY: isContentReady ? 0 : 10 }],
        }}>
        <View className="mb-10">
          <AuthFormTitle text="Let's Get You Back In" style={{ fontSize: 26 }} />
          <Text className="mt-2 text-center font-outfit text-[14px] text-titleTextColor/60">
            Enter your email to receive a verification code
          </Text>
        </View>

        <InputField
          placeHolder="Email Address"
          keyboard="email-address"
          value={(getField('email')?.value as string) || ''}
          handler={(_, value) => updateField('email', value)}
          error={!!getField('email')?.error}
          height={56}
          style={{ marginBottom: 24 }}
        />

        <PrimaryButton
          title={isLoading ? 'Sending...' : 'Send Code'}
          onPress={handleSendCode}
          disabled={isLoading}
          isLoading={isLoading}
        />
      </View>
    </FormLayout>
  );
}
