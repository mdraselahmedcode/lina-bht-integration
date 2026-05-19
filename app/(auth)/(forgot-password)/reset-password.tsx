import { View, Text } from 'react-native';
import { useState, useMemo, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import ResetPasswordFields from '@/components/formFields/ResetPasswordFields';
import FormLayout from '@/components/layouts/FormLayout';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import PasswordInput from '@/components/inputs/PasswordInput';
import AuthFormTitle from '@/components/texts/auth/FormTitle';
import { useToast } from '@/hooks/useToast';
import { validateFields } from '@/utils/formValidate';
import { useScreenReady } from '@/hooks/useScreenReady';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';
import { useResetPasswordMutation } from '@/store/api/authApi';
import { extractApiError } from '@/utils/apiError';

export default function ResetPasswordScreen() {
  const router = useRouter();
  // email + otp passed from the verify-code screen
  const { email, otp } = useLocalSearchParams<{ email?: string; otp?: string }>();

  const { showError, showSuccess } = useToast();
  const { fields, setFields } = ResetPasswordFields();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

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

  const password = useMemo(() => (getField('password')?.value as string) || '', [fields]);
  const confirmPassword = useMemo(
    () => (getField('confirmPassword')?.value as string) || '',
    [fields]
  );

  const handleReset = async () => {
    if (!email || !otp) {
      showError('Session expired. Please start the forgot password flow again.');
      router.replace('/(auth)/(forgot-password)/email');
      return;
    }

    const isValid = validateFields(fields, setFields);
    if (!isValid) {
      showError('Please fill in all required fields');
      return;
    }

    if (password.length < 6) {
      showError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setFields((prev) =>
        prev.map((field) => (field.name === 'confirmPassword' ? { ...field, error: true } : field))
      );
      showError('Passwords do not match');
      return;
    }

    try {
      await resetPassword({
        email,
        otp,
        new_password: password,
      }).unwrap();

      showSuccess('Password reset successfully! Please sign in.');
      router.replace('/(auth)/login');
    } catch (error: any) {
      showError(extractApiError(error, 'Failed to reset password. Please try again.'));
    }
  };

  const handleRetry = () => router.replace('/(auth)/(forgot-password)/reset-password');

  useEffect(() => {
    if (isContentReady && isInitialLoad) setIsInitialLoad(false);
  }, [isContentReady]);

  if (isRendering && isInitialLoad) {
    return (
      <FormLayout>
        <LoadingScreen loadingText="Preparing reset password..." backgroundColor="transparent" />
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
          <AuthFormTitle text="Set New Password" />
          <Text className="text-center font-outfit text-[14px] text-titleTextColor/60">
            Create a new password for your account
          </Text>
        </View>

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

        <PrimaryButton
          title={isLoading ? 'Resetting...' : 'Reset Password'}
          onPress={handleReset}
          className="mt-6"
          disabled={isLoading}
          isLoading={isLoading}
        />
      </View>
    </FormLayout>
  );
}
