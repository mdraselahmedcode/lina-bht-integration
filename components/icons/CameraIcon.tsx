import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  strokeWidth?: number;
};

export function CameraIcon({
  size = 50,
  color = '#000',
  strokeWidth = 2,
  style,
  ...props
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 50 50" fill="none" style={style} {...props}>
      <Path
        d="M30.2087 8.33398H19.792L14.5837 14.584H8.33366C7.22859 14.584 6.16878 15.023 5.38738 15.8044C4.60598 16.5858 4.16699 17.6456 4.16699 18.7507V37.5007C4.16699 38.6057 4.60598 39.6655 5.38738 40.4469C6.16878 41.2283 7.22859 41.6673 8.33366 41.6673H41.667C42.7721 41.6673 43.8319 41.2283 44.6133 40.4469C45.3947 39.6655 45.8337 38.6057 45.8337 37.5007V18.7507C45.8337 17.6456 45.3947 16.5858 44.6133 15.8044C43.8319 15.023 42.7721 14.584 41.667 14.584H35.417L30.2087 8.33398Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M25 33.334C28.4518 33.334 31.25 30.5358 31.25 27.084C31.25 23.6322 28.4518 20.834 25 20.834C21.5482 20.834 18.75 23.6322 18.75 27.084C18.75 30.5358 21.5482 33.334 25 33.334Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
