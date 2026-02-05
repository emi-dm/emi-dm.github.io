---
title: "Specification Driven-Development: What SDD is and understanding its role"
authors:
  - name: "Emi"
    url: "https://emi-dm.github.io"
date: 2026-02-04T00:00:00.000Z
tags: [sdd, specification, development, ai, didactic]
description: "A friendly introduction to Specification Driven Development (SDD) and its role in AI-assisted development."
---

**TL;DR:** SDD puts the specification at the center: well-written specifications can be used to generate code via AI agents. Fewer misunderstandings, faster iteration.

## Definition of the concept

Imagine the specification is the recipe and the code is the final dish. In **Specification Driven Development (SDD)**, the recipe is not a poor note in the margin; it's the manual that the chefs (including robot chefs—LLMs) use to cook the application.

SDD emerges as a philosophy in response to LLM-based agents and _vibe coding_: instead of writing code first and then documentation, well-written and executable documentation becomes the "source of truth" and guides code generation.

> Quick example: you write a specification: "When button X is pressed, send notification Y to the user with conditions Z". An agent can transform that specification into endpoints, tests, and minimum viable deployment. Simple, repeatable, and traceable.

## Source of truth

- **Agile / Waterfall**: Code rules. Specs often become outdated notes.
- **SDD**: The specification rules. Code is a temporal expression of that specification: if something is off, the spec is the source to correct.

In SDD, the specification functions as a contract: when the spec and code differ, the spec is the truth until we decide otherwise (and document it).

## Change management (by analogy)

Think of changes as updating a recipe, not re-making the dish by hand every time:

- **Before**: a change in requirements causes chaos: code editing, PRs, hotfixes.
- **With SDD**: change the spec, regenerate implementations and tests. Experiment _what-if_ at low cost.

---

|                            | Traditional Methodologies (Agile / Waterfall)                   | Spec-Driven Development (SDD)                                            |
| -------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **The Source of Truth**    | **Code is King.** Specs fall behind.                            | **The Specification is King.** The PRD generates the implementation.     |
| **Spec-Code Relationship** | The specification is usually static and deviates from the code. | The specification is an **executable** artifact; code is its expression. |
| **The Gap**                | Ambiguities and misunderstandings are inevitable.               | Automatic transformation reduces or eliminates the interpretation gap.   |

## Why now? (trends pushing SDD)

1. More capable AI: natural language specs generate functional code reliably.
2. More complex software: maintaining consistency manually is increasingly expensive.
3. Accelerated pace of change: pivots are the norm and you need to iterate quickly and safely.

This also enables an interesting game: generate multiple implementations from the same spec and compare advantages (performance vs. cost vs. maintainability).

## Fundamental principles (one sentence each)

1. **Specifications as lingua franca** — the spec is the central artifact.
2. **Executable specifications** — precise, complete, and unambiguous.
3. **Continuous refinement** — validation and ambiguity detection all the time.
4. **Research-driven context** — agents collect context and technical options.
5. **Bidirectional feedback** — production feeds back into the specification.
6. **Branching for exploration** — generate alternatives to optimize different objectives.

## Small exercise (try it!)

Take a user story and turn it into a minimal spec (3–5 lines) that's clear and unambiguous. Then ask yourself:

- Can an agent generate endpoints and tests from this?
- What ambiguities remain?

If you answered yes and there's little ambiguity, you've taken a big step toward SDD.

## Final reflection

SDD doesn't come to replace the developer: it comes to turn them into a specification architect, orchestra conductor, and curious critic. It's a powerful way to accelerate iterations, improve traceability, and minimize technical debt when properly implemented.

---

## Sources and references

- SDD definition provided by GitHub Spec Kit: https://github.com/github/spec-kit/blob/main/spec-driven.md
