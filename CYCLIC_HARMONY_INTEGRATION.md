# Cyclic Harmony Design System - Integration Guide

## Overview

The Cyclic Harmony design system has been successfully integrated into your ISO 9001 Self-Assessment application. This guide will help you use and extend the new design components.

## What's Been Created

### 1. Core Components (`frontend/src/components/cyclic-harmony/`)

- **CrownedCard.tsx** - Base card component with semi-circle arc crown
- **ProcessStageCard.tsx** - ISO section display as process stage
- **ProgressConnector.tsx** - Dotted arc connectors between stages
- **QuestionCard.tsx** - Audit question with scoring interface
- **SectionFlowNavigation.tsx** - Horizontal scrollable section navigator
- **NavigationButtons.tsx** - Previous/Next section navigation
- **SaveStatusBadge.tsx** - Auto-save status indicator
- **index.ts** - Barrel export for easy imports

### 2. Updated Tailwind Configuration

**File**: `frontend/tailwind.config.ts`

New additions:
- Harmony color palette (sage, olive, forest, lime, neutrals)
- Custom border radius (`crown`, `crown-lg`)
- Custom shadows (`crown`, `crown-hover`, `crown-active`)
- Animations (`lift`, `scale-subtle`, `fade-in`, `slide-up`, `progress-flow`)
- Typography extensions (generous line heights)

### 3. New Pages

#### Audit Page with Cyclic Harmony
**Route**: `/assessments/[id]/audit-harmony`
**File**: `frontend/src/app/(dashboard)/assessments/[id]/audit-harmony/page.tsx`

Complete redesigned audit execution flow featuring:
- Horizontal section flow navigation
- Crowned question cards
- Auto-save status badge
- Progressive disclosure through sections
- Green gradient progression indicators

#### Design Showcase
**Route**: `/design-showcase`
**File**: `frontend/src/app/(dashboard)/design-showcase/page.tsx`

Interactive showcase of all Cyclic Harmony components with examples.

### 4. Utilities

**File**: `frontend/src/lib/utils.ts`

The `cn()` utility function for merging Tailwind classes with proper conflict resolution.

## Installation Steps

### 1. Install Dependencies

```bash
cd frontend
npm install
```

This will install the new `tailwind-merge` dependency.

### 2. Build Tailwind CSS

The new Tailwind configuration includes custom colors, animations, and utilities. Rebuild the CSS:

```bash
npm run dev
```

## Usage Guide

### Basic Import

```tsx
import {
  CrownedCard,
  ProcessStageCard,
  QuestionCard,
  SectionFlowNavigation,
  NavigationButtons,
  SaveStatusBadge,
  ProgressConnector,
} from '@/components/cyclic-harmony';
```

### Quick Start Examples

#### 1. Simple Crowned Card

```tsx
<CrownedCard crownColor="sage">
  <h3 className="font-display font-bold text-xl text-harmony-dark-text mb-2">
    Card Title
  </h3>
  <p className="text-gray-600 leading-generous">
    Card content with generous line height and breathing space.
  </p>
</CrownedCard>
```

#### 2. Process Flow

```tsx
const sections = [
  {
    id: '1',
    title: 'Context',
    icon: FolderTree,
    sectionNumber: '4',
    progress: 100,
    totalQuestions: 12,
    answeredQuestions: 12,
  },
  // ...more sections
];

<SectionFlowNavigation
  sections={sections}
  activeSectionId={activeId}
  onSectionChange={setActiveId}
/>
```

#### 3. Question Card

```tsx
<QuestionCard
  questionNumber="4.1.1"
  questionText="Does the organization determine external issues?"
  guidance="Consider PESTLE analysis..."
  score={score}
  justification={justification}
  onScoreChange={setScore}
  onJustificationChange={setJustification}
/>
```

## Migration from Existing UI

### Option 1: Use New Audit Route (Recommended)

The simplest approach is to use the new audit-harmony route alongside your existing audit page:

1. **Keep existing route**: `/assessments/[id]/audit`
2. **New Cyclic Harmony route**: `/assessments/[id]/audit-harmony`
3. **Let users choose** which interface they prefer

Update the "Start Audit" button in the assessment detail page:

```tsx
// In frontend/src/app/(dashboard)/assessments/[id]/page.tsx
<Link href={`/assessments/${assessmentId}/audit-harmony`}>
  <Button>
    <PlayCircle className="mr-2 h-4 w-4" />
    Start Audit (Cyclic Harmony)
  </Button>
</Link>
```

### Option 2: Gradually Migrate Components

Replace components one at a time:

#### Step 1: Replace Assessment Cards
```tsx
// Before
<Card>
  <CardContent>...</CardContent>
</Card>

// After
<CrownedCard crownColor="sage">
  ...
</CrownedCard>
```

#### Step 2: Update Section Navigation
Replace tab-based navigation with `SectionFlowNavigation`.

#### Step 3: Enhance Question Display
Replace current question cards with `QuestionCard` component.

## Customization

### Changing Colors

Edit `frontend/tailwind.config.ts`:

```typescript
harmony: {
  sage: '#YOUR_COLOR',    // Light green
  olive: '#YOUR_COLOR',   // Medium green
  forest: '#YOUR_COLOR',  // Dark green
  lime: '#YOUR_COLOR',    // Accent green
  // ...
}
```

### Adjusting Crown Height

The crown height is customizable per card:

```tsx
<CrownedCard crownHeight={30}> {/* 30% of card width */}
  ...
</CrownedCard>
```

Default: 45%
Recommended range: 20-60%

### Creating Custom Crowned Components

Use `CrownedCard` as a base:

