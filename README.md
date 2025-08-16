# Web personal (GitHub Pages)

Sitio estático minimalista y moderno con paleta azul claro, con sección de blog basada en Markdown. Genera la carpeta `docs/` lista para publicar en GitHub Pages.

## Requisitos

- Node.js 18+

## Uso

1. Instalar dependencias:

```bash
npm install
```

1. Generar el sitio:

```bash
npm run build
```

1. Previsualizar localmente (opcional):

```bash
npm run dev
```

Luego abre `http://localhost:5173`.

## Añadir entradas al blog

- Crea archivos `.md` dentro de `blog/posts/` con este front matter:

```markdown
---
title: "Título"
date: YYYY-MM-DD
summary: "Resumen corto"
tags: ["etiqueta1", "etiqueta2"]
---

Contenido en Markdown...
```

- Ejecuta `npm run build` para regenerar.

## Publicar en GitHub Pages

- Sube este repo a GitHub.
- En Settings → Pages, elige "Deploy from a branch" y selecciona la rama principal y la carpeta `/docs`.

## Personalización

- Edita colores y estilos en `src/assets/style.css`.
- Cambia contenido del perfil en `src/data/profile.json`.
- Modifica plantillas en `src/templates/`.
