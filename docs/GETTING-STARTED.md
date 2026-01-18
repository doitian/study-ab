# Getting Started: BFT Algorithm Learning Path

**Welcome!** This guide will help you begin your journey to understanding Byzantine Fault Tolerance algorithms.

---

## What You'll Learn

This learning path takes you from BFT fundamentals to modern algorithms like HotStuff 2.0. By the end, you'll:

- ✅ Understand the Byzantine Generals Problem and why BFT matters
- ✅ Trace PBFT (Practical Byzantine Fault Tolerance) consensus protocols
- ✅ Explain HotStuff 2.0's innovations over classical BFT
- ✅ Identify BFT algorithms in real-world systems (Tendermint, Diem)
- ✅ Compare communication complexity between PBFT and HotStuff

**Total Time**: 10-15 hours (self-paced)

---

## Prerequisites

Before starting, you should have:

### Required Knowledge
- [ ] **Basic distributed systems concepts**: Understand client-server architecture, message passing, and network communication
- [ ] **Consensus fundamentals**: Know what consensus means (nodes agreeing on a value)
- [ ] **Failure models**: Familiar with crash failures vs. network partitions

### Recommended (but not required)
- [ ] Completed a distributed systems course or equivalent
- [ ] Read about Paxos or Raft (non-Byzantine consensus algorithms)
- [ ] Basic understanding of cryptography (signatures, hashing)

### Don't Have Prerequisites?

