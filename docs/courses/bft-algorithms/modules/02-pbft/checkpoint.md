# Module 02 Checkpoint: PBFT (Classical BFT)

Test your understanding of PBFT's three-phase protocol, view changes, and communication complexity before proceeding to Module 03 (HotStuff).

**Passing Criteria**: Answer at least **4 out of 5 questions** correctly.

---

## Question 1: Three-Phase Protocol Tracing

A PBFT system has **n=7 replicas** (tolerating f=2 Byzantine faults). Replica 0 is the primary in view v=0.

The primary receives a client request "Transfer $500" and assigns sequence number n=42.

**Question**: How many total PREPARE messages and COMMIT messages are exchanged during a successful consensus round (excluding PRE-PREPARE and REPLY messages)?

**Options**:
- A) Prepare: 7 messages, Commit: 7 messages
- B) Prepare: 14 messages, Commit: 14 messages
- C) Prepare: 42 messages, Commit: 42 messages
- D) Prepare: 49 messages, Commit: 49 messages

<details>
<summary>Show Answer</summary>

**Correct Answer**: **C) Prepare: 42 messages, Commit: 42 messages**

**Explanation**:

**Prepare Phase**:
- Each replica (including primary) multicasts PREPARE to all other replicas
- Each of n=7 replicas sends to n-1=6 others
- Total PREPARE messages: 7 × 6 = **42**

**Commit Phase**:
- Each replica (including primary) multicasts COMMIT to all other replicas  
- Each of n=7 replicas sends to n-1=6 others
- Total COMMIT messages: 7 × 6 = **42**

**Why other options are wrong**:

**Option A (7, 7)**:
- Would be true if each replica only sent one message total
- Ignores the all-to-all multicast pattern

**Option B (14, 14)**:
- Would be true if only 2 replicas participated
- Incorrect calculation

**Option D (49, 49)**:
- Would be 7² if replicas sent to themselves too
- PBFT replicas don't send to themselves (only to n-1 others)

**Key Takeaway**: 
- PBFT's all-to-all broadcasting creates **n(n-1)** messages per phase
- This is the source of PBFT's **O(n²)** communication complexity
- With n=7: 42 prepares + 42 commits = 84 messages (not counting pre-prepare and replies)

</details>

---

## Question 2: Quorum Requirements

In the same PBFT system (n=7, f=2), a replica receives messages for sequence number n=42:

- **1 PRE-PREPARE** from Primary (Replica 0) for digest d
- **PREPARE messages**: from Replicas 1, 2, 3, 4, 5 (5 prepares total)
- **COMMIT messages**: from Replicas 0, 2, 3, 6 (4 commits total)

**Question**: Can this replica safely execute the request at sequence number n=42?

**Options**:
- A) Yes, it has enough PREPARE messages (5 ≥ 2f=4)
- B) No, it needs at least 2f=4 COMMIT messages, only has 4 (borderline, but needs 2f+1)
- C) No, it needs 2f+1=5 COMMIT messages, only has 4
- D) Yes, 1 PRE-PREPARE + 5 PREPARE + 4 COMMIT = 10 total messages ≥ 2f+1=5

<details>
<summary>Show Answer</summary>

**Correct Answer**: **C) No, it needs 2f+1=5 COMMIT messages, only has 4**

**Explanation**:

**Quorum Requirements**:
- **Prepared state**: Requires 1 PRE-PREPARE + **2f** PREPARE messages
  - Replica has: 1 pre-prepare + 5 prepares ≥ 2f=4 ✓ (prepared)
  
- **Committed-local state**: Requires **2f+1** COMMIT messages
  - Replica has: 4 commits < 2f+1=5 ✗ (NOT committed-local)

**Why NOT ready to execute**:
- The replica is **prepared** but not **committed-local**
- To execute safely, need **2f+1=5 COMMIT messages**
- Currently only has **4 COMMIT messages** (one short)
- Must wait for at least **1 more COMMIT** message

