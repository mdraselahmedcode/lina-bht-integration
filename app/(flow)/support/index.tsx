// app/(main)/support/email-us.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import CustomHeader from '@/components/header/CustomHeader';
import InputField from '@/components/inputs/Input';
import MultilineInputField from '@/components/inputs/MultilineInputField';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import { LAYOUT } from '@/constants/constants';
import { useToast } from '@/hooks/useToast';
import { useScreenReady } from '@/hooks/useScreenReady';
import ErrorScreen from '@/components/errors/ErrorScreen';
import SupportFields from '@/components/formFields/SupportFields';

export default function EmailUsScreen() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const { fields, setFields } = SupportFields();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isRendering, renderError, isContentReady } = useScreenReady({
    dependencies: [fields],
    delay: 100,
    // immediate: true,
  });

  const getField = (name: string) => fields.find((f) => f.name === name);

  const updateField = (name: string, value: string) => {
    setFields((prev) => prev.map((f) => (f.name === name ? { ...f, value, error: false } : f)));
  };

  const validateForm = () => {
    const nameField = getField('name');
    const emailField = getField('email');
    const subjectField = getField('subject');
    const messageField = getField('message');

    // Name validation
    if (!nameField?.value?.toString().trim()) {
      showError('Please enter your name', 'Missing Information');
      setFields((prev) => prev.map((f) => (f.name === 'name' ? { ...f, error: true } : f)));
      return false;
    }

    // Email validation
    if (!emailField?.value?.toString().trim()) {
      showError('Please enter your email address', 'Missing Information');
      setFields((prev) => prev.map((f) => (f.name === 'email' ? { ...f, error: true } : f)));
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(emailField?.value?.toString() || '')) {
      showError('Please enter a valid email address', 'Invalid Email');
      setFields((prev) => prev.map((f) => (f.name === 'email' ? { ...f, error: true } : f)));
      return false;
    }

    // Subject validation
    if (!subjectField?.value?.toString().trim()) {
      showError('Please enter a subject', 'Missing Information');
      setFields((prev) => prev.map((f) => (f.name === 'subject' ? { ...f, error: true } : f)));
      return false;
    }

    // Message validation
    if (!messageField?.value?.toString().trim()) {
      showError('Please describe your issue or question', 'Missing Information');
      setFields((prev) => prev.map((f) => (f.name === 'message' ? { ...f, error: true } : f)));
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = {
        name: getField('name')?.value,
        email: getField('email')?.value,
        subject: getField('subject')?.value,
        message: getField('message')?.value,
      };

      // TODO: Implement your API call here
      console.log('Form submitted:', formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      showSuccess(
        "Thank you for reaching out! We'll get back to you within 24 hours.",
        'Message Sent'
      );

      // Reset form after successful submission
      setFields((prev) => prev.map((f) => ({ ...f, value: '', error: false })));

      // Navigate back after a short delay
      setTimeout(() => {
        router.back();
      }, 2000);
    } catch (error) {
      showError('Failed to send message. Please try again.', 'Submission Failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    router.replace('/(main)/support/');
  };

  // Show inline loading while screen is rendering (no Layout shift)
  if (isRendering) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title="Email Us" height={80} backButton />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#95B287" />
        </View>
      </SafeAreaView>
    );
  }

  // Show error if rendering failed
  if (renderError) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title="Email Us" height={80} backButton />
        <ErrorScreen message={renderError} onRetry={handleRetry} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
      <CustomHeader title="Email Us" height={80} backButton />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
          paddingTop: 24,
          flexGrow: 1,
        }}
        className="flex-1">
        <View
          className="px-container"
          style={{
            opacity: isContentReady ? 1 : 0,
            transform: [{ translateY: isContentReady ? 0 : 10 }],
          }}>
          {/* Description Text */}
          <Text className="mb-6 font-outfitMedium text-[16px]" style={{ color: '#2E2117CC' }}>
            Fill out the form below and we&apos;ll get back to you within 24 hours.
          </Text>

          {/* Name Field - Top rounded corners */}
          <View className="mb-3">
            <InputField
              value={(getField('name')?.value as string) || ''}
              handler={(_, value) => updateField('name', value)}
              placeHolder="Name"
              error={!!getField('name')?.error}
              showLabel={false}
              height={56}
              withShadow={true}
              borderTopLeftRadius={24}
              borderTopRightRadius={24}
              borderBottomLeftRadius={0}
              borderBottomRightRadius={0}
            />
          </View>

          {/* Email Field - Middle with 0 radius */}
          <View className="mb-3">
            <InputField
              value={(getField('email')?.value as string) || ''}
              handler={(_, value) => updateField('email', value)}
              placeHolder="john@example.com"
              keyboard="email-address"
              error={!!getField('email')?.error}
              showLabel={false}
              height={56}
              withShadow={true}
              borderTopLeftRadius={0}
              borderTopRightRadius={0}
              borderBottomLeftRadius={0}
              borderBottomRightRadius={0}
            />
          </View>

          {/* Subject Field - Middle with 0 radius */}
          <View className="mb-3">
            <InputField
              value={(getField('subject')?.value as string) || ''}
              handler={(_, value) => updateField('subject', value)}
              placeHolder="Subject"
              error={!!getField('subject')?.error}
              showLabel={false}
              height={56}
              withShadow={true}
              borderTopLeftRadius={0}
              borderTopRightRadius={0}
              borderBottomLeftRadius={0}
              borderBottomRightRadius={0}
            />
          </View>

          {/* Message Field - Bottom rounded corners */}
          <View className="mb-8">
            <MultilineInputField
              value={(getField('message')?.value as string) || ''}
              handler={(_, value) => updateField('message', value)}
              placeHolder="Describe your issue or question..."
              showLabel={false}
              height={120}
              numberOfLines={4}
              withShadow={true}
              borderTopLeftRadius={0}
              borderTopRightRadius={0}
              borderBottomLeftRadius={24}
              borderBottomRightRadius={24}
            />
          </View>

          {/* Send Message Button */}
          <PrimaryButton
            title={isSubmitting ? 'Sending...' : 'Send Message'}
            onPress={handleSubmit}
            disabled={isSubmitting}
            isLoading={isSubmitting}
            style={{ marginTop: 8 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
