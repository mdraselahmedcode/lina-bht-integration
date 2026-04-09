// // app/(flow)/settings/personal-info/index.tsx (Add avatar state)
// import { ScrollView, StyleSheet, View } from 'react-native';
// import React, { useState } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import CustomHeader from '@/components/header/CustomHeader';
// import { LAYOUT } from '@/constants/constants';
// import { useToast } from '@/hooks/useToast';
// import { useRouter } from 'expo-router';
// import PrimaryButton from '@/components/buttons/PrimaryButton';
// import PrimaryVariantButton from '@/components/buttons/PrimaryVariantButton';
// import { DateOfBirthPicker } from '@/components/ui/CustomDatePicker';
// import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
// import { InfoRow } from '@/components/personalInfo/InfoRow';
// import { EditInputRow } from '@/components/personalInfo/EditInputRow';
// import { AvatarCard } from '@/components/personalInfo/AvatarCard';
// import { PickerBottomSheet } from '@/components/personalInfo/PickerBottomSheet';
// import { PersonalInfo, genders, languages, countries } from '@/types/personalInfo';
// import { useScreenReady } from '@/hooks/useScreenReady';
// import LoadingScreen from '@/components/loading/LoadingScreen';
// import ErrorScreen from '@/components/errors/ErrorScreen';

// export default function PersonalInfoScreen() {
//   const router = useRouter();
//   const { showSuccess, showError } = useToast();
//   const [isEditing, setIsEditing] = useState(false);
//   const [showGenderPicker, setShowGenderPicker] = useState(false);
//   const [showLanguagePicker, setShowLanguagePicker] = useState(false);
//   const [showCountryPicker, setShowCountryPicker] = useState(false);
//   const [avatarUri, setAvatarUri] = useState('https://randomuser.me/api/portraits/women/64.jpg');

//   // Screen ready state for smooth transitions
//   const { isRendering, isContentReady, renderError } = useScreenReady({
//     dependencies: [],
//     delay: 100,
//     initialReady: false,
//   });

//   // Personal info state
//   const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
//     name: 'Elena Rossi',
//     email: 'elena.rossi@example.com',
//     gender: 'Female',
//     dateOfBirth: new Date(1990, 5, 15),
//     language: 'English',
//     country: 'United States',
//   });

//   // Temporary state for editing
//   const [editInfo, setEditInfo] = useState<PersonalInfo>(personalInfo);
//   const [editAvatarUri, setEditAvatarUri] = useState(avatarUri);

//   const handleEdit = () => {
//     setEditInfo(personalInfo);
//     setEditAvatarUri(avatarUri);
//     setIsEditing(true);
//   };

//   const handleSave = async () => {
//     try {
//       setPersonalInfo(editInfo);
//       setAvatarUri(editAvatarUri);
//       setIsEditing(false);
//       showSuccess('Personal information updated successfully');
//     } catch (error) {
//       showError('Failed to update information');
//     }
//   };

//   const handleCancel = () => {
//     setEditInfo(personalInfo);
//     setEditAvatarUri(avatarUri);
//     setIsEditing(false);
//   };

//   const formatDate = (date: Date) => {
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });
//   };

//   const handleGenderSelect = (gender: string) => {
//     if (isEditing) {
//       setEditInfo({ ...editInfo, gender });
//     } else {
//       setPersonalInfo({ ...personalInfo, gender });
//     }
//   };

//   const handleLanguageSelect = (language: string) => {
//     if (isEditing) {
//       setEditInfo({ ...editInfo, language });
//     } else {
//       setPersonalInfo({ ...personalInfo, language });
//     }
//   };

//   const handleCountrySelect = (country: string) => {
//     if (isEditing) {
//       setEditInfo({ ...editInfo, country });
//     } else {
//       setPersonalInfo({ ...personalInfo, country });
//     }
//   };

//   const handleAvatarChange = (uri: string) => {
//     if (isEditing) {
//       setEditAvatarUri(uri);
//     } else {
//       setAvatarUri(uri);
//     }
//   };

//   const handleRetry = () => {
//     router.replace('/(flow)/settings/personal-info');
//   };

//   // Show initial render loading (useScreenReady)
//   if (isRendering) {
//     return (
//       <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
//         <LoadingScreen loadingText="Loading your personal info..." />
//       </SafeAreaView>
//     );
//   }

