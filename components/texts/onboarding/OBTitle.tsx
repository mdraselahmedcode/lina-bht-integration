import React from 'react';
import { Text, TextStyle, TextProps } from 'react-native';

interface OBTitleProps extends TextProps {
  text: string | number;
  style?: TextStyle;
  className?: string; // <-- allows extra NativeWind classes
  color?: string;
}

const OBTitle: React.FC<OBTitleProps> = ({
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
      className={`text-text26 font-outfit ${className ?? ''}`} // merge classes
      style={{ color: color || '#361A0D', ...style }}
      {...rest} // passes props like ellipsizeMode, adjusts, etc.
    >
      {text}
    </Text>
  );
};

export default OBTitle;
