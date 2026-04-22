// components/lifePhase/CustomPhaseInput.tsx
import React from 'react';
import { View, Text } from 'react-native';
import InputField from '@/components/inputs/Input';

interface CustomPhaseInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const CustomPhaseInput: React.FC<CustomPhaseInputProps> = ({ value, onChange }) => {
  return (
    <View style={{ marginTop: 20 }}>
      <Text className="mb-2 font-outfitMedium text-[14px] text-titleTextColor">
        Please specify your current phase
      </Text>
      <InputField
        value={value}
        handler={(_, val) => onChange(val)}
        placeHolder="e.g., Trying to conceive, Perimenopause, etc."
        showLabel={false}
        height={56}
        withShadow={true}
        borderRadius={100}
        inputStyle={{ fontSize: 13 }}
        animated={true}
        animationDuration={200}
        initialOpacity={0}
      />
    </View>
  );
};
