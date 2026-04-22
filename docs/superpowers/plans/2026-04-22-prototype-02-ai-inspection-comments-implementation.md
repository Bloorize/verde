# Prototype 02 AI Inspection Comments Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the prototype `02` Expo route so mobile closely matches the original inspection-comments HTML and wide web adapts the same flow into a desktop-appropriate layout.

**Architecture:** Keep the work focused on the existing prototype `02` screen and its route-specific test/data file. Replace the current explainer-style composition with a single in-flow inspection layout made of a header, location row, checklist, inline AI suggestion card, and recurrence callout. Use the existing prototype shell and route pager, and branch the layout by viewport width for desktop adaptation.

**Tech Stack:** Expo Router, React Native, NativeWind/Tailwind className styling, Jest, Testing Library for React Native

---

## File Structure

### Modify
- `__tests__/AIInspectionCommentsScreen.test.tsx`
- `src/features/prototypes/data/aiInspectionComments.ts`
- `src/features/prototypes/screens/AIInspectionCommentsScreen.tsx`

## Task 1: Redefine the screen contract with a failing test

**Files:**
- Modify: `__tests__/AIInspectionCommentsScreen.test.tsx`

- [ ] **Step 1: Rewrite the screen test around the approved mobile-first structure**

```tsx
import { fireEvent, render } from '@testing-library/react-native';

import { AIInspectionCommentsScreen } from '@/src/features/prototypes/screens/AIInspectionCommentsScreen';

jest.mock('expo-router', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => {
    const { View } = require('react-native');
    return <View testID={`link:${href}`}>{children}</View>;
  },
}));

jest.mock('@/src/hooks/useLocalizedText', () => ({
  useLocalizedText: (value: string) => value,
}));

describe('AIInspectionCommentsScreen', () => {
  it('renders the in-flow inspection layout from the original prototype', () => {
    const { getByText, queryByText } = render(<AIInspectionCommentsScreen />);

    expect(getByText('Inspection')).toBeTruthy();
    expect(getByText('INS-0412')).toBeTruthy();
    expect(getByText('Learning Commons - Lobby')).toBeTruthy();
    expect(getByText('3 of 8 items checked')).toBeTruthy();
    expect(getByText('Glass surfaces')).toBeTruthy();
    expect(getByText('Floor corners')).toBeTruthy();
    expect(getByText('Waste receptacles')).toBeTruthy();
    expect(getByText('Smudges')).toBeTruthy();
    expect(getByText('SAGE — Suggested Comment')).toBeTruthy();
    expect(getByText('Pattern Detected')).toBeTruthy();
    expect(queryByText('Original inspection note')).toBeNull();
    expect(queryByText('Severity framing')).toBeNull();
    expect(queryByText('Recommended follow-up')).toBeNull();
  });

  it('supports the inline accept, edit, and ignore comment states', () => {
    const { getByRole, getByDisplayValue, getByText, queryByRole } = render(
      <AIInspectionCommentsScreen />,
    );

    const commentField = getByDisplayValue(
      'Smudges found near south entry floor corners. This area has failed for the same reason in 2 of the last 3 inspections. Recommend adding to the nightly deep-clean rotation.',
    );

    expect(commentField.props.editable).toBe(false);

    fireEvent.press(getByRole('button', { name: 'Edit' }));
    expect(getByRole('textbox').props.editable).toBe(true);
    expect(getByRole('button', { name: 'Save' })).toBeTruthy();

    fireEvent.press(getByRole('button', { name: 'Save' }));
    expect(getByText('Comment saved')).toBeTruthy();
    expect(queryByRole('button', { name: 'Accept' })).toBeNull();

    fireEvent.press(getByRole('button', { name: 'Ignore' }));
    expect(getByText('Add Comment')).toBeTruthy();
    expect(getByRole('textbox').props.placeholder).toBe('Add your own comment...');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx jest __tests__/AIInspectionCommentsScreen.test.tsx --runInBand`

Expected: FAIL because the current screen still renders the old sections and does not expose the inline comment-card behavior

## Task 2: Implement the route-specific mobile-first layout

