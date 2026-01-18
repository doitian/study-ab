# Data Model: BFT Algorithm Learning Path

**Date**: 2026-01-18  
**Phase**: 1 - Design  
**Status**: Complete

## Overview

This document defines the core entities and their relationships for the BFT Algorithm Learning Path. The data model supports a modular, self-paced learning experience with progressive complexity, checkpoints, and multiple resource types.

---

## Entity Definitions

### 1. LearningPath

The top-level container representing the complete BFT learning journey.

**Attributes**:
- `id`: string (unique identifier, e.g., "bft-algorithm-learning-path")
- `title`: string ("BFT Algorithm Learning Path")
- `description`: string (overview of the learning path)
- `version`: string (semantic version, e.g., "1.0.0")
- `estimatedHours`: integer (10-15 hours)
- `prerequisites`: array of strings (required background knowledge)
- `modules`: array of Module references (ordered list)
- `lastUpdated`: date

**Relationships**:
- Has many: `Module` (1 to 5)
- Has one: `Glossary`
- Has one: `ResourceLibrary`

**Validation Rules**:
- Modules must be ordered by priority and dependency
- Prerequisites must be clearly stated
- Total estimated hours = sum of module hours

**Example**:
```json
{
  "id": "bft-algorithm-learning-path",
  "title": "BFT Algorithm Learning Path",
  "version": "1.0.0",
  "estimatedHours": 12,
  "prerequisites": [
    "Basic understanding of distributed systems",
    "Familiarity with network communication",
    "Knowledge of basic consensus concepts"
  ],
  "modules": ["module-01-foundation", "module-02-pbft", ...]
}
```

---

### 2. Module

A self-contained learning unit covering one major topic (e.g., "PBFT", "HotStuff 2.0").

**Attributes**:
- `id`: string (e.g., "module-01-foundation")
- `number`: integer (1-5, for ordering)
- `title`: string (e.g., "Foundation: Byzantine Fault Tolerance Fundamentals")
- `priority`: enum (P1, P2, P3, P4) - from spec priorities
- `description`: string (module overview)
- `learningObjectives`: array of strings (specific, measurable outcomes)
- `prerequisites`: array of string or Module references
- `estimatedHours`: float (2-4 hours per module)
- `concepts`: array of Concept references
- `exercises`: array of Exercise references
- `resources`: array of Resource references
- `checkpoint`: Checkpoint reference
- `nextModule`: Module reference (nullable for last module)
- `status`: enum (draft, review, published)

**Relationships**:
- Belongs to: `LearningPath`
- Has many: `Concept` (5-10 per module)
- Has many: `Exercise` (2-5 per module)
- Has many: `Resource` (3-8 per module)
- Has one: `Checkpoint`
- Has one (optional): `Module` as next module

**Validation Rules**:
- Prerequisites must reference existing modules or prerequisite knowledge
- Learning objectives must be specific and measurable
- Each module must have at least one checkpoint
- Estimated hours must be realistic (2-4 hours typical)

**State Transitions**:
```
draft → review → published
```

**Example**:
```json
{
  "id": "module-03-hotstuff",
  "number": 3,
  "title": "HotStuff 2.0 Deep Dive",
  "priority": "P1",
  "description": "Understand modern BFT consensus through HotStuff 2.0",
  "learningObjectives": [
    "Explain HotStuff's two-phase protocol",
    "Compare HotStuff to PBFT communication complexity",
    "Trace a HotStuff consensus round"
  ],
  "prerequisites": ["module-02-pbft"],
  "estimatedHours": 3.0,
  "concepts": ["hotstuff-protocol", "linear-complexity", "responsiveness"],
  "checkpoint": "checkpoint-03-hotstuff"
}
```

---

### 3. Concept

A specific idea, principle, or topic to be learned within a module.

**Attributes**:
- `id`: string (e.g., "byzantine-generals-problem")
- `name`: string (display name, e.g., "Byzantine Generals Problem")
- `definition`: string (concise explanation, 1-2 sentences)
- `detailedExplanation`: markdown string (full explanation with examples)
- `visualAids`: array of VisualAid references
- `relatedConcepts`: array of Concept references
- `difficultyLevel`: enum (beginner, intermediate, advanced)
- `tags`: array of strings (e.g., ["foundational", "safety", "consensus"])

**Relationships**:
- Belongs to: `Module`
- Has many: `VisualAid` (diagrams, animations)
- References many: `Concept` (related concepts)

**Validation Rules**:
- Definition must be clear and concise (<200 characters)
- Detailed explanation must include at least one example
- Visual aids recommended for complex concepts

**Example**:
```json
{
  "id": "byzantine-generals-problem",
  "name": "Byzantine Generals Problem",
  "definition": "A thought experiment illustrating the challenge of reaching consensus when some participants may be faulty or malicious.",
  "difficultyLevel": "beginner",
  "tags": ["foundational", "motivation", "fault-tolerance"],
  "relatedConcepts": ["crash-faults", "byzantine-faults", "consensus"]
}
```

