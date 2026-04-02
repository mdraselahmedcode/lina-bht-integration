import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function WaveInHeartIcon({ size = 16, color = '#000', style, ...props }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={style} {...props}>
      <Path
        d="M12.6663 9.33333C13.6597 8.36 14.6663 7.19333 14.6663 5.66667C14.6663 4.69421 14.28 3.76158 13.5924 3.07394C12.9048 2.38631 11.9721 2 10.9997 2C9.82634 2 8.99967 2.33333 7.99967 3.33333C6.99967 2.33333 6.17301 2 4.99967 2C4.02721 2 3.09458 2.38631 2.40695 3.07394C1.71932 3.76158 1.33301 4.69421 1.33301 5.66667C1.33301 7.2 2.33301 8.36667 3.33301 9.33333L7.99967 14L12.6663 9.33333Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.14648 8.00033H6.33315L6.66648 7.33366L7.99982 10.3337L9.33315 5.66699L10.3332 8.00033H13.8465"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
