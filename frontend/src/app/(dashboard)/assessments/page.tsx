'use client';

import { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Copy,
  ClipboardList,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProgressBar } from '@/components/ui/progress-bar';
import { useAssessments } from '@/hooks/useAssessments';

const statusColors: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-700',
  IN_PROGRESS: 'bg-blue-100 text-blue-700',
  UNDER_REVIEW: 'bg-yellow-100 text-yellow-700',
  COMPLETED: 'bg-green-100 text-green-700',
  ARCHIVED: 'bg-gray-100 text-gray-500',
};

export default function AssessmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const { data, isLoading, isError } = useAssessments({
    page,
    pageSize,
    status: statusFilter || undefined,
    q: searchTerm || undefined,
  });

  const assessments = data?.data || [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assessments</h1>
          <p className="text-gray-500">Manage your ISO 9001 self-assessments and audits</p>
        </div>
        <Link href="/assessments/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Assessment
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search assessments..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Status</option>
                <option value="DRAFT">Draft</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="UNDER_REVIEW">Under Review</option>
                <option value="COMPLETED">Completed</option>
                <option value="ARCHIVED">Archived</option>
              </select>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessments List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
          </div>
        ) : isError ? (
          <Card>
            <CardContent className="py-12 text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
              <p className="text-gray-700 font-medium">Failed to load assessments</p>
              <p className="text-gray-500 text-sm mt-1">Please try refreshing the page</p>
            </CardContent>
          </Card>
        ) : assessments.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <ClipboardList className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-700 font-medium">No assessments found</p>
              <p className="text-gray-500 text-sm mt-1">
                {searchTerm || statusFilter
                  ? 'Try adjusting your filters'
                  : 'Get started by creating your first assessment'}
              </p>
              {!searchTerm && !statusFilter && (
                <Link href="/assessments/new">
                  <Button className="mt-4">Create your first assessment</Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          assessments.map((assessment) => (
            <Card key={assessment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/assessments/${assessment.id}`}
                        className="text-lg font-semibold text-gray-900 hover:text-primary-600"
                      >
                        {assessment.title}
                      </Link>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          statusColors[assessment.status] || 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {assessment.status.replace('_', ' ')}
                      </span>
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                        {assessment.auditType}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-6 text-sm text-gray-500">
                      <span>
                        Lead: {assessment.leadAuditor.firstName} {assessment.leadAuditor.lastName}
                      </span>
                      {assessment.scheduledDate && (
                        <span>
                          Scheduled: {format(new Date(assessment.scheduledDate), 'MMM d, yyyy')}
                        </span>
                      )}
                      <span>Responses: {assessment._count.responses}</span>
                      {assessment._count.nonConformities > 0 && (
                        <span className="text-red-600">
                          NC: {assessment._count.nonConformities}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Progress or Score */}
                    <div className="w-40">
                      {assessment.status === 'COMPLETED' ? (
                        <div className="text-center">
                          <span
                            className={`text-2xl font-bold ${
                              (assessment.overallScore || 0) >= 70
                                ? 'text-green-600'
                                : (assessment.overallScore || 0) >= 50
                                ? 'text-yellow-600'
                                : 'text-red-600'
                            }`}
                          >
                            {assessment.overallScore?.toFixed(1)}%
                          </span>
                          <p className="text-xs text-gray-500">Compliance Score</p>
                        </div>
                      ) : (
                        <ProgressBar
                          value={assessment.progress}
                          label="Progress"
                          size="sm"
                        />
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Link href={`/assessments/${assessment.id}`}>
                        <Button variant="ghost" size="icon" title="View">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      {assessment.status !== 'COMPLETED' && (
                        <Link href={`/assessments/${assessment.id}/edit`}>
                          <Button variant="ghost" size="icon" title="Edit">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                      <Button variant="ghost" size="icon" title="Clone">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="More">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
