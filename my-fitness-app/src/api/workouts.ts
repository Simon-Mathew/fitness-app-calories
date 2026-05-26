import client from './client';
import type { ApiListResponse, ApiResponse, ApiWorkout } from '../types/api';

export const workoutsApi = {
  /** Fetch the most recent workouts. */
  getAll: (limit = 4) =>
    client.get<ApiListResponse<ApiWorkout>>(`/workouts?limit=${limit}`),

  getById: (id: string) =>
    client.get<ApiResponse<ApiWorkout>>(`/workouts/${id}`),

  create: (data: Partial<ApiWorkout>) =>
    client.post<ApiResponse<ApiWorkout>>('/workouts', data),

  update: (id: string, data: Partial<ApiWorkout>) =>
    client.put<ApiResponse<ApiWorkout>>(`/workouts/${id}`, data),

  remove: (id: string) =>
    client.delete<ApiResponse<null>>(`/workouts/${id}`),
};
