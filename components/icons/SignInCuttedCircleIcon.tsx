import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
    size?: number;
    color?: string;
    style?: StyleProp<ViewStyle>;
};

export function SignInCuttedCircleIcon({ size = 24, color = '#000', style, ...props }: IconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} {...props}>
            <Path d="M21.8006 9.9995C22.2573 12.2408 21.9318 14.5709 20.8785 16.6013C19.8251 18.6317 18.1075 20.2396 16.0121 21.1568C13.9167 22.0741 11.5702 22.2453 9.36391 21.6419C7.15758 21.0385 5.2248 19.6969 3.88789 17.8409C2.55097 15.9849 1.89073 13.7267 2.01728 11.4429C2.14382 9.15904 3.04949 6.98759 4.58326 5.29067C6.11703 3.59375 8.18619 2.47393 10.4457 2.11795C12.7052 1.76198 15.0184 2.19136 16.9996 3.3345" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M9 11L12 14L22 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    );
}
