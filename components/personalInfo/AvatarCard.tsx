// // components/personalInfo/AvatarCard.tsx
// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';
// import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
// import { Avatar } from '@/components/ui/Avatar';
// import { useToast } from '@/hooks/useToast';

// interface AvatarCardProps {
//   isEditing: boolean;
//   avatarUrl?: string;
//   onAvatarChange?: (uri: string) => void;
// }

// export const AvatarCard: React.FC<AvatarCardProps> = ({
//   isEditing,
//   avatarUrl = 'https://randomuser.me/api/portraits/women/64.jpg',
//   onAvatarChange,
// }) => {
//   const [imageUri, setImageUri] = useState(avatarUrl);
//   const [isLoading, setIsLoading] = useState(false);
//   const { showError, showSuccess } = useToast();

//   const pickImage = async () => {
//     try {
//       // Request permission
//       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

//       if (status !== 'granted') {
//         showError('Permission needed', 'Please grant camera roll permission to change photo');
//         return;
//       }

//       // Launch image picker
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.8,
//         base64: false,
//       });

//       if (!result.canceled && result.assets[0]) {
//         const selectedUri = result.assets[0].uri;
//         setImageUri(selectedUri);
//         onAvatarChange?.(selectedUri);
//         showSuccess('Photo updated successfully');
//       }
//     } catch (error) {
//       console.error('Error picking image:', error);
//       showError('Failed to pick image');
//     }
//   };

//   const takePhoto = async () => {
//     try {
//       // Request camera permission
//       const { status } = await ImagePicker.requestCameraPermissionsAsync();

//       if (status !== 'granted') {
//         showError('Permission needed', 'Please grant camera permission to take a photo');
//         return;
//       }

//       // Launch camera
//       const result = await ImagePicker.launchCameraAsync({
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.8,
//       });

//       if (!result.canceled && result.assets[0]) {
//         const selectedUri = result.assets[0].uri;
//         setImageUri(selectedUri);
//         onAvatarChange?.(selectedUri);
//         showSuccess('Photo updated successfully');
//       }
//     } catch (error) {
//       console.error('Error taking photo:', error);
//       showError('Failed to take photo');
//     }
//   };

//   const showImageOptions = () => {
//     Alert.alert(
//       'Change Profile Photo',
//       'Choose an option',
//       [
//         { text: 'Take Photo', onPress: takePhoto },
//         { text: 'Choose from Gallery', onPress: pickImage },
//         { text: 'Cancel', style: 'cancel' },
//       ],
//       { cancelable: true }
//     );
//   };

//   const handlePress = () => {
//     if (isEditing) {
//       showImageOptions();
//     }
//   };

//   return (
//     <BorderlessShadowCard
//       style={{
//         paddingVertical: 24,
//         paddingHorizontal: 24,
//         alignItems: 'center',
//       }}>
//       <TouchableOpacity onPress={handlePress} disabled={!isEditing} activeOpacity={0.7}>
//         <View
//           style={{
//             shadowColor: '#000',
//             shadowOffset: { width: 4, height: 5 },
//             shadowOpacity: 0.2,
//             shadowRadius: 8,
//             elevation: 8,
//             borderRadius: 999,
//             borderWidth: 2,
//             borderColor: '#759A52',
//           }}>
//           <Avatar
//             source={imageUri}
//             size={102}
//             fallbackIcon="person-circle"
//             iconColor="#361A0D"
//             backgroundColor="#E5E0D8"
//           />
//           {isLoading && (
//             <View className="absolute inset-0 items-center justify-center rounded-full bg-black/50">
//               <ActivityIndicator size="large" color="#FFFFFF" />
//             </View>
//           )}
//         </View>
//         {isEditing && (
//           <View className="absolute bottom-0 right-0 rounded-full bg-[#7A8B6A] p-2">
//             <Ionicons name="camera" size={14} color="#FFFFFF" />
//           </View>
//         )}
//       </TouchableOpacity>
//       <Text className="mt-3 font-outfitMedium text-[16px]" style={{ color: '#2A2118' }}>
//         {isEditing ? 'Tap to change photo' : 'Upload Photo'}
//       </Text>
//     </BorderlessShadowCard>
//   );
// };

// components/personalInfo/AvatarCard.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
import { Avatar } from '@/components/ui/Avatar';
import { useToast } from '@/hooks/useToast';

interface AvatarCardProps {
  isEditing: boolean;
  avatarUrl?: string;
  onAvatarChange?: (uri: string) => void;
}

