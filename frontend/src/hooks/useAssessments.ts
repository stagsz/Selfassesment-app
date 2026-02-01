import { useQuery } from '@tanstack/react-query';
import { assessmentsApi } from '@/lib/api';

// Types matching backend API responses
export interface Assessment {
  id: string;
  title: string;
  description: string | null;
  status: string;
  auditType: string;
  overallScore: number | null;
  scope: string | null;
  objectives: string | null;
  scheduledDate: string | null;
  dueDate: string | null;
  completedDate: string | null;
  createdAt: string;
  updatedAt: string;
  organizationId: string;
  leadAuditorId: string;
  templateId: string | null;
  leadAuditor: {
    id: string;
    firstName: string;
    lastName: string;
  };
  _count: {
    responses: number;
    nonConformities: number;
  };
  progress: number;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface AssessmentsListResponse {
  success: boolean;
  data: Assessment[];
  pagination: PaginationInfo;
}

export interface AssessmentsListParams {
  page?: number;
  pageSize?: number;
  status?: string;
  q?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export function useAssessments(params: AssessmentsListParams = {}) {
  return useQuery({
    queryKey: ['assessments', params],
    queryFn: async () => {
      const response = await assessmentsApi.list(params);
      return response.data as AssessmentsListResponse;
    },
  });
}

export function useAssessment(id: string) {
  return useQuery({
    queryKey: ['assessment', id],
    queryFn: async () => {
      const response = await assessmentsApi.getById(id);
      return response.data as { success: boolean; data: Assessment };
    },
    enabled: !!id,
  });
}
