# Contributing Guide

This document explains how to contribute new ideas and features to the ISO 9001 Self-Assessment platform.

## Project Documentation Structure

| File | Purpose | When to Update |
|------|---------|----------------|
| `PRD.json` | Product Requirements - WHAT to build | New feature ideas, user needs |
| `IMPLEMENTATION_PLAN.md` | Task Breakdown - HOW to build | Converting features to tasks |
| `CLAUDE.md` | Technical Context - Project details | Architecture changes, new patterns |

---

## Adding New Features

### Step 1: Document the Idea in PRD.json

Add your feature to the `features.future` array:

```json
{
  "id": "F14",
  "name": "Feature Name",
  "description": "Clear description of what it does and why users need it"
}
```

**Feature ID Convention:**
- F1-F9: Core features (MVP)
- F10+: Future features

### Step 2: Create Tasks in IMPLEMENTATION_PLAN.md

Once a feature is approved for development:

1. Move it from `features.future` to `features.core` in PRD.json
2. Break it down into tasks in IMPLEMENTATION_PLAN.md

**Task Sizing Guidelines:**

| Size | Example | Action |
|------|---------|--------|
| Good (1-2 hrs) | "Create users table with email, password_hash, role columns" | Keep as-is |
| Too big | "Implement authentication" | Split into 8-10 tasks |
| Too small | "Add id column" | Combine with related work |

**Task ID Prefixes:**

| Prefix | Category | Example |
|--------|----------|---------|
| `SETUP-` | Project setup | `SETUP-01: Initialize monorepo` |
| `DB-` | Database/Schema | `DB-01: Add User model` |
| `API-` | Backend endpoints | `API-01: Create login endpoint` |
| `UI-` | Frontend components | `UI-01: Create LoginForm` |
| `AUTH-` | Authentication | `AUTH-01: Add JWT middleware` |
| `TEST-` | Testing | `TEST-01: Write auth tests` |
| `POLISH-` | UX improvements | `POLISH-01: Add loading states` |
| `DEPLOY-` | Deployment | `DEPLOY-01: Setup Docker` |

### Step 3: Update CLAUDE.md (if needed)

Update when you add:
- New API endpoints
- New database models
- New components or patterns
- Changed project structure

---

## Development Workflow

### Before Starting Work

1. Check `IMPLEMENTATION_PLAN.md` for the next task
2. Read the task description and dependencies
3. Review related code in `CLAUDE.md`

### While Working

1. Work on ONE task at a time
2. Keep commits focused and atomic
3. Test your changes locally

### After Completing a Task

1. Update `IMPLEMENTATION_PLAN.md`:
   - Mark task as `[x]` completed
   - Add commit hash
   - Update "Current Status" section
   - Set "Next Task"

2. Commit with descriptive message:
   ```
   feat(scope): description

   - Detail 1
   - Detail 2
   ```

---

## Quick Reference

### "I have a new feature idea"
1. Add to `PRD.json` under `features.future`
2. Include: id, name, description
3. Discuss with team before implementing

### "Ready to implement a feature"
1. Create tasks in `IMPLEMENTATION_PLAN.md`
2. Add to appropriate phase
3. Include dependencies if any

### "I found a bug"
1. Create a task with `BUG-` prefix
2. Add to current phase or create "Bug Fixes" section
3. Include steps to reproduce

### "Technical architecture changed"
1. Update `CLAUDE.md` with new patterns
2. Update relevant sections (API, Models, etc.)

---

## Running the Application

### Prerequisites
- Node.js 18+
- npm 9+

### Setup
```bash
# Install dependencies
npm install

# Setup database
cd backend
npx prisma db push
npx tsx prisma/seed.ts

# Start development servers
cd ..
npm run dev
```

### Default Login Credentials
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | admin123 |
| Quality Manager | quality.manager@example.com | quality123 |
| Internal Auditor | auditor@example.com | auditor123 |

---

## Code Style

### TypeScript
- Use strict mode
- Define interfaces for all data structures
- Use Zod for validation

### React/Next.js
- Use functional components with hooks
- Keep components small and focused
- Use Tailwind CSS for styling

### Backend
- Controllers handle HTTP requests
- Services contain business logic
- Use Prisma for database operations

---

## Questions?

Check these resources:
- `CLAUDE.md` - Technical details and project structure
- `PRD.json` - Product requirements and features
- `IMPLEMENTATION_PLAN.md` - Current progress and tasks
