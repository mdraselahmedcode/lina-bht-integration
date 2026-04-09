// // hooks/useChatStorage.ts
// import AsyncStorage from '@react-native-async-storage/async-storage';

// interface Message {
//   id: string;
//   text: string;
//   isUser: boolean;
//   timestamp: Date;
// }

// const STORAGE_KEY = 'chat_history';

// export const useChatStorage = () => {
//   const loadMessages = async (): Promise<Message[]> => {
//     try {
//       const saved = await AsyncStorage.getItem(STORAGE_KEY);
//       if (saved) {
//         const parsedMessages = JSON.parse(saved);
//         return parsedMessages.map((msg: any) => ({
//           ...msg,
//           timestamp: new Date(msg.timestamp),
//         }));
//       }
//       return [
//         {
//           id: '1',
//           text: 'Hello! I am your Gixy AI assistant. How can I help you with your skincare journey today?',
//           isUser: false,
//           timestamp: new Date(),
//         },
//       ];
//     } catch (error) {
//       console.error('Error loading messages:', error);
//       return [
//         {
//           id: '1',
//           text: 'Hello! I am your Gixy AI assistant. How can I help you with your skincare journey today?',
//           isUser: false,
//           timestamp: new Date(),
//         },
//       ];
//     }
//   };

//   const saveMessages = async (messages: Message[]) => {
//     try {
//       await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
//     } catch (error) {
//       console.error('Error saving messages:', error);
//     }
//   };

//   const clearMessages = async () => {
//     try {
//       await AsyncStorage.removeItem(STORAGE_KEY);
//     } catch (error) {
//       console.error('Error clearing messages:', error);
//     }
//   };

//   return { loadMessages, saveMessages, clearMessages };
// };
