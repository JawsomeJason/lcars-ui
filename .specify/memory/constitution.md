<!--
SYNC IMPACT REPORT - Constitution v1.0.0

VERSION CHANGE: NEW → 1.0.0
  Rationale: Initial constitution for lcars-ui project

PRINCIPLES ESTABLISHED:
  + I. Clean Code
  + II. Simple UX
  + III. Standards & Accessibility-Driven
  + IV. Minimal Dependencies

SECTIONS ADDED:
  + Technology Stack
  + Development Workflow

TEMPLATES REQUIRING UPDATES:
  ✅ plan-template.md - Constitution Check section aligned
  ✅ spec-template.md - No changes required (user story focus remains valid)
  ✅ tasks-template.md - Test tasks marked as superseded by constitution
  ✅ checklist-template.md - No changes required (generic template)
  ✅ agent-file-template.md - No changes required (auto-generated)

FOLLOW-UP TODOs: None

NOTES:
  - Testing explicitly forbidden in constitution (supersedes all other guidance)
  - Modern CSS features (grid, custom properties, container queries) are encouraged
  - Web Components are the standard for component architecture
-->

# lcars-ui Constitution

## Core Principles

### I. Clean Code

**MUST** write semantic, readable, and maintainable code that prioritizes clarity over cleverness.

- Code MUST be self-documenting with meaningful names for variables, functions, and components
- Functions and components MUST do one thing well (Single Responsibility Principle)
- Avoid deeply nested structures; refactor when nesting exceeds 3 levels
- Use modern JavaScript features (ES6+) that improve readability (destructuring, spread, optional chaining)
- Comments MUST explain "why", not "what" - the code itself should explain what it does
- Magic numbers and strings MUST be replaced with named constants

**Rationale**: Clean code reduces cognitive load, accelerates onboarding, and minimizes bugs. In a UI library where components will be reused and extended, clarity is paramount.

### II. Simple UX

**MUST** prioritize user experience simplicity and intuitive interactions over feature complexity.

- Every component MUST have a clear, singular purpose
- APIs (component interfaces) MUST be intuitive and require minimal configuration for common use cases
- Visual design MUST follow established UI patterns; avoid reinventing interaction paradigms
- Progressive enhancement: components MUST work with basic functionality first, then layer enhancements
- Reduce user cognitive load: fewer choices, clearer affordances
- Performance is UX: components MUST render quickly and respond immediately

**Rationale**: Simple UX leads to higher adoption, fewer support questions, and more successful implementations. LCARS aesthetic should enhance, not complicate, user interactions.

### III. Standards & Accessibility-Driven

**MUST** adhere to web standards and ensure accessibility for all users (NON-NEGOTIABLE).

- All components MUST be built with semantic HTML5 elements
- WCAG 2.1 Level AA compliance is MANDATORY:
  - Proper ARIA labels, roles, and properties where semantic HTML is insufficient
  - Keyboard navigation MUST work for all interactive elements
  - Color contrast ratios MUST meet WCAG requirements
  - Focus indicators MUST be visible and clear
- Use Web Components standards (Custom Elements, Shadow DOM, Templates) correctly
- Progressive Web App standards where applicable (responsive, offline-capable when sensible)
- Test with assistive technologies (screen readers, keyboard-only navigation)

**Rationale**: Web standards ensure longevity and broad compatibility. Accessibility is both a legal requirement and moral imperative—everyone deserves access to digital interfaces.

### IV. Minimal Dependencies

**MUST** minimize external dependencies to reduce complexity, security surface, and maintenance burden.

- NO framework dependencies (React, Vue, Angular, etc.) - use vanilla JavaScript and Web Components
- NO CSS frameworks (Bootstrap, Tailwind, etc.) - write custom CSS
- Build tools MUST be limited to essential development tooling only (linters, formatters, bundlers)
- Evaluate every new dependency with these questions:
  - Can this be implemented in vanilla JS/CSS in reasonable time?
  - What is the maintenance burden and security track record?
  - What is the bundle size impact?
- Document and justify any dependency additions in implementation plans
- Prefer Web Platform APIs over third-party abstractions

**Rationale**: Every dependency is a potential breaking change, security vulnerability, and compatibility issue. Vanilla web technologies are mature, fast, and maintained by browser vendors. Minimal dependencies maximize longevity and reduce supply chain risk.

## Technology Stack

**REQUIRED Technologies (NON-NEGOTIABLE)**:

- **HTML5**: Semantic markup, custom elements via Web Components
- **CSS**: Modern, standards-compliant stylesheets
  - CSS Grid for layouts
  - CSS Custom Properties (variables) for theming
  - Container Queries for responsive components
  - CSS Nesting, `:has()`, and other modern features are ENCOURAGED
  - Flexbox, transforms, animations, transitions as needed
- **JavaScript (ES6+)**: Modern vanilla JavaScript
  - Web Components API (Custom Elements v1, Shadow DOM, HTML Templates)
  - Modules (ESM) for code organization
  - No transpilation required for modern browsers; optional for legacy support
- **Web Components**: Standard for all reusable UI components

**FORBIDDEN**:

- JavaScript frameworks (React, Vue, Angular, Svelte, etc.)
- CSS frameworks (Bootstrap, Tailwind, Foundation, etc.)
- jQuery or similar DOM manipulation libraries
- Preprocessors (Sass, Less, Stylus) unless justified for complex theming scenarios

**Development Tools (Acceptable)**:

- Linters (ESLint for JS, Stylelint for CSS)
- Formatters (Prettier)
- Bundlers (esbuild, Vite) for development and distribution
- Development servers with live reload

## Development Workflow

### No Testing Policy (SUPERSEDES ALL OTHER GUIDANCE)

**Testing is explicitly FORBIDDEN for this project.**

- NO unit tests
- NO integration tests
- NO end-to-end tests
- NO test frameworks or test files
- Any guidance in templates or other documents that references testing MUST BE IGNORED

**Rationale**: Project decision based on scope, resources, and rapid prototyping needs. Validation occurs through usage and manual verification.

**CRITICAL**: This policy supersedes any testing-related guidance in plan-template.md, tasks-template.md, or any other project documentation.

### Implementation Standards

- Features MUST follow the spec → plan → implement workflow documented in project templates
- All features MUST have user stories with acceptance criteria (see spec-template.md)
- Components MUST be documented with usage examples
- Code MUST pass linter checks before commit
- Commit messages MUST be clear and follow conventional commits format when possible

### Code Review Expectations

- Code reviews MUST verify compliance with all four core principles
- Reviewers MUST check for accessibility compliance (WCAG 2.1 AA)
- Reviewers MUST question any proposed dependencies
- Reviewers MUST ensure code is clean, readable, and maintainable

### Amendment Process

- Constitution changes require explicit documentation of rationale
- All templates MUST be updated to reflect constitutional changes
- Version number MUST be incremented following semantic versioning:
  - **MAJOR**: Breaking changes to principles or forbidden technologies
  - **MINOR**: New principles added or significant expansions
  - **PATCH**: Clarifications, wording improvements, non-semantic changes

## Governance

This constitution is the SUPREME authority for all development decisions in the lcars-ui project. When conflicts arise between this document and any other guidance, templates, or documentation, the constitution prevails.

All implementation plans, feature specifications, and task lists MUST verify compliance with constitutional principles before proceeding with development. Violations of core principles MUST be justified in writing with documented alternatives considered and rejected.

The constitution is a living document and may be amended following the process outlined above. All amendments MUST be tracked with version history and sync impact reports.

**Version**: 1.0.0 | **Ratified**: 2025-11-07 | **Last Amended**: 2025-11-07
