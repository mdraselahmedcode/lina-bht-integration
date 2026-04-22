// // components/loading/LoadingScreen.tsx
// import React from 'react';
// import { View, ActivityIndicator, Text } from 'react-native';

// interface LoadingScreenProps {
//   backgroundColor?: string;
//   loaderColor?: string;
//   loadingText?: string;
// }

// export default function LoadingScreen({
//   backgroundColor = '#E8DDD0',
//   loaderColor = '#95B287',
//   loadingText = 'Setting up your environment ',
// }: LoadingScreenProps) {
//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor,
//       }}>
//       <ActivityIndicator size="large" color={loaderColor} />
//       {loadingText && (
//         <Text className="font-didot" style={{ color: '#361A0D', marginTop: 5 }}>
//           {loadingText}
//         </Text>
//       )}
//     </View>
//   );
// }

// components/loading/LoadingScreen.tsx
import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

interface LoadingScreenProps {
  backgroundColor?: string;
  loaderColor?: string;
  loadingText?: string;
  transparent?: boolean;
}

export default function LoadingScreen({
  backgroundColor = '#E8DDD0',
  loaderColor = '#95B287',
  loadingText = 'Setting up your environment ',
  transparent = true,
}: LoadingScreenProps) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: transparent ? 'transparent' : backgroundColor,
      }}>
      <ActivityIndicator size="large" color={loaderColor} />
      {loadingText && (
        <Text className="font-didot" style={{ color: '#361A0D', marginTop: 5 }}>
          {loadingText}
        </Text>
      )}
    </View>
  );
}
