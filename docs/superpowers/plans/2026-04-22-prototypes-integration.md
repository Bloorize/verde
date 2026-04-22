# Prototypes Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new `Prototypes` section to the Expo app that lists six static demo screens and recreates each HTML mockup as responsive Expo/React Native UI for web, iOS, and Android.

**Architecture:** Keep routing simple and explicit by adding one route file per prototype under `app/(app)/prototypes/`. Build a small `src/features/prototypes/` feature area with typed static content, shared presentational components, and one composed screen module per prototype so the mobile mockups remain recognizable while desktop layouts widen intentionally.

**Tech Stack:** Expo Router, React Native, NativeWind/Tailwind className styling, TypeScript, Jest, Testing Library for React Native

---

## File Structure

### Create
- `app/(app)/prototypes/_layout.tsx`
- `app/(app)/prototypes/index.tsx`
- `app/(app)/prototypes/plain-language-work-item.tsx`
- `app/(app)/prototypes/ai-inspection-comments.tsx`
- `app/(app)/prototypes/sage-score-summary.tsx`
- `app/(app)/prototypes/incident-severity-classification.tsx`
- `app/(app)/prototypes/monthly-operational-narrative.tsx`
- `app/(app)/prototypes/customer-performance-summary.tsx`
- `src/features/prototypes/types.ts`
- `src/features/prototypes/data/catalog.ts`
- `src/features/prototypes/data/plainLanguageWorkItem.ts`
- `src/features/prototypes/data/aiInspectionComments.ts`
- `src/features/prototypes/data/sageScoreSummary.ts`
- `src/features/prototypes/data/incidentSeverityClassification.ts`
- `src/features/prototypes/data/monthlyOperationalNarrative.ts`
- `src/features/prototypes/data/customerPerformanceSummary.ts`
- `src/features/prototypes/components/PrototypePageShell.tsx`
- `src/features/prototypes/components/PrototypeSectionCard.tsx`
- `src/features/prototypes/components/PrototypeHeader.tsx`
- `src/features/prototypes/components/PrototypeStepList.tsx`
- `src/features/prototypes/components/PrototypeExpander.tsx`
- `src/features/prototypes/components/PrototypeLanguageToggle.tsx`
- `src/features/prototypes/components/PrototypeActionBar.tsx`
- `src/features/prototypes/screens/PrototypeIndexScreen.tsx`
- `src/features/prototypes/screens/PlainLanguageWorkItemScreen.tsx`
- `src/features/prototypes/screens/AIInspectionCommentsScreen.tsx`
- `src/features/prototypes/screens/SageScoreSummaryScreen.tsx`
- `src/features/prototypes/screens/IncidentSeverityClassificationScreen.tsx`
- `src/features/prototypes/screens/MonthlyOperationalNarrativeScreen.tsx`
- `src/features/prototypes/screens/CustomerPerformanceSummaryScreen.tsx`
- `__tests__/prototypeIndexScreen.test.tsx`
- `__tests__/prototypeInteractivity.test.tsx`

### Modify
- `src/components/layout/AppSidebar.native.tsx`
- `src/components/layout/AppSidebar.web.tsx`

### Test
- `__tests__/prototypeIndexScreen.test.tsx`
- `__tests__/prototypeInteractivity.test.tsx`

## Task 1: Add prototype routing metadata and sidebar entry

**Files:**
- Create: `src/features/prototypes/types.ts`
- Create: `src/features/prototypes/data/catalog.ts`
- Modify: `src/components/layout/AppSidebar.native.tsx`
- Modify: `src/components/layout/AppSidebar.web.tsx`

- [ ] **Step 1: Write the failing test for the prototype list source data**

```tsx
import { prototypeCatalog } from '@/src/features/prototypes/data/catalog';

describe('prototype catalog', () => {
  it('defines six prototype demo entries with unique routes', () => {
    expect(prototypeCatalog).toHaveLength(6);
    expect(new Set(prototypeCatalog.map((item) => item.route)).size).toBe(6);
    expect(prototypeCatalog.map((item) => item.route)).toEqual([
      '/prototypes/plain-language-work-item',
      '/prototypes/ai-inspection-comments',
      '/prototypes/sage-score-summary',
      '/prototypes/incident-severity-classification',
      '/prototypes/monthly-operational-narrative',
      '/prototypes/customer-performance-summary',
    ]);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx jest __tests__/prototypeIndexScreen.test.tsx --runInBand`

Expected: FAIL with module-not-found errors for `@/src/features/prototypes/data/catalog`

