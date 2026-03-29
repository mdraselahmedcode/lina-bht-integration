import React from 'react';
import { Text, TextStyle, TextProps } from 'react-native';

interface OBSubtitleProps extends TextProps {
  text: string | number;
  style?: TextStyle;
  className?: string; // <-- allows extra NativeWind classes
  color?: string;
}

export const OBSubtitle: React.FC<OBSubtitleProps> = ({
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
      className={`font-outfit text-subtitle20 ${className ?? ''}`} // merge classes
      style={{ color: color || '#361A0D', ...style }}
      {...rest} // passes props like ellipsizeMode, adjusts, etc.
    >
      {text}
    </Text>
  );
};

export default OBSubtitle;