//   // Show error if rendering failed
//   if (renderError) {
//     return (
//       <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
//         <CustomHeader title="Wellness" height={50} backButton={true} />
//         <ErrorScreen message={renderError} onRetry={handleRetry} />
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
//       <CustomHeader title="Personal Info" height={50} backButton={true} />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{
//           paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
//           paddingTop: 10,
//           flexGrow: 1,
//         }}
//         className="flex-1">
//         <View className="gap-3 px-container">
//           {/* Avatar Card */}
//           <AvatarCard
//             isEditing={isEditing}
//             avatarUrl={isEditing ? editAvatarUri : avatarUri}
//             onAvatarChange={handleAvatarChange}
//           />

//           {/* Name & Email Fields - Manual Inputs in Edit Mode */}
//           {isEditing && (
//             <View className="gap-3">
//               <EditInputRow
//                 label="Full Name"
//                 value={editInfo.name}
//                 onChangeText={(value: string) => setEditInfo({ ...editInfo, name: value })}
//               />
//               <EditInputRow
//                 label="Email Address"
//                 value={editInfo.email}
//                 onChangeText={(value: string) => setEditInfo({ ...editInfo, email: value })}
//                 keyboardType="email-address"
//               />
//             </View>
//           )}

//           {/* View Mode - Display all info */}
//           {!isEditing && (
//             <>
//               <InfoRow label="Name" value={personalInfo.name} isEditing={isEditing} />
//               <InfoRow label="Email" value={personalInfo.email} isEditing={isEditing} />
//             </>
//           )}

//           {/* Gender */}
//           <InfoRow
//             label="Gender"
//             value={isEditing ? editInfo.gender : personalInfo.gender}
//             onPress={() => setShowGenderPicker(true)}
//             isEditing={isEditing}
//           />

//           {/* Date of Birth - Show InfoRow when NOT editing */}
//           {!isEditing && (
//             <InfoRow
//               label="Date of Birth"
//               value={formatDate(personalInfo.dateOfBirth)}
//               isEditing={isEditing}
//             />
//           )}

//           {/* Date of Birth Picker - Show only when editing */}
//           {isEditing && (
//             <BorderlessShadowCard
//               b_tl={0}
//               b_tr={0}
//               b_bl={0}
//               b_br={0}
//               style={{
//                 paddingVertical: 8,
//                 paddingHorizontal: 24,
//                 backgroundColor: '#F0E6D8',
//                 borderWidth: 2,
//                 borderColor: '#FFFFFF',
//               }}>
//               <DateOfBirthPicker
//                 value={editInfo.dateOfBirth}
//                 onChange={(date) => setEditInfo({ ...editInfo, dateOfBirth: date })}
//                 maximumDate={new Date()}
//               />
//             </BorderlessShadowCard>
//           )}

//           {/* Language */}
//           <InfoRow
//             label="Language"
//             value={isEditing ? editInfo.language : personalInfo.language}
//             onPress={() => setShowLanguagePicker(true)}
//             isEditing={isEditing}
//           />

//           {/* Country */}
//           <InfoRow
//             label="Country"
//             value={isEditing ? editInfo.country : personalInfo.country}
//             onPress={() => setShowCountryPicker(true)}
//             isEditing={isEditing}
//           />

//           {/* Edit Profile Button - Only in view mode */}
//           {!isEditing && (
//             <PrimaryVariantButton
//               onPress={handleEdit}
//               borderTopLeftRadius={0}
//               borderTopRightRadius={0}
//               borderBottomLeftRadius={24}
//               borderBottomRightRadius={24}
//               title="Edit Profile"
//             />
//           )}

//           {/* Action Buttons - Only in edit mode */}
//           {isEditing && (
//             <View className="mt-6 gap-3">
//               <PrimaryButton title="Save Changes" onPress={handleSave} style={{ flex: 1 }} />
//               <PrimaryButton
//                 title="Cancel"
//                 onPress={handleCancel}
//                 style={{ flex: 1 }}
//                 gradientColors={['#F0E6D8', '#F0E6D8', '#F0E6D8']}
//                 textStyle={{ color: '#361A0D' }}
//               />
//             </View>
//           )}
//         </View>
//       </ScrollView>

//       {/* Gender Picker Bottom Sheet */}
//       <PickerBottomSheet
//         visible={showGenderPicker}
//         onClose={() => setShowGenderPicker(false)}
//         title="Select Gender"
//         items={genders}
//         selectedValue={isEditing ? editInfo.gender : personalInfo.gender}
//         onSelect={handleGenderSelect}
//       />

