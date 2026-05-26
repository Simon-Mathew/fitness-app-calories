import client from './client';
import type { ApiFoodEntry, ApiResponse } from '../types/api';

export type NewFoodEntry = Omit<ApiFoodEntry, '_id' | 'createdAt'>;

export const foodApi = {
  /** All entries for one calendar day (YYYY-MM-DD). */
  getByDate: (date: string) =>
    client.get<ApiResponse<ApiFoodEntry[]>>(`/food?date=${date}`),

  create: (data: NewFoodEntry) =>
    client.post<ApiResponse<ApiFoodEntry>>('/food', data),

  update: (id: string, data: Partial<NewFoodEntry>) =>
    client.put<ApiResponse<ApiFoodEntry>>(`/food/${id}`, data),

  remove: (id: string) =>
    client.delete<ApiResponse<null>>(`/food/${id}`),
};
