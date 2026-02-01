# Implementation Plan

> **Workflow**: Do tasks in order. One at a time. Update this file after each commit.

## Current Status

**Phase**: 8 - Reports & Export
**Progress**: 89 / 88 tasks (6 pre-existing setup tasks completed)
**Last Updated**: 2026-02-01
**Last Completed**: UI-46 (Implement PDF download - already included in UI-45)
**Next Task**: REPORT-04 (Add GET /api/assessments/export endpoint)

### Blocking Issue - RESOLVED
The schema mismatch has been resolved. The backend now compiles without TypeScript errors.

**Note on SQLite Compatibility:**
SQLite does not support native enums or JSON types. The schema uses String fields with application-level enum types defined in `backend/src/types/enums.ts`. When migrating to PostgreSQL (DEPLOY-01), update the schema to use native enums.

---

## Overview

This plan implements the ISO 9001 Self-Assessment & Audit Management application based on PRD.json. Tasks are organized in dependency order with each task completable in 1-2 hours.

**What's Already Done:**
- Basic project structure (monorepo with backend/frontend/shared)
- Prisma ORM configured with SQLite (`backend/prisma/schema.prisma`)
- Current schema models: Organization, User, Assessment, AuditQuestion, QuestionResponse
- Auth service with JWT tokens (`backend/src/services/authService.ts`)
- Assessment service (has code but references non-existent schema fields/models)
- UI components (Button, Card, Input, ProgressBar, ScoreButton)
- Chart components (`frontend/src/components/charts/compliance-chart.tsx`)
- Layout components (Sidebar, Header)
- Login page UI (functional)
- Dashboard page (mockup with hardcoded data)
- Assessments list page (mockup with hardcoded data)
- API client with axios interceptors for token refresh (`frontend/src/lib/api.ts`)
- Zustand stores (`frontend/src/lib/store.ts`)

**Critical Gap to Address First:**
The `assessmentService.ts` imports and references models/fields/enums that don't exist in the Prisma schema:
- Missing imports from @prisma/client: `AssessmentStatus`, `AuditType`, `UserRole`
- Missing models: `AssessmentTemplate`, `AssessmentTeamMember`, `NonConformity`, `CorrectiveAction`, `ISOStandardSection`, `Evidence`
- Missing Assessment fields: `auditType`, `scope`, `objectives`, `scheduledDate`, `dueDate`, `completedDate`, `templateId`, `sectionScores`, `previousAssessmentId`, `teamMembers`, `nonConformities`
- Missing QuestionResponse fields: `isDraft`, `sectionId`, `section`, `evidence`
- Missing AuditQuestion fields: `sectionId`, `isActive`, `order`, `standardReference`

---

## Phase 1: Database Schema Completion (15 tasks)

### 1.1 Add Enums
- [x] **DB-01**: Add enums to schema.prisma `d8abbb2`
  - `UserRole`: SYSTEM_ADMIN, QUALITY_MANAGER, INTERNAL_AUDITOR, DEPARTMENT_HEAD, VIEWER
  - `AssessmentStatus`: DRAFT, IN_PROGRESS, UNDER_REVIEW, COMPLETED, ARCHIVED
  - `AuditType`: INTERNAL, EXTERNAL, SURVEILLANCE, CERTIFICATION
  - `TeamMemberRole`: LEAD_AUDITOR, AUDITOR, OBSERVER
  - `Severity`: MINOR, MAJOR, CRITICAL
  - `NCRStatus`: OPEN, IN_PROGRESS, RESOLVED, CLOSED
  - `ActionStatus`: PENDING, IN_PROGRESS, COMPLETED, VERIFIED
  - `Priority`: LOW, MEDIUM, HIGH, CRITICAL
  - `EvidenceType`: DOCUMENT, IMAGE, LINK
  - Update User.role from String to UserRole enum
  - Update Assessment.status from String to AssessmentStatus enum

### 1.2 Add ISOStandardSection Model
- [x] **DB-02**: Add ISOStandardSection model `bb33903`
  - Fields: id, sectionNumber (unique), title, description, parentId (self-relation for nested sections), order, createdAt
  - Relation: children (self-referential), questions

### 1.3 Update AuditQuestion Model
- [x] **DB-03**: Update AuditQuestion model `ff69e92`
  - Add: sectionId (foreign key to ISOStandardSection), standardReference, isActive (Boolean, default true), order (Int)
  - Add relation: section

### 1.4 Add Assessment-Related Models
- [x] **DB-04**: Add AssessmentTemplate model `54d47e7`
  - Fields: id, name, description, isDefault (Boolean), organizationId, createdAt, updatedAt
  - Relations: organization, assessments

- [x] **DB-05**: Add AssessmentTeamMember model (join table) `360dfb4`
  - Fields: id, assessmentId, userId, role (TeamMemberRole enum)
  - Relations: assessment, user
  - Unique constraint: [assessmentId, userId]

- [x] **DB-06**: Update Assessment model `e711210`
  - Add fields: auditType (AuditType enum, default INTERNAL), scope (String?), objectives (Json), scheduledDate (DateTime?), dueDate (DateTime?), completedDate (DateTime?), templateId (String?), sectionScores (Json), previousAssessmentId (String?)
  - Add relations: template, teamMembers, nonConformities, previousAssessment (self-referential)

