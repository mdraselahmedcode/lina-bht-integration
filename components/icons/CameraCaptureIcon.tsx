import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = SvgProps & {
    size?: number;
    color?: string;
    style?: StyleProp<ViewStyle>;
};

export function CameraCaptureIcon({ size = 80, color = '#000', style, ...props }: IconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={style} {...props}>
            <Path d="M40 2C60.9868 2 78 19.0132 78 40C78 60.9868 60.9868 78 40 78C19.0132 78 2 60.9868 2 40C2 19.0132 19.0132 2 40 2Z" stroke="#361A0D" strokeWidth="4" />
            <Path d="M8 40C8 22.3269 22.3269 8 40 8C57.6731 8 72 22.3269 72 40C72 57.6731 57.6731 72 40 72C22.3269 72 8 57.6731 8 40Z" fill="white" />

        </Svg>
    );
}