If you're missing some background, start here:
- **Distributed Systems Basics**: [Martin Kleppmann's "Designing Data-Intensive Applications"](https://dataintensive.net/) - Chapter 5, 8, 9
- **Consensus Introduction**: [Raft visualization](https://raft.github.io/) - understand non-Byzantine consensus first
- **Network Failures**: [Aphyr's "Jepsen" blog](https://aphyr.com/posts/288-the-network-is-reliable) - real-world failure modes

---

## Learning Path Structure

This curriculum has **5 modules** with progressive complexity:

| Module | Title | Priority | Time | Prerequisites |
|--------|-------|----------|------|---------------|
| **01** | Foundation: BFT Fundamentals | **P1** (core) | 2-3 hours | Distributed systems basics |
| **02** | Classical BFT: PBFT Deep Dive | **P2** (important) | 3-4 hours | Module 01 |
| **03** | HotStuff 2.0 Deep Dive | **P1** (core) | 3 hours | Module 01, 02 |
| **04** | Practical Application & Comparison | **P3** (supplementary) | 2-3 hours | Module 01, 02, 03 |
| **05** | Advanced Topics & Ecosystem | **P4** (optional) | 2 hours | Module 01, 02, 03 |

### Priority Levels Explained
- **P1 (Core)**: Essential for understanding BFT algorithms - don't skip these!
- **P2 (Important)**: PBFT is the classical baseline - critical for context
- **P3 (Supplementary)**: Practical application helps cement knowledge
- **P4 (Optional)**: Advanced topics for those going deeper

### Recommended Learning Sequence

**For Beginners** (no BFT experience):
```
01 Foundation → 02 PBFT → 03 HotStuff → 04 Practical → (optional) 05 Advanced
```

**For Those with BFT Background** (already familiar with Byzantine Generals):
```
Skim 01 → 02 PBFT → 03 HotStuff → 04 Practical
```

**For HotStuff-Focused Learners** (want to understand HotStuff quickly):
```
01 Foundation (focus on thresholds) → 02 PBFT (overview only) → 03 HotStuff (deep dive)
```

---

## How to Use This Learning Path

### 1. Start with Module 01

Navigate to `docs/modules/01-foundation/README.md` and begin reading.

### 2. Follow the Module Structure

Each module contains:
- **README.md**: Overview, learning objectives, prerequisites
- **Concept pages**: Individual topics (e.g., `byzantine-generals.md`, `safety-liveness.md`)
- **Diagrams**: Visual aids in `/diagrams/` folder
- **Exercises**: Practice activities in `/exercises/` folder
- **Checkpoint**: Self-assessment at the end (`checkpoint.md`)

### 3. Use Checkpoints to Verify Understanding

At the end of each module, complete the checkpoint before moving on:
- Answer 3-5 questions covering key concepts
- Review explanations for incorrect answers
- Revisit concepts if needed

**Passing criteria**: Typically 70-80% correct (3/4 or 4/5 questions)

### 4. Engage with Exercises

Don't skip exercises! They help you:
- Apply theoretical knowledge
- Trace protocols step-by-step
- Compare algorithms systematically

**Types of exercises**:
- 🧠 **Thought experiments**: Scenario-based questions (e.g., "What happens if the primary is Byzantine?")
- 📊 **Protocol traces**: Step through PBFT/HotStuff message flows
- 📝 **Comparison tables**: Fill in algorithm differences
- 🎮 **Interactive simulations**: Visualize Byzantine scenarios (where available)

### 5. Reference the Glossary

Stuck on a term? Check `docs/resources/glossary.md` for definitions:
- **Byzantine fault**: Arbitrary failure behavior
- **Quorum**: Subset of nodes needed for consensus (2f+1 or 3f+1)
- **Safety**: "Nothing bad happens" (no disagreement)
- **Liveness**: "Something good eventually happens" (progress guaranteed)

### 6. Explore Additional Resources

Each module includes curated resources:
- 📄 **Academic papers**: Original BFT research
- 🎥 **Videos**: Lectures and conference talks
- 💻 **Implementations**: Real-world code (Tendermint, LibraBFT)
- 📚 **Articles**: Blog posts and tutorials

---

## Tips for Success

### Time Management
- **Block out focused time**: 1-2 hour sessions work best
- **Take breaks**: BFT concepts are dense - give your brain time to process
- **Don't rush**: Understanding the fundamentals pays off in later modules

### Active Learning Strategies
- ✏️ **Take notes**: Summarize key concepts in your own words
- 🗣️ **Explain to others**: Teaching solidifies understanding ([Feynman Technique](https://fs.blog/feynman-technique/))
- 🖼️ **Draw diagrams**: Visualize message flows and node states
- 🔁 **Repeat exercises**: Protocol tracing becomes easier with practice

### When You Get Stuck
1. **Re-read the concept**: Sometimes a second pass clarifies things
2. **Check the glossary**: Ensure you understand all terms
3. **Use external resources**: The references section has additional explanations
4. **Ask questions**: Open a GitHub Discussion or issue
5. **Take a break**: Come back with fresh eyes

### Making the Most of Diagrams
- **Sequence diagrams** (Mermaid): Trace message flows step-by-step
- **Interactive visualizations** (D3.js): Experiment with Byzantine scenarios
- **Comparison charts**: See algorithm tradeoffs at a glance

---

## Technical Setup (Optional)

### Viewing the Learning Path

**Online** (easiest):
- Visit [study-ab.dev](https://study-ab.dev) (hosted on GitHub Pages)
- No installation required, works on any device

**Offline** (local development):
```bash
# Clone the repository
git clone https://github.com/your-org/study-ab.git
cd study-ab

# Install dependencies
pip install -r requirements.txt

# Run local server
mkdocs serve

# Visit http://localhost:8000
```

**Print/PDF** (for offline study):
- Each module page has a print-friendly CSS layout
- Use browser's "Print to PDF" feature
- Diagrams are optimized for printing

### Browser Recommendations
- **Chrome/Edge**: Best support for interactive D3.js visualizations
- **Firefox**: Excellent Mermaid diagram rendering
- **Safari**: Full feature support on macOS/iOS
- **Mobile**: Responsive design works on tablets and phones

### Accessibility Features
- ♿ **Screen reader compatible**: All diagrams have alt-text and descriptions
- ⌨️ **Keyboard navigation**: Interactive elements accessible without mouse
- 🎨 **High contrast mode**: Toggle in site settings
- 🔍 **Adjustable text size**: Use browser zoom (Ctrl/Cmd + +/-)

---

## Learning Path Support

### Questions and Discussions
- **GitHub Discussions**: Ask questions, share insights
- **Issues**: Report errors or suggest improvements
- **Community**: Connect with other learners

### Contributing
Found a typo? Have a better explanation? Contributions welcome!
- See `CONTRIBUTING.md` for guidelines
- Open a pull request with improvements
- Help others in discussions

### Feedback
We'd love to hear from you:
- 📝 **Content feedback**: What worked? What was confusing?
- 🐛 **Bug reports**: Broken links, incorrect diagrams
- 💡 **Feature requests**: New modules, interactive elements

---

## Module Previews

### Module 01: Foundation
**What you'll learn**:
- The Byzantine Generals Problem (the classic thought experiment)
- Difference between crash faults and Byzantine faults
- Safety vs. liveness properties
- Why 3f+1 replicas are needed (and 2f+1 quorums)

**Key diagram**: Interactive Byzantine Generals visualization (try different failure scenarios)

---

### Module 02: PBFT
**What you'll learn**:
- PBFT's three-phase protocol (pre-prepare, prepare, commit)
- Primary/replica roles and view changes
- Why O(n²) communication complexity matters
- Quorum intersection guarantees

**Key exercise**: Trace a complete PBFT round with 4 replicas (f=1)

---

### Module 03: HotStuff 2.0
**What you'll learn**:
- HotStuff's two-phase protocol (prepare, pre-commit)
- How threshold signatures reduce complexity to O(n)
- Responsiveness and optimistic execution
- Comparing HotStuff to PBFT side-by-side

**Key resource**: [Decentralized Thoughts article](https://decentralizedthoughts.github.io/2023-04-01-hotstuff-2/) (guided reading)

---

### Module 04: Practical Application
**What you'll learn**:
- Tendermint's BFT implementation
- LibraBFT/Diem's HotStuff variant
- Protocol analysis framework
- Real-world tradeoffs and optimizations

**Key exercise**: Identify BFT mechanisms in blockchain whitepapers

---

### Module 05: Advanced Topics (Optional)
**What you'll explore**:
- BFT variants (PoS BFT, optimistic BFT)
- Pipelining and sharding techniques
- Current research directions
- Performance optimizations

---

## Ready to Begin?

🚀 **Start your journey**: [Module 01 - Foundation](modules/01-foundation/README.md)

---

## Frequently Asked Questions

### How long does the full learning path take?
**10-15 hours** total, but this varies:
- Beginners: 15-20 hours
- Those with distributed systems background: 10-12 hours
- Just HotStuff focus: 6-8 hours

### Can I skip modules?
**Recommended sequence**: Follow the order, but you can skip:
- Module 02 (PBFT) if you only want HotStuff 2.0 fundamentals (review the overview first)
- Module 04 (Practical) if you're focused on theory
- Module 05 (Advanced) is always optional

**Don't skip Module 01** - foundations are critical!

### Is this course graded?
No, this is self-paced learning with self-assessment checkpoints. No grades, certificates, or external evaluation.

### What if I don't understand the math?
We minimize heavy mathematics, but some is necessary:
- Focus on intuition first, rigor second
- Use diagrams to visualize concepts
- Skip proofs on first pass, return later if interested

### Can I use this for teaching?
Yes! Content is licensed under [CC BY-SA 4.0](LICENSE.md). You can:
- Use in courses or workshops
- Remix and adapt content
- Share with proper attribution

### How do I track my progress?
Currently manual - check off modules as you complete them. Future versions may include progress tracking.

---

**Questions?** Open a [GitHub Discussion](https://github.com/your-org/study-ab/discussions) or [issue](https://github.com/your-org/study-ab/issues).

**Good luck on your BFT learning journey! 🎓**
