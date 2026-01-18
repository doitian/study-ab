# Tasks: BFT Algorithm Learning Path

**Input**: Design documents from `/specs/001-bft-learning/`
**Prerequisites**: plan.md (✓), spec.md (✓), research.md (✓), data-model.md (✓), contracts/ (✓)

**Tests**: Not explicitly requested in the feature specification - focusing on content quality validation through manual review and accessibility audits.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each learning module.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

This is a documentation project with the following structure:
- **Documentation content**: `docs/modules/` (learning modules)
- **Static assets**: `docs/diagrams/`, `docs/exercises/`, `docs/resources/`
- **Configuration**: `mkdocs.yml`, `requirements.txt` at repository root
- **Specs**: `specs/001-bft-learning/` (design documents)

---

## Phase 1: Setup (Project Infrastructure)

**Purpose**: Initialize MkDocs project with required dependencies and basic structure

- [ ] T001 Create MkDocs project structure with Material theme in repository root
- [ ] T002 Initialize requirements.txt with MkDocs, Material theme, and pymdown-extensions
- [ ] T003 [P] Create mkdocs.yml configuration with navigation structure for 5 modules
- [ ] T004 [P] Setup docs/ directory structure with modules/, diagrams/, exercises/, resources/ subdirectories
- [ ] T005 [P] Configure pymdown-extensions in mkdocs.yml for admonitions, code highlighting, and collapsible sections
- [ ] T006 [P] Add Mermaid.js integration to mkdocs.yml for protocol diagrams
- [ ] T007 [P] Add KaTeX configuration to mkdocs.yml for mathematical notation
- [ ] T008 Create .gitignore for MkDocs build artifacts (site/ directory)
- [ ] T009 [P] Create docs/index.md as landing page with learning path overview
- [ ] T010 [P] Create docs/resources/glossary.md skeleton for technical terms
- [ ] T011 [P] Create docs/resources/references.md skeleton for academic papers and articles
- [ ] T012 [P] Create docs/resources/prerequisites.md from quickstart.md prerequisite checklist

**Checkpoint**: MkDocs project ready - can run `mkdocs serve` and see basic site structure

---

## Phase 2: Foundational (Shared Infrastructure)

**Purpose**: Core documentation infrastructure and resources that ALL modules depend on

**⚠️ CRITICAL**: No module implementation can begin until this phase is complete

- [ ] T013 Implement glossary in docs/resources/glossary.md with foundational BFT terms (Byzantine fault, crash fault, quorum, safety, liveness, consensus, 2f+1, 3f+1)
- [ ] T014 Populate docs/resources/references.md with curated BFT resources (Byzantine Generals paper, PBFT paper, HotStuff paper, Decentralized Thoughts article)
- [ ] T015 [P] Create cached copy of HotStuff 2.0 article in docs/resources/cached-articles/hotstuff-2-decentralized-thoughts.md with proper attribution
- [ ] T016 [P] Cache PDF copies of key papers in docs/resources/papers/ (Byzantine Generals, PBFT original paper)
- [ ] T017 Create base module template in docs/_templates/module-template.md with standard structure (README, learning objectives, prerequisites, checkpoint)
- [ ] T018 [P] Setup CSS customization in docs/stylesheets/custom.css for print-friendly and high-contrast modes
- [ ] T019 [P] Create accessibility metadata template with alt-text guidelines in docs/_templates/accessibility-checklist.md
- [ ] T020 Configure GitHub Pages deployment workflow in .github/workflows/deploy-docs.yml

**Checkpoint**: Foundation ready - module implementation can now begin in parallel

---

## Phase 3: User Story 1 - Foundation Learning Journey (Priority: P1) 🎯 MVP

**Goal**: Create foundational BFT concepts module that teaches Byzantine Generals Problem, fault models, safety/liveness, and threshold requirements

**Independent Test**: Learner with basic distributed systems knowledge can complete Module 01, pass checkpoint with 3/4 correct answers, and explain Byzantine Generals Problem, safety vs liveness, and 2f+1/3f+1 thresholds in their own words

