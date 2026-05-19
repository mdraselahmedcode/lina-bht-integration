import { baseApi } from './baseApi';

export interface ProfileResponse {
  avatar_url: string | null;
  full_name: string;
  email: string;
  gender: string;
  date_of_birth: string; // "1989-12-31"
  language: string; // "en"
  country: string; // "US"
}

export interface ProfileEditRequest {
  full_name?: string;
  gender?: string;
  date_of_birth?: string;
  language?: string;
  country?: string;
  avatar?: {
    uri: string;
    name: string;
    type: string;
  };
}

export interface ProfileTabResponse {
  avatar_url: string | null;
  name: string;
  gmail: string;
  plan: string;
  onboarding: {
    onboarding_completed: boolean;
    skin_type: string | null;
    hair_type: string | null;
    current_phase: string | null;
    skin_concerns: string[];
    hair_concerns: string[];
    allergies: string[];
    budget: string | null;
  };
}

export const profileApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileResponse, void>({
      query: () => '/profile/profile_edit',
      // Normalize empty string avatar to null so ?? fallback works correctly
      transformResponse: (response: ProfileResponse) => ({
        ...response,
        avatar_url: response.avatar_url || null,
      }),
      providesTags: ['User'],
    }),

    editProfile: builder.mutation<ProfileResponse, FormData>({
      query: (formData) => ({
        url: '/profile/profile_edit',
        method: 'PATCH',
        body: formData,
        formData: true,
      }),
      // Normalize here too
      transformResponse: (response: ProfileResponse) => ({
        ...response,
        avatar_url: response.avatar_url || null,
      }),
      invalidatesTags: ['User'],
    }),

    getProfileTab: builder.query<ProfileTabResponse, void>({
      query: () => '/profile',
      providesTags: ['User'],
    }),
  }),
});

export const { useGetProfileQuery, useEditProfileMutation, useGetProfileTabQuery } = profileApi;
