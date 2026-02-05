---
title: "Skills: Using `find-skills` from VS Code"
authors:
  - name: Emi
    url: https://emi-dm.github.io
date: 2026-02-04
tags: [skills, find-skills, vscode]
description: "How to use the 'npx skills' CLI and discover/install skills from VS Code"
---

# Skills and using `find-skills` in VS Code

This post explains how to use the `npx skills` command (the skills manager) and how to integrate it into your workflow in Visual Studio Code.

## What is `npx skills`?

`npx skills` is the CLI for the skills ecosystem: it helps you search, install, and update packages called *skills* that extend the agent's capabilities.

Key commands:

- Search: `npx skills find [query]`
- Install: `npx skills add <owner/repo@skill>`
- Update: `npx skills update`

## Quick usage from VS Code

1. Open the integrated terminal (View → Terminal or `Ctrl+\``).
2. Search for relevant skills:

```bash
# search for skills by keywords
npx skills find react performance
```

3. Review the output and, if interested, install one:

```bash
# install a skill (global installation is optional, you can use npx directly)
npx skills add vercel-labs/agent-skills@vercel-react-best-practices
```

4. Optional: install globally and avoid typing `npx`:

```bash
npm i -g @skills/cli
skills find "react testing"
```

### Practical tip
If you want to work with skills frequently from VS Code, keep the terminal pinned and use searches with specific words (e.g., `react testing`, `docs`, `deploy`).

## Example flow

- Search: `npx skills find changelog`
- Install: `npx skills add composio/changelog-skill`
- Execute the task the skill provides: depends on the installed skill (check the documentation at skills.sh).

## Resources

- Website: https://skills.sh/ 🔗
- Documentation and examples (use `npx skills find` to discover specific skills)

---

If you want, I can install a sample skill here and show step-by-step how to use it. Which category interests you (tests, docs, deploy, productivity)?