```tsx
export function CustomCrownedComponent({ children }) {
  return (
    <CrownedCard
      crownColor="olive"
      interactive
      className="custom-class"
    >
      <div className="p-8">
        {children}
      </div>
    </CrownedCard>
  );
}
```

## Testing the Integration

### 1. View Design Showcase

Navigate to `/design-showcase` to see all components in action.

### 2. Test Audit Flow

1. Go to an assessment detail page
2. Click "Start Audit (Cyclic Harmony)"
3. Navigate through sections using the horizontal flow
4. Answer questions with the crowned question cards
5. Observe auto-save status updates

### 3. Check Responsive Behavior

Test on different screen sizes:
- Desktop (1920px+): Full horizontal flow
- Tablet (768-1024px): Scrollable flow with arrows
- Mobile (320-767px): Vertical stacking

## Color Usage Guidelines

### Progression States

Use green gradients to show advancement:

```tsx
// Pending/Initial
<CrownedCard crownColor="sage">

// In Progress
<CrownedCard crownColor="lime">

// Active/Current
<CrownedCard crownColor="olive">

// Completed
<CrownedCard crownColor="forest">

// Highlighted/Special
<CrownedCard crownColor="gradient">
```

### Score-Based Colors

Question cards auto-adjust crown color based on score:
- Score 1 (Non-compliant): Sage crown
- Score 2 (Partially compliant): Lime crown
- Score 3 (Fully compliant): Forest crown

## Animations

### Built-in Animations

```tsx
// Fade in on mount
<div className="animate-fade-in">

// Slide up on mount
<div className="animate-slide-up">

// Staggered reveals
{items.map((item, i) => (
  <div
    key={item.id}
    className="animate-slide-up"
    style={{ animationDelay: `${i * 100}ms` }}
  >
    <Component {...item} />
  </div>
))}
```

### Interactive Animations

Hover states are built into components:
- `ProcessStageCard`: Lift and shadow deepen
- `NavigationButtons`: Directional translate
- `QuestionCard` score buttons: Scale and shadow

## Accessibility

All components include:
- Proper ARIA labels
- Keyboard navigation support
- Focus visible states
- Color contrast meeting WCAG AA
- Screen reader compatible markup

Test with:
- Tab navigation
- Screen readers (NVDA, JAWS, VoiceOver)
- Keyboard-only interaction

## Performance Considerations

### Lazy Loading

For large section lists, consider lazy loading:

```tsx
import dynamic from 'next/dynamic';

const SectionFlowNavigation = dynamic(
  () => import('@/components/cyclic-harmony').then(mod => mod.SectionFlowNavigation),
  { ssr: false }
);
```

### Virtualization

If you have 100+ sections, consider using react-window or similar:

```tsx
import { FixedSizeList } from 'react-window';

// Wrap ProcessStageCards in virtualized list
```

## Browser Support

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires support for:
- CSS Grid
- CSS Custom Properties
- `clip-path`
- CSS Animations
- ES2020 features

## Troubleshooting

### Colors Not Showing

1. Ensure Tailwind is rebuilding CSS: `npm run dev`
2. Check `tailwind.config.ts` is properly extended
3. Verify `@tailwind` directives in your global CSS

### Components Not Found

```bash
# Ensure all files are created
ls frontend/src/components/cyclic-harmony/

# Should show:
# CrownedCard.tsx
# ProcessStageCard.tsx
# ProgressConnector.tsx
# QuestionCard.tsx
# SectionFlowNavigation.tsx
# NavigationButtons.tsx
# SaveStatusBadge.tsx
# index.ts
# README.md
```

### TypeScript Errors

```bash
# Rebuild TypeScript
npm run build

# Check for missing types
npx tsc --noEmit
```

### Crown Shape Not Rendering

The crown uses `clip-path` which requires modern browsers. Check browser support or provide fallback:

```tsx
// Add fallback for older browsers
<div className="rounded-t-3xl bg-harmony-sage" />
```

## Next Steps

### Recommended Enhancements

1. **Add More Icons**: Map specific ISO sections to unique icons
2. **Create Templates**: Build assessment templates using Cyclic Harmony
3. **Dashboard Integration**: Apply crowned cards to dashboard widgets
4. **Report Styling**: Use harmony colors in PDF reports
5. **Settings Pages**: Redesign with crowned cards

### Future Components to Build

- **HarmonyModal**: Modal dialogs with crowned top
- **HarmonyTabs**: Tab navigation with green progression
- **HarmonyTimeline**: Vertical timeline with crowned milestones
- **HarmonyMetric**: KPI cards with crowned design
- **HarmonyForm**: Multi-step forms with section flow

## Resources

- **Component Documentation**: `frontend/src/components/cyclic-harmony/README.md`
- **Design Showcase**: Navigate to `/design-showcase` in the app
- **Example Implementation**: `frontend/src/app/(dashboard)/assessments/[id]/audit-harmony/page.tsx`
- **Tailwind Config**: `frontend/tailwind.config.ts`

## Support

For questions or issues:
1. Check the component README
2. Review the design showcase page
3. Examine the example audit-harmony page
4. Refer to the original design philosophy document

## Summary

The Cyclic Harmony design system is now fully integrated and ready to use. Key benefits:

✅ Calm, flowing user experience
✅ Visual progression through green gradients
✅ Distinctive crowned card design
✅ Production-ready TypeScript components
✅ Full accessibility support
✅ Responsive and performant
✅ Easy to customize and extend

Start by viewing the design showcase at `/design-showcase`, then try the new audit flow at `/assessments/[id]/audit-harmony`.

Enjoy your new harmonious interface! 🌿
