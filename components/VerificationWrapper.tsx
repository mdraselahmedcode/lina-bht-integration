// components/VerificationWrapper.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import OtpInput from '@/components/inputs/OtpInput';
import PrimaryButton from './buttons/PrimaryButton';
import AuthFormTitle from '@/components/texts/auth/FormTitle';
import TextBodySmall from './texts/TextBodySmall';

type VerificationWrapperProps = {
  authTitle: string;
  subtitle: string;
  otpLength?: number;
  email?: string;
  onVerify: (otp: string) => Promise<void>;
  resendOtp?: (email?: string) => Promise<void>;
};

const VerificationWrapper: React.FC<VerificationWrapperProps> = ({
  authTitle,
  subtitle,
  otpLength = 6,
  email,
  onVerify,
  resendOtp,
}) => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer effect with cleanup
  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000) as ReturnType<typeof setInterval>;

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [timer]);

  const handleResend = useCallback(async () => {
    if (!resendOtp) return;
    await resendOtp(email);
    setTimer(30);
    setCanResend(false);
  }, [resendOtp, email]);

  const handleVerifyClick = useCallback(async () => {
    if (otp.length !== otpLength) return;
    setLoading(true);
    try {
      await onVerify(otp);
    } finally {
      setLoading(false);
    }
  }, [otp, otpLength, onVerify]);

  const handleOtpChange = useCallback((value: string) => {
    setOtp(value);
  }, []);

  // Format timer display
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View className="px-container">
      <View className="mb-10">
        <AuthFormTitle text={authTitle} />
        <Text className="text-center font-outfit text-[14px] text-titleTextColor/60">
          {subtitle}
        </Text>
      </View>

      <OtpInput
        length={otpLength}
        onChange={handleOtpChange}
        onComplete={handleOtpChange}
        withShadow={true}
      />

      {/* Resend */}
      <View className="mb-6 mt-4 flex-row items-center justify-between">
        <TextBodySmall text="Didn’t receive the code?" style={{ color: '#361A0D' }} />
        <TouchableOpacity disabled={!canResend} onPress={handleResend}>
          <Text
            className="font-outfitMedium text-[14px] text-[#361A0D]"
            style={{ opacity: canResend ? 1 : 0.5 }}>
            {canResend ? 'Resend' : `Resend in ${formatTimer(timer)}`}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Verify button */}
      <PrimaryButton
        title={loading ? 'Verifying...' : 'Verify Code'}
        onPress={handleVerifyClick}
        disabled={otp.length !== otpLength || loading}
      />
    </View>
  );
};

export default VerificationWrapper;