//       {/* Language Picker Bottom Sheet */}
//       <PickerBottomSheet
//         visible={showLanguagePicker}
//         onClose={() => setShowLanguagePicker(false)}
//         title="Select Language"
//         items={languages}
//         selectedValue={isEditing ? editInfo.language : personalInfo.language}
//         onSelect={handleLanguageSelect}
//       />

//       {/* Country Picker Bottom Sheet */}
//       <PickerBottomSheet
//         visible={showCountryPicker}
//         onClose={() => setShowCountryPicker(false)}
//         title="Select Country"
//         items={countries}
//         selectedValue={isEditing ? editInfo.country : personalInfo.country}
//         onSelect={handleCountrySelect}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({});

// app/(flow)/settings/personal-info/index.tsx
import { ScrollView, StyleSheet, View, Animated } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/header/CustomHeader';
import { LAYOUT } from '@/constants/constants';
import { useToast } from '@/hooks/useToast';
import { useRouter } from 'expo-router';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import PrimaryVariantButton from '@/components/buttons/PrimaryVariantButton';
import { DateOfBirthPicker } from '@/components/ui/CustomDatePicker';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
import { InfoRow } from '@/components/personalInfo/InfoRow';
import { EditInputRow } from '@/components/personalInfo/EditInputRow';
import { AvatarCard } from '@/components/personalInfo/AvatarCard';
import { PickerBottomSheet } from '@/components/personalInfo/PickerBottomSheet';
import { PersonalInfo, genders, languages, countries } from '@/types/personalInfo';
import { useScreenReady } from '@/hooks/useScreenReady';
import LoadingScreen from '@/components/loading/LoadingScreen';
import ErrorScreen from '@/components/errors/ErrorScreen';

