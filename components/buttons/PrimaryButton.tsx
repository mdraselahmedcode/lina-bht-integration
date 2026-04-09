import {
  TouchableOpacity,
  Text,
  View,
  ViewStyle,
  StyleProp,
  ActivityIndicator,
  TextStyle,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Shadow } from 'react-native-shadow-2';
import { memo, useMemo } from 'react';

type ButtonProps = {
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
  className?: string;
  textClassName?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
  loaderColor?: string;
  gradientColors?: readonly [string, string, ...string[]];
  withShadow?: boolean;
  height?: number;
};

function PrimaryButton({
  title,
  onPress,
  disabled = false,
  className = '',
  textClassName = '',
  textStyle = '',
  leftIcon,
  rightIcon,
  isLoading = false,
  loaderColor = '#FFFFFF',
  height = 64,
  style,
  gradientColors = ['#e2d2c1', '#e2d2c1'],
  // gradientColors = ['#F0E6D8', '#F0E6D8', '#F0E6D8'],

  withShadow = true,
}: ButtonProps) {
  const isButtonDisabled = disabled || isLoading;

  const ButtonContent = (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      disabled={isButtonDisabled}
      className={`rounded-[100px] ${isButtonDisabled ? 'opacity-50' : ''}`}
      style={{
        overflow: 'hidden',
      }}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0.14, y: 0 }}
        end={{ x: 0.85, y: 1 }}
        // className="h-[64px] flex-row items-center justify-between px-3"
        className={` flex-row items-center justify-between px-3`}
        style={{
          height: height,
          borderRadius: 100,
          // Inner shadow effect using borders
          borderTopWidth: 1.5,
          borderLeftWidth: 1.5,
          borderRightWidth: 1,
          borderBottomWidth: 1,
          borderTopColor: 'rgba(255, 255, 255, 0.7)',
          borderLeftColor: 'rgba(255, 255, 255, 0.6)',
          borderRightColor: 'rgba(255, 255, 255, 0.5)',
          borderBottomColor: 'rgba(255, 255, 255, 0.5)',
        }}>
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="small" color={loaderColor} />
          </View>
        ) : (
          <>
            {/* Left Icon - Fixed width container */}
            <View className="w-6 items-start">{leftIcon && leftIcon}</View>

            {/* Title - Flexible center */}
            <View className="flex-1 items-center justify-center">
              <Text
                className={`font-outfitMedium text-btn20 text-[#361A0D] ${textClassName}`}
                // style={{ textAlign: 'center' }}>
                style={[{ textAlign: 'center' }, textStyle]}>
                {title}
              </Text>
            </View>

            {/* Right Icon - Fixed width container */}
            <View className="w-6 items-end">{rightIcon && rightIcon}</View>
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );

  const shadowButton = useMemo(() => {
    return (
      <Shadow
        stretch
        distance={8}
        startColor="rgba(0, 0, 0, 0.03)"
        endColor="rgba(0, 0, 0, 0)"
        offset={[2, 4]}
        containerStyle={{ width: '100%' }}
        style={{ borderRadius: 100 }}>
        {/* Layer 2: Medium shadow */}
        <Shadow
          stretch
          distance={5}
          startColor="rgba(0, 0, 0, 0.07)"
          endColor="rgba(0, 0, 0, 0)"
          offset={[1.8, 3.2]}
          containerStyle={{ width: '100%' }}
          style={{ borderRadius: 100 }}>
          {/* Layer 3: Inner shadow - darkest near button */}
          <Shadow
            stretch
            distance={2.5}
            startColor="rgba(0, 0, 0, 0.1)"
            endColor="rgba(0, 0, 0, 0)"
            offset={[1.2, 2.2]}
            containerStyle={{ width: '100%' }}
            style={{ borderRadius: 100 }}>
            {/* Layer 4: Closest shadow - sharp fade */}
            <Shadow
              stretch
              distance={1}
              startColor="rgba(0, 0, 0, 0.15)"
              endColor="rgba(0, 0, 0, 0)"
              offset={[0.8, 1.5]}
              containerStyle={{ width: '100%' }}
              style={{ borderRadius: 100 }}>
              {ButtonContent}
            </Shadow>
          </Shadow>
        </Shadow>
      </Shadow>
    );
  }, [onPress]);

  if (!withShadow) {
    return (
      <View style={style} className={className}>
        {ButtonContent}
      </View>
    );
  }

  // Multi-layer shadow with proper fade from dark to nothing
  return (
    <View style={style} className={className}>
      {/* Layer 1: Outer soft shadow - long fade */}
      {shadowButton}
    </View>
  );
}
export default memo(PrimaryButton);

