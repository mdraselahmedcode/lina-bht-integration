import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function ProgressIcon({ size = 24, color = '#000', style, ...props }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} {...props}>
      <Path
        d="M2 12C2 7.286 2 4.929 3.464 3.464C4.93 2 7.286 2 12 2C16.714 2 19.071 2 20.535 3.464C22 4.93 22 7.286 22 12C22 16.714 22 19.071 20.535 20.535C19.072 22 16.714 22 12 22C7.286 22 4.929 22 3.464 20.535C2 19.072 2 16.714 2 12Z"
        stroke={color}
        strokeWidth="2"
      />
      <Path
        d="M7 14L9.293 11.707C9.48053 11.5195 9.73484 11.4142 10 11.4142C10.2652 11.4142 10.5195 11.5195 10.707 11.707L12.293 13.293C12.4805 13.4805 12.7348 13.5858 13 13.5858C13.2652 13.5858 13.5195 13.4805 13.707 13.293L17 10M17 10V12.5M17 10H14.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
