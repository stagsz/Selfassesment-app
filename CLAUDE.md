# Project Context

## Overview

ISO 9001 Self-Assessment & Audit Management Application - a web app for conducting ISO 9001:2015 QMS self-assessments and audits.

## Tech Stack

### Backend (Express.js + TypeScript)
- **Location**: `backend/`
- **Entry point**: `backend/src/index.ts`
- **Database**: PostgreSQL with Prisma ORM (`backend/prisma/schema.prisma`)
- **API routes**: `backend/src/routes/`
- **Controllers**: `backend/src/controllers/`
- **Services**: `backend/src/services/`
- **Auth**: JWT tokens with middleware in `backend/src/proxy/authProxy.ts`

### Frontend (Next.js 14 + TypeScript)
- **Location**: `frontend/`
- **App Router**: `frontend/src/app/`
- **Components**: `frontend/src/components/`
- **State**: Zustand store in `frontend/src/lib/store.ts`
- **API client**: `frontend/src/lib/api.ts`
- **Styling**: Tailwind CSS

### Shared Types
- **Location**: `shared/types/`

## Project Structure

```
Selfassesment-app/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema definition
│   │   ├── seed.ts           # Main seed entry point
│   │   └── seed/             # Seed data scripts
│   │       ├── sections.ts   # ISO 9001 sections (73 sections)
│   │       └── questions.ts  # Audit questions (27 questions)
│   ├── src/
│   │   ├── __tests__/        # API tests (Jest + supertest)
│   │   ├── config/           # Configuration (database.ts, index.ts)
│   │   ├── controllers/      # Request handlers
│   │   ├── proxy/            # Middleware (auth, upload, validation, error)
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   ├── types/            # TypeScript types and enums
│   │   └── utils/            # Utilities (errors.ts, logger.ts)
│   ├── uploads/              # Evidence file storage
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── __tests__/        # Component and store tests
│   │   ├── app/              # Next.js App Router pages
│   │   │   ├── (auth)/       # Auth route group (login, register)
│   │   │   └── (dashboard)/  # Dashboard route group
│   │   ├── components/
│   │   │   ├── charts/       # Compliance charts
│   │   │   ├── layout/       # Sidebar, Header
│   │   │   ├── skeletons/    # Loading skeletons
│   │   │   └── ui/           # Reusable UI components
│   │   ├── hooks/            # Custom hooks
│   │   ├── lib/              # Utilities (api.ts, store.ts)
│   │   ├── services/         # API service wrappers
│   │   └── types/            # TypeScript types
│   └── package.json
├── shared/                   # Shared types (index.ts)
├── IMPLEMENTATION_PLAN.md    # Full task breakdown (108 tasks)
├── PRD.json                  # Product requirements
└── package.json              # Root workspace
```

## Key Patterns

### Backend
- Controllers handle HTTP requests
- Services contain business logic
- Prisma for database operations
- Zod for request validation
- JWT for authentication

### Frontend
- App Router with route groups: `(auth)`, `(dashboard)`
- Zustand for global state (auth, UI)
- TanStack Query for server state
- Tailwind CSS for styling
- Recharts for data visualization (via compliance-chart.tsx)

## Commands

```bash
# Install dependencies
npm install

# Development
npm run dev              # Start both backend and frontend

# Database
npm run db:generate --workspace=backend   # Generate Prisma client
npm run db:migrate --workspace=backend    # Run migrations (deprecated, use db:push)
npm run db:push --workspace=backend       # Push schema changes to database
npm run db:seed --workspace=backend       # Seed database

# Testing
npm test --workspace=backend              # Run backend tests
npm test --workspace=frontend             # Run frontend tests
npm run test:watch --workspace=backend    # Watch mode
npm run test:coverage --workspace=backend # Coverage report

# From backend directory
cd backend
npm run db:generate
npm run db:push
npm run db:seed
npm test

# From frontend directory
cd frontend
npm test
```

## User Roles

| Role | Access |
|------|--------|
| SYSTEM_ADMIN | Full access |
| QUALITY_MANAGER | Assessments, reports, auditor management |
| INTERNAL_AUDITOR | Conduct assessments, document findings |
| DEPARTMENT_HEAD | View sections, respond to findings |
| VIEWER | Read-only |

## Scoring System

- **Score 1** (Red): Non-compliant
- **Score 2** (Yellow): Partially compliant
- **Score 3** (Green): Fully compliant

## Current State

**Status**: MVP Complete (108/108 tasks done)
**Phase**: All 11 phases complete
**Last Updated**: 2026-03-23

All 108 MVP tasks across 11 phases are complete. The application is fully functional for ISO 9001:2015 self-assessments and audits, including database, backend API, frontend UI, testing (151 tests), and deployment preparation (Docker + PostgreSQL).

### Completed Features

