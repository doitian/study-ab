# Comparison: HotStuff vs PBFT

**Goal**: Understand the key differences between HotStuff and PBFT, and when to choose each algorithm.

**Prerequisites**: [PBFT three-phase protocol](../02-pbft/three-phase-protocol.md), [HotStuff two-phase protocol](two-phase-protocol.md)

---

## 🎯 Learning Objectives

- [ ] Compare HotStuff and PBFT across phases, complexity, and view changes
- [ ] Explain the architectural differences that enable HotStuff's improvements
- [ ] Evaluate when to use HotStuff vs PBFT based on system requirements
- [ ] Understand the tradeoffs each algorithm makes

---

## 📊 Side-by-Side Comparison

### High-Level Overview

| Aspect | PBFT | HotStuff |
|--------|------|----------|
| **Year** | 1999 | 2018 |
| **Phases** | 3 (Pre-Prepare, Prepare, Commit) | 2 main (Prepare, Pre-Commit) |
| **Communication** | All-to-all broadcasting | Leader-based with vote aggregation |
| **Complexity** | O(n²) | O(n) |
| **Cryptography** | Standard signatures | Threshold signatures |
| **Responsiveness** | No (timeout-based) | Yes (network-delay-based) |
| **View Change** | O(n²) | O(n) |
| **Pipelining** | Difficult | Easy (chained variant) |

---

## 🔄 Protocol Phases Comparison

### PBFT: Three-Phase Protocol

```
┌─────────────┐
│ Pre-Prepare │  Leader → All replicas (propose)
└──────┬──────┘
       ↓
┌─────────────┐
│   Prepare   │  All → All (n² messages)
└──────┬──────┘  Each replica broadcasts to all others
       ↓         Collect 2f prepares from different replicas
┌─────────────┐
│   Commit    │  All → All (n² messages)
└──────┬──────┘  Each replica broadcasts to all others
       ↓         Collect 2f+1 commits from different replicas
┌─────────────┐
│   Execute   │
└─────────────┘
```

**Key Characteristics**:
- **Pre-Prepare**: Leader broadcasts `<PRE-PREPARE, v, n, d>` where v=view, n=sequence number, d=digest
- **Prepare**: Replica i broadcasts `<PREPARE, v, n, d, i>` to all replicas
- **Commit**: Replica i broadcasts `<COMMIT, v, n, d, i>` to all replicas
- **All-to-all**: Each replica must broadcast to n-1 other replicas in both Prepare and Commit

### HotStuff: Two-Phase Protocol

```
┌─────────────┐
│   Prepare   │  Leader → All (propose)
└──────┬──────┘  All → Leader (vote with partial signature)
       ↓         Leader aggregates → prepareQC
┌─────────────┐  Leader → All (broadcast prepareQC)
│ Pre-Commit  │
└──────┬──────┘  All → Leader (vote with partial signature)
       ↓         Leader aggregates → preCommitQC
┌─────────────┐  Leader → All (broadcast preCommitQC)
│   Commit    │
└──────┬──────┘  Replicas verify preCommitQC
       ↓
┌─────────────┐
│   Execute   │
└─────────────┘
```

**Key Characteristics**:
- **Prepare**: Leader proposes, replicas vote to leader only, leader aggregates into QC
- **Pre-Commit**: Leader broadcasts prepareQC, replicas vote to leader only, leader aggregates into preCommitQC
- **Leader-based**: Replicas send votes only to the leader, not to each other
- **Aggregation**: Leader combines 2f+1 partial signatures into a single QC

---

## 📈 Communication Complexity Analysis

### Message Count Formula

**PBFT**:
- Pre-Prepare: n messages (leader to all)
- Prepare: n × (n-1) ≈ n² messages (all-to-all)
- Commit: n × (n-1) ≈ n² messages (all-to-all)
- **Total: ~2n² = O(n²)**

**HotStuff**:
- Prepare proposal: n messages (leader to all)
- Prepare votes: n messages (all to leader)
- Prepare QC broadcast: n messages (leader to all)
- Pre-Commit votes: n messages (all to leader)
- Pre-Commit QC broadcast: n messages (leader to all)
- **Total: ~5n = O(n)**

### Scalability Comparison

