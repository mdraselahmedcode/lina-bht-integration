import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
  width?: number;
  height?: number;
  strokeColor?: string;
  fillColor?: string;
  style?: StyleProp<ViewStyle>;
};

export function DotWideIcon({
  width = 102,
  height = 32,
  strokeColor = '#000',
  fillColor = '#ccc',
  style,
  ...props
}: IconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 102 32" fill="none" style={style} {...props}>
      <Path
        d="M0 26.6662C19.2 26.6662 28.8 15.9995 48 21.3328C67.2 26.6662 76.8 5.33284 96 10.6662"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M96 6.90039C97.7964 6.90039 99.3398 8.5359 99.3398 10.667C99.3398 12.7981 97.7964 14.4336 96 14.4336C94.2037 14.4335 92.6602 12.7981 92.6602 10.667C92.6602 8.53596 94.2037 6.90049 96 6.90039Z"
        fill={fillColor}
        stroke="#2A2118"
      />
    </Svg>
  );
}
