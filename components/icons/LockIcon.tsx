import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function LockIcon({ size = 32, color = '#000', style, ...props }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style} {...props}>
      <Path
        d="M25.3333 14.667H6.66667C5.19391 14.667 4 15.8609 4 17.3337V26.667C4 28.1398 5.19391 29.3337 6.66667 29.3337H25.3333C26.8061 29.3337 28 28.1398 28 26.667V17.3337C28 15.8609 26.8061 14.667 25.3333 14.667Z"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.33301 14.667V9.33366C9.33301 7.56555 10.0354 5.86986 11.2856 4.61961C12.5359 3.36937 14.2316 2.66699 15.9997 2.66699C17.7678 2.66699 19.4635 3.36937 20.7137 4.61961C21.964 5.86986 22.6663 7.56555 22.6663 9.33366V14.667"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
