// // components/CustomTabBar.tsx
// import { View, TouchableOpacity, Animated, Dimensions } from 'react-native';
// import React, { useEffect, useRef } from 'react';
// import { SvgXml } from 'react-native-svg';
// import { HomeIcon, ScanTabIcon, RoutineIcon, ProfileIcon, ProgressIcon } from '@/components/icons';

// const { width: screenWidth } = Dimensions.get('window');
// const TAB_BAR_HEIGHT = 80;
// const MIDDLE_BUTTON_SIZE = 60;
// const ACTIVE_COLOR = '#759A52';
// const INACTIVE_COLOR = '#4A3F35';

// const TAB_BAR_SVG = `...`; // Your SVG string here

// const TabButton = ({ focused, onPress, routeName, isMiddle }: any) => {
//   const scale = useRef(new Animated.Value(1)).current;
//   const iconSize = isMiddle ? 32 : 24;
//   const buttonSize = isMiddle ? MIDDLE_BUTTON_SIZE : 50;

//   useEffect(() => {
//     Animated.spring(scale, {
//       toValue: focused ? 1.05 : 1,
//       useNativeDriver: true,
//       damping: 12,
//       stiffness: 100,
//     }).start();
//   }, [focused]);

//   const getIcon = () => {
//     const color = focused ? ACTIVE_COLOR : INACTIVE_COLOR;
//     switch (routeName) {
//       case 'index':
//         return <HomeIcon size={iconSize} color={color} />;
//       case 'routines/index':
//         return <RoutineIcon size={iconSize} color={color} />;
//       case 'diagnosis/index':
//         return <ScanTabIcon size={iconSize} color={color} />;
//       case 'progress/index':
//         return <ProgressIcon size={iconSize} color={color} />;
//       case 'profile/index':
//         return <ProfileIcon size={iconSize} color={color} />;
//       default:
//         return <HomeIcon size={iconSize} color={color} />;
//     }
//   };

//   const buttonStyle = {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: buttonSize,
//     height: buttonSize,
//     borderRadius: buttonSize / 2,
//     backgroundColor: '#DFD4C7',
//     borderTopWidth: 2,
//     borderLeftWidth: 2,
//     borderBottomWidth: 1,
//     borderRightWidth: 1,
//     borderTopColor: '#FFFFFF99',
//     borderLeftColor: '#FFFFFF99',
//     borderBottomColor: '#FFFFFF66',
//     borderRightColor: '#FFFFFF66',
//     ...(isMiddle && {
//       position: 'absolute',
//       bottom: 15,
//       left: '50%',
//       marginLeft: -buttonSize / 2,
//       zIndex: 999,
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 4 },
//       shadowOpacity: 0.2,
//       shadowRadius: 4,
//       elevation: 5,
//     }),
//   };

//   return (
//     <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={buttonStyle}>
//       <Animated.View style={{ transform: [{ scale }] }}>{getIcon()}</Animated.View>
//     </TouchableOpacity>
//   );
// };

// export const CustomTabBar = ({ state, descriptors, navigation }: any) => {
//   return (
//     <View style={{ position: 'relative', height: TAB_BAR_HEIGHT, width: screenWidth }}>
//       <SvgXml
//         xml={TAB_BAR_SVG}
//         width={screenWidth}
//         height={TAB_BAR_HEIGHT + 30}
//         style={{ position: 'absolute', bottom: 0 }}
//       />
//       <View
//         style={{
//           flexDirection: 'row',
//           height: TAB_BAR_HEIGHT,
//           alignItems: 'center',
//           justifyContent: 'space-around',
//           paddingHorizontal: 16,
//           position: 'absolute',
//           bottom: 0,
//           left: 0,
//           right: 0,
//         }}>
//         {state.routes.map((route: any, index: number) => {
//           const isFocused = state.index === index;
//           const onPress = () => {
//             const event = navigation.emit({
//               type: 'tabPress',
//               target: route.key,
//               canPreventDefault: true,
//             });
//             if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
//           };
//           return (
//             <TabButton
//               key={route.key}
//               focused={isFocused}
//               onPress={onPress}
//               routeName={route.name}
//               isMiddle={route.name === 'diagnosis/index'}
//             />
//           );
//         })}
//       </View>
//     </View>
//   );
// };
