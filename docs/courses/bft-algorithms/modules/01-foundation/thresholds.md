# Threshold Requirements: 2f+1 and 3f+1

Understanding **why** Byzantine Fault Tolerance requires specific quorum sizes (2f+1) and total replicas (3f+1) is fundamental to grasping BFT protocols. This section provides the mathematical intuition and practical reasoning behind these thresholds.

---

## The Core Question

**How many replicas do we need to tolerate f Byzantine faults while ensuring both safety and liveness?**

The answer: **3f+1 total replicas** with **2f+1 quorum size**.

Let's understand why.

---

## The 2f+1 Quorum Requirement

### Why Not a Simple Majority?

In crash fault-tolerant systems (like Raft), a **simple majority** (f+1 out of 2f+1) works:
- If f nodes crash, remaining f+1 form a majority
- Crashed nodes don't lie—they just stop

But Byzantine nodes can **lie**, **equivocate** (send different messages to different nodes), and **collude**.

### The Quorum Intersection Requirement

For safety, we need a critical property:

!!! note "Quorum Intersection Property"
    **Any two quorums must intersect in at least one honest node.**

**Why?** If two quorums make conflicting decisions, there must be at least one honest node in both quorums to detect the inconsistency.

### Mathematical Derivation

Let's say:
- Total replicas: **n**
- Byzantine faults tolerated: **f**
- Quorum size: **q**

**Requirement 1**: Two quorums must overlap
- Two quorums together have **2q** nodes (counting with overlap)
- Total nodes: **n**
- For overlap: **2q > n** (pigeonhole principle)
- Therefore: **q > n/2** (quorum must be a strict majority)

**Requirement 2**: Intersection must contain at least one honest node
- Two quorums overlap in at least **2q - n** nodes
- At most **f** nodes are Byzantine
- For guaranteed honest overlap: **2q - n > f**
- Simplifying: **2q > n + f**
- Therefore: **q > (n + f)/2**

