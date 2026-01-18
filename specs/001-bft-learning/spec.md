# Feature Specification: BFT Algorithm Learning Path

**Feature Branch**: `001-bft-learning`  
**Created**: 2026-01-18  
**Status**: Draft  
**Input**: User description: "Create a guidance to learn BFT algorithms starting from https://decentralizedthoughts.github.io/2023-04-01-hotstuff-2/"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Foundation Learning Journey (Priority: P1)

A learner with basic distributed systems knowledge wants to understand Byzantine Fault Tolerance fundamentals before diving into modern algorithms. They start with core concepts and progressively build understanding through structured content.

**Why this priority**: Without foundational understanding of BFT concepts, learners cannot comprehend advanced algorithms like HotStuff. This is the essential first step that enables all other learning.

**Independent Test**: Can be fully tested by a learner completing the foundational module and successfully explaining Byzantine Generals Problem, safety vs liveness properties, and the 2f+1/3f+1 threshold concepts in their own words.

**Acceptance Scenarios**:

1. **Given** a learner has no prior BFT knowledge, **When** they access the foundational learning module, **Then** they receive clear explanations of Byzantine failures, the Byzantine Generals Problem, and why BFT matters in distributed systems
2. **Given** a learner is studying BFT fundamentals, **When** they complete the foundation module, **Then** they understand the difference between safety and liveness properties and can identify these properties in consensus scenarios
3. **Given** a learner has completed foundational concepts, **When** they encounter the 3f+1 threshold, **Then** they can explain why this specific number is required for BFT consensus
4. **Given** a learner is working through examples, **When** they see concrete Byzantine failure scenarios (crash, omission, malicious), **Then** they can categorize failure types and understand their impact on consensus

---

### User Story 2 - Classical BFT Algorithm Understanding (Priority: P2)

A learner wants to understand how classical BFT algorithms work before studying modern improvements. They study PBFT (Practical Byzantine Fault Tolerance) as the foundational algorithm that introduced practical BFT consensus.

**Why this priority**: PBFT represents the breakthrough that made BFT practical and serves as the baseline for understanding improvements in modern algorithms like HotStuff. Understanding PBFT is essential for appreciating why HotStuff matters.

**Independent Test**: Can be tested by learner successfully tracing a PBFT consensus round through all phases (pre-prepare, prepare, commit) and explaining the purpose of each phase and the 2f+1 quorum requirements.

**Acceptance Scenarios**:

1. **Given** a learner understands BFT fundamentals, **When** they study PBFT algorithm, **Then** they learn the three-phase protocol structure and the role of primary/replica nodes
2. **Given** a learner is studying PBFT phases, **When** they trace a transaction through the protocol, **Then** they understand pre-prepare, prepare, and commit phases with corresponding message patterns
3. **Given** a learner examines PBFT's view change mechanism, **When** a primary node fails, **Then** they understand how the system recovers and elects a new primary
4. **Given** a learner completes PBFT study, **When** they analyze the algorithm's complexity, **Then** they recognize the O(n²) communication complexity limitation that motivates newer algorithms

---

### User Story 3 - HotStuff 2.0 Deep Dive (Priority: P1)

A learner who understands PBFT fundamentals studies HotStuff 2.0 through the provided article, understanding how it simplifies BFT consensus while maintaining safety and improving liveness.

**Why this priority**: HotStuff 2.0 represents the modern state-of-art in BFT consensus and is the primary learning objective specified in the feature description. This is the core destination of the learning path.

**Independent Test**: Can be tested by learner explaining HotStuff 2.0's two-phase protocol, comparing it to PBFT's three-phase approach, and demonstrating understanding through the article's examples and diagrams.

**Acceptance Scenarios**:

1. **Given** a learner has completed PBFT study, **When** they access the HotStuff 2.0 article at https://decentralizedthoughts.github.io/2023-04-01-hotstuff-2/, **Then** they can read and comprehend the article's content with proper context
2. **Given** a learner is studying HotStuff 2.0, **When** they compare it to PBFT, **Then** they understand how HotStuff achieves linear communication complexity (O(n)) vs PBFT's quadratic complexity (O(n²))
3. **Given** a learner examines HotStuff's phases, **When** they trace consensus flow, **Then** they understand the prepare and pre-commit phases with threshold signatures
4. **Given** a learner completes HotStuff 2.0 study, **When** they review the protocol's properties, **Then** they can articulate how it achieves responsiveness and simplifies view changes

---

### User Story 4 - Practical Application and Comparison (Priority: P3)

A learner wants to apply their knowledge through exercises and understand how BFT algorithms are used in real-world systems. They explore implementations and use cases to solidify understanding.

**Why this priority**: Practical application helps cement theoretical knowledge and connects abstract algorithms to concrete systems. This is valuable but not essential for understanding core concepts.

**Independent Test**: Can be tested by learner successfully identifying BFT algorithms in real blockchain systems (Tendermint, LibraBFT) and explaining the tradeoffs made in each implementation.

**Acceptance Scenarios**:

