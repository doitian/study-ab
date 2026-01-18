# Contributing to BFT Algorithm Learning Path

Thank you for your interest in contributing! This learning path is a community effort to make Byzantine Fault Tolerance accessible to everyone.

---

## 🎯 Ways to Contribute

### 1. 🐛 Report Issues

Found an error, broken link, or confusing explanation?

**Steps**:
1. Check [existing issues](https://github.com/study-ab/study-ab/issues) to avoid duplicates
2. Create a new issue with:
   - **Title**: Clear, concise description
   - **Location**: Which module/file has the problem
   - **Description**: What's wrong and what should it say
   - **Impact**: How does this affect learners?

**Example**:
```
Title: Incorrect quorum calculation in Module 01
Location: docs/modules/01-foundation/thresholds.md, line 42
Description: States "2f+1 with f=2 requires 4 nodes" but should be "5 nodes"
Impact: Learners will calculate wrong thresholds
```

---

### 2. 📝 Improve Content

Suggestions for better explanations, examples, or exercises?

**Content Contributions**:
- Clarify confusing sections
- Add concrete examples
- Improve diagrams or create new ones
- Add thought experiments or exercises
- Fix typos or grammar

**Guidelines**:
- Use clear, accessible language (avoid unnecessary jargon)
- Include examples from real-world systems (Tendermint, Ethereum, etc.)
- Follow the existing module structure (see `docs/_templates/module-template.md`)
- Use consistent terminology from `docs/resources/glossary.md`

---

### 3. 🎨 Create Visualizations

Help learners understand complex protocols with diagrams and animations.

**Diagram Types**:
- **Mermaid.js**: Sequence diagrams, flowcharts, state machines
- **SVG**: Static diagrams (can be created in Figma, Inkscape, etc.)
- **D3.js**: Interactive visualizations (advanced)

**Requirements**:
- Include alt text for accessibility (WCAG 2.1 AA)
- Use high contrast colors (not red/green alone)
- Provide text descriptions alongside diagrams
- See `docs/_templates/accessibility-checklist.md` for full guidelines

---

### 4. 📚 Add Exercises or Checkpoints

Create practice problems, protocol traces, or self-assessment questions.

**Exercise Guidelines**:
- Target specific learning objectives
- Include progressive hints (don't give away the answer immediately)
- Provide detailed solutions with explanations
- Estimate difficulty and time required

**Checkpoint Guidelines**:
- 3-5 questions per module
- Cover key concepts from that module
- Include wrong-answer explanations (why incorrect options are wrong)
- Passing criteria: typically 70-80% (e.g., 4/5 correct)

---

## 📋 Contribution Workflow

### Quick Fixes (Typos, Links)

For small changes:
1. Click "Edit this page" on any documentation page
2. Make your change in the GitHub web editor
3. Submit a pull request

### Larger Changes (New Content, Diagrams)

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/study-ab.git
   cd study-ab
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b improve-pbft-diagrams
   ```

3. **Make your changes**
   - Follow the style guide (below)
   - Test locally with `mkdocs serve`
   - Check accessibility with axe DevTools

4. **Commit with clear messages**
   ```bash
   git add docs/modules/02-pbft/
   git commit -m "Add sequence diagram for PBFT view change"
   ```

5. **Push and create a pull request**
   ```bash
   git push origin improve-pbft-diagrams
   ```
   - Open a PR on GitHub
   - Describe what you changed and why
   - Link to any related issues

6. **Address review feedback**
   - Maintainers will review within 1-2 weeks
   - Make requested changes
   - Rebase if needed (`git rebase main`)

---

## 📝 Style Guide

### Writing Style

- **Tone**: Educational, encouraging, accessible (not condescending)
- **Person**: Use "you" to address the learner
- **Tense**: Present tense for explanations
- **Examples**: Use concrete, relatable examples
- **Clarity**: Define terms before using them, or link to glossary

**Good**:
> In PBFT, the primary assigns a sequence number to each request. This ensures all replicas process operations in the same order—critical for state machine replication.

**Bad**:
> The primary uses sequence numbers for total ordering. SMR requires this.

### Markdown Conventions

- **Headings**: Use sentence case ("Byzantine Generals Problem", not "Byzantine generals problem")
- **Code blocks**: Specify language for syntax highlighting
  ```python
  # Python example
  quorum_size = 2 * f + 1
  ```
- **Links**: Use descriptive text (not "click here")
  - **Good**: [Read the HotStuff paper](https://arxiv.org/abs/1803.05069)
  - **Bad**: [Click here](https://arxiv.org/abs/1803.05069) to read the paper
- **Emphasis**: Use **bold** for terms, *italics* for emphasis
- **Lists**: Use `-` for unordered lists, `1.` for ordered lists

### Admonitions (MkDocs Material)

Use admonitions for tips, warnings, notes:

```markdown
!!! note "Key Concept"
    PBFT requires 3f+1 replicas to tolerate f Byzantine faults.

!!! tip "Learning Tip"
    Draw the message flow yourself—visual learning helps!

!!! warning "Common Mistake"
    Don't confuse 2f+1 (quorum) with 3f+1 (total replicas).

!!! example "Real-World Example"
    Tendermint uses a variant of PBFT for Cosmos blockchain.
```

---

## ✅ Pull Request Checklist

Before submitting your PR, ensure:

- [ ] Content is technically accurate (cite sources if needed)
- [ ] Terminology matches `docs/resources/glossary.md`
- [ ] All diagrams have alt text and descriptions
- [ ] Links are valid (no 404s)
- [ ] Local build works (`mkdocs serve` with no errors)
- [ ] Spell-check and grammar-check passed
- [ ] Mobile-responsive (test with browser dev tools)
- [ ] Accessibility checked (if adding new interactive elements)

---

## 🔍 Review Process

1. **Automated checks**: GitHub Actions runs `mkdocs build --strict`
2. **Maintainer review**: Technical accuracy, pedagogical clarity, accessibility
3. **Feedback**: Requested changes or approval
4. **Merge**: Once approved, your contribution is merged!

**Timeline**: Most PRs are reviewed within 1-2 weeks. Urgent fixes (broken links, critical errors) are prioritized.

---

## 🧑‍🤝‍🧑 Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).

**In short**:
- Be respectful and inclusive
- Welcome newcomers and beginners
- Focus on constructive feedback
- No harassment, discrimination, or trolling

---

## 📚 Resources for Contributors

- **MkDocs Documentation**: [https://www.mkdocs.org/](https://www.mkdocs.org/)
- **Material for MkDocs**: [https://squidfunk.github.io/mkdocs-material/](https://squidfunk.github.io/mkdocs-material/)
- **Mermaid.js Diagrams**: [https://mermaid.js.org/](https://mermaid.js.org/)
- **Accessibility Guidelines**: [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- **Writing Style**: [Google Developer Documentation Style Guide](https://developers.google.com/style)

---

## ❓ Questions?

- **General questions**: [GitHub Discussions](https://github.com/study-ab/study-ab/discussions)
- **Contribution questions**: Tag maintainers in an issue or discussion
- **Technical help**: Check `docs/_templates/` for examples

---

**Thank you for contributing to BFT education!** 🙏

Every typo fix, diagram improvement, and exercise addition helps learners around the world understand Byzantine Fault Tolerance.
