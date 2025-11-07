---
description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**⚠️ CRITICAL - NO TESTING**: Per Constitution, this project FORBIDS testing. Any test-related tasks MUST be removed. Validation occurs through manual usage and examples only.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

<!--
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.

  The /speckit.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/

  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Validated independently through usage examples
  - Delivered as an MVP increment

  ⚠️ CRITICAL: NO test tasks should be included (testing forbidden by Constitution)

  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project structure per implementation plan (src/components, src/styles, examples, docs)
- [ ] T002 Initialize JavaScript project with Web Components setup
- [ ] T003 [P] Configure linting (ESLint) and formatting (Prettier) tools
- [ ] T004 [P] Setup development server with live reload
- [ ] T005 Create base CSS with custom properties (variables.css)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [ ] T006 Setup base Web Components infrastructure and custom element registration
- [ ] T007 [P] Create CSS theming system with custom properties
- [ ] T008 [P] Implement accessibility utilities (focus management, ARIA helpers)
- [ ] T009 Create base component class/mixin with common functionality
- [ ] T010 Setup component documentation template
- [ ] T011 Create example page structure for component demos

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - [Title] (Priority: P1) 🎯 MVP

**Goal**: [Brief description of what this story delivers]

**Independent Validation**: [How to verify this story works on its own - create example page/demo]

### Implementation for User Story 1

- [ ] T012 [P] [US1] Create [ComponentName] Web Component in src/components/[component-name]/[component-name].js
- [ ] T013 [P] [US1] Create component styles in src/components/[component-name]/[component-name].css
- [ ] T014 [US1] Implement component logic with proper lifecycle methods
- [ ] T015 [US1] Add ARIA attributes and keyboard navigation support
- [ ] T016 [US1] Create component documentation in docs/components/[component-name].md
- [ ] T017 [US1] Create usage example in examples/[feature-name]/index.html
- [ ] T018 [US1] Validate accessibility with keyboard navigation and screen reader

**Checkpoint**: At this point, User Story 1 should be fully functional and manually validated through the example page

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Validation**: [How to verify this story works on its own - create example page/demo]

### Implementation for User Story 2

- [ ] T019 [P] [US2] Create [ComponentName] Web Component in src/components/[component-name]/[component-name].js
- [ ] T020 [P] [US2] Create component styles in src/components/[component-name]/[component-name].css
- [ ] T021 [US2] Implement component logic and event handling
- [ ] T022 [US2] Add accessibility features (ARIA, keyboard support)
- [ ] T023 [US2] Integrate with User Story 1 components (if needed)
- [ ] T024 [US2] Create component documentation
- [ ] T025 [US2] Create usage example and validate manually

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Validation**: [How to verify this story works on its own - create example page/demo]

### Implementation for User Story 3

- [ ] T026 [P] [US3] Create [ComponentName] Web Component in src/components/[component-name]/[component-name].js
- [ ] T027 [P] [US3] Create component styles in src/components/[component-name]/[component-name].css
- [ ] T028 [US3] Implement component features
- [ ] T029 [US3] Add accessibility support
- [ ] T030 [US3] Create documentation and examples
- [ ] T031 [US3] Manual validation

**Checkpoint**: All user stories should now be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Documentation updates in docs/
- [ ] TXXX Code cleanup and refactoring
- [ ] TXXX Performance optimization across all stories
- [ ] TXXX Accessibility audit and improvements across all components
- [ ] TXXX Browser compatibility testing
- [ ] TXXX CSS theming enhancements
- [ ] TXXX Run quickstart.md validation
- [ ] TXXX Create comprehensive usage examples

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all component files for User Story 1 together:
Task: "Create [ComponentName] Web Component in src/components/[component-name]/[component-name].js"
Task: "Create component styles in src/components/[component-name]/[component-name].css"
Task: "Create component documentation in docs/components/[component-name].md"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Create example page and manually validate User Story 1
5. Demo component in browser if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Create example and manually validate → Demo (MVP!)
3. Add User Story 2 → Create example and manually validate → Demo
4. Add User Story 3 → Create example and manually validate → Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and manually verifiable
- Create examples for validation (NO automated tests per Constitution)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently via browser/demo
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