// import {
//   TouchableOpacity,
//   Text,
//   View,
//   ViewStyle,
//   StyleProp,
//   ActivityIndicator,
//   TextStyle,
//   Platform,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';

// type ButtonProps = {
//   title?: string;
//   onPress?: () => void;
//   disabled?: boolean;
//   className?: string;
//   textClassName?: string;
//   leftIcon?: React.ReactNode;
//   rightIcon?: React.ReactNode;
//   style?: StyleProp<ViewStyle>;
//   textStyle?: StyleProp<TextStyle>;
//   isLoading?: boolean;
//   loaderColor?: string;
//   gradientColors?: readonly [string, string, ...string[]];
//   withShadow?: boolean;
//   height?: number;
// };

// export default function PrimaryButtonFast({
//   title,
//   onPress,
//   disabled = false,
//   className = '',
//   textClassName = '',
//   textStyle,
//   leftIcon,
//   rightIcon,
//   isLoading = false,
//   loaderColor = '#FFFFFF',
//   height = 64,
//   style,
//   gradientColors = ['#e2d2c1', '#e2d2c1'],
//   withShadow = true,
// }: ButtonProps) {
//   const isButtonDisabled = disabled || isLoading;

//   const ButtonContent = (
//     <TouchableOpacity
//       onPress={onPress}
//       activeOpacity={0.7}
//       disabled={isButtonDisabled}
//       style={{
//         opacity: isButtonDisabled ? 0.5 : 1,
//         height: height,
//         borderRadius: 100,
//         overflow: 'hidden',
//       }}>
//       <LinearGradient
//         colors={gradientColors}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={{
//           flex: 1,
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           paddingHorizontal: 16,
//           borderRadius: 100,
//           // Simple border for light effect (much faster than multiple shadows)
//           borderWidth: Platform.OS === 'ios' ? 0.5 : 1,
//           borderColor: 'rgba(255, 255, 255, 0.6)',
//         }}>
//         {isLoading ? (
//           <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <ActivityIndicator size="small" color={loaderColor} />
//           </View>
//         ) : (
//           <>
//             <View style={{ width: 24, alignItems: 'flex-start' }}>{leftIcon}</View>
//             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//               <Text
//                 className={`font-outfitMedium text-btn20 text-[#361A0D] ${textClassName}`}
//                 style={[{ textAlign: 'center' }, textStyle]}>
//                 {title}
//               </Text>
//             </View>
//             <View style={{ width: 24, alignItems: 'flex-end' }}>{rightIcon}</View>
//           </>
//         )}
//       </LinearGradient>
//     </TouchableOpacity>
//   );

//   // Simple shadow using elevation for Android and basic shadow for iOS
//   if (withShadow) {
//     return (
//       <View style={[style]}>
//         <View
//           style={{
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 2 },
//             shadowOpacity: 0.1,
//             shadowRadius: 4,
//             elevation: 3,
//           }}>
//           {ButtonContent}
//         </View>
//       </View>
//     );
//   }

//   return (
//     <View style={style} className={className}>
//       {ButtonContent}
//     </View>
//   );
// }
