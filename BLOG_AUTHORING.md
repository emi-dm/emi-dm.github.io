# Guía para escribir y publicar artículos

Esta guía describe el contrato editorial y técnico del blog de Emilio Delgado. Está pensada para que una persona o un agente pueda crear un artículo completo sin tener que deducir la estructura del repositorio.

## Principio fundamental

La fuente de verdad del sitio es `www/`.

- El artículo publicado vive en `www/blog/<slug>/index.html`.
- El índice público del blog vive en `www/blog/index.html`.
- La copia en Markdown de `content/blog/` es opcional y sirve como fuente legible o borrador; el sitio no la transforma automáticamente en HTML.
- `docs/` es la salida de publicación de GitHub Pages. No se edita a mano: el workflow `.github/workflows/deploy.yml` copia `www/` a `docs/` al hacer push a `main`.

## Convenciones

### Idiomas

Cada artículo debe publicarse en inglés y español dentro del mismo `index.html`.

- La versión inglesa usa `<section data-lang="en">`.
- La versión española usa `<section data-lang="es">`.
- Ambas versiones deben tener el mismo alcance y estructura, aunque la traducción puede adaptarse para sonar natural.
- El selector de idioma y los metadatos dinámicos dependen de `www/personal/script.js`; no se debe duplicar esta lógica en cada artículo.

### Nombre y URL

Usa una carpeta con el formato:

```text
www/blog/AAAA-MM-DD-slug-descriptivo/
```

Ejemplo:

```text
www/blog/2026-09-02-evaluar-codigo-generado-por-llm/
```

El `slug` debe:

- estar en minúsculas;
- usar guiones, nunca espacios ni guiones bajos;
- evitar tildes, `ñ` y caracteres especiales;
- describir el tema con pocas palabras;
- permanecer estable después de publicar.

La URL resultante será:

```text
/blog/2026-09-02-evaluar-codigo-generado-por-llm/
```

### Fecha, autor y etiquetas

- Usa fechas ISO: `AAAA-MM-DD`.
- El autor por defecto es `Emi`, enlazado a `https://emi-dm.github.io`.
- Usa entre 3 y 6 etiquetas breves, en minúsculas y sin `#`.
- Mantén las mismas etiquetas en ambas versiones del artículo.

## Flujo recomendado

1. Define el tema, el lector objetivo y la idea principal en una frase.
2. Redacta el artículo en un idioma y revisa sus hechos y enlaces.
3. Traduce y adapta la segunda versión.
4. Crea `www/blog/<slug>/index.html` copiando el artículo publicado más reciente.
5. Sustituye títulos, descripciones, fecha, etiquetas y contenido en ambos idiomas.
6. Añade la nueva entrada, también en ambos idiomas, al inicio de `www/blog/index.html`.
7. Si se desea una fuente en Markdown, crea `content/blog/<slug>.md`.
8. Comprueba el artículo localmente antes de publicar.

Copiar un artículo existente evita divergencias en la cabecera, navegación, controles, pie y carga de recursos compartidos.

## Estructura obligatoria del HTML

El `body` conserva cuatro piezas:

1. fondo decorativo compartido;
2. navegación global;
3. artículo bilingüe;
4. pie y scripts compartidos.

La parte específica del artículo sigue este patrón:

```html
<main class="post-page" id="main-content">
    <article
        class="post-page__inner"
        data-page-title-en="English title"
        data-page-title-es="Título en español"
        data-page-description-en="Short English description."
        data-page-description-es="Descripción breve en español."
    >
        <section data-lang="en">
            <a class="post-back" href="/blog/">← Back to blog</a>
            <header class="post-header">
                <p class="post-meta">2026-09-02 · <a href="https://emi-dm.github.io">Emi</a></p>
                <h1 class="post-title">English title</h1>
                <p class="post-description">Short English description.</p>
                <div class="post-tags">
                    <span class="post-tag">ai</span>
                    <span class="post-tag">software-engineering</span>
                    <span class="post-tag">evaluation</span>
                </div>
            </header>

            <div class="post-prose">
                <p><strong>TL;DR:</strong> One-paragraph summary.</p>

                <h2>First section</h2>
                <p>Article content.</p>

                <h2>Conclusion</h2>
                <p>Main takeaway and possible next step.</p>

                <h2>Sources and references</h2>
                <ul>
                    <li><a href="https://example.com" target="_blank" rel="noreferrer">Descriptive source name</a></li>
                </ul>
            </div>
        </section>

        <section data-lang="es">
            <a class="post-back" href="/blog/">← Volver al blog</a>
            <header class="post-header">
                <p class="post-meta">2026-09-02 · <a href="https://emi-dm.github.io">Emi</a></p>
                <h1 class="post-title">Título en español</h1>
                <p class="post-description">Descripción breve en español.</p>
                <div class="post-tags">
                    <span class="post-tag">ai</span>
                    <span class="post-tag">software-engineering</span>
                    <span class="post-tag">evaluation</span>
                </div>
            </header>

            <div class="post-prose">
                <p><strong>TL;DR:</strong> Resumen en un párrafo.</p>

                <h2>Primera sección</h2>
                <p>Contenido del artículo.</p>

                <h2>Conclusión</h2>
                <p>Idea principal y posible siguiente paso.</p>

                <h2>Fuentes y referencias</h2>
                <ul>
                    <li><a href="https://example.com" target="_blank" rel="noreferrer">Nombre descriptivo de la fuente</a></li>
                </ul>
            </div>
        </section>
    </article>
</main>
```