| Replicas (n) | PBFT Messages | HotStuff Messages | Reduction Factor |
|--------------|---------------|-------------------|------------------|
| 4 | ~32 | ~20 | 1.6× |
| 10 | ~200 | ~50 | 4× |
| 25 | ~1,250 | ~125 | 10× |
| 50 | ~5,000 | ~250 | 20× |
| 100 | ~20,000 | ~500 | 40× |
| 200 | ~80,000 | ~1,000 | 80× |

**Key Insight**: As n grows, HotStuff's advantage becomes dramatic. For large validator sets (typical in public blockchains), PBFT becomes impractical.

### Network Bandwidth

**PBFT**:
- Each replica sends n-1 messages in Prepare phase
- Each replica sends n-1 messages in Commit phase
- **Per-replica bandwidth**: O(n)
- **Total network bandwidth**: O(n²)

**HotStuff**:
- Each replica sends 2 messages (one prepare vote, one pre-commit vote)
- Leader sends 2n messages (proposal + QC broadcasts)
- **Per-replica bandwidth**: O(1) for non-leaders, O(n) for leader
- **Total network bandwidth**: O(n)

---

## 🔀 View Change Comparison

### PBFT View Change

**Protocol**:
1. Replica suspects primary failure (timeout)
2. Replica broadcasts `VIEW-CHANGE` to all replicas
3. `VIEW-CHANGE` contains all **prepared certificates** (prepares for each request)
4. New primary collects 2f+1 VIEW-CHANGE messages
5. New primary broadcasts `NEW-VIEW` containing:
   - All 2f+1 VIEW-CHANGE messages
   - Pre-prepare messages for all prepared requests
6. Replicas verify NEW-VIEW and resume

**Complexity**:
- VIEW-CHANGE message size: O(n) per prepared request
- VIEW-CHANGE broadcasting: O(n²) messages
- NEW-VIEW message size: O(n²) (contains 2f+1 VIEW-CHANGE messages)
- **Total: O(n²) communication**

**Problems**:
- Large message sizes (each VIEW-CHANGE carries multiple certificates)
- All-to-all broadcasting of VIEW-CHANGE
- NEW-VIEW message can be very large

### HotStuff View Change

**Protocol**:
1. Replica suspects leader failure (no progress)
2. Replica sends `VIEW-CHANGE` to new leader only
3. `VIEW-CHANGE` contains only the **highest QC** the replica has seen
4. New leader collects 2f+1 VIEW-CHANGE messages
5. New leader proposes the value from the **highest certified proposal**
6. Protocol resumes from prepare phase

**Complexity**:
- VIEW-CHANGE message size: O(1) (single QC)
- VIEW-CHANGE messages: O(n) (replicas to new leader)
- New leader proposal: O(n) (broadcast to all)
- **Total: O(n) communication**

**Advantages**:
- Compact messages (single QC vs. multiple certificates)
- Leader-based (no all-to-all broadcasting)
- Simple recovery rule (propose highest certified value)

### Side-by-Side View Change Example

**Scenario**: 7 replicas (n=7, f=2), leader fails after some replicas prepared request R.

**PBFT**:
```
1. Each of 7 replicas broadcasts VIEW-CHANGE to all 7 replicas
   → 7 × 7 = 49 messages

2. Each VIEW-CHANGE contains prepared certificates for R:
   - 1 PRE-PREPARE message
   - 2f = 4 PREPARE messages
   → Message size: ~5 signatures per request

3. New primary broadcasts NEW-VIEW to all 7 replicas
   - NEW-VIEW contains 2f+1 = 5 VIEW-CHANGE messages
   - Each VIEW-CHANGE contains ~5 signatures
   → NEW-VIEW size: ~25 signatures

Total: 49 VIEW-CHANGE messages + 7 NEW-VIEW messages = 56 messages
Message sizes: Large (multiple certificates)
```

**HotStuff**:
```
1. Each of 7 replicas sends VIEW-CHANGE to new leader
   → 7 messages

2. Each VIEW-CHANGE contains highest QC:
   - 1 threshold signature (compact)
   → Message size: 1 signature

3. New leader proposes value from highest QC to all 7 replicas
   → 7 messages

Total: 7 VIEW-CHANGE messages + 7 PROPOSE messages = 14 messages
Message sizes: Small (single QC)
```

