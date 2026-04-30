import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function EarIcon({ size = 24, color = '#000', style, ...props }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} {...props}>
      <Path
        d="M5 7.08767C5 4.09553 7.42438 1.66992 10.415 1.66992C13.4056 1.66992 15.83 4.09553 15.83 7.08767C15.83 12.0887 10.8315 12.0887 10.8315 15.4227C10.8315 17.0338 9.5261 18.3399 7.91577 18.3399C6.30543 18.3399 5 17.0338 5 15.4227"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.5001 7.08333C12.5001 5.93274 11.5666 5 10.4151 5C9.26356 5 8.33008 5.93274 8.33008 7.08333V7.91667C9.25129 7.91667 9.99808 8.66286 9.99808 9.58333C9.99808 10.5038 9.25129 11.25 8.33008 11.25"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
