# ISO 9001 Self-Assessment & Audit Management Application

A comprehensive web application for conducting ISO 9001:2015 Quality Management System (QMS) self-assessments and audits.

---

## What is This Platform?

This application helps organizations achieve and maintain ISO 9001:2015 certification by providing a structured approach to:

- **Self-Assessment**: Evaluate your organization's compliance with ISO 9001:2015 requirements
- **Audit Management**: Plan, conduct, and track internal and external audits
- **Non-Conformity Tracking**: Identify gaps and manage corrective actions
- **Continuous Improvement**: Monitor trends and drive quality improvements over time

Whether you're preparing for certification, conducting surveillance audits, or maintaining your QMS, this platform streamlines the entire process.

---

## Who is This For?

| Role | What You Can Do |
|------|-----------------|
| **System Administrator** | Full system access, manage users, configure settings |
| **Quality Manager** | Create assessments, assign auditors, generate reports, oversee the entire QMS |
| **Internal Auditor** | Conduct assessments, score requirements, document findings and evidence |
| **Department Head** | View your department's sections, respond to findings, track improvements |
| **Viewer** | Read-only access to assessments and reports |

---

## How to Use the Platform

### Getting Started

1. **Login**: Navigate to the application and sign in with your credentials
2. **Dashboard**: After login, you'll land on the Dashboard - your central hub for QMS insights

### Navigation Guide

The sidebar menu provides access to all features:

| Menu Item | Purpose |
|-----------|---------|
| **Dashboard** | View overall compliance score, trends, open actions, and upcoming audits |
| **Assessments** | Create, manage, and conduct ISO 9001 self-assessments |
| **Non-Conformities** | Track and manage gaps identified during assessments |
| **Actions** | Manage corrective and preventive actions |
| **Reports** | Generate PDF reports and view compliance analytics |
| **Standards** | View ISO 9001 sections and audit questions |

*Administrators also see:*
| **Users** | Manage user accounts and permissions |
| **Settings** | Configure system-wide settings |

### Conducting an Assessment

1. **Create Assessment**: Click "New Assessment" from the Dashboard or Assessments page
2. **Configure Details**: Set the assessment title, type (internal/external), scheduled date, and assign a lead auditor
3. **Answer Questions**: Work through each ISO 9001 section and score each requirement:
   - **Score 1 (Red)**: Non-compliant - requirement is not met
   - **Score 2 (Yellow)**: Partially compliant - requirement is partially met
   - **Score 3 (Green)**: Fully compliant - requirement is fully met
4. **Add Evidence**: Attach documents, notes, or observations to support your scores
5. **Auto-Save**: Your progress is automatically saved every 30 seconds
6. **Complete**: When finished, submit the assessment for review

### Understanding the Dashboard

The Dashboard provides at-a-glance insights:

- **Overall Compliance Score**: Your current compliance percentage with trend indicator
- **Section Breakdown**: Bar and radar charts showing compliance by ISO 9001 section
- **Open Actions**: Number of pending corrective actions (with overdue count)
- **Active Non-Conformities**: Current gaps requiring attention
- **Compliance Trend**: Historical view of your compliance journey
- **Priority Actions**: Critical items requiring immediate attention
- **Upcoming Audits**: Scheduled internal and external audits

### Managing Non-Conformities

When you score a requirement as 1 or 2, a non-conformity is automatically created. To manage them:

1. Navigate to **Non-Conformities** in the sidebar
2. View all open, in-progress, and closed non-conformities
3. Click on any item to:
   - Assign responsibility
   - Set target completion dates
   - Document root cause analysis (5 Whys, Fishbone)
   - Track corrective actions through completion and verification

### Generating Reports

1. Navigate to **Reports** in the sidebar
2. Select report type:
   - Assessment summary
   - Compliance trends
   - Section comparison
   - Executive summary
3. Choose date range and filters
4. Generate PDF or view interactive charts

---

## Project Structure

