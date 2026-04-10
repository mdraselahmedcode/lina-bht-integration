import React from 'react';
import { Text, TextStyle, StyleProp } from 'react-native';

interface AuthFormTitleProps {
  text: string;
  style?: StyleProp<TextStyle>; // Using StyleProp is safer for combined styles
  className?: string; // 1. Defined as string
  numberOfLines?: number;
  color?: string;
}

const AuthFormTitle: React.FC<AuthFormTitleProps> = ({
  text,
  style,
  numberOfLines,
  color = '#361A0D',
  className = '',
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      // 3. Injected into the template literal
      className={`text-center font-didot text-authTitle36  ${className}`}
      style={[{ color: color || '#361A0D' }, style]}>
      {text}
    </Text>
  );
};

export default AuthFormTitle;