### 1.5 Update QuestionResponse Model
- [x] **DB-07**: Update QuestionResponse model - Add section relation `ab33bd9`
  - Add: sectionId (String), section relation to ISOStandardSection

- [x] **DB-08**: Update QuestionResponse model - Add draft and evidence fields `b518a28`
  - Add: isDraft (Boolean, default true), actionProposal (String?), conclusion (String?)
  - Add relation: evidence (one-to-many) - relation added in DB-09 when Evidence model is created

### 1.6 Add Evidence Model
- [x] **DB-09**: Add Evidence model `c6483f2`
  - Fields: id, responseId, type (EvidenceType enum), fileName, filePath, fileSize (Int), mimeType, description (String?), uploadedById, uploadedAt
  - Relations: response, uploadedBy

### 1.7 Add Non-Conformity & Corrective Action Models
- [x] **DB-10**: Add NonConformity model `3eff346`
  - Fields: id, assessmentId, responseId (optional), title, description, severity (Severity enum), status (NCRStatus enum, default OPEN), identifiedDate, rootCause (String?), rootCauseMethod (String?)
  - Relations: assessment, response, correctiveActions (added in DB-11)

- [x] **DB-11**: Add CorrectiveAction model `9d5c680`
  - Fields: id, nonConformityId, description, assignedToId (String?), priority (Priority enum), status (ActionStatus enum, default PENDING), targetDate (DateTime?), completedDate (DateTime?), verifiedDate (DateTime?), verifiedById (String?), effectivenessNotes (String?)
  - Relations: nonConformity, assignedTo, verifiedBy

### 1.8 Run Migration & Seed Data
- [x] **DB-12**: Run Prisma migration to apply all schema changes `8dea4e4`
  - Updated schema to use SQLite-compatible types (String instead of enums, String instead of Json)
  - Created application-level enum types in `backend/src/types/enums.ts`
  - Applied schema using `prisma db push`
  - Fixed all TypeScript compilation errors in backend services

- [x] **DB-13**: Create seed script for ISO 9001:2015 standard sections `a9302db`
  - Add Clauses 4-10 with key subsections per ISO 9001:2015
  - File: `backend/prisma/seed/sections.ts`
  - Seeded 73 sections total (7 main clauses with nested subsections)

- [x] **DB-14**: Create seed script for sample audit questions `ff0954e`
  - Add 3-5 questions per major section with score criteria
  - File: `backend/prisma/seed/questions.ts`
  - Seeded 27 audit questions covering all ISO 9001:2015 clauses (4-10)

- [x] **DB-15**: Create seed script for default data `39f0960`
  - Default organization, admin user (admin@example.com / password: admin123)
  - Sample assessment with some responses
  - File: `backend/prisma/seed.ts` (main seed entry point)
  - Added Quality Manager and Internal Auditor sample users
  - Created sample assessment with team members, responses, NCR, and corrective action

---

## Phase 2: Backend API - Fix & Complete Core Endpoints (25 tasks)

### 2.1 Fix Assessment Service
- [x] **API-01**: Update assessmentService.ts to match new schema `059d71b`
  - Fix all TypeScript errors
  - Ensure correct model relations
  - Remove hardcoded enum strings, use imported enums

- [x] **API-02**: Update assessmentController.ts with proper Zod validation schemas `47ce630`
  - Add validation for create, update, list query params
  - Add proper error responses

### 2.2 Standards & Questions API
- [x] **API-03**: Create standardsService.ts `a529bbc`
  - Methods: getSections (returns tree structure), getSectionById, getQuestions (with filters), createQuestion, updateQuestion

- [x] **API-04**: Create standardsController.ts `e79183b`
  - Request handlers for all standards endpoints
  - Includes Zod validation schemas for questions query, create, and update

- [x] **API-05**: Add routes/standardsRoutes.ts `4a473ab`
  - GET /api/standards/sections (tree structure)
  - GET /api/standards/sections/:id
  - GET /api/standards/questions (with optional sectionId filter)
  - GET /api/standards/questions/:id

- [x] **API-06**: Implement csvImportService.ts `3dbd964`
  - Parse CSV file
  - Validate data (required fields, section references)
  - Batch insert questions with proper section linking
  - Return import summary (success count, error list)
  - Added POST /api/standards/import endpoint with file upload support

### 2.3 Response Management API
- [x] **API-07**: Create responseService.ts `9525259`
  - Methods: getByAssessment, createOrUpdate (upsert), bulkUpdate, saveDraft (auto-save)
  - Include score calculation trigger

- [x] **API-08**: Create responseController.ts `633174f`
  - Request handlers with validation

- [x] **API-09**: Add response routes `0215cc8`
  - GET /api/assessments/:id/responses
  - POST /api/assessments/:id/responses (upsert single)
  - PUT /api/assessments/:id/responses/bulk (batch update)

### 2.4 Evidence Management API
- [x] **API-10**: Create evidenceService.ts `dc592a3`
  - Methods: uploadFile, listByResponse, getById, deleteFile
  - Local filesystem storage in /uploads folder

- [x] **API-11**: Create evidenceController.ts `152f58e`
  - Upload, list, download, delete handlers