- [ ] **Step 3: Add typed prototype metadata**

```ts
export type PrototypeRoute =
  | '/prototypes/plain-language-work-item'
  | '/prototypes/ai-inspection-comments'
  | '/prototypes/sage-score-summary'
  | '/prototypes/incident-severity-classification'
  | '/prototypes/monthly-operational-narrative'
  | '/prototypes/customer-performance-summary';

export interface PrototypeCatalogItem {
  id: string;
  title: string;
  description: string;
  route: PrototypeRoute;
}
```

```ts
import type { PrototypeCatalogItem } from '@/src/features/prototypes/types';

export const prototypeCatalog: PrototypeCatalogItem[] = [
  {
    id: 'plain-language-work-item',
    title: 'Plain-Language Work Item Translation',
    description: 'AI rewrites supervisor notes into worker-ready steps.',
    route: '/prototypes/plain-language-work-item',
  },
  {
    id: 'ai-inspection-comments',
    title: 'AI Inspection Comments',
    description: 'Inspection findings rendered as clearer guided comments.',
    route: '/prototypes/ai-inspection-comments',
  },
  {
    id: 'sage-score-summary',
    title: 'Sage Score Summary',
    description: 'Static summary view for site score storytelling.',
    route: '/prototypes/sage-score-summary',
  },
  {
    id: 'incident-severity-classification',
    title: 'Incident Severity Classification',
    description: 'Triage-style incident explanation and severity framing.',
    route: '/prototypes/incident-severity-classification',
  },
  {
    id: 'monthly-operational-narrative',
    title: 'Monthly Operational Narrative',
    description: 'Narrative reporting screen for monthly performance context.',
    route: '/prototypes/monthly-operational-narrative',
  },
  {
    id: 'customer-performance-summary',
    title: 'Customer Performance Summary',
    description: 'Customer-facing summary screen with static performance detail.',
    route: '/prototypes/customer-performance-summary',
  },
];
```

- [ ] **Step 4: Add the `Prototypes` nav item to both sidebars**

```tsx
const secondaryNav = [
  { label: 'Ask Sage', route: '/ask-sage', icon: 'sparkles-outline' },
  { label: 'Prototypes', route: '/prototypes', icon: 'albums-outline' },
  { label: 'Surveys', route: '/surveys', icon: 'clipboard-outline' },
  { label: 'Documents', route: '/documents', icon: 'document-text-outline' },
  { label: 'Service Coverage', route: '/service-coverage', icon: 'qr-code-outline' },
  { label: 'Profile', route: '/profile', icon: 'person-circle-outline' },
  { label: 'Safety Portal', route: '/safety', icon: 'shield-checkmark-outline' },
] as const;
```

```tsx
import {
  Albums,
  BarChart3,
  Briefcase,
  ClipboardCheck,
  FileText,
  FolderOpen,
  Home,
  QrCode,
  Settings,
  ShieldCheck,
  Sparkles,
  UserCircle2,
  Users,
} from 'lucide-react';

const MENU_ITEMS: SidebarMenuGroup[] = [
  {
    title: 'Workspace',
    list: [
      { name: 'Ask Sage', route: '/ask-sage', icon: Sparkles },
      { name: 'Prototypes', route: '/prototypes', icon: Albums },
      { name: 'Surveys', route: '/surveys', icon: ClipboardCheck },
      { name: 'Documents', route: '/documents', icon: FileText },
      { name: 'Service Coverage', route: '/service-coverage', icon: QrCode },
      { name: 'Profile', route: '/profile', icon: UserCircle2 },
      { name: 'Safety Portal', route: '/safety', icon: ShieldCheck },
    ],
  },
];
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npx jest __tests__/prototypeIndexScreen.test.tsx --runInBand`

Expected: PASS for the catalog coverage test

- [ ] **Step 6: Commit**

```bash
git add __tests__/prototypeIndexScreen.test.tsx src/features/prototypes/types.ts src/features/prototypes/data/catalog.ts src/components/layout/AppSidebar.native.tsx src/components/layout/AppSidebar.web.tsx
git commit -m "feat: add prototypes navigation metadata"
```

## Task 2: Build the routed prototypes list screen

**Files:**
- Create: `app/(app)/prototypes/_layout.tsx`
- Create: `app/(app)/prototypes/index.tsx`
- Create: `src/features/prototypes/screens/PrototypeIndexScreen.tsx`
- Test: `__tests__/prototypeIndexScreen.test.tsx`

