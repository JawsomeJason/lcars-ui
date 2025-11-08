# Tasks: LCARS UI Component Library

**Input**: Design documents from `/specs/001-lcars-components/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**⚠️ CRITICAL - NO TESTING**: Per Constitution, this project FORBIDS testing. Any test-related tasks MUST be removed. Validation occurs through manual usage and examples only.

**Organization**: Tasks are grouped by user story to enable independent implementation and manual validation of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Single project structure at repository root:

- `src/` - Source code
- `examples/` - Manual validation demos
- `docs/` - Component documentation
- `dist/` - Build output (gitignored)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project directory structure (src/components/, src/styles/, src/utils/, src/polyfills/, examples/, docs/components/, docs/guides/, dist/)
- [x] T002 Initialize package.json with project metadata, scripts (build, dev), and devDependencies (esbuild, typescript, eslint, prettier)
- [x] T003 [P] Configure ESLint in .eslintrc.json for ES2022+ JavaScript with web components best practices
- [x] T004 [P] Configure Prettier in .prettierrc.json for consistent code formatting
- [x] T005 [P] Create .gitignore for node_modules, dist/, and IDE files
- [x] T006 [P] Create README.md with project overview and quickstart pointer
- [x] T007 Install npm dependencies (esbuild, typescript, eslint, prettier, @webcomponents/webcomponentsjs)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T008 Create CSS custom properties for 2357 theme in src/styles/variables.css (8 colors: pale-canary, golden-tanoi, neon-carrot, eggplant, lilac, anakiwa, mariner, baltic-blue)
- [x] T009 [P] Create base CSS reset and LCARS typography styles in src/styles/base.css (Antonio font, uppercase headers, sans-serif)
- [x] T010 [P] Create theme system CSS in src/styles/theme.css with :root and [data-theme="2357"] selectors
- [x] T011 Create ThemeManager utility in src/utils/theme-manager.js (getEffectiveTheme, applyTheme functions)
- [x] T012 [P] Create polyfill conditional loader in src/polyfills/index.js (feature detection for customElements and attachShadow)
- [x] T013 Create esbuild configuration in build.js for bundling library (lcars-ui.js) and polyfills (polyfills.js)
- [x] T014 [P] Setup TypeScript configuration in tsconfig.json for .d.ts generation (--declaration --allowJs --emitDeclarationOnly)
- [x] T015 Create main library entry point in src/index.js (barrel export for all components)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Import and Use Basic LCARS Component (Priority: P1) 🎯 MVP

**Goal**: Enable developers to install the library, import a component (lcars-panel), and render it with LCARS styling

**Independent Validation**: Install package locally, import lcars-panel in an HTML page, manually verify it renders with golden-tanoi background and neon-carrot borders

### Implementation for User Story 1

- [x] T016 [P] [US1] Create lcars-panel component directory and index.js export in src/components/lcars-panel/
- [x] T017 [P] [US1] Create LcarsPanel class skeleton in src/components/lcars-panel/lcars-panel.js (extends HTMLElement, static observedAttributes, constructor with closed Shadow DOM)
- [x] T018 [US1] Implement lcars-panel Shadow DOM template in src/components/lcars-panel/lcars-panel.js (panel part, header part if label, content part with slot)
- [x] T019 [P] [US1] Create lcars-panel styles in src/components/lcars-panel/lcars-panel.css (CSS Grid layout, border-radius elbows, thick borders, color blocking)
- [x] T020 [US1] Implement connectedCallback in lcars-panel.js (render template, apply theme, attach styles)
- [x] T021 [US1] Implement attributeChangedCallback in lcars-panel.js (react to data-theme, variant, label changes)
- [x] T022 [US1] Add JSDoc comments to LcarsPanel class for TypeScript definition generation (element tag, attributes, cssparts, cssprops)
- [x] T023 [US1] Register lcars-panel custom element in src/components/lcars-panel/index.js
- [x] T024 [US1] Export lcars-panel from src/components/index.js
- [x] T025 [P] [US1] Create lcars-panel API documentation in docs/components/lcars-panel.md (copy from contracts/lcars-panel.md and adjust for implementation)
- [x] T026 [US1] Create basic-panel example in examples/basic-panel/index.html (import library, use lcars-panel with standard variant)
- [x] T027 [US1] Create basic-panel demo script in examples/basic-panel/demo.js (import lcars-panel component)
- [x] T028 [US1] Manually validate lcars-panel renders with LCARS styling (open examples/basic-panel/index.html in browser)

**Checkpoint**: At this point, User Story 1 should be fully functional and manually validated through the example page. lcars-panel component works standalone.

---

## Phase 4: User Story 2 - Apply Color Theme (Priority: P2)

**Goal**: Enable developers to apply data-theme="2357" to a container and have all child components inherit the theme colors automatically

**Independent Validation**: Add multiple lcars-panel components to a page, set data-theme="2357" on container, manually verify all panels use 2357 colors (can validate with US1 panel alone, but theme system should work for future components)

### Implementation for User Story 2

- [x] T029 [P] [US2] Enhance theme-manager.js to traverse DOM tree using closest('[data-theme]') for theme inheritance
- [x] T030 [US2] Update lcars-panel.js to use theme-manager.js getEffectiveTheme() in connectedCallback and attributeChangedCallback
- [x] T031 [US2] Verify theme CSS custom properties cascade into Shadow DOM in src/styles/theme.css
- [x] T032 [US2] Add default theme fallback logic (:root theme as last resort) in src/styles/theme.css
- [x] T033 [P] [US2] Create themed-components example in examples/themed-components/index.html (container with data-theme="2357", multiple lcars-panel instances)
- [x] T034 [US2] Create themed-components demo script in examples/themed-components/demo.js
- [x] T035 [P] [US2] Create theming guide documentation in docs/guides/theming.md (explain data-theme attribute, CSS custom properties, inheritance)
- [x] T036 [US2] Manually validate theme inheritance (all panels in container use correct 2357 colors, panels outside inherit from :root)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. Theme system applies correctly to lcars-panel.

---

## Phase 5: User Story 3 - Build Complete LCARS Interface (Priority: P3)

**Goal**: Enable developers to combine multiple LCARS components (panels AND buttons) to create a full LCARS screen layout without style conflicts

**Independent Validation**: Create a page with 5+ lcars-panel and lcars-button components arranged in a typical LCARS layout, manually verify they work cohesively with consistent styling

### Implementation for User Story 3

- [x] T037 [P] [US3] Create lcars-button component directory and index.js export in src/components/lcars-button/
- [x] T038 [P] [US3] Create LcarsButton class skeleton in src/components/lcars-button/lcars-button.js (extends HTMLElement, static observedAttributes, constructor with closed Shadow DOM)
- [x] T039 [US3] Implement lcars-button Shadow DOM template in src/components/lcars-button/lcars-button.js (internal button element with part="button", slot for label)
- [x] T040 [P] [US3] Create lcars-button styles in src/components/lcars-button/lcars-button.css (rounded pill shape with border-radius, color states for hover/active/disabled, focus-visible indicator)
- [x] T041 [US3] Implement connectedCallback in lcars-button.js (render template, apply theme, setup keyboard handlers for Enter/Space)
- [x] T042 [US3] Implement attributeChangedCallback in lcars-button.js (react to data-theme, variant, size, disabled changes)
- [x] T043 [US3] Implement lcars-click custom event in lcars-button.js (dispatch on click, prevent when disabled, include originalEvent in detail)
- [x] T044 [US3] Add disabled state handling in lcars-button.js (forward to internal button, prevent events, apply disabled styling)
- [x] T045 [US3] Implement keyboard navigation in lcars-button.js (Enter/Space trigger click, focus management)
- [x] T046 [US3] Add ARIA support to lcars-button.js (semantic button element provides implicit role, handle aria-label from host)
- [x] T047 [US3] Add JSDoc comments to LcarsButton class for TypeScript definition generation (element tag, attributes, events with detail type, cssparts, cssprops)
- [x] T048 [US3] Register lcars-button custom element in src/components/lcars-button/index.js
- [x] T049 [US3] Export lcars-button from src/components/index.js
- [x] T050 [P] [US3] Create lcars-button API documentation in docs/components/lcars-button.md (copy from contracts/lcars-button.md and adjust for implementation)
- [x] T051 [US3] Create composed-interface example in examples/composed-interface/index.html (full LCARS screen with multiple panels and buttons)
- [x] T052 [US3] Create composed-interface demo script in examples/composed-interface/demo.js (import all components, add event listeners to buttons)
- [x] T053 [US3] Manually validate complete LCARS interface (verify panels and buttons work together, no style conflicts, consistent theming, interactive buttons respond correctly)

**Checkpoint**: All user stories should now be independently functional. Users can compose complete LCARS interfaces with panels and buttons.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories, packaging, and distribution

- [x] T054 [P] Generate TypeScript declaration files (.d.ts) using tsc with JSDoc from all component files to dist/types/
- [x] T055 [P] Build production bundles using esbuild (dist/lcars-ui.js for library, dist/polyfills.js for polyfills)
- [x] T056 [P] Minify production bundles and generate sourcemaps in dist/
- [x] T057 Verify bundle sizes meet performance goals (<50KB minified+gzipped total) (Result: 2.1KB gzipped main bundle)
- [x] T058 [P] Update package.json exports field with entry points for main library and polyfills
- [x] T059 [P] Update package.json files field to include dist/ and docs/ for npm package
- [x] T060 [P] Create installation guide in docs/guides/installation.md
- [x] T061 [P] Create accessibility guide in docs/guides/accessibility.md (WCAG 2.1 AA compliance, keyboard navigation, ARIA best practices)
- [x] T062 Validate quickstart.md accuracy by following all steps manually (install, import, render first component in <5 minutes) (Corrected import paths)
- [x] T063 [P] Manually validate library in modern browsers (Chrome, Firefox, Safari, Edge) with native Web Components support (All examples functioned as expected)
- [x] T064 [P] Manually validate library with polyfills loaded in older browser environments (Polyfill bundle conditionally loads, components register)
- [x] T065 Verify color contrast ratios for 2357 theme meet WCAG AA standards (Documented in accessibility guide; all ratios pass)
- [x] T066 [P] Add accessibility keyboard navigation verification across all examples (Tab order, Enter/Space activation confirmed)
- [x] T067 Perform code cleanup and refactoring across all components (No stray console.logs, consistent style)
- [x] T068 Run ESLint and Prettier on all source files, fix any issues (Only expected build script Node warnings remain)
- [x] T069 [P] Review and update all JSDoc comments for accuracy and completeness (Types emitted cleanly)
- [x] T070 Create comprehensive README.md at repository root (installation, quickstart, components list, browser support, contribution guidelines)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup (Phase 1) completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational (Phase 2) completion
  - User Story 1 (Phase 3): Can start after Foundational
  - User Story 2 (Phase 4): Depends on User Story 1 (needs lcars-panel to demonstrate theme inheritance)
  - User Story 3 (Phase 5): Depends on User Story 1 (needs lcars-panel), independent of User Story 2 for button implementation
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Depends on User Story 1 (needs at least one component to demonstrate theming)
- **User Story 3 (P3)**: Depends on User Story 1 (lcars-panel needed for composed interface), can proceed independently after US1 complete

### Within Each User Story

- Component skeleton before template implementation
- Template implementation before lifecycle methods
- Lifecycle methods before custom events and interactions
- Styles can be developed in parallel with JavaScript
- Documentation can be written in parallel with implementation
- Examples created after component is functional
- Manual validation is final step per story

### Parallel Opportunities

- **Phase 1 (Setup)**: T003, T004, T005, T006 can run in parallel (different files)
- **Phase 2 (Foundational)**: T009, T010, T012, T014 can run in parallel (different files)
- **Phase 3 (US1)**: T016, T017, T019, T025 can run in parallel (different files)
- **Phase 4 (US2)**: T029, T033, T035 can run in parallel (different files)
- **Phase 5 (US3)**: T037, T038, T040, T050 can run in parallel (different files)
- **Phase 6 (Polish)**: T054, T055, T056, T060, T061, T063, T064, T066, T069 can run in parallel (different concerns)

---

## Parallel Example: User Story 1

```bash
# Launch all these tasks together for User Story 1:
T016: Create lcars-panel directory structure
T017: Create component class skeleton
T019: Create component styles
T025: Create API documentation
```

All these tasks operate on different files with no dependencies, so they can be worked on simultaneously.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T007)
2. Complete Phase 2: Foundational (T008-T015) - CRITICAL blocker
3. Complete Phase 3: User Story 1 (T016-T028)
4. **STOP and VALIDATE**: Open examples/basic-panel/index.html in browser, verify lcars-panel renders with LCARS styling
5. Demo component - you now have a working MVP! 🎯

### Incremental Delivery

1. Setup + Foundational → Foundation ready (T001-T015)
2. Add User Story 1 → Create example and validate → Demo lcars-panel (MVP!)
3. Add User Story 2 → Validate theming → Demo theme inheritance
4. Add User Story 3 → Validate composition → Demo complete LCARS interface
5. Polish → Build npm package → Ready for distribution

Each story adds value without breaking previous stories. After each story, you have a working, demoable increment.

### Parallel Team Strategy

With multiple developers after Foundational phase is complete:

1. Team completes Setup + Foundational together (T001-T015)
2. Once Foundational is done:
   - Developer A: User Story 1 (T016-T028) - lcars-panel
   - User Story 1 must complete before others can proceed (US2 needs it for demo, US3 needs it for composition)
3. After User Story 1:
   - Developer B: User Story 2 (T029-T036) - theming
   - Developer C: User Story 3 (T037-T053) - lcars-button (can start independently)
4. Team: Polish phase together (T054-T070)

---

## Summary

- **Total Tasks**: 70
- **Tasks per User Story**:
  - Setup: 7 tasks
  - Foundational: 8 tasks (BLOCKS all stories)
  - User Story 1: 13 tasks (lcars-panel component)
  - User Story 2: 8 tasks (theme inheritance)
  - User Story 3: 17 tasks (lcars-button component + composition)
  - Polish: 17 tasks (packaging, validation, documentation)
- **Parallel Opportunities**: 26 tasks marked [P] can run in parallel with other tasks in their phase
- **Independent Validation Criteria**:
  - US1: lcars-panel renders with LCARS styling in examples/basic-panel/
  - US2: Multiple panels inherit theme from container in examples/themed-components/
  - US3: Panels and buttons compose into complete interface in examples/composed-interface/
- **MVP Scope**: User Story 1 only (T001-T028) = 28 tasks for minimal viable product

---

## Notes

- [P] tasks = different files, no dependencies, can run in parallel
- [Story] label maps task to specific user story for traceability
- Each user story has its own example for manual validation (NO automated tests per Constitution)
- All components use closed Shadow DOM for style encapsulation
- Theme inheritance via CSS custom properties (automatic through Shadow DOM boundary)
- Accessibility is built-in (semantic HTML, ARIA, keyboard navigation, WCAG AA color contrast)
- TypeScript definitions generated from JSDoc (no TypeScript source code)
- Polyfills loaded conditionally for older browsers
- Bundle size target: <50KB (minified + gzipped) for full library
- Commit after each task or logical group of parallel tasks
- Stop at any checkpoint to validate story independently via browser demo
