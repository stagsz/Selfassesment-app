# ISO 9001 Self-Assessment & Audit Management Platform - Getting Started Guide

## What is this Platform?

This is a comprehensive web application for conducting **ISO 9001:2015 Quality Management System (QMS) self-assessments and audits**. It helps organizations:
- Track compliance with ISO 9001 standards
- Document audit findings with evidence
- Manage non-conformities and corrective actions
- Generate compliance reports
- Monitor audit progress and trends

---

## Key Features Overview

### 📊 Dashboard
- **Overall Compliance Score** - Visual gauge showing QMS compliance level (0-100%)
- **Section Breakdown** - Compliance by each ISO 9001 section
- **Recent Assessments** - Quick access to ongoing audits
- **Trend Analysis** - Historical compliance trends
- **Priority Actions** - Critical items needing attention

### ✅ Assessments
- Create new audit assessments
- Conduct audits section-by-section (73 ISO 9001 sections)
- Answer 27 audit questions per assessment
- Auto-save responses every 30 seconds
- Track progress visually
- Clone previous assessments

### 🔴 Non-Conformities (Issues)
- Automatically capture findings from failing responses
- Categorize by severity (Minor, Major, Critical)
- Document root causes using:
  - 5 Whys method
  - Fishbone diagram analysis
- Track status: Open → In Progress → Resolved → Closed
- Attach evidence files

### ✋ Corrective Actions
- Assign corrective actions to team members
- Set priority and target dates
- Track completion status
- Verify effectiveness with notes
- Link actions to non-conformities

### 📁 Standards Library
- Browse all 73 ISO 9001:2015 sections
- View detailed section descriptions
- See audit questions per section
- Import custom questions via CSV

### 📄 Reports
- Generate PDF reports with findings
- Export assessment data to CSV
- Compliance charts and visualizations
- Trend analysis reports

### 👥 Team Management
- Assign team members to audits
- Define roles (Lead Auditor, Auditor, Observer)
- Track user roles and permissions
- Manage team member activity

---

## Scoring System

Each audit question is scored on a **3-tier scale**:

| Score | Color | Meaning |
|-------|-------|---------|
| **1** | 🔴 Red | Non-compliant - Does not meet requirement |
| **2** | 🟡 Yellow | Partially compliant - Meets some aspects |
| **3** | 🟢 Green | Fully compliant - Fully meets requirement |

**Compliance % = (Total Points / Maximum Points) × 100**

---

## User Roles & Permissions

| Role | Can | Cannot |
|------|-----|--------|
| **SYSTEM_ADMIN** | Everything | (Full access) |
| **QUALITY_MANAGER** | Create assessments, manage team, generate reports | Delete assessments, manage users |
| **INTERNAL_AUDITOR** | Conduct audits, document findings | Create assessments, change roles |
| **DEPARTMENT_HEAD** | View sections, respond to findings | Conduct full audits |
| **VIEWER** | Read-only access | Make any changes |

---

## How to Use the Platform - Step by Step

### Step 1: Login
1. Go to http://localhost:3000 (or your server URL)
2. Enter your email and password
3. Click **Sign In**

### Step 2: View Dashboard
- See your **Overall Compliance Score** (large gauge on right)
- Review **Section Breakdown** showing compliance by section
- Check **Recent Assessments** and **Priority Actions**
- View **Trend Chart** showing historical progress

### Step 3: Create an Assessment
1. Click **Assessments** in the sidebar
2. Click **New Assessment** button
3. Fill in:
   - **Title** (e.g., "Q1 2026 ISO Audit")
   - **Description** (e.g., "Quarterly compliance check")
   - **Audit Type** (Internal, External, Surveillance, Certification)
   - **Scope** (which departments/processes)
   - **Objectives** (what you want to achieve)
   - **Scheduled Date** (when it starts)
   - **Due Date** (deadline)
4. Add **Team Members**:
   - Select Lead Auditor
   - Add Auditors and Observers
5. Click **Create Assessment**

### Step 4: Conduct an Audit
1. Go to **Assessments** → Find your assessment
2. Click the assessment card
3. Click **Start Audit** (or **Continue Audit** if already started)
4. You'll see:
   - **Section Navigator** (left) - Navigate 73 sections
   - **Questions** (center) - 27 audit questions
   - **Progress** (right) - Completion percentage

5. For each question:
   - Read the question and guidance
   - Select a score (1, 2, or 3)
   - Add **Justification** (why you chose this score)
   - Add **Evidence** (attach files, photos, screenshots)
   - Add **Action Proposal** (if needed)

6. Responses auto-save every 30 seconds
7. Click **Complete Audit** when done

### Step 5: Review Non-Conformities
1. Go to **Non-Conformities** in sidebar
2. View all findings across all audits
3. Click on any finding to see details:
   - **Root Cause Analysis** (5 Whys or Fishbone)
   - **Associated Evidence**
   - **Status** (Open, In Progress, Resolved, Closed)

### Step 6: Create Corrective Actions
1. In Non-Conformity details, click **Add Action**
2. Fill in:
   - **Description** (what needs to be fixed)
   - **Priority** (High, Medium, Low)
   - **Assign To** (person responsible)
   - **Target Date** (completion deadline)
3. Click **Create Action**