**Combining with n = 3f+1** (we'll derive this next):
- q > (3f+1 + f)/2
- q > (4f+1)/2
- q > 2f + 0.5
- **q ≥ 2f+1** (smallest integer satisfying the inequality)

!!! success "Quorum Size: 2f+1"
    A quorum of **2f+1** nodes ensures:
    - At least **f+1 honest nodes** in every quorum (since at most f are Byzantine)
    - Any two quorums overlap in at least **f+1 nodes**, guaranteeing at least **1 honest node** overlap

---

## The 3f+1 Replica Requirement

### Why Not 2f+1 Total Replicas?

With 2f+1 total replicas and f Byzantine faults:
- At least **f+1 honest nodes**
- But this leaves **no room for quorum intersection**

**Example**: 2f+1 = 3 replicas, f = 1 Byzantine
- Quorum size needed: 2f+1 = 3 (all nodes!)
- If 1 node is Byzantine, we need all 3 to respond
- But we can't distinguish Byzantine from crashed → **deadlock**

### Derivation of 3f+1

We need enough replicas to satisfy two constraints simultaneously:

**Constraint 1 (Liveness)**: Can form a quorum even if f nodes are unresponsive
- Total nodes: n
- Unresponsive (crashed or Byzantine): f
- Reachable nodes: n - f
- For quorum formation: **n - f ≥ q**

**Constraint 2 (Safety)**: Quorum size must be 2f+1
- **q = 2f+1**

**Combining**:
- n - f ≥ 2f+1
- **n ≥ 3f+1**

Minimum value: **n = 3f+1**

!!! success "Total Replicas: 3f+1"
    **3f+1 total replicas** ensures:
    - **Liveness**: Even if f Byzantine nodes are unresponsive, 3f+1 - f = 2f+1 honest nodes can form a quorum
    - **Safety**: Quorum of 2f+1 guarantees at least f+1 honest nodes

---

## Visual Intuition

### Example: f=1 (Tolerate 1 Byzantine Fault)

**Total replicas**: 3f+1 = 3(1)+1 = **4 replicas**
**Quorum size**: 2f+1 = 2(1)+1 = **3 responses**

```
Scenario: 4 replicas (A, B, C, D), at most 1 Byzantine

Quorum 1: {A, B, C} ← 3 replicas
Quorum 2: {B, C, D} ← 3 replicas

Intersection: {B, C} ← 2 replicas

Honest nodes in intersection:
- At most 1 Byzantine across all 4 replicas
- Intersection has 2 nodes
- At least 2 - 1 = 1 honest node in intersection ✓
```

**Why this works**:
- If Byzantine node is A: Quorum 1 has {B, C} honest (2 honest), Quorum 2 has {B, C, D} honest (3 honest)
- If Byzantine node is B: Quorum 1 has {A, C} honest (2 honest), Quorum 2 has {C, D} honest (2 honest)
- Intersection always has at least 1 honest node to detect conflicts

### Example: f=2 (Tolerate 2 Byzantine Faults)

**Total replicas**: 3f+1 = 3(2)+1 = **7 replicas**
**Quorum size**: 2f+1 = 2(2)+1 = **5 responses**

```
Scenario: 7 replicas, at most 2 Byzantine

Quorum size: 5 out of 7
- At most 2 Byzantine in the entire system
- Each quorum has 5 replicas
- Guaranteed honest in each quorum: 5 - 2 = at least 3 honest ✓

Two quorums of size 5:
- Total: 5 + 5 = 10 nodes (with overlap)
- Replicas: 7
- Overlap: 10 - 7 = 3 nodes
- At most 2 Byzantine total → at least 3 - 2 = 1 honest in overlap ✓
```

---

## Why These Thresholds Are Tight (Optimal)

### Can We Do Better?

**Question**: Can we use fewer than 3f+1 replicas?

**Answer**: No. The Byzantine Generals Problem proves:
- **Fewer than 3f+1 replicas**: Consensus is **impossible**
- **3f+1 is the minimum** required for Byzantine fault tolerance

**Question**: Can we use a smaller quorum than 2f+1?

**Answer**: No. With smaller quorums:
- Two quorums might not intersect in an honest node
- Byzantine nodes could create conflicting decisions → **safety violation**

!!! warning "Impossibility Result"
    **Lamport, Shostak, and Pease (1982)** proved that consensus with f Byzantine faults requires **at least 3f+1 replicas**. This is a fundamental limit—no algorithm can do better.

---

## Practical Examples

### Example 1: Small Deployment (f=1)

**Requirement**: Tolerate 1 Byzantine fault
- **Total replicas**: 3(1)+1 = **4 nodes**
- **Quorum size**: 2(1)+1 = **3 responses**

**Scenario**: Banking system with 4 replicas (A, B, C, D)

1. Replica B is Byzantine (malicious or buggy)
2. Client requests: "Transfer $100"
3. Replicas A, C, D are honest and agree
4. Replica B tries to send conflicting values
5. Quorum of 3 includes at least 2 honest replicas (A, C, D) → correct decision

**Liveness check**: Even if B is unresponsive, 3 honest replicas (A, C, D) can form quorum ✓

### Example 2: Medium Deployment (f=2)

**Requirement**: Tolerate 2 Byzantine faults
- **Total replicas**: 3(2)+1 = **7 nodes**
- **Quorum size**: 2(2)+1 = **5 responses**

**Scenario**: Blockchain with 7 validators

1. Validators 2 and 5 are compromised (Byzantine)
2. Client proposes block
3. Honest validators: 1, 3, 4, 6, 7 (5 honest)
4. Quorum of 5 needed → can include up to 2 Byzantine, but at least 3 honest
5. Majority within quorum ensures correct block

**Liveness check**: Even if 2 Byzantine nodes don't respond, 5 honest validators can form quorum ✓

### Example 3: Large Deployment (f=10)

**Requirement**: Tolerate 10 Byzantine faults
- **Total replicas**: 3(10)+1 = **31 nodes**
- **Quorum size**: 2(10)+1 = **21 responses**

**Scenario**: Decentralized network (e.g., consortium blockchain)

- **Cost**: 31 replicas needed (expensive!)
- **Benefit**: Can tolerate up to 10 malicious/faulty nodes
- **Quorum**: Need 21 out of 31 to agree (67.7% supermajority)

!!! tip "Cost of BFT"
    Byzantine fault tolerance is expensive:
    - **3× more replicas** than crash fault tolerance (3f+1 vs. 2f+1)
    - **Higher communication overhead** (larger quorums)
    - Trade-off: Security vs. efficiency

---

## Comparison: Crash Faults vs. Byzantine Faults

| Aspect | Crash Fault Tolerance | Byzantine Fault Tolerance |
|--------|----------------------|---------------------------|
| **Total replicas** | 2f+1 | **3f+1** |
| **Quorum size** | f+1 (simple majority) | **2f+1** (supermajority) |
| **Example (f=1)** | 3 replicas, 2 quorum | **4 replicas, 3 quorum** |
| **Example (f=2)** | 5 replicas, 3 quorum | **7 replicas, 5 quorum** |
| **Tolerance** | Nodes stop (crash) | Nodes lie, equivocate, collude |
| **Overhead** | Lower | **Higher (3× replicas, larger quorums)** |

---

## Thought Experiments

!!! question "Exercise 1: Calculate Thresholds"
    For each f, calculate total replicas (3f+1) and quorum size (2f+1):
    
    1. f = 3 (tolerate 3 Byzantine faults)
    2. f = 5 (tolerate 5 Byzantine faults)
    3. f = 33 (tolerate 33 Byzantine faults)
    
    <details>
    <summary>Solutions</summary>
    
    1. **f=3**: 
       - Total replicas: 3(3)+1 = **10**
       - Quorum size: 2(3)+1 = **7**
    
    2. **f=5**:
       - Total replicas: 3(5)+1 = **16**
       - Quorum size: 2(5)+1 = **11**
    
    3. **f=33**:
       - Total replicas: 3(33)+1 = **100**
       - Quorum size: 2(33)+1 = **67** (67% supermajority)
    
    </details>

!!! question "Exercise 2: Why Not 3f Replicas?"
    Suppose we try to use only **3f replicas** instead of 3f+1 to tolerate f Byzantine faults.
    
    **Question**: What goes wrong?
    
    <details>
    <summary>Hint</summary>
    
    With 3f replicas and quorum size 2f+1, what happens if f nodes are unresponsive?
    
    </details>
    
    <details>
    <summary>Solution</summary>
    
    With **3f replicas**:
    - Quorum size: 2f+1 (required for safety)
    - If f nodes are unresponsive: only 3f - f = 2f nodes available
    - **Cannot form quorum**: 2f < 2f+1
    - **Liveness violation**: System halts even though we're supposed to tolerate f faults
    
    **Lesson**: 3f+1 is the **minimum** to satisfy both safety and liveness. With 3f, liveness fails.
    
    </details>

!!! question "Exercise 3: Quorum Intersection"
    Given 7 replicas (n=7) and f=2 Byzantine faults:
    
    1. What is the quorum size?
    2. Show two different quorums and their intersection.
    3. Prove the intersection contains at least one honest node.
    
    <details>
    <summary>Solution</summary>
    
    1. **Quorum size**: 2f+1 = 2(2)+1 = **5**
    
    2. **Two quorums**:
       - Quorum 1: {A, B, C, D, E}
       - Quorum 2: {C, D, E, F, G}
       - **Intersection**: {C, D, E} (3 nodes)
    
    3. **Honest node in intersection**:
       - Total replicas: 7
       - Byzantine faults: at most 2
       - Honest replicas: at least 7 - 2 = 5
       - Intersection size: 3
       - **Worst case**: 2 Byzantine nodes could be in intersection
       - **Guaranteed honest**: 3 - 2 = **at least 1 honest node** ✓
    
    **Lesson**: Quorum intersection ensures honest overlap, enabling conflict detection.
    
    </details>

---

## Key Takeaways

- **3f+1 replicas** are required to tolerate f Byzantine faults (fundamental limit)
- **2f+1 quorum** ensures safety through guaranteed honest majority
- **Quorum intersection** guarantees at least one honest node overlap for conflict detection
- **BFT is expensive**: 3× more replicas than crash fault tolerance
- **Thresholds are tight**: Cannot do better without sacrificing safety or liveness

---

## Related Concepts

- [Byzantine Generals Problem](byzantine-generals.md) - Proves 3f+1 is necessary
- [Quorum](../../../../resources/glossary.md#quorum) - Formal definition
- [Quorum Intersection](../../../../resources/glossary.md#quorum-intersection) - Detailed explanation
- [f (Fault Tolerance Parameter)](../../../../resources/glossary.md#f-fault-tolerance-parameter) - Role of f in protocols

---

## 🗺️ Navigation

**Previous**: [Safety and Liveness](safety-liveness.md)  
**Next**: [Checkpoint (Self-Assessment)](checkpoint.md)

---

## References

- **Lamport, L., Shostak, R., & Pease, M.** (1982). "The Byzantine Generals Problem." *ACM Transactions on Programming Languages and Systems*, 4(3), 382-401.
- See [References](../../../../resources/references.md) for additional mathematical proofs and explanations.
