// import React from 'react';
// import { View, TouchableOpacity, Text } from 'react-native';
// import { useRouter } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';

// import { LinearGradient } from 'expo-linear-gradient';

// type CustomHeaderProps = {
//   title: string;
//   subtitle?: string;
//   backgroundColor?: string;
//   backButton?: boolean;
//   height?: number;
//   paddingTop?: number;
//   paddingBottom?: number;
//   backIconSize?: number;
//   backIconColor?: string;
//   needPaddingX?: boolean;
//   // Right side props
//   rightIcon?: React.ReactNode;
//   onRightIconPress?: () => void;
//   rightIconPosition?: 'flex-end' | 'center' | 'flex-start';
// };

// const CustomHeader: React.FC<CustomHeaderProps> = ({
//   title,
//   subtitle,
//   backgroundColor = '#E8DDD0',
//   backButton = true,
//   height = 80,
//   paddingTop = 0,
//   paddingBottom = 0,
//   backIconSize = 24,
//   backIconColor = '#111827',
//   needPaddingX = true,
//   rightIcon,
//   onRightIconPress,
//   rightIconPosition = 'flex-end',
// }) => {
//   const router = useRouter();

//   return (
//     <View
//       className={`${needPaddingX ? 'px-container' : ''}`}
//       style={{
//         paddingTop,
//         paddingBottom,
//         backgroundColor,
//         height,
//         borderBottomWidth: 1,
//         borderBottomColor: 'transparent',
//       }}>
//       {/* Main row with title and right icon */}
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           marginTop: 5,
//         }}>
//         {/* Left side with back button and title */}
//         <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
//           {backButton && (
//             <TouchableOpacity
//               activeOpacity={1}
//               onPress={() => router.back()}
//               style={{ marginRight: 16 }}
//               hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
//               <LinearGradient
//                 colors={['#F0E6D8', '#F0E6D8', '#F0E6D8', '#F0E6D8']}
//                 locations={[0.03, 0.7, 1, 1]}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//                 style={{
//                   width: 40,
//                   height: 40,
//                   borderWidth: 0,
//                   borderColor: '#E5E7EB',
//                   borderRadius: 100,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   shadowColor: '#000',
//                   shadowOffset: { width: 0, height: 3 },
//                   shadowOpacity: 0.3,
//                   shadowRadius: 7,
//                   elevation: 7,
//                 }}>
//                 <Ionicons name="chevron-back" size={backIconSize} color="#2A2118" />
//               </LinearGradient>
//             </TouchableOpacity>
//           )}

//           <Text
//             numberOfLines={1}
//             className="flex-1 text-start font-outfitMedium "
//             style={{ fontSize: 24, color: '#2A2118' }}>
//             {title}
//           </Text>
//         </View>

//         {/* Right side icon */}
//         {rightIcon && (
//           <TouchableOpacity
//             onPress={onRightIconPress}
//             disabled={!onRightIconPress}
//             activeOpacity={0.7}
//             style={{
//               marginLeft: 16,
//               justifyContent: 'center',
//               alignItems: rightIconPosition,
//             }}>
//             {rightIcon}
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* Subtitle */}
//       {subtitle && (
//         <Text
//           numberOfLines={1}
//           className="mt-3 text-start font-outfit text-[16px]"
//           style={{ color: '#2A2118B2' }}>
//           {subtitle}
//         </Text>
//       )}
//     </View>
//   );
// };

// export default CustomHeader;

import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type CustomHeaderProps = {
  title: string;
  subtitle?: string;
  backgroundColor?: string;
  backButton?: boolean;
  height?: number;
  paddingTop?: number;
  paddingBottom?: number;
  backIconSize?: number;
  backIconColor?: string;
  needPaddingX?: boolean;

  // Back navigation
  backRoute?: string;

  // Right side props
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  rightIconPosition?: 'flex-end' | 'center' | 'flex-start';
};

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  subtitle,
  backgroundColor = '#E8DDD0',
  backButton = true,
  height = 80,
  paddingTop = 0,
  paddingBottom = 0,
  backIconSize = 24,
  backIconColor = '#111827',
  needPaddingX = true,
  backRoute,
  rightIcon,
  onRightIconPress,
  rightIconPosition = 'flex-end',
}) => {
  const router = useRouter();

  const handleBackPress = () => {
    if (backRoute) {
      router.push(backRoute as any);
    } else {
      router.back();
    }
  };

  return (
    <View
      className={needPaddingX ? 'px-container' : ''}
      style={{
        paddingTop,
        paddingBottom,
        backgroundColor,
        height,
        borderBottomWidth: 1,
        borderBottomColor: 'transparent',
      }}>
      {/* Main row */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 5,
        }}>
        {/* Left side */}
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          {backButton && (
            <TouchableOpacity
              activeOpacity={1}
              onPress={handleBackPress}
              style={{ marginRight: 16 }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <LinearGradient
                colors={['#F0E6D8', '#F0E6D8', '#F0E6D8', '#F0E6D8']}
                locations={[0.03, 0.7, 1, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.3,
                  shadowRadius: 7,
                  elevation: 7,
                }}>
                <Ionicons
                  name="chevron-back"
                  size={backIconSize}
                  color={backIconColor || '#2A2118'}
                />
              </LinearGradient>
            </TouchableOpacity>
          )}

          <Text
            numberOfLines={1}
            className="flex-1 font-outfitMedium"
            style={{
              fontSize: 24,
              color: '#2A2118',
            }}>
            {title}
          </Text>
        </View>

        {/* Right icon */}
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
            activeOpacity={0.7}
            style={{
              marginLeft: 16,
              justifyContent: 'center',
              alignItems: rightIconPosition,
            }}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {/* Subtitle */}
      {subtitle && (
        <Text
          numberOfLines={1}
          className="mt-3 font-outfit text-[16px]"
          style={{ color: '#2A2118B2' }}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

export default CustomHeader;
