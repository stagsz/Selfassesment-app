# Template-Based Assessment Areas - Implementation Guide

## Overview

The ISO 9001 Self-Assessment application now supports **shorter, focused assessments** through template-based section selection. Instead of always conducting full 73-section assessments, users can choose from predefined templates that cover specific areas of ISO 9001:2015.

## What Was Implemented

### 1. Database Schema Changes

**File**: `backend/prisma/schema.prisma`

Added two new fields to the `AssessmentTemplate` model:
- `includedClauses` (Json): Array of ISO clause numbers (e.g., ["4", "5", "8"])
- `includedSections` (Json): Array of specific section IDs for granular control

```prisma
model AssessmentTemplate {
  // ... existing fields ...
  includedClauses  Json?  // Array of clause numbers
  includedSections Json?  // Array of specific section IDs
  // ... existing fields ...
}
```

**Migration**: Schema has been updated. Run `npm run db:push --workspace=backend` to apply changes.

### 2. Predefined Templates

**File**: `backend/prisma/seed/templates.ts`

Created 6 predefined assessment templates:

| Template | Clauses | Est. Sections | Use Case |
|----------|---------|---------------|----------|
| **Full ISO 9001:2015 Assessment** | All (4-10) | 73 sections | Certification audits, complete QMS reviews |
| **Quick Check Assessment** | All | ~20 sections | Quarterly reviews, management meetings |
| **Leadership & Planning Focus** | 5, 6 | ~15 sections | Management reviews, strategic planning |
| **Operations & Delivery Focus** | 8 | ~15 sections | Process audits, production reviews |
| **Documentation & Support Review** | 7 | ~12 sections | Documentation reviews, training assessments |
| **Strategic Planning Assessment** | 4, 6, 9, 10 | ~18 sections | Annual strategic reviews |

### 3. Backend Services

#### Template Service Updates
**File**: `backend/src/services/templateService.ts`

- Added `includedClauses` and `includedSections` to response data
- Parses JSON fields from database

#### Standards Service Updates
**File**: `backend/src/services/standardsService.ts`

- Added `getSections()` optional parameters for filtering
- Implemented `filterByClauseNumbers()` to filter sections by clause
- Maintains hierarchical tree structure after filtering

#### Standards Controller Updates
**File**: `backend/src/controllers/standardsController.ts`

- Added optional query parameters: `assessmentId`, `templateId`
- Fetches template data and applies filtering
- Returns filtered section tree

**API Endpoint**:
```
GET /api/standards/sections?assessmentId={id}
GET /api/standards/sections?templateId={id}
```

### 4. Frontend Changes

#### API Client
**File**: `frontend/src/lib/api.ts`

Updated `standardsApi.getSections()` to accept parameters:
```typescript
getSections: (params?: { assessmentId?: string; templateId?: string })
```

#### Hooks
**File**: `frontend/src/hooks/useStandards.ts`

Updated `useSections()` hook to accept filtering options:
```typescript
useSections({ assessmentId: 'xxx' })
```

#### Assessment Creation Form
**File**: `frontend/src/app/(dashboard)/assessments/new/page.tsx`

- Added template description display
- Shows scope information for selected template
- Visual feedback with template details

#### Audit Execution Page
**File**: `frontend/src/app/(dashboard)/assessments/[id]/audit/page.tsx`

- Automatically filters sections based on assessment's template
- Only shows relevant sections during audit execution

## How It Works

### User Flow

1. **Create Assessment**:
   - User navigates to "New Assessment"
   - Selects a template (e.g., "Leadership & Planning Focus")
   - Template description and scope are displayed
   - Assessment is created with template reference

2. **Execute Audit**:
   - User opens the assessment for audit
   - System fetches assessment's template
   - Only sections matching template's `includedClauses` are displayed
   - User completes only the relevant sections

3. **Shorter Audit**:
   - Instead of 73 sections, user audits 10-20 sections
   - Focused on specific area (e.g., Leadership, Operations)
   - Faster completion, more targeted assessments

### Filtering Logic

**By Clauses** (Primary Method):
```typescript
// Template: includedClauses = ["5", "6"]
// Result: All sections starting with "5" or "6"
// Examples: 5, 5.1, 5.1.1, 5.1.2, 5.2, 5.2.1, 5.2.2, 5.3, 6, 6.1, 6.2, 6.3
```

