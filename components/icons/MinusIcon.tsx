import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function MinusIcon({ width = 24, height = 4, color = '#000', style, ...props }: IconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 28 4" fill="none" style={style} {...props}>
      <Path
        d="M2 2H26"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
