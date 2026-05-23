import { baseApi } from './baseApi';
import { FaceScanResponse, HairScanResponse } from './scanApi';

export interface WeeklyScore {
  week: string;
  score: number;
}

export interface AnalyticsResponse {
  improvement_percentage: number;
  weekly_scores: WeeklyScore[];
}

export interface ScanHistoryItem {
  id: string;
  overall_score: number;
  images: string[];
  created_at: string;
}

export interface ScanHistoryResponse {
  total: number;
  scans: ScanHistoryItem[];
}

export interface CompareItem {
  between: [string, string];
  week_1_image_url: string;
  message: string;
}

export interface CompareResponse {
  compare_1?: CompareItem;
  compare_2?: CompareItem;
  compare_3?: CompareItem;
}

// ── Face detail response (GET /scan/:id) ──────────────────────────────────────
// The API returns scan_id at root but FaceScanResponse uses scan_id too — however
// the history detail also returns `images[]` at root which FaceScanResponse doesn't
// have. We extend it here.
export interface FaceScanDetailResponse extends FaceScanResponse {
  images: string[];
}

// ── Hair detail response (GET /scan/scalp/:id) ────────────────────────────────
export interface HairScanDetailResponse extends HairScanResponse {
  images: string[];
}

export const progressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ── Face ────────────────────────────────────────────────────────────────
    getFaceAnalytics: builder.query<AnalyticsResponse, void>({
      query: () => '/scan/analytics',
      providesTags: [{ type: 'Scan', id: 'FACE_ANALYTICS' }],
    }),
    getFaceCompare: builder.query<CompareResponse, void>({
      query: () => '/scan/compare/random',
      providesTags: [{ type: 'Scan', id: 'FACE_COMPARE' }],
    }),
    getFaceHistory: builder.query<ScanHistoryResponse, void>({
      query: () => '/scan/history',
      providesTags: [{ type: 'Scan', id: 'FACE_HISTORY' }],
    }),
    getFaceScanById: builder.query<FaceScanDetailResponse, string>({
      query: (id) => `/scan/${id}`,
      providesTags: (_, __, id) => [{ type: 'Scan', id: `FACE_DETAIL_${id}` }],
    }),

    // ── Hair & Scalp ────────────────────────────────────────────────────────
    getScalpAnalytics: builder.query<AnalyticsResponse, void>({
      query: () => '/scan/scalp/analytics',
      providesTags: [{ type: 'Scan', id: 'SCALP_ANALYTICS' }],
    }),
    getScalpCompare: builder.query<CompareResponse, void>({
      query: () => '/scan/scalp/compare/random',
      providesTags: [{ type: 'Scan', id: 'SCALP_COMPARE' }],
    }),
    getScalpHistory: builder.query<ScanHistoryResponse, void>({
      query: () => '/scan/scalp/history',
      providesTags: [{ type: 'Scan', id: 'SCALP_HISTORY' }],
    }),
    getScalpScanById: builder.query<HairScanDetailResponse, string>({
      query: (id) => `/scan/scalp/${id}`,
      providesTags: (_, __, id) => [{ type: 'Scan', id: `SCALP_DETAIL_${id}` }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetFaceAnalyticsQuery,
  useGetFaceCompareQuery,
  useGetFaceHistoryQuery,
  useGetFaceScanByIdQuery,
  useGetScalpAnalyticsQuery,
  useGetScalpCompareQuery,
  useGetScalpHistoryQuery,
  useGetScalpScanByIdQuery,
} = progressApi;