### Implementation for User Story 1

- [ ] T021 [P] [US1] Create docs/modules/01-foundation/README.md with module overview, learning objectives, and prerequisites
- [ ] T022 [P] [US1] Create docs/modules/01-foundation/byzantine-generals.md explaining the Byzantine Generals Problem with concrete examples
- [ ] T023 [P] [US1] Create docs/modules/01-foundation/fault-models.md distinguishing crash faults, omission faults, and Byzantine faults
- [ ] T024 [P] [US1] Create docs/modules/01-foundation/safety-liveness.md explaining safety (nothing bad happens) and liveness (something good happens) properties
- [ ] T025 [P] [US1] Create docs/modules/01-foundation/thresholds.md explaining 2f+1 quorum and 3f+1 replicas requirements
- [ ] T026 [US1] Create Mermaid diagram in docs/diagrams/foundation/byzantine-scenario.mmd showing Byzantine failure scenarios
- [ ] T027 [US1] Create D3.js interactive Byzantine Generals visualization in docs/diagrams/foundation/byzantine-generals-interactive.js
- [ ] T028 [US1] Create SVG static diagram in docs/diagrams/foundation/threshold-visualization.svg showing 2f+1 and 3f+1 relationships
- [ ] T029 [US1] Add alt-text and accessibility descriptions to all Module 01 diagrams per docs/_templates/accessibility-checklist.md
- [ ] T030 [P] [US1] Create thought experiment exercise in docs/exercises/foundation/byzantine-scenarios.md with 3-4 scenarios
- [ ] T031 [P] [US1] Create threshold calculation exercise in docs/exercises/foundation/threshold-practice.md with examples
- [ ] T032 [US1] Create checkpoint in docs/modules/01-foundation/checkpoint.md with 4 assessment questions covering key concepts
- [ ] T033 [US1] Validate checkpoint against specs/001-bft-learning/contracts/checkpoint-schema.json
- [ ] T034 [US1] Create module metadata JSON in docs/modules/01-foundation/module.json and validate against specs/001-bft-learning/contracts/module-schema.json
- [ ] T035 [US1] Update docs/resources/glossary.md with terms introduced in Module 01
- [ ] T036 [US1] Peer review Module 01 content for technical accuracy and pedagogical clarity
- [ ] T037 [US1] Accessibility audit for Module 01 using axe DevTools (WCAG 2.1 AA compliance)

**Checkpoint**: Module 01 is fully functional, independently testable, and accessible - learner can complete foundation module successfully

---

## Phase 4: User Story 2 - Classical BFT Algorithm Understanding (Priority: P2)

**Goal**: Create PBFT module that teaches the three-phase protocol, view changes, and O(n²) communication complexity as baseline for understanding modern BFT

**Independent Test**: Learner who completed Module 01 can trace a complete PBFT consensus round through all three phases (pre-prepare, prepare, commit), explain quorum requirements, and identify the O(n²) communication complexity limitation

### Implementation for User Story 2