**Reduction**: 56 → 14 messages (4× fewer), and HotStuff messages are smaller!

---

## ⏱️ Responsiveness: A Key Difference

### PBFT: Timeout-Based Progress

**Mechanism**:
- Replicas wait for a **fixed timeout** T before suspecting the primary
- If no progress within T, replicas trigger view change
- Timeout T must be configured based on expected network delay

**Problems**:
1. **Conservative timeout**: If T is too large, liveness is delayed
2. **Aggressive timeout**: If T is too small, healthy primaries are replaced unnecessarily
3. **Static configuration**: T cannot adapt to changing network conditions
4. **Worst-case latency**: Even in a fast network, must wait T before detecting failure

**Example**: 
- Network typically delivers messages in 50ms
- Timeout configured to 5 seconds (conservative to avoid false positives)
- Primary crashes → replicas wait 5 seconds before view change
- **Unnecessary delay**: Could have detected failure and recovered much faster

### HotStuff: Network-Delay-Based Progress

**Mechanism**:
- Replicas progress when they **receive messages**, not when timers expire
- Leader failure detection is adaptive (e.g., exponential backoff)
- Progress rate matches actual network speed

**Advantages**:
1. **Optimistic execution**: Fast network → fast consensus
2. **No timeout tuning**: System adapts automatically
3. **Minimal latency**: Detects failures as soon as messages stop arriving
4. **Adaptive**: Handles variable network conditions gracefully

**Example**:
- Network delivers messages in 50ms (fast)
- Consensus completes in ~150ms (3 round-trips)
- Primary crashes → replicas detect failure in ~100-200ms (no artificial delay)
- **Optimal latency**: Progress limited only by network, not configuration

### When Responsiveness Matters

**HotStuff is superior in**:
- Public blockchains (geographically distributed validators, variable latency)
- Cloud deployments (network jitter, cross-region communication)
- Dynamic environments (network conditions change over time)

**PBFT's fixed timeout is acceptable in**:
- Private networks (stable, predictable latency)
- Small deployments (easy to tune one timeout value)
- Environments where conservatism is preferred over optimism

---

## 🔗 Pipelining and Chained Consensus

### PBFT: Sequential Consensus

**Structure**:
- Must complete all three phases for proposal n before starting proposal n+1
- No built-in mechanism for pipelining
- Throughput limited by latency of one full round

**Latency per proposal**: 3 phases × network delay = ~3Δ (where Δ = one-way network delay)

### HotStuff: Chained Consensus

**Structure**:
- Prepare phase for proposal n+1 doubles as pre-commit for proposal n
- Pre-commit for n+1 doubles as commit for n
- Natural pipelining: multiple proposals in flight simultaneously

**Latency per proposal** (amortized): ~1Δ (one phase per proposal in steady state)

**Throughput comparison**:
- **PBFT**: 1 proposal every 3Δ
- **Chained HotStuff**: 1 proposal every Δ (3× throughput improvement!)

---

## 🛠️ Cryptographic Requirements

### PBFT

**Cryptography Needed**:
- Standard digital signatures (e.g., ECDSA, Ed25519)
- Hash functions (e.g., SHA-256)

**Advantages**:
- Simple, well-understood cryptography
- No setup phase required
- Standard libraries available

**Disadvantages**:
- Cannot aggregate signatures → O(n²) communication

### HotStuff

**Cryptography Needed**:
- **Threshold signature scheme** (e.g., BLS signatures)
- Distributed Key Generation (DKG) for setup
- Hash functions

**Advantages**:
- Signature aggregation → O(n) communication
- Compact proofs (QCs)

**Disadvantages**:
- More complex cryptography
- Setup phase required (DKG)
- Requires specific cryptographic libraries (e.g., BLS)

**Practical Consideration**: Threshold signatures were impractical in 1999 (when PBFT was published) but are now efficient and widely available.

---

## 🎯 When to Use Each Algorithm

### Use PBFT When:

✅ **Small number of replicas** (n < 10)
- O(n²) is manageable with few nodes
- Example: 4 replicas → 32 messages per round (acceptable)

