import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function ZLikeIcon({ size = 20, color = '#000', style, ...props }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={style} {...props}>
      <Path
        d="M18.3337 10.0003H16.267C15.9028 9.99955 15.5484 10.1181 15.2579 10.3378C14.9675 10.5575 14.757 10.8663 14.6587 11.217L12.7003 18.1837C12.6877 18.2269 12.6614 18.2649 12.6253 18.292C12.5893 18.319 12.5454 18.3337 12.5003 18.3337C12.4552 18.3337 12.4114 18.319 12.3753 18.292C12.3393 18.2649 12.3129 18.2269 12.3003 18.1837L7.70033 1.81699C7.6877 1.77372 7.66139 1.73571 7.62533 1.70866C7.58926 1.68161 7.5454 1.66699 7.50033 1.66699C7.45525 1.66699 7.41139 1.68161 7.37533 1.70866C7.33926 1.73571 7.31295 1.77372 7.30033 1.81699L5.34199 8.78366C5.24405 9.13295 5.03481 9.44076 4.74605 9.66034C4.45728 9.87992 4.10476 9.99929 3.74199 10.0003H1.66699"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
