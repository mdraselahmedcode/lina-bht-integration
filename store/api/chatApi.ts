// store/api/chatApi.ts
import { baseApi } from './baseApi';

export interface ChatMessageRequest {
  message: string;
}

export interface ChatSyncResponse {
  reply: string;
}

export const chatApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    // Sync fallback — used only if SSE fails
    sendMessageSync: builder.mutation<ChatSyncResponse, ChatMessageRequest>({
      query: (body) => ({
        url: '/chat/message/sync',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSendMessageSyncMutation } = chatApi;
