// app/(flow)/ai-assistant/index.tsx
import {
  ScrollView,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Animated,
  Modal,
} from 'react-native';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from '@/components/header/CustomHeader';
import BorderlessShadowCard from '@/components/cards/BorderlessShadowCard';
import { SendButtonIcon } from '@/components/icons';
import { useToast } from '@/hooks/useToast';
import LoadingScreen from '@/components/loading/LoadingScreen';
import { useScreenReady } from '@/hooks/useScreenReady';
import ErrorScreen from '@/components/errors/ErrorScreen';
import { useRouter } from 'expo-router';

import { useSendMessageSyncMutation } from '@/store/api/chatApi';
import { useChatStream } from '@/hooks/useChatStream';
import { MarkdownText } from '@/components/chat/MarkdownText';
import ClearChatModal from '@/components/ui/ClearChatModal';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isStreaming?: boolean;
}

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  text: "Hello! I'm your **Gixy AI** assistant. 👋\n\nI can help you with:\n- Skincare advice tailored to your profile\n- Ingredient guidance\n- Routine building\n\nHow can I help you today?",
  isUser: false,
  timestamp: new Date(),
};

const STORAGE_KEY = 'chat_history_v2';
const MAX_STORED_MESSAGES = 100;

// ─── Typing dots indicator ────────────────────────────────────────────────────