---

### 4. Exercise

A practical activity to reinforce learning (thought experiment, protocol trace, comparison).

**Attributes**:
- `id`: string (e.g., "exercise-pbft-trace-4nodes")
- `title`: string (e.g., "Trace PBFT with 4 Nodes")
- `type`: enum (thought-experiment, protocol-trace, comparison-table, fill-in-blank, interactive-simulation)
- `description`: string (what the learner should do)
- `difficulty`: enum (easy, medium, hard)
- `estimatedMinutes`: integer (5-30 minutes)
- `prompt`: markdown string (the actual exercise question/scenario)
- `solution`: markdown string (expandable answer)
- `hints`: array of strings (progressive hints)
- `requiredConcepts`: array of Concept references

**Relationships**:
- Belongs to: `Module`
- Requires: `Concept` (one or more)

**Validation Rules**:
- Prompt must be clear and unambiguous
- Solution must be thorough but concise
- Hints should guide without giving away the answer
- Interactive simulations must degrade gracefully without JavaScript

**Example**:
```json
{
  "id": "exercise-pbft-trace-4nodes",
  "title": "Trace PBFT Protocol with 4 Nodes",
  "type": "protocol-trace",
  "difficulty": "medium",
  "estimatedMinutes": 20,
  "prompt": "Given 4 replicas (f=1), trace a PBFT consensus round...",
  "requiredConcepts": ["pbft-three-phase", "quorum-2f-plus-1"]
}
```

---

### 5. Checkpoint

A self-assessment point where learners verify understanding before proceeding.

**Attributes**:
- `id`: string (e.g., "checkpoint-01-foundation")
- `moduleId`: string (reference to parent module)
- `title`: string (e.g., "Foundation Checkpoint: Byzantine Fault Tolerance Basics")
- `questions`: array of CheckpointQuestion
- `passingCriteria`: string (e.g., "Answer 3 out of 4 questions correctly")
- `feedback`: object mapping question results to guidance

**Relationships**:
- Belongs to: `Module` (one-to-one)
- Has many: `CheckpointQuestion` (3-5 questions)

**Validation Rules**:
- Minimum 3 questions per checkpoint
- Questions should cover key module concepts
- Feedback must provide guidance, not just "correct/incorrect"

**Example**:
```json
{
  "id": "checkpoint-01-foundation",
  "moduleId": "module-01-foundation",
  "title": "Foundation Checkpoint",
  "questions": [
    {
      "id": "q1",
      "question": "Can a BFT system with 3f+1 replicas tolerate f Byzantine failures?",
      "type": "multiple-choice",
      "options": ["Yes", "No", "Only if f < n/3"],
      "correctAnswer": "Yes",
      "explanation": "3f+1 configuration ensures safety and liveness..."
    }
  ],
  "passingCriteria": "3 out of 4 correct"
}
```

---

### 6. Resource

External or internal learning material (articles, papers, videos, implementations).

**Attributes**:
- `id`: string (e.g., "resource-hotstuff-article")
- `title`: string (e.g., "HotStuff 2.0 Article")
- `type`: enum (article, paper, video, implementation, book, course)
- `url`: string (primary link)
- `fallbackUrls`: array of strings (archive.org, PDF mirrors)
- `authors`: array of strings
- `publicationDate`: date
- `accessLevel`: enum (free, academic, paid)
- `estimatedReadTime`: integer (minutes)
- `isCached`: boolean (whether we have a local copy)
- `summary`: string (what the resource covers)
- `relevantSections`: array of strings (if only parts are relevant)

**Relationships**:
- Belongs to: `Module` (many-to-many, resources can be shared)
- Belongs to: `ResourceLibrary`

**Validation Rules**:
- Must have at least one valid URL
- Cached resources must be properly attributed
- Estimated read time should be realistic

**Example**:
```json
{
  "id": "resource-hotstuff-article",
  "title": "HotStuff 2",
  "type": "article",
  "url": "https://decentralizedthoughts.github.io/2023-04-01-hotstuff-2/",
  "fallbackUrls": [
    "https://web.archive.org/web/...",
    "/resources/cached-articles/hotstuff-2.md"
  ],
  "authors": ["Ittai Abraham", "Dahlia Malkhi"],
  "publicationDate": "2023-04-01",
  "accessLevel": "free",
  "estimatedReadTime": 25,
  "isCached": true
}
```

---

### 7. VisualAid

Diagrams, animations, or interactive visualizations to support concept learning.

**Attributes**:
- `id`: string (e.g., "diagram-pbft-sequence")
- `title`: string (e.g., "PBFT Three-Phase Sequence Diagram")
- `type`: enum (mermaid-diagram, d3-visualization, svg-static, vega-chart)
- `source`: string (file path or inline code)
- `altText`: string (accessibility description)
- `caption`: string (display caption)
- `interactionType`: enum (static, hover-reveal, click-through, full-interactive)
- `concepts`: array of Concept references (what this visualizes)

