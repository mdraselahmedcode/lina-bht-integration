// components/scans/BaseCameraScan.tsx
import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Dimensions, Vibration } from 'react-native';
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '../buttons/PrimaryButton';
import { useToast } from '@/hooks/useToast';

const { width, height } = Dimensions.get('window');

interface BaseCameraScanProps {
  scanType: string;
  title?: string;
  subtitle?: string;
  onCapture?: (photoUri: string) => void;
}

export const BaseCameraScan: React.FC<BaseCameraScanProps> = ({
  scanType,
  title = 'Position your face within the frame',
  subtitle = 'Ensure good lighting for best results',
  onCapture,
}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isTakingPicture, setIsTakingPicture] = useState(false);
  const [cameraFacing, setCameraFacing] = useState<CameraType>('front');
  const [isSwitchingCamera, setIsSwitchingCamera] = useState(false);

  const cameraRef = useRef<any>(null);
  const insets = useSafeAreaInsets();

  const { showError, showSuccess } = useToast();

  // Handle camera switching
  const switchCamera = () => {
    setIsSwitchingCamera(true);
    setCameraFacing((prev) => (prev === 'back' ? 'front' : 'back'));

    setTimeout(() => {
      setIsSwitchingCamera(false);
    }, 300);
  };

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="mb-4 text-white">We need camera permission to scan</Text>
        <TouchableOpacity onPress={requestPermission} className="rounded-lg bg-blue-500 px-6 py-3">
          <Text className="font-semibold text-white">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current && !isTakingPicture) {
      setIsTakingPicture(true);
      Vibration.vibrate(50);

      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: true,
        });

        if (onCapture) {
          onCapture(photo.uri);
        } else {
          router.push({
            pathname: `/(flow)/${scanType}/loading-screen`,
            params: {
              imageUri: photo.uri,
              scanType: scanType,
            },
          });
        }
      } catch (error) {
        console.error('Error taking picture:', error);
        // Alert.alert('Error', 'Failed to capture image. Please try again.');
        showError('Failed to capture image. Please try again.');
      } finally {
        setIsTakingPicture(false);
      }
    }
  };

  return (
    <View className="flex-1 bg-black">
      <CameraView ref={cameraRef} style={StyleSheet.absoluteFillObject} facing={cameraFacing} />

      <View className="absolute inset-0">
        {/* Dark overlay for better text visibility */}
        {/* <View className="absolute inset-0 bg-black/40" /> */}

        <View className="flex-row items-center ">
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              position: 'absolute',
              top: Math.max(insets.top, 16),
              left: Math.max(insets.left, 16),
              width: 44,
              height: 44,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: 22,
              zIndex: 20,
            }}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>

          {/* Camera Switch Button */}
          <TouchableOpacity
            onPress={switchCamera}
            disabled={isSwitchingCamera}
            style={{
              position: 'absolute',
              top: Math.max(insets.top, 16),
              right: Math.max(insets.right, 16),
              width: 44,
              height: 44,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: 22,
              zIndex: 20,
            }}>
            <Ionicons name="camera-reverse-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Camera Facing Indicator */}
        <View
          style={{
            position: 'absolute',
            top: Math.max(insets.top, 70),
            right: Math.max(insets.right, 16),
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: 12,
            paddingHorizontal: 8,
            paddingVertical: 4,
            zIndex: 20,
            marginTop: 20,
          }}>
          <Text className="font-outfit text-[10px] text-white/70">
            {cameraFacing === 'back' ? 'Back' : 'Front'} Camera
          </Text>
        </View>

        {/* Instruction Text */}
        <View
          style={{
            position: 'absolute',
            bottom: 160 + insets.bottom,
            left: 0,
            right: 0,
            alignItems: 'center',
            zIndex: 10,
          }}>
          <Text className="mb-2 text-center font-outfitMedium text-base text-white">{title}</Text>
          <Text className="text-center font-outfit text-sm text-white/70">{subtitle}</Text>
        </View>

        {/* Capture Button */}
        <View
          style={{
            position: 'absolute',
            bottom: Math.max(insets.bottom + 30, 40),
            left: 20,
            right: 20,
            alignItems: 'center',
          }}>
          <PrimaryButton
            title="Capture Photo"
            onPress={takePicture}
            disabled={isTakingPicture}
            isLoading={isTakingPicture}
            loaderColor="#361A0D"
            style={{ width: '100%' }}
            gradientColors={['#759A52', '#FFFFFF99']}
            textStyle={{ fontSize: 16, fontWeight: '600' }}
          />
        </View>
      </View>
    </View>
  );
};
