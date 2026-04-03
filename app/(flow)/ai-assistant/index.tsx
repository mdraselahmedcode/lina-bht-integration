// /* eslint-disable import/no-unresolved */
// import { ScrollView, StyleSheet, Text, View } from 'react-native';
// import React from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import CustomHeader from '@/components/header/CustomHeader';
// import { LAYOUT } from '@/constants/constants';
// import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
// import { ProtectionIcon, ThreeStarsIcon } from '@/components/icons';
// import { CircularIconButton } from '@/components/buttons/CircularIconButton';
// import { StarWithDoublePlusIcon } from '@/components/icons/StarWithDoublePlusIcon';

// interface PrivacySection {
//   id: string;
//   number: string;
//   title: string;
//   description: string;
// }

// const AiAssistantScreen = () => {
//   return (
//     <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
//       <CustomHeader title="AI Assistant" height={50} backButton={true} />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{
//           paddingBottom: LAYOUT.screen.scrollViewPaddingBottom,
//           paddingTop: 10,
//           flexGrow: 1,
//         }}
//         className="flex-1">
//         <View className="flex-1 px-container">
//           {/* Single Borderless Shadow Card containing all content */}
//           <BorderlessShadowCard
//             b_tl={24}
//             b_tr={24}
//             b_bl={0}
//             b_br={0}
//             style={{
//               paddingVertical: 24,
//               paddingHorizontal: 24,
//               marginTop: 12,
//             }}>
//             {/* Data Protection Header */}
//             <View className="flex-row items-center gap-3">
//               <CircularIconButton size={50} icon={<ThreeStarsIcon size={25} color="#361A0D" />} />
//               <View className="flex-1">
//                 <Text
//                   className="text-start font-outfitMedium text-[24px]  "
//                   style={{ color: '#2A2118' }}>
//                   Gixy AI
//                 </Text>
//                 <Text
//                   className="text-start font-outfitMedium text-[12px]  "
//                   style={{ color: '#77B839' }}>
//                   Online
//                 </Text>
//               </View>
//             </View>
//           </BorderlessShadowCard>
//           <BorderlessShadowCard
//             b_tl={0}
//             b_tr={0}
//             b_bl={24}
//             b_br={24}
//             style={{
//               paddingVertical: 16,
//               paddingHorizontal: 24,
//               borderWidth: 1,
//               borderColor: '#FFFFFF',
//               flex: 1,
//             }}>
//             {/* Data Protection Header */}
//             <View className="flex-row items-center gap-3">
//               <BorderlessShadowCard
//                 b_tl={2}
//                 b_tr={16}
//                 b_bl={16}
//                 b_br={16}
//                 style={{ padding: 16, backgroundColor: '#FFFFFF' }}>
//                 <Text>
//                   Hello! I am your Gixy AI assistant. How can I help you with your skincare journey
//                   today?
//                 </Text>
//                 <Text className=" mt-2 font-outfit text-[10px] " style={{ color: '#2E211766' }}>
//                   12:39
//                 </Text>
//               </BorderlessShadowCard>
//             </View>
//           </BorderlessShadowCard>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default AiAssistantScreen;

// const styles = StyleSheet.create({});

