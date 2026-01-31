/**
 * Application-level enum types for SQLite compatibility.
 * These mirror the enum definitions that would be in Prisma schema for PostgreSQL.
 * When migrating to PostgreSQL, these can be replaced with @prisma/client imports.
 */

export const UserRole = {
  SYSTEM_ADMIN: 'SYSTEM_ADMIN',
  QUALITY_MANAGER: 'QUALITY_MANAGER',
  INTERNAL_AUDITOR: 'INTERNAL_AUDITOR',
  DEPARTMENT_HEAD: 'DEPARTMENT_HEAD',
  VIEWER: 'VIEWER',
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const AssessmentStatus = {
  DRAFT: 'DRAFT',
  IN_PROGRESS: 'IN_PROGRESS',
  UNDER_REVIEW: 'UNDER_REVIEW',
  COMPLETED: 'COMPLETED',
  ARCHIVED: 'ARCHIVED',
} as const;
export type AssessmentStatus = (typeof AssessmentStatus)[keyof typeof AssessmentStatus];

export const AuditType = {
  INTERNAL: 'INTERNAL',
  EXTERNAL: 'EXTERNAL',
  SURVEILLANCE: 'SURVEILLANCE',
  CERTIFICATION: 'CERTIFICATION',
} as const;
export type AuditType = (typeof AuditType)[keyof typeof AuditType];

export const TeamMemberRole = {
  LEAD_AUDITOR: 'LEAD_AUDITOR',
  AUDITOR: 'AUDITOR',
  OBSERVER: 'OBSERVER',
} as const;
export type TeamMemberRole = (typeof TeamMemberRole)[keyof typeof TeamMemberRole];

export const Severity = {
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  CRITICAL: 'CRITICAL',
} as const;
export type Severity = (typeof Severity)[keyof typeof Severity];

export const NCRStatus = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  RESOLVED: 'RESOLVED',
  CLOSED: 'CLOSED',
} as const;
export type NCRStatus = (typeof NCRStatus)[keyof typeof NCRStatus];

export const ActionStatus = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  VERIFIED: 'VERIFIED',
} as const;
export type ActionStatus = (typeof ActionStatus)[keyof typeof ActionStatus];

export const Priority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL',
} as const;
export type Priority = (typeof Priority)[keyof typeof Priority];

export const EvidenceType = {
  DOCUMENT: 'DOCUMENT',
  IMAGE: 'IMAGE',
  LINK: 'LINK',
} as const;
export type EvidenceType = (typeof EvidenceType)[keyof typeof EvidenceType];
