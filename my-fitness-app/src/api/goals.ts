import client from './client';
import type { ApiResponse, ApiGoal } from '../types/api';

export const goalsApi = {
  getAll: () =>
    client.get<ApiResponse<ApiGoal[]>>('/goals'),

  getById: (id: string) =>
    client.get<ApiResponse<ApiGoal>>(`/goals/${id}`),

  create: (data: Partial<ApiGoal>) =>
    client.post<ApiResponse<ApiGoal>>('/goals', data),

  updateProgress: (id: string, current: number) =>
    client.patch<ApiResponse<ApiGoal>>(`/goals/${id}`, { current }),

  remove: (id: string) =>
    client.delete<ApiResponse<null>>(`/goals/${id}`),
};
