import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function SkinNutritionIcon({ size = 18, color = '#000', style, ...props }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none" style={style} {...props}>
      <Path
        d="M8.25029 15C6.93333 15.004 5.66298 14.5129 4.69118 13.6241C3.71938 12.7352 3.11711 11.5137 3.00384 10.2016C2.89057 8.8895 3.27456 7.58277 4.07965 6.54056C4.88475 5.49834 6.05214 4.79678 7.35029 4.575C11.6253 3.75 12.7503 3.36 14.2503 1.5C15.0003 3 15.7503 4.635 15.7503 7.5C15.7503 11.625 12.1653 15 8.25029 15Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.5 15.75C1.5 13.5 2.8875 11.73 5.31 11.25C7.125 10.89 9 9.75 9.75 9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
