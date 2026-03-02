import axios from 'axios'
import { api } from './api'

export type RegisterPayload = {
  firstName: string
  lastName: string
  userEmail: string
  password: string
}

export type LoginPayload = {
  username: string
  password: string
}

export type LoginResponse = {
  message: string
  accessToken: string
  refreshToken: string
  user: {
    userCode: string
    email: string
    userName: string | null
    firstName: string
    lastName: string
  }
}

export function getErrorMessage(
  error: unknown,
  fallback = 'Something went wrong'
): string {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ||
      error.response?.data?.error ||
      fallback
    )
  }
  return fallback
}

export const authService = {
  register: (payload: RegisterPayload) =>
    api.post<{ message: string }>('/auth/register', payload),

  login: (payload: LoginPayload) =>
    api.post<LoginResponse>('/auth/login', {
      ...payload,
      status: 'active',
    }),

  refresh: (refreshToken: string) =>
    api.post<{
      message: string
      accessToken: string
      refreshToken: string
    }>('/auth/refresh', { refreshToken }),

  logout: (refreshToken: string) =>
    api.post<{ message: string }>('/auth/logout', { refreshToken }),

  me: () => api.get('/auth/me'),
}