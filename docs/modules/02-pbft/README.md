# Module 02: Classical BFT (PBFT)

**Priority**: P2 (Important)  
**Estimated Time**: 3-4 hours  
**Prerequisites**: Module 01 (Foundation)

---

## 📚 Learning Objectives

By the end of this module, you will be able to:

- [ ] **Trace** a complete PBFT consensus round through all three phases (pre-prepare, prepare, commit)
- [ ] **Explain** how quorum requirements (2f+1) ensure safety in each phase
- [ ] **Describe** the view change mechanism for recovering from a Byzantine primary
- [ ] **Identify** the O(n²) communication complexity limitation and why it matters

---

## 🔍 Prerequisites

Before starting this module, ensure you have completed:

- [x] **Module 01**: Foundation (BFT Fundamentals)
  - Byzantine Generals Problem
  - Fault models and Byzantine faults
  - Safety and liveness properties
  - 2f+1 quorum and 3f+1 replica requirements

**Missing prerequisites?** Return to [Module 01](../01-foundation/README.md).

---

## 📖 Module Content

This module explores PBFT (Practical Byzantine Fault Tolerance), the first BFT algorithm to achieve practical performance for real-world systems.

### 1. [PBFT Overview](overview.md)
Understand PBFT's place in BFT history and its core contribution: making Byzantine fault tolerance practical for real systems.

### 2. [Three-Phase Protocol](three-phase-protocol.md)
Learn how PBFT achieves consensus through three coordinated phases: pre-prepare, prepare, and commit.

### 3. [View Change Protocol](view-change.md)
Explore how PBFT recovers from primary failures using the view change mechanism to elect a new leader.

### 4. [Communication Complexity Analysis](complexity-analysis.md)
Understand why PBFT requires O(n²) messages per consensus round and the implications for scalability.

### 5. [Checkpoint Assessment](checkpoint.md)
Test your understanding with 5 questions covering the three-phase protocol, view changes, and complexity.

---

## 🎯 What You'll Master

After completing this module, you'll understand:

- **How** PBFT uses three phases to ensure total ordering and agreement
- **Why** 2f+1 quorums are required in prepare and commit phases
- **When** view changes are triggered and how they preserve safety
- **What** the O(n²) communication bottleneck means for PBFT's scalability

---

## ✅ Self-Assessment

Complete the [Checkpoint](checkpoint.md) to verify your understanding before moving to Module 03.

**Passing Criteria**: Answer at least 4 out of 5 questions correctly

---

## 🔑 Key Concepts Introduced

- [PBFT (Practical Byzantine Fault Tolerance)](../../resources/glossary.md#pbft-practical-byzantine-fault-tolerance)
- [Primary](../../resources/glossary.md#primary)
- [Replica](../../resources/glossary.md#replica)
- [Pre-Prepare](../../resources/glossary.md#pre-prepare)
- [Prepare](../../resources/glossary.md#prepare)
- [Commit](../../resources/glossary.md#commit)
- [View Number](../../resources/glossary.md#view-number)
- [View Change](../../resources/glossary.md#view-change)
- [Sequence Number](../../resources/glossary.md#sequence-number)
- [O(n²) Complexity](../../resources/glossary.md#on-complexity)

---

## 🗺️ Navigation

**Previous Module**: [Module 01 - Foundation](../01-foundation/README.md)  
**Next Module**: [Module 03 - HotStuff (Modern BFT)](../03-hotstuff/README.md)

**Resources**: [Glossary](../../resources/glossary.md) | [References](../../resources/references.md)

---

## 📝 Module Metadata

```json
{
  "id": "module-02-pbft",
  "number": 2,
  "title": "Classical BFT (PBFT)",
  "priority": "P2",
  "estimatedHours": 3.5,
  "prerequisites": ["module-01-foundation"],
  "learningObjectives": [
    "Trace PBFT consensus through three phases",
    "Explain quorum requirements in each phase",
    "Describe view change mechanism",
    "Identify O(n²) communication complexity"
  ],
  "concepts": [
    "pbft",
    "primary",
    "replica",
    "pre-prepare",
    "prepare",
    "commit",
    "view-number",
    "view-change",
    "sequence-number",
    "o-n-squared-complexity"
  ],
  "checkpoint": "checkpoint-02-pbft",
  "status": "published"
}
```

---

**Ready to begin?** Start with the [PBFT Overview](overview.md)!
