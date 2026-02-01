'use client';

import { User, Mail, Building2, Shield, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuthStore } from '@/lib/store';
import { format } from 'date-fns';

const roleLabels: Record<string, string> = {
  SYSTEM_ADMIN: 'System Administrator',
  QUALITY_MANAGER: 'Quality Manager',
  INTERNAL_AUDITOR: 'Internal Auditor',
  DEPARTMENT_HEAD: 'Department Head',
  VIEWER: 'Viewer',
};

const roleColors: Record<string, string> = {
  SYSTEM_ADMIN: 'bg-purple-100 text-purple-700',
  QUALITY_MANAGER: 'bg-blue-100 text-blue-700',
  INTERNAL_AUDITOR: 'bg-green-100 text-green-700',
  DEPARTMENT_HEAD: 'bg-orange-100 text-orange-700',
  VIEWER: 'bg-gray-100 text-gray-700',
};

interface ProfileFieldProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

function ProfileField({ icon, label, value }: ProfileFieldProps) {
  return (
    <div className="flex items-start gap-4 py-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <div className="mt-1 text-gray-900">{value}</div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">View your profile information</p>
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary-600 flex items-center justify-center text-white text-xl font-semibold">
              {user.firstName?.[0]?.toUpperCase() || ''}
              {user.lastName?.[0]?.toUpperCase() || ''}
            </div>
            <div>
              <CardTitle className="text-xl">
                {user.firstName} {user.lastName}
              </CardTitle>
              <CardDescription className="mt-1">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    roleColors[user.role] || 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {roleLabels[user.role] || user.role}
                </span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-gray-100">
            <ProfileField
              icon={<User className="h-5 w-5" />}
              label="Full Name"
              value={`${user.firstName} ${user.lastName}`}
            />
            <ProfileField
              icon={<Mail className="h-5 w-5" />}
              label="Email Address"
              value={user.email}
            />
            <ProfileField
              icon={<Shield className="h-5 w-5" />}
              label="Role"
              value={
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    roleColors[user.role] || 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {roleLabels[user.role] || user.role}
                </span>
              }
            />
            <ProfileField
              icon={<Building2 className="h-5 w-5" />}
              label="Organization"
              value={user.organization?.name || 'Not assigned'}
            />
          </div>
        </CardContent>
      </Card>

      {/* Account Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Your account details and membership information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-gray-100">
            <ProfileField
              icon={<Calendar className="h-5 w-5" />}
              label="Account ID"
              value={
                <span className="font-mono text-sm text-gray-600">
                  {user.id}
                </span>
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
