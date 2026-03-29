import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function PlusInCircleIcon({ size = 34, color = '#000', style, ...props }: IconProps) {
  const width = size;
  const height = size;
  return (
    <Svg width={width} height={height} viewBox="0 0 34 34" fill="none" style={style} {...props}>
      <Path
        d="M11.3333 17H17M17 17H22.6667M17 17V22.6667M17 17V11.3333M17 29.75C9.95837 29.75 4.25 24.0416 4.25 17C4.25 9.95837 9.95837 4.25 17 4.25C24.0416 4.25 29.75 9.95837 29.75 17C29.75 24.0416 24.0416 29.75 17 29.75Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
