# Fault Models in Distributed Systems

A **fault model** specifies the types and number of failures a distributed system is designed to tolerate. Understanding fault models is crucial for designing robust consensus protocols and choosing the right algorithm for your use case.

---

## The Fault Spectrum

Fault models exist on a spectrum from **benign** (easy to handle) to **adversarial** (difficult to tolerate):

```
Benign ←──────────────────────────────────────────────→ Adversarial
        Crash         Omission              Byzantine
```

Each model makes different assumptions about how nodes can fail.

---

## 1. Crash Fault Model

### Definition

A **crash fault** occurs when a node **stops functioning entirely** and ceases all communication permanently.

!!! info "Crash Fault Characteristics"
    - Node halts and never recovers (fail-stop)
    - Sends no further messages
    - Behavior before crash was correct
    - **Benign**: No malicious or unpredictable behavior

### Examples

- **Server power loss**: Machine shuts down unexpectedly
- **Process killed**: Operating system terminates the process (e.g., OOM killer)
- **Unrecoverable panic**: Application encounters fatal error and exits

### Detection

Crash faults are relatively **easy to detect**:
- Timeout mechanisms: If a node doesn't respond within expected time, assume crashed
- Heartbeat monitoring: Periodic "I'm alive" messages; absence indicates crash

### Consensus Implications

- **Paxos** and **Raft** tolerate crash faults
- Require **2f+1 replicas** to tolerate f crash faults (simple majority)
- **No Byzantine behavior**: Crashed nodes don't send conflicting messages

!!! example "Banking System with Crash Faults"
    **Scenario**: 5-replica banking system, 2 replicas crash
    
    - **Before crash**: All replicas had balance = $1000
    - **After crash**: 2 replicas stop responding
    - **Remaining 3 replicas**: Continue processing with correct state ($1000)
    
    **Simple**: Majority (3 out of 5) agree on state; no conflicting information

---

## 2. Omission Fault Model

### Definition

An **omission fault** occurs when a node **fails to send or receive messages** but otherwise behaves correctly.

!!! info "Omission Fault Characteristics"
    - Node is running but drops some messages
    - Can be **send omission** (fails to send) or **receive omission** (fails to receive)
    - Node's internal state and computation are correct
    - **Intermittent**: May send some messages successfully, drop others

### Examples

- **Network partition**: Firewall or network failure blocks messages
- **Packet loss**: Unreliable network drops UDP packets
- **Buffer overflow**: Full message queue discards incoming messages
- **Congestion**: Network overload causes message delays or losses

### Detection

Omission faults are **harder to detect** than crash faults:
- Cannot distinguish slow network from omission
- May appear as timeout (like crash) but node is still alive
- Requires retransmission and acknowledgment mechanisms

### Consensus Implications

- Omission faults are **between crash and Byzantine** in severity
- Can sometimes be modeled as crash faults (conservative)
- Require careful protocol design to handle message loss

!!! tip "Omission vs. Crash"
    An omission fault can **look like** a crash fault (no messages received), but the node is still running. Protocols often assume omission faults are equivalent to crash faults for simplicity.

---

## 3. Byzantine Fault Model

### Definition

A **Byzantine fault** occurs when a node exhibits **arbitrary behavior**, including:
- Sending conflicting messages to different recipients
- Sending incorrect or corrupted data
- Remaining silent when expected to respond
- Colluding with other Byzantine nodes

!!! danger "Byzantine Fault Characteristics"
    - **Arbitrary behavior**: No constraints on faulty node actions
    - **Equivocation**: Sending different messages to different nodes
    - **Malicious or buggy**: Could be intentional attack or software bug
    - **Worst-case assumption**: Adversary controls Byzantine nodes

### Examples

#### Hardware-Induced Byzantine Faults
- **Memory corruption**: Faulty RAM causes incorrect computation results
- **Cosmic ray bit flips**: Single-event upsets alter CPU state mid-operation
- **Faulty network card**: Hardware sends different data to different recipients

#### Software-Induced Byzantine Faults
- **Non-deterministic bugs**: Race conditions produce inconsistent results
- **Memory safety violations**: Buffer overflows corrupt program state
- **Concurrency bugs**: Threads read/write shared state in unpredictable order

#### Security Attacks
- **Compromised nodes**: Attacker gains control and sends malicious messages
- **Sybil attacks**: Attacker creates multiple fake identities
- **Eclipse attacks**: Adversary isolates honest nodes from each other

### Detection

Byzantine faults are **extremely difficult to detect**:
- Faulty node may appear correct to some replicas, faulty to others
- Cannot trust any single node's report
- Requires cross-checking information from **multiple sources**

### Consensus Implications

- **PBFT** and **HotStuff** tolerate Byzantine faults
- Require **3f+1 replicas** to tolerate f Byzantine faults (stronger than simple majority)
- Must use **quorums of 2f+1** to ensure honest majority
- Need **multiple communication rounds** to detect conflicting information

