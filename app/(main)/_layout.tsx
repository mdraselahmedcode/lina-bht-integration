// import { Tabs } from 'expo-router';
// import { View, TouchableOpacity, Animated, Dimensions } from 'react-native';
// import React, { useEffect, useRef } from 'react';
// import { SvgXml } from 'react-native-svg';
// import { HomeIcon, ScanTabIcon, RoutineIcon, ProfileIcon, ProgressIcon } from '@/components/icons';

// const { width: screenWidth } = Dimensions.get('window');
// const TAB_BAR_HEIGHT = 95;
// const MIDDLE_BUTTON_SIZE = 64;
// const REGULAR_BUTTON_SIZE = 56;

// const ACTIVE_COLOR = '#759A52';
// const INACTIVE_COLOR = '#4A3F35';

// // Smooth Deep Curve Tab Bar SVG using Cubic Bezier
// const TAB_BAR_SVG = (width: number) => {
//   const middle = width / 2;
//   const cutoutRadius = 50;
//   const cutoutStart = middle - cutoutRadius;
//   const cutoutEnd = middle + cutoutRadius;

//   const controlPoint1 = middle - 36;
//   const controlPoint2 = middle + 36;
//   const curveBottom = 75;

//   return `<svg width="${width}" height="120" viewBox="0 0 ${width} 120" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <defs>
//       <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
//         <feDropShadow dx="0" dy="-4" stdDeviation="4" flood-color="rgba(0,0,0,0.08)"/>
//       </filter>
//       <linearGradient id="tabGradient" x1="0" y1="0" x2="0" y2="1">
//         <stop offset="0%" stop-color="#DFD4C7"/>
//         <stop offset="100%" stop-color="#D4C8BB"/>
//       </linearGradient>
//     </defs>
//     <path d="M0 35
//              L${cutoutStart} 35
//              C${controlPoint1} 35, ${controlPoint1} ${curveBottom}, ${middle} ${curveBottom}
//              C${controlPoint2} ${curveBottom}, ${controlPoint2} 35, ${cutoutEnd} 35
//              L${width} 35
//              L${width} 120
//              L0 120 Z"
//           fill="url(#tabGradient)"
//           />
//     <path d="M0 35
//              L${cutoutStart} 35
//              C${controlPoint1} 35, ${controlPoint1} ${curveBottom}, ${middle} ${curveBottom}
//              C${controlPoint2} ${curveBottom}, ${controlPoint2} 35, ${cutoutEnd} 35
//              L${width} 35"
//           stroke="rgba(255,255,255,0.5)"
//           stroke-width="2"
//           fill="none"/>
//     <path d="M${cutoutStart + 5} 35
//              C${controlPoint1 + 5} 35, ${controlPoint1 + 5} ${curveBottom - 5}, ${middle} ${curveBottom - 5}
//              C${controlPoint2 - 5} ${curveBottom - 5}, ${controlPoint2 - 5} 35, ${cutoutEnd - 5} 35"
//           stroke="rgba(255,255,255,0.3)"
//           stroke-width="1.5"
//           fill="none"/>
//   </svg>`;
// };

// // Regular Tab Button Component
// const RegularTabButton = ({
//   focused,
//   onPress,
//   routeName,
// }: {
//   focused: boolean;
//   onPress: () => void;
//   routeName: string;
// }) => {
//   const scale = useRef(new Animated.Value(1)).current;
//   const iconSize = 26;

//   useEffect(() => {
//     Animated.spring(scale, {
//       toValue: focused ? 1.05 : 1,
//       useNativeDriver: true,
//       damping: 12,
//       stiffness: 100,
//     }).start();
//   }, [focused]);

//   let iconElement;
//   switch (routeName) {
//     case 'index':
//       iconElement = <HomeIcon size={iconSize} color={focused ? ACTIVE_COLOR : INACTIVE_COLOR} />;
//       break;
//     case 'routines/index':
//       iconElement = <RoutineIcon size={iconSize} color={focused ? ACTIVE_COLOR : INACTIVE_COLOR} />;
//       break;
//     case 'progress/index':
//       iconElement = (
//         <ProgressIcon size={iconSize} color={focused ? ACTIVE_COLOR : INACTIVE_COLOR} />
//       );
//       break;
//     case 'profile/index':
//       iconElement = <ProfileIcon size={iconSize} color={focused ? ACTIVE_COLOR : INACTIVE_COLOR} />;
//       break;
//     default:
//       iconElement = <HomeIcon size={iconSize} color={INACTIVE_COLOR} />;
//   }