1. **Given** a learner understands HotStuff and PBFT, **When** they work through comparison exercises, **Then** they can enumerate key differences in communication patterns, complexity, and liveness guarantees
2. **Given** a learner explores real-world implementations, **When** they study Tendermint or LibraBFT, **Then** they recognize how these systems adapt HotStuff/PBFT principles
3. **Given** a learner completes practical exercises, **When** they analyze a BFT protocol specification, **Then** they can identify the consensus mechanism and explain its design choices

---

### User Story 5 - Advanced Topics and Ecosystem (Priority: P4)

A learner who has mastered the core concepts wants to explore advanced topics such as BFT variants, optimizations, and current research directions.

**Why this priority**: Advanced topics are optional enrichment for learners who want to go deeper. Not required for basic competency in BFT algorithms.

**Independent Test**: Can be tested by learner exploring optional advanced resources and explaining at least one optimization technique or variant algorithm.

**Acceptance Scenarios**:

1. **Given** a learner has completed core learning path, **When** they explore advanced topics, **Then** they can access resources on BFT variants (PoS BFT, optimistic BFT, etc.)
2. **Given** a learner studies optimizations, **When** they examine techniques like pipelining or sharding, **Then** they understand how these improve throughput while maintaining safety

---

### Edge Cases

- What happens when a learner has no distributed systems background? (Need prerequisites guidance)
- How does the system handle learners who want to jump directly to HotStuff without PBFT? (Can provide warning but allow non-linear paths)
- What if the linked article (decentralizedthoughts.github.io) becomes unavailable? (Should cache or provide alternative sources)
- How does learning path accommodate different learning speeds? (Self-paced with checkpoints)
- What if a learner gets stuck on a concept? (Need help resources, FAQs, or community links)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Learning path MUST start with foundational BFT concepts before advanced algorithms
- **FR-002**: Learning path MUST include the Byzantine Generals Problem as the motivating example
- **FR-003**: Learning path MUST cover PBFT as the classical BFT algorithm baseline
- **FR-004**: Learning path MUST include the HotStuff 2.0 article from https://decentralizedthoughts.github.io/2023-04-01-hotstuff-2/ as primary material for modern BFT
- **FR-005**: Learning path MUST explain safety and liveness properties in BFT context
- **FR-006**: Learning path MUST explain the 3f+1 and 2f+1 threshold requirements
- **FR-007**: Learning path MUST compare communication complexity between PBFT (O(n²)) and HotStuff (O(n))
- **FR-008**: Learning path MUST include visual aids, diagrams, or protocol traces where applicable
- **FR-009**: Learning path MUST provide clear progression from one module to the next
- **FR-010**: Learning path MUST include checkpoints or self-assessment opportunities
- **FR-011**: Learning path MUST distinguish between crash faults and Byzantine faults
- **FR-012**: Learning path MUST explain view change mechanisms in BFT protocols
- **FR-013**: Learning path SHOULD include references to real-world BFT implementations
- **FR-014**: Learning path SHOULD provide exercises or thought experiments for practice
- **FR-015**: Learning path SHOULD indicate prerequisites for each module

### Key Entities

- **Learning Module**: A self-contained unit covering one major topic (e.g., "BFT Fundamentals", "PBFT", "HotStuff 2.0")
- **Concept**: A specific idea or principle to be learned (e.g., "Byzantine Generals Problem", "Quorum", "Safety vs Liveness")
- **Resource**: External materials like articles, papers, or videos (e.g., the HotStuff 2.0 article)
- **Exercise**: A practical activity to reinforce learning (e.g., "Trace PBFT protocol with 4 nodes")
- **Assessment Checkpoint**: A point where learner can verify understanding before proceeding
- **Learning Path**: The complete sequence of modules from foundations to advanced topics
- **Prerequisite**: Required prior knowledge for a module (e.g., "Basic distributed systems" for BFT fundamentals)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Learner can explain the Byzantine Generals Problem and its significance within 5 minutes after completing foundations module
- **SC-002**: Learner can trace a complete PBFT consensus round with correct phase ordering after completing PBFT module
- **SC-003**: Learner can articulate at least 3 key differences between PBFT and HotStuff after completing HotStuff module
- **SC-004**: Learner can explain why HotStuff achieves O(n) communication complexity vs PBFT's O(n²) after completing comparison exercises
- **SC-005**: At least 80% of learners report understanding the HotStuff 2.0 article after completing the learning path
- **SC-006**: Learner can identify BFT consensus mechanisms in at least 2 real-world systems after completing practical application module
- **SC-007**: Learning path completion rate of at least 60% for learners who start the first module
- **SC-008**: Average learner satisfaction rating of 4.0/5.0 or higher for the overall learning experience

## Assumptions

- Learners have basic understanding of distributed systems concepts (nodes, networks, messages)
- Learners can access and read the linked HotStuff 2.0 article
- Learners are self-motivated and can work through content at their own pace
- External resources (decentralizedthoughts.github.io) remain accessible
- Learners have sufficient time to complete multi-hour learning modules

## Out of Scope

- Implementation code or programming exercises for BFT algorithms
- Setting up actual BFT networks or nodes
- Deep mathematical proofs of BFT properties
- Comprehensive coverage of all BFT variants and research papers
- Instructor-led courses or live teaching sessions
- Graded assessments or certifications
- Non-BFT consensus mechanisms (Raft, Paxos) except as brief comparisons