!!! example "Banking System with Byzantine Faults"
    **Scenario**: 4-replica banking system, 1 Byzantine replica
    
    - **Byzantine Replica 1** tells:
      - Replica 2: "Balance is $1000"
      - Replica 3: "Balance is $500"
      - Replica 4: "Balance is $2000"
    
    **Challenge**: Replicas 2, 3, 4 must compare notes to detect the lie
    
    **Solution**: Each replica collects 2f+1 = 3 votes. With 3 honest replicas, majority voting reveals the correct value.

---

## Fault Model Comparison

| Aspect | Crash Fault | Omission Fault | Byzantine Fault |
|--------|-------------|----------------|-----------------|
| **Behavior** | Stop entirely | Drop messages | Arbitrary |
| **Detection** | Easy (timeout) | Moderate (timeout + retries) | Hard (cross-checking) |
| **Minimum Replicas** | 2f+1 | 2f+1 (often) | **3f+1** |
| **Quorum Size** | f+1 (majority) | f+1 (often) | **2f+1** |
| **Examples** | Paxos, Raft | - | PBFT, HotStuff |
| **Real-World Causes** | Power loss, OOM kill | Network partition, packet loss | Bugs, attacks, hardware errors |
| **Adversarial?** | No | No | Yes |

---

## Why Byzantine Fault Tolerance Is Harder

### 1. **Stronger Quorum Requirements**

- **Crash faults**: 2f+1 replicas, f+1 quorum (simple majority)
- **Byzantine faults**: 3f+1 replicas, 2f+1 quorum (supermajority)

**Reason**: With Byzantine faults, any f nodes might lie. A quorum of 2f+1 ensures at least f+1 are honest, forming a majority within the quorum.

### 2. **Message Authentication**

- **Crash faults**: No need to verify message authenticity (crashed nodes don't send messages)
- **Byzantine faults**: Must use **cryptographic signatures** to prevent forgery

### 3. **Multiple Communication Rounds**

- **Crash faults**: Single round often sufficient (collect f+1 votes)
- **Byzantine faults**: Need multiple rounds to detect equivocation and reach agreement

### 4. **Complex View Change**

- **Crash faults**: Simple leader election when primary crashes
- **Byzantine faults**: Must ensure Byzantine primary cannot disrupt safety during leader change

---

## Choosing a Fault Model

!!! question "When to use each fault model?"

### Use **Crash Fault Model** when:
- Trust assumptions: Nodes are operated by same organization
- Environment: Controlled datacenter, unlikely malicious attacks
- Performance priority: Want lower latency/overhead
- Examples: Raft in etcd, Paxos in Chubby

### Use **Byzantine Fault Model** when:
- Trustless: Multiple independent operators (blockchain, multi-org consortium)
- Adversarial: Public or untrusted environment
- High stakes: Financial systems, critical infrastructure
- Examples: Blockchain consensus (Tendermint, LibraBFT), Byzantine-tolerant databases

!!! warning "Conservative Choice"
    Byzantine fault tolerance is **stronger**: if your system tolerates Byzantine faults, it automatically tolerates crash and omission faults. But BFT comes with **higher cost** (more replicas, more communication).

---

## Thought Experiment

!!! question "Exercise: Fault Classification"
    Classify each scenario as **Crash**, **Omission**, or **Byzantine** fault:
    
    1. A server's power supply fails, shutting down the machine.
    2. A router drops 50% of packets due to congestion.
    3. A buggy replica sends "COMMIT" to some nodes and "ABORT" to others.
    4. A process is killed by the operating system's OOM killer.
    5. An attacker compromises a node and sends malicious votes.
    6. A network cable is unplugged, isolating a node.
    
    <details>
    <summary>Solutions</summary>
    
    1. **Crash fault** - Machine stops entirely, no further communication
    2. **Omission fault** - Messages are lost, but node is still operational
    3. **Byzantine fault** - Sending conflicting messages (equivocation) is arbitrary behavior
    4. **Crash fault** - Process terminates and stops sending messages
    5. **Byzantine fault** - Malicious behavior is arbitrary and adversarial
    6. **Omission fault** (or modeled as crash) - Cannot send/receive messages, but node is running
    
    </details>

---

## Key Takeaways

- **Crash faults** are benign: nodes simply stop
- **Omission faults** are intermittent: messages are lost, but computation is correct
- **Byzantine faults** are arbitrary: nodes can lie, equivocate, or collude
- **BFT requires 3f+1 replicas** vs. 2f+1 for crash fault tolerance
- **Choosing a fault model** depends on trust assumptions, environment, and performance requirements

---

## Related Concepts

- [Byzantine Generals Problem](byzantine-generals.md) - Why Byzantine faults are hard
- [Threshold Requirements](thresholds.md) - Why 3f+1 replicas for BFT
- [Fault Model](../../../../resources/glossary.md#fault-model) - Formal definition in glossary

---

## 🗺️ Navigation

**Previous**: [Byzantine Generals Problem](byzantine-generals.md)  
**Next**: [Safety and Liveness](safety-liveness.md)