**Relationships**:
- Supports: `Concept` (many-to-many)
- Belongs to: `Module`

**Validation Rules**:
- Alt text required for accessibility (WCAG 2.1 AA)
- Interactive visualizations must have keyboard navigation
- SVG diagrams must include `<title>` and `<desc>` elements

**Example**:
```json
{
  "id": "diagram-pbft-sequence",
  "title": "PBFT Three-Phase Sequence Diagram",
  "type": "mermaid-diagram",
  "source": "/diagrams/mermaid/pbft-flow.mmd",
  "altText": "Sequence diagram showing PBFT pre-prepare, prepare, and commit phases between client, primary, and 3 replicas",
  "interactionType": "static",
  "concepts": ["pbft-three-phase", "quorum-2f-plus-1"]
}
```

---

### 8. Glossary

A centralized definition repository for all technical terms.

**Attributes**:
- `terms`: array of GlossaryTerm

**GlossaryTerm**:
- `id`: string (e.g., "term-byzantine-fault")
- `term`: string (e.g., "Byzantine Fault")
- `definition`: string (concise explanation)
- `aliases`: array of strings (e.g., ["Byzantine failure", "arbitrary failure"])
- `relatedTerms`: array of string (IDs of related terms)
- `sourceModule`: Module reference (where first introduced)

**Validation Rules**:
- Definitions must be concise (<150 words)
- No circular references in related terms
- Aliases should be searchable

**Example**:
```json
{
  "id": "term-byzantine-fault",
  "term": "Byzantine Fault",
  "definition": "A type of failure in distributed systems where a component exhibits arbitrary behavior, including sending conflicting information to different parts of the system.",
  "aliases": ["Byzantine failure", "arbitrary failure"],
  "relatedTerms": ["crash-fault", "omission-fault", "bft"],
  "sourceModule": "module-01-foundation"
}
```

---

## Entity Relationships Diagram

```
LearningPath
├── Module (1..5)
│   ├── Concept (5..10)
│   │   └── VisualAid (0..*)
│   ├── Exercise (2..5)
│   ├── Resource (3..8)
│   └── Checkpoint (1)
│       └── CheckpointQuestion (3..5)
├── Glossary
│   └── GlossaryTerm (20..50)
└── ResourceLibrary
    └── Resource (10..30)
```

---

## Data Flow

### Learner Journey Flow

```
1. Read LearningPath overview
   ↓
2. Check prerequisites
   ↓
3. Select Module (in order or skip if prerequisites met)
   ↓
4. Study Concepts (with VisualAids)
   ↓
5. Complete Exercises (with hints/solutions)
   ↓
6. Read Resources (optional depth)
   ↓
7. Complete Checkpoint (self-assessment)
   ↓
8. Review feedback, revisit if needed
   ↓
9. Proceed to next Module or finish
```

### Content Creation Flow

```
1. Define Module (title, objectives, prerequisites)
   ↓
2. Identify Concepts (key topics to cover)
   ↓
3. Create VisualAids (diagrams, interactive elements)
   ↓
4. Write Concept explanations (with examples)
   ↓
5. Design Exercises (practice activities)
   ↓
6. Curate Resources (papers, articles, videos)
   ↓
7. Develop Checkpoint (assessment questions)
   ↓
8. Peer review and iterate
   ↓
9. Publish Module
```

---

## State Management

### Module Lifecycle

| State | Description | Allowed Transitions |
|-------|-------------|---------------------|
| `draft` | Initial creation, content incomplete | → review |
| `review` | Under peer review, content complete | → draft, → published |
| `published` | Live and accessible to learners | → review (for updates) |

### Learner Progress (Future Enhancement)

*Not in MVP scope, but designed for extensibility*

If learner progress tracking is added later, the data model supports:
- `LearnerProfile` (ID, progress per module)
- `ModuleProgress` (status: not-started, in-progress, completed)
- `CheckpointResult` (score, timestamp, attempt number)

---

## Validation Summary

**Cross-Entity Validation Rules**:
1. Module prerequisites must form a directed acyclic graph (no circular dependencies)
2. Total LearningPath estimated hours = sum of Module hours
3. All Concept references in Exercises must exist
4. Checkpoint questions must cover key module concepts
5. VisualAid source files must exist at specified paths
6. Resource fallback URLs must be valid and accessible

**Consistency Checks**:
- Module numbers must be sequential (1, 2, 3, 4, 5)
- Priority assignments must align with spec (Foundation=P1, Classical=P2, HotStuff=P1, Practical=P3, Advanced=P4)
- Learning objectives must be measurable (use action verbs: explain, trace, compare, identify)

---

## Schema Version

**Version**: 1.0.0  
**Last Updated**: 2026-01-18  
**Compatibility**: Designed for JSON Schema validation (see `/contracts/` directory)

---

## Next Steps

1. Implement JSON schemas in `/contracts/` directory
2. Create module content following this data model
3. Validate content against schemas
4. Implement MkDocs templates that consume this structure
