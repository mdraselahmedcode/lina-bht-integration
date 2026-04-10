import React, { useState, useEffect } from 'react';
import { StatusBar, View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import FormLayout from '@/components/layouts/FormLayout';
import VerificationWrapper from '@/components/VerificationWrapper';
import { router, useLocalSearchParams } from 'expo-router';
import { useScreenReady } from '@/hooks/useScreenReady';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';

const ForgotPasswordOtp = () => {
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { isRendering, isContentReady, renderError } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  const handleRetry = () => {
    router.replace('/(auth)/(forgot-password)/verify-code');
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
        <LoadingScreen loadingText="Preparing verification..." backgroundColor="transparent" />
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
        style={{
          opacity: isContentReady ? 1 : 0,
          transform: [{ translateY: isContentReady ? 0 : 10 }],
        }}>
        <VerificationWrapper
          authTitle="Verify Your Code"
          subtitle="Enter the 6-digit verification code sent to your email address."
          email={email}
          otpLength={6}
          onVerify={async (otp) => {
            console.log('Forgot password OTP:', otp);
            router.push('/(auth)/(forgot-password)/reset-password');
          }}
          resendOtp={async (email) => {
            console.log('Resend OTP for forgot password:', email);
          }}
        />
      </View>
    </FormLayout>
  );
};

export default ForgotPasswordOtp;