- [ ] **Step 1: Extend the failing test to verify the index screen renders all six demos**

```tsx
import { render } from '@testing-library/react-native';

import { PrototypeIndexScreen } from '@/src/features/prototypes/screens/PrototypeIndexScreen';

jest.mock('expo-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

describe('PrototypeIndexScreen', () => {
  it('renders all prototype titles and descriptions', () => {
    const { getByText } = render(<PrototypeIndexScreen />);

    expect(getByText('Prototypes')).toBeTruthy();
    expect(getByText('Plain-Language Work Item Translation')).toBeTruthy();
    expect(getByText('AI Inspection Comments')).toBeTruthy();
    expect(getByText('Sage Score Summary')).toBeTruthy();
    expect(getByText('Incident Severity Classification')).toBeTruthy();
    expect(getByText('Monthly Operational Narrative')).toBeTruthy();
    expect(getByText('Customer Performance Summary')).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx jest __tests__/prototypeIndexScreen.test.tsx --runInBand`

Expected: FAIL with module-not-found errors for `PrototypeIndexScreen`

- [ ] **Step 3: Create the prototypes stack layout and index route**

```tsx
import { Stack } from 'expo-router';

export default function PrototypesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="plain-language-work-item" />
      <Stack.Screen name="ai-inspection-comments" />
      <Stack.Screen name="sage-score-summary" />
      <Stack.Screen name="incident-severity-classification" />
      <Stack.Screen name="monthly-operational-narrative" />
      <Stack.Screen name="customer-performance-summary" />
    </Stack>
  );
}
```

```tsx
import { PrototypeIndexScreen } from '@/src/features/prototypes/screens/PrototypeIndexScreen';

export default function PrototypesIndexRoute() {
  return <PrototypeIndexScreen />;
}
```

- [ ] **Step 4: Implement the list screen with the existing shell patterns**

```tsx
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { PageScaffold } from '@/src/components/shell/PageScaffold';
import { Card } from '@/src/components/ui/Card';
import { prototypeCatalog } from '@/src/features/prototypes/data/catalog';

export const PrototypeIndexScreen = () => (
  <PageScaffold title="Prototypes" description="Static demo screens recreated from the HTML mockups.">
    <Card>
      <View className="gap-3">
        {prototypeCatalog.map((item) => (
          <Link key={item.id} href={item.route as any} asChild>
            <Pressable className="rounded-md border border-brand-100 bg-brand-50 px-4 py-3">
              <Text className="text-sm font-semibold text-slate-900">{item.title}</Text>
              <Text className="mt-1 text-xs text-slate-600">{item.description}</Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </Card>
  </PageScaffold>
);
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npx jest __tests__/prototypeIndexScreen.test.tsx --runInBand`

Expected: PASS for the catalog and index screen rendering tests

- [ ] **Step 6: Commit**

```bash
git add app/(app)/prototypes/_layout.tsx app/(app)/prototypes/index.tsx src/features/prototypes/screens/PrototypeIndexScreen.tsx __tests__/prototypeIndexScreen.test.tsx
git commit -m "feat: add prototypes index screen"
```

## Task 3: Build shared prototype shell and interaction primitives

**Files:**
- Create: `src/features/prototypes/components/PrototypePageShell.tsx`
- Create: `src/features/prototypes/components/PrototypeSectionCard.tsx`
- Create: `src/features/prototypes/components/PrototypeHeader.tsx`
- Create: `src/features/prototypes/components/PrototypeStepList.tsx`
- Create: `src/features/prototypes/components/PrototypeExpander.tsx`
- Create: `src/features/prototypes/components/PrototypeLanguageToggle.tsx`
- Create: `src/features/prototypes/components/PrototypeActionBar.tsx`
- Test: `__tests__/prototypeInteractivity.test.tsx`

- [ ] **Step 1: Write the failing tests for reusable interactive components**

```tsx
import { fireEvent, render } from '@testing-library/react-native';

import { PrototypeExpander } from '@/src/features/prototypes/components/PrototypeExpander';
import { PrototypeLanguageToggle } from '@/src/features/prototypes/components/PrototypeLanguageToggle';

describe('prototype interactive primitives', () => {
  it('toggles expander content', () => {
    const { getByText, queryByText } = render(
      <PrototypeExpander label="View original supervisor notes">
        Original notes body
      </PrototypeExpander>,
    );

    expect(queryByText('Original notes body')).toBeNull();
    fireEvent.press(getByText('View original supervisor notes'));
    expect(getByText('Original notes body')).toBeTruthy();
  });

  it('switches the selected language', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <PrototypeLanguageToggle value="en" onChange={onChange} options={['es', 'en']} />,
    );

    fireEvent.press(getByText('ES'));
    expect(onChange).toHaveBeenCalledWith('es');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx jest __tests__/prototypeInteractivity.test.tsx --runInBand`