**By Section IDs** (Granular Control):
```typescript
// Template: includedSections = ["uuid1", "uuid2", "uuid3"]
// Result: Only those specific sections
```

**Full Assessment**:
```typescript
// Template: includedClauses = null, includedSections = null
// Result: All 73 sections
```

## Database Seeding

**Run the seed**:
```bash
cd backend
npm run db:seed
```

This will create:
- 6 predefined templates
- Sample assessment with "Full ISO 9001:2015 Assessment" template
- Sample users and data

**Test Accounts**:
- Admin: `admin@example.com` / `admin123`
- Quality Manager: `quality.manager@example.com` / `quality123`
- Internal Auditor: `auditor@example.com` / `auditor123`

## Testing the Feature

### Manual Testing Steps

1. **Start the application**:
   ```bash
   npm run dev
   ```

2. **Login** as Quality Manager

3. **View Templates**:
   - Navigate to "New Assessment"
   - Click template dropdown
   - Observe 6 different templates

4. **Select "Leadership & Planning Focus"**:
   - See template description
   - See scope: "ISO 9001:2015 Clauses 5, 6"
   - Create assessment

5. **Start Audit**:
   - Open the created assessment
   - Click "Start Audit"
   - Observe only Leadership (5) and Planning (6) sections appear
   - Instead of 73 sections, you see ~15 sections

6. **Compare with Full Assessment**:
   - Create new assessment with "Full ISO 9001:2015 Assessment"
   - Start audit
   - Observe all 73 sections appear

### API Testing

**Test section filtering**:
```bash
# Get all sections (no filter)
curl http://localhost:5000/api/standards/sections

# Get sections for specific assessment (filtered)
curl http://localhost:5000/api/standards/sections?assessmentId={id}

# Get sections for specific template (filtered)
curl http://localhost:5000/api/standards/sections?templateId={id}
```

## Future Enhancements

### Possible Improvements

1. **Custom Template Builder**:
   - UI for admins to create custom templates
   - Drag-and-drop section selection
   - Save as organization-specific templates

2. **Section Count Display**:
   - Calculate and display actual section count for each template
   - Show before creating assessment
   - Help users estimate audit duration

3. **Template Analytics**:
   - Track which templates are used most
   - Average completion time by template
   - Compliance scores by template type

4. **Clone and Customize**:
   - Allow users to clone existing templates
   - Modify section selection
   - Save as new template

5. **Department-Specific Templates**:
   - Create templates for specific departments
   - E.g., "HR Focus", "Production Focus", "Quality Focus"
   - Assign to department heads automatically

## Technical Notes

### Performance Considerations

- **Filtering is done server-side**: Reduces data transfer for large assessments
- **Tree structure maintained**: Parent-child relationships preserved after filtering
- **Cached queries**: Frontend uses TanStack Query for caching

### Data Integrity

- **Foreign key constraints**: Template deletion doesn't affect existing assessments
- **Null handling**: Missing template = full assessment (backwards compatible)
- **JSON validation**: Array types validated in service layer

### Backwards Compatibility

- **Existing assessments**: Continue to work with all 73 sections
- **No migration needed**: Existing templates automatically default to full assessment
- **Optional feature**: Users can still create assessments without templates

## Troubleshooting

### Templates Not Showing
**Problem**: Template dropdown is empty
**Solution**:
```bash
cd backend
npm run db:seed
```

### Sections Not Filtering
**Problem**: All 73 sections still appear during audit
**Solution**:
- Check assessment has a template assigned
- Verify template has `includedClauses` set
- Clear browser cache and reload

### Template Description Not Showing
**Problem**: Selected template info not displayed
**Solution**:
- Ensure frontend includes new template fields
- Check browser console for errors
- Verify API returns `includedClauses` and `includedSections`

## Summary

The Template-Based Assessment Areas feature enables:
- ✅ Shorter, focused assessments (10-20 sections vs 73)
- ✅ Faster audit completion
- ✅ Targeted reviews (Leadership, Operations, etc.)
- ✅ Flexible assessment planning
- ✅ Quarterly quick checks
- ✅ Department-specific audits

Users can now conduct efficient, focused assessments while maintaining the option for comprehensive full audits when needed.