#### Backend (Phases 1-2: Complete)
- Full database schema with 10 models (Organization, User, Assessment, AuditQuestion, QuestionResponse, Evidence, NonConformity, CorrectiveAction, ISOStandardSection, AssessmentTemplate, AssessmentTeamMember)
- Native PostgreSQL enums (re-exported from `@prisma/client` via `backend/src/types/enums.ts`)
- Auth API: login, register, refresh, password change, /me endpoint
- Assessment API: CRUD, responses, team members, score calculation, status transitions, clone, CSV export
- Standards API: ISO sections tree, questions CRUD, CSV import
- Non-Conformity API: CRUD, status workflow, auto-generate from failing responses
- Corrective Action API: CRUD, status workflow, assignment, verification
- Dashboard API: overview stats, section breakdown, trends
- User Management API: list, update, toggle active, change role
- Evidence API: file upload (multer), download, delete
- Reports API: PDF generation (pdfkit)
- Seed data: 73 ISO sections, 27 audit questions, sample users and assessment

#### Frontend (Phases 3-9: Complete)
- Auth: Login, registration, token refresh, session timeout (30 min)
- Dashboard: Real API data, loading skeletons, empty states
- Assessments: List with search/filter/sort/pagination, create/edit forms, detail view, section navigator, audit execution with auto-save
- Non-Conformities: List with filters, detail page, root cause form, status workflow, corrective actions
- Standards: Collapsible tree view, question detail panel, CSV import modal
- Admin: User management with role change, activate/deactivate
- Settings: Profile display, password change
- Reports: PDF download, CSV export
- UI Polish: Error boundary, confirmation dialogs, toast notifications, mobile responsive

#### Testing (Phase 10: Complete)
- Backend: 91 tests (Jest + supertest) - auth and assessment APIs
- Frontend: 60 tests (Jest + React Testing Library) - stores and Button component

#### Deployment Preparation (Phase 11: Complete)
- PostgreSQL configured with native enums
- Health check endpoint
- Docker Compose, backend Dockerfile, frontend Dockerfile
- Deployment documentation

### Known Limitations
- **Local file storage**: Evidence files stored in `/uploads` folder. Consider S3/Azure Blob for production.
- **No email verification**: Registration doesn't require email confirmation.
- **No password reset**: Users must contact admin if they forget password.
- **Windows Development**: Project developed on Windows. Paths use Windows format in local development.

### Database Requirements
- **PostgreSQL**: The application requires PostgreSQL 12+ for production
- **Connection**: Set `DATABASE_URL` in `.env` (format: `postgresql://user:password@host:port/database?schema=public`)
- **Local development**: For quick local testing, you can temporarily use SQLite by changing the provider in `schema.prisma`, but PostgreSQL is required for production due to native enum support

## Database Schema

Models in `backend/prisma/schema.prisma`:
- **Organization**: id, name, createdAt, updatedAt
- **User**: id, email, passwordHash, firstName, lastName, role, department, isActive, lastLoginAt, organizationId, refreshToken, createdAt, updatedAt
- **Assessment**: id, title, description, status, auditType, scope, objectives, scheduledDate, dueDate, completedDate, overallScore, sectionScores, organizationId, leadAuditorId, templateId, previousAssessmentId, createdAt, updatedAt
- **AssessmentTemplate**: id, name, description, isDefault, organizationId, createdAt, updatedAt
- **AssessmentTeamMember**: id, assessmentId, userId, role (LEAD_AUDITOR, AUDITOR, OBSERVER)
- **ISOStandardSection**: id, sectionNumber (unique), title, description, parentId, order, createdAt
- **AuditQuestion**: id, questionNumber (unique), questionText, guidance, score1/2/3Criteria, sectionId, standardReference, isActive, order, createdAt
- **QuestionResponse**: id, score, justification, isDraft, actionProposal, conclusion, assessmentId, questionId, sectionId, userId, createdAt, updatedAt
- **Evidence**: id, responseId, type, fileName, filePath, fileSize, mimeType, description, uploadedById, uploadedAt
- **NonConformity**: id, assessmentId, responseId, title, description, severity, status, identifiedDate, rootCause, rootCauseMethod, createdAt, updatedAt
- **CorrectiveAction**: id, nonConformityId, description, assignedToId, priority, status, targetDate, completedDate, verifiedDate, verifiedById, effectivenessNotes, createdAt, updatedAt

**Enums** (native PostgreSQL enums, re-exported from `@prisma/client` in `backend/src/types/enums.ts`):
- UserRole, AssessmentStatus, AuditType, TeamMemberRole, Severity, NCRStatus, ActionStatus, Priority, EvidenceType

## Next Steps (Post-MVP)

All 108 MVP tasks are complete. See `IMPLEMENTATION_PLAN.md` for details.

**Future Enhancements** (documented in PRD.json and IMPLEMENTATION_PLAN.md):
- FUTURE-01: Getting started guide page
- FUTURE-02: Context-sensitive help panels
- FUTURE-03: Searchable FAQ page
- FUTURE-04: External Audit Integration — certification body scheduling (F10)
- FUTURE-05: Document Management System — versioning, approval workflow (F11)
- FUTURE-06: Multi-tenant Support — multiple organizations (F12)