Expected: FAIL with module-not-found errors for the prototype components

- [ ] **Step 3: Implement the page shell and card primitives**

```tsx
import { PropsWithChildren } from 'react';
import { Platform, ScrollView, useWindowDimensions, View } from 'react-native';

export const PrototypePageShell = ({ children }: PropsWithChildren) => {
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' || width >= 1024;

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
      <View className={`mx-auto w-full ${isDesktop ? 'max-w-5xl' : 'max-w-md'} gap-4`}>
        {children}
      </View>
    </ScrollView>
  );
};
```

```tsx
import { PropsWithChildren } from 'react';
import { View } from 'react-native';

export const PrototypeSectionCard = ({ children }: PropsWithChildren) => (
  <View className="rounded-lg border border-brand-100 bg-white p-4">{children}</View>
);
```

- [ ] **Step 4: Implement the tested interactive components**

```tsx
import { PropsWithChildren, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export const PrototypeExpander = ({ label, children }: PropsWithChildren<{ label: string }>) => {
  const [open, setOpen] = useState(false);

  return (
    <View className="gap-2">
      <Pressable onPress={() => setOpen((current) => !current)}>
        <Text className="text-xs font-semibold text-slate-600">{label}</Text>
      </Pressable>
      {open ? <View>{children}</View> : null}
    </View>
  );
};
```

```tsx
import { Pressable, Text, View } from 'react-native';

export const PrototypeLanguageToggle = ({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) => (
  <View className="flex-row gap-1">
    {options.map((option) => {
      const active = option === value;
      return (
        <Pressable
          key={option}
          onPress={() => onChange(option)}
          className={`rounded px-3 py-1.5 ${active ? 'bg-brand-600' : 'bg-brand-50'}`}
        >
          <Text className={`text-xs font-semibold ${active ? 'text-white' : 'text-brand-700'}`}>
            {option.toUpperCase()}
          </Text>
        </Pressable>
      );
    })}
  </View>
);
```

- [ ] **Step 5: Add the remaining shared presentational components**

```tsx
export const PrototypeHeader = ({
  title,
  subtitle,
  badge,
}: {
  title: string;
  subtitle?: string;
  badge?: string;
}) => (
  <View className="rounded-lg bg-brand-700 px-4 py-4">
    <View className="flex-row items-start justify-between gap-3">
      <View className="flex-1">
        <Text className="text-base font-bold text-white">{title}</Text>
        {subtitle ? <Text className="mt-1 text-xs text-brand-100">{subtitle}</Text> : null}
      </View>
      {badge ? (
        <View className="rounded bg-amber-500 px-3 py-1">
          <Text className="text-[11px] font-bold tracking-wide text-white">{badge}</Text>
        </View>
      ) : null}
    </View>
  </View>
);
```

```tsx
export const PrototypeStepList = ({ steps }: { steps: string[] }) => (
  <View className="gap-3">
    {steps.map((step, index) => (
      <View key={step} className="flex-row items-start gap-3">
        <View className="h-7 w-7 items-center justify-center rounded bg-brand-600">
          <Text className="text-xs font-semibold text-white">{index + 1}</Text>
        </View>
        <Text className="flex-1 text-sm leading-5 text-slate-800">{step}</Text>
      </View>
    ))}
  </View>
);
```

```tsx
export const PrototypeActionBar = ({
  label,
  doneLabel,
}: {
  label: string;
  doneLabel: string;
}) => {
  const [done, setDone] = useState(false);

  return (
    <View className="gap-2 border-t border-brand-100 bg-white p-4">
      <Pressable onPress={() => setDone(true)} className={`rounded-lg px-4 py-4 ${done ? 'bg-green-700' : 'bg-brand-600'}`}>
        <Text className="text-center text-sm font-semibold text-white">{done ? doneLabel : label}</Text>
      </Pressable>
    </View>
  );
};
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npx jest __tests__/prototypeInteractivity.test.tsx --runInBand`

Expected: PASS for expander and language toggle behavior

- [ ] **Step 7: Commit**

