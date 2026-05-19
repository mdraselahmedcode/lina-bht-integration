// // config/toastConfig.tsx
// import { BaseToast, ErrorToast, ToastConfig } from 'react-native-toast-message';

// export const toastConfig: ToastConfig = {
//   success: (props) => (
//     <BaseToast
//       {...props}
//       style={{ borderLeftColor: '#95B287', backgroundColor: '#E8DDD0' }}
//       contentContainerStyle={{ paddingHorizontal: 15 }}
//       text1Style={{
//         fontSize: 16,
//         fontWeight: '600',
//         color: '#2C5F2D',
//       }}
//       text2Style={{
//         fontSize: 14,
//         color: '#4A3F35',
//       }}
//     />
//   ),
//   error: (props) => (
//     <ErrorToast
//       {...props}
//       style={{ borderLeftColor: '#FF6B6B', backgroundColor: '#E8DDD0' }}
//       text1Style={{
//         fontSize: 16,
//         fontWeight: '600',
//         color: '#D32F2F',
//       }}
//       text2Style={{
//         fontSize: 14,
//         color: '#4A3F35',
//       }}
//     />
//   ),
//   info: (props) => (
//     <BaseToast
//       {...props}
//       style={{ borderLeftColor: '#95B287', backgroundColor: '#E8DDD0' }}
//       contentContainerStyle={{ paddingHorizontal: 15 }}
//       text1Style={{
//         fontSize: 16,
//         fontWeight: '600',
//         color: '#2C5F2D',
//       }}
//       text2Style={{
//         fontSize: 14,
//         color: '#4A3F35',
//       }}
//     />
//   ),
// };

// config/toastConfig.tsx
import { BaseToast, ErrorToast, ToastConfig } from 'react-native-toast-message';

export const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#95B287',
        backgroundColor: '#E8DDD0',
        minHeight: 72,
        height: 'auto',
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingVertical: 8,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: '600',
        color: '#2C5F2D',
      }}
      text2Style={{
        fontSize: 14,
        color: '#4A3F35',
        flexWrap: 'wrap',
      }}
      text2NumberOfLines={4}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: '#FF6B6B',
        backgroundColor: '#E8DDD0',
        minHeight: 72,
        height: 'auto',
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingVertical: 8,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: '600',
        color: '#D32F2F',
      }}
      text2Style={{
        fontSize: 14,
        color: '#4A3F35',
        flexWrap: 'wrap',
      }}
      text2NumberOfLines={4}
    />
  ),

  info: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#95B287',
        backgroundColor: '#E8DDD0',
        minHeight: 72,
        height: 'auto',
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingVertical: 8,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: '600',
        color: '#2C5F2D',
      }}
      text2Style={{
        fontSize: 14,
        color: '#4A3F35',
        flexWrap: 'wrap',
      }}
      text2NumberOfLines={4}
    />
  ),
};
