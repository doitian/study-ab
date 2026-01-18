# Glossary

A comprehensive reference of Byzantine Fault Tolerance terminology used throughout this learning path.

---

## Foundational Terms (Module 01)

### Byzantine Fault
A type of failure in distributed systems where a component exhibits **arbitrary behavior**, including sending conflicting information to different parts of the system, remaining silent, or sending incorrect data. Named after the Byzantine Generals Problem.

**Aliases:** Byzantine failure, arbitrary failure  
**Related Terms:** [Crash Fault](#crash-fault), [Omission Fault](#omission-fault), [Fault Model](#fault-model)

---

### Byzantine Generals Problem
A thought experiment proposed by Lamport, Shostak, and Pease (1982) illustrating the challenge of reaching consensus among distributed parties when some may be faulty or malicious. The scenario involves Byzantine army generals who must coordinate an attack, but some generals may be traitors sending conflicting messages.

**Related Terms:** [Byzantine Fault](#byzantine-fault), [Consensus](#consensus), [Safety](#safety), [Liveness](#liveness)

---

### Crash Fault
A failure mode where a node **stops functioning entirely** and ceases all communication. Unlike Byzantine faults, crash faults are "benign" – the failed node doesn't send incorrect or conflicting information.

**Aliases:** Fail-stop failure, crash failure  
**Related Terms:** [Byzantine Fault](#byzantine-fault), [Omission Fault](#omission-fault), [Fault Model](#fault-model)

---

### Omission Fault
A failure mode where a node **fails to send or receive messages** but otherwise behaves correctly. This can be due to network issues or intermittent failures.

**Related Terms:** [Crash Fault](#crash-fault), [Byzantine Fault](#byzantine-fault), [Fault Model](#fault-model)

---

### Fault Model
A specification of the types and number of failures a system is designed to tolerate. Common fault models include:
- **Crash fault model**: Tolerates nodes stopping unexpectedly
- **Byzantine fault model**: Tolerates arbitrary (malicious) behavior

**Related Terms:** [Byzantine Fault](#byzantine-fault), [Crash Fault](#crash-fault), [f (Fault Tolerance Parameter)](#f-fault-tolerance-parameter)

---

### Consensus
The fundamental problem in distributed systems where multiple nodes must **agree on a single value or decision** despite failures and asynchrony. BFT consensus ensures agreement even when some nodes are Byzantine.

**Related Terms:** [Safety](#safety), [Liveness](#liveness), [Agreement](#agreement), [Validity](#validity), [Termination](#termination)

---

### Safety
A correctness property stating **"nothing bad happens"**. In consensus, safety means:
- **Agreement**: No two honest nodes decide different values
- **Validity**: Decided value must be valid (e.g., proposed by some node)

Safety violations are **permanent** – once consensus is violated, it cannot be undone.

**Related Terms:** [Liveness](#liveness), [Agreement](#agreement), [Validity](#validity)

---

### Liveness
A correctness property stating **"something good eventually happens"**. In consensus, liveness means:
- **Termination**: Every correct node eventually decides

Unlike safety, liveness violations are **temporary** – progress can resume later.

**Related Terms:** [Safety](#safety), [Termination](#termination), [Progress](#progress)

---

### Quorum
A subset of nodes **sufficient to make progress** in a distributed protocol. In BFT systems:
- **2f+1 quorum**: Minimum nodes needed for a decision with f Byzantine faults
- Quorum intersection guarantees at least one honest node overlap

**Related Terms:** [2f+1 Threshold](#2f1-threshold), [3f+1 Replicas](#3f1-replicas), [Quorum Intersection](#quorum-intersection)

---

### 2f+1 Threshold
The **minimum quorum size** required in BFT systems with f Byzantine faults. With 2f+1 responses:
- At least **f+1 are honest** (majority)
- Two quorums intersect in at least **one honest node**

**Example:** With f=1 Byzantine fault, need 2(1)+1 = 3 responses.

**Related Terms:** [3f+1 Replicas](#3f1-replicas), [Quorum](#quorum), [f (Fault Tolerance Parameter)](#f-fault-tolerance-parameter)

---

### 3f+1 Replicas
The **total number of nodes** required in a BFT system to tolerate f Byzantine faults while maintaining both safety and liveness:
- **Safety**: 2f+1 quorum ensures majority honesty
- **Liveness**: System progresses even with f Byzantine nodes

**Example:** To tolerate f=1 Byzantine fault, need 3(1)+1 = 4 total replicas.

**Related Terms:** [2f+1 Threshold](#2f1-threshold), [Quorum](#quorum), [f (Fault Tolerance Parameter)](#f-fault-tolerance-parameter)

---

### f (Fault Tolerance Parameter)
The **maximum number of Byzantine faults** a system is designed to tolerate. Determines:
- **Total replicas**: 3f+1
- **Quorum size**: 2f+1

**Example:** f=1 means tolerating 1 Byzantine node with 4 total replicas.

**Related Terms:** [3f+1 Replicas](#3f1-replicas), [2f+1 Threshold](#2f1-threshold)

---

## PBFT Terms (Module 02)

### PBFT (Practical Byzantine Fault Tolerance)
A Byzantine fault-tolerant consensus algorithm proposed by Castro and Liskov (1999) that achieves **practical performance** through:
- Three-phase protocol (pre-prepare, prepare, commit)
- View changes for fault recovery
- O(n²) message complexity

**Related Terms:** [Pre-Prepare](#pre-prepare), [Prepare](#prepare), [Commit](#commit), [View Change](#view-change)

---

### Primary
In PBFT, the **leader node** responsible for proposing values and coordinating consensus rounds. The primary:
- Assigns sequence numbers to client requests
- Initiates the pre-prepare phase
- Can be replaced via view change if Byzantine

**Aliases:** Leader, proposer  
**Related Terms:** [Replica](#replica), [View Change](#view-change), [View Number](#view-number)

---

### Replica
In PBFT, a **non-primary node** that participates in consensus by:
- Validating pre-prepare messages
- Broadcasting prepare and commit messages
- Detecting primary failures

**Related Terms:** [Primary](#primary), [Backup](#backup)

---

### Backup
Synonym for [Replica](#replica) in PBFT – non-primary nodes.

---

### Pre-Prepare
**Phase 1 of PBFT**: The primary broadcasts a pre-prepare message containing:
- View number (v)
- Sequence number (n)
- Client request digest (d)

Replicas validate and accept if the message is well-formed.

**Related Terms:** [Prepare](#prepare), [Commit](#commit), [Primary](#primary)

---

### Prepare
**Phase 2 of PBFT**: Replicas broadcast prepare messages after accepting a pre-prepare:
- Ensures all honest replicas agree on request ordering
- Replica waits for **2f prepare messages** (plus its own) before committing

**Related Terms:** [Pre-Prepare](#pre-prepare), [Commit](#commit), [Prepared Certificate](#prepared-certificate)

---

### Commit
**Phase 3 of PBFT**: Replicas broadcast commit messages after receiving 2f+1 prepares:
- Guarantees that a quorum of replicas prepared the request
- Replica executes request after receiving **2f+1 commit messages**

**Related Terms:** [Pre-Prepare](#pre-prepare), [Prepare](#prepare), [Committed Certificate](#committed-certificate)

---

### View Number
An integer identifying the current **primary epoch** in PBFT. Increments during view changes when the primary is suspected to be faulty.

**Related Terms:** [View Change](#view-change), [Primary](#primary)

---

### View Change
A protocol for **replacing a faulty primary** in PBFT. Triggered when replicas timeout waiting for progress:
1. Replicas broadcast VIEW-CHANGE messages
2. New primary collects 2f+1 VIEW-CHANGE messages
3. New primary broadcasts NEW-VIEW with proof
4. System resumes with incremented view number

**Related Terms:** [Primary](#primary), [View Number](#view-number), [Timeout](#timeout)

---

### Prepared Certificate
Proof that a replica has received:
- 1 valid pre-prepare message
- 2f matching prepare messages

Indicates quorum agreement on request ordering.

**Related Terms:** [Prepare](#prepare), [Committed Certificate](#committed-certificate)

---

### Committed Certificate
Proof that a replica has received:
- 2f+1 commit messages

Guarantees that a quorum committed the request, enabling safe execution.

**Related Terms:** [Commit](#commit), [Prepared Certificate](#prepared-certificate)

---

### Sequence Number
A monotonically increasing integer assigned by the primary to order client requests. Ensures **total ordering** of operations across replicas.

**Related Terms:** [Pre-Prepare](#pre-prepare), [Total Order](#total-order)

---

### O(n²) Complexity
PBFT's **communication complexity**: Each replica broadcasts to all other replicas in prepare and commit phases, resulting in O(n²) messages per consensus round with n replicas.

**Related Terms:** [O(n) Complexity](#on-complexity), [HotStuff](#hotstuff)

---

## HotStuff Terms (Module 03)

### HotStuff
A leader-based BFT consensus algorithm (Yin et al., 2019) achieving:
- **O(n) communication complexity** via threshold signatures
- **Responsiveness**: Progress depends on network delay, not timeouts
- **Pipelined consensus**: Chained protocol phases

**Related Terms:** [Threshold Signature](#threshold-signature), [Responsiveness](#responsiveness), [O(n) Complexity](#on-complexity)

---

### Threshold Signature
A cryptographic scheme allowing **n replicas to produce a single aggregated signature** requiring participation from at least f+1 honest nodes. Reduces PBFT's O(n²) all-to-all broadcasting to O(n) leader-to-replicas and replicas-to-leader.

**Related Terms:** [Quorum Certificate](#quorum-certificate), [Aggregation](#aggregation)

---

### Quorum Certificate (QC)
In HotStuff, a **threshold signature** from 2f+1 replicas certifying agreement on a proposal. Replaces PBFT's per-replica prepare/commit messages.

**Aliases:** QC  
**Related Terms:** [Threshold Signature](#threshold-signature), [Prepare Phase (HotStuff)](#prepare-phase-hotstuff)

---

### Prepare Phase (HotStuff)
**Phase 1 of HotStuff**: Leader proposes a value, replicas vote with partial signatures:
- Replicas send votes to leader
- Leader aggregates 2f+1 votes into a Quorum Certificate

**Related Terms:** [Pre-Commit Phase](#pre-commit-phase), [Quorum Certificate](#quorum-certificate)

---

### Pre-Commit Phase
**Phase 2 of HotStuff**: Leader broadcasts the prepare QC, replicas vote again:
- Confirms quorum agreement on the proposal
- Leader aggregates into pre-commit QC

**Related Terms:** [Prepare Phase (HotStuff)](#prepare-phase-hotstuff), [Commit Phase (HotStuff)](#commit-phase-hotstuff)

---

### Commit Phase (HotStuff)
**Phase 3 of HotStuff** (in chained variant): Leader broadcasts pre-commit QC, replicas finalize:
- Replicas can safely commit the proposal
- Chain structure allows pipelining

**Related Terms:** [Pre-Commit Phase](#pre-commit-phase), [Chained HotStuff](#chained-hotstuff)

---

### Responsiveness
A liveness property where **consensus latency depends on actual network delay**, not pre-configured timeouts. HotStuff achieves responsiveness through:
- Optimistic execution when network is fast
- No fixed timeout for leader rotation

**Related Terms:** [Liveness](#liveness), [View Change](#view-change-hotstuff)

---

### View Change (HotStuff)
HotStuff's leader replacement mechanism, simpler than PBFT:
- New leader proposes highest certified proposal
- O(n) complexity (vs. PBFT's O(n²))

**Related Terms:** [View Number](#view-number-hotstuff), [Leader](#leader-hotstuff)

---

### O(n) Complexity
HotStuff's **linear communication complexity**: Leader broadcasts to n replicas, replicas send votes to leader, leader broadcasts QC. Total: O(n) messages per phase.

**Comparison:** PBFT requires O(n²) due to all-to-all broadcasting.

**Related Terms:** [Threshold Signature](#threshold-signature), [O(n²) Complexity](#on-complexity)

---

### Chained HotStuff
A HotStuff variant where **consensus phases are pipelined**:
- Prepare, pre-commit, and commit phases of different proposals overlap
- Amortizes latency across proposals
- Described in the Decentralized Thoughts HotStuff 2 article

**Related Terms:** [Pipelining](#pipelining), [HotStuff](#hotstuff)

---

## General Distributed Systems Terms

### Agreement
A consensus safety property: **All correct nodes decide the same value**.

**Related Terms:** [Validity](#validity), [Termination](#termination), [Safety](#safety)

---

### Validity
A consensus safety property: **The decided value must be valid** (e.g., proposed by some correct node, not arbitrary).

**Related Terms:** [Agreement](#agreement), [Termination](#termination), [Safety](#safety)

---

### Termination
A consensus liveness property: **Every correct node eventually decides**.

**Related Terms:** [Agreement](#agreement), [Validity](#validity), [Liveness](#liveness)

---

### Asynchronous Network
A network model with **no bounds on message delay or processing time**. BFT algorithms must handle asynchrony gracefully.

**Related Terms:** [Partially Synchronous Network](#partially-synchronous-network), [Synchronous Network](#synchronous-network)

---

### Partially Synchronous Network
A practical network model assuming **eventual synchrony**: After some unknown time (Global Stabilization Time), message delays are bounded. Most BFT algorithms (PBFT, HotStuff) assume partial synchrony.

**Related Terms:** [Asynchronous Network](#asynchronous-network), [Synchronous Network](#synchronous-network), [GST](#gst)

---

### Synchronous Network
A network model with **known bounded message delays**. Simplifies consensus but unrealistic for real networks.

**Related Terms:** [Asynchronous Network](#asynchronous-network), [Partially Synchronous Network](#partially-synchronous-network)

---

### GST (Global Stabilization Time)
In partially synchronous models, the **unknown time after which the network becomes synchronous** (message delays are bounded). Algorithms must ensure safety before GST and liveness after GST.

**Related Terms:** [Partially Synchronous Network](#partially-synchronous-network)

---

### Quorum Intersection
A property ensuring **any two quorums share at least one honest node**. With 3f+1 replicas and 2f+1 quorums:
- Two quorums intersect in at least (2f+1) + (2f+1) - (3f+1) = f+1 nodes
- At most f Byzantine → guaranteed honest intersection

**Related Terms:** [Quorum](#quorum), [2f+1 Threshold](#2f1-threshold)

---

### State Machine Replication (SMR)
A technique for achieving fault tolerance by **replicating a deterministic state machine** across multiple nodes. BFT consensus ensures replicas process operations in the same order.

**Aliases:** SMR  
**Related Terms:** [Total Order](#total-order), [Determinism](#determinism)

---

### Total Order
A property ensuring **all replicas process operations in the same sequence**. Required for state machine replication.

**Related Terms:** [Sequence Number](#sequence-number), [State Machine Replication](#state-machine-replication)

---

### Determinism
A requirement for state machine replication: **Same inputs in the same order produce the same outputs**. Non-deterministic operations (e.g., randomness, timestamps) break SMR.

**Related Terms:** [State Machine Replication](#state-machine-replication), [Total Order](#total-order)

---

## Advanced Terms (Module 05)

### Pipelining
A technique for **overlapping consensus rounds** to increase throughput. Chained HotStuff uses pipelining to amortize latency.

**Related Terms:** [Chained HotStuff](#chained-hotstuff), [Throughput](#throughput)

---

### Throughput
The **number of transactions processed per unit time**. BFT optimizations often focus on improving throughput without sacrificing safety.

**Related Terms:** [Latency](#latency), [Pipelining](#pipelining)

---

### Latency
The **time from request submission to finalization**. HotStuff reduces latency through responsiveness and O(n) complexity.

**Related Terms:** [Throughput](#throughput), [Responsiveness](#responsiveness)

---

### Optimistic BFT
BFT algorithms that **assume optimistic conditions** (e.g., no Byzantine faults, synchronous network) for faster consensus, falling back to full BFT protocol when needed.

**Related Terms:** [HotStuff](#hotstuff), [Fast Path](#fast-path)

---

### Fast Path
An optimized consensus path in optimistic BFT algorithms, used when **network and nodes behave well**. Provides lower latency than the fault-tolerant slow path.

**Related Terms:** [Optimistic BFT](#optimistic-bft), [Slow Path](#slow-path)

---

### Slow Path
The **fault-tolerant fallback** in optimistic BFT algorithms, used when the fast path conditions are violated.

**Related Terms:** [Fast Path](#fast-path), [Optimistic BFT](#optimistic-bft)

---

## Acronyms

- **BFT**: Byzantine Fault Tolerance
- **PBFT**: Practical Byzantine Fault Tolerance
- **QC**: Quorum Certificate
- **SMR**: State Machine Replication
- **GST**: Global Stabilization Time
- **f**: Maximum number of Byzantine faults tolerated

---

## Notation

- **n**: Total number of replicas (typically 3f+1)
- **f**: Maximum Byzantine faults tolerated
- **2f+1**: Quorum size (minimum for safety)
- **v**: View number (PBFT)
- **O(n²)**: PBFT communication complexity
- **O(n)**: HotStuff communication complexity

---

**Need more definitions?** Terms are added as you progress through modules. Check back or [suggest additions](https://github.com/study-ab/study-ab/issues).
