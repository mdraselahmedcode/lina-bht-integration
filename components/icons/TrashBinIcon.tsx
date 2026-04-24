import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function TrashBinIcon({ size = 12, color = '#000', style, ...props }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" fill="none" style={style} {...props}>
      <Path
        d="M1.5 3H10.5"
        stroke={color}
        strokeOpacity="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.5 3V10C9.5 10.5 9 11 8.5 11H3.5C3 11 2.5 10.5 2.5 10V3"
        stroke={color}
        strokeOpacity="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4 3V2C4 1.5 4.5 1 5 1H7C7.5 1 8 1.5 8 2V3"
        stroke={color}
        strokeOpacity="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