- [x] **API-12**: Add evidence routes `0f6873b`
  - POST /api/responses/:id/evidence (multipart upload)
  - GET /api/responses/:id/evidence
  - GET /api/evidence/:id/download
  - DELETE /api/evidence/:id

- [x] **API-13**: Configure multer middleware for file uploads `d0d7931`
  - 10MB limit
  - Allowed formats: PDF, DOCX, XLSX, PNG, JPG
  - File: `backend/src/proxy/uploadProxy.ts`
  - Updated errorProxy.ts for multer error handling
  - Integrated uploadEvidence middleware into evidenceRoutes.ts

### 2.5 Non-Conformity API
- [x] **API-14**: Create nonConformityService.ts `04a2d9b`
  - CRUD operations (list, get, create, update, delete)
  - Status workflow transitions (OPEN -> IN_PROGRESS -> RESOLVED -> CLOSED)
  - Auto-create NCRs from score=1 responses via createFromFailingResponses()
  - Summary statistics by status and severity

- [x] **API-15**: Create nonConformityController.ts `3cd426e`
  - List, create, update, getById, delete, transition handlers
  - Add generateFromFailingResponses and getSummary handlers
  - Include Zod validation schemas for all endpoints

- [x] **API-16**: Add NCR routes `a58bb47`
  - GET /api/assessments/:id/non-conformities
  - POST /api/assessments/:id/non-conformities
  - POST /api/assessments/:id/non-conformities/generate
  - GET /api/assessments/:id/non-conformities/summary
  - GET /api/non-conformities/:id
  - PUT /api/non-conformities/:id
  - DELETE /api/non-conformities/:id
  - POST /api/non-conformities/:id/transition

### 2.6 Corrective Action API
- [x] **API-17**: Create correctiveActionService.ts `608b53e`
  - CRUD (list, get, create, update, delete)
  - Status workflow transitions (PENDING -> IN_PROGRESS -> COMPLETED -> VERIFIED)
  - assign user, verify with effectiveness notes
  - getSummaryByNCR for statistics

- [x] **API-18**: Create correctiveActionController.ts `3f5ba07`
  - Request handlers with Zod validation schemas
  - Endpoints: list, getById, create, update, delete, updateStatus, verify, assign, getSummary

- [x] **API-19**: Add action routes `375b1ce`
  - GET /api/non-conformities/:id/actions
  - POST /api/non-conformities/:id/actions
  - GET /api/actions/:id
  - PUT /api/actions/:id
  - POST /api/actions/:id/verify

### 2.7 Dashboard API
- [x] **API-20**: Create dashboardService.ts `25b1591`
  - getOverview: compliance score, assessment counts by status, NCR counts
  - getSectionBreakdown: scores by ISO section
  - getTrends: historical data for trend charts (last 6 months)

- [x] **API-21**: Create dashboardController.ts `cf17ae1`
  - Request handlers for getOverview, getSectionBreakdown, getTrends
  - Zod validation for optional assessmentId query parameter

- [x] **API-22**: Add dashboard routes `eaa763c`
  - GET /api/dashboard (overview data)
  - GET /api/dashboard/sections (section breakdown)
  - GET /api/dashboard/trends (historical chart data)

### 2.8 User Management API
- [x] **API-23**: Create userService.ts `349bbe7`
  - Methods: list (with filtering, pagination), getById, update, toggleActive, changeRole

- [x] **API-24**: Create userController.ts `a6a362a`
  - Request handlers with role-based authorization
  - Endpoints: list, getById, update, toggleActive, changeRole
  - Role-based access: SYSTEM_ADMIN only for toggleActive and changeRole

- [x] **API-25**: Add user routes `5f1bff1`
  - GET /api/users (with query params: role, isActive, search)
  - GET /api/users/:id
  - PUT /api/users/:id
  - POST /api/users/:id/toggle-active (SYSTEM_ADMIN only)
  - POST /api/users/:id/change-role (SYSTEM_ADMIN only)

---

## Phase 3: Frontend - Auth & Core Layout (6 tasks)

- [x] **UI-01**: Update login page to call real API `aac46d2`
  - Call /api/auth/login endpoint
  - Add loading spinner during request
  - Add error toast on failure (using sonner)
  - Redirect to /dashboard on success
  - Added Toaster component to providers

- [x] **UI-02**: Create registration page at /register `6ad2c67`
  - Form: email, password, confirmPassword, firstName, lastName
  - Call /api/auth/register
  - Redirect to /login on success with success message
  - Added "Sign up" link on login page for navigation

- [x] **UI-03**: Add toast notification system `aac46d2`
  - Installed and configured Sonner (already in package.json)
  - Created ToastProvider wrapper in providers.tsx
  - Added Toaster to root layout via Providers component

- [x] **UI-04**: Add auth error handling `052c8db`
  - Created auth-errors.ts utility with user-friendly error messages
  - User-friendly messages for: invalid credentials, account disabled, network error
  - Token refresh failure handling (redirect to login with toast notification)
  - Network error detection and handling in API interceptor

- [x] **UI-05**: Create responsive mobile menu `5a897af`
  - Hamburger menu toggle button (visible on mobile)
  - Slide-out drawer for sidebar on mobile
  - Close on navigation or outside click

