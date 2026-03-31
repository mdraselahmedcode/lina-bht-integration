// import React from 'react';
// import { StatusBar } from 'react-native';
// import FormLayout from '@/components/layouts/FormLayout';
// import VerificationWrapper from '@/components/VerificationWrapper';
// import { router, useLocalSearchParams } from 'expo-router';
// import { useScreenReady } from '@/hooks/useScreenReady';

// const ForgotPasswordOtp = () => {
//   const { email } = useLocalSearchParams<{ email?: string }>();

//   return (
//     <>
//       <FormLayout>
//         <VerificationWrapper
//           authTitle="Verify Your Code"
//           subtitle="Enter the 6-digit verification code sent to your email address."
//           email={email}
//           otpLength={6}
//           onVerify={async (otp) => {
//             console.log('Forgot password OTP:', otp);
//             router.push('/(auth)/(forgot-password)/reset-password');
//           }}
//           resendOtp={async (email) => {
//             console.log('Resend OTP for forgot password:', email);
//           }}
//         />
//       </FormLayout>
//     </>
//   );
// };

// export default ForgotPasswordOtp;

import React, { useState } from 'react';
import { StatusBar, View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import FormLayout from '@/components/layouts/FormLayout';
import VerificationWrapper from '@/components/VerificationWrapper';
import { router, useLocalSearchParams } from 'expo-router';
import { useScreenReady } from '@/hooks/useScreenReady';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';

const ForgotPasswordOtp = () => {
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [fields] = useState([]); // Empty array since OTP screen doesn't have complex fields

  const { isRendering, renderError, isContentReady } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  const handleRetry = () => {
    router.replace('/(auth)/(forgot-password)/verify-code');
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
    <>
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
    </>
  );
};

export default ForgotPasswordOtp;