```
iso9001-audit-management/
├── backend/                 # Express.js API server
│   ├── prisma/             # Database schema and migrations
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Request handlers
│   │   ├── proxy/          # Auth, validation, error handling proxies
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   └── package.json
├── frontend/               # Next.js web application
│   ├── src/
│   │   ├── app/           # Next.js App Router pages
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities, API client, store
│   │   ├── services/      # API service functions
│   │   └── types/         # TypeScript types
│   └── package.json
├── shared/                 # Shared types and utilities
│   └── types/
└── package.json           # Root workspace configuration
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- PostgreSQL database
- Docker Desktop (optional, for running PostgreSQL via Docker)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   # Edit backend/.env with your database credentials and secrets

   # Frontend
   cp frontend/.env.example frontend/.env.local
   ```

4. Set up the database:
   ```bash
   # Note: Run these commands from the project ROOT directory
   npm run db:generate --workspace=backend
   npm run db:migrate --workspace=backend
   npm run db:seed --workspace=backend
   
   # Or run directly from backend directory without --workspace flag:
   cd backend
   npm run db:generate
   npm run db:migrate
   npm run db:seed
   ```

    **Optional: Run PostgreSQL with Docker** (recommended for local dev)
    ```bash
    docker run --name iso9001-postgres \
       -e POSTGRES_USER=postgres \
       -e POSTGRES_PASSWORD=postgres123 \
       -e POSTGRES_DB=iso9001_audit \
       -p 5433:5432 -d postgres:16-alpine
    ```
    Update `backend/.env`:
    ```bash
    DATABASE_URL="postgresql://postgres:postgres123@localhost:5433/iso9001_audit?schema=public"
    ```

5. Start development servers:
   ```bash
   npm run dev
   ```

   This starts:
   - Backend API: http://localhost:3001
   - Frontend: http://localhost:3000

## Features

### Core Functionality
- **Assessment Management**: Create, manage, and track ISO 9001 assessments
- **3-Tier Scoring**: Non-compliant (1), Partially compliant (2), Fully compliant (3)
- **Auto-save**: Responses are automatically saved every 30 seconds
- **Progress Tracking**: Visual progress indicators for assessments

### Dashboard
- Overall compliance score with trend indicators
- Section-by-section compliance breakdown
- Recent assessments and upcoming audits
- Priority action items

### Scoring & Analysis
- Color-coded scoring buttons (Red/Yellow/Green)
- Hover tooltips with scoring criteria
- Automatic score calculation by section and overall
- Trend analysis across multiple assessments

### Non-Conformity Management
- Automatic capture of non-conformities (scores of 1 or 2)
- Corrective action tracking
- Root cause analysis tools (5 Whys, Fishbone)
- Status workflow (Open → In Progress → Completed → Verified)

### Reporting
- PDF report generation
- Compliance trend charts
- Section comparison over time
- Executive summaries

## Tech Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens
- **Validation**: Zod schema validation

### Frontend
- **Framework**: Next.js 14 with App Router
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user
- `POST /api/auth/change-password` - Change password

### Assessments
- `GET /api/assessments` - List assessments
- `POST /api/assessments` - Create assessment
- `GET /api/assessments/:id` - Get assessment details
- `PUT /api/assessments/:id` - Update assessment
- `DELETE /api/assessments/:id` - Archive assessment
- `POST /api/assessments/:id/calculate-scores` - Calculate scores
- `POST /api/assessments/:id/clone` - Clone assessment

### Standards
- `GET /api/standards/sections` - Get ISO sections
- `GET /api/standards/questions` - Get audit questions
- `POST /api/standards/import` - Import from CSV

## User Roles

- **System Administrator**: Full access, user management
- **Quality Manager**: Create assessments, manage auditors, reports
- **Internal Auditor**: Conduct assessments, document findings
- **Department Head**: View sections, respond to findings
- **Viewer**: Read-only access

## CSV Import Format

The application supports importing ISO 9001 questions from CSV with the following columns:

| Column | Description |
|--------|-------------|
| standardReference | Section number (e.g., 4.1, 4.2) |
| standardText | Full requirement text |
| auditQuestion | The audit question |
| score1Criteria | Non-compliant criteria |
| score2Criteria | Partially compliant criteria |
| score3Criteria | Fully compliant criteria |
| referenceDocuments | Related documents (optional) |
| guidance | Auditor guidance (optional) |

## License

Private - All rights reserved