- [x] **UI-06**: Add notifications dropdown in header `34e777a`
  - UI shell only for MVP
  - Shows placeholder list of notifications
  - Badge with count

---

## Phase 4: Frontend - Dashboard (3 tasks)

- [x] **UI-07**: Connect dashboard to real API `4469ccd`
  - Create useDashboard hook using React Query
  - Call GET /api/dashboard
  - Replace hardcoded mock data with API data

- [x] **UI-08**: Add loading skeletons for dashboard `3eb8596`
  - Skeleton components for cards and charts
  - Created base Skeleton component with SkeletonCard, SkeletonChart, SkeletonStatusGrid
  - Created DashboardSkeleton component matching dashboard layout

- [x] **UI-09**: Add empty states for dashboard `def16c5`
  - When no assessments exist
  - Illustration/icon + message
  - "Create First Assessment" button linking to /assessments/new

---

## Phase 5: Frontend - Assessments (18 tasks)

### 5.1 Assessment List
- [x] **UI-10**: Connect assessments list to API `7ab77ac`
  - Create useAssessments hook with React Query
  - Call GET /api/assessments with pagination
  - Replace mock data

- [x] **UI-11**: Add status filter dropdown `9bf7102`
  - Options: All, Draft, In Progress, Under Review, Completed, Archived
  - Filter updates URL query params and refetches
  - Created reusable Select component

- [x] **UI-12**: Add search input `6721d1f`
  - Debounced (300ms) search by title/description
  - Updates query params
  - Created reusable useDebounce hook

- [x] **UI-13**: Add pagination controls `31a0372`
  - Previous/Next buttons
  - Page number display
  - Items per page selector: 10/25/50
  - Created reusable Pagination component

- [x] **UI-14**: Add column sorting `162180c`
  - Sortable columns: created date, scheduled date, score, status
  - Clickable headers with sort direction indicator

### 5.2 Assessment Create/Edit
- [x] **UI-15**: Create /assessments/new page `d7801ad`
  - Form fields: title, description, auditType dropdown, scheduledDate picker, dueDate picker
  - Submit calls POST /api/assessments
  - Redirect to assessment detail on success

- [x] **UI-16**: Add template selection dropdown `f9abb58`
  - Optional field
  - Loads templates from GET /api/templates (if available, else skip for MVP)
  - Created backend templates API (service, controller, routes)
  - Auto-selects default template if one exists
  - Shows loading state and "No templates available" message

- [x] **UI-17**: Add team member assignment `33d2105`
  - User search/select (multiselect)
  - Assign role per member (Lead Auditor, Auditor, Observer)
  - Created TeamMemberSelect component with user search (min 2 chars)
  - Updated backend assessmentService to accept team members with roles

### 5.3 Assessment Detail View
- [x] **UI-18**: Create /assessments/[id] detail page `15f1766`
  - Header: title, status badge, progress percentage
  - Action buttons: Edit, Delete, Generate Report (role-based visibility)
  - Team members display, dates, scope information
  - Delete confirmation modal with loading state
  - Skeleton loading state

- [x] **UI-19**: Add section navigator sidebar `2fbdc0e`
  - List ISO sections with completion status indicators
  - Checkmark (complete), partial (in progress), empty (not started)
  - Click to navigate to section
  - Created SectionNavigator component with collapsible tree view
  - Created useStandards hook for fetching ISO sections from API

- [x] **UI-20**: Create section score summary panel `b610c62`
  - Radar chart or bar chart of scores by section
  - Uses compliance-chart.tsx components
  - Toggle between bar and radar chart views
  - Shows overall compliance percentage

### 5.4 Assessment Execution (Auditing)
- [x] **UI-21**: Create QuestionCard component `4e5ffa7`
  - Score buttons (1/2/3) using ScoreButton component
  - Criteria hover tooltips showing score definitions
  - Color coding (red=1, yellow=2, green=3)

- [x] **UI-22**: Add justification textarea `d01ab76`
  - Character counter (max 2000 chars)
  - Required when score < 3 (visual indicator)
  - Added onJustificationChange callback prop
  - Exported MAX_JUSTIFICATION_LENGTH constant

- [x] **UI-23**: Create EvidenceUpload component `ac3fa3e`
  - Drag-drop zone with visual feedback
  - File picker button (click-to-upload)
  - Upload progress bar for each file
  - File validation (type, size, MIME type)
  - Added evidenceApi to frontend API client

- [x] **UI-24**: Add EvidenceList component `a882dba`
  - File icons by type (PDF, DOC, XLS, image)
  - Filename, size display
  - Preview/download links
  - Delete button with confirmation

- [x] **UI-25**: Implement auto-save `04c719b`
  - Save draft every 30 seconds if changes detected
  - Created useAutoSave hook with debounce and change detection
  - Created SaveStatusIndicator component showing "Saving..."/"Saved" with timestamp
  - Created useAssessmentResponses hook combining response fetching with auto-save

- [x] **UI-26**: Add section progress indicator `416daef`
  - "5 of 12 questions answered"
  - Progress bar
  - Created SectionProgressIndicator, SectionProgressBadge, and MiniProgress components
  - Integrated into assessment detail page progress card