export const AvatarCard: React.FC<AvatarCardProps> = ({
  isEditing,
  avatarUrl = 'https://randomuser.me/api/portraits/women/64.jpg',
  onAvatarChange,
}) => {
  const [imageUri, setImageUri] = useState(avatarUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { showError, showSuccess } = useToast();

  const pickImage = async () => {
    setShowModal(false);
    setIsLoading(true);
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        showError('Permission needed', 'Please grant camera roll permission to change photo');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const selectedUri = result.assets[0].uri;
        setImageUri(selectedUri);
        onAvatarChange?.(selectedUri);
        showSuccess('Photo updated successfully');
      }
    } catch (error) {
      console.error('Error picking image:', error);
      showError('Failed to pick image');
    } finally {
      setIsLoading(false);
    }
  };

  const takePhoto = async () => {
    setShowModal(false);
    setIsLoading(true);
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== 'granted') {
        showError('Permission needed', 'Please grant camera permission to take a photo');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const selectedUri = result.assets[0].uri;
        setImageUri(selectedUri);
        onAvatarChange?.(selectedUri);
        showSuccess('Photo updated successfully');
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      showError('Failed to take photo');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePress = () => {
    if (isEditing) {
      setShowModal(true);
    }
  };

  return (
    <>
      <BorderlessShadowCard
        style={{
          paddingVertical: 24,
          paddingHorizontal: 24,
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={handlePress} disabled={!isEditing} activeOpacity={0.7}>
          <View
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 4, height: 5 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 8,
              borderRadius: 999,
              borderWidth: 2,
              borderColor: '#759A52',
            }}>
            <Avatar
              source={imageUri}
              size={102}
              fallbackIcon="person-circle"
              iconColor="#361A0D"
              backgroundColor="#E5E0D8"
            />
            {isLoading && (
              <View className="absolute inset-0 items-center justify-center rounded-full bg-black/50">
                <ActivityIndicator size="large" color="#FFFFFF" />
              </View>
            )}
          </View>
          {isEditing && (
            <View className="absolute bottom-0 right-0 rounded-full bg-[#7A8B6A] p-2">
              <Ionicons name="camera" size={14} color="#FFFFFF" />
            </View>
          )}
        </TouchableOpacity>
        <Text className="mt-3 font-outfitMedium text-[16px]" style={{ color: '#2A2118' }}>
          {isEditing ? 'Tap to change photo' : 'Upload Photo'}
        </Text>
      </BorderlessShadowCard>

      {/* Centered Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowModal(false)}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#E8DDD0',
              borderRadius: 28,
              width: '85%',
              maxWidth: 340,
              overflow: 'hidden',
            }}>
            {/* Header with Icon */}
            <View className="items-center pb-4 pt-6">
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: '#7A5D3E',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}>
                <Ionicons name="camera" size={36} color="#FFFFFF" />
              </View>
              <Text className="font-outfitBold text-[22px]" style={{ color: '#2E2117' }}>
                Change Photo
              </Text>
              <Text
                className="mt-1 px-6 text-center font-outfit text-[14px]"
                style={{ color: '#2E2117B2' }}>
                Choose how you&apos;d like to update your profile picture
              </Text>
            </View>

            {/* Divider */}
            <View className="mx-6 h-[1px] bg-[#2E2117]/10" />

            {/* Options */}
            <View className="px-4 py-4">
              {/* Camera Option */}
              <TouchableOpacity
                onPress={takePhoto}
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 14,
                  paddingHorizontal: 16,
                  backgroundColor: '#F0E6D8',
                  borderRadius: 14,
                  marginBottom: 12,
                  // Shadow for iOS
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  // Shadow for Android
                  elevation: 3,
                }}>
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: '#7A5D3E',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                    // Inner shadow effect
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    elevation: 2,
                  }}>
                  <Ionicons name="camera" size={22} color="#FFFFFF" />
                </View>
                <View className="flex-1">
                  <Text className="font-outfitMedium text-[16px]" style={{ color: '#2E2117' }}>
                    Take Photo
                  </Text>
                  <Text className="font-outfit text-[12px]" style={{ color: '#2E2117B2' }}>
                    Use your camera to take a new photo
                  </Text>
                </View>
                <Ionicons name="arrow-forward" size={20} color="#2E2117B2" />
              </TouchableOpacity>

              {/* Gallery Option */}
              <TouchableOpacity
                onPress={pickImage}
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 14,
                  paddingHorizontal: 16,
                  backgroundColor: '#F0E6D8',
                  borderRadius: 14,
                  marginBottom: 12,
                  // Shadow for iOS
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  // Shadow for Android
                  elevation: 3,
                }}>
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: '#7A5D3E',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                    // Inner shadow effect
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    elevation: 2,
                  }}>
                  <Ionicons name="images" size={22} color="#FFFFFF" />
                </View>
                <View className="flex-1">
                  <Text className="font-outfitMedium text-[16px]" style={{ color: '#2E2117' }}>
                    Choose from Gallery
                  </Text>
                  <Text className="font-outfit text-[12px]" style={{ color: '#2E2117B2' }}>
                    Select a photo from your gallery
                  </Text>
                </View>
                <Ionicons name="arrow-forward" size={20} color="#2E2117B2" />
              </TouchableOpacity>
            </View>

            {/* Cancel Button */}
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              activeOpacity={0.7}
              style={{
                paddingVertical: 16,
                backgroundColor: '#FFFFFF',
                borderTopWidth: 1,
                borderTopColor: '#E8DDD0',
              }}>
              <Text
                className="text-center font-outfitMedium text-[16px]"
                style={{ color: '#2E2117' }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};
