'use client';

import { useQuery } from '@tanstack/react-query';
import {
  ClipboardCheck,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar, CircularProgress } from '@/components/ui/progress-bar';
import {
  ComplianceBarChart,
  ComplianceRadarChart,
  TrendLineChart,
  ComplianceGauge,
} from '@/components/charts/compliance-chart';
import { dashboardApi } from '@/lib/api';

// Mock data for demonstration
const mockDashboardData = {
  overallScore: 72.5,
  trend: 'UP' as const,
  changeFromPrevious: 3.2,
  sectionScores: [
    { section: 'Context of Organization', sectionNumber: '4', score: 85 },
    { section: 'Leadership', sectionNumber: '5', score: 78 },
    { section: 'Planning', sectionNumber: '6', score: 65 },
    { section: 'Support', sectionNumber: '7', score: 72 },
    { section: 'Operation', sectionNumber: '8', score: 68 },
    { section: 'Performance Evaluation', sectionNumber: '9', score: 75 },
    { section: 'Improvement', sectionNumber: '10', score: 70 },
  ],
  recentAssessments: [
    { id: '1', title: 'Q4 2024 Assessment', status: 'COMPLETED', score: 72.5, date: '2024-12-15' },
    { id: '2', title: 'Q3 2024 Assessment', status: 'COMPLETED', score: 69.3, date: '2024-09-20' },
    { id: '3', title: 'Q2 2024 Assessment', status: 'COMPLETED', score: 66.8, date: '2024-06-18' },
  ],
  openActions: 12,
  overdueActions: 3,
  completedActions: 45,
  trendData: [
    { date: 'Jan', score: 62 },
    { date: 'Mar', score: 65 },
    { date: 'Jun', score: 67 },
    { date: 'Sep', score: 69 },
    { date: 'Dec', score: 72.5 },
  ],
  upcomingAudits: [
    { id: '1', title: 'Surveillance Audit', date: '2025-02-15', type: 'EXTERNAL' },
    { id: '2', title: 'Internal Audit - Operations', date: '2025-01-28', type: 'INTERNAL' },
  ],
  priorityActions: [
    { id: '1', title: 'Update document control procedure', priority: 'HIGH', dueDate: '2025-01-25' },
    { id: '2', title: 'Complete management review minutes', priority: 'HIGH', dueDate: '2025-01-30' },
    { id: '3', title: 'Address customer complaint NC-2024-15', priority: 'CRITICAL', dueDate: '2025-01-20' },
  ],
};

export default function DashboardPage() {
  // In production, use this:
  // const { data, isLoading } = useQuery({
  //   queryKey: ['dashboard'],
  //   queryFn: () => dashboardApi.getData(),
  // });

  const data = mockDashboardData;
  const isLoading = false;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">ISO 9001:2015 Quality Management System Overview</p>
        </div>
        <Button>
          <ClipboardCheck className="mr-2 h-4 w-4" />
          New Assessment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Overall Compliance */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Overall Compliance</p>
                <div className="flex items-center mt-1">
                  <span className="text-3xl font-bold text-gray-900">
                    {data.overallScore.toFixed(1)}%
                  </span>
                  <span
                    className={`ml-2 flex items-center text-sm ${
                      data.trend === 'UP' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {data.trend === 'UP' ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {data.changeFromPrevious}%
                  </span>
                </div>
              </div>
              <CircularProgress value={data.overallScore} size={60} colorScheme="compliance" />
            </div>
          </CardContent>
        </Card>

        {/* Open Actions */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Open Actions</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{data.openActions}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-sm text-red-600 mt-2">
              {data.overdueActions} overdue
            </p>
          </CardContent>
        </Card>

        {/* Non-Conformities */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Non-Conformities</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">5</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">2 major, 3 minor</p>
          </CardContent>
        </Card>

        {/* Completed Actions */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Actions Completed</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{data.completedActions}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">This quarter</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section Compliance Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance by Section</CardTitle>
          </CardHeader>
          <CardContent>
            <ComplianceBarChart data={data.sectionScores} height={280} />
          </CardContent>
        </Card>

        {/* Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ComplianceRadarChart data={data.sectionScores} height={280} />
          </CardContent>
        </Card>
      </div>

      {/* Trend and Actions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Compliance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <TrendLineChart data={data.trendData} height={250} />
          </CardContent>
        </Card>

        {/* Priority Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Priority Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.priorityActions.map((action) => (
                <div
                  key={action.id}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div
                    className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
                      action.priority === 'CRITICAL'
                        ? 'bg-red-500'
                        : action.priority === 'HIGH'
                        ? 'bg-orange-500'
                        : 'bg-yellow-500'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {action.title}
                    </p>
                    <p className="text-xs text-gray-500">Due: {action.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Actions
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Assessments and Upcoming Audits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Assessments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentAssessments.map((assessment) => (
                <div
                  key={assessment.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900">{assessment.title}</p>
                    <p className="text-sm text-gray-500">{assessment.date}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-lg font-bold ${
                        assessment.score >= 70
                          ? 'text-green-600'
                          : assessment.score >= 50
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}
                    >
                      {assessment.score}%
                    </p>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                      {assessment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Audits */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Audits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.upcomingAudits.map((audit) => (
                <div
                  key={audit.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-full ${
                        audit.type === 'EXTERNAL'
                          ? 'bg-purple-100 text-purple-600'
                          : 'bg-blue-100 text-blue-600'
                      }`}
                    >
                      <ClipboardCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{audit.title}</p>
                      <p className="text-sm text-gray-500">{audit.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{audit.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Schedule Audit
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
