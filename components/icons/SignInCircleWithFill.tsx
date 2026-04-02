import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
  size?: number;
  fillColor?: string;
  strokeColor?: string;
  style?: StyleProp<ViewStyle>;
};

export function SignInCircleWithFillIcon({
  size = 20,
  fillColor = '#000',
  strokeColor = '#FFFFFF',
  style,
  ...props
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={style} {...props}>
      <Path
        d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
        fill={fillColor}
        fill-opacity="0.2"
      />
      <Path
        d="M14 7L8.5 12.5L6 10"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
