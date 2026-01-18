# Safety and Liveness Properties

Every distributed consensus protocol must satisfy two fundamental correctness properties: **safety** and **liveness**. Understanding these properties is essential for reasoning about consensus algorithms and their guarantees.

---

## The Two Properties

!!! note "Fundamental Correctness Properties"
    - **Safety**: "Nothing bad happens"
    - **Liveness**: "Something good eventually happens"

These properties were formalized by Leslie Lamport and are used to specify the correctness of distributed systems.

---

## Safety Properties

### Definition

A **safety property** states that **nothing bad ever happens**. Once a safety violation occurs, it **cannot be undone**.

!!! danger "Safety Violation = Permanent Damage"
    If a safety property is violated, the system is **permanently incorrect**. You cannot "recover" from a safety violation—the damage is done.

### Consensus Safety Properties

In the context of consensus, safety means:

#### 1. **Agreement**
All correct (non-faulty) nodes that decide must **decide the same value**.

**Bad thing prevented**: Different nodes deciding different values

**Example violation**: 
- Node A decides "COMMIT transaction"
- Node B decides "ABORT transaction"
- **Inconsistent state**: System is broken forever

#### 2. **Validity**
The decided value must be **valid** (e.g., proposed by some correct node, not arbitrary).

**Bad thing prevented**: Deciding on nonsensical or malicious values

**Example violation**:
- Nodes propose values: [10, 20, 30]
- System decides: 99 (never proposed)
- **Invalid decision**: Violates integrity of proposals

### Real-World Safety Examples

!!! example "Banking System Safety"
    **Property**: Account balances must never become negative
    
    - If safety is violated (balance goes negative), the system is **permanently inconsistent**
    - Cannot "undo" the violation after it happens
    - Must prevent violations through careful protocol design

!!! example "Blockchain Safety"
    **Property**: Once a block is finalized, it cannot be reverted
    
    - If two nodes finalize conflicting blocks, **blockchain forks permanently**
    - Safety violation = irreversible fork
    - BFT consensus ensures this never happens (within fault assumptions)

---

## Liveness Properties

### Definition

A **liveness property** states that **something good eventually happens**. Liveness violations are **temporary**—progress can resume later.

!!! info "Liveness Violation = Temporary Delay"
    If a liveness property is violated, the system is **stuck** or **slow**, but can potentially recover. No permanent damage is done.

### Consensus Liveness Properties

In the context of consensus, liveness means:

#### 1. **Termination**
Every correct node **eventually decides** on a value.

**Good thing that must happen**: Progress, decisions, finality

**Example violation**:
- Nodes keep voting but never reach agreement
- System is "stuck" in infinite rounds
- **No progress**: Clients wait forever

### Real-World Liveness Examples

!!! example "Transaction Processing Liveness"
    **Property**: Submitted transactions are eventually processed
    
    - If liveness is violated, transactions are delayed but **not lost**
    - System can recover when network conditions improve
    - Temporary inconvenience, not permanent corruption

!!! example "Blockchain Liveness"
    **Property**: New blocks are eventually produced
    
    - If liveness is violated, blockchain halts (no new blocks)
    - When network recovers, block production resumes
    - Chain integrity is maintained (safety preserved)

---

## Safety vs. Liveness: Key Differences

| Aspect | Safety | Liveness |
|--------|--------|----------|
| **Meaning** | "Nothing bad happens" | "Something good eventually happens" |
| **Violation** | **Permanent** (cannot undo) | **Temporary** (can recover) |
| **Example** | Two nodes decide different values | Nodes never reach a decision |
| **Severity** | **Critical**: System is broken | **Degraded**: System is slow/stuck |
| **Recovery** | Impossible (damage done) | Possible (wait for network to recover) |
| **Priority** | **Higher**: Must never violate | Lower: Can temporarily delay |

!!! tip "Safety First"
    In practice, **safety is prioritized over liveness**. It's better to halt (violate liveness) than to make an incorrect decision (violate safety). Most BFT protocols sacrifice liveness under extreme conditions to preserve safety.

---

## The FLP Impossibility Result

A famous theorem by Fischer, Lynch, and Paterson (1985) proves a fundamental limitation:

!!! warning "FLP Impossibility"
    In an **asynchronous network** (unbounded message delays), **no deterministic consensus protocol** can guarantee both safety and liveness if even **one node may crash**.

### What Does This Mean?

- **Asynchronous network**: No assumptions about message delivery time (realistic for the internet)
- **Impossibility**: Cannot guarantee liveness and safety simultaneously in all scenarios
- **Practical consequence**: Real consensus protocols must make tradeoffs:
  - Assume **partial synchrony** (network is eventually synchronous)
  - Or use **randomization** (probabilistic termination)

