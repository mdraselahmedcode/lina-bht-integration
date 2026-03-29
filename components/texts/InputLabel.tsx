import React from 'react';
import { Text, TextStyle } from 'react-native';

interface InputLabelProps {
  text: string;
  style?: TextStyle;
  className?: string; // 👈 add this
  numberOfLines?: number;
}

const InputLabel: React.FC<InputLabelProps> = ({ text, style, className, numberOfLines }) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      className={`mb-1 font-outfitMedium text-[14px] text-[#361A0D] ${className ?? ''}`}
      style={style}>
      {text ?? 'text here'}
    </Text>
  );
};

export default InputLabel;
