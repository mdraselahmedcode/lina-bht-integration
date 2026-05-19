import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import FormLayout from '@/components/layouts/FormLayout';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import AuthFormTitle from '@/components/texts/auth/FormTitle';
import { useToast } from '@/hooks/useToast';
import { useScreenReady } from '@/hooks/useScreenReady';
import { DateOfBirthPicker } from '@/components/ui/CustomDatePicker';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
import { PickerBottomSheet } from '@/components/personalInfo/PickerBottomSheet';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';
import { RoundedInfoRow } from '@/components/personalInfo/RoundedInfoRow';
import { extractApiError } from '@/utils/apiError';
import { useSavePersonalInfoMutation } from '@/store/api/onboardingApi';

// ─── Constants ────────────────────────────────────────────────────────────────

const GENDERS = [
  { id: 'female', label: 'Female', value: 'female' },
  { id: 'male', label: 'Male', value: 'male' },
  { id: 'other', label: 'Non-binary', value: 'other' },
  { id: 'other2', label: 'Prefer not to say', value: 'other' },
];

const LANGUAGES = [
  { id: 'en', label: 'English', value: 'en' },
  { id: 'es', label: 'Spanish', value: 'es' },
  { id: 'fr', label: 'French', value: 'fr' },
  { id: 'de', label: 'German', value: 'de' },
  { id: 'it', label: 'Italian', value: 'it' },
  { id: 'pt', label: 'Portuguese', value: 'pt' },
  { id: 'zh', label: 'Chinese', value: 'zh' },
  { id: 'ja', label: 'Japanese', value: 'ja' },
  { id: 'ko', label: 'Korean', value: 'ko' },
  { id: 'ar', label: 'Arabic', value: 'ar' },
  { id: 'hi', label: 'Hindi', value: 'hi' },
];