- [ ] T038 [P] [US2] Create docs/modules/02-pbft/README.md with module overview, learning objectives (trace PBFT protocol, explain view changes), and prerequisite (Module 01)
- [ ] T039 [P] [US2] Create docs/modules/02-pbft/overview.md introducing PBFT as the first practical BFT algorithm
- [ ] T040 [P] [US2] Create docs/modules/02-pbft/three-phase-protocol.md explaining pre-prepare, prepare, and commit phases with message patterns
- [ ] T041 [P] [US2] Create docs/modules/02-pbft/view-change.md explaining primary failure recovery and view change protocol
- [ ] T042 [P] [US2] Create docs/modules/02-pbft/complexity-analysis.md explaining O(n²) communication complexity and why it matters
- [ ] T043 [US2] Create Mermaid sequence diagram in docs/diagrams/pbft/three-phase-flow.mmd showing PBFT message flow with 4 replicas
- [ ] T044 [US2] Create Mermaid state diagram in docs/diagrams/pbft/replica-states.mmd showing replica state transitions
- [ ] T045 [US2] Create Vega-Lite chart in docs/diagrams/pbft/complexity-comparison.json comparing PBFT O(n²) with theoretical O(n) linear
- [ ] T046 [US2] Add alt-text and accessibility descriptions to all Module 02 diagrams
- [ ] T047 [P] [US2] Create protocol tracing exercise in docs/exercises/pbft/pbft-trace-4nodes.md with step-by-step PBFT round
- [ ] T048 [P] [US2] Create view change scenario exercise in docs/exercises/pbft/view-change-scenario.md with primary failure
- [ ] T049 [P] [US2] Create comparison table exercise in docs/exercises/pbft/pbft-vs-non-bft.md comparing PBFT with Raft/Paxos
- [ ] T050 [US2] Create checkpoint in docs/modules/02-pbft/checkpoint.md with 5 assessment questions covering three-phase protocol, view changes, and complexity
- [ ] T051 [US2] Validate checkpoint against specs/001-bft-learning/contracts/checkpoint-schema.json
- [ ] T052 [US2] Create module metadata JSON in docs/modules/02-pbft/module.json and validate against specs/001-bft-learning/contracts/module-schema.json
- [ ] T053 [US2] Update docs/resources/glossary.md with PBFT-specific terms (pre-prepare, prepare, commit, view change, primary, replica)
- [ ] T054 [US2] Add PBFT original paper and related resources to docs/resources/references.md
- [ ] T055 [US2] Peer review Module 02 content for technical accuracy (verify phase descriptions match PBFT paper)
- [ ] T056 [US2] Accessibility audit for Module 02 using axe DevTools

**Checkpoint**: Module 02 is fully functional and independently testable - learner can complete PBFT study and demonstrate understanding through protocol tracing

---

## Phase 5: User Story 3 - HotStuff 2.0 Deep Dive (Priority: P1)

**Goal**: Create HotStuff 2.0 module using the Decentralized Thoughts article as primary material, teaching two-phase protocol, linear complexity, and comparison with PBFT

**Independent Test**: Learner who completed Modules 01 and 02 can read and comprehend the HotStuff 2.0 article, explain the two-phase protocol, compare communication complexity with PBFT, and articulate responsiveness property

### Implementation for User Story 3

- [ ] T057 [P] [US3] Create docs/modules/03-hotstuff/README.md with module overview, learning objectives (explain HotStuff protocol, compare with PBFT), and prerequisites (Modules 01 and 02)
- [ ] T058 [P] [US3] Create docs/modules/03-hotstuff/article-guide.md as a guided reading companion for the Decentralized Thoughts HotStuff 2.0 article with section-by-section notes
- [ ] T059 [P] [US3] Create docs/modules/03-hotstuff/two-phase-protocol.md explaining prepare and pre-commit phases with threshold signatures
- [ ] T060 [P] [US3] Create docs/modules/03-hotstuff/comparison-pbft.md with side-by-side comparison of HotStuff vs PBFT (phases, complexity, view changes)
- [ ] T061 [P] [US3] Create docs/modules/03-hotstuff/responsiveness.md explaining responsiveness property and optimistic execution
- [ ] T062 [US3] Create Mermaid sequence diagram in docs/diagrams/hotstuff/two-phase-flow.mmd showing HotStuff message flow with leader and replicas
- [ ] T063 [US3] Create Mermaid diagram in docs/diagrams/hotstuff/hotstuff-vs-pbft-phases.mmd comparing phase structures side-by-side
- [ ] T064 [US3] Create Vega-Lite chart in docs/diagrams/hotstuff/complexity-linear.json visualizing O(n) linear communication complexity
- [ ] T065 [US3] Add alt-text and accessibility descriptions to all Module 03 diagrams
- [ ] T066 [P] [US3] Create protocol tracing exercise in docs/exercises/hotstuff/hotstuff-trace.md with step-by-step HotStuff consensus round
- [ ] T067 [P] [US3] Create comparison exercise in docs/exercises/hotstuff/hotstuff-pbft-comparison.md with fill-in table comparing algorithms
- [ ] T068 [P] [US3] Create threshold signature exercise in docs/exercises/hotstuff/threshold-signatures.md explaining how they reduce messages
- [ ] T069 [US3] Create checkpoint in docs/modules/03-hotstuff/checkpoint.md with 5 assessment questions covering two-phase protocol, comparison with PBFT, and responsiveness
- [ ] T070 [US3] Validate checkpoint against specs/001-bft-learning/contracts/checkpoint-schema.json
- [ ] T071 [US3] Create module metadata JSON in docs/modules/03-hotstuff/module.json and validate against specs/001-bft-learning/contracts/module-schema.json
- [ ] T072 [US3] Update docs/resources/glossary.md with HotStuff-specific terms (threshold signature, responsiveness, chained consensus)
- [ ] T073 [US3] Add HotStuff original paper and Decentralized Thoughts article to docs/resources/references.md with fallback URLs
- [ ] T074 [US3] Verify cached HotStuff 2.0 article in docs/resources/cached-articles/ is up-to-date and properly attributed
- [ ] T075 [US3] Peer review Module 03 content against Decentralized Thoughts article for accuracy
- [ ] T076 [US3] Accessibility audit for Module 03 using axe DevTools

