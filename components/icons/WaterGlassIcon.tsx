import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function WaterGlassIcon({ size = 24, color = '#000', style, ...props }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} {...props}>
      <Path
        d="M5.11035 4.104C5.08087 3.82232 5.17232 3.54136 5.36199 3.33089C5.55166 3.12041 5.82176 3.00016 6.10522 3H17.8955C18.1791 3.00013 18.4494 3.12052 18.6391 3.33122C18.8288 3.54192 18.9201 3.82316 18.8904 4.105L17.1949 20.21C17.0873 21.228 16.2277 22.0005 15.2031 22H8.79756C7.76917 22.0057 6.90379 21.2318 6.79582 20.21L5.11035 4.104Z"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 11C7.77778 9.66667 10.2222 9.66667 12 11C13.7778 12.3333 16.2222 12.3333 18 11"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