**Why other options are wrong**:

**Option A (Yes, prepared)**:
- Being "prepared" is necessary but **not sufficient** for execution
- Still need committed-local state before executing

**Option B (Borderline 2f=4)**:
- Confuses 2f (prepare requirement) with 2f+1 (commit requirement)
- Needs 2f+1=5, not 2f=4

**Option D (Sum of messages)**:
- You don't sum across phases
- Each phase has its own quorum requirement
- Commit phase specifically requires 2f+1 commits

**Key Takeaway**: 
- **Prepared**: 1 pre-prepare + 2f prepares (quorum agreed on ordering)
- **Committed-local**: 2f+1 commits (quorum committed to execution)
- **Execute only when committed-local** (ensures request survives view changes)

</details>

---

## Question 3: Byzantine Primary Detection

In view v=0 with n=4 replicas (f=1), the primary (Replica 0) sends different PRE-PREPARE messages:

- To Replica 1: `PRE-PREPARE ⟨v=0, n=10, d₁⟩` (digest d₁ for "Transfer $100")
- To Replica 2: `PRE-PREPARE ⟨v=0, n=10, d₂⟩` (digest d₂ for "Transfer $200")  
- To Replica 3: `PRE-PREPARE ⟨v=0, n=10, d₁⟩` (digest d₁ for "Transfer $100")

Replicas 1, 2, 3 all broadcast their PREPARE messages to each other.

**Question**: What happens next in the PBFT protocol?

**Options**:
- A) Replicas 1 and 3 reach prepared state for d₁, Replica 2 for d₂; both execute in parallel
- B) Replicas 1 and 3 form a majority and override Replica 2's prepared state with d₁
- C) Replicas detect conflicting pre-prepares, suspect Byzantine primary, and trigger view change to v=1
- D) The protocol halts permanently because safety is violated

<details>
<summary>Show Answer</summary>

**Correct Answer**: **C) Replicas detect conflicting pre-prepares, suspect Byzantine primary, and trigger view change to v=1**

**Explanation**:

**What Replicas Observe**:

**Replica 1** sees:
- Own PRE-PREPARE: `⟨v=0, n=10, d₁⟩`
- PREPARE from R2: `⟨v=0, n=10, d₂⟩` (conflicts!)
- PREPARE from R3: `⟨v=0, n=10, d₁⟩` (matches)

**Replica 2** sees:
- Own PRE-PREPARE: `⟨v=0, n=10, d₂⟩`
- PREPARE from R1: `⟨v=0, n=10, d₁⟩` (conflicts!)
- PREPARE from R3: `⟨v=0, n=10, d₁⟩` (conflicts!)

**Replica 3** sees:
- Own PRE-PREPARE: `⟨v=0, n=10, d₁⟩`
- PREPARE from R1: `⟨v=0, n=10, d₁⟩` (matches)
- PREPARE from R2: `⟨v=0, n=10, d₂⟩` (conflicts!)

**Byzantine Behavior Detected**:
- Replicas observe **conflicting PREPARE messages** for the same `⟨v, n⟩` with different digests
- This proves the primary sent **different PRE-PREPARE messages** (equivocation)
- **Primary is Byzantine** ✓

**Protocol Response**:
- Replicas detect the primary is Byzantine
- **None can reach prepared state** (no quorum of 2f+1=3 matching prepares for either d₁ or d₂)
- Replicas **timeout** and **trigger VIEW-CHANGE** to v=1
- New primary (Replica 1 for v=1) takes over

**Why other options are wrong**:

**Option A (Parallel execution)**:
- **Violates safety**: Two different values cannot both be decided for n=10
- PBFT prevents this: neither d₁ nor d₂ can get 2f+1=3 matching prepares

**Option B (Majority override)**:
- PBFT doesn't allow "overriding" a prepared state
- A replica only enters prepared if it has 1 pre-prepare + 2f matching prepares
- Conflicting messages prevent any prepared state