**Checkpoint**: Module 03 is fully functional - learner can understand HotStuff 2.0 through guided article reading and demonstrate comprehension through comparison exercises

---

## Phase 6: User Story 4 - Practical Application and Comparison (Priority: P3)

**Goal**: Create practical application module with exercises, real-world BFT implementations (Tendermint, LibraBFT), and protocol analysis framework

**Independent Test**: Learner who completed Modules 01-03 can identify BFT algorithms in real blockchain systems (Tendermint, LibraBFT), enumerate key differences between PBFT and HotStuff, and explain design tradeoffs

### Implementation for User Story 4

- [ ] T077 [P] [US4] Create docs/modules/04-practical/README.md with module overview, learning objectives (identify real-world BFT, analyze implementations), and prerequisites (Modules 01-03)
- [ ] T078 [P] [US4] Create docs/modules/04-practical/exercises.md with comprehensive comparison exercises between PBFT and HotStuff
- [ ] T079 [P] [US4] Create docs/modules/04-practical/real-world-systems.md covering Tendermint and LibraBFT implementations
- [ ] T080 [P] [US4] Create docs/modules/04-practical/protocol-analysis.md with framework for analyzing BFT protocol specifications
- [ ] T081 [US4] Create comparison table in docs/diagrams/practical/algorithm-comparison.md with PBFT, HotStuff, Tendermint, and LibraBFT
- [ ] T082 [US4] Create decision tree diagram in docs/diagrams/practical/bft-selection-guide.mmd helping learners choose BFT algorithms for use cases
- [ ] T083 [US4] Add alt-text and accessibility descriptions to all Module 04 diagrams
- [ ] T084 [P] [US4] Create Tendermint analysis exercise in docs/exercises/practical/tendermint-analysis.md with documentation links
- [ ] T085 [P] [US4] Create LibraBFT analysis exercise in docs/exercises/practical/librabft-analysis.md comparing to HotStuff
- [ ] T086 [P] [US4] Create protocol specification exercise in docs/exercises/practical/protocol-identification.md with real blockchain whitepapers
- [ ] T087 [US4] Create checkpoint in docs/modules/04-practical/checkpoint.md with 4 questions on real-world implementations and tradeoffs
- [ ] T088 [US4] Validate checkpoint against specs/001-bft-learning/contracts/checkpoint-schema.json
- [ ] T089 [US4] Create module metadata JSON in docs/modules/04-practical/module.json and validate against specs/001-bft-learning/contracts/module-schema.json
- [ ] T090 [US4] Update docs/resources/references.md with Tendermint documentation, LibraBFT paper, and Hyperledger Fabric links
- [ ] T091 [US4] Peer review Module 04 content for accuracy of real-world implementation descriptions
- [ ] T092 [US4] Accessibility audit for Module 04 using axe DevTools

**Checkpoint**: Module 04 is fully functional - learner can apply BFT knowledge to analyze real-world systems and make informed comparisons

