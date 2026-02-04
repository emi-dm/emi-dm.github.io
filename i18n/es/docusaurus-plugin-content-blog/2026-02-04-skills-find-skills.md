---
title: "Skills: usar `find-skills` desde VS Code"
authors:
  - name: Emi
    url: https://emi-dm.github.io
date: 2026-02-04
tags: [skills, find-skills, vscode]
description: "Cómo usar el CLI 'npx skills' y encontrar e instalar skills desde VS Code"
---

# Skills y cómo usar `find-skills` en VS Code

En este post explico cómo usar el comando `npx skills` (el gestor de skills) y cómo integrarlo en tu flujo de trabajo en Visual Studio Code.

## ¿Qué es `npx skills`?

`npx skills` es la CLI del ecosistema de skills: te ayuda a buscar, instalar y actualizar paquetes llamados *skills* que extienden las capacidades del agente.

Comandos clave:

- Buscar: `npx skills find [query]`
- Instalar: `npx skills add <owner/repo@skill>`
- Actualizar: `npx skills update`

## Uso rápido desde VS Code

1. Abre el terminal integrado (View → Terminal o `Ctrl+\`).
2. Busca skills relevantes:

```bash
# buscar skills por palabras clave
npx skills find react performance
```

3. Revisa la salida y, si te interesa uno, instálalo:

```bash
# instalar un skill (instalación global omitible, puedes usar npx directamente)
npx skills add vercel-labs/agent-skills@vercel-react-best-practices
```

4. Opcional: instala globalmente y evita escribir `npx`:

```bash
npm i -g @skills/cli
skills find "react testing"
```

### Consejo práctico
Si quieres trabajar con skills frecuentemente desde VS Code, deja el terminal anclado y usa búsquedas con palabras específicas (p.ej. `react testing`, `docs`, `deploy`).

## Ejemplo de flujo

- Buscar: `npx skills find changelog`
- Instalar: `npx skills add composio/changelog-skill`
- Ejecutar la tarea que provee el skill: depende del skill instalado (consulta la documentación en skills.sh).

## Recursos

- Sitio: https://skills.sh/ 🔗
- Documentación y ejemplos (usa `npx skills find` para descubrir skills concretos)

---

Si quieres, puedo instalar un skill de ejemplo aquí y mostrar cómo usarlo paso a paso. ¿Qué categoría te interesa (tests, docs, deploy, productividad)?