- [x] **UI-27**: Add section navigation `337e2a8`
  - Tabs or sidebar navigation for moving between ISO sections
  - Previous/Next section buttons
  - Created SectionTabsNavigation component with horizontal tabs for ISO sections
  - Created SectionNavButtons for Previous/Next navigation
  - Created SectionContent component for displaying section questions
  - Added useQuestionsBySection hook for fetching questions by section
  - Created /assessments/[id]/audit page for conducting audits
  - Added "Start Audit" / "Continue Audit" button to assessment detail page

---

## Phase 6: Frontend - Non-Conformities & Corrective Actions (8 tasks)

### 6.1 Non-Conformity Management
- [x] **UI-28**: Create /non-conformities page `0b83b38`
  - List view with filters (status, severity dropdowns)
  - Search by title
  - Link to assessment context
  - Added GET /api/non-conformities endpoint to backend for organization-wide NCR listing

- [x] **UI-29**: Create /non-conformities/[id] detail page `088ecd0`
  - Description, severity badge, linked assessment/question
  - Root cause section (editable)
  - Added useUpdateNonConformity mutation hook
  - Corrective actions list display with status, priority, assignee
  - Assessment context sidebar with link to parent assessment
  - Timeline card and statistics

- [x] **UI-30**: Add root cause form `088ecd0`
  - Text input for root cause description
  - Method selector dropdown (5 Whys, Fishbone, FMEA, Pareto Analysis, Other)
  - Note: Implemented as part of UI-29 (included in RootCauseForm component)

- [x] **UI-31**: Create NCR status workflow buttons `0be4d3f`
  - Show valid transitions based on current status
  - Open → In Progress → Resolved → Closed
  - Confirmation dialog for transitions
  - Created NCRStatusWorkflow component with visual workflow indicator
  - Requirements hints for RESOLVED and CLOSED transitions
  - Integrated into NCR detail page

### 6.2 Corrective Actions
- [x] **UI-32**: Create corrective action list within NCR detail `45184c4`
  - Table with: description, status, assignee, target date
  - Add action button
  - Created CorrectiveActionList component with expandable rows
  - Added useCorrectiveActions hooks and correctiveActionsApi
  - Summary stats showing pending, in progress, completed, verified, overdue

- [x] **UI-33**: Create action form modal `bea8eee`
  - Fields: description, assignee search/select, target date picker, priority dropdown
  - Create/Update action

- [x] **UI-34**: Add action status update dropdown `2dce442`
  - Show allowed transitions based on current status
  - Pending → In Progress → Completed → Verified
  - Created ActionStatusDropdown component with workflow validation
  - Integrated into CorrectiveActionList with onVerifyAction callback

- [x] **UI-35**: Create verification form modal `8ab28d7`
  - For completed actions only (validates status)
  - Effectiveness notes textarea with description
  - Verification confirmation checkbox with acknowledgment
  - Shows action summary and assignee information
  - Submit button calls POST /api/actions/:id/verify

---

## Phase 7: Frontend - Standards & Settings (9 tasks)

### 7.1 Standards Viewer
- [x] **UI-36**: Create /standards page `953349e`
  - Collapsible tree view of ISO sections
  - Expand/collapse with chevron icons
  - Section number + title display

- [x] **UI-37**: Create section detail panel `427f5f3`
  - Shows questions for selected section
  - Displays score criteria (1/2/3 definitions)
  - Expandable question items with guidance
  - Expand/collapse all functionality

- [x] **UI-38**: Add CSV import modal `4791460`
  - File upload input with drag-drop support
  - Validation feedback display (errors, warnings)
  - Import button with loading state
  - Success/error toast with result statistics

### 7.2 User Management (Admin)
- [x] **UI-39**: Create /admin/users page `c87d5ce`
  - SYSTEM_ADMIN and QUALITY_MANAGER route guard
  - User list table: email, name, role, status, last login
  - Search by name/email with debounce
  - Filter by role and active status
  - Sortable columns (email, role, lastLogin, createdAt)
  - Pagination with configurable page size

- [x] **UI-40**: Create user edit modal `5d5da86`
  - Fields: firstName, lastName, email (role handled separately via UI-41)
  - Save/Cancel buttons with validation
  - Added update method to usersApi and useUpdateUser mutation hook

- [x] **UI-41**: Add role change confirmation dialog `bdbc55d`
  - Warning about permission changes
  - "Are you sure?" with role comparison
  - Created RoleChangeConfirmationDialog component
  - Role button in admin users page (SYSTEM_ADMIN only)
  - Prevents changing own role

- [x] **UI-42**: Add user activate/deactivate toggle `9c6d673`
  - Toggle button in user row (SYSTEM_ADMIN only)
  - StatusToggleConfirmationDialog with confirmation workflow
  - Button styling changes based on user's current status

### 7.3 Settings
- [x] **UI-43**: Create /settings page `872040f`
  - User profile card showing: name, email, role, organization
  - Read-only display
  - Added account information card with user ID
  - Moved Settings to main navigation (accessible to all users)

- [x] **UI-44**: Add password change form `97368a9`
  - Fields: current password, new password, confirm password
  - Validation (min length, match)
  - Success/error toast

---

## Phase 8: Reports & Export (7 tasks)