export default function PersonalInfoScreen() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [avatarUri, setAvatarUri] = useState('https://randomuser.me/api/portraits/women/64.jpg');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Animation values for smooth transitions
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Screen ready state - ONLY for initial load, not for mode changes
  const { isRendering, isContentReady, renderError } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  // Personal info state
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: 'Elena Rossi',
    email: 'elena.rossi@example.com',
    gender: 'Female',
    dateOfBirth: new Date(1990, 5, 15),
    language: 'English',
    country: 'United States',
  });

  // Temporary state for editing
  const [editInfo, setEditInfo] = useState<PersonalInfo>(personalInfo);
  const [editAvatarUri, setEditAvatarUri] = useState(avatarUri);

  // Mark initial load as complete after first render
  useEffect(() => {
    if (isContentReady && isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [isContentReady]);

  const handleEdit = () => {
    // Animate out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setEditInfo(personalInfo);
      setEditAvatarUri(avatarUri);
      setIsEditing(true);
      // Animate back in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Animate out
    Animated.timing(fadeAnim, {
      toValue: 0.5,
      duration: 150,
      useNativeDriver: true,
    }).start();

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      setPersonalInfo(editInfo);
      setAvatarUri(editAvatarUri);
      setIsEditing(false);
      showSuccess('Personal information updated successfully');

      // Animate back in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      showError('Failed to update information');
      // Animate back in on error
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Animate out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setEditInfo(personalInfo);
      setEditAvatarUri(avatarUri);
      setIsEditing(false);
      // Animate back in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleGenderSelect = (gender: string) => {
    if (isEditing) {
      setEditInfo({ ...editInfo, gender });
    } else {
      setPersonalInfo({ ...personalInfo, gender });
    }
  };

  const handleLanguageSelect = (language: string) => {
    if (isEditing) {
      setEditInfo({ ...editInfo, language });
    } else {
      setPersonalInfo({ ...personalInfo, language });
    }
  };

  const handleCountrySelect = (country: string) => {
    if (isEditing) {
      setEditInfo({ ...editInfo, country });
    } else {
      setPersonalInfo({ ...personalInfo, country });
    }
  };

  const handleAvatarChange = (uri: string) => {
    if (isEditing) {
      setEditAvatarUri(uri);
    } else {
      setAvatarUri(uri);
    }
  };

  const handleRetry = () => {
    router.replace('/(flow)/settings/personal-info');
  };

  // Show initial render loading (useScreenReady) - ONLY on first load
  if (isRendering && isInitialLoad) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <LoadingScreen loadingText="Loading your personal info..." />
      </SafeAreaView>
    );
  }

  // Show error if rendering failed
  if (renderError) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title="Personal Info" height={50} backButton={true} />
        <ErrorScreen message={renderError} onRetry={handleRetry} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
      <CustomHeader title="Personal Info" height={50} backButton={true} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
          paddingTop: 10,
          flexGrow: 1,
        }}
        className="flex-1">
        <Animated.View className="gap-3 px-container" style={{ opacity: fadeAnim }}>
          {/* Avatar Card */}
          <AvatarCard
            isEditing={isEditing}
            avatarUrl={isEditing ? editAvatarUri : avatarUri}
            onAvatarChange={handleAvatarChange}
          />

          {/* Name & Email Fields - Manual Inputs in Edit Mode */}
          {isEditing && (
            <View className="gap-3">
              <EditInputRow
                label="Full Name"
                value={editInfo.name}
                onChangeText={(value: string) => setEditInfo({ ...editInfo, name: value })}
              />
              <EditInputRow
                label="Email Address"
                value={editInfo.email}
                onChangeText={(value: string) => setEditInfo({ ...editInfo, email: value })}
                keyboardType="email-address"
              />
            </View>
          )}

          {/* View Mode - Display all info */}
          {!isEditing && (
            <>
              <InfoRow label="Name" value={personalInfo.name} isEditing={isEditing} />
              <InfoRow label="Email" value={personalInfo.email} isEditing={isEditing} />
            </>
          )}

          {/* Gender */}
          <InfoRow
            label="Gender"
            value={isEditing ? editInfo.gender : personalInfo.gender}
            onPress={() => setShowGenderPicker(true)}
            isEditing={isEditing}
          />

          {/* Date of Birth - Show InfoRow when NOT editing */}
          {!isEditing && (
            <InfoRow
              label="Date of Birth"
              value={formatDate(personalInfo.dateOfBirth)}
              isEditing={isEditing}
            />
          )}

          {/* Date of Birth Picker - Show only when editing */}
          {isEditing && (
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
              }}>
              <DateOfBirthPicker
                value={editInfo.dateOfBirth}
                onChange={(date) => setEditInfo({ ...editInfo, dateOfBirth: date })}
                maximumDate={new Date()}
              />
            </BorderlessShadowCard>
          )}

          {/* Language */}
          <InfoRow
            label="Language"
            value={isEditing ? editInfo.language : personalInfo.language}
            onPress={() => setShowLanguagePicker(true)}
            isEditing={isEditing}
          />

          {/* Country */}
          <InfoRow
            label="Country"
            value={isEditing ? editInfo.country : personalInfo.country}
            onPress={() => setShowCountryPicker(true)}
            isEditing={isEditing}
          />

          {/* Edit Profile Button - Only in view mode */}
          {!isEditing && (
            <PrimaryVariantButton
              onPress={handleEdit}
              borderTopLeftRadius={0}
              borderTopRightRadius={0}
              borderBottomLeftRadius={24}
              borderBottomRightRadius={24}
              title="Edit Profile"
            />
          )}

          {/* Action Buttons - Only in edit mode */}
          {isEditing && (
            <View className="mt-6 gap-3">
              <PrimaryButton
                title={isSaving ? 'Saving...' : 'Save Changes'}
                onPress={handleSave}
                style={{ flex: 1 }}
                disabled={isSaving}
                isLoading={isSaving}
              />
              <PrimaryButton
                title="Cancel"
                onPress={handleCancel}
                style={{ flex: 1 }}
                gradientColors={['#F0E6D8', '#F0E6D8', '#F0E6D8']}
                textStyle={{ color: '#361A0D' }}
                disabled={isSaving}
              />
            </View>
          )}
        </Animated.View>
      </ScrollView>

      {/* Gender Picker Bottom Sheet */}
      <PickerBottomSheet
        visible={showGenderPicker}
        onClose={() => setShowGenderPicker(false)}
        title="Select Gender"
        items={genders}
        selectedValue={isEditing ? editInfo.gender : personalInfo.gender}
        onSelect={handleGenderSelect}
      />

      {/* Language Picker Bottom Sheet */}
      <PickerBottomSheet
        visible={showLanguagePicker}
        onClose={() => setShowLanguagePicker(false)}
        title="Select Language"
        items={languages}
        selectedValue={isEditing ? editInfo.language : personalInfo.language}
        onSelect={handleLanguageSelect}
      />

      {/* Country Picker Bottom Sheet */}
      <PickerBottomSheet
        visible={showCountryPicker}
        onClose={() => setShowCountryPicker(false)}
        title="Select Country"
        items={countries}
        selectedValue={isEditing ? editInfo.country : personalInfo.country}
        onSelect={handleCountrySelect}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
