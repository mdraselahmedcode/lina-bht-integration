// // store/api/onboardingApi.ts
// import { baseApi } from './baseApi';

// export type Gender = 'male' | 'female' | 'other';
// export type BudgetType = 'budget-friendly' | 'mid-range' | 'premium';
// export type lifePhaseType =
//   | 'on my period'
//   | 'pregnant'
//   | 'postpartum'
//   | 'menopause'
//   | 'other'
//   | 'none';

// export interface PersonalInfoRequest {
//   country: string;
//   language: string;
//   date_of_birth: string;
//   gender: Gender;
// }

// export interface PersonalInfoResponse {
//   message: string;
// }

// export interface AllergiesRequest {
//   allergies: string[];
//   custom_text: string | null;
// }

// export interface AllergiesResponse {
//   message: string;
//   allergies?: string[];
// }

// export interface SkinHairRequest {
//   skin_type: string;
//   skin_concerns: string[];
//   hair_type: string;
//   hair_concerns: string[];
//   skin_other: string | null;
//   hair_other: string | null;
// }

// export interface SkinHairResponse {
//   message: string;
//   skin_type?: string | null;
//   skin_concerns?: string[];
//   hair_type?: string | null;
//   hair_concerns?: string[];
// }

// export interface BudgetRequest {
//   budget: BudgetType;
// }

// export interface BudgetResponse {
//   message: string;
//   budget?: BudgetType;
// }

// export interface LifePhaseRequest {
//   current_phase: lifePhaseType;
//   custom_text: string | null; // pregnancy month as string, or custom phase text
// }

// export interface LifePhaseResponse {
//   message: string;
//   life_phase?: lifePhaseType | null;
// }

// export const onboardingApi = baseApi.injectEndpoints({
//   overrideExisting: false,
//   endpoints: (builder) => ({
//     savePersonalInfo: builder.mutation<PersonalInfoResponse, PersonalInfoRequest>({
//       query: (body) => ({
//         url: '/onboarding/personal_info',
//         method: 'POST',
//         body,
//       }),
//       invalidatesTags: ['User'],
//     }),

//     getAllergies: builder.query<AllergiesResponse, void>({
//       query: () => '/onboarding/allergies',
//       transformResponse: (response: any) => ({
//         message: response?.message || '',
//         allergies: response?.allergies || [],
//       }),
//       providesTags: ['User'],
//     }),

//     saveAllergies: builder.mutation<AllergiesResponse, AllergiesRequest>({
//       query: (body) => ({
//         url: '/onboarding/allergies',
//         method: 'POST',
//         body,
//       }),
//       invalidatesTags: ['User'],
//     }),

//     updateAllergies: builder.mutation<AllergiesResponse, AllergiesRequest>({
//       query: (body) => ({
//         url: '/onboarding/allergies',
//         method: 'PATCH',
//         body,
//       }),
//       invalidatesTags: ['User'],
//     }),

//     getSkinHair: builder.query<SkinHairResponse, void>({
//       query: () => '/onboarding/skin_hair',
//       transformResponse: (response: any) => ({
//         message: response?.message || '',
//         skin_type: response?.skin_type || null,
//         skin_concerns: response?.skin_concerns || [],
//         hair_type: response?.hair_type || null,
//         hair_concerns: response?.hair_concerns || [],
//       }),
//       providesTags: ['User'],
//     }),

//     saveSkinHair: builder.mutation<SkinHairResponse, SkinHairRequest>({
//       query: (body) => ({
//         url: '/onboarding/skin_hair',
//         method: 'POST',
//         body,
//       }),
//       invalidatesTags: ['User'],
//     }),

//     getBudget: builder.query<BudgetResponse, void>({
//       query: () => '/onboarding/budget',
//       transformResponse: (response: any) => ({
//         message: response?.message || '',
//         budget: response?.budget || null,
//       }),
//       providesTags: ['User'],
//     }),

//     saveBudget: builder.mutation<BudgetResponse, BudgetRequest>({
//       query: (body) => ({
//         url: '/onboarding/budget',
//         method: 'POST',
//         body,
//       }),
//       invalidatesTags: ['User'],
//     }),

//     // ✅ GET life phase
//     getLifePhase: builder.query<LifePhaseResponse, void>({
//       query: () => '/onboarding/life_phase',
//       transformResponse: (response: any) => ({
//         message: response?.message || '',
//         life_phase: response?.life_phase || null,
//       }),
//       providesTags: ['User'],
//     }),

//     // ✅ POST life phase
//     saveLifePhase: builder.mutation<LifePhaseResponse, LifePhaseRequest>({
//       query: (body) => ({
//         url: '/onboarding/life_phase',
//         method: 'POST',
//         body,
//       }),
//       invalidatesTags: ['User'],
//     }),

//     // ✅ PATCH life phase
//     updateLifePhase: builder.mutation<LifePhaseResponse, LifePhaseRequest>({
//       query: (body) => ({
//         url: '/onboarding/life_phase',
//         method: 'PATCH',
//         body,
//       }),
//       invalidatesTags: ['User'],
//     }),
//   }),
// });

