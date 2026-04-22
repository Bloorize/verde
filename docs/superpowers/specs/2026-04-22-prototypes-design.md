# Prototypes Integration Design

**Date:** 2026-04-22  
**Status:** Draft for review  
**Owner:** Cursor planning session

## Goal
Integrate the six existing HTML prototypes into the Expo app as real app screens under a new `Prototypes` navigation entry, preserving the mockups closely on mobile and adapting them intentionally for desktop/web.

## Scope
This design covers:

- adding a new `Prototypes` entry in the main app navigation
- adding a prototype index screen and six prototype detail routes
- recreating each prototype as a real Expo/React Native screen
- keeping all content static for demo use
- supporting mobile and desktop/web layouts

This design does **not** cover:

- backend integration
- real data wiring from React Query, Zustand, or external APIs
- production workflows behind the prototype actions
- converting the raw HTML files into a runtime dependency

## Current Project Context
The app is already an Expo + React Native + Expo Router codebase with web support. The current shell and navigation patterns live in:

- `app/_layout.tsx`
- `app/(app)/_layout.tsx`
- `src/components/layout/AppShell.tsx`
- `src/components/layout/AppSidebar.native.tsx`
- `src/components/layout/AppSidebar.web.tsx`

The six mockups currently live as static HTML files in `prototypes/`, along with shared CSS in `prototypes/verde-proto.css`. They use the same core brand palette already present in the app, so the visual direction is compatible with the existing token set.

## Decisions Made
- Use **native Expo recreation**, not WebViews or embedded HTML.
- Add a **nested `Prototypes` area** with a list screen plus one route per prototype.
- Make the first pass **static demo content only**.
- Treat the current mobile mockups as the **source layout**.
- On desktop/web, use **responsive adaptation** rather than preserving a fixed phone frame.

## Recommended Architecture
Create a small feature area dedicated to the prototype screens, split into routing, static data, shared prototype UI primitives, and composed screen modules.

### Route Structure
- `app/(app)/prototypes/_layout.tsx`
- `app/(app)/prototypes/index.tsx`
- `app/(app)/prototypes/[prototypeId].tsx` or one route file per prototype if explicit routing reads better

Recommendation: prefer **one route file per prototype** if the six screens diverge materially in structure. Use `[prototypeId].tsx` only if most screens can be rendered from a common composition layer cleanly.

### Feature Structure
- `src/features/prototypes/data/`
- `src/features/prototypes/components/`
- `src/features/prototypes/screens/`
- `src/features/prototypes/types.ts`

Suggested responsibilities:

- `data/`: static content definitions for each prototype
- `components/`: reusable UI building blocks
- `screens/`: composition files for the six finished screens
- `types.ts`: shared content/config typing for prototype definitions

## Screen Composition Strategy
Do not translate each HTML file into a single large JSX file. Instead, define a reusable visual vocabulary that covers the repeated patterns already visible in the prototypes.

### Shared UI Primitives
Likely shared components:

- `PrototypePageShell`
- `PrototypeHeader`
- `PrototypeMetaRow`
- `PrototypeBadge`
- `PrototypeCard`
- `PrototypeStepList`
- `PrototypeCallout`
- `PrototypeExpander`
- `PrototypeActionBar`
- `PrototypeLanguageToggle`
- `PrototypeResponsiveFrame`

These should remain presentational and demo-focused. They should not assume backend data or app-wide domain logic.

### Content Model
Each prototype should be backed by a static content object that defines:

- route metadata
- title/subtitle
- labels and badge text
- section ordering
- step list items
- callout text
- expandable note content
- button labels
- any static interactive state defaults
- any desktop layout hints

This keeps the copy and structure close to the original mockups while avoiding brittle route-level JSX.

## Responsive Design Rules
The mobile prototype remains the primary source of truth for layout and fidelity.

