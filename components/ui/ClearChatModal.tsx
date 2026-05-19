// ─── Clear chat confirmation modal ───────────────────────────────────────────

import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface ClearChatModalProps {
  visible: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

function ClearChatModal({ visible, onConfirm, onClose }: ClearChatModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: '#00000066',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 24,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {}}
          style={{
            width: '100%',
            backgroundColor: '#FDF8F4',
            borderRadius: 24,
            padding: 24,
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,
              backgroundColor: '#EF444420',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}>
            <Text style={{ fontSize: 24 }}>🗑️</Text>
          </View>
          <Text
            style={{
              fontFamily: 'Outfit-SemiBold',
              fontSize: 18,
              color: '#2E2117',
              marginBottom: 6,
            }}>
            Clear Chat History
          </Text>
          <Text
            style={{
              fontFamily: 'Outfit-Regular',
              fontSize: 13,
              color: '#2E211799',
              marginBottom: 24,
              lineHeight: 20,
              textAlign: 'center',
            }}>
            This will permanently delete all messages. This action cannot be undone.
          </Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity
              onPress={onClose}
              style={{
                flex: 1,
                height: 48,
                borderRadius: 100,
                borderWidth: 1.5,
                borderColor: '#CAA78966',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ fontFamily: 'Outfit-Medium', fontSize: 14, color: '#2E2117' }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              style={{
                flex: 1,
                height: 48,
                borderRadius: 100,
                backgroundColor: '#EF4444',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ fontFamily: 'Outfit-Medium', fontSize: 14, color: '#FFFFFF' }}>
                Clear
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

export default ClearChatModal;
