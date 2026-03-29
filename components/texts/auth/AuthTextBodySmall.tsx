import React from 'react';
import { Text, TextStyle, StyleProp } from 'react-native';

interface AuthTextBodySmallProps {
  text: string;
  style?: StyleProp<TextStyle>; // Using StyleProp is safer for combined styles
  className?: string; // 1. Defined as string
  numberOfLines?: number;
  color?: string;
}

const AuthTextBodySmall: React.FC<AuthTextBodySmallProps> = ({
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
      className={`font-primous text-[16px]  ${className}`}
      style={[{ color: color || '#503939' }, style]}>
      {text}
    </Text>
  );
};

export default AuthTextBodySmall;