function TypingIndicator() {
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animate = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, { toValue: 1, duration: 350, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0.3, duration: 350, useNativeDriver: true }),
        ])
      ).start();

    animate(dot1, 0);
    animate(dot2, 150);
    animate(dot3, 300);
  }, []);

  const dotStyle = {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2E211799',
    marginHorizontal: 2,
  };

  return (
    <View style={{ marginBottom: 12, alignItems: 'flex-start' }}>
      <BorderlessShadowCard
        b_tl={2}
        b_tr={16}
        b_bl={16}
        b_br={16}
        style={{ paddingVertical: 12, paddingHorizontal: 16, backgroundColor: '#FFFFFF' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Animated.View style={[dotStyle, { opacity: dot1 }]} />
          <Animated.View style={[dotStyle, { opacity: dot2 }]} />
          <Animated.View style={[dotStyle, { opacity: dot3 }]} />
        </View>
      </BorderlessShadowCard>
    </View>
  );
}

// ─── Message bubble ───────────────────────────────────────────────────────────

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.isUser;
  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <View style={{ marginBottom: 12, alignItems: isUser ? 'flex-end' : 'flex-start' }}>
      <BorderlessShadowCard
        b_tl={isUser ? 16 : 2}
        b_tr={isUser ? 2 : 16}
        b_bl={16}
        b_br={16}
        style={{
          paddingVertical: 12,
          paddingHorizontal: 16,
          backgroundColor: isUser ? '#7A8B6A' : '#FFFFFF',
          maxWidth: '85%',
        }}>
        {isUser ? (
          <Text
            style={{
              fontFamily: 'Outfit-Regular',
              fontSize: 14,
              lineHeight: 22,
              color: '#FFFFFF',
            }}>
            {message.text}
          </Text>
        ) : (
          <MarkdownText content={message.text} color="#2E2117" fontSize={14} />
        )}

        {!message.isStreaming && (
          <Text
            style={{
              marginTop: 4,
              fontFamily: 'Outfit-Regular',
              fontSize: 10,
              color: isUser ? '#FFFFFFB2' : '#2E211766',
              textAlign: 'right',
            }}>
            {formatTime(message.timestamp)}
          </Text>
        )}
      </BorderlessShadowCard>
    </View>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

const AiAssistantScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { showError } = useToast();

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isWaiting, setIsWaiting] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [showClearModal, setShowClearModal] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);
  const streamingMessageIdRef = useRef<string | null>(null);

  const { streamMessage, cancelStream } = useChatStream();
  const [sendSync] = useSendMessageSyncMutation();

  const { isRendering, renderError } = useScreenReady({
    dependencies: [],
    delay: 100,
    initialReady: false,
  });

  // ── Persistence ──────────────────────────────────────────────────────────

  const loadMessages = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: any[] = JSON.parse(saved);
        setMessages(
          parsed.map((m) => ({ ...m, timestamp: new Date(m.timestamp), isStreaming: false }))
        );
      } else {
        setMessages([WELCOME_MESSAGE]);
      }
    } catch {
      setMessages([WELCOME_MESSAGE]);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const persistMessages = useCallback(async (msgs: Message[]) => {
    try {
      const toStore = msgs.filter((m) => !m.isStreaming).slice(-MAX_STORED_MESSAGES);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    } catch {}
  }, []);

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    if (!isLoadingHistory) {
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 80);
    }
  }, [messages, isWaiting]);

  // ── Send ─────────────────────────────────────────────────────────────────

  const isBusy = isWaiting || isStreaming;

  const handleSend = async () => {
    const text = inputText.trim();
    if (!text || isBusy) return;

    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    const userMsg: Message = {
      id: `user_${Date.now()}`,
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => {
      const next = [...prev, userMsg];
      persistMessages(next);
      return next;
    });
    setInputText('');
    setIsWaiting(true);

    const aiMsgId = `ai_${Date.now()}`;
    streamingMessageIdRef.current = aiMsgId;

    await streamMessage(text, {
      onChunk: (chunk) => {
        setIsWaiting(false);
        setIsStreaming(true);

        setMessages((prev) => {
          const existing = prev.find((m) => m.id === aiMsgId);
          if (existing) {
            return prev.map((m) => (m.id === aiMsgId ? { ...m, text: m.text + chunk } : m));
          }
          return [
            ...prev,
            { id: aiMsgId, text: chunk, isUser: false, timestamp: new Date(), isStreaming: true },
          ];
        });
      },

      onDone: () => {
        setIsWaiting(false);
        setIsStreaming(false);
        setMessages((prev) => {
          const next = prev.map((m) => (m.id === aiMsgId ? { ...m, isStreaming: false } : m));
          persistMessages(next);
          return next;
        });
        streamingMessageIdRef.current = null;
      },

      onError: () => {
        setIsWaiting(false);
        setIsStreaming(false);
        streamingMessageIdRef.current = null;
        setMessages((prev) => prev.filter((m) => m.id !== aiMsgId || m.text.length > 0));
        handleSyncFallback(text);
      },
    });
  };

  const handleSyncFallback = async (text: string) => {
    setIsWaiting(true);
    try {
      const result = await sendSync({ message: text }).unwrap();
      const aiMsg: Message = {
        id: `ai_sync_${Date.now()}`,
        text: result.reply,
        isUser: false,
        timestamp: new Date(),
        isStreaming: false,
      };
      setMessages((prev) => {
        const next = [...prev, aiMsg];
        persistMessages(next);
        return next;
      });
    } catch (err: any) {
      const detail = err?.data?.detail || err?.data?.message;
      showError(detail || 'Something went wrong. Please try again.');
    } finally {
      setIsWaiting(false);
    }
  };

  const handleClearChat = () => {
    if (isBusy) return;
    setShowClearModal(true);
  };

  const confirmClearChat = async () => {
    setShowClearModal(false);
    cancelStream();
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setMessages([WELCOME_MESSAGE]);
    setIsWaiting(false);
    setIsStreaming(false);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  // ── Render guards ────────────────────────────────────────────────────────

  if (isRendering || isLoadingHistory) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <LoadingScreen loadingText="Loading your skincare companion..." />
      </SafeAreaView>
    );
  }

  if (renderError) {
    return (
      <SafeAreaView edges={['top', 'right']} className="flex-1 bg-backgroundColor">
        <CustomHeader title="AI Assistant" height={50} backButton={true} />
        <ErrorScreen message={renderError} onRetry={() => router.replace('/(flow)/ai-assistant')} />
      </SafeAreaView>
    );
  }

  // ── UI ───────────────────────────────────────────────────────────────────

  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-backgroundColor">
      <CustomHeader title="AI Assistant" height={50} backButton={true} />
      {/* <CustomHeader title="AI Assistant" height={50} backButton backRoute="/(main)" /> */}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}>
        <SafeAreaView edges={[]} className="flex-1 px-container" style={{ paddingBottom: 0 }}>
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#2E211719',
                paddingHorizontal: 24,
                paddingBottom: 16,
                marginBottom: 4,
              }}>
              <Image
                source={require('@/assets/images/ai_floating_logo.png')}
                style={{ width: 50, height: 50 }}
                resizeMode="contain"
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: 'Outfit-Medium', fontSize: 24, color: '#2A2118' }}>
                  Gixy AI
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <View
                    style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#22C55E' }}
                  />
                  <Text style={{ fontFamily: 'Outfit-Medium', fontSize: 12, color: '#77B839' }}>
                    Online
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={handleClearChat}
                disabled={isBusy}
                style={{ opacity: isBusy ? 0.4 : 1, paddingHorizontal: 4 }}>
                <Text style={{ fontFamily: 'Outfit-Medium', fontSize: 13, color: '#EF4444' }}>
                  Clear
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              ref={scrollViewRef}
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
              contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 24, flexGrow: 1 }}>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {isWaiting && <TypingIndicator />}
            </ScrollView>
          </BorderlessShadowCard>

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
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View
                  style={{
                    flex: 1,
                    borderRadius: 100,
                    backgroundColor: '#FFFFFF',
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                  }}>
                  <TextInput
                    ref={inputRef}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Ask about your skin..."
                    placeholderTextColor="#2E211766"
                    style={{
                      fontFamily: 'Outfit-Regular',
                      fontSize: 14,
                      color: '#2E2117',
                      padding: 0,
                      maxHeight: 100,
                    }}
                    multiline
                    returnKeyType="send"
                    blurOnSubmit={false}
                    onSubmitEditing={handleSend}
                    editable={!isBusy}
                  />
                </View>

                <TouchableOpacity
                  onPress={isBusy ? cancelStream : handleSend}
                  activeOpacity={0.8}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: isBusy
                      ? '#EF444466'
                      : inputText.trim()
                        ? '#7A8B6A'
                        : '#2E21173D',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {isWaiting ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : isStreaming ? (
                    <View
                      style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: '#FFFFFF' }}
                    />
                  ) : (
                    <SendButtonIcon size={18} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
              </View>
            </BorderlessShadowCard>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>

      <ClearChatModal
        visible={showClearModal}
        onConfirm={confirmClearChat}
        onClose={() => setShowClearModal(false)}
      />
    </SafeAreaView>
  );
};

export default AiAssistantScreen;
