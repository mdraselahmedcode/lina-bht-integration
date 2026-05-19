import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import FormLayout from '@/components/layouts/FormLayout';
import VerificationWrapper from '@/components/VerificationWrapper';
import { router, useLocalSearchParams } from 'expo-router';
import { useScreenReady } from '@/hooks/useScreenReady';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';
import { useResendOtpMutation } from '@/store/api/authApi';
import { useToast } from '@/hooks/useToast';
import { extractApiError } from '@/utils/apiError';

const ForgotPasswordOtp = () => {
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { showError, showSuccess } = useToast();

  // No verifyEmail here — OTP is verified as part of reset-password in the next step.
  // We just collect the OTP and pass it forward as a route param.
  const [resendOtp] = useResendOtpMutation();

  const { isRendering, isContentReady, renderError } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  const handleRetry = () => router.replace('/(auth)/(forgot-password)/verify-code');

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
          authTitle="Verify Your Code"
          subtitle="Enter the 6-digit verification code sent to your email address."
          email={email}
          otpLength={6}
          onVerify={async (otp) => {
            // Pass both email + otp to reset-password screen — no separate verify step
            router.push({
              pathname: '/(auth)/(forgot-password)/reset-password',
              params: { email, otp },
            });
          }}
          resendOtp={async (emailParam) => {
            try {
              await resendOtp({
                email: emailParam || email || '',
                purpose: 'forgot_password',
              }).unwrap();
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

export default ForgotPasswordOtp;
