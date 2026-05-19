import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import FormLayout from '@/components/layouts/FormLayout';
import VerificationWrapper from '@/components/VerificationWrapper';
import { router, useLocalSearchParams } from 'expo-router';
import { useScreenReady } from '@/hooks/useScreenReady';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';
import { useVerifyEmailMutation, useResendOtpMutation } from '@/store/api/authApi';
import { useToast } from '@/hooks/useToast';
import { extractApiError } from '@/utils/apiError';

const VerifyCodeScreen = () => {
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { showError, showSuccess } = useToast();

  const [verifyEmail] = useVerifyEmailMutation();
  const [resendOtp] = useResendOtpMutation();

  const { isRendering, isContentReady, renderError } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  const handleRetry = () => router.replace('/(auth)/verify-code-s');

  useEffect(() => {
    if (isContentReady && isInitialLoad) setIsInitialLoad(false);
  }, [isContentReady]);

  if (isRendering && isInitialLoad) {
    return (
      <FormLayout>
        <LoadingScreen loadingText="Preparing verification..." backgroundColor="transparent" />
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
        style={{
          opacity: isContentReady ? 1 : 0,
          transform: [{ translateY: isContentReady ? 0 : 10 }],
        }}>
        <VerificationWrapper
          authTitle="Verify Your Email"
          subtitle="Enter the 6-digit verification code sent to your email address."
          email={email}
          otpLength={6}
          onVerify={async (otp) => {
            try {
              await verifyEmail({ email: email || '', otp: otp }).unwrap();
              showSuccess('Email verified! You can now sign in.');
              router.replace('/(auth)/login');
            } catch (error: any) {
              showError(extractApiError(error, 'Verification failed. Try again.'));
            }
          }}
          resendOtp={async (email) => {
            if (!email) {
              showError('Email is required to resend the code.');
              return;
            }
            try {
              await resendOtp({ email, purpose: 'verify_email' }).unwrap();
              showSuccess('A new code has been sent to your email.');
            } catch (error: any) {
              showError(extractApiError(error, 'Failed to resend code.'));
            }
          }}
        />
      </View>
    </FormLayout>
  );
};

export default VerifyCodeScreen;
