// components/personalInfo/EditInputRow.tsx
import React from 'react';
import { View, Text, TextInput } from 'react-native';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';

interface EditInputRowProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

export const EditInputRow: React.FC<EditInputRowProps> = ({
  label,
  value,
  onChangeText,
  keyboardType = 'default',
}) => (
  <View>
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
      }}>
      <Text className="mb-1 font-outfit text-[12px]" style={{ color: '#2E211766' }}>
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={label}
        placeholderTextColor="#2E211766"
        keyboardType={keyboardType}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
        className="font-outfit text-[16px]"
        style={{ color: '#2E2117', padding: 0 }}
      />
    </BorderlessShadowCard>
  </View>
);