### 8.1 Report Generation
- [x] **REPORT-01**: Install pdfkit and create reportService.ts `3517aa6`
  - `npm install pdfkit` (v0.17.2)
  - Create `backend/src/services/reportService.ts`
  - Generate assessment PDF with cover page, executive summary
  - Section breakdown, findings list, NCR summary, recommendations

- [x] **REPORT-02**: Design assessment report template `a72a840`
  - Executive summary section
  - Overall score gauge/display (visual circular gauge with color coding)
  - Section breakdown table
  - Findings list (questions with score < 3)
  - NCR summary table
  - Recommendations section

- [x] **REPORT-03**: Add GET /api/assessments/:id/report endpoint `ab368b1`
  - Returns PDF buffer
  - Content-Type: application/pdf
  - Content-Disposition: attachment; filename="assessment-report.pdf"

- [x] **UI-45**: Add "Generate Report" button on assessment detail `dbc6aa1`
  - Visible when status is COMPLETED or UNDER_REVIEW
  - Loading state during generation
  - Downloads PDF with sanitized filename based on assessment title

- [x] **UI-46**: Implement PDF download `dbc6aa1`
  - Fetch blob from API
  - Create object URL
  - Trigger download with descriptive filename
  - Note: Implemented as part of UI-45 commit

### 8.2 Data Export
- [ ] **REPORT-04**: Add GET /api/assessments/export endpoint
  - Returns CSV of assessments list
  - Columns: id, title, status, score, scheduledDate, completedDate, leadAuditor

- [ ] **UI-47**: Add "Export to CSV" button on assessments list
  - Trigger download

---

## Phase 9: Polish & Error Handling (5 tasks)

- [ ] **POLISH-01**: Add global error boundary
  - Wrap app in ErrorBoundary component
  - Fallback UI with: error message, retry button, home link
  - Log errors to console (or external service if desired)

- [ ] **POLISH-02**: Add loading skeleton components for all list pages
  - Assessments list skeleton
  - NCRs list skeleton
  - Users list skeleton
  - Consistent skeleton patterns

- [ ] **POLISH-03**: Add empty state components
  - No data illustration/icon
  - "No results found" for searches
  - Call-to-action buttons where appropriate

- [ ] **POLISH-04**: Add confirmation dialogs for destructive actions
  - Delete assessment
  - Deactivate user
  - Delete evidence
  - Use consistent dialog component

- [ ] **POLISH-05**: Implement session timeout
  - Warning toast at 25 minutes inactivity
  - Auto-logout and redirect to login at 30 minutes
  - Reset timer on user activity

---

## Phase 10: Testing (Optional for MVP) (6 tasks)

- [ ] **TEST-01**: Set up Jest and supertest for backend
  - Install dependencies
  - Configure jest.config.js
  - Add test script to package.json

- [ ] **TEST-02**: Write auth API tests
  - Login success/failure cases
  - Token refresh flow
  - Password change validation

- [ ] **TEST-03**: Write assessment API tests
  - CRUD operations
  - Score calculation
  - Status transition validation

- [ ] **TEST-04**: Set up Jest and React Testing Library for frontend
  - Install dependencies
  - Configure jest.config.js
  - Add test utilities

- [ ] **TEST-05**: Write auth store unit tests
  - Login state management
  - Logout clears state
  - Token refresh flow

- [ ] **TEST-06**: Write component tests
  - ScoreButton click handling
  - ProgressBar display
  - QuestionCard interactions

---

## Phase 11: Deployment Preparation (6 tasks)

- [ ] **DEPLOY-01**: Switch to PostgreSQL
  - Update datasource provider in schema.prisma to "postgresql"
  - Update DATABASE_URL format in .env.example
  - Test migration with PostgreSQL locally

- [ ] **DEPLOY-02**: Add health check endpoint
  - GET /api/health
  - Returns: { status: 'ok', timestamp, version }
  - Include database connectivity check

- [ ] **DEPLOY-03**: Create docker-compose.yml
  - App container
  - PostgreSQL container
  - Volume mounts for data persistence
  - Environment variable configuration

- [ ] **DEPLOY-04**: Create backend Dockerfile
  - Base: Node.js 18
  - Multi-stage build for smaller image
  - Copy dist and node_modules
  - Expose port 3001

- [ ] **DEPLOY-05**: Create frontend Dockerfile
  - Next.js standalone build
  - Multi-stage build
  - Expose port 3000

- [ ] **DEPLOY-06**: Document deployment process
  - Update README.md with:
    - Environment variables list
    - Database setup instructions
    - Running with Docker commands
    - Manual deployment steps

---

## Blockers

~~1. **Schema Mismatch (Critical)**: `assessmentService.ts` will not compile due to missing Prisma models/fields/enums. Must complete Phase 1 (DB-01 through DB-12) before backend will build successfully.~~ **RESOLVED in DB-12**

No current blockers.

---

## Completed Tasks Log