4. Track progress:
   - Click **Actions** in sidebar to see all
   - Update status as work progresses
   - Mark **Completed** when done
   - Click **Verify** to confirm effectiveness

### Step 7: Generate Reports
1. Go to **Assessments**
2. Click on a COMPLETED assessment
3. Click **Generate Report**
4. PDF downloads with:
   - Overall compliance score
   - Section-by-section breakdown
   - Findings summary
   - Trends over time

### Step 8: Edit Assessment Details
1. Go to **Assessments** → Select assessment
2. Click **Edit** button (top right)
3. Update:
   - Title
   - Description
   - Scope
   - Objectives
   - Dates
   - Team members
4. Click **Save Changes**

---

## Common Workflows

### Workflow 1: Complete Assessment → Find Issues → Create Actions
```
1. Create Assessment
   ↓
2. Start Audit (answer questions)
   ↓
3. Review Non-Conformities (auto-generated from scores = 1 or 2)
   ↓
4. Perform Root Cause Analysis
   ↓
5. Create Corrective Actions
   ↓
6. Assign to Team Members
   ↓
7. Track Completion
   ↓
8. Verify & Close
```

### Workflow 2: Clone Previous Assessment
```
1. Go to Assessments
   ↓
2. Find previous assessment
   ↓
3. Click "Clone" button
   ↓
4. System copies all questions & structure
   ↓
5. Update details (title, dates, team)
   ↓
6. Start new audit
```

### Workflow 3: Track Corrective Actions
```
1. Click Actions in sidebar
   ↓
2. Filter by Status or Priority
   ↓
3. Search for specific actions
   ↓
4. Click action to see full details
   ↓
5. Update progress/status
   ↓
6. Mark complete when done
```

---

## Tips & Best Practices

### ✨ Assessment Tips
- **Auto-save**: Responses save every 30 seconds automatically
- **Mobile friendly**: Can audit on phone/tablet
- **Multiple team members**: Different people can answer same questions
- **Evidence important**: Always attach supporting documents
- **Justification matters**: Explain your score clearly

### 🎯 Scoring Tips
- **Score 1 = Problem**: Creates automatic non-conformity
- **Score 2 = Partial**: Also creates non-conformity (needs attention)
- **Score 3 = Good**: No non-conformity created
- Be **consistent**: Use same criteria across all assessments
- **Document everything**: Justify every score with evidence

### 📋 Non-Conformity Tips
- **Root cause first**: Don't create actions without understanding why
- **5 Whys method**: Ask "why" 5 times to get to root cause
- **One action per cause**: Don't mix multiple issues in one action
- **Be specific**: Vague corrective actions don't fix problems
- **Verify effectiveness**: Check that actions actually solved the issue

### 📊 Reporting Tips
- **Track trends**: Compare assessments over time
- **Segment by section**: Identify problem areas
- **Share with leadership**: Use reports for management review
- **Export data**: Use CSV exports for analysis in Excel

---

## Keyboard Shortcuts & Navigation

| Action | How To |
|--------|---------|
| View Dashboard | Click home icon or "Dashboard" in sidebar |
| Create Assessment | Go to Assessments → Click blue button |
| Navigate Sections | Use left sidebar in audit, or scroll |
| Save Responses | Auto-saves (no manual save needed) |
| Find Findings | Go to Non-Conformities or Actions |
| Search | Use search bar at top of most pages |
| Filter | Use dropdown filters (status, priority, severity) |

---

## Troubleshooting

### "Connection Failed" Error
- **Cause**: Backend server not running
- **Fix**: Ensure backend is started (`npm run dev:backend`)
- **Check**: Go to http://localhost:3001/api/health

### Assessment Not Saving
- **Cause**: Network issue
- **Fix**: Check connection, try again
- **Auto-save**: Every 30 seconds (look for checkmark)

### Can't See Actions
- **Cause**: Non-conformities without actions
- **Fix**: Create corrective actions first
- **Check**: Go to Non-Conformities → select one → add action

### Role Permissions Error
- **Cause**: Your role doesn't have access
- **Fix**: Contact admin to upgrade your role
- **Check**: Settings → Profile (see your role)

---

## Next Steps

1. **Create your first assessment** (15 min)
2. **Conduct a test audit** with sample data (30 min)
3. **Review the findings** generated (10 min)
4. **Create corrective actions** (15 min)
5. **Generate a report** to see the output (5 min)
6. **Set up your team** for real assessments (10 min)

---

## Need Help?

- **In-app**: Look for question marks (?) for contextual help
- **Documentation**: See README.md for technical info
- **API**: Backend runs on http://localhost:3001/api
- **Frontend**: Frontend runs on http://localhost:3000

---

## Quick Reference - Key Pages

| Page | URL | Purpose |
|------|-----|---------|
| Dashboard | /dashboard | See overall compliance |
| Assessments | /assessments | Manage audits |
| New Assessment | /assessments/new | Create audit |
| Non-Conformities | /non-conformities | View findings |
| Actions | /actions | Track corrective actions |
| Standards | /standards | Browse ISO sections |
| Reports | /reports | Download compliance reports |
| Settings | /settings | Manage profile |
| Admin Users | /admin/users | Manage team (admin only) |

---

**Happy Auditing! 🎯**
