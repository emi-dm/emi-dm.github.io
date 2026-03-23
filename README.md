# emi-dm.github.io

Personal site and blog for **Emilio Delgado**, published on GitHub Pages from the `docs/` folder.

## Structure

- **`www/`** — static source (HTML, CSS, JS, assets). Edit this folder.
- **`docs/`** — publishing root for GitHub Pages. On each push to `main`, [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs `rsync` from `www/` into `docs/` and commits if there are changes.
- **`content/`** — optional Markdown copies of blog posts and the intro doc (reference only; the live site uses the HTML under `www/`).

## Local preview

Serve the site from the repo root (paths like `/personal/` resolve correctly):

```bash
python3 -m http.server 8080 --directory www
```

Then open `http://localhost:8080/`.

## New blog posts

Add a folder under `www/blog/<slug>/` with `index.html`, link it from `www/blog/index.html`, and keep a `.md` copy in `content/blog/` if you want a simple text source alongside.