---

## Phase 7: User Story 5 - Advanced Topics and Ecosystem (Priority: P4)

**Goal**: Create advanced topics module with BFT variants, optimizations, and research directions for learners who want deeper exploration

**Independent Test**: Learner who completed core modules (01-03) can explore optional advanced resources and explain at least one optimization technique or variant algorithm

### Implementation for User Story 5

- [ ] T093 [P] [US5] Create docs/modules/05-advanced/README.md with module overview, learning objectives (explore variants and optimizations), and prerequisites (Modules 01-03)
- [ ] T094 [P] [US5] Create docs/modules/05-advanced/variants.md covering PoS BFT, optimistic BFT, and other variants
- [ ] T095 [P] [US5] Create docs/modules/05-advanced/optimizations.md explaining pipelining, sharding, and performance techniques
- [ ] T096 [P] [US5] Create docs/modules/05-advanced/research-directions.md with current BFT research topics and open problems
- [ ] T097 [US5] Create timeline diagram in docs/diagrams/advanced/bft-evolution.mmd showing BFT algorithm evolution from Byzantine Generals to modern variants
- [ ] T098 [US5] Create comparison chart in docs/diagrams/advanced/variant-comparison.json comparing different BFT variants
- [ ] T099 [US5] Add alt-text and accessibility descriptions to all Module 05 diagrams
- [ ] T100 [P] [US5] Create research paper reading guide in docs/exercises/advanced/paper-reading-guide.md with tips for navigating academic BFT papers
- [ ] T101 [P] [US5] Create optimization analysis exercise in docs/exercises/advanced/optimization-tradeoffs.md exploring performance vs. safety tradeoffs
- [ ] T102 [US5] Create optional checkpoint in docs/modules/05-advanced/checkpoint.md with 3 questions on variants and optimizations
- [ ] T103 [US5] Validate checkpoint against specs/001-bft-learning/contracts/checkpoint-schema.json
- [ ] T104 [US5] Create module metadata JSON in docs/modules/05-advanced/module.json and validate against specs/001-bft-learning/contracts/module-schema.json
- [ ] T105 [US5] Update docs/resources/references.md with advanced BFT papers (Fast-HotStuff, SBFT, Chained HotStuff)
- [ ] T106 [US5] Peer review Module 05 content for accuracy of advanced topics and research directions
- [ ] T107 [US5] Accessibility audit for Module 05 using axe DevTools

**Checkpoint**: Module 05 is complete and optional - advanced learners have resources for deeper exploration

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements and validation that affect all modules

- [ ] T108 [P] Create comprehensive GETTING-STARTED.md at repository root based on specs/001-bft-learning/quickstart.md
- [ ] T109 [P] Create README.md at repository root with learning path overview, quick start, and contribution guidelines
- [ ] T110 [P] Create LICENSE.md with CC BY-SA 4.0 license for educational content
- [ ] T111 [P] Create CONTRIBUTING.md with guidelines for content contributions and peer review process
- [ ] T112 Update mkdocs.yml navigation with all 5 modules and proper ordering
- [ ] T113 [P] Create learning-path.json metadata file at docs/learning-path.json and validate against specs/001-bft-learning/contracts/learning-path-schema.json
- [ ] T114 [P] Review all glossary terms for consistency and completeness across all modules in docs/resources/glossary.md
- [ ] T115 [P] Verify all references in docs/resources/references.md have primary URL and fallback URLs (archive.org, local cache)
- [ ] T116 Test all Mermaid diagrams render correctly with `mkdocs serve` across all modules
- [ ] T117 Test D3.js interactive visualizations work and have keyboard navigation
- [ ] T118 Test Vega-Lite charts render correctly and are accessible
- [ ] T119 [P] Verify all diagrams have proper alt-text and semantic HTML per WCAG 2.1 AA
- [ ] T120 [P] Test print-friendly CSS works correctly for offline study (browser Print to PDF)
- [ ] T121 [P] Cross-browser testing (Chrome, Firefox, Safari, Edge) on desktop and mobile
- [ ] T122 Verify mobile responsiveness for all module pages and diagrams
- [ ] T123 [P] Validate total bundle size is under 350KB with lazy-loading enabled
- [ ] T124 [P] Test progressive enhancement - verify content is readable without JavaScript
- [ ] T125 Test all module checkpoints function correctly (expandable answers, feedback messages)
- [ ] T126 Verify module progression flow - each module links correctly to next module
- [ ] T127 [P] Final accessibility audit across entire site using axe DevTools
- [ ] T128 [P] Final peer review of all technical content for accuracy
- [ ] T129 Verify all JSON schema validations pass for modules, checkpoints, and learning path
- [ ] T130 Test GitHub Pages deployment with .github/workflows/deploy-docs.yml
- [ ] T131 Run quickstart.md validation by having external learner follow getting started guide
- [ ] T132 [P] Create GitHub Discussions categories for Q&A, feedback, and community support
- [ ] T133 [P] Create issue templates for bug reports, content errors, and feature requests

