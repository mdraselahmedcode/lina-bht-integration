import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function RoutineIcon({ size = 26, color = '#000', style, ...props }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26" fill="none" style={style} {...props}>
      <Path
        d="M8.66699 2.16602V6.49935"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.333 2.16602V6.49935"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.5833 4.33398H5.41667C4.22005 4.33398 3.25 5.30403 3.25 6.50065V21.6673C3.25 22.8639 4.22005 23.834 5.41667 23.834H20.5833C21.78 23.834 22.75 22.8639 22.75 21.6673V6.50065C22.75 5.30403 21.78 4.33398 20.5833 4.33398Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.25 10.834H22.75"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