✅ **Private/permissioned networks**
- Stable, predictable network latency
- Fixed timeout tuning is acceptable

✅ **Simplicity is paramount**
- Avoid threshold cryptography complexity
- Easier to implement and audit

✅ **Legacy compatibility**
- Existing PBFT-based systems
- Well-tested, battle-proven implementation

**Example Use Cases**:
- Corporate database replication (3-7 replicas)
- Hyperledger Fabric ordering service (small channel)
- Private blockchain for consortium

### Use HotStuff When:

✅ **Large number of replicas** (n ≥ 10)
- O(n) scales much better than O(n²)
- Example: 100 replicas → 500 messages vs. 20,000 messages

✅ **Public/permissionless blockchains**
- Variable network conditions
- Geographically distributed validators
- Responsiveness matters

✅ **High throughput requirements**
- Chained consensus for pipelining
- Steady-state throughput 3× better than PBFT

✅ **Dynamic validator sets**
- View changes are lightweight (O(n) vs O(n²))
- Frequent leader rotation is acceptable

**Example Use Cases**:
- Public blockchain consensus (Ethereum, Cosmos)
- Large-scale permissioned blockchain (100+ validators)
- Cloud-based distributed systems

---

## 📊 Summary Table: Decision Matrix

| Requirement | PBFT | HotStuff | Winner |
|-------------|------|----------|--------|
| Small replicas (n<10) | ✅ Good | ✅ Good | Tie |
| Large replicas (n≥50) | ❌ Impractical | ✅ Excellent | **HotStuff** |
| Variable network latency | ⚠️ Timeout tuning needed | ✅ Adaptive | **HotStuff** |
| High throughput | ⚠️ Sequential | ✅ Pipelined | **HotStuff** |
| Simple cryptography | ✅ Standard sigs | ❌ Threshold sigs | **PBFT** |
| Fast view changes | ❌ O(n²) | ✅ O(n) | **HotStuff** |
| Easy implementation | ✅ Simpler | ⚠️ More complex | **PBFT** |
| Proven in production | ✅ 25 years | ⚠️ 5 years | **PBFT** |

---

## 🧩 Real-World Implementations

### PBFT-Based Systems

- **Hyperledger Fabric** (ordering service, small channels)
- **Tendermint** (originally PBFT-inspired, now evolved)
- **BFT-SMaRt** (research prototype)
- **PBFT itself** (academic/research deployments)

### HotStuff-Based Systems

- **LibraBFT / DiemBFT** (Facebook's blockchain, now deprecated but influential)
- **CasperFFG** (Ethereum 2.0, threshold signatures inspired by HotStuff)
- **Bullshark** (Sui blockchain, HotStuff-based)
- **Jolteon / HotStuff-2** (recent academic variants)

---

## ✅ Key Takeaways

1. **Communication Complexity**: HotStuff's O(n) vs PBFT's O(n²) is the fundamental difference
2. **Threshold Signatures**: Enable HotStuff's efficiency, but add cryptographic complexity
3. **Responsiveness**: HotStuff adapts to network speed, PBFT uses fixed timeouts
4. **View Changes**: HotStuff's O(n) view changes are much lighter than PBFT's O(n²)
5. **Pipelining**: Chained HotStuff naturally supports high throughput
6. **Tradeoff**: Simplicity (PBFT) vs. Scalability (HotStuff)

**Bottom Line**: For small, stable networks, PBFT is sufficient. For large, dynamic, or high-throughput systems, HotStuff is superior.

---

## 🔗 Next Steps

- **[Responsiveness](responsiveness.md)**: Deep dive into HotStuff's responsiveness property
- **[Checkpoint](checkpoint.md)**: Test your understanding of PBFT vs HotStuff
- **[Module 04](../04-practical/README.md)**: See real-world BFT implementations

---

## 📚 Further Reading

- PBFT paper: [Practical Byzantine Fault Tolerance](../../resources/references.md#pbft-paper)
- HotStuff paper: [HotStuff: BFT Consensus in the Lens of Blockchain](../../resources/references.md#hotstuff-paper)
- Threshold signatures: [BLS Signatures Explained](../../resources/references.md#bls-signatures)