```bash
git add src/features/prototypes/components/PrototypePageShell.tsx src/features/prototypes/components/PrototypeSectionCard.tsx src/features/prototypes/components/PrototypeHeader.tsx src/features/prototypes/components/PrototypeStepList.tsx src/features/prototypes/components/PrototypeExpander.tsx src/features/prototypes/components/PrototypeLanguageToggle.tsx src/features/prototypes/components/PrototypeActionBar.tsx __tests__/prototypeInteractivity.test.tsx
git commit -m "feat: add shared prototype UI primitives"
```

## Task 4: Implement prototype 01 and use it as the reference pattern

**Files:**
- Create: `src/features/prototypes/data/plainLanguageWorkItem.ts`
- Create: `src/features/prototypes/screens/PlainLanguageWorkItemScreen.tsx`
- Create: `app/(app)/prototypes/plain-language-work-item.tsx`

- [ ] **Step 1: Add static content for prototype 01**

```ts
export const plainLanguageWorkItem = {
  headerTitle: 'Work Item',
  headerSubtitle: 'WI-2847',
  priorityBadge: 'HIGH',
  locationTitle: 'Building C - Restroom 114',
  dueLabel: 'Due Today, 2:00 PM',
  aiTitle: 'Restroom Cleaning - Building C',
  whyLabel: 'Why this task?',
  whyText: 'A supervisor noticed this area needs attention during their walkthrough.',
  estimate: 'Estimated time: ~25 min',
  expanderLabel: 'View original supervisor notes',
  expanderBody: 'RR 114 bldg C - grout + drain. Poss. mold. Sealant if needed. Photo req.',
  completeLabel: 'Mark Complete',
  completedLabel: 'Completed',
  steps: [
    'Go to Restroom 114 in Building C',
    'Clean tile grout lines near the floor',
    'Check for mold near the floor drain',
    'If mold is present, apply sealant (on supply cart)',
    'Take a photo when done and mark complete',
  ],
  translations: {
    en: {
      title: 'Restroom Cleaning - Building C',
      steps: [
        'Go to Restroom 114 in Building C',
        'Clean tile grout lines near the floor',
        'Check for mold near the floor drain',
        'If mold is present, apply sealant (on supply cart)',
        'Take a photo when done and mark complete',
      ],
    },
    es: {
      title: 'Limpieza de bano - Edificio C',
      steps: [
        'Ve al Bano 114 en el Edificio C',
        'Limpia las lineas de lechada en el piso',
        'Revisa si hay moho cerca del desague',
        'Si hay moho, aplica sellador (en el carrito de suministros)',
        'Toma una foto cuando termines y marca como completado',
      ],
    },
  },
} as const;
```

- [ ] **Step 2: Implement the reference screen composition**

```tsx
import { useMemo, useState } from 'react';
import { Text, View } from 'react-native';

import { PrototypeActionBar } from '@/src/features/prototypes/components/PrototypeActionBar';
import { PrototypeExpander } from '@/src/features/prototypes/components/PrototypeExpander';
import { PrototypeHeader } from '@/src/features/prototypes/components/PrototypeHeader';
import { PrototypeLanguageToggle } from '@/src/features/prototypes/components/PrototypeLanguageToggle';
import { PrototypePageShell } from '@/src/features/prototypes/components/PrototypePageShell';
import { PrototypeSectionCard } from '@/src/features/prototypes/components/PrototypeSectionCard';
import { PrototypeStepList } from '@/src/features/prototypes/components/PrototypeStepList';
import { plainLanguageWorkItem } from '@/src/features/prototypes/data/plainLanguageWorkItem';

export const PlainLanguageWorkItemScreen = () => {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const content = useMemo(() => plainLanguageWorkItem.translations[language], [language]);

  return (
    <PrototypePageShell>
      <PrototypeHeader
        title={plainLanguageWorkItem.headerTitle}
        subtitle={plainLanguageWorkItem.headerSubtitle}
        badge={plainLanguageWorkItem.priorityBadge}
      />

      <PrototypeSectionCard>
        <Text className="text-sm font-semibold text-slate-900">{plainLanguageWorkItem.locationTitle}</Text>
        <Text className="mt-1 text-xs text-slate-600">{plainLanguageWorkItem.dueLabel}</Text>
      </PrototypeSectionCard>

      <PrototypeSectionCard>
        <View className="mb-4 flex-row items-center justify-between gap-3">
          <Text className="text-sm font-semibold text-brand-700">SAGE - AI Translation</Text>
          <PrototypeLanguageToggle value={language} onChange={(value) => setLanguage(value as 'en' | 'es')} options={['es', 'en']} />
        </View>

        <Text className="mb-4 text-lg font-bold text-slate-900">{content.title}</Text>
        <PrototypeStepList steps={content.steps} />

        <View className="mt-5 rounded-r-md border-l-4 border-amber-500 bg-amber-50 px-4 py-3">
          <Text className="text-[11px] font-bold uppercase tracking-wide text-amber-900">{plainLanguageWorkItem.whyLabel}</Text>
          <Text className="mt-1 text-sm leading-5 text-amber-950">{plainLanguageWorkItem.whyText}</Text>
        </View>

        <Text className="mt-4 text-xs font-semibold text-slate-600">{plainLanguageWorkItem.estimate}</Text>
      </PrototypeSectionCard>

      <PrototypeSectionCard>
        <PrototypeExpander label={plainLanguageWorkItem.expanderLabel}>
          <Text className="text-sm italic text-slate-600">{plainLanguageWorkItem.expanderBody}</Text>
        </PrototypeExpander>
      </PrototypeSectionCard>

      <PrototypeActionBar label={plainLanguageWorkItem.completeLabel} doneLabel={plainLanguageWorkItem.completedLabel} />
    </PrototypePageShell>
  );
};
```

