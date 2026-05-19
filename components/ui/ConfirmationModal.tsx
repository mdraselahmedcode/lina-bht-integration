// components/ui/ConfirmationModal.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  iconName?: string;
  iconColor?: string;
  confirmButtonColor?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  iconName = 'alert-circle',
  iconColor = '#EF4444',
  confirmButtonColor = '#EF4444',
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-black/50 px-6">
        <View className="w-full rounded-2xl bg-[#E8DDD0] p-6" style={{ maxWidth: 380 }}>
          {/* Icon */}
          <View className="mb-4 items-center">
            <View
              className="h-[50] w-[50] items-center justify-center rounded-full"
              style={{ backgroundColor: `${iconColor}20` }}>
              <Ionicons
                name={iconName as any}
                style={{ marginLeft: 3 }}
                size={28}
                color={iconColor}
              />
            </View>
          </View>

          {/* Title */}
          <Text
            className="mb-2 text-center font-outfitMedium text-[20px]"
            style={{ color: '#2E2117' }}>
            {title}
          </Text>

          {/* Message */}
          <Text className="mb-6 text-center font-outfit text-[14px]" style={{ color: '#361A0DCC' }}>
            {message}
          </Text>

          {/* Buttons */}
          <View className="flex-row gap-3">
            <TouchableOpacity onPress={onClose} className="flex-1 rounded-xl bg-gray-100 py-3">
              <Text
                className="text-center font-outfitMedium text-[14px]"
                style={{ color: '#2E2117' }}>
                {cancelText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              className="flex-1 rounded-xl py-3"
              style={{ backgroundColor: confirmButtonColor }}>
              <Text className="text-center font-outfitMedium text-[14px] text-white">
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
