# References

Curated resources for Byzantine Fault Tolerance learning, organized by topic.

---

## 📜 Foundational Papers

### Byzantine Generals Problem

**Lamport, L., Shostak, R., & Pease, M. (1982). "The Byzantine Generals Problem."**  
*ACM Transactions on Programming Languages and Systems*, 4(3), 382-401.

- **Primary URL**: [https://lamport.azurewebsites.net/pubs/byz.pdf](https://lamport.azurewebsites.net/pubs/byz.pdf)
- **Fallback**: [https://web.archive.org/web/*/lamport.azurewebsites.net/pubs/byz.pdf](https://web.archive.org/web/*/lamport.azurewebsites.net/pubs/byz.pdf)
- **Local Cache**: [cached-articles/byzantine-generals-1982.pdf](../resources/papers/byzantine-generals-1982.pdf)
- **Summary**: The original formulation of the Byzantine agreement problem as a thought experiment with generals coordinating an attack. Proves impossibility results and presents algorithms for oral and written message scenarios.

---

### PBFT (Practical Byzantine Fault Tolerance)

**Castro, M., & Liskov, B. (1999). "Practical Byzantine Fault Tolerance."**  
*OSDI*, 99, 173-186.

- **Primary URL**: [http://pmg.csail.mit.edu/papers/osdi99.pdf](http://pmg.csail.mit.edu/papers/osdi99.pdf)
- **Fallback**: [https://web.archive.org/web/*/pmg.csail.mit.edu/papers/osdi99.pdf](https://web.archive.org/web/*/pmg.csail.mit.edu/papers/osdi99.pdf)
- **Local Cache**: [cached-articles/pbft-osdi99.pdf](../resources/papers/pbft-osdi99.pdf)
- **Summary**: The first practical BFT algorithm achieving performance suitable for real systems. Introduces the three-phase protocol (pre-prepare, prepare, commit) and view changes for fault recovery. Demonstrates O(n²) communication complexity.

---

**Castro, M., & Liskov, B. (2002). "Practical Byzantine Fault Tolerance and Proactive Recovery."**  
*ACM Transactions on Computer Systems*, 20(4), 398-461.

- **Primary URL**: [http://pmg.csail.mit.edu/papers/bft-tocs.pdf](http://pmg.csail.mit.edu/papers/bft-tocs.pdf)
- **Summary**: Extended PBFT paper with proactive recovery mechanisms and complete protocol specification.

---

### HotStuff

**Yin, M., Malkhi, D., Reiter, M. K., Gueta, G. G., & Abraham, I. (2019). "HotStuff: BFT Consensus with Linearity and Responsiveness."**  
*PODC*, 347-356.

- **Primary URL**: [https://arxiv.org/abs/1803.05069](https://arxiv.org/abs/1803.05069)
- **PDF**: [https://arxiv.org/pdf/1803.05069.pdf](https://arxiv.org/pdf/1803.05069.pdf)
- **Fallback**: [https://dl.acm.org/doi/10.1145/3293611.3331591](https://dl.acm.org/doi/10.1145/3293611.3331591)
- **Local Cache**: [cached-articles/hotstuff-podc2019.pdf](../resources/papers/hotstuff-podc2019.pdf)
- **Summary**: Introduces HotStuff, achieving O(n) communication complexity through threshold signatures and responsiveness property. Foundation for modern BFT algorithms used in blockchains (Diem, Cosmos).

---

## 📝 Key Articles and Blog Posts

### Decentralized Thoughts Blog

An exceptional resource for understanding BFT consensus in accessible language.

**Abraham, I., & Malkhi, D. (2023). "HotStuff 2."**  
*Decentralized Thoughts Blog*, April 1, 2023.

- **Primary URL**: [https://decentralizedthoughts.github.io/2023-04-01-hotstuff-2/](https://decentralizedthoughts.github.io/2023-04-01-hotstuff-2/)
- **Fallback**: [https://web.archive.org/web/*/decentralizedthoughts.github.io/2023-04-01-hotstuff-2/](https://web.archive.org/web/*/decentralizedthoughts.github.io/2023-04-01-hotstuff-2/)
- **Local Cache**: [cached-articles/hotstuff-2-decentralized-thoughts.md](cached-articles/hotstuff-2-decentralized-thoughts.md)
- **Summary**: **Primary resource for Module 03**. Explains HotStuff 2's two-phase protocol with excellent diagrams and intuition. More accessible than the original paper.

---

**Other Decentralized Thoughts Articles:**

- **"The Byzantine Generals Problem"** - [https://decentralizedthoughts.github.io/2019-06-07-the-byzantine-generals-problem/](https://decentralizedthoughts.github.io/2019-06-07-the-byzantine-generals-problem/)
- **"Synchrony, Asynchrony and Partial Synchrony"** - [https://decentralizedthoughts.github.io/2019-06-01-2019-5-31-models/](https://decentralizedthoughts.github.io/2019-06-01-2019-5-31-models/)
- **"HotStuff: Three-chain Rules!"** - [https://decentralizedthoughts.github.io/2019-06-23-hotstuff-three-chain-rules/](https://decentralizedthoughts.github.io/2019-06-23-hotstuff-three-chain-rules/)
- **"Tendermint"** - [https://decentralizedthoughts.github.io/2019-06-23-tendermint/](https://decentralizedthoughts.github.io/2019-06-23-tendermint/)

---

## 🎥 Videos and Lectures

### PBFT

**Barbara Liskov - PODC 2001 Keynote: "Practical Byzantine Fault Tolerance"**
- **URL**: [https://www.youtube.com/watch?v=Uj638eFIWg8](https://www.youtube.com/watch?v=Uj638eFIWg8) (if available)
- **Summary**: Barbara Liskov explains PBFT's design and implementation challenges.

---

### HotStuff

**Dahlia Malkhi - "HotStuff: BFT Consensus with Linearity and Responsiveness"**
- **Conference**: PODC 2019 presentation
- **Summary**: Technical overview of HotStuff's innovations.

---

### General BFT

**MIT 6.824: Distributed Systems (2023) - Lecture on Byzantine Fault Tolerance**
- **URL**: [https://pdos.csail.mit.edu/6.824/](https://pdos.csail.mit.edu/6.824/)
- **Summary**: Academic lecture covering BFT fundamentals.

---

## 💻 Real-World Implementations

### Tendermint

**Tendermint Core Documentation**
- **URL**: [https://docs.tendermint.com/](https://docs.tendermint.com/)
- **GitHub**: [https://github.com/tendermint/tendermint](https://github.com/tendermint/tendermint)
- **Summary**: BFT consensus engine for the Cosmos blockchain ecosystem. Production-ready implementation with extensive documentation.
- **Use in Learning Path**: Module 04 - Real-world systems analysis

---

**Kwon, J. (2014). "Tendermint: Consensus without Mining."**
- **URL**: [https://tendermint.com/static/docs/tendermint.pdf](https://tendermint.com/static/docs/tendermint.pdf)
- **Summary**: Original Tendermint whitepaper explaining its BFT consensus mechanism.

---

### Diem BFT (LibraBFT)

**Baudet, M., Ching, A., Chursin, A., et al. (2019). "State Machine Replication in the Diem Blockchain."**  
*Diem Technical Papers*

- **URL**: [https://developers.diem.com/papers/diem-consensus-state-machine-replication-in-the-diem-blockchain/](https://developers.diem.com/papers/diem-consensus-state-machine-replication-in-the-diem-blockchain/)
- **Fallback**: [https://arxiv.org/abs/1910.05672](https://arxiv.org/abs/1910.05672) (LibraBFT v1)
- **GitHub**: [https://github.com/diem/diem](https://github.com/diem/diem) (archived)
- **Summary**: Meta's (formerly Facebook) HotStuff-based BFT implementation for the Diem blockchain (formerly Libra). Demonstrates production HotStuff with optimizations.
- **Use in Learning Path**: Module 03 and 04 - HotStuff variant analysis

---

### Hyperledger Fabric

**Hyperledger Fabric Documentation - Ordering Service**
- **URL**: [https://hyperledger-fabric.readthedocs.io/en/latest/orderer/ordering_service.html](https://hyperledger-fabric.readthedocs.io/en/latest/orderer/ordering_service.html)
- **GitHub**: [https://github.com/hyperledger/fabric](https://github.com/hyperledger/fabric)
- **Summary**: Enterprise blockchain framework with BFT ordering options (formerly PBFT, now Raft/etcdraft for CFT).
- **Use in Learning Path**: Module 04 - Enterprise BFT context

---

## 📚 Advanced BFT Research

### Optimizations and Variants

**Golan Gueta, I., et al. (2018). "SBFT: A Scalable and Decentralized Trust Infrastructure."**  
*DSN 2018*

- **URL**: [https://arxiv.org/abs/1804.01626](https://arxiv.org/abs/1804.01626)
- **Summary**: IBM Research's scalable BFT with sharding and performance optimizations.
- **Use in Learning Path**: Module 05 - Advanced topics

---

**Gelashvili, R., et al. (2022). "Jolteon and Ditto: Network-Adaptive Efficient Consensus with Asynchronous Fallback."**  
*Financial Cryptography 2022*

- **URL**: [https://eprint.iacr.org/2020/1167](https://eprint.iacr.org/2020/1167)
- **Summary**: Fast-HotStuff variants with optimistic fast paths and asynchronous fallback.
- **Use in Learning Path**: Module 05 - Optimizations

---

**Spiegelman, A., et al. (2022). "Bullshark: DAG BFT Protocols Made Practical."**  
*CCS 2022*

- **URL**: [https://arxiv.org/abs/2201.05677](https://arxiv.org/abs/2201.05677)
- **Summary**: DAG-based BFT for high throughput.
- **Use in Learning Path**: Module 05 - Research directions

---

### Asynchronous BFT

**Miller, A., et al. (2016). "The Honey Badger of BFT Protocols."**  
*CCS 2016*

- **URL**: [https://eprint.iacr.org/2016/199](https://eprint.iacr.org/2016/199)
- **Summary**: First practical asynchronous BFT protocol (no timing assumptions).
- **Use in Learning Path**: Module 05 - Advanced topics

---

## 🎓 Course Materials

### MIT 6.824: Distributed Systems
- **URL**: [https://pdos.csail.mit.edu/6.824/](https://pdos.csail.mit.edu/6.824/)
- **Summary**: Graduate-level distributed systems course with BFT lecture notes and labs.

---

### Stanford CS244b: Distributed Systems
- **URL**: [http://www.scs.stanford.edu/~dm/home/cs244b.html](http://www.scs.stanford.edu/~dm/home/cs244b.html)
- **Summary**: Distributed systems course with Byzantine fault tolerance coverage.

---

## 📖 Books

**Cachin, C., Guerraoui, R., & Rodrigues, L. (2011). "Introduction to Reliable and Secure Distributed Programming."**  
*Springer*

- **Summary**: Comprehensive textbook covering Byzantine agreement, consensus, and replication protocols.

---

**Kleppmann, M. (2017). "Designing Data-Intensive Applications."**  
*O'Reilly Media*

- **URL**: [https://dataintensive.net/](https://dataintensive.net/)
- **Summary**: Chapter 9 covers consistency, consensus, and distributed transactions (non-Byzantine focus but excellent foundations).

---

## 🔗 Community Resources

### Forums and Discussions

- **Decentralized Thoughts Blog**: [https://decentralizedthoughts.github.io/](https://decentralizedthoughts.github.io/)
- **Ethereum Research (Consensus Layer)**: [https://ethresear.ch/c/consensus-layer/42](https://ethresear.ch/c/consensus-layer/42)
- **Cosmos Forum**: [https://forum.cosmos.network/](https://forum.cosmos.network/)

---

### GitHub Repositories

- **PBFT Implementations**:
  - [https://github.com/hyperledger/fabric](https://github.com/hyperledger/fabric) (Hyperledger Fabric)
  - [https://github.com/vmware/concord-bft](https://github.com/vmware/concord-bft) (VMware Concord-BFT)

- **HotStuff Implementations**:
  - [https://github.com/tendermint/tendermint](https://github.com/tendermint/tendermint) (Tendermint)
  - [https://github.com/diem/diem](https://github.com/diem/diem) (Diem - archived)
  - [https://github.com/aptos-labs/aptos-core](https://github.com/aptos-labs/aptos-core) (Aptos - Diem successor)

---

## 📅 Historical Context

**1980s**: Byzantine agreement theoretical foundations  
**1982**: Byzantine Generals Problem (Lamport, Shostak, Pease)  
**1999**: PBFT (Castro, Liskov) - first practical BFT  
**2014**: Tendermint (Kwon) - BFT for blockchains  
**2018**: HotStuff (Yin, Malkhi, et al.) - linear complexity  
**2019**: LibraBFT (Meta/Facebook) - production HotStuff  
**2020s**: DAG-based BFT, optimistic BFT, asynchronous BFT

---

## 🛠️ How to Use These References

### By Module

- **Module 01 (Foundation)**: Byzantine Generals Problem paper, Decentralized Thoughts intro articles
- **Module 02 (PBFT)**: PBFT OSDI'99 paper, Barbara Liskov talks
- **Module 03 (HotStuff)**: HotStuff 2 article (primary), HotStuff PODC paper (depth)
- **Module 04 (Practical)**: Tendermint docs, Diem BFT paper, Hyperledger Fabric docs
- **Module 05 (Advanced)**: SBFT, Jolteon/Ditto, Honey Badger, Bullshark

---

### By Learning Goal

- **Understanding fundamentals**: Byzantine Generals Problem, Decentralized Thoughts blog
- **Tracing protocols**: PBFT paper, HotStuff 2 article
- **Real-world context**: Tendermint docs, Diem BFT paper, blockchain whitepapers
- **Research depth**: PODC/CCS conference papers, advanced variants

---

**Found a broken link?** [Report it](https://github.com/study-ab/study-ab/issues) so we can update fallback URLs or local caches.

**Suggest a resource?** [Open a pull request](https://github.com/study-ab/study-ab/pulls) to add valuable BFT learning materials.