//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       activeOpacity={0.7}
//       style={{
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: REGULAR_BUTTON_SIZE,
//         height: REGULAR_BUTTON_SIZE,
//         borderRadius: REGULAR_BUTTON_SIZE / 2,
//         backgroundColor: '#DFD4C7',
//         borderTopWidth: 2,
//         borderLeftWidth: 2,
//         borderBottomWidth: 1,
//         borderRightWidth: 1,
//         borderTopColor: '#FFFFFF99',
//         borderLeftColor: '#FFFFFF99',
//         borderBottomColor: '#FFFFFF66',
//         borderRightColor: '#FFFFFF66',
//       }}>
//       <Animated.View style={{ transform: [{ scale }] }}>{iconElement}</Animated.View>
//     </TouchableOpacity>
//   );
// };

// // Middle Tab Button Component (Sits in the curve)
// const MiddleTabButton = ({ focused, onPress }: { focused: boolean; onPress: () => void }) => {
//   const scale = useRef(new Animated.Value(1)).current;
//   const iconSize = 36;

//   useEffect(() => {
//     Animated.spring(scale, {
//       toValue: focused ? 1.05 : 1,
//       useNativeDriver: true,
//       damping: 12,
//       stiffness: 100,
//     }).start();
//   }, [focused]);

//   return (
//     <View
//       style={{
//         position: 'absolute',
//         // bottom: 25, // Keep this same as before
//         top: -40,
//         left: '50%',
//         marginLeft: -MIDDLE_BUTTON_SIZE / 2,
//         alignItems: 'center',
//         justifyContent: 'center',
//         zIndex: 999,
//       }}>
//       <TouchableOpacity
//         onPress={onPress}
//         activeOpacity={0.9}
//         style={{
//           width: MIDDLE_BUTTON_SIZE,
//           height: MIDDLE_BUTTON_SIZE,
//           borderRadius: MIDDLE_BUTTON_SIZE / 2,
//           backgroundColor: '#DFD4C7',
//           alignItems: 'center',
//           justifyContent: 'center',
//           borderTopWidth: 2,
//           borderLeftWidth: 2,
//           borderBottomWidth: 1,
//           borderRightWidth: 1,
//           borderTopColor: '#FFFFFF99',
//           borderLeftColor: '#FFFFFF99',
//           borderBottomColor: '#FFFFFF66',
//           borderRightColor: '#FFFFFF66',
//           shadowColor: '#000',
//           shadowOffset: { width: 0, height: 4 },
//           shadowOpacity: 0.25,
//           shadowRadius: 6,
//           elevation: 8,
//         }}>
//         <Animated.View style={{ transform: [{ scale }] }}>
//           <ScanTabIcon size={iconSize} color={focused ? ACTIVE_COLOR : INACTIVE_COLOR} />
//         </Animated.View>
//       </TouchableOpacity>
//     </View>
//   );
// };

// // Custom Tab Bar Component
// const CustomTabBar = ({ state, descriptors, navigation }: any) => {
//   const routes = state.routes;
//   const middleIndex = routes.findIndex((r: any) => r.name === 'diagnosis/index');
//   const leftRoutes = routes.slice(0, middleIndex);
//   const rightRoutes = routes.slice(middleIndex + 1);
//   const isMiddleFocused = state.index === middleIndex;

//   const handlePress = (route: any, isFocused: boolean) => {
//     const event = navigation.emit({
//       type: 'tabPress',
//       target: route.key,
//       canPreventDefault: true,
//     });

//     if (!isFocused && !event.defaultPrevented) {
//       navigation.navigate(route.name);
//     }
//   };

//   return (
//     <View
//       style={{
//         position: 'absolute',
//         bottom: -43,
//         left: 0,
//         right: 0,
//         height: TAB_BAR_HEIGHT + 60,
//         backgroundColor: 'transparent',
//       }}>
//       {/* Curved SVG Background */}
//       <SvgXml
//         xml={TAB_BAR_SVG(screenWidth)}
//         width={screenWidth}
//         height={TAB_BAR_HEIGHT + 65}
//         style={{ position: 'absolute', bottom: 60 }}
//       />

//       {/* Middle Button */}
//       <MiddleTabButton
//         focused={isMiddleFocused}
//         onPress={() => handlePress(routes[middleIndex], isMiddleFocused)}
//       />

//       {/* Left Side Buttons */}
//       <View
//         style={{
//           position: 'absolute',
//           top: 4,
//           left: 16,
//           flexDirection: 'row',
//           alignItems: 'center',
//           gap: 12,
//         }}>
//         {leftRoutes.map((route: any, idx: number) => {
//           const isFocused = state.index === routes.findIndex((r: any) => r.name === route.name);
//           return (
//             <RegularTabButton
//               key={route.key}
//               focused={isFocused}
//               onPress={() => handlePress(route, isFocused)}
//               routeName={route.name}
//             />
//           );
//         })}
//       </View>

