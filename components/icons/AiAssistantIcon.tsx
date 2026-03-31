import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function AiAssistantIcon({ size = 26, color = '#000', style, ...props }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 37 37" fill="none" style={style} {...props}>
      <Path
        d="M8.0431 12.4034C10.3947 17.9333 10.1979 20.8404 7.14833 25.5525C12.2301 23.1693 15.1371 23.3682 20.2974 26.4472C17.9458 20.9174 18.1425 18.0103 21.1922 13.2982C16.1104 15.6813 13.2034 15.4824 8.0431 12.4034ZM26.5964 14.7668C27.7732 17.5329 27.6743 18.9858 26.149 21.3413C28.6893 20.1491 30.1423 20.248 32.7235 21.7887C31.5467 19.0226 31.6456 17.5696 33.1709 15.2141C30.6305 16.4063 29.1775 16.3074 26.5964 14.7668ZM14.629 4.59535C15.2174 5.9784 15.168 6.70379 14.4053 7.88262C15.6766 7.28661 16.402 7.33597 17.6926 8.10631C17.1042 6.72326 17.1535 5.99787 17.9162 4.81905C16.645 5.41505 15.9196 5.36569 14.629 4.59535Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
