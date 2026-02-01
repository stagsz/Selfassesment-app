import { useQuery } from '@tanstack/react-query';
import { standardsApi } from '@/lib/api';

export interface ISOSection {
  id: string;
  sectionNumber: string;
  title: string;
  description: string | null;
  order: number;
  parentId: string | null;
  children: ISOSection[];
  _count?: {
    questions: number;
  };
}

export interface SectionsResponse {
  success: boolean;
  data: ISOSection[];
}

export function useSections() {
  return useQuery({
    queryKey: ['sections'],
    queryFn: async () => {
      const response = await standardsApi.getSections();
      return response.data as SectionsResponse;
    },
  });
}