//       {/* Right Side Buttons */}
//       <View
//         style={{
//           position: 'absolute',
//           top: 4,
//           right: 16,
//           flexDirection: 'row',
//           alignItems: 'center',
//           gap: 12,
//         }}>
//         {rightRoutes.map((route: any, idx: number) => {
//           const isFocused = state.index === routes.findIndex((r: any) => r.name === route.name);
//           return (
//             <RegularTabButton
//               key={route.key}
//               focused={isFocused}
//               onPress={() => handlePress(route, isFocused)}
//               routeName={route.name}
//             />
//           );
//         })}
//       </View>
//     </View>
//   );
// };

// export default function MainLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: true,
//         tabBarActiveTintColor: '#759A52',
//         tabBarInactiveTintColor: '#4A3F35',
//         headerStyle: {
//           backgroundColor: '#E8DDD0',
//         },
//         headerTitleStyle: {
//           fontWeight: '600',
//           color: '#361A0D',
//         },
//         tabBarShowLabel: false,
//         tabBarStyle: {
//           position: 'absolute',
//           backgroundColor: 'transparent',
//           elevation: 0,
//           height: 0,
//           borderTopWidth: 0,
//           display: 'none',
//         },
//       }}
//       tabBar={(props) => <CustomTabBar {...props} />}>
//       <Tabs.Screen name="index" options={{ title: 'Home' }} />
//       <Tabs.Screen name="routines/index" options={{ title: 'Routines' }} />
//       <Tabs.Screen name="diagnosis/index" options={{ title: 'Diagnosis' }} />
//       <Tabs.Screen name="progress/index" options={{ title: 'Progress' }} />
//       <Tabs.Screen name="profile/index" options={{ title: 'Profile' }} />
//     </Tabs>
//   );
// }