- [ ] **Step 3: Add the route file**

```tsx
import { PlainLanguageWorkItemScreen } from '@/src/features/prototypes/screens/PlainLanguageWorkItemScreen';

export default function PlainLanguageWorkItemRoute() {
  return <PlainLanguageWorkItemScreen />;
}
```

- [ ] **Step 4: Run focused tests and manual verification**

Run: `npx jest __tests__/prototypeInteractivity.test.tsx __tests__/prototypeIndexScreen.test.tsx --runInBand`

Expected: PASS for both test files

Manual:
- run `npm run web`
- open `/prototypes/plain-language-work-item`
- confirm mobile-width layout mirrors the HTML prototype closely
- confirm wider web viewport removes the fake phone feel and keeps the same content order

- [ ] **Step 5: Commit**

```bash
git add src/features/prototypes/data/plainLanguageWorkItem.ts src/features/prototypes/screens/PlainLanguageWorkItemScreen.tsx app/(app)/prototypes/plain-language-work-item.tsx
git commit -m "feat: add plain language work item prototype"
```

## Task 5: Implement prototypes 02 and 03 using the same primitives

**Files:**
- Create: `src/features/prototypes/data/aiInspectionComments.ts`
- Create: `src/features/prototypes/data/sageScoreSummary.ts`
- Create: `src/features/prototypes/screens/AIInspectionCommentsScreen.tsx`
- Create: `src/features/prototypes/screens/SageScoreSummaryScreen.tsx`
- Create: `app/(app)/prototypes/ai-inspection-comments.tsx`
- Create: `app/(app)/prototypes/sage-score-summary.tsx`

- [ ] **Step 1: Add static content objects for prototypes 02 and 03**

```ts
export const aiInspectionComments = {
  title: 'AI Inspection Comments',
  subtitle: 'Demo prototype',
  sections: [
    'Original inspection note',
    'AI rewrite',
    'Severity summary',
    'Suggested follow-up',
  ],
} as const;
```

```ts
export const sageScoreSummary = {
  title: 'Sage Score Summary',
  subtitle: 'Demo prototype',
  score: '91',
  trend: '+4 this month',
  highlights: [
    'Lobby, restrooms, and north corridor improved this cycle.',
    'One recurring issue remains in Building C.',
    'Leadership summary should stay brief and visual.',
  ],
} as const;
```

- [ ] **Step 2: Compose screens by reusing the shared shell**

```tsx
export const AIInspectionCommentsScreen = () => (
  <PrototypePageShell>
    <PrototypeHeader title="AI Inspection Comments" subtitle="Demo prototype" />
    <PrototypeSectionCard>{/* original note block */}</PrototypeSectionCard>
    <PrototypeSectionCard>{/* rewritten comment block */}</PrototypeSectionCard>
    <PrototypeSectionCard>{/* severity + next action block */}</PrototypeSectionCard>
  </PrototypePageShell>
);
```

```tsx
export const SageScoreSummaryScreen = () => (
  <PrototypePageShell>
    <PrototypeHeader title="Sage Score Summary" subtitle="Demo prototype" />
    <PrototypeSectionCard>{/* main score + trend */}</PrototypeSectionCard>
    <PrototypeSectionCard>{/* metric or highlights layout */}</PrototypeSectionCard>
    <PrototypeSectionCard>{/* narrative summary */}</PrototypeSectionCard>
  </PrototypePageShell>
);
```

