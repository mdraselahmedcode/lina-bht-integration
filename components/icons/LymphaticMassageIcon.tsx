import Svg, { Path, Circle, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function LymphaticMassageIcon({ size = 26, color = '#000', style, ...props }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26" fill="none" style={style} {...props}>
      <Path
        d="M20.5837 15.1667C22.1978 13.585 23.8337 11.6892 23.8337 9.20833C23.8337 7.62809 23.2059 6.11256 22.0885 4.99516C20.9711 3.87775 19.4556 3.25 17.8753 3.25C15.9687 3.25 14.6253 3.79167 13.0003 5.41667C11.3753 3.79167 10.032 3.25 8.12533 3.25C6.54508 3.25 5.02955 3.87775 3.91215 4.99516C2.79474 6.11256 2.16699 7.62809 2.16699 9.20833C2.16699 11.7 3.79199 13.5958 5.41699 15.1667L13.0003 22.75L20.5837 15.1667Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.9999 5.41602L9.79324 8.62268C9.57313 8.8412 9.39844 9.10111 9.27922 9.38744C9.16001 9.67377 9.09863 9.98086 9.09863 10.291C9.09863 10.6012 9.16001 10.9083 9.27922 11.1946C9.39844 11.4809 9.57313 11.7408 9.79324 11.9593C10.6816 12.8477 12.1007 12.8802 13.0432 12.0352L15.2857 9.97685C15.8478 9.46681 16.5797 9.18427 17.3387 9.18427C18.0977 9.18427 18.8295 9.46681 19.3916 9.97685L22.5982 12.8585"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.4997 16.2507L17.333 14.084"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.2497 19.5007L14.083 17.334"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
