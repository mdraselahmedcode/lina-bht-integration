// components/inputs/OtpInput.tsx
import React, { useRef, useState, useCallback } from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

type OtpInputProps = {
  length?: number;
  numericOnly?: boolean;
  onChange?: (otp: string) => void;
  onComplete?: (otp: string) => void;
  autoFocus?: boolean;
  disabled?: boolean;
  inputProps?: TextInputProps;
  withShadow?: boolean;
};

const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  numericOnly = true,
  onChange,
  onComplete,
  autoFocus = true,
  disabled = false,
  inputProps,
  withShadow = true,
}) => {
  const [code, setCode] = useState<string[]>(Array(length).fill(''));
  const inputs = useRef<Array<TextInput | null>>(Array(length).fill(null));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleChange = useCallback(
    (text: string, index: number) => {
      if (numericOnly && !/^\d?$/.test(text)) return;

      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      const otp = newCode.join('');
      onChange?.(otp);

      // Auto-focus next input
      if (text && index < length - 1) {
        inputs.current[index + 1]?.focus();
      }

      if (!newCode.includes('') && otp.length === length) {
        onComplete?.(otp);
      }
    },
    [code, numericOnly, length, onChange, onComplete]
  );

  const handleFocus = useCallback((index: number) => {
    setFocusedIndex(index);
  }, []);

  const handleBlur = useCallback(() => {
    setFocusedIndex(null);
  }, []);

  const handleBackspace = useCallback(
    (index: number) => {
      if (code[index] === '' && index > 0) {
        inputs.current[index - 1]?.focus();
      }
    },
    [code]
  );

  const renderOtpBox = (value: string, index: number) => {
    const isFocused = focusedIndex === index;

    const boxContent = (
      <View
        key={index}
        style={{
          width: 52,
          height: 56,
          borderRadius: 24,
          backgroundColor: '#E8DDD0',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 2,
          borderColor: '#FFFFFF',
        }}>
        <TextInput
          ref={(el) => {
            inputs.current[index] = el;
          }}
          value={value}
          editable={!disabled}
          autoFocus={autoFocus && index === 0}
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') handleBackspace(index);
          }}
          keyboardType={numericOnly ? 'number-pad' : 'default'}
          returnKeyType="done"
          maxLength={1}
          textContentType="oneTimeCode"
          style={{
            width: '100%',
            height: '100%',
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '600',
            fontFamily: 'Outfit-SemiBold',
            color: '#4A3F35',
            backgroundColor: 'transparent',
            borderRadius: 24,
            marginTop: 4,
          }}
          {...inputProps}
        />
      </View>
    );

    if (!withShadow) {
      return boxContent;
    }

    return (
      <Shadow
        key={index}
        stretch
        distance={4}
        startColor="rgba(0, 0, 0, 0.08)"
        endColor="rgba(0, 0, 0, 0)"
        offset={[2, 3]}
        containerStyle={{ width: 52, height: 56 }}
        style={{ borderRadius: 24 }}>
        {boxContent}
      </Shadow>
    );
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 6 }}>
      {code.map((value, index) => renderOtpBox(value, index))}
    </View>
  );
};

export default OtpInput;
