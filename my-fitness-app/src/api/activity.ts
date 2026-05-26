import client from './client';
import type { ApiResponse, ApiDailyActivity } from '../types/api';

export const activityApi = {
  /** Last `days` days of records. */
  getRecent: (days = 7) =>
    client.get<ApiResponse<ApiDailyActivity[]>>(`/activity?days=${days}`),

  /** Upsert today's activity record. */
  log: (data: Partial<ApiDailyActivity>) =>
    client.post<ApiResponse<ApiDailyActivity>>('/activity', data),
};