**Files:**
- Modify: `src/features/prototypes/data/aiInspectionComments.ts`
- Modify: `src/features/prototypes/screens/AIInspectionCommentsScreen.tsx`

- [ ] **Step 1: Replace the screen data with route-specific inspection-flow content**

```ts
export const aiInspectionComments = {
  headerTitle: 'Inspection',
  headerSubtitle: 'INS-0412',
  scoreBadge: '82',
  locationTitle: 'Learning Commons - Lobby',
  progressLabel: '3 of 8 items checked',
  checklistItems: [
    { label: 'Glass surfaces', status: 'pass' },
    { label: 'Floor corners', status: 'fail', reason: 'Smudges' },
    { label: 'Waste receptacles', status: 'pending' },
  ],
  aiSectionTitle: 'SAGE — Suggested Comment',
  aiComment:
    'Smudges found near south entry floor corners. This area has failed for the same reason in 2 of the last 3 inspections. Recommend adding to the nightly deep-clean rotation.',
  savedLabel: 'Comment saved',
  addCommentTitle: 'Add Comment',
  addCommentPlaceholder: 'Add your own comment...',
  patternLabel: 'Pattern Detected',
  patternText: 'This item has failed 2 of 3 recent inspections at this site.',
} as const;
```

- [ ] **Step 2: Rebuild the screen around checklist + inline AI card**

```tsx
import { useState } from 'react';
import { Pressable, Text, TextInput, useWindowDimensions, View } from 'react-native';

// ...imports...

type CommentState = 'suggested' | 'editing' | 'saved' | 'ignored';

export const AIInspectionCommentsScreen = () => {
  const { width } = useWindowDimensions();
  const isDesktop = shouldUsePrototypeDesktopLayout(width);
  const [commentState, setCommentState] = useState<CommentState>('suggested');
  const [commentText, setCommentText] = useState(aiInspectionComments.aiComment);

  // build header, location row, checklist, AI card, and pattern callout
  // mobile: stacked in source order
  // desktop: primary column for inspection flow + secondary placement for pattern callout
};
```

- [ ] **Step 3: Keep interactions shallow and source-aligned**

```tsx
const isEditing = commentState === 'editing' || commentState === 'ignored';
const isSaved = commentState === 'saved';
const showSuggestionActions = commentState === 'suggested';
const showSaveAction = commentState === 'editing';

<TextInput
  accessibilityRole="textbox"
  editable={isEditing}
  multiline
  value={commentText}
  onChangeText={setCommentText}
  placeholder={commentState === 'ignored' ? aiInspectionComments.addCommentPlaceholder : undefined}
/>
```

```tsx
<Pressable accessibilityRole="button" accessibilityLabel="Accept" onPress={() => setCommentState('saved')} />
<Pressable accessibilityRole="button" accessibilityLabel="Edit" onPress={() => setCommentState('editing')} />
<Pressable accessibilityRole="button" accessibilityLabel="Ignore" onPress={() => {
  setCommentState('ignored');
  setCommentText('');
}} />
<Pressable accessibilityRole="button" accessibilityLabel="Save" onPress={() => setCommentState('saved')} />
```

- [ ] **Step 4: Run the screen test to verify it passes**

Run: `npx jest __tests__/AIInspectionCommentsScreen.test.tsx --runInBand`

Expected: PASS

## Task 3: Run focused verification

**Files:**
- Test: `__tests__/AIInspectionCommentsScreen.test.tsx`
- Test: `__tests__/prototypeInteractivity.test.tsx`

- [ ] **Step 1: Run focused prototype tests**

Run: `npx jest __tests__/AIInspectionCommentsScreen.test.tsx __tests__/prototypeInteractivity.test.tsx --runInBand`

Expected: PASS

- [ ] **Step 2: Check lint diagnostics for touched files**

Run Cursor lints for:
- `src/features/prototypes/screens/AIInspectionCommentsScreen.tsx`
- `src/features/prototypes/data/aiInspectionComments.ts`
- `__tests__/AIInspectionCommentsScreen.test.tsx`

Expected: no new diagnostics in touched files
