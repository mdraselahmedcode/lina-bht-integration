import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function ThreeCurvedIcon({
  width = 26,
  height = 24,
  color = '#000',
  style,
  ...props
}: IconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 26 24" fill="none" style={style} {...props}>
      <Path
        d="M13.934 20.866C14.2298 21.0878 14.574 21.2362 14.9384 21.2989C15.3028 21.3616 15.6768 21.3368 16.0297 21.2265C16.3826 21.1163 16.7043 20.9238 16.9682 20.6648C17.2321 20.4059 17.4307 20.088 17.5476 19.7372C17.6645 19.3865 17.6964 19.013 17.6406 18.6475C17.5849 18.282 17.4431 17.935 17.2269 17.635C17.0107 17.3351 16.7263 17.0908 16.3972 16.9223C16.0681 16.7539 15.7037 16.666 15.334 16.666H1.33398"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.4173 7.33268C19.7156 6.93495 20.1106 6.62007 20.5649 6.41794C21.0191 6.21582 21.5174 6.13315 22.0126 6.1778C22.5077 6.22245 22.9833 6.39293 23.394 6.67305C23.8047 6.95317 24.1371 7.33363 24.3594 7.77831C24.5817 8.22299 24.6867 8.71712 24.6644 9.21378C24.642 9.71044 24.4931 10.1932 24.2317 10.6161C23.9703 11.039 23.6052 11.3881 23.171 11.6302C22.7367 11.8723 22.2478 11.9993 21.7507 11.9993H1.33398"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.434 3.13268C10.7298 2.91085 11.074 2.76248 11.4384 2.6998C11.8028 2.63711 12.1768 2.66191 12.5297 2.77215C12.8826 2.88239 13.2043 3.07491 13.4682 3.33385C13.7321 3.59279 13.9307 3.91074 14.0476 4.26148C14.1645 4.61223 14.1964 4.98574 14.1406 5.35124C14.0849 5.71673 13.9431 6.06374 13.7269 6.36367C13.5107 6.66361 13.2263 6.90788 12.8972 7.07635C12.5681 7.24482 12.2037 7.33268 11.834 7.33268H1.33398"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