**Option D (Permanent halt)**:
- **Safety is NOT violated** (no conflicting decisions made)
- Protocol **recovers via view change** (liveness)
- Not a permanent halt, just a temporary delay to switch primaries

**Key Takeaway**: 
- **Byzantine primaries cannot violate safety** (quorum requirements prevent conflicting prepared states)
- **Byzantine primaries can violate liveness** (by equivocating or staying silent)
- **View changes restore liveness** by replacing the Byzantine primary

</details>

---

## Question 4: View Change Scenario

A PBFT system (n=7, f=2) is in view v=3 with Replica 3 as primary. The system has:

- Last stable checkpoint: n=100
- Prepared but not committed: n=101, n=102

The primary (Replica 3) crashes. Replicas timeout and initiate view change to v=4.

**Question**: Who becomes the new primary in view v=4, and what must the new primary include in the NEW-VIEW message?

**Options**:
- A) Replica 4 becomes primary; NEW-VIEW must include PRE-PREPARE for n=101, n=102 (from prepared certificates)
- B) Replica 0 becomes primary (resets to beginning); NEW-VIEW can discard n=101, n=102 (not committed)
- C) Replica 5 becomes primary; NEW-VIEW must only include checkpoint n=100 (discard uncommitted)
- D) Replicas elect primary via voting; NEW-VIEW includes majority's prepared requests

<details>
<summary>Show Answer</summary>

**Correct Answer**: **A) Replica 4 becomes primary; NEW-VIEW must include PRE-PREPARE for n=101, n=102 (from prepared certificates)**

**Explanation**:

**Primary Selection**:
- New view number: v+1 = 4
- Primary selection: `v mod n = 4 mod 7 = 4`
- **New primary: Replica 4** ✓

**NEW-VIEW Contents**:
- Collects 2f+1=5 VIEW-CHANGE messages
- Each VIEW-CHANGE includes:
  - Checkpoint certificate (n=100)
  - P set (prepared certificates for n=101, n=102)
- **Must include prepared requests** in NEW-VIEW's O set
  - PRE-PREPARE for n=101 (re-propose prepared request)
  - PRE-PREPARE for n=102 (re-propose prepared request)

**Why Re-Propose Prepared Requests**:
- If a request was **prepared** in view v=3, it might have been **committed** by some replicas
- **Safety requires** that if any honest replica committed, the request must not be lost
- Even though not checkpointed, prepared certificates in VIEW-CHANGE messages prove quorum agreement
- **New primary must re-propose** to preserve safety

**Why other options are wrong**:

**Option B (Replica 0, discard)**:
- **Incorrect primary**: 4 mod 7 = 4, not 0
- **Safety violation**: Discarding prepared requests could lose committed data

**Option C (Replica 5, discard)**:
- **Incorrect primary**: 4 mod 7 = 4, not 5
- **Safety violation**: Cannot discard prepared requests (some replicas may have committed)

**Option D (Voting)**:
- PBFT uses **deterministic primary selection** (`v mod n`), not voting
- No election process needed

**Key Takeaway**: 
- **Deterministic primary rotation**: `(v+1) mod n`
- **NEW-VIEW must include all prepared requests** to preserve safety
- **Prepared certificates survive view changes** through VIEW-CHANGE messages' P sets

</details>

---

## Question 5: Communication Complexity Comparison

A financial consortium wants to deploy Byzantine fault-tolerant consensus for a replicated ledger. They are comparing PBFT and a hypothetical linear-complexity BFT algorithm (like HotStuff).

**Scenario**:
- **n=25 replicas** (to tolerate f=8 Byzantine faults)
- **1,000 consensus rounds per second**

**Question**: Approximately how many messages per second would each algorithm exchange in steady state (normal operation, no view changes)?

**Options**:
- A) PBFT: 25,000 msgs/sec, Linear BFT: 25,000 msgs/sec (same complexity)
- B) PBFT: 600,000 msgs/sec, Linear BFT: 50,000 msgs/sec
- C) PBFT: 1,200,000 msgs/sec, Linear BFT: 75,000 msgs/sec
- D) PBFT: 50,000 msgs/sec, Linear BFT: 1,200,000 msgs/sec (Linear is worse)