### Mobile
- preserve the existing flow and grouping from the mockup
- keep spacing and hierarchy close to the prototype
- keep CTA placement familiar to the current HTML
- preserve demo interactions such as expand/collapse, language toggle, and completion state where present

### Desktop/Web
- remove or reduce fake device framing and status-bar chrome
- place content inside a wider centered canvas
- allow sections to expand into multi-column layouts only where it improves readability
- preserve the same design language and section order
- avoid making the desktop version feel like a stretched mobile screenshot

### Fidelity Guidance
Preserve:

- brand palette
- section hierarchy
- card groupings
- content sequence
- important demo interactions

Do not preserve blindly:

- browser-only decorative effects that do not translate well to React Native
- literal phone bezels on desktop
- ornamental animation that adds complexity without helping the demo

## Navigation Design
Add a `Prototypes` entry to the existing sidebar navigation on native and web.

Inside `Prototypes`:

- `index.tsx` shows a list of all six demos
- each row/card opens an individual prototype route
- the route title and list copy should be plain, functional, and consistent with the rest of the app shell

This gives a stable demo entry point and avoids forcing a single long prototype carousel.

## Interaction Model
The first pass is static and local-state only.

Allowed:

- expand/collapse sections
- toggled language display
- local “done/completed” state
- simple visual feedback like active tabs or buttons

Excluded:

- remote persistence
- server updates
- production analytics
- state shared across prototypes unless it is purely UI shell state

## Implementation Boundaries
The first implementation should produce:

1. new `Prototypes` navigation item
2. prototype list/index screen
3. six routed prototype screens
4. shared presentational prototype components
5. static content definitions
6. responsive behavior across mobile and desktop/web

The first implementation should not attempt:

- data model unification with product features
- generic CMS-like content systems
- backend contracts
- unrelated shell refactors

## Testing and Validation
Testing should stay pragmatic for a static demo feature.

### Manual verification
- each prototype route renders correctly on web
- mobile layout remains close to the original mockup
- desktop layout feels intentionally adapted
- navigation into and out of `Prototypes` works from both sidebars
- any local interactions behave correctly

### Automated verification
Add lightweight tests only where they materially reduce regression risk, such as:

- shared prototype primitives with conditional rendering
- local state transitions for toggles/expanders if abstracted into reusable components

Avoid large snapshot-heavy tests for all six screens in the first pass.

## Risks and Mitigations
### Risk: screen-specific divergence
Some of the six prototypes may be too different to fit a single rendering scheme.

Mitigation:
- share primitives, not a forced one-size-fits-all page renderer
- allow each prototype screen to compose components differently

### Risk: fidelity drift during translation
Recreating HTML in React Native can subtly change spacing and hierarchy.

Mitigation:
- validate each screen against its corresponding HTML mockup during implementation
- preserve the content order and section boundaries before polishing

### Risk: desktop adaptation becomes redesign
Desktop responsiveness could accidentally move too far from the mockup.

Mitigation:
- treat mobile as source truth
- allow only targeted desktop expansion, not wholesale redesign

## Recommended File Plan
Expected modifications:

- update `src/components/layout/AppSidebar.native.tsx`
- update `src/components/layout/AppSidebar.web.tsx`
- add `app/(app)/prototypes/_layout.tsx`
- add `app/(app)/prototypes/index.tsx`
- add six prototype route files under `app/(app)/prototypes/`
- add feature files under `src/features/prototypes/`

Possible additions:

- shared constants for prototype route metadata
- small utility helpers for breakpoint-aware prototype layout

## Final Summary
The six HTML mockups should be rebuilt as real Expo screens under a new `Prototypes` navigation area. The implementation should use static content modules plus shared presentational components, not WebViews or raw HTML embedding. Mobile should stay close to the original mockups. Desktop/web should adapt intentionally into wider layouts while preserving the same content, hierarchy, and visual language. The first pass should remain static and demo-focused, with no backend or product-data integration.
