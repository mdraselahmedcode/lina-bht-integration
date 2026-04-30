import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function WheelChairIcon({ size = 24, color = '#000', style, ...props }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} {...props}>
      <Path
        d="M15 4C15 3.44772 15.4477 3 16 3C16.5523 3 17 3.44772 17 4C17 4.55228 16.5523 5 16 5C15.4477 5 15 4.55228 15 4Z"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18 19L19 12L13 13"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 8L8 5L13.5 8L11.14 11.5"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.01953 14.5C3.42469 16.5302 4.02904 18.7356 5.56262 20.1309C7.0962 21.5263 9.27257 21.851 11.1195 20.96"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.9799 17.4893C14.5747 15.4591 13.9704 13.2537 12.4368 11.8584C10.9032 10.463 8.72684 10.1383 6.87988 11.0293"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