<details>
<summary>Show Answer</summary>

**Correct Answer**: **C) PBFT: 1,200,000 msgs/sec, Linear BFT: 75,000 msgs/sec**

**Explanation**:

**PBFT Message Count** (per consensus round):
- Pre-prepare: 1 × (n-1) = 1 × 24 = 24
- Prepare: n × (n-1) = 25 × 24 = 600
- Commit: n × (n-1) = 25 × 24 = 600
- Reply: n × 1 = 25
- **Total per round**: ~1,200 messages (approximately 2n² ≈ 2×625 = 1,250)

**PBFT at 1,000 rounds/sec**:
- 1,200 messages/round × 1,000 rounds/sec = **1,200,000 messages/sec**

**Linear BFT Message Count** (per consensus round):
- Proposal: 1 × (n-1) = 1 × 24 = 24
- Votes: (n-1) × 1 = 24 × 1 = 24 (to leader)
- Quorum certificate: 1 × (n-1) = 24 (leader broadcasts QC)
- **Total per phase**: ~50 messages (approximately 2n ≈ 50)
- Two phases (prepare, commit): ~75 messages total

**Linear BFT at 1,000 rounds/sec**:
- 75 messages/round × 1,000 rounds/sec = **75,000 messages/sec**

**Comparison**:
- PBFT: 1,200,000 msgs/sec
- Linear BFT: 75,000 msgs/sec
- **PBFT sends ~16× more messages** than linear BFT at n=25

**Why other options are wrong**:

**Option A (Same complexity)**:
- PBFT is O(n²), Linear BFT is O(n)
- Drastically different message counts at n=25

**Option B (600,000 vs 50,000)**:
- Underestimates PBFT: Only counting one phase (prepare OR commit)
- Should count both prepare AND commit phases

**Option D (Reversed)**:
- Incorrectly swaps which is more efficient
- Linear BFT is designed to reduce messages, not increase

**Key Takeaway**: 
- **O(n²) vs O(n) makes a huge difference** at moderate scale (n=25)
- PBFT: 2n² ≈ 1,250 messages/round
- Linear BFT: ~3n ≈ 75 messages/round (3 phases, each O(n))
- **~16× message reduction** is why modern BFT uses linear-complexity designs

</details>

---

## Assessment Results

**Scoring**:
- 5/5 correct: **Excellent!** You have mastered PBFT thoroughly.
- 4/5 correct: **Pass** - You're ready for Module 03 (HotStuff).
- 3/5 or fewer: **Review recommended** - Revisit the sections corresponding to questions you missed.

**If you didn't pass**: 
- Review [Three-Phase Protocol](three-phase-protocol.md) for Questions 1, 2, 3
- Review [View Change Protocol](view-change.md) for Question 4
- Review [Communication Complexity Analysis](complexity-analysis.md) for Question 5

Then retry the checkpoint.

---

## 🗺️ Navigation

**Previous**: [Communication Complexity Analysis](complexity-analysis.md)  
**Next Module**: [Module 03 - HotStuff (Modern BFT)](../03-hotstuff/README.md)

**Module Overview**: [Module 02 README](README.md)

---

## 🎯 Ready for HotStuff?

If you passed the checkpoint (4+ correct), you're ready to learn how **HotStuff** overcomes PBFT's O(n²) limitation through threshold signatures and achieves **O(n) linear complexity**!

**Key Differences You'll Explore in Module 03**:
- **Threshold signatures** replacing all-to-all broadcasting
- **Two-phase protocol** (vs. PBFT's three phases)
- **O(n) linear complexity** (vs. PBFT's O(n²))
- **Simpler view changes** with single highest quorum certificate

**Proceed to**: [Module 03: HotStuff (Modern BFT)](../03-hotstuff/README.md)
