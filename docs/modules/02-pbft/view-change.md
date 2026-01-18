# View Change Protocol

PBFT's **view change protocol** is the mechanism for recovering from a faulty or unresponsive primary. When replicas detect that the primary is not making progress (either Byzantine or crashed), they coordinate to elect a new primary in a new view.

---

## Why View Changes Are Needed

### Primary Failure Scenarios

The primary can fail to make progress for several reasons:

#### 1. **Byzantine Primary**
- Sends conflicting pre-prepares to different replicas
- Refuses to propose client requests
- Assigns incorrect sequence numbers
- Withholds messages from some replicas

#### 2. **Crashed Primary**
- Stopped responding entirely (crash fault)
- Network partition isolating the primary

#### 3. **Slow Primary**
- Overloaded or slow network connection
- Creates liveness problems (progress stalls)

!!! note "Safety vs. Liveness"
    PBFT prioritizes **safety over liveness**:
    
    - A Byzantine primary **cannot violate safety** (prepared certificates require quorum)
    - A Byzantine primary **can violate liveness** (by refusing to propose)
    - **View changes restore liveness** by replacing the problematic primary

---

## View Number and Primary Selection

### View Number (v)

- An integer identifying the current **primary epoch**
- Starts at `v = 0`
- Increments with each view change: `v → v+1 → v+2 → ...`
- Determines which replica is the primary

### Primary Selection

Primary is deterministically selected based on view number:

```
primary = v mod n
```

Where:
- **v**: Current view number
- **n**: Total number of replicas

**Example** with 4 replicas:
- View 0: Primary = 0 mod 4 = **Replica 0**
- View 1: Primary = 1 mod 4 = **Replica 1**
- View 2: Primary = 2 mod 4 = **Replica 2**
- View 3: Primary = 3 mod 4 = **Replica 3**
- View 4: Primary = 4 mod 4 = **Replica 0** (cycles back)

!!! tip "Round-Robin Rotation"
    This deterministic round-robin selection ensures:
    
    - All replicas eventually get a chance to be primary
    - Even with f Byzantine replicas, will cycle through to an honest primary
    - No central election needed (everyone computes the same primary)

---

## Triggering View Change

### Timeout Mechanism

Each replica maintains a **timer** for the current view:

1. **Timer starts** when replica enters the view
2. **Timer resets** when replica commits a request (progress is being made)
3. **Timer expires** if no progress for timeout period

**When timeout expires**:
- Replica suspects primary is faulty
- Replica initiates view change to `v+1`

### Timeout Value

Timeouts must be:

- **Long enough** to avoid spurious view changes during normal operation
- **Short enough** to detect actual failures quickly
- Often **exponentially increasing** to handle transient network issues

```
timeout(v) = base_timeout × 2^(v mod k)
```

Where `k` limits exponential growth to prevent unbounded delays.

---

## View Change Protocol Steps

### Step 1: Send VIEW-CHANGE

When a replica `i` suspects the primary, it multicasts:

```
VIEW-CHANGE ⟨v+1, n, C, P, i⟩σᵢ
```

Where:
- **v+1**: New view number
- **n**: Sequence number of the last stable checkpoint
- **C**: Checkpoint certificate (proof of the stable checkpoint)
- **P**: Set of prepared certificates (requests prepared but not yet checkpointed)
- **σᵢ**: Signature of replica `i`

!!! note "What's Included in P?"
    P contains all requests for which the replica has a **prepared certificate** since the last checkpoint. This ensures no committed requests are lost during the view change.

### Step 2: New Primary Collects VIEW-CHANGE Messages

The primary for view `v+1` (determined by `(v+1) mod n`) waits for:

- **2f+1 VIEW-CHANGE messages** for view `v+1` (including possibly its own)

This proves a **quorum** of replicas wants to move to view `v+1`.

### Step 3: New Primary Computes NEW-VIEW

Once the new primary has 2f+1 VIEW-CHANGE messages, it:

1. **Determines highest sequence number**: `max-n` = highest `n` in any checkpoint in VIEW-CHANGE messages
2. **Determines highest prepared**: For each sequence number `> max-n`, includes the request with the highest view number where it was prepared (from P sets)
3. **Fills gaps**: For sequence numbers with no prepared certificate, creates a special `null` request
4. **Constructs NEW-VIEW message**:

```
NEW-VIEW ⟨v+1, V, O⟩σₚ
```

Where:
- **v+1**: New view number
- **V**: Set of 2f+1 valid VIEW-CHANGE messages proving quorum
- **O**: Set of pre-prepare messages for requests in the new view
- **σₚ**: Signature of the new primary

### Step 4: Replicas Accept NEW-VIEW

Each replica receives the NEW-VIEW message and validates:

- [x] Signature is from the correct primary for view `v+1`
- [x] V contains 2f+1 valid VIEW-CHANGE messages for view `v+1`
- [x] O is correctly computed from V (highest prepared certificates, filled gaps)

If valid, replica:
1. **Accepts NEW-VIEW**
2. **Processes pre-prepares in O** (enters prepare phase for each)
3. **Transitions to view v+1**
4. **Resumes normal operation**

---

## View Change Example

### Scenario: 4 Replicas, Byzantine Primary in View 0

