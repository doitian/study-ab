# Three-Phase Protocol

PBFT achieves Byzantine fault-tolerant consensus through a carefully designed **three-phase protocol**: pre-prepare, prepare, and commit. Each phase serves a specific purpose in ensuring safety and total ordering.

---

## Protocol Overview

### The Three Phases

```
Client Request → Pre-Prepare → Prepare → Commit → Reply to Client
                 (Primary)    (All)     (All)
```

Each phase builds proof that a quorum of replicas agrees:

1. **Pre-Prepare**: Primary proposes a sequence number for the request
2. **Prepare**: Replicas agree on the ordering within the current view
3. **Commit**: Replicas commit to executing the request in that order

!!! note "Why Three Phases?"
    - **Pre-prepare**: Establishes ordering from the primary
    - **Prepare**: Ensures all honest replicas agree on the same ordering (even if primary is Byzantine)
    - **Commit**: Guarantees that a quorum committed, enabling safe execution even across view changes

---

## Detailed Protocol Flow

### Setup: 4 Replicas Example

Let's trace PBFT with **n=4 replicas** tolerating **f=1 Byzantine fault**:

- **Replica 0**: Primary (for view v=0)
- **Replica 1, 2, 3**: Backups
- **Quorum requirement**: 2f+1 = 3 replicas

```
┌─────────┐
│ Client  │ sends request "Transfer $100"
└────┬────┘
     │
     ▼
┌──────────────────────────────────────────┐
│  Replica 0 (Primary)                     │
│  Replica 1 (Backup)                      │
│  Replica 2 (Backup)                      │
│  Replica 3 (Backup)                      │
└──────────────────────────────────────────┘
```

---

## Phase 1: Pre-Prepare

### Purpose
The primary assigns a **sequence number** to the client request and broadcasts the proposal to all replicas.

### Message Format

```
PRE-PREPARE ⟨v, n, d⟩σₚ
```

Where:
- **v**: View number (current primary epoch)
- **n**: Sequence number assigned to this request
- **d**: Digest (hash) of the client request
- **σₚ**: Primary's signature

### Protocol Steps

1. **Client** sends request `m` to the primary
2. **Primary** (Replica 0) assigns sequence number `n=100`
3. **Primary** broadcasts `PRE-PREPARE ⟨0, 100, d⟩` to all replicas

### Replica Validation

Each backup replica **accepts** the pre-prepare if:

- [x] Signature is valid (from current primary)
- [x] View number `v` matches current view
- [x] Sequence number `n` is within valid range [h, H]
- [x] No conflicting pre-prepare for same `⟨v, n⟩` with different digest `d'`

!!! danger "Detection: Byzantine Primary"
    If a backup receives two conflicting pre-prepares for the same `⟨v, n⟩` with different digests, the primary is Byzantine. The backup triggers a **view change**.

### Example Flow

```
Primary (R0):  PRE-PREPARE ⟨v=0, n=100, d⟩ → Broadcast to R1, R2, R3

Replica 1: ✓ Accepts (valid pre-prepare)
Replica 2: ✓ Accepts (valid pre-prepare)
Replica 3: ✓ Accepts (valid pre-prepare)
```

---

## Phase 2: Prepare

### Purpose
Replicas broadcast their acceptance of the pre-prepare to **all other replicas**, ensuring that a quorum agrees on the request ordering within this view.

### Message Format

```
PREPARE ⟨v, n, d, i⟩σᵢ
```

Where:
- **v, n, d**: Same as in pre-prepare
- **i**: Replica ID of the sender
- **σᵢ**: Sender's signature

### Protocol Steps

1. Each backup that **accepted** the pre-prepare sends `PREPARE ⟨v, n, d, i⟩` to **all replicas** (including primary)
2. Each replica (including primary) collects prepare messages

### Prepared Certificate

A replica enters the **"prepared"** state when it has:

1. **One** valid pre-prepare for `⟨v, n, d⟩`
2. **2f matching prepare messages** from different replicas for `⟨v, n, d⟩`

**Total proof**: 1 pre-prepare + 2f prepares = **2f+1 replicas** agreed on ordering

