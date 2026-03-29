import { TouchableOpacity, View, ViewStyle, StyleProp, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Shadow } from 'react-native-shadow-2';

type IconButtonProps = {
  onPress?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  loaderColor?: string;
  gradientColors?: readonly [string, string, ...string[]];
  withShadow?: boolean;
};

export default function IconButton({
  onPress,
  disabled = false,
  className = '',
  icon,
  isLoading = false,
  loaderColor = '#FFFFFF',
  style,
  gradientColors = ['#e2d2c1', '#e2d2c1'],
  withShadow = true,
}: IconButtonProps) {
  const isButtonDisabled = disabled || isLoading;

  const ButtonContent = (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={isButtonDisabled}
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        opacity: isButtonDisabled ? 0.5 : 1,
      }}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0.14, y: 0 }}
        end={{ x: 0.85, y: 1 }}
        style={{
          width: '100%',
          height: 74,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {isLoading ? (
          <ActivityIndicator size="small" color={loaderColor} />
        ) : (
          <View className="items-center justify-center">{icon}</View>
        )}
      </LinearGradient>

      {/* Single border overlay for clean corners */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.6)',
          pointerEvents: 'none',
        }}
      />
    </TouchableOpacity>
  );

  if (!withShadow) {
    return (
      <View style={style} className={className}>
        {ButtonContent}
      </View>
    );
  }

  return (
    <View style={style} className={className}>
      <Shadow
        stretch
        distance={8}
        startColor="rgba(0, 0, 0, 0.03)"
        endColor="rgba(0, 0, 0, 0)"
        offset={[2, 4]}
        containerStyle={{ width: '100%' }}
        style={{ borderRadius: 16 }}>
        <Shadow
          stretch
          distance={5}
          startColor="rgba(0, 0, 0, 0.07)"
          endColor="rgba(0, 0, 0, 0)"
          offset={[1.8, 3.2]}
          containerStyle={{ width: '100%' }}
          style={{ borderRadius: 16 }}>
          <Shadow
            stretch
            distance={2.5}
            startColor="rgba(0, 0, 0, 0.1)"
            endColor="rgba(0, 0, 0, 0)"
            offset={[1.2, 2.2]}
            containerStyle={{ width: '100%' }}
            style={{ borderRadius: 16 }}>
            <Shadow
              stretch
              distance={1}
              startColor="rgba(0, 0, 0, 0.15)"
              endColor="rgba(0, 0, 0, 0)"
              offset={[0.8, 1.5]}
              containerStyle={{ width: '100%' }}
              style={{ borderRadius: 16 }}>
              {ButtonContent}
            </Shadow>
          </Shadow>
        </Shadow>
      </Shadow>
    </View>
  );
}
