# Module Template

This template provides a standard structure for all BFT learning modules.

---

## Module [NUMBER]: [TITLE]

**Priority**: [P1/P2/P3/P4]  
**Estimated Time**: [X-Y hours]  
**Prerequisites**: [List prerequisite modules or knowledge]

---

## 📚 Learning Objectives

By the end of this module, you will be able to:

- [ ] **[Action Verb]** [Specific, measurable outcome]
- [ ] **[Action Verb]** [Specific, measurable outcome]
- [ ] **[Action Verb]** [Specific, measurable outcome]

**Action Verbs**: Use Bloom's Taxonomy verbs (explain, trace, compare, identify, analyze, distinguish, evaluate)

---

## 🔍 Prerequisites

Before starting this module, ensure you:

- [ ] [Specific prerequisite]
- [ ] [Specific prerequisite]
- [ ] [Specific prerequisite]

**Missing prerequisites?** Review [Module X](link) or consult the [Prerequisites Guide](../resources/prerequisites.md).

---

## 📖 Module Content

### 1. [Section Title]

**Key Concept**: [Brief overview]

[Detailed explanation with examples]

**Diagram**: [Reference to diagram in /diagrams/ folder]

**Related Terms**: [Link to glossary entries]

---

### 2. [Section Title]

**Key Concept**: [Brief overview]

[Detailed explanation with examples]

**Visual Aid**: [Reference to Mermaid diagram, D3 visualization, or SVG]

---

### 3. [Section Title]

**Key Concept**: [Brief overview]

[Detailed explanation with examples]

**Example**: [Concrete example or scenario]

---

## 🎯 Exercises

### Exercise 1: [Title]

**Type**: [Thought experiment / Protocol trace / Comparison / Fill-in-blank]  
**Difficulty**: [Easy / Medium / Hard]  
**Estimated Time**: [X minutes]

**Prompt**:
[Exercise question or scenario]

**Hints**:
<details>
<summary>Hint 1</summary>
[Progressive hint without giving away answer]
</details>

<details>
<summary>Hint 2</summary>
[More specific hint]
</details>

**Solution**:
<details>
<summary>Show Solution</summary>

[Thorough explanation of the answer]

</details>

---

### Exercise 2: [Title]

[Follow same structure as Exercise 1]

---

## 📊 Visual Aids

### Diagram 1: [Title]

![Diagram description](../diagrams/[module]/[diagram-name].svg)

**Figure Caption**: [Explain what the diagram shows]

**Alt Text**: [Accessible description for screen readers]

---

### Interactive Visualization: [Title]

<div id="viz-[module]-[name]" class="interactive-viz" data-description="[Screen reader description]">
  <!-- D3.js or Mermaid visualization embedded here -->
</div>

**Instructions**: [How to interact with the visualization]

**Keyboard Navigation**: [Describe keyboard controls for accessibility]

---

## ✅ Checkpoint

Before proceeding to the next module, verify your understanding:

### Question 1
[Question text]

**Options**:
- A) [Option A]
- B) [Option B]
- C) [Option C]

<details>
<summary>Show Answer</summary>

**Correct Answer**: [Letter]

**Explanation**: [Why this is correct and why others are incorrect]

**Key Takeaway**: [What this question tests]

</details>

---

### Question 2
[Follow same structure]

---

### Question 3
[Follow same structure]

---

### Passing Criteria

**Required**: Answer at least [X] out of [Y] questions correctly

**If you didn't pass**: Review the sections corresponding to questions you missed, then retry the checkpoint.

---

## 🔑 Key Takeaways

- **[Concept 1]**: [Brief summary]
- **[Concept 2]**: [Brief summary]
- **[Concept 3]**: [Brief summary]

---

## 📚 Additional Resources

### Required Reading
- 📄 **[Resource Title]** - [Brief description and link]

### Recommended (Optional)
- 🎥 **[Video Title]** - [Brief description and link]
- 📝 **[Article Title]** - [Brief description and link]

### For Deeper Exploration
- 📄 **[Academic Paper]** - [Brief description and link]

---

## 🗺️ Navigation

**Previous Module**: [Module X - Title](link) (if applicable)

**Next Module**: [Module Y - Title](link)

**Resources**: [Glossary](../resources/glossary.md) | [References](../resources/references.md)

---

## 📝 Module Metadata (JSON)

```json
{
  "id": "module-[XX]-[slug]",
  "number": [XX],
  "title": "[Module Title]",
  "priority": "[P1/P2/P3/P4]",
  "estimatedHours": [X.Y],
  "prerequisites": ["[prerequisite-id]"],
  "learningObjectives": [
    "[Objective 1]",
    "[Objective 2]",
    "[Objective 3]"
  ],
  "concepts": [
    "concept-[slug-1]",
    "concept-[slug-2]"
  ],
  "exercises": [
    "exercise-[slug-1]",
    "exercise-[slug-2]"
  ],
  "checkpoint": "checkpoint-[XX]-[slug]",
  "status": "published"
}
```

Validate against: `/specs/001-bft-learning/contracts/module-schema.json`

---

**Ready for the next module?** Complete the checkpoint above, then proceed to [Module Y](link)!
