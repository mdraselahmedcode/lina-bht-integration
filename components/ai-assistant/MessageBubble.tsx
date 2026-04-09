// // components/ai-assistant/MessageBubble.tsx
// import React from 'react';
// import { View, Text } from 'react-native';
// import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';

// export interface Message {
//   id: string;
//   text: string;
//   isUser: boolean;
//   timestamp: Date;
// }

// export interface MessageBubbleProps {
//   message: Message;
// }

// export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
//   const formatTime = (date: Date) => {
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   return (
//     <View className={`mb-3 ${message.isUser ? 'items-end' : 'items-start'}`}>
//       <BorderlessShadowCard
//         b_tl={message.isUser ? 16 : 2}
//         b_tr={message.isUser ? 2 : 16}
//         b_bl={16}
//         b_br={16}
//         style={{
//           paddingVertical: 12,
//           paddingHorizontal: 16,
//           backgroundColor: message.isUser ? '#7A8B6A' : '#FFFFFF',
//           maxWidth: '85%',
//         }}>
//         <Text
//           className="font-outfit text-[14px] leading-5"
//           style={{ color: message.isUser ? '#FFFFFF' : '#2E2117' }}>
//           {message.text}
//         </Text>
//         <Text
//           className="mt-1 font-outfit text-[10px]"
//           style={{
//             color: message.isUser ? '#FFFFFFCC' : '#2E211766',
//             textAlign: 'right',
//           }}>
//           {formatTime(message.timestamp)}
//         </Text>
//       </BorderlessShadowCard>
//     </View>
//   );
// };
