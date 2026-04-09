// // components/ai-assistant/ChatInput.tsx
// import React, { useRef } from 'react';
// import { View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
// import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
// import { SendButtonIcon } from '@/components/icons';

// interface ChatInputProps {
//   inputText: string;
//   setInputText: (text: string) => void;
//   isTyping: boolean;
//   onSend: () => void;
//   bottomInset: number;
// }

// export const ChatInput: React.FC<ChatInputProps> = ({
//   inputText,
//   setInputText,
//   isTyping,
//   onSend,
//   bottomInset,
// }) => {
//   const inputRef = useRef<TextInput>(null);

//   return (
//     <View style={{ marginBottom: Math.max(bottomInset, 12) }}>
//       <BorderlessShadowCard
//         b_tl={0}
//         b_tr={0}
//         b_bl={24}
//         b_br={24}
//         style={{
//           paddingVertical: 12,
//           paddingHorizontal: 20,
//           borderWidth: 1,
//           borderColor: '#FFFFFF',
//         }}>
//         <View className="flex-row items-center gap-2">
//           <View className="flex-1 rounded-full bg-white px-4 py-2">
//             <TextInput
//               ref={inputRef}
//               value={inputText}
//               onChangeText={setInputText}
//               placeholder="Ask about your skin..."
//               placeholderTextColor="#2E211766"
//               className="font-outfit text-[14px]"
//               style={{ color: '#2E2117', padding: 0, maxHeight: 100 }}
//               multiline
//               numberOfLines={4}
//               returnKeyType="send"
//               onSubmitEditing={onSend}
//             />
//           </View>

//           <TouchableOpacity
//             onPress={onSend}
//             disabled={!inputText.trim() || isTyping}
//             activeOpacity={0.8}
//             style={{
//               width: 44,
//               height: 44,
//               borderRadius: 22,
//               backgroundColor: inputText.trim() && !isTyping ? '#7A8B6A' : '#2E21173D',
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}>
//             {isTyping ? (
//               <ActivityIndicator size="small" color="#FFFFFF" />
//             ) : (
//               <SendButtonIcon size={18} color="#FFFFFF" />
//             )}
//           </TouchableOpacity>
//         </View>
//       </BorderlessShadowCard>
//     </View>
//   );
// };
