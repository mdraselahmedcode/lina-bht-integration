import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'expo-router';
import ResetPasswordFields from '@/components/formFields/ResetPasswordFields';
import FormLayout from '@/components/layouts/FormLayout';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import PasswordInput from '@/components/inputs/PasswordInput';
import AuthFormTitle from '@/components/texts/auth/FormTitle';
import { useToast } from '@/hooks/useToast';
import { validateFields } from '@/utils.ts/formValidate';
import { useScreenReady } from '@/hooks/useScreenReady';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { showError, showSuccess } = useToast();
  const { fields, setFields } = ResetPasswordFields();
  const [isResetting, setIsResetting] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { isRendering, isContentReady, renderError } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  const getField = (name: string) => fields.find((f) => f.name === name);

  const updateField = (name: string, value: string | number | boolean) => {
    setFields((prev) =>
      prev.map((field) => (field.name === name ? { ...field, value, error: false } : field))
    );
  };

  // Use useMemo to compute values when fields change
  const password = useMemo(() => (getField('password')?.value as string) || '', [fields]);
  const confirmPassword = useMemo(
    () => (getField('confirmPassword')?.value as string) || '',
    [fields]
  );

  const handleReset = async () => {
    // Validate all required fields
    const isValid = validateFields(fields, setFields);
    if (!isValid) {
      showError('Please fill in all required fields');
      return;
    }

    // Validate password length
    if (password.length < 6) {
      showError('Password must be at least 6 characters long');
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setFields((prev) =>
        prev.map((field) => (field.name === 'confirmPassword' ? { ...field, error: true } : field))
      );
      showError('Passwords do not match');
      return;
    }

    setIsResetting(true);
    try {
      // Simulate API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      showSuccess('Password reset successful');
      router.replace('/(auth)/login');
    } catch (error) {
      showError('Failed to reset password. Please try again.');
    } finally {
      setIsResetting(false);
    }
  };

  const handleRetry = () => {
    router.replace('/(auth)/(forgot-password)/reset-password');
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
        <LoadingScreen loadingText="Preparing reset password..." backgroundColor="transparent" />
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
          <AuthFormTitle text="Set New Password" />
          <Text className="text-center font-outfit text-[14px] text-titleTextColor">
            Create a new password for your account
          </Text>
        </View>

        {/* New Password Field */}
        <View className="mb-4">
          <PasswordInput
            placeHolder="Enter new password"
            name="password"
            value={password}
            handler={(_, value) => updateField('password', value)}
            error={!!getField('password')?.error}
            keyboard="default"
          />
        </View>

        {/* Confirm Password Field */}
        <View className="mb-6">
          <PasswordInput
            placeHolder="Confirm new password"
            name="confirmPassword"
            value={confirmPassword}
            handler={(_, value) => updateField('confirmPassword', value)}
            error={!!getField('confirmPassword')?.error}
            keyboard="default"
          />
        </View>

        {/* Reset Password Button */}
        <PrimaryButton
          title={isResetting ? 'Resetting...' : 'Reset Password'}
          onPress={handleReset}
          className="mt-6"
          disabled={isResetting}
          isLoading={isResetting}
        />
      </View>
    </FormLayout>
  );
}