| Task | Commit | Date |
|------|--------|------|
| SETUP-01: Initialize monorepo structure | 5756c18 | - |
| UI-COMP: Create Button, Card, Input, ProgressBar, ScoreButton | 5756c18 | - |
| UI-CHART: Create compliance-chart.tsx | 5756c18 | - |
| UI-LAYOUT: Create Sidebar and Header components | 6916fe1 | - |
| AUTH-BASE: Implement auth service and routes | 6916fe1 | - |
| ASSESS-BASE: Implement assessment service (partial, has schema errors) | 6916fe1 | - |
| DB-01: Add enums to schema.prisma | d8abbb2 | 2026-01-31 |
| DB-02: Add ISOStandardSection model | bb33903 | 2026-01-31 |
| DB-03: Update AuditQuestion model | ff69e92 | 2026-01-31 |
| DB-04: Add AssessmentTemplate model | 54d47e7 | 2026-01-31 |
| DB-05: Add AssessmentTeamMember model | 360dfb4 | 2026-01-31 |
| DB-06: Update Assessment model | e711210 | 2026-01-31 |
| DB-07: Update QuestionResponse model - Add section relation | ab33bd9 | 2026-01-31 |
| DB-08: Update QuestionResponse model - Add draft and evidence fields | b518a28 | 2026-01-31 |
| DB-09: Add Evidence model | c6483f2 | 2026-01-31 |
| DB-10: Add NonConformity model | 3eff346 | 2026-01-31 |
| DB-11: Add CorrectiveAction model | 9d5c680 | 2026-01-31 |
| DB-12: Run Prisma migration and fix SQLite compatibility | 8dea4e4 | 2026-01-31 |
| DB-13: Create seed script for ISO 9001:2015 sections | a9302db | 2026-01-31 |
| DB-14: Create seed script for sample audit questions | ff0954e | 2026-01-31 |
| DB-15: Create seed script for default data | 39f0960 | 2026-01-31 |
| API-01: Update assessmentService.ts to use imported enums | 059d71b | 2026-01-31 |
| API-02: Add Zod validation for assessment list and clone endpoints | 47ce630 | 2026-01-31 |
| API-03: Create standardsService.ts | a529bbc | 2026-01-31 |
| API-04: Create standardsController.ts | e79183b | 2026-01-31 |
| API-05: Add routes/standardsRoutes.ts | 4a473ab | 2026-01-31 |
| API-06: Implement csvImportService.ts with import endpoint | 3dbd964 | 2026-01-31 |
| API-07: Create responseService.ts for assessment responses | 9525259 | 2026-01-31 |
| API-08: Create responseController.ts with request handlers | 633174f | 2026-01-31 |
| API-09: Add response routes for assessment responses | 0215cc8 | 2026-02-01 |
| API-10: Create evidenceService.ts for file management | dc592a3 | 2026-02-01 |
| API-11: Create evidenceController.ts with request handlers | 152f58e | 2026-02-01 |
| API-12: Add evidence routes for file upload and management | 0f6873b | 2026-02-01 |
| API-13: Configure multer middleware for file uploads | d0d7931 | 2026-02-01 |
| API-14: Create nonConformityService.ts with CRUD and workflow | 04a2d9b | 2026-02-01 |
| API-15: Create nonConformityController.ts with request handlers | 3cd426e | 2026-02-01 |
| API-16: Add NCR routes for non-conformity management | a58bb47 | 2026-02-01 |
| API-17: Create correctiveActionService.ts with CRUD and workflow | 608b53e | 2026-02-01 |
| API-18: Create correctiveActionController.ts with request handlers | 3f5ba07 | 2026-02-01 |
| API-19: Add corrective action routes | 375b1ce | 2026-02-01 |
| API-20: Create dashboardService.ts with overview and trends | 25b1591 | 2026-02-01 |
| API-21: Create dashboardController.ts with request handlers | cf17ae1 | 2026-02-01 |
| API-22: Add dashboard routes | eaa763c | 2026-02-01 |
| API-23: Create userService.ts with user management methods | 349bbe7 | 2026-02-01 |
| API-24: Create userController.ts with request handlers | a6a362a | 2026-02-01 |
| API-25: Add user routes | 5f1bff1 | 2026-02-01 |
| UI-01: Update login page with toast notifications | aac46d2 | 2026-02-01 |
| UI-02: Create registration page at /register | 6ad2c67 | 2026-02-01 |
| UI-03: Add toast notification system (completed in UI-01) | aac46d2 | 2026-02-01 |
| UI-04: Add auth error handling with user-friendly messages | 052c8db | 2026-02-01 |
| UI-05: Create responsive mobile menu | 5a897af | 2026-02-01 |
| UI-06: Add notifications dropdown in header | 34e777a | 2026-02-01 |
| UI-07: Connect dashboard to real API | 4469ccd | 2026-02-01 |
| UI-08: Add loading skeletons for dashboard | 3eb8596 | 2026-02-01 |
| UI-09: Add empty states for dashboard | def16c5 | 2026-02-01 |
| UI-10: Connect assessments list to API | 7ab77ac | 2026-02-01 |
| UI-11: Add status filter dropdown with URL sync | 9bf7102 | 2026-02-01 |
| UI-12: Add debounced search input for assessments | 6721d1f | 2026-02-01 |
| UI-13: Add pagination controls for assessments list | 31a0372 | 2026-02-01 |
| UI-14: Add column sorting for assessments list | 162180c | 2026-02-01 |
| UI-15: Create /assessments/new page | d7801ad | 2026-02-01 |
| UI-16: Add template selection dropdown | f9abb58 | 2026-02-01 |
| UI-17: Add team member assignment | 33d2105 | 2026-02-01 |
| UI-18: Create /assessments/[id] detail page | 15f1766 | 2026-02-01 |
| UI-19: Add section navigator sidebar | 2fbdc0e | 2026-02-01 |
| UI-20: Create section score summary panel | b610c62 | 2026-02-01 |
| UI-21: Create QuestionCard component | 4e5ffa7 | 2026-02-01 |
| UI-22: Add justification textarea to QuestionCard | d01ab76 | 2026-02-01 |
| UI-23: Create EvidenceUpload component | ac3fa3e | 2026-02-01 |
| UI-24: Add EvidenceList component | a882dba | 2026-02-01 |
| UI-25: Implement auto-save for assessment responses | 04c719b | 2026-02-01 |
| UI-26: Add section progress indicator | 416daef | 2026-02-01 |
| UI-27: Add section navigation with tabs and prev/next | 337e2a8 | 2026-02-01 |
| UI-28: Create /non-conformities page with filters | 0b83b38 | 2026-02-01 |
| UI-29: Create /non-conformities/[id] detail page | 088ecd0 | 2026-02-01 |
| UI-30: Add root cause form (included in UI-29) | 088ecd0 | 2026-02-01 |
| UI-31: Create NCR status workflow buttons | 0be4d3f | 2026-02-01 |
| UI-32: Create corrective action list within NCR detail | 45184c4 | 2026-02-01 |
| UI-33: Create action form modal | bea8eee | 2026-02-01 |
| UI-34: Add action status update dropdown | 2dce442 | 2026-02-01 |
| UI-35: Create verification form modal | 8ab28d7 | 2026-02-01 |
| UI-36: Create /standards page with collapsible tree view | 953349e | 2026-02-01 |
| UI-37: Create section detail panel with questions display | 427f5f3 | 2026-02-01 |
| UI-38: Add CSV import modal for standards page | 4791460 | 2026-02-01 |
| UI-39: Create /admin/users page with user management | c87d5ce | 2026-02-01 |
| UI-40: Create user edit modal for admin users page | 5d5da86 | 2026-02-01 |
| UI-41: Add role change confirmation dialog | bdbc55d | 2026-02-01 |
| UI-42: Add user activate/deactivate toggle | 9c6d673 | 2026-02-01 |
| UI-43: Create /settings page with user profile card | 872040f | 2026-02-01 |
| UI-44: Add password change form | 97368a9 | 2026-02-01 |
| REPORT-01: Install pdfkit and create reportService.ts | 3517aa6 | 2026-02-01 |
| REPORT-02: Design assessment report template with visual gauge | a72a840 | 2026-02-01 |
| REPORT-03: Add GET /api/assessments/:id/report endpoint | ab368b1 | 2026-02-01 |
| UI-45: Add Generate Report button on assessment detail | dbc6aa1 | 2026-02-01 |
| UI-46: Implement PDF download (included in UI-45) | dbc6aa1 | 2026-02-01 |

