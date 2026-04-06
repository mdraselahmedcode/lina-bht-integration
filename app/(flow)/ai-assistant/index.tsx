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
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from '@/components/header/CustomHeader';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
import { SendButtonIcon } from '@/components/icons';
import { CircularIconButton } from '@/components/buttons/CircularIconButton';
import { useToast } from '@/hooks/useToast';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AiAssistantScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);
  const insets = useSafeAreaInsets();
  const { showError } = useToast();

  // Load messages on mount
  useEffect(() => {
    loadMessages();
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages, isTyping]);

  const loadMessages = async () => {
    try {
      const saved = await AsyncStorage.getItem('chat_history');
      if (saved) {
        const parsedMessages = JSON.parse(saved);
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(messagesWithDates);
      } else {
        setMessages([
          {
            id: '1',
            text: 'Hello! I am your Gixy AI assistant. How can I help you with your skincare journey today?',
            isUser: false,
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      setMessages([
        {
          id: '1',
          text: 'Hello! I am your Gixy AI assistant. How can I help you with your skincare journey today?',
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveMessages = async (newMessages: Message[]) => {
    try {
      await AsyncStorage.setItem('chat_history', JSON.stringify(newMessages));
    } catch (error) {
      console.error('Error saving messages:', error);
    }
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes('acne') || input.includes('pimple') || input.includes('breakout')) {
      return "I understand you're concerned about acne. Consistent cleansing, using non-comedogenic products, and incorporating ingredients like salicylic acid can help. Would you like me to recommend a routine?";
    } else if (input.includes('dry') || input.includes('flaky') || input.includes('dehydrated')) {
      return "Dry skin needs hydration! Look for products with hyaluronic acid, ceramides, and glycerin. Also, don't forget to drink plenty of water! Would you like product recommendations?";
    } else if (input.includes('oily') || input.includes('greasy') || input.includes('shine')) {
      return 'Oily skin benefits from gentle cleansing, niacinamide, and lightweight moisturizers. Avoid harsh products that strip natural oils. Need help building a routine?';
    } else if (input.includes('routine') || input.includes('step') || input.includes('regimen')) {
      return 'A basic skincare routine includes: cleanser, moisturizer, and sunscreen in the morning. At night, add a treatment step like serum or retinol. Want me to create a personalized routine for you?';
    } else if (input.includes('product') || input.includes('recommend')) {
      return "I can help with product recommendations! What's your skin type and main concern? (e.g., dry, oily, acne, aging)";
    } else if (input.includes('sunscreen') || input.includes('spf')) {
      return 'Sunscreen is crucial! Look for SPF 30 or higher, broad-spectrum protection. Apply as the last step in your morning routine and reapply every 2 hours if outdoors.';
    } else if (input.includes('thank')) {
      return "You're welcome! I'm here to help with any skincare questions you have. Feel free to ask anything! 💫";
    }
    return 'Thank you for sharing! I can help you with skincare advice, product recommendations, or routine building. What specific concern would you like to address today?';
  };

  const handleSend = async () => {
    if (!inputText.trim() || isTyping) return;

    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    saveMessages(updatedMessages);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText.trim()),
        isUser: false,
        timestamp: new Date(),
      };
      const finalMessages = [...updatedMessages, aiResponse];
      setMessages(finalMessages);
      saveMessages(finalMessages);
      setIsTyping(false);
    }, 1000);
  };

  const clearChat = async () => {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    const welcomeMessage: Message = {
      id: '1',
      text: 'Hello! I am your Gixy AI assistant. How can I help you with your skincare journey today?',
      isUser: false,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
    saveMessages([welcomeMessage]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const TypingIndicator = () => (
    <View className="mb-3 items-start">
      <BorderlessShadowCard
        b_tl={2}
        b_tr={16}
        b_bl={16}
        b_br={16}
        style={{
          paddingVertical: 12,
          paddingHorizontal: 16,
          backgroundColor: '#FFFFFF',
        }}>
        <View className="flex-row gap-1">
          <View className="h-2 w-2 rounded-full bg-gray-400" style={{ opacity: 0.6 }} />
          <View className="h-2 w-2 rounded-full bg-gray-400" style={{ opacity: 0.8 }} />
          <View className="h-2 w-2 rounded-full bg-gray-400" style={{ opacity: 1 }} />
        </View>
      </BorderlessShadowCard>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title="AI Assistant" height={50} backButton={true} />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#95B287" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
      <CustomHeader
        title="AI Assistant"
        height={50}
        backButton={true}
        // rightIcon={
        //   <CircularIconButton
        //     size={40}
        //     icon={<Ionicons name="trash-outline" size={20} color="#361A0D" />}
        //     onPress={clearChat}
        //   />
        // }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
        {/* Messages Container */}
        <View className="flex-1 px-container" style={{ paddingBottom: 0 }}>
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
            <View className="mb-4 flex-row items-center gap-3 border-b border-[#2E2117]/10 px-6 pb-4">
              <Image
                source={require('@/assets/images/ai_floating_logo.png')}
                style={{ width: 50, height: 50 }}
                resizeMode="contain"
              />
              <View className="flex-1">
                <Text
                  className="text-start font-outfitMedium text-[24px]"
                  style={{ color: '#2A2118' }}>
                  Gixy AI
                </Text>
                <View className="flex-row items-center gap-1">
                  <View className="h-2 w-2 rounded-full bg-green-500" />
                  <Text
                    className="text-start font-outfitMedium text-[12px]"
                    style={{ color: '#77B839' }}>
                    Online
                  </Text>
                </View>
              </View>
            </View>

            {/* Messages List */}
            <ScrollView
              ref={scrollViewRef}
              showsVerticalScrollIndicator={false}
              className="flex-1"
              contentContainerStyle={{
                paddingBottom: 20,
                paddingHorizontal: 24,
                flexGrow: 1,
              }}>
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
                      className="font-outfit text-[14px] leading-5"
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

              {isTyping && <TypingIndicator />}
            </ScrollView>
          </BorderlessShadowCard>

          {/* Input Container - Fixed with proper bottom spacing using SafeAreaView */}
          <View style={{ marginBottom: insets.bottom }}>
            <BorderlessShadowCard
              b_tl={0}
              b_tr={0}
              b_bl={24}
              b_br={24}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderWidth: 1,
                borderColor: '#FFFFFF',
              }}>
              <View className="flex-row items-center gap-2">
                <View className="flex-1 rounded-full bg-white px-4 py-2">
                  <TextInput
                    ref={inputRef}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Ask about your skin..."
                    placeholderTextColor="#2E211766"
                    className="font-outfit text-[14px]"
                    style={{ color: '#2E2117', padding: 0, maxHeight: 100 }}
                    multiline
                    numberOfLines={4}
                    returnKeyType="send"
                    onSubmitEditing={handleSend}
                  />
                </View>

                <TouchableOpacity
                  onPress={handleSend}
                  disabled={!inputText.trim() || isTyping}
                  activeOpacity={0.8}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: inputText.trim() && !isTyping ? '#7A8B6A' : '#2E21173D',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {isTyping ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <SendButtonIcon size={18} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
              </View>
            </BorderlessShadowCard>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AiAssistantScreen;

const styles = StyleSheet.create({});