/* eslint-disable import/no-unresolved */
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '@/components/header/CustomHeader';
import { LAYOUT } from '@/constants/constants';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
import { ThreeStarsIcon, SendButtonIcon } from '@/components/icons';
import { CircularIconButton } from '@/components/buttons/CircularIconButton';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AiAssistantScreen = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I am your Gixy AI assistant. How can I help you with your skincare journey today?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText.trim()),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (userInput: string): string => {
    // Simple response logic - replace with actual AI API
    if (userInput.toLowerCase().includes('acne')) {
      return "I understand you're concerned about acne. Consistent cleansing, using non-comedogenic products, and incorporating ingredients like salicylic acid can help. Would you like me to recommend a routine?";
    } else if (userInput.toLowerCase().includes('dry')) {
      return "Dry skin needs hydration! Look for products with hyaluronic acid, ceramides, and glycerin. Also, don't forget to drink plenty of water!";
    } else if (userInput.toLowerCase().includes('routine')) {
      return 'A basic skincare routine includes: cleanser, moisturizer, and sunscreen in the morning. At night, add a treatment step like serum or retinol. Want me to create a personalized routine for you?';
    }
    return 'Thank you for sharing! I can help you with skincare advice, product recommendations, or routine building. What specific concern would you like to address?';
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
      <CustomHeader title="AI Assistant" height={50} backButton={true} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        {/* Messages Container */}
        <View className="flex-1 px-container">
          <BorderlessShadowCard
            b_tl={24}
            b_tr={24}
            b_bl={0}
            b_br={0}
            style={{
              paddingVertical: 16,
              paddingHorizontal: 0,
              borderWidth: 1,
              borderColor: '#FFFFFF',
              marginTop: 12,
              flex: 1,
            }}>
            {/* AI Header */}
            <View className="mb-4 flex-row items-center gap-3 px-6">
              <CircularIconButton size={50} icon={<ThreeStarsIcon size={25} color="#361A0D" />} />
              <View className="flex-1">
                <Text
                  className="text-start font-outfitMedium text-[24px]"
                  style={{ color: '#2A2118' }}>
                  Gixy AI
                </Text>
                <Text
                  className="text-start font-outfitMedium text-[12px]"
                  style={{ color: '#77B839' }}>
                  Online
                </Text>
              </View>
            </View>

            {/* Messages List */}
            <ScrollView
              ref={scrollViewRef}
              showsVerticalScrollIndicator={false}
              className="flex-1"
              contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 24 }}>
              {messages.map((message) => (
                <View
                  key={message.id}
                  className={`mb-3 ${message.isUser ? 'items-end' : 'items-start'}`}>
                  <BorderlessShadowCard
                    b_tl={message.isUser ? 16 : 2}
                    b_tr={message.isUser ? 2 : 16}
                    b_bl={16}
                    b_br={16}
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      backgroundColor: message.isUser ? '#7A8B6A' : '#FFFFFF',
                      maxWidth: '85%',
                    }}>
                    <Text
                      className="font-outfit text-[14px]"
                      style={{ color: message.isUser ? '#FFFFFF' : '#2E2117' }}>
                      {message.text}
                    </Text>
                    <Text
                      className="mt-1 font-outfit text-[10px]"
                      style={{
                        color: message.isUser ? '#FFFFFFCC' : '#2E211766',
                        textAlign: 'right',
                      }}>
                      {formatTime(message.timestamp)}
                    </Text>
                  </BorderlessShadowCard>
                </View>
              ))}
            </ScrollView>
          </BorderlessShadowCard>

          {/* Input Container */}
          <BorderlessShadowCard
            b_tl={0}
            b_tr={0}
            b_bl={24}
            b_br={24}
            style={{
              paddingVertical: 16,
              paddingHorizontal: 24,
              borderWidth: 1,
              borderColor: '#FFFFFF',
              marginBottom: Platform.OS === 'ios' ? 0 : 10,
            }}>
            <View className="flex-row items-center gap-2">
              {/* Text Input */}
              <View className="flex-1 rounded-full bg-white px-4 py-3">
                <TextInput
                  value={inputText}
                  onChangeText={setInputText}
                  placeholder="Ask about your skin..."
                  placeholderTextColor="#2E211766"
                  className="font-outfit text-[14px]"
                  style={{ color: '#2E2117', padding: 0 }}
                  multiline
                  numberOfLines={1}
                  returnKeyType="send"
                  onSubmitEditing={handleSend}
                />
              </View>

              {/* Send Button */}
              <TouchableOpacity
                onPress={handleSend}
                disabled={!inputText.trim()}
                activeOpacity={0.8}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: inputText.trim() ? '#7A8B6A' : '#2E21173D',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <SendButtonIcon size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </BorderlessShadowCard>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AiAssistantScreen;

const styles = StyleSheet.create({});