Además, el `<head>` debe contener un título y una descripción de respaldo:

```html
<title>English title | Emilio Delgado</title>
<meta name="description" content="Short English description." />
```

El script compartido sustituye estos valores al cambiar de idioma usando los atributos `data-page-*` del `<article>`.

## Jerarquía y estilo editorial

La estética del blog está inspirada en una publicación de investigación web: jerarquía clara, secciones breves, lectura cómoda y elementos técnicos inspeccionables.

### Estructura del texto

- Empieza con un `TL;DR` que permita entender la tesis sin leer el artículo completo.
- Cada sección debe responder una pregunta o desarrollar una sola idea.
- Usa `h2` para secciones principales y `h3` únicamente para subsecciones reales.
- Evita saltar niveles de encabezado.
- Prefiere párrafos cortos y ejemplos concretos.
- Explica siglas y términos especializados la primera vez que aparecen.
- Termina con una conclusión clara y, cuando corresponda, fuentes y referencias.

### Índice automático

`www/personal/script.js` genera un índice lateral automáticamente cuando la versión visible del artículo contiene dos o más encabezados `h2` o `h3` dentro de `.post-prose`.

- No es necesario escribir el índice a mano.
- Usa encabezados cortos y descriptivos.
- El script crea identificadores para los encabezados que no tengan `id`.
- Si necesitas un enlace permanente específico, asigna un `id` estable manualmente.
- El índice lateral se oculta en pantallas estrechas para preservar el espacio de lectura.

### Tono

- Claro, directo y didáctico.
- Técnico cuando aporte precisión, no para impresionar.
- Cercano, pero sin perder rigor.
- Las afirmaciones verificables deben enlazar una fuente primaria siempre que sea posible.
- No inventes cifras, citas, resultados, afiliaciones ni capacidades de herramientas.
- Distingue hechos, opiniones e inferencias.

## Componentes de contenido

### Enlaces

Los enlaces externos deben abrirse de forma segura:

```html
<a href="https://example.com" target="_blank" rel="noreferrer">Texto descriptivo</a>
```

Evita textos como “aquí” o URLs desnudas cuando se pueda describir el destino.

### Énfasis

```html
<strong>concepto importante</strong>
<em>matiz o término</em>
<code>nombre_de_función()</code>
```

Usa el énfasis con moderación. Un párrafo lleno de negritas pierde jerarquía.

### Listas

```html
<ul>
    <li>Primer punto.</li>
    <li>Segundo punto.</li>
</ul>
```

Usa listas numeradas solo cuando el orden sea significativo.

### Citas y notas

```html
<blockquote>
    <p>Texto citado o idea destacada.</p>
</blockquote>
```

Si es una cita literal, identifica y enlaza la fuente. No uses `blockquote` solo como decoración.

### Código

Para código en bloque:

```html
<pre><code class="language-python">def evaluate(result):
    return result.is_valid
</code></pre>
```

Dentro de HTML, escapa caracteres cuando formen parte del código:

- `<` como `&lt;`
- `>` como `&gt;`
- `&` como `&amp;`

No añadas estilos inline al bloque: el diseño compartido ya cubre `pre` y `code`.

### Tablas

Usa tablas solo para relaciones que se entiendan mejor por filas y columnas:

```html
<table>
    <thead>
        <tr>
            <th>Approach</th>
            <th>Strength</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Static analysis</td>
            <td>Fast deterministic checks</td>
        </tr>
    </tbody>
</table>
```