---

## Task Dependencies

```
Phase 1 (DB Schema)
    ↓
Phase 2 (Backend API)
    ↓
    ├──→ Phase 3 (Auth & Layout) ──→ Phase 4 (Dashboard)
    │                                       ↓
    ├──→ Phase 5 (Assessments) ←───────────┘
    │
    ├──→ Phase 6 (NCRs & Actions)
    │
    └──→ Phase 7 (Standards & Settings)
              ↓
         Phase 8 (Reports)
              ↓
         Phase 9 (Polish)
              ↓
         Phase 10 (Testing) ← Optional
              ↓
         Phase 11 (Deploy)

Critical Path:
- DB-01 to DB-12 must complete before any API tasks
- Seed tasks (DB-13 to DB-15) depend on DB-12
- API-01 and API-02 must complete before other API tasks
- UI tasks depend on corresponding API endpoints being available
```

---

## Notes

- **SQLite vs PostgreSQL**: Using SQLite for development. Switch to PostgreSQL before production (DEPLOY-01).
- **Evidence Storage**: MVP uses local `/uploads` folder. Consider S3/Azure Blob for production.
- **PDF Reports**: Using pdfkit for simplicity. Switch to puppeteer if HTML templates needed.
- **Testing Priority**: If time-limited, focus on auth flow and assessment scoring tests.
- **Schema Mismatch**: The existing `assessmentService.ts` will throw TypeScript errors until Phase 1 (DB-01 to DB-12) is complete.
- **Role Enum**: Currently using string type for role. Phase 1 adds proper UserRole enum.

---

## Task Summary by Phase

| Phase | Description | Tasks | Status |
|-------|-------------|-------|--------|
| 1 | Database Schema Completion | 15 | Not Started |
| 2 | Backend API | 25 | Not Started |
| 3 | Auth & Core Layout | 6 | Not Started |
| 4 | Dashboard | 3 | Not Started |
| 5 | Assessments | 18 | Not Started |
| 6 | Non-Conformities & Actions | 8 | Not Started |
| 7 | Standards & Settings | 9 | Not Started |
| 8 | Reports & Export | 7 | Not Started |
| 9 | Polish & Error Handling | 5 | Not Started |
| 10 | Testing (Optional) | 6 | Not Started |
| 11 | Deployment | 6 | Not Started |
| **Total** | | **88** | |