const COUNTRIES = [
  { id: 'us', label: 'United States', value: 'US' },
  { id: 'uk', label: 'United Kingdom', value: 'GB' },
  { id: 'ca', label: 'Canada', value: 'CA' },
  { id: 'au', label: 'Australia', value: 'AU' },
  { id: 'de', label: 'Germany', value: 'DE' },
  { id: 'fr', label: 'France', value: 'FR' },
  { id: 'it', label: 'Italy', value: 'IT' },
  { id: 'es', label: 'Spain', value: 'ES' },
  { id: 'nl', label: 'Netherlands', value: 'NL' },
  { id: 'se', label: 'Sweden', value: 'SE' },
  { id: 'no', label: 'Norway', value: 'NO' },
  { id: 'dk', label: 'Denmark', value: 'DK' },
  { id: 'fi', label: 'Finland', value: 'FI' },
  { id: 'jp', label: 'Japan', value: 'JP' },
  { id: 'cn', label: 'China', value: 'CN' },
  { id: 'in', label: 'India', value: 'IN' },
  { id: 'br', label: 'Brazil', value: 'BR' },
  { id: 'mx', label: 'Mexico', value: 'MX' },
  { id: 'za', label: 'South Africa', value: 'ZA' },
  { id: 'ae', label: 'UAE', value: 'AE' },
  { id: 'bd', label: 'Bangladesh', value: 'BD' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** "2026-05-18" — what the API expects */
const toISODateString = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

/** Returns the label to display in the row from a value */
const getLabelForValue = (
  items: { id: string; label: string; value: string }[],
  value: string | null
) => {
  if (!value) return 'Not selected';
  return items.find((i) => i.value === value)?.label ?? value;
};

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function PersonalInfoScreen() {
  const router = useRouter();
  const { showError } = useToast();

  // Form state — values are what the API accepts (codes, not display labels)
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);

  // Picker visibility
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);

  const [savePersonalInfo, { isLoading }] = useSavePersonalInfoMutation();

  const { isRendering, isContentReady, renderError } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  const handleNext = async () => {
    // ── Validation ──────────────────────────────────────────────────────────
    if (!selectedCountry) {
      showError('Please select your country');
      return;
    }
    if (!selectedLanguage) {
      showError('Please select your language');
      return;
    }
    if (!dateOfBirth) {
      showError('Please enter your date of birth');
      return;
    }
    if (!selectedGender) {
      showError('Please select your gender');
      return;
    }

    if (calculateAge(dateOfBirth) < 18) {
      showError('You must be 18 or older to use this app');
      return;
    }

    // ── API call ─────────────────────────────────────────────────────────────
    try {
      await savePersonalInfo({
        country: selectedCountry, // e.g. "US"
        language: selectedLanguage, // e.g. "en"
        date_of_birth: toISODateString(dateOfBirth), // e.g. "1995-08-04"
        gender: selectedGender as 'male' | 'female' | 'other',
      }).unwrap();

      // router.push('/(questionnaire)/life-phase');
      if (selectedGender === 'male') {
        router.push('/(questionnaire)/allergies');
      } else {
        router.push('/(questionnaire)/life-phase');
      }
    } catch (error: any) {
      showError(extractApiError(error, 'Failed to save. Please try again.'));
    }
  };

  const handleRetry = () => router.replace('/(questionnaire)/personal-info');

  if (isRendering) {
    return <LoadingScreen loadingText="Initializing your profile..." transparent={true} />;
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
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View
          className="px-container py-9"
          style={{
            opacity: isContentReady ? 1 : 0,
            transform: [{ translateY: isContentReady ? 0 : 10 }],
          }}>
          {/* Header */}
          <View className="mb-8">
            <AuthFormTitle text="Personal Info" />
            <Text className="text-center font-outfit text-[14px] text-titleTextColor">
              This helps us personalize your experience
            </Text>
          </View>

          {/* Country */}
          <View className="mb-3">
            <RoundedInfoRow
              label="Select your country"
              value={getLabelForValue(COUNTRIES, selectedCountry)}
              onPress={() => setShowCountryPicker(true)}
              isEditing={true}
              topRounded={true}
              bottomRounded={true}
              borderRadius={100}
            />
          </View>

          {/* Language */}
          <View className="mb-3">
            <RoundedInfoRow
              label="Select your language"
              value={getLabelForValue(LANGUAGES, selectedLanguage)}
              onPress={() => setShowLanguagePicker(true)}
              isEditing={true}
              topRounded={true}
              bottomRounded={true}
              borderRadius={100}
            />
          </View>

          {/* Date of Birth */}
          <View className="mb-3">
            <BorderlessShadowCard
              b_tl={100}
              b_tr={100}
              b_bl={100}
              b_br={100}
              style={{
                paddingVertical: 0,
                paddingHorizontal: 24,
                backgroundColor: '#F0E6D8',
                borderWidth: 2,
                borderColor: '#FFFFFF',
              }}>
              <DateOfBirthPicker
                value={dateOfBirth}
                onChange={setDateOfBirth}
                maximumDate={new Date()}
                minimumDate={new Date(1900, 0, 1)}
                label="Date of Birth"
                placeholder="Select your date of birth"
              />
            </BorderlessShadowCard>

            {dateOfBirth && (
              <Text className="mt-2 text-start font-outfit text-[12px] text-[#759A52]">
                Age: {calculateAge(dateOfBirth)} years
              </Text>
            )}
          </View>

          {/* Gender */}
          <View className="mb-6">
            <RoundedInfoRow
              label="Select your gender"
              value={getLabelForValue(GENDERS, selectedGender)}
              onPress={() => setShowGenderPicker(true)}
              isEditing={true}
              topRounded={true}
              bottomRounded={true}
              borderRadius={100}
            />
          </View>

          <PrimaryButton
            title={isLoading ? 'Saving...' : 'Next'}
            onPress={handleNext}
            className="mb-3"
            disabled={isLoading}
            isLoading={isLoading}
          />
        </View>
      </ScrollView>

      <PickerBottomSheet
        visible={showGenderPicker}
        onClose={() => setShowGenderPicker(false)}
        title="Select Gender"
        items={GENDERS}
        selectedValue={selectedGender}
        onSelect={(value) => {
          setSelectedGender(value);
          setShowGenderPicker(false);
        }}
      />

      <PickerBottomSheet
        visible={showCountryPicker}
        onClose={() => setShowCountryPicker(false)}
        title="Select Country"
        items={COUNTRIES}
        selectedValue={selectedCountry}
        onSelect={(value) => {
          setSelectedCountry(value);
          setShowCountryPicker(false);
        }}
      />

      <PickerBottomSheet
        visible={showLanguagePicker}
        onClose={() => setShowLanguagePicker(false)}
        title="Select Language"
        items={LANGUAGES}
        selectedValue={selectedLanguage}
        onSelect={(value) => {
          setSelectedLanguage(value);
          setShowLanguagePicker(false);
        }}
      />
    </FormLayout>
  );
}
