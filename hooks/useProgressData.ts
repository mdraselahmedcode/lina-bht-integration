// hooks/useProgressData.ts
import { useMemo } from 'react';

import { ScanType, BeforeAfterItem } from '@/types/progress';

import {
  useGetFaceAnalyticsQuery,
  useGetFaceCompareQuery,
  useGetFaceHistoryQuery,
  useGetScalpAnalyticsQuery,
  useGetScalpCompareQuery,
  useGetScalpHistoryQuery,
  CompareResponse,
} from '@/store/api/progressApi';

const mapCompareToBeforeAfter = (data: CompareResponse | undefined): BeforeAfterItem[] => {
  if (!data) return [];
  return [data.compare_1, data.compare_2, data.compare_3].filter(Boolean).map((item, index) => ({
    id: String(index + 1),
    before: item!.week_1_image_url,
    after: item!.week_1_image_url,
    date: `${item!.between[0]} → ${item!.between[1]}`,
    message: item!.message,
  }));
};

export const useProgressData = (scanType: ScanType) => {
  const isFace = scanType === 'face';

  // Common query options to ensure fresh data
  const queryOptions = {
    refetchOnMountOrArgChange: true, // Refetch when component mounts
    refetchOnFocus: true, // Refetch when app comes to foreground
    refetchOnReconnect: true, // Refetch when network reconnects
  };

  const faceAnalytics = useGetFaceAnalyticsQuery(undefined, {
    skip: !isFace,
    ...queryOptions,
  });

  const scalpAnalytics = useGetScalpAnalyticsQuery(undefined, {
    skip: isFace,
    ...queryOptions,
  });

  const analyticsData = isFace ? faceAnalytics : scalpAnalytics;

  const faceCompare = useGetFaceCompareQuery(undefined, {
    skip: !isFace,
    ...queryOptions,
  });

  const scalpCompare = useGetScalpCompareQuery(undefined, {
    skip: isFace,
    ...queryOptions,
  });

  const compareData = isFace ? faceCompare : scalpCompare;

  const faceHistory = useGetFaceHistoryQuery(undefined, {
    skip: !isFace,
    ...queryOptions,
  });

  const scalpHistory = useGetScalpHistoryQuery(undefined, {
    skip: isFace,
    ...queryOptions,
  });

  const historyData = isFace ? faceHistory : scalpHistory;

  const chartData = useMemo(() => {
    return (analyticsData.data?.weekly_scores ?? []).map((item) => ({
      value: item.score,
      label: item.week,
      dataPointText: String(item.score),
    }));
  }, [analyticsData.data]);

  const beforeAfterData = useMemo(
    () => mapCompareToBeforeAfter(compareData.data),
    [compareData.data]
  );

  return {
    isLoading: analyticsData.isLoading || compareData.isLoading || historyData.isLoading,
    isError: analyticsData.isError || compareData.isError || historyData.isError,
    refetch: () => {
      analyticsData.refetch();
      compareData.refetch();
      historyData.refetch();
    },
    chartData,
    improvement: analyticsData.data?.improvement_percentage ?? 0,
    beforeAfterData,
    recentScans: historyData.data?.scans ?? [],
  };
};