import { Tabs } from 'expo-router';
import { View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { SvgXml } from 'react-native-svg';
import { HomeIcon, ScanTabIcon, RoutineIcon, ProfileIcon, ProgressIcon } from '@/components/icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get('window');

const ACTIVE_COLOR = '#759A52';
const INACTIVE_COLOR = '#4A3F35';

// Responsive
const isTablet = screenWidth >= 768;
const isSmallPhone = screenWidth <= 375;

const TAB_BAR_HEIGHT = isTablet ? 95 : 95;
const MIDDLE_BUTTON_SIZE = isTablet ? 64 : isSmallPhone ? 64 : 64;
const REGULAR_BUTTON_SIZE = isTablet ? 55 : isSmallPhone ? 55 : 55;

const SIDE_PADDING = isTablet ? 30 : 16;

// 🔥 Curve config (FIXED)
const getCurveParams = () => {
  return {
    cutoutRadius: isTablet ? 55 : isSmallPhone ? 55 : 55,
    controlOffset: isTablet ? 40 : 40,
    curveDepth: isTablet ? 44 : 44, // 🔥 IMPORTANT
    topY: 0, // 🔥 consistent top line
  };
};

// 🔥 SVG (FULLY FIXED)
const TAB_BAR_SVG = (width: number, height: number) => {
  const middle = width / 2;
  const { cutoutRadius, controlOffset, curveDepth, topY } = getCurveParams();

  const start = middle - cutoutRadius;
  const end = middle + cutoutRadius;

  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
    
    <defs>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="-3" stdDeviation="6" flood-color="rgba(0,0,0,0.1)"/>
      </filter>

      <linearGradient id="tabGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#DFD4C7"/>
        <stop offset="100%" stop-color="#DFD4C7"/>
      </linearGradient>
    </defs>

    <!-- Background Shape -->
    <path d="
      M0 ${topY}
      L${start} ${topY}
      C${middle - controlOffset} ${topY}, ${middle - controlOffset} ${curveDepth}, ${middle} ${curveDepth}
      C${middle + controlOffset} ${curveDepth}, ${middle + controlOffset} ${topY}, ${end} ${topY}
      L${width} ${topY}
      L${width} ${height}
      L0 ${height}
      Z
    "
      fill="url(#tabGradient)"
      filter="url(#shadow)"
    />

    <!-- Top Border -->
    <path d="
      M0 ${topY}
      L${start} ${topY}
      C${middle - controlOffset} ${topY}, ${middle - controlOffset} ${curveDepth}, ${middle} ${curveDepth}
      C${middle + controlOffset} ${curveDepth}, ${middle + controlOffset} ${topY}, ${end} ${topY}
      L${width} ${topY}
    "
      stroke="rgba(255,255,255,0.6)"
      stroke-width="2"
      fill="none"
    />

  </svg>
  `;
};

// ✅ Regular Tab
const RegularTabButton = ({ focused, onPress, routeName }: any) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.05 : 1,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  const iconSize = isTablet ? 32 : 26;

  const getIcon = () => {
    switch (routeName) {
      case 'index':
        return <HomeIcon size={iconSize} color={focused ? ACTIVE_COLOR : INACTIVE_COLOR} />;
      case 'routines/index':
        return <RoutineIcon size={iconSize} color={focused ? ACTIVE_COLOR : INACTIVE_COLOR} />;
      case 'progress/index':
        return <ProgressIcon size={iconSize} color={focused ? ACTIVE_COLOR : INACTIVE_COLOR} />;
      case 'profile/index':
        return <ProfileIcon size={iconSize} color={focused ? ACTIVE_COLOR : INACTIVE_COLOR} />;
      default:
        return <HomeIcon size={iconSize} color={INACTIVE_COLOR} />;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: REGULAR_BUTTON_SIZE,
        height: REGULAR_BUTTON_SIZE,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: focused ? '#D9C9B9' : '#D9C9B9',
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderTopColor: '#FFFFFF99',
        borderLeftColor: '#FFFFFF99',
        borderBottomColor: '#FFFFFF66',
        borderRightColor: '#FFFFFF66',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: focused ? 4 : 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: focused ? 5 : 3,
      }}>
      <Animated.View style={{ transform: [{ scale }] }}>{getIcon()}</Animated.View>
    </TouchableOpacity>
  );
};

// ✅ Middle Button
const MiddleTabButton = ({ focused, onPress }: any) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.05 : 1,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <View
      style={{
        position: 'absolute',
        top: -MIDDLE_BUTTON_SIZE / 2.2, // 🔥 PERFECT ALIGN
        left: '50%',
        marginLeft: -MIDDLE_BUTTON_SIZE / 2,
        zIndex: 10,
      }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: MIDDLE_BUTTON_SIZE,
          height: MIDDLE_BUTTON_SIZE,
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',

          backgroundColor: focused ? '#D9C9B9' : '#D9C9B9',
          borderTopWidth: 2,
          borderLeftWidth: 2,
          borderBottomWidth: 1,
          borderRightWidth: 1,
          borderTopColor: '#FFFFFF99',
          borderLeftColor: '#FFFFFF99',
          borderBottomColor: '#FFFFFF62',
          borderRightColor: '#FFFFFF62',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: focused ? 4 : 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: focused ? 5 : 3,
        }}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <ScanTabIcon size={36} color={focused ? ACTIVE_COLOR : INACTIVE_COLOR} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

// ✅ Custom TabBar
const CustomTabBar = ({ state, navigation }: any) => {
  const insets = useSafeAreaInsets(); // 🔥 key fix
  const routes = state.routes;
  const middleIndex = routes.findIndex((r: any) => r.name === 'scans/index');

  const totalHeight = TAB_BAR_HEIGHT + insets.bottom;

  return (
    <View
      style={{
        height: totalHeight,
        paddingBottom: insets.bottom,
        backgroundColor: 'transparent', // keep this
        overflow: 'visible', // 🔥 IMPORTANT
      }}>
      {/* SVG Background */}
      <SvgXml
        xml={TAB_BAR_SVG(screenWidth, TAB_BAR_HEIGHT)}
        width={screenWidth}
        height={TAB_BAR_HEIGHT}
        style={{
          position: 'absolute',
          bottom: insets.bottom, // aligns curve with tab top
        }}
      />

      {/* Middle Button */}
      <MiddleTabButton
        focused={state.index === middleIndex}
        onPress={() => navigation.navigate(routes[middleIndex].name)}
      />

      {/* Tabs */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: SIDE_PADDING,
          marginTop: 15,
        }}>
        {routes.map((route: any, index: number) => {
          if (index === middleIndex) {
            return <View key={route.key} style={{ width: MIDDLE_BUTTON_SIZE }} />;
          }

          return (
            <RegularTabButton
              key={route.key}
              focused={state.index === index}
              onPress={() => navigation.navigate(route.name)}
              routeName={route.name}
            />
          );
        })}
      </View>
    </View>
  );
};

// ✅ Main Layout
export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: TAB_BAR_HEIGHT, // keep base height only
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          position: 'absolute', // optional but cleaner layering
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="routines/index" />
      <Tabs.Screen name="scans/index" />
      <Tabs.Screen name="progress/index" />
      <Tabs.Screen name="profile/index" />
    </Tabs>
  );
}