```
Initial State (View 0):
- Primary: Replica 0 (Byzantine - refusing to propose)
- Replicas: R1, R2, R3 (honest)
- Last checkpoint: n=50
- Pending requests: n=51, n=52 (prepared at R1, R2, R3)
```

#### Timeline

**T=0**: Client sends request for n=51  
**T=1**: Byzantine Primary R0 refuses to send pre-prepare  
**T=2**: Replicas R1, R2, R3 timeout waiting for pre-prepare

**T=3**: View Change Initiated

```
Replica 1: VIEW-CHANGE ⟨v=1, n=50, C, P={prepared(51), prepared(52)}, 1⟩ → Multicast
Replica 2: VIEW-CHANGE ⟨v=1, n=50, C, P={prepared(51), prepared(52)}, 2⟩ → Multicast
Replica 3: VIEW-CHANGE ⟨v=1, n=50, C, P={prepared(51), prepared(52)}, 3⟩ → Multicast
```

**T=4**: New Primary (R1) Collects VIEW-CHANGE

```
Replica 1 (new primary for v=1) receives:
- VIEW-CHANGE from R1 (itself)
- VIEW-CHANGE from R2
- VIEW-CHANGE from R3

Total: 3 VIEW-CHANGE messages (≥ 2f+1 = 3 ✓)
```

**T=5**: New Primary Constructs NEW-VIEW

```
Replica 1 computes:
- Highest checkpoint: n=50
- Prepared requests in P sets:
  - n=51: prepared in v=0 (from all VIEW-CHANGE messages)
  - n=52: prepared in v=0 (from all VIEW-CHANGE messages)

Constructs O:
- PRE-PREPARE ⟨v=1, n=51, d₅₁⟩ (re-propose prepared request)
- PRE-PREPARE ⟨v=1, n=52, d₅₂⟩ (re-propose prepared request)

Replica 1: NEW-VIEW ⟨v=1, V={VC₁, VC₂, VC₃}, O={PP₅₁, PP₅₂}⟩ → Multicast
```

**T=6**: Replicas Accept NEW-VIEW and Resume

```
Replicas R0, R2, R3:
- Validate NEW-VIEW from R1 ✓
- Process PRE-PREPARE ⟨v=1, n=51, d₅₁⟩ → Enter prepare phase
- Process PRE-PREPARE ⟨v=1, n=52, d₅₂⟩ → Enter prepare phase
- Transition to view v=1

Normal PBFT protocol resumes with new primary R1
```

---

## Safety During View Changes

### Key Safety Property

!!! quote "View Change Safety Invariant"
    If a request is committed in view `v`, it will be re-proposed (or already committed) in all subsequent views `v' > v`.

### Why This Holds

1. **Committed** means 2f+1 replicas reached "prepared" state
2. Any set of 2f+1 VIEW-CHANGE messages must **intersect** with the committed quorum in at least **f+1 replicas**
3. At least **one honest replica** in the intersection includes the request in its P set (prepared certificates)
4. New primary's NEW-VIEW computation includes the **highest view prepared certificate**, preserving the request

**Result**: No committed request can be lost during view changes.

---

## View Change Message Complexity

### Pessimistic Case

- **VIEW-CHANGE messages**: n replicas multicast = **O(n²)** messages
- **NEW-VIEW message**: 1 new primary multicast = **O(n)** messages
- **Pre-prepares in NEW-VIEW**: Up to k pending requests = **O(kn)** messages

**Total**: **O(n²)** for view change protocol

!!! tip "Amortized Cost"
    View changes are **infrequent** in normal operation:
    
    - Only triggered when primary fails or is Byzantine
    - With f Byzantine replicas, expect ≤ f view changes to reach honest primary
    - **Amortized over many consensus rounds**, view change overhead is acceptable

---

## View Change vs. HotStuff

PBFT's view change is complex compared to modern BFT algorithms:

| Aspect | PBFT View Change | HotStuff View Change |
|--------|------------------|----------------------|
| **Complexity** | O(n²) messages | O(n) messages |
| **Certificate Size** | Includes all prepared certificates | Single highest QC |
| **Computation** | New primary computes from 2f+1 VIEW-CHANGE | New primary extends highest QC |
| **Simplicity** | Complex (multiple prepared certs) | Simple (one QC) |

HotStuff improves on PBFT's view change complexity through **chained consensus** and **threshold signatures** (covered in Module 03).

---

## Key Takeaways

- **View change** replaces a faulty or Byzantine primary to restore liveness
- **Triggered by timeout** when replicas detect lack of progress
- **New primary** is deterministically selected: `(v+1) mod n`
- **2f+1 VIEW-CHANGE messages** prove quorum agreement to change views
- **NEW-VIEW** includes all prepared certificates to preserve safety
- **O(n²) message complexity** for view change (infrequent event)
- **Safety preserved**: Committed requests cannot be lost during view changes

---

## 🗺️ Navigation

**Previous**: [Three-Phase Protocol](three-phase-protocol.md)  
**Next**: [Communication Complexity Analysis](complexity-analysis.md)

---

## References

- **Castro, M., & Liskov, B.** (1999). "Practical Byzantine Fault Tolerance." *OSDI '99*, Section 4.3 (View Changes).
- See [References](../../resources/references.md) for the full PBFT paper.
