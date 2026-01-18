# BFT Algorithm Learning Path

Welcome to the **Byzantine Fault Tolerance (BFT) Algorithm Learning Path** – a comprehensive, progressive journey from foundational concepts to modern BFT consensus algorithms.

## 🎯 What You'll Learn

This self-paced curriculum takes you from the classic Byzantine Generals Problem to cutting-edge algorithms like HotStuff 2.0. By the end, you'll be able to:

- ✅ **Explain** the Byzantine Generals Problem and why Byzantine fault tolerance matters
- ✅ **Distinguish** between crash faults, omission faults, and Byzantine faults
- ✅ **Understand** safety and liveness properties in distributed systems
- ✅ **Trace** PBFT (Practical Byzantine Fault Tolerance) three-phase consensus rounds
- ✅ **Compare** PBFT's O(n²) communication complexity with HotStuff's O(n) linear complexity
- ✅ **Analyze** HotStuff 2.0's two-phase protocol and responsiveness property
- ✅ **Identify** BFT algorithms in real-world systems (Tendermint, Diem, Hyperledger)
- ✅ **Apply** protocol analysis frameworks to evaluate BFT implementations

---

## 📚 Learning Modules

This learning path consists of **5 progressive modules**:

### 🔵 **Module 01: Foundation** *(Priority: P1 - Core)* 
**Estimated Time:** 2-3 hours

Build essential BFT foundations:
- Byzantine Generals Problem (the classic thought experiment)
- Fault models: crash vs. Byzantine failures
- Safety ("nothing bad happens") vs. liveness ("something good eventually happens")
- Threshold requirements: why 3f+1 replicas and 2f+1 quorums

[**Start Module 01 →**](modules/01-foundation/README.md)

---

### 🟢 **Module 02: Classical BFT - PBFT** *(Priority: P2 - Important)*
**Estimated Time:** 3-4 hours  
**Prerequisites:** Module 01

Master the classical BFT algorithm:
- PBFT's three-phase protocol (pre-prepare, prepare, commit)
- View changes and primary failure recovery
- O(n²) communication complexity and its implications
- Quorum intersection guarantees

[**Start Module 02 →**](modules/02-pbft/README.md)

---

### 🔵 **Module 03: HotStuff 2.0 Deep Dive** *(Priority: P1 - Core)*
**Estimated Time:** 3 hours  
**Prerequisites:** Modules 01, 02

Understand modern BFT through HotStuff:
- Guided reading of the [Decentralized Thoughts HotStuff 2.0 article](https://decentralizedthoughts.github.io/2023-04-01-hotstuff-2/)
- Two-phase protocol with threshold signatures
- O(n) linear communication complexity
- Responsiveness and optimistic execution
- Side-by-side comparison with PBFT

[**Start Module 03 →**](modules/03-hotstuff/README.md)

---

### 🟡 **Module 04: Practical Application** *(Priority: P3 - Supplementary)*
**Estimated Time:** 2-3 hours  
**Prerequisites:** Modules 01, 02, 03

Apply BFT knowledge to real-world systems:
- Tendermint consensus in the Cosmos ecosystem
- Diem BFT (LibraBFT) - HotStuff in production
- Hyperledger Fabric's BFT ordering
- Protocol analysis framework and comparison exercises

[**Start Module 04 →**](modules/04-practical/README.md)

---

### 🟣 **Module 05: Advanced Topics** *(Priority: P4 - Optional)*
**Estimated Time:** 2 hours  
**Prerequisites:** Modules 01, 02, 03

Explore advanced BFT concepts:
- BFT variants (PoS BFT, optimistic BFT, chained consensus)
- Performance optimizations (pipelining, sharding)
- Current research directions and open problems
- Reading guide for academic BFT papers

[**Start Module 05 →**](modules/05-advanced/README.md)

---

## 🚀 Getting Started

### Prerequisites

Before beginning, you should have:

- **Basic distributed systems knowledge**: Client-server architecture, message passing, network communication
- **Consensus fundamentals**: Understanding of what consensus means (nodes agreeing on a value)
- **Failure models**: Familiarity with crash failures and network partitions

Don't have these? Check our [**Prerequisites Guide**](resources/prerequisites.md) for recommended preparation resources.

### How to Navigate This Learning Path

1. **Start with Module 01** (Foundation) – don't skip this!
2. **Complete modules sequentially** for the full experience
3. **Use checkpoints** at the end of each module to verify understanding
4. **Engage with exercises** – protocol tracing and thought experiments cement knowledge
5. **Reference the glossary** when you encounter unfamiliar terms

[**📖 Read the Full Getting Started Guide →**](GETTING-STARTED.md)

---

## 🎓 Learning Features

### Interactive Diagrams
- **Mermaid.js sequence diagrams**: Step through PBFT and HotStuff message flows
- **D3.js visualizations**: Experiment with Byzantine failure scenarios
- **Vega-Lite charts**: Compare algorithm complexity at a glance

### Self-Assessment Checkpoints
Each module includes 3-5 questions to verify your understanding before moving forward. Review explanations for incorrect answers and revisit concepts as needed.

### Hands-On Exercises
- 🧠 **Thought experiments**: "What happens if the primary is Byzantine?"
- 📊 **Protocol traces**: Step through consensus rounds message-by-message
- 📝 **Comparison tables**: Systematically evaluate algorithm tradeoffs
- 🎮 **Interactive simulations**: Visualize Byzantine scenarios (where available)

### Curated Resources
- 📄 Academic papers (Byzantine Generals, PBFT, HotStuff)
- 🎥 Conference talks and lecture videos
- 💻 Real-world implementations (Tendermint, Diem, Hyperledger)
- 📚 Blog posts and tutorials from experts

---

## 🧭 Recommended Learning Paths

### **For Beginners** (No BFT Experience)
```
01 Foundation → 02 PBFT → 03 HotStuff → 04 Practical → (optional) 05 Advanced
```
**Total Time:** 12-15 hours

### **For Those with BFT Background**
```
Skim 01 → 02 PBFT → 03 HotStuff → 04 Practical
```
**Total Time:** 8-10 hours

### **For HotStuff-Focused Learners**
```
01 Foundation (focus on thresholds) → 02 PBFT (overview) → 03 HotStuff (deep dive)
```
**Total Time:** 6-8 hours

---

## 📖 Resources

- [**Glossary**](resources/glossary.md): Definitions of all BFT terms
- [**References**](resources/references.md): Academic papers, articles, and videos
- [**Prerequisites**](resources/prerequisites.md): Recommended background knowledge

---

## 🤝 Community & Support

- **Questions?** Open a [GitHub Discussion](https://github.com/study-ab/study-ab/discussions)
- **Found an error?** Submit an [issue](https://github.com/study-ab/study-ab/issues)
- **Want to contribute?** See [CONTRIBUTING.md](../CONTRIBUTING.md)

---

## 📜 License

This learning path is licensed under [CC BY-SA 4.0](../LICENSE.md) – you're free to use, remix, and share with attribution.

---

## ✨ Acknowledgments

This learning path is built on the shoulders of giants:
- **Leslie Lamport, Robert Shostak, Marshall Pease** – Byzantine Generals Problem (1982)
- **Miguel Castro, Barbara Liskov** – PBFT (1999)
- **Maofan Yin, Dahlia Malkhi, et al.** – HotStuff (2019)
- **Ittai Abraham, Dahlia Malkhi** – [Decentralized Thoughts blog](https://decentralizedthoughts.github.io/)

---

**Ready to begin?** 🚀

[**Start Module 01: Foundation →**](modules/01-foundation/README.md)
