import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function ThreeStarsIcon({ size = 25, color = '#000', style, ...props }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none" style={style} {...props}>
      <Path
        d="M5.49752 8.47782C7.10483 12.2575 6.97036 14.2446 4.88594 17.4653C8.35937 15.8364 10.3463 15.9724 13.8734 18.0769C12.2661 14.2972 12.4006 12.3102 14.485 9.08941C11.0116 10.7183 9.02464 10.5823 5.49752 8.47782ZM18.1788 10.0932C18.9832 11.9838 18.9156 12.977 17.873 14.5869C19.6094 13.7721 20.6025 13.8397 22.3668 14.8927C21.5624 13.0021 21.63 12.009 22.6726 10.399C20.9362 11.2138 19.9431 11.1463 18.1788 10.0932ZM9.99902 3.14096C10.4012 4.08629 10.3675 4.58209 9.84613 5.38783C10.7151 4.98046 11.2109 5.01419 12.093 5.54072C11.6908 4.5954 11.7246 4.09959 12.2459 3.29386C11.377 3.70123 10.8811 3.66749 9.99902 3.14096Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
