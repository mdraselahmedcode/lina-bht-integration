import React from 'react';
import { Text, TextStyle, StyleProp } from 'react-native';

interface TextBodySmallProps {
  text: string;
  style?: StyleProp<TextStyle>; // Using StyleProp is safer for combined styles
  className?: string; // 1. Defined as string
  numberOfLines?: number;
  color?: string;
}

const TextBodySmall: React.FC<TextBodySmallProps> = ({
  text,
  style,
  numberOfLines,
  color,
  className = '',
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      // 3. Injected into the template literal
      className={`font-outfitMedium text-[12px] text-[#503939]/80 ${className}`}
      style={[{ color: color || '#323135' }, style]}>
      {text}
    </Text>
  );
};

export default TextBodySmall;
