import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
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

export default function EmailScreen() {
  const router = useRouter();
  const [isSending, setIsSending] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { fields, setFields } = ForgotPasswordFields();

  const { isRendering, isContentReady, renderError } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  const getField = (name: string) => fields.find((f) => f.name === name);
  const updateField = (name: string, value: string) =>
    setFields((prev) => prev.map((f) => (f.name === name ? { ...f, value, error: false } : f)));

  const { showError, showSuccess } = useToast();

  const handleSendCode = async () => {
    const email = (getField('email')?.value as string) || '';
    if (!email.trim()) {
      showError('Please enter your email');
      return;
    }

    setIsSending(true);
    try {
      // Simulate API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      showSuccess('Verification code sent to your email');
      router.push({
        pathname: '/(auth)/(forgot-password)/verify-code',
        params: { email },
      });
    } catch (error) {
      showError('Failed to send verification code. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleRetry = () => {
    router.replace('/(auth)/(forgot-password)/email');
  };

  // Mark initial load as complete after first render
  useEffect(() => {
    if (isContentReady && isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [isContentReady]);

  // Show initial render loading (useScreenReady) - ONLY on first load
  if (isRendering && isInitialLoad) {
    return (
      <FormLayout>
        <LoadingScreen loadingText="Preparing give a sec..." backgroundColor="transparent" />
      </FormLayout>
    );
  }

  // Show error if rendering failed
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
          <AuthFormTitle text="Let’s Get You Back In" />
          <Text className="text-center font-outfit text-[14px] text-titleTextColor">
            Enter your email to receive a verification code
          </Text>
        </View>

        {/* Email Input Field */}
        <InputField
          placeHolder="Email Address"
          keyboard="email-address"
          value={(getField('email')?.value as string) || ''}
          handler={(_, value) => updateField('email', value)}
          error={!!getField('email')?.error}
          height={56}
          style={{ marginBottom: 24 }}
        />

        {/* Send Code Button */}
        <PrimaryButton
          title={isSending ? 'Sending...' : 'Send Code'}
          onPress={handleSendCode}
          disabled={isSending}
          isLoading={isSending}
        />
      </View>
    </FormLayout>
  );
}
