import React, { useState } from 'react';
import { View, TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import { useRouter } from 'expo-router';
import FormLayout from '@/components/layouts/FormLayout';
import InputField from '@/components/inputs/Input';
import LoginFields from '@/components/formFields/LoginFields';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import PasswordInput from '@/components/inputs/PasswordInput';
import InputLabel from '@/components/texts/InputLabel';
import { AppleLogo, GoogleLogo } from '@/components/icons';
import AuthFormTitle from '@/components/texts/auth/FormTitle';
import AuthTextBodySmall from '@/components/texts/auth/AuthTextBodySmall';
import IconButton from '@/components/buttons/IconButton';
import TextBodySmall from '@/components/texts/TextBodySmall';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useScreenReady } from '@/hooks/useScreenReady';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const router = useRouter();
  const { login } = useAuth();
  const { showError, showInfo } = useToast();
  const { validateLogin } = useFormValidation();
  const { fields, setFields } = LoginFields();

  const { isRendering, isContentReady, renderError } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  const getField = (name: string) => fields?.find((field) => field.name === name);

  const updateField = (name: string, value: string | boolean) => {
    setFields?.((prev) =>
      prev.map((field) => (field.name === name ? { ...field, value, error: false } : field))
    );
  };

  const handleLogin = async () => {
    const formData = {
      email: (getField('email')?.value as string) || '',
      password: (getField('password')?.value as string) || '',
    };

    if (!validateLogin(formData)) {
      return;
    }

    setLoading(true);
    try {
      await login('mock_token', { email: formData.email });
    } catch (error) {
      showError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    router.replace('/(auth)/login');
  };

  const handleSocialLogin = (provider: string) => {
    showInfo(`${provider} login coming soon!`);
  };

  const handleForgotPassword = () => {
    router.push('/(auth)/(forgot-password)/email');
  };

  // Mark initial load as complete after first render
  React.useEffect(() => {
    if (isContentReady && isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [isContentReady]);

  // Show initial render loading (useScreenReady) - ONLY on first load
  if (isRendering && isInitialLoad) {
    return (
      <FormLayout>
        <LoadingScreen loadingText="Preparing login..." backgroundColor="transparent" />
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
        className="px-container"
        style={{
          opacity: isContentReady ? 1 : 0,
          transform: [{ translateY: isContentReady ? 0 : 10 }],
        }}>
        <AuthFormTitle text="Sign In" className={'mb-10'} />

        {/* Email Field */}
        <View className="mb-3">
          <InputField
            placeHolder="Email Address"
            keyboard="email-address"
            name="email"
            value={(getField('email')?.value as string) || ''}
            handler={(_, value) => updateField('email', value)}
            error={!!getField('email')?.error}
            height={56}
          />
        </View>

        {/* Password Field */}
        <View className="mb-6">
          <PasswordInput
            placeHolder="Enter Password"
            name="password"
            value={(getField('password')?.value as string) || ''}
            handler={(_, value) => updateField('password', value)}
            error={!!getField('password')?.error}
            keyboard="default"
          />
        </View>

        {/* Login Button */}
        <PrimaryButton
          title={loading ? 'Signing in...' : 'Sign In'}
          onPress={handleLogin}
          className="mb-3"
          disabled={loading}
          isLoading={loading}
        />

        {/* Forgot Password */}
        <TouchableOpacity onPress={handleForgotPassword}>
          <TextBodySmall
            text="Forgot password?"
            style={{ textAlign: 'right', marginHorizontal: 12 }}
          />
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View className="mt-8 flex-row justify-center gap-[10px]">
          <AuthTextBodySmall text="Don’t have an account " />
          <TouchableOpacity activeOpacity={0.6} onPress={() => router.push('/(auth)/signup')}>
            <AuthTextBodySmall text="Sign Up" style={{ fontSize: 17, fontWeight: '600' }} />
          </TouchableOpacity>
        </View>

        {/* Social Login */}
        <InputLabel text="Sign in with" className="mb-4 mt-[100px] text-center text-[361A0D]" />
        <View className="flex-row items-center gap-4">
          <IconButton
            onPress={() => handleSocialLogin('Apple')}
            icon={<AppleLogo size={30} />}
            style={{ flex: 1 }}
          />
          <IconButton
            onPress={() => handleSocialLogin('Google')}
            icon={<GoogleLogo size={30} />}
            style={{ flex: 1 }}
          />
        </View>
      </View>
    </FormLayout>
  );
}