## API Endpoints (Implemented)

### Auth
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login and get tokens
- POST /api/auth/refresh - Refresh access token
- POST /api/auth/password - Change password
- GET /api/auth/me - Get current user

### Assessments
- GET /api/assessments - List with pagination, filters, search, sort
- POST /api/assessments - Create assessment
- GET /api/assessments/:id - Get by ID
- PUT /api/assessments/:id - Update assessment
- DELETE /api/assessments/:id - Archive assessment
- POST /api/assessments/:id/clone - Clone assessment
- GET /api/assessments/:id/responses - Get responses
- POST /api/assessments/:id/responses - Upsert response
- PUT /api/assessments/:id/responses/bulk - Bulk update responses
- GET /api/assessments/:id/report - Generate PDF report
- GET /api/assessments/export - Export CSV

### Standards
- GET /api/standards/sections - Get section tree
- GET /api/standards/sections/:id - Get section by ID
- GET /api/standards/questions - List questions (with sectionId filter)
- GET /api/standards/questions/:id - Get question by ID
- POST /api/standards/import - Import questions from CSV

### Non-Conformities
- GET /api/non-conformities - List all NCRs (organization-wide)
- GET /api/assessments/:id/non-conformities - List by assessment
- POST /api/assessments/:id/non-conformities - Create NCR
- POST /api/assessments/:id/non-conformities/generate - Auto-generate from score=1
- GET /api/assessments/:id/non-conformities/summary - Get stats
- GET /api/non-conformities/:id - Get NCR by ID
- PUT /api/non-conformities/:id - Update NCR
- DELETE /api/non-conformities/:id - Delete NCR
- POST /api/non-conformities/:id/transition - Status transition

### Corrective Actions
- GET /api/non-conformities/:id/actions - List actions
- POST /api/non-conformities/:id/actions - Create action
- GET /api/actions/:id - Get action by ID
- PUT /api/actions/:id - Update action
- DELETE /api/actions/:id - Delete action
- POST /api/actions/:id/verify - Verify action

### Evidence
- POST /api/responses/:id/evidence - Upload file
- GET /api/responses/:id/evidence - List by response
- GET /api/evidence/:id/download - Download file
- DELETE /api/evidence/:id - Delete file

### Dashboard
- GET /api/dashboard - Overview stats
- GET /api/dashboard/sections - Section breakdown
- GET /api/dashboard/trends - Historical trends

### Users
- GET /api/users - List with filters
- GET /api/users/:id - Get by ID
- PUT /api/users/:id - Update user
- POST /api/users/:id/toggle-active - Activate/deactivate
- POST /api/users/:id/change-role - Change role

### Templates
- GET /api/templates - List templates
- POST /api/templates - Create template
- GET /api/templates/:id - Get by ID

## Key Files Reference

### Backend
| File | Purpose |
|------|---------|
| `backend/prisma/schema.prisma` | Database schema definition |
| `backend/src/index.ts` | Express server entry point |
| `backend/src/types/enums.ts` | Application-level enum types |
| `backend/src/services/authService.ts` | Authentication business logic |
| `backend/src/services/assessmentService.ts` | Assessment CRUD and scoring |
| `backend/src/services/reportService.ts` | PDF report generation |
| `backend/src/proxy/authProxy.ts` | JWT auth middleware |
| `backend/src/proxy/uploadProxy.ts` | Multer file upload middleware |
| `backend/src/utils/errors.ts` | Custom error classes |
| `backend/prisma/seed.ts` | Main seed entry point |

### Frontend
| File | Purpose |
|------|---------|
| `frontend/src/app/layout.tsx` | Root layout |
| `frontend/src/app/(dashboard)/layout.tsx` | Dashboard layout with sidebar |
| `frontend/src/lib/store.ts` | Zustand state stores (auth, assessmentDraft, ui) |
| `frontend/src/lib/api.ts` | Axios API client with interceptors |
| `frontend/src/components/charts/compliance-chart.tsx` | Chart components (bar, radar, line, gauge) |
| `frontend/src/components/ui/` | Reusable UI components |
| `frontend/src/hooks/` | Custom hooks (useDebounce, useSessionTimeout, etc.) |

### Testing
| File | Purpose |
|------|---------|
| `backend/src/__tests__/` | Backend API tests |
| `frontend/src/__tests__/` | Frontend component and store tests |
| `backend/jest.config.js` | Backend Jest configuration |
| `frontend/jest.config.js` | Frontend Jest configuration |

## Test Coverage Summary

| Area | Tests | Coverage |
|------|-------|----------|
| Backend Auth API | 26 | Login, register, refresh, password, /me |
| Backend Assessment API | 65 | CRUD, scoring, status, clone, export |
| Frontend Stores | 48 | useAuthStore, useAssessmentDraftStore, useUIStore |
| Frontend Components | 12 | Button component |
| **Total** | **151** | |

Run tests:
```bash
npm test --workspace=backend   # 91 backend tests
npm test --workspace=frontend  # 60 frontend tests
```