**Checkpoint**: Learning path is complete, validated, accessible, and ready for learners

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup (Phase 1) completion - BLOCKS all user story modules
- **User Story Modules (Phases 3-7)**: All depend on Foundational (Phase 2) completion
  - Module 01 (US1, Phase 3): Can start after Foundational - No dependencies on other modules
  - Module 02 (US2, Phase 4): Can start after Foundational - Logically depends on Module 01 but independently testable
  - Module 03 (US3, Phase 5): Can start after Foundational - Logically depends on Modules 01 & 02 but independently testable
  - Module 04 (US4, Phase 6): Can start after Foundational - Logically depends on Modules 01-03 but independently testable
  - Module 05 (US5, Phase 7): Can start after Foundational - Logically depends on Modules 01-03 but independently testable
- **Polish (Phase 8)**: Depends on all desired modules being complete

### User Story Dependencies

- **User Story 1 (P1 - Module 01)**: Can start after Foundational - No dependencies on other stories
- **User Story 2 (P2 - Module 02)**: Can start after Foundational - Logically builds on US1 (learners need foundations) but content creation is independent
- **User Story 3 (P1 - Module 03)**: Can start after Foundational - Logically builds on US1 & US2 (learners need PBFT context) but content creation is independent
- **User Story 4 (P3 - Module 04)**: Can start after Foundational - Logically builds on US1-3 (learners need algorithm knowledge) but content creation is independent
- **User Story 5 (P4 - Module 05)**: Can start after Foundational - Logically builds on US1-3 (core modules) but content creation is independent

### Within Each User Story

- Module README and content pages can be created in parallel ([P] tasks)
- Diagrams depend on content understanding but can be created in parallel once content is drafted
- Exercises depend on concepts being defined but can be created in parallel
- Checkpoint depends on all module content being complete
- Metadata JSON and schema validation depend on module completion
- Peer review and accessibility audit are final validation steps per module

### Parallel Opportunities

- **Phase 1 (Setup)**: Tasks T003-T012 marked [P] can run in parallel (different configuration files)
- **Phase 2 (Foundational)**: Tasks T015-T019 marked [P] can run in parallel (different resource files)
- **Within Each Module**: 
  - Content creation (README, concept pages) can run in parallel
  - Diagram creation can run in parallel once content is clear
  - Exercise creation can run in parallel
- **Across Modules**: Once Phase 2 completes, all 5 modules (Phases 3-7) can be developed in parallel by different team members
- **Phase 8 (Polish)**: Many validation tasks marked [P] can run in parallel (different tools/concerns)

---

## Parallel Example: Module 01 (User Story 1)

```bash
# Launch all content creation for Module 01 together:
Task: "Create docs/modules/01-foundation/README.md with module overview"
Task: "Create docs/modules/01-foundation/byzantine-generals.md explaining Byzantine Generals Problem"
Task: "Create docs/modules/01-foundation/fault-models.md distinguishing fault types"
Task: "Create docs/modules/01-foundation/safety-liveness.md explaining properties"
Task: "Create docs/modules/01-foundation/thresholds.md explaining 2f+1 and 3f+1"

# After content is drafted, launch all diagram creation together:
Task: "Create Mermaid diagram byzantine-scenario.mmd"
Task: "Create SVG diagram threshold-visualization.svg"

# Launch all exercise creation together:
Task: "Create thought experiment exercise byzantine-scenarios.md"
Task: "Create threshold calculation exercise threshold-practice.md"
```

