# Module 01: Foundation (BFT Fundamentals)

**Priority**: P1 (Core)  
**Estimated Time**: 2-3 hours  
**Prerequisites**: Basic understanding of distributed systems, network communication, and node failures

---

## 📚 Learning Objectives

By the end of this module, you will be able to:

- [ ] **Explain** the Byzantine Generals Problem and why it's fundamental to distributed consensus
- [ ] **Distinguish** between crash faults, omission faults, and Byzantine faults with concrete examples
- [ ] **Identify** safety properties ("nothing bad happens") vs. liveness properties ("something good happens")
- [ ] **Calculate** required quorum sizes (2f+1) and total replicas (3f+1) for Byzantine fault tolerance

---

## 🔍 Prerequisites

Before starting this module, ensure you:

- [ ] Understand basic distributed systems concepts (nodes, network communication, message passing)
- [ ] Know what a node failure means in a distributed system
- [ ] Are familiar with the concept of reaching agreement among multiple parties
- [ ] Have basic mathematical reasoning skills (simple algebra)

**Missing prerequisites?** Consult the [Prerequisites Guide](../../../../resources/prerequisites.md).

---

## 📖 Module Content

This module covers foundational concepts essential for understanding Byzantine Fault Tolerance:

### 1. [Byzantine Generals Problem](byzantine-generals.md)
Learn the classic thought experiment that defines the core challenge of Byzantine fault tolerance: achieving consensus when some participants may be malicious or faulty.

### 2. [Fault Models](fault-models.md)
Understand the spectrum of failures in distributed systems, from benign crash faults to arbitrary Byzantine faults.

### 3. [Safety and Liveness Properties](safety-liveness.md)
Explore the two fundamental correctness properties that every consensus protocol must satisfy.

### 4. [Threshold Requirements](thresholds.md)
Discover why BFT systems require 3f+1 replicas and 2f+1 quorums through mathematical reasoning and examples.

---

## 🎯 What You'll Master

After completing this module, you'll have a solid foundation to understand:

- **Why** Byzantine faults are harder to tolerate than crash faults
- **How** safety and liveness create a fundamental tradeoff in consensus
- **What** the minimum number of nodes needed for Byzantine fault tolerance is
- **When** different fault models are appropriate for different system requirements

---

## ✅ Self-Assessment

Complete the [Checkpoint](checkpoint.md) to verify your understanding before moving to Module 02.

**Passing Criteria**: Answer at least 3 out of 4 questions correctly

---

## 🔑 Key Concepts Introduced

- [Byzantine Fault](../../../../resources/glossary.md#byzantine-fault)
- [Byzantine Generals Problem](../../../../resources/glossary.md#byzantine-generals-problem)
- [Crash Fault](../../../../resources/glossary.md#crash-fault)
- [Omission Fault](../../../../resources/glossary.md#omission-fault)
- [Safety](../../../../resources/glossary.md#safety)
- [Liveness](../../../../resources/glossary.md#liveness)
- [Quorum](../../../../resources/glossary.md#quorum)
- [2f+1 Threshold](../../../../resources/glossary.md#2f1-threshold)
- [3f+1 Replicas](../../../../resources/glossary.md#3f1-replicas)

---

## 🗺️ Navigation

**Next Module**: [Module 02 - PBFT (Classical BFT)](../02-pbft/README.md)

**Resources**: [Glossary](../../../../resources/glossary.md) | [References](../../../../resources/references.md)

---

## 📝 Module Metadata

```json
{
  "id": "module-01-foundation",
  "number": 1,
  "title": "Foundation (BFT Fundamentals)",
  "priority": "P1",
  "estimatedHours": 2.5,
  "prerequisites": [],
  "learningObjectives": [
    "Explain the Byzantine Generals Problem",
    "Distinguish between crash, omission, and Byzantine faults",
    "Identify safety vs. liveness properties",
    "Calculate 2f+1 and 3f+1 thresholds"
  ],
  "concepts": [
    "byzantine-fault",
    "byzantine-generals-problem",
    "crash-fault",
    "omission-fault",
    "safety",
    "liveness",
    "quorum",
    "2f+1-threshold",
    "3f+1-replicas"
  ],
  "checkpoint": "checkpoint-01-foundation",
  "status": "published"
}
```

---

**Ready to begin?** Start with the [Byzantine Generals Problem](byzantine-generals.md)!