Incluye encabezados semánticos con `th`. Evita tablas muy anchas; en móvil el contenido debe seguir siendo comprensible.

### Imágenes

Guarda las imágenes específicas junto al artículo:

```text
www/blog/<slug>/nombre-descriptivo.png
```

Insértalas así:

```html
<figure>
    <img
        src="/blog/<slug>/nombre-descriptivo.png"
        alt="Descripción útil de lo que muestra la imagen"
        loading="lazy"
        decoding="async"
    />
    <figcaption>Qué debe observar el lector y, si procede, la fuente.</figcaption>
</figure>
```

Reglas para imágenes:

- usa nombres de archivo en minúsculas y con guiones;
- evita espacios para no depender de URLs codificadas;
- escribe un `alt` útil en el idioma de cada sección;
- no repitas en el `alt` una leyenda que ya sea suficiente;
- indica la autoría o licencia cuando la imagen no sea propia;
- comprime el archivo antes de publicarlo;
- usa `loading="lazy"` salvo para una imagen esencial del primer viewport.

## Actualizar el índice del blog

Añade la entrada nueva al principio de cada `<ul class="blog-list">` de `www/blog/index.html`.

Versión inglesa:

```html
<li>
    <a href="/blog/<slug>/">English title</a>
    <span class="blog-list__meta">2026-09-02 · Emi</span>
    <span class="blog-list__desc">Short English description.</span>
</li>
```

Versión española:

```html
<li>
    <a href="/blog/<slug>/">Título en español</a>
    <span class="blog-list__meta">2026-09-02 · Emi</span>
    <span class="blog-list__desc">Descripción breve en español.</span>
</li>
```

Mantén el orden cronológico descendente: lo más reciente va primero.

## Copia opcional en Markdown

Si se crea `content/blog/<slug>.md`, usa frontmatter compatible con los artículos actuales:

```md
---
title: "English title"
authors:
  - name: "Emi"
    url: "https://emi-dm.github.io"
date: 2026-09-02T00:00:00.000Z
tags: [ai, software-engineering, evaluation]
description: "Short English description."
---

**TL;DR:** One-paragraph summary.

## First section

Article content.
```

Esta copia no sustituye el HTML bilingüe y no se publica por sí sola.

## Comprobación local

Desde la raíz del repositorio:

```bash
python3 -m http.server 8080 --directory www
```

Abre:

```text
http://localhost:8080/blog/<slug>/
```

Comprueba como mínimo:

- el artículo carga sin errores;
- el selector EN/ES muestra la versión correcta;
- el título y la descripción del documento cambian con el idioma;
- el modo claro y oscuro mantienen contraste suficiente;
- el índice automático contiene los encabezados esperados;
- todos los enlaces funcionan y los externos se abren en otra pestaña;
- las imágenes cargan, tienen texto alternativo y no desbordan;
- el contenido se entiende en móvil sin desplazamiento horizontal;
- la entrada del índice lleva a la URL nueva;
- no hay contenido de plantilla, marcadores `TODO` ni datos inventados.

Comprobaciones rápidas adicionales:

```bash
node --check www/personal/script.js
git diff --check
```

## Publicación

No copies los cambios manualmente a `docs/`.

Al integrar los cambios en `main`, el workflow de GitHub Actions:

1. sustituye `docs/` por el contenido actual de `www/`;
2. crea un commit de publicación si hay diferencias;
3. deja la versión lista para GitHub Pages.

## Checklist final para personas y agentes

- [ ] La carpeta y el slug siguen `AAAA-MM-DD-slug`.
- [ ] El `<title>` y la meta description están actualizados.
- [ ] Los cuatro atributos `data-page-title-*` y `data-page-description-*` son correctos.
- [ ] Existen versiones completas en inglés y español.
- [ ] La fecha, el autor y las etiquetas coinciden en ambas versiones.
- [ ] El artículo empieza con un `TL;DR`.
- [ ] Los `h2` y `h3` tienen jerarquía lógica y nombres breves.
- [ ] Las fuentes respaldan las afirmaciones importantes.
- [ ] Código, tablas e imágenes usan HTML semántico.
- [ ] Las imágenes tienen `alt`, dimensiones razonables y atribución cuando corresponde.
- [ ] La entrada nueva aparece primero en ambos listados del blog.
- [ ] La copia Markdown, si existe, coincide con el contenido publicado.
- [ ] Las rutas se han comprobado localmente.
- [ ] Solo se ha editado `www/` como fuente del sitio; `docs/` queda para el workflow.
