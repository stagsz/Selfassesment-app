import axios from 'axios';
import { toast } from 'sonner';
import { isNetworkError, getNetworkErrorInfo } from './auth-errors';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Flag to prevent multiple session expired toasts
let isRefreshing = false;
let sessionExpiredToastShown = false;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    // Reset the session expired flag on successful responses
    sessionExpiredToastShown = false;
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle network errors
    if (isNetworkError(error)) {
      const errorInfo = getNetworkErrorInfo();
      toast.error(errorInfo.message, { id: 'network-error' });
      return Promise.reject(error);
    }

    // Handle 401 errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Check if this is an auth endpoint (login/register) - don't try to refresh
      const isAuthEndpoint = originalRequest.url?.includes('/auth/login') ||
        originalRequest.url?.includes('/auth/register');

      if (isAuthEndpoint) {
        return Promise.reject(error);
      }

      // Prevent multiple refresh attempts
      if (isRefreshing) {
        return Promise.reject(error);
      }

      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });

          const { accessToken } = response.data.data;
          localStorage.setItem('accessToken', accessToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          isRefreshing = false;
          return api(originalRequest);
        }
      } catch {
        // Refresh failed
        isRefreshing = false;

        // Only show toast once per session expiration
        if (!sessionExpiredToastShown) {
          sessionExpiredToastShown = true;
          toast.error('Your session has expired. Please sign in again.', {
            id: 'session-expired',
            duration: 5000,
          });
        }

        // Clear tokens
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        // Redirect to login after a brief delay so toast is visible
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      }
    }

    return Promise.reject(error);
  }
);

// API endpoints
export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    organizationId: string;
  }) => api.post('/auth/register', data),
  refresh: (refreshToken: string) =>
    api.post('/auth/refresh', { refreshToken }),
  me: () => api.get('/auth/me'),
  changePassword: (currentPassword: string, newPassword: string) =>
    api.post('/auth/change-password', { currentPassword, newPassword }),
};

export const assessmentsApi = {
  list: (params?: {
    page?: number;
    pageSize?: number;
    status?: string;
    q?: string;
  }) => api.get('/assessments', { params }),
  getById: (id: string) => api.get(`/assessments/${id}`),
  create: (data: {
    title: string;
    description?: string;
    auditType?: string;
    scheduledDate?: string;
    dueDate?: string;
  }) => api.post('/assessments', data),
  update: (id: string, data: any) => api.put(`/assessments/${id}`, data),
  delete: (id: string) => api.delete(`/assessments/${id}`),
  calculateScores: (id: string) =>
    api.post(`/assessments/${id}/calculate-scores`),
  clone: (id: string, title: string) =>
    api.post(`/assessments/${id}/clone`, { title }),
};

export const responsesApi = {
  getByAssessment: (assessmentId: string) =>
    api.get(`/assessments/${assessmentId}/responses`),
  create: (assessmentId: string, data: any) =>
    api.post(`/assessments/${assessmentId}/responses`, data),
  update: (assessmentId: string, questionId: string, data: any) =>
    api.put(`/assessments/${assessmentId}/responses/${questionId}`, data),
  bulkUpdate: (assessmentId: string, responses: any[]) =>
    api.put(`/assessments/${assessmentId}/responses/bulk`, { responses }),
};

export const standardsApi = {
  getSections: () => api.get('/standards/sections'),
  getQuestions: (sectionId?: string) =>
    api.get('/standards/questions', { params: { sectionId } }),
  importCSV: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/standards/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export const dashboardApi = {
  getOverview: () => api.get('/dashboard'),
  getSections: (assessmentId?: string) =>
    api.get('/dashboard/sections', { params: { assessmentId } }),
  getTrends: () => api.get('/dashboard/trends'),
};

export const actionsApi = {
  list: (params?: {
    status?: string;
    priority?: string;
    assigneeId?: string;
  }) => api.get('/actions', { params }),
  getById: (id: string) => api.get(`/actions/${id}`),
  create: (data: any) => api.post('/actions', data),
  update: (id: string, data: any) => api.put(`/actions/${id}`, data),
};