!!! tip "Prepared Certificate = Quorum Agreement"
    The prepared certificate proves that a quorum (2f+1) of replicas agreed on the request ordering:
    
    - At most **f** are Byzantine
    - At least **f+1** are honest
    - If an honest replica is prepared, no conflicting request can be prepared in the same view

### Example Flow

```
After Pre-Prepare accepted by R1, R2, R3:

Replica 1:  PREPARE ⟨0, 100, d, 1⟩ → Broadcast to R0, R2, R3
Replica 2:  PREPARE ⟨0, 100, d, 2⟩ → Broadcast to R0, R1, R3
Replica 3:  PREPARE ⟨0, 100, d, 3⟩ → Broadcast to R0, R1, R2

Each replica collects:
- R0 receives: PREPARE from R1, R2, R3 (2f=2 prepares ✓)
- R1 receives: PREPARE from R2, R3 (2f=2 prepares ✓)
- R2 receives: PREPARE from R1, R3 (2f=2 prepares ✓)
- R3 receives: PREPARE from R1, R2 (2f=2 prepares ✓)

All replicas reach "prepared" state
```

---

## Phase 3: Commit

### Purpose
Replicas broadcast their commitment to execute the request, ensuring that a quorum has **committed** to the ordering, which survives view changes.

### Message Format

```
COMMIT ⟨v, n, d, i⟩σᵢ
```

Where:
- **v, n, d, i**: Same as in prepare
- **σᵢ**: Sender's signature

### Protocol Steps

1. Each replica that reached **"prepared"** sends `COMMIT ⟨v, n, d, i⟩` to **all replicas**
2. Each replica collects commit messages

### Committed Certificate

A replica enters the **"committed-local"** state when it has:

- **2f+1 commit messages** (including its own) from different replicas for `⟨v, n, d⟩`

**Proof**: 2f+1 replicas committed → at least f+1 honest replicas committed

!!! note "Why Committed Certificate Matters"
    If a replica is committed-local:
    
    - A quorum (2f+1) reached the prepared state
    - At least **f+1 honest** replicas have proof of quorum agreement
    - Even if view changes, the request will not be lost (next primary must include it)

### Example Flow

```
After all replicas are prepared:

Replica 0:  COMMIT ⟨0, 100, d, 0⟩ → Broadcast to R1, R2, R3
Replica 1:  COMMIT ⟨0, 100, d, 1⟩ → Broadcast to R0, R2, R3
Replica 2:  COMMIT ⟨0, 100, d, 2⟩ → Broadcast to R0, R1, R3
Replica 3:  COMMIT ⟨0, 100, d, 3⟩ → Broadcast to R0, R1, R2

Each replica collects 2f+1=3 commit messages:
- R0: receives commits from R1, R2, R3 + own commit = 4 (≥3 ✓)
- R1: receives commits from R0, R2, R3 + own commit = 4 (≥3 ✓)
- R2: receives commits from R0, R1, R3 + own commit = 4 (≥3 ✓)
- R3: receives commits from R0, R1, R2 + own commit = 4 (≥3 ✓)

All replicas reach "committed-local" state
```

---

## Execution and Reply

### Safe Execution

Once a replica is **committed-local** for sequence number `n`:

1. **Execute** all committed requests with sequence numbers ≤ n in order
2. **Update state** deterministically
3. **Send reply** to the client

### Client Receives Result

The client waits for **f+1 matching replies** from different replicas:

- At most **f** replies could be from Byzantine replicas
- At least **1** reply is guaranteed honest
- **Matching replies** confirm the correct result

```
Client receives replies:
- Replica 0: "Transfer successful, new balance = $900"
- Replica 1: "Transfer successful, new balance = $900"
- Replica 2: "Transfer successful, new balance = $900"
- Replica 3: "Transfer successful, new balance = $900"

Client sees f+1=2 matching replies → Accepts result ✓
```

---

## Complete Message Flow Diagram