// export const {
//   useSavePersonalInfoMutation,
//   useGetAllergiesQuery,
//   useSaveAllergiesMutation,
//   useUpdateAllergiesMutation,
//   useGetSkinHairQuery,
//   useSaveSkinHairMutation,
//   useGetBudgetQuery,
//   useSaveBudgetMutation,
//   useGetLifePhaseQuery,
//   useSaveLifePhaseMutation,
//   useUpdateLifePhaseMutation,
// } = onboardingApi;

// store/api/onboardingApi.ts
import { baseApi } from './baseApi';

export type Gender = 'male' | 'female' | 'other';
export type BudgetType = 'budget-friendly' | 'mid-range' | 'premium';
export type lifePhaseType =
  | 'on my period'
  | 'pregnant'
  | 'postpartum'
  | 'menopause'
  | 'other'
  | 'none';

export interface PersonalInfoRequest {
  country: string;
  language: string;
  date_of_birth: string;
  gender: Gender;
}

export interface PersonalInfoResponse {
  message: string;
}

export interface AllergiesRequest {
  allergies: string[];
  custom_text: string | null;
}

export interface AllergiesResponse {
  message: string;
  allergies?: string[];
}

export interface SkinHairRequest {
  skin_type: string;
  skin_concerns: string[];
  hair_type: string;
  hair_concerns: string[];
  skin_other: string | null;
  hair_other: string | null;
}

export interface SkinHairResponse {
  message: string;
  skin_type?: string | null;
  skin_concerns?: string[];
  hair_type?: string | null;
  hair_concerns?: string[];
}

export interface BudgetRequest {
  budget: BudgetType;
}

export interface BudgetResponse {
  message: string;
  budget?: BudgetType;
}

export interface LifePhaseRequest {
  current_phase: lifePhaseType;
  custom_text: string | null;
}

export interface LifePhaseResponse {
  message: string;
  life_phase?: lifePhaseType | null;
}

export const onboardingApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    savePersonalInfo: builder.mutation<PersonalInfoResponse, PersonalInfoRequest>({
      query: (body) => ({
        url: '/onboarding/personal_info',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    getAllergies: builder.query<AllergiesResponse, void>({
      query: () => '/onboarding/allergies',
      transformResponse: (response: any) => ({
        message: response?.message || '',
        allergies: response?.allergies || [],
      }),
      providesTags: ['User'],
    }),

    saveAllergies: builder.mutation<AllergiesResponse, AllergiesRequest>({
      query: (body) => ({
        url: '/onboarding/allergies',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    updateAllergies: builder.mutation<AllergiesResponse, AllergiesRequest>({
      query: (body) => ({
        url: '/onboarding/allergies',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    getSkinHair: builder.query<SkinHairResponse, void>({
      query: () => '/onboarding/skin_hair',
      transformResponse: (response: any) => ({
        message: response?.message || '',
        skin_type: response?.skin_type || null,
        skin_concerns: response?.skin_concerns || [],
        hair_type: response?.hair_type || null,
        hair_concerns: response?.hair_concerns || [],
      }),
      providesTags: ['User'],
    }),

    saveSkinHair: builder.mutation<SkinHairResponse, SkinHairRequest>({
      query: (body) => ({
        url: '/onboarding/skin_hair',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    // ✅ PATCH — used by the edit screen in settings
    updateSkinHair: builder.mutation<SkinHairResponse, SkinHairRequest>({
      query: (body) => ({
        url: '/onboarding/skin_hair',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    getBudget: builder.query<BudgetResponse, void>({
      query: () => '/onboarding/budget',
      transformResponse: (response: any) => ({
        message: response?.message || '',
        budget: response?.budget || null,
      }),
      providesTags: ['User'],
    }),

    saveBudget: builder.mutation<BudgetResponse, BudgetRequest>({
      query: (body) => ({
        url: '/onboarding/budget',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    getLifePhase: builder.query<LifePhaseResponse, void>({
      query: () => '/onboarding/life_phase',
      transformResponse: (response: any) => ({
        message: response?.message || '',
        life_phase: response?.life_phase || null,
      }),
      providesTags: ['User'],
    }),

    saveLifePhase: builder.mutation<LifePhaseResponse, LifePhaseRequest>({
      query: (body) => ({
        url: '/onboarding/life_phase',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    updateLifePhase: builder.mutation<LifePhaseResponse, LifePhaseRequest>({
      query: (body) => ({
        url: '/onboarding/life_phase',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useSavePersonalInfoMutation,
  useGetAllergiesQuery,
  useSaveAllergiesMutation,
  useUpdateAllergiesMutation,
  useGetSkinHairQuery,
  useSaveSkinHairMutation,
  useUpdateSkinHairMutation, // ✅ new
  useGetBudgetQuery,
  useSaveBudgetMutation,
  useGetLifePhaseQuery,
  useSaveLifePhaseMutation,
  useUpdateLifePhaseMutation,
} = onboardingApi;