### How BFT Protocols Handle FLP

Most BFT protocols (PBFT, HotStuff) assume **partial synchrony**:

- **Before GST (Global Stabilization Time)**: Network is asynchronous, liveness may be violated
- **After GST**: Network becomes synchronous, liveness is guaranteed

This means:
- **Safety is always preserved** (even during network partitions)
- **Liveness is eventually guaranteed** (once network stabilizes)

!!! note "Partial Synchrony Model"
    Real-world networks are not perfectly synchronous, but they're not completely asynchronous either. The partial synchrony model captures this: "The network is eventually reliable, but we don't know when."

---

## Examples in BFT Consensus

### Safety in PBFT

**Property**: No two correct replicas execute requests in different orders

- **How ensured**: Replicas wait for 2f+1 matching prepare messages before committing
- **Why it works**: 2f+1 quorum ensures at least f+1 honest nodes agree
- **Violation scenario**: If replicas commit with fewer votes, Byzantine nodes could create conflicting orderings

### Liveness in PBFT

**Property**: Client requests are eventually executed

- **How ensured**: View change protocol replaces faulty primary
- **Why it can fail temporarily**: During network partition, replicas cannot form quorum (2f+1)
- **Recovery**: Once network recovers, view change completes and requests proceed

---

## Thought Experiments

!!! question "Exercise 1: Classify Properties"
    Classify each as **Safety** or **Liveness**:
    
    1. "No two nodes finalize conflicting blocks"
    2. "Every submitted transaction is eventually included in a block"
    3. "Account balances never go negative"
    4. "The system eventually responds to client requests"
    5. "Committed values cannot be changed"
    
    <details>
    <summary>Solutions</summary>
    
    1. **Safety** - Preventing conflicting decisions (nothing bad happens)
    2. **Liveness** - Guaranteeing progress (something good eventually happens)
    3. **Safety** - Preventing invalid state (nothing bad happens)
    4. **Liveness** - Guaranteeing responsiveness (something good eventually happens)
    5. **Safety** - Preventing corruption of committed state (nothing bad happens)
    
    </details>

!!! question "Exercise 2: Tradeoff Scenario"
    A BFT blockchain network experiences a severe network partition where only 2f out of 3f+1 nodes can communicate.
    
    **Questions**:
    1. Can the system maintain safety?
    2. Can the system maintain liveness?
    3. What should the protocol do?
    
    <details>
    <summary>Hint</summary>
    
    Remember: 2f+1 quorum is required for decisions. With only 2f nodes reachable, can a quorum form?
    
    </details>
    
    <details>
    <summary>Solution</summary>
    
    1. **Yes, safety can be maintained**: 
       - Nodes refuse to commit decisions without 2f+1 votes
       - No conflicting decisions are made
       - Safety is preserved by not deciding at all
    
    2. **No, liveness is violated**:
       - Cannot form a quorum of 2f+1 with only 2f reachable nodes
       - System halts (no progress)
       - Temporary liveness violation
    
    3. **Protocol should halt (preserve safety)**:
       - Better to wait than to risk safety violation
       - When network partition heals, liveness resumes
       - **Safety first principle**: Never sacrifice correctness for availability
    
    **Lesson**: BFT protocols are designed to "fail safe"—they halt rather than make incorrect decisions.
    
    </details>

---

## Key Takeaways

- **Safety** = "Nothing bad happens" (permanent violations, cannot undo)
- **Liveness** = "Something good eventually happens" (temporary violations, can recover)
- **Safety is prioritized** over liveness in BFT protocols
- **FLP impossibility** shows perfect safety + liveness is impossible in pure asynchronous networks
- **Partial synchrony** is the practical model used by PBFT and HotStuff

---

## Related Concepts

- [Consensus](../../resources/glossary.md#consensus) - Requires both safety and liveness
- [Agreement](../../resources/glossary.md#agreement) - Consensus safety property
- [Termination](../../resources/glossary.md#termination) - Consensus liveness property
- [Partially Synchronous Network](../../resources/glossary.md#partially-synchronous-network) - Network model for BFT

---

## 🗺️ Navigation

**Previous**: [Fault Models](fault-models.md)  
**Next**: [Threshold Requirements](thresholds.md)

---

## References

- **Lamport, L.** (1977). "Proving the Correctness of Multiprocess Programs." *IEEE Transactions on Software Engineering*, SE-3(2), 125-143.
- **Fischer, M. J., Lynch, N. A., & Paterson, M. S.** (1985). "Impossibility of Distributed Consensus with One Faulty Process." *Journal of the ACM*, 32(2), 374-382.
- See [References](../../resources/references.md) for additional resources on safety and liveness.
