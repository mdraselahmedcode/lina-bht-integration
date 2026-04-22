import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function CircleCornerCuttedIcon({ size = 24, color = '#000', style, ...props }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} {...props}>
      <Path
        d="M21.3751 13.1253C20.6251 16.8753 17.7978 20.4057 13.8291 21.1951C9.86042 21.9846 5.83311 20.1385 3.84055 16.6167C1.848 13.0949 2.33991 8.69208 5.06059 5.69685C7.78128 2.70161 12.3751 1.87529 16.1251 3.37529"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