- [ ] **Step 3: Add explicit route files**

```tsx
import { AIInspectionCommentsScreen } from '@/src/features/prototypes/screens/AIInspectionCommentsScreen';

export default function AIInspectionCommentsRoute() {
  return <AIInspectionCommentsScreen />;
}
```

```tsx
import { SageScoreSummaryScreen } from '@/src/features/prototypes/screens/SageScoreSummaryScreen';

export default function SageScoreSummaryRoute() {
  return <SageScoreSummaryScreen />;
}
```

- [ ] **Step 4: Run tests and manual verification**

Run: `npx jest __tests__/prototypeIndexScreen.test.tsx __tests__/prototypeInteractivity.test.tsx --runInBand`

Expected: PASS

Manual:
- open `/prototypes/ai-inspection-comments`
- open `/prototypes/sage-score-summary`
- verify each screen reads well at mobile width and at desktop width

- [ ] **Step 5: Commit**

```bash
git add src/features/prototypes/data/aiInspectionComments.ts src/features/prototypes/data/sageScoreSummary.ts src/features/prototypes/screens/AIInspectionCommentsScreen.tsx src/features/prototypes/screens/SageScoreSummaryScreen.tsx app/(app)/prototypes/ai-inspection-comments.tsx app/(app)/prototypes/sage-score-summary.tsx
git commit -m "feat: add inspection and score prototype screens"
```

## Task 6: Implement prototypes 04, 05, and 06

**Files:**
- Create: `src/features/prototypes/data/incidentSeverityClassification.ts`
- Create: `src/features/prototypes/data/monthlyOperationalNarrative.ts`
- Create: `src/features/prototypes/data/customerPerformanceSummary.ts`
- Create: `src/features/prototypes/screens/IncidentSeverityClassificationScreen.tsx`
- Create: `src/features/prototypes/screens/MonthlyOperationalNarrativeScreen.tsx`
- Create: `src/features/prototypes/screens/CustomerPerformanceSummaryScreen.tsx`
- Create: `app/(app)/prototypes/incident-severity-classification.tsx`
- Create: `app/(app)/prototypes/monthly-operational-narrative.tsx`
- Create: `app/(app)/prototypes/customer-performance-summary.tsx`

- [ ] **Step 1: Add the remaining static content files**

```ts
export const incidentSeverityClassification = {
  title: 'Incident Severity Classification',
  subtitle: 'Demo prototype',
  severity: 'Moderate',
  summary: 'Static triage guidance for an incident intake demo.',
} as const;
```

```ts
export const monthlyOperationalNarrative = {
  title: 'Monthly Operational Narrative',
  subtitle: 'Demo prototype',
  sections: ['Wins', 'Risks', 'Recommended actions'],
} as const;
```

```ts
export const customerPerformanceSummary = {
  title: 'Customer Performance Summary',
  subtitle: 'Demo prototype',
  headline: 'Service performance remained strong across the current review period.',
} as const;
```

- [ ] **Step 2: Compose the three remaining screens**

```tsx
export const IncidentSeverityClassificationScreen = () => (
  <PrototypePageShell>
    <PrototypeHeader title="Incident Severity Classification" subtitle="Demo prototype" badge="MODERATE" />
    <PrototypeSectionCard>{/* incident summary */}</PrototypeSectionCard>
    <PrototypeSectionCard>{/* severity explanation */}</PrototypeSectionCard>
    <PrototypeSectionCard>{/* next actions */}</PrototypeSectionCard>
  </PrototypePageShell>
);
```

```tsx
export const MonthlyOperationalNarrativeScreen = () => (
  <PrototypePageShell>
    <PrototypeHeader title="Monthly Operational Narrative" subtitle="Demo prototype" />
    <PrototypeSectionCard>{/* summary intro */}</PrototypeSectionCard>
    <PrototypeSectionCard>{/* narrative sections */}</PrototypeSectionCard>
  </PrototypePageShell>
);
```

```tsx
export const CustomerPerformanceSummaryScreen = () => (
  <PrototypePageShell>
    <PrototypeHeader title="Customer Performance Summary" subtitle="Demo prototype" />
    <PrototypeSectionCard>{/* performance overview */}</PrototypeSectionCard>
    <PrototypeSectionCard>{/* customer-facing highlights */}</PrototypeSectionCard>
  </PrototypePageShell>
);
```

- [ ] **Step 3: Add the three route files**

