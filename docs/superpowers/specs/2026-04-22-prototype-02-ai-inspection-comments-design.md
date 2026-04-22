# Prototype 02 Design: AI Inspection Comments

**Date:** 2026-04-22  
**Status:** Draft for review  
**Owner:** Cursor planning session

## Goal
Update prototype `02` at `/prototypes/ai-inspection-comments` so the mobile view closely matches the original HTML mockup, while the full web view adapts the same content into a desktop-appropriate layout.

## Scope
This design covers:

- visual and structural updates to the prototype `02` Expo route
- mobile-first fidelity to `prototypes/02-ai-inspection-comments.html`
- desktop/web adaptation of the same inspection flow
- local demo interactions for the AI suggestion card

This design does **not** cover:

- backend integration
- production comment persistence
- changes to the original HTML prototype file
- broader redesign of other prototype routes

## Current Drift
The current route introduces extra product-style sections that are not present in the original mockup, including:

- a separate "Original inspection note" section
- a separate "AI rewrite" review flow
- a separate "Severity framing" section
- a separate "Recommended follow-up" section

These additions change the screen from an in-flow inspection experience into a multi-section explainer page. The primary goal of this update is to remove that drift.

## Source Of Truth
Use `prototypes/02-ai-inspection-comments.html` as the layout and interaction reference for mobile.

Preserve on mobile:

- the dark green inspection header
- the score badge
- the location row with progress text
- the three checklist rows and their states
- the inline SAGE suggestion card
- the recurrence callout directly below the AI card

Do not preserve literally on full web:

- the fake device bezel
- the fake iOS status bar
- the impression of a phone screenshot floating inside the app

## Layout Strategy
### Mobile
The mobile layout should be a near-direct recreation of the original mockup.

- keep the same section order
- keep spacing and hierarchy very close to the original
- keep the AI suggestion embedded in the inspection flow
- keep the checklist visually prominent above the AI suggestion
- keep the recurrence callout visually secondary but still directly associated with the failed item

### Full Web
The web layout should adapt the same content into a desktop-friendly surface without changing the meaning of the screen.

- remove the phone frame and status bar
- keep the same inspection header, location row, checklist, AI suggestion, and recurrence callout
- place the content inside a centered app-aware container
- allow more horizontal breathing room and clearer alignment
- keep the primary reading flow recognizable as the same mobile-first inspection experience

Recommended desktop behavior:

- use a centered main column at medium widths
- at larger widths, allow the recurrence callout and other secondary context to sit beside the main inspection content if that improves readability
- avoid turning the route into a dashboard or a stack of unrelated cards

## Interaction Model
The original prototype interaction should remain the reference behavior.

### Accept
- visually confirm the suggestion as saved
- hide or collapse the action row after acceptance

### Edit
- turn the suggestion body into an editable field
- swap the edit action into a save-style action
- preserve the inline card context rather than opening a separate workflow

### Ignore
- remove the AI suggestion state
- fall back to a simpler manual comment entry state
- keep the rest of the inspection flow intact

These behaviors should remain local demo interactions only.

## Content Strategy
Keep the copy close to the original design. The route should present a single inspection moment, not a summary of all possible supporting analysis.

Therefore:

- remove the separate explainer sections currently shown in the route
- keep the checklist item labels and failure reason chip close to the original wording
- keep the AI suggestion text concise and in-flow
- keep the recurrence note short and immediately scannable

## Component Guidance
Prefer reusing the existing prototype shell and primitives where they support fidelity, but do not force the screen into the shared patterns if those patterns are the source of the mismatch.

Allowed:

- adjust `AIInspectionCommentsScreen.tsx`
- add screen-specific layout wrappers or styles as needed
- conditionally render mobile vs desktop structure inside the route

Avoid:

- introducing more generic explanation components
- adding new structural sections just to fit existing primitives
- rebuilding the screen as a broad desktop dashboard

## Validation
### Manual acceptance
- narrow/mobile width looks almost identical to the original HTML mockup
- the route order matches the source: header, location, checklist, AI suggestion, recurrence callout
- accept, edit, and ignore all behave inline on the suggestion card
- full web view feels intentionally adapted rather than stretched
- full web view still reads as the same screen, not a different product surface

### Automated testing
Add or update focused tests only if they materially reduce regression risk for the inline interaction states. Avoid snapshot-heavy visual tests for this pass.

## Risks And Mitigations
### Risk: desktop adaptation drifts into redesign
Mitigation:

- treat mobile as the source truth
- adapt container behavior, not information architecture

### Risk: shared prototype primitives fight the layout
Mitigation:

- allow screen-specific composition where needed
- keep reuse at the primitive level, not at the full-section-template level

### Risk: inline edit/ignore behavior becomes more complex than the mockup
Mitigation:

- keep the interaction local and shallow
- mirror the original HTML behavior before adding polish

## Final Summary
Prototype `02` should become a faithful mobile-first recreation of the original AI inspection comments mockup. On mobile, it should match the original screen almost exactly. On full web, it should keep the same content and sequence but adapt into a cleaner desktop container without fake phone chrome. The updated route should focus on one in-flow inspection experience, not a collection of extra explainer sections.
