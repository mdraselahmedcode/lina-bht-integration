// app/(flow)/settings/personal-info/edit.tsx
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/header/CustomHeader';
import { LAYOUT } from '@/constants/constants';
import { useToast } from '@/hooks/useToast';
import { useRouter } from 'expo-router';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import { DateOfBirthPicker } from '@/components/ui/CustomDatePicker';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
import { EditInputRow } from '@/components/personalInfo/EditInputRow';
import { AvatarCard } from '@/components/personalInfo/AvatarCard';
import { PickerBottomSheet } from '@/components/personalInfo/PickerBottomSheet';
import { genders, languages, countries } from '@/types/personalInfo';
import { useScreenReady } from '@/hooks/useScreenReady';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditPersonalInfoScreen() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [language, setLanguage] = useState('');
  const [country, setCountry] = useState('');
  const [avatarUri, setAvatarUri] = useState('https://randomuser.me/api/portraits/women/64.jpg');

  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { isRendering, isContentReady, renderError } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  useEffect(() => {
    loadPersonalInfo();
  }, []);

  const loadPersonalInfo = async () => {
    try {
      const [
        savedName,
        savedEmail,
        savedGender,
        savedDateOfBirth,
        savedLanguage,
        savedCountry,
        savedAvatar,
      ] = await Promise.all([
        AsyncStorage.getItem('user_name'),
        AsyncStorage.getItem('user_email'),
        AsyncStorage.getItem('user_gender'),
        AsyncStorage.getItem('user_date_of_birth'),
        AsyncStorage.getItem('user_language'),
        AsyncStorage.getItem('user_country'),
        AsyncStorage.getItem('user_avatar'),
      ]);

      setName(savedName || 'Elena Rossi');
      setEmail(savedEmail || 'elena.rossi@example.com');
      setGender(savedGender || 'Female');
      if (savedDateOfBirth) setDateOfBirth(new Date(savedDateOfBirth));
      setLanguage(savedLanguage || 'English');
      setCountry(savedCountry || 'United States');
      if (savedAvatar) setAvatarUri(savedAvatar);
    } catch (error) {
      console.error('Error loading personal info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      showError('Please enter your name');
      return;
    }

    setIsSaving(true);
    try {
      await Promise.all([
        AsyncStorage.setItem('user_name', name),
        AsyncStorage.setItem('user_email', email),
        AsyncStorage.setItem('user_gender', gender),
        AsyncStorage.setItem('user_date_of_birth', dateOfBirth?.toISOString() || ''),
        AsyncStorage.setItem('user_language', language),
        AsyncStorage.setItem('user_country', country),
        AsyncStorage.setItem('user_avatar', avatarUri),
      ]);
      showSuccess('Personal information updated successfully');
      router.back();
    } catch (error) {
      showError('Failed to update');
    } finally {
      setIsSaving(false);
    }
  };

  const formatDateForDisplay = (date: Date | null) => {
    if (!date) return 'Not selected';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleRetry = () => {
    router.replace('/(flow)/settings/personal-info/edit');
  };

  if (isRendering || isLoading) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <LoadingScreen loadingText="Preparing edit form..." />
      </SafeAreaView>
    );
  }

  if (renderError) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title="Edit Personal Info" height={50} backButton={true} />
        <ErrorScreen message={renderError} onRetry={handleRetry} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
      <CustomHeader title="Edit Personal Info" height={50} backButton={true} />

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
          <AvatarCard isEditing={true} avatarUrl={avatarUri} onAvatarChange={setAvatarUri} />
          <View className="mt-2" />
          <EditInputRow label="Full Name" value={name} onChangeText={setName} />

          {/* Email - Non-editable display */}
          <BorderlessShadowCard
            b_tl={0}
            b_tr={0}
            b_bl={0}
            b_br={0}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 24,
              backgroundColor: '#F0E6D8',
              borderWidth: 2,
              borderColor: '#FFFFFF',
              marginTop: 8,
            }}>
            <View className="flex-1">
              <Text className="font-outfit text-[12px]" style={{ color: '#2E211766' }}>
                Email Address
              </Text>
              <Text className="mt-1 font-outfitMedium text-[16px]" style={{ color: '#2E2117' }}>
                {email}
              </Text>
            </View>
          </BorderlessShadowCard>

          {/* Gender */}
          <BorderlessShadowCard
            b_tl={0}
            b_tr={0}
            b_bl={0}
            b_br={0}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 24,
              backgroundColor: '#F0E6D8',
              borderWidth: 2,
              borderColor: '#FFFFFF',
              marginTop: 8,
            }}>
            <TouchableOpacity onPress={() => setShowGenderPicker(true)}>
              <View className="flex-1">
                <Text className="font-outfit text-[12px]" style={{ color: '#2E211766' }}>
                  Gender
                </Text>
                <Text className="mt-1 font-outfitMedium text-[16px]" style={{ color: '#2E2117' }}>
                  {gender || 'Select gender'}
                </Text>
              </View>
            </TouchableOpacity>
          </BorderlessShadowCard>

          {/* Date of Birth */}
          <BorderlessShadowCard
            b_tl={0}
            b_tr={0}
            b_bl={0}
            b_br={0}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 24,
              backgroundColor: '#F0E6D8',
              borderWidth: 2,
              borderColor: '#FFFFFF',
              marginTop: 8,
            }}>
            <Text className="font-outfit text-[12px]" style={{ color: '#2E211766' }}>
              Date of Birth
            </Text>
            <DateOfBirthPicker
              value={dateOfBirth}
              onChange={setDateOfBirth}
              maximumDate={new Date()}
            />
          </BorderlessShadowCard>

          {/* Language */}
          <BorderlessShadowCard
            b_tl={0}
            b_tr={0}
            b_bl={0}
            b_br={0}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 24,
              backgroundColor: '#F0E6D8',
              borderWidth: 2,
              borderColor: '#FFFFFF',
              marginTop: 8,
            }}>
            <TouchableOpacity onPress={() => setShowLanguagePicker(true)}>
              <View className="flex-1">
                <Text className="font-outfit text-[12px]" style={{ color: '#2E211766' }}>
                  Language
                </Text>
                <Text className="mt-1 font-outfitMedium text-[16px]" style={{ color: '#2E2117' }}>
                  {language || 'Select language'}
                </Text>
              </View>
            </TouchableOpacity>
          </BorderlessShadowCard>

          {/* Country */}
          <BorderlessShadowCard
            b_tl={0}
            b_tr={0}
            b_bl={0}
            b_br={0}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 24,
              backgroundColor: '#F0E6D8',
              borderWidth: 2,
              borderColor: '#FFFFFF',
              marginTop: 8,
            }}>
            <TouchableOpacity onPress={() => setShowCountryPicker(true)}>
              <View className="flex-1">
                <Text className="font-outfit text-[12px]" style={{ color: '#2E211766' }}>
                  Country
                </Text>
                <Text className="mt-1 font-outfitMedium text-[16px]" style={{ color: '#2E2117' }}>
                  {country || 'Select country'}
                </Text>
              </View>
            </TouchableOpacity>
          </BorderlessShadowCard>

          <View className="mt-3 gap-3">
            <PrimaryVariantButton
              title={isSaving ? 'Saving...' : 'Save Changes'}
              onPress={handleSave}
              disabled={isSaving}
              isLoading={isSaving}
              borderTopLeftRadius={0}
              borderTopRightRadius={0}
              borderBottomLeftRadius={24}
              borderBottomRightRadius={24}
            />
          </View>
        </View>
      </ScrollView>

      {/* Gender Picker Bottom Sheet */}
      <PickerBottomSheet
        visible={showGenderPicker}
        onClose={() => setShowGenderPicker(false)}
        title="Select Gender"
        items={genders}
        selectedValue={gender}
        onSelect={(value) => {
          setGender(value);
          setShowGenderPicker(false);
        }}
      />

      {/* Language Picker Bottom Sheet */}
      <PickerBottomSheet
        visible={showLanguagePicker}
        onClose={() => setShowLanguagePicker(false)}
        title="Select Language"
        items={languages}
        selectedValue={language}
        onSelect={(value) => {
          setLanguage(value);
          setShowLanguagePicker(false);
        }}
      />

      {/* Country Picker Bottom Sheet */}
      <PickerBottomSheet
        visible={showCountryPicker}
        onClose={() => setShowCountryPicker(false)}
        title="Select Country"
        items={countries}
        selectedValue={country}
        onSelect={(value) => {
          setCountry(value);
          setShowCountryPicker(false);
        }}
      />
    </SafeAreaView>
  );
}

// Add this import at the top
import { TouchableOpacity } from 'react-native';
import PrimaryVariantButton from '@/components/buttons/PrimaryVariantButton';

const styles = StyleSheet.create({});