---

## Parallel Example: Multiple Modules

```bash
# After Phase 2 (Foundational) completes, launch all modules in parallel:

# Developer/Writer A: Module 01 (Foundation)
Task: "Create Module 01 content and exercises" (Tasks T021-T037)

# Developer/Writer B: Module 02 (PBFT)
Task: "Create Module 02 content and exercises" (Tasks T038-T056)

# Developer/Writer C: Module 03 (HotStuff)
Task: "Create Module 03 content and exercises" (Tasks T057-T076)

# Developer/Writer D: Module 04 (Practical)
Task: "Create Module 04 content and exercises" (Tasks T077-T092)

# Developer/Writer E: Module 05 (Advanced)
Task: "Create Module 05 content and exercises" (Tasks T093-T107)
```

---

## Implementation Strategy

### MVP First (Modules 01 & 03 Only - Core P1 Stories)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all modules)
3. Complete Phase 3: User Story 1 - Module 01 (Foundation)
4. Complete Phase 5: User Story 3 - Module 03 (HotStuff 2.0)
5. **STOP and VALIDATE**: Test that learners can go from Foundation → HotStuff with the Decentralized Thoughts article
6. Deploy/demo minimal viable learning path

**Rationale**: User Stories 1 and 3 are both P1 (core). A learner with distributed systems background can potentially go Foundation → HotStuff directly if they skim PBFT basics. This delivers core value: understanding HotStuff 2.0.

### Recommended Incremental Delivery (Priority Order)

1. Complete Setup + Foundational → Foundation ready
2. Add Module 01 (US1, P1) → Test independently → Deploy (Foundation complete!)
3. Add Module 02 (US2, P2) → Test independently → Deploy (PBFT baseline established)
4. Add Module 03 (US3, P1) → Test independently → Deploy (HotStuff 2.0 core delivered!)
5. Add Module 04 (US4, P3) → Test independently → Deploy (Practical application added)
6. Add Module 05 (US5, P4) → Test independently → Deploy (Complete advanced curriculum)
7. Complete Polish (Phase 8) → Final validation → Production release

**Rationale**: Follows priority order (P1 → P2 → P3 → P4), each module adds value, learners can start with earlier modules while later ones are in development.

### Parallel Team Strategy

With multiple content creators:

1. Team completes Setup + Foundational together (Phases 1-2)
2. Once Foundational is done:
   - Writer A: Module 01 (Foundation) - P1
   - Writer B: Module 02 (PBFT) - P2
   - Writer C: Module 03 (HotStuff) - P1
   - Writer D: Module 04 (Practical) - P3
   - Writer E: Module 05 (Advanced) - P4
3. Modules complete independently and integrate into learning path
4. Cross-review for consistency and flow
5. Polish phase validates entire learning path

---

## Notes

- [P] tasks = different files, no dependencies within same phase
- [Story] label maps task to specific user story (US1-US5) for traceability
- Each module (user story) should be independently completable and testable by learners
- Verify checkpoints work and provide useful feedback before considering module complete
- Commit after each task or logical group (e.g., all content pages for a module)
- Stop at any checkpoint to validate module independently with external reviewers
- Tests are manual validation (peer review, accessibility audits, schema validation) - no automated test code required for educational content
- Bundle size target: 350KB total with lazy-loading (Mermaid.js ~150KB, KaTeX ~100KB, D3.js ~50KB, custom CSS ~20KB, content ~30KB)
- Accessibility is non-negotiable: WCAG 2.1 AA compliance required for all modules
- Progressive enhancement: Content must be readable without JavaScript, enhanced with interactive elements where JS available
- All external resources must have fallback URLs and/or cached local copies
