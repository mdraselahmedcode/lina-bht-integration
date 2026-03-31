import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  strokeWidth?: number;
};

export function BorderCircleIcon({
  size = 24,
  color = '#000',
  strokeWidth = 1,
  style,
  ...props
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 17 17" fill="none" style={style} {...props}>
      <Path
        d="M8.5 16C12.6421 16 16 12.6421 16 8.5C16 4.35786 12.6421 1 8.5 1C4.35786 1 1 4.35786 1 8.5C1 12.6421 4.35786 16 8.5 16Z"
        stroke={color}
        // strokeOpacity="0.2"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