```
Client                Primary (R0)         Replica 1           Replica 2           Replica 3
  |                       |                    |                   |                   |
  |---Request---------->  |                    |                   |                   |
  |                       |                    |                   |                   |
  |                       |--PRE-PREPARE------>|                   |                   |
  |                       |--PRE-PREPARE---------------------->    |                   |
  |                       |--PRE-PREPARE---------------------------------------->       |
  |                       |                    |                   |                   |
  |                       |<--PREPARE----------|                   |                   |
  |                       |<--PREPARE----------------------------   |                   |
  |                       |<--PREPARE------------------------------------------------  |
  |                       |                    |                   |                   |
  |                       |                    |<--PREPARE---------|                   |
  |                       |                    |<--PREPARE-----------------------------|
  |                       |                    |---PREPARE------------------------>    |
  |                       |                    |                   |                   |
  |                       |                    |                   |<--PREPARE---------|
  |                       |                    |                   |---PREPARE-------->|
  |                       |                    |                   |                   |
  |                  [All replicas now "prepared"]                                     |
  |                       |                    |                   |                   |
  |                       |--COMMIT---------->|                    |                   |
  |                       |--COMMIT------------------------------>  |                   |
  |                       |--COMMIT------------------------------------------->         |
  |                       |                    |                   |                   |
  |                       |<--COMMIT-----------|                   |                   |
  |                       |<--COMMIT------------------------------- |                   |
  |                       |<--COMMIT----------------------------------------------------|
  |                       |                    |                   |                   |
  |                       |                    |<--COMMIT----------|                   |
  |                       |                    |<--COMMIT------------------------------|
  |                       |                    |---COMMIT----------------------->      |
  |                       |                    |                   |                   |
  |                  [All replicas now "committed-local"]                               |
  |                       |                    |                   |                   |
  |                   [Execute]            [Execute]           [Execute]           [Execute]
  |                       |                    |                   |                   |
  |<------Reply-------    |                    |                   |                   |
  |<------Reply----------------------------    |                   |                   |
  |<------Reply-----------------------------------------------     |                   |
  |<------Reply------------------------------------------------------------            |
  |                       |                    |                   |                   |
```

---

## Message Complexity Analysis

### Per Consensus Round

- **Pre-Prepare**: 1 primary → n-1 backups = **n-1 messages**
- **Prepare**: n replicas → n-1 others = **n(n-1) = O(n²) messages**
- **Commit**: n replicas → n-1 others = **n(n-1) = O(n²) messages**

**Total**: O(n²) messages per consensus round

!!! warning "Scalability Bottleneck"
    With n=100 replicas:
    
    - Prepare phase: ~10,000 messages
    - Commit phase: ~10,000 messages
    - **Total: ~20,000 messages per consensus round**
    
    This quadratic growth limits PBFT to small to medium-sized replica groups.

---

## Safety Argument

### Why Three Phases Ensure Safety

**Invariant**: If an honest replica commits a request `m` with sequence number `n` in view `v`, then no conflicting request `m'` can be committed with sequence number `n` in any view `v' ≥ v`.

**Proof Sketch**:

1. **Committed** means 2f+1 replicas reached "prepared" state
2. **Prepared** means 2f+1 replicas agreed on `⟨v, n, d⟩`
3. Any quorum of 2f+1 intersects with this quorum in **at least f+1 replicas**
4. At least **one honest replica** in intersection has proof of `⟨v, n, d⟩`
5. Honest replica will reject conflicting `⟨v, n, d'⟩` and trigger view change if primary is Byzantine

**Result**: No conflicting request can gather 2f+1 prepared certificates → safety guaranteed

---

## Key Takeaways

- **Three phases** (pre-prepare, prepare, commit) ensure total ordering and agreement
- **Pre-prepare** establishes the primary's proposal with sequence number
- **Prepare** ensures quorum agreement on ordering within the view (2f+1 prepared)
- **Commit** ensures quorum commitment, surviving view changes (2f+1 committed)
- **O(n²) messages** per round due to all-to-all broadcasting in prepare and commit
- **Client waits for f+1 matching replies** to tolerate Byzantine replicas

---

## 🗺️ Navigation

**Previous**: [PBFT Overview](overview.md)  
**Next**: [View Change Protocol](view-change.md)

---

## References

- **Castro, M., & Liskov, B.** (1999). "Practical Byzantine Fault Tolerance." *OSDI '99*, Section 4 (The Algorithm).
- See [References](../../resources/references.md) for the full PBFT paper.