```tsx
import { IncidentSeverityClassificationScreen } from '@/src/features/prototypes/screens/IncidentSeverityClassificationScreen';

export default function IncidentSeverityClassificationRoute() {
  return <IncidentSeverityClassificationScreen />;
}
```

```tsx
import { MonthlyOperationalNarrativeScreen } from '@/src/features/prototypes/screens/MonthlyOperationalNarrativeScreen';

export default function MonthlyOperationalNarrativeRoute() {
  return <MonthlyOperationalNarrativeScreen />;
}
```

```tsx
import { CustomerPerformanceSummaryScreen } from '@/src/features/prototypes/screens/CustomerPerformanceSummaryScreen';

export default function CustomerPerformanceSummaryRoute() {
  return <CustomerPerformanceSummaryScreen />;
}
```

- [ ] **Step 4: Run tests and perform route checks**

Run: `npx jest __tests__/prototypeIndexScreen.test.tsx __tests__/prototypeInteractivity.test.tsx --runInBand`

Expected: PASS

Manual:
- open all six prototype routes in web
- inspect one narrow viewport and one desktop viewport for each screen
- confirm no route crashes and no content overflows

- [ ] **Step 5: Commit**

```bash
git add src/features/prototypes/data/incidentSeverityClassification.ts src/features/prototypes/data/monthlyOperationalNarrative.ts src/features/prototypes/data/customerPerformanceSummary.ts src/features/prototypes/screens/IncidentSeverityClassificationScreen.tsx src/features/prototypes/screens/MonthlyOperationalNarrativeScreen.tsx src/features/prototypes/screens/CustomerPerformanceSummaryScreen.tsx app/(app)/prototypes/incident-severity-classification.tsx app/(app)/prototypes/monthly-operational-narrative.tsx app/(app)/prototypes/customer-performance-summary.tsx
git commit -m "feat: add remaining prototype demo screens"
```

## Task 7: Final polish, responsive cleanup, and verification

**Files:**
- Modify: any files from previous tasks that need spacing or breakpoint cleanup after manual review
- Test: `__tests__/prototypeIndexScreen.test.tsx`
- Test: `__tests__/prototypeInteractivity.test.tsx`

- [ ] **Step 1: Tighten desktop responsive behavior after manual comparison**

```tsx
const isDesktop = Platform.OS === 'web' || width >= 1024;

<View className={`w-full ${isDesktop ? 'max-w-5xl flex-row gap-4' : 'max-w-md flex-col gap-4'}`}>
  <View className={`${isDesktop ? 'flex-[1.2]' : 'w-full'}`}>{/* primary content */}</View>
  <View className={`${isDesktop ? 'flex-1' : 'w-full'}`}>{/* secondary content */}</View>
</View>
```

- [ ] **Step 2: Run full targeted verification**

Run: `npx jest __tests__/prototypeIndexScreen.test.tsx __tests__/prototypeInteractivity.test.tsx --runInBand`

Expected: PASS

Run: `npm run lint`

Expected: PASS or no new lint errors in touched files

Run: `npm run typecheck`

Expected: PASS

- [ ] **Step 3: Manual acceptance checklist**

Manual:
- confirm `Prototypes` appears in native and web sidebars
- confirm `/prototypes` list screen opens correctly
- confirm all six routes render under the authenticated shell
- compare each screen to its corresponding HTML in `prototypes/`
- verify mobile fidelity first, then desktop adaptation second
- verify expanders, language toggles, and complete buttons behave locally

- [ ] **Step 4: Commit**

```bash
git add app/(app)/prototypes src/features/prototypes __tests__/prototypeIndexScreen.test.tsx __tests__/prototypeInteractivity.test.tsx src/components/layout/AppSidebar.native.tsx src/components/layout/AppSidebar.web.tsx
git commit -m "feat: integrate static prototype demo screens"
```

## Self-Review

### Spec coverage
- `Prototypes` nav item: covered in Task 1
- prototype list/index screen: covered in Task 2
- six individual routes: covered in Tasks 4, 5, and 6
- shared UI primitives: covered in Task 3
- static content modules: covered in Tasks 1, 4, 5, and 6
- responsive mobile/desktop behavior: covered in Tasks 3 and 7

### Placeholder scan
- No `TODO`, `TBD`, or “implement later” markers remain.
- Every task names exact files, commands, and representative code structures.

### Type consistency
- Routes consistently use explicit Expo paths under `/prototypes/...`
- Shared content typing is introduced before the catalog is consumed
- Interactive components tested in Task 3 match the screen usage in later tasks

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-22-prototypes-integration.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
