import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

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

  const { fields, setFields } = ForgotPasswordFields();

  const { isRendering, renderError, isContentReady } = useScreenReady({
    dependencies: [fields],
    delay: 100,
  });

  const getField = (name: string) => fields.find((f) => f.name === name);
  const updateField = (name: string, value: string) =>
    setFields((prev) => prev.map((f) => (f.name === name ? { ...f, value, error: false } : f)));

  const { showError } = useToast();

  const handleSendCode = () => {
    const email = (getField('email')?.value as string) || '';
    if (!email.trim()) {
      showError('Please enter your email');
      return;
    }

    router.push({
      pathname: '/(auth)/(forgot-password)/verify-code',
      params: { email },
    });
  };

  const handleRetry = () => {
    router.replace('/(auth)/(forgot-password)/email');
  };

  // Show loading while screen is rendering
  if (isRendering) {
    <LoadingScreen />;
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

        {/* ✅ Use your InputField properly */}
        <InputField
          placeHolder="Email Address"
          keyboard="email-address"
          value={(getField('email')?.value as string) || ''}
          handler={(_, value) => updateField('email', value)}
          error={!!getField('email')?.error}
          height={56}
          style={{ marginBottom: 24 }}
        />

        <PrimaryButton title="Send Code" onPress={handleSendCode} />
      </View>
    </FormLayout>
  );
}
