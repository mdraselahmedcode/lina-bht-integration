import React from 'react';
import { Text, TextStyle, TextProps } from 'react-native';

interface HeaderPrimaryProps extends TextProps {
  text: string;
  style?: TextStyle;
  className?: string;
  color?: string;
}

const HeaderPrimary: React.FC<HeaderPrimaryProps> = ({
  text,
  style,
  className,
  numberOfLines,
  color,
  ...rest
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      className={`font-outfit text-[32px] ${className ?? ''}`}
      style={{ color: color || '#361A0D', ...style }}
      {...rest}>
      {text}
    </Text>
  );
};

export default HeaderPrimary;
