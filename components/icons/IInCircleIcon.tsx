import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
    size?: number;
    color?: string;
    style?: StyleProp<ViewStyle>;
};

export function IInCircleIcon({ size = 24, color = '#000', style, ...props }: IconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} {...props}>
            <Path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#7A5D3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M12 16V12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M12 8H12.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        </Svg>
    );
}
