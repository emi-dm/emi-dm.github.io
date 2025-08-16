/* Build script to generate a static site into docs/ from templates and markdown posts */
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const glob = require('glob');
const matter = require('gray-matter');
const MarkdownIt = require('markdown-it');
const { format } = require('date-fns');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const DOCS = path.join(ROOT, 'docs');
const TPL = path.join(SRC, 'templates');
const ASSETS = path.join(SRC, 'assets');
const BLOG_SRC = path.join(ROOT, 'blog', 'posts');

const md = new MarkdownIt({ html: true, linkify: true, typographer: true });
const BASE = process.env.BASE_PATH || '';

function slugify(str) {
  return (str || '')
    .toString()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function readJSON(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function loadTemplate(name) {
  return fs.readFileSync(path.join(TPL, name), 'utf8');
}

function ensureDir(dir) {
  fse.ensureDirSync(dir);
}

function writeFile(file, content) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content, 'utf8');
}

function renderLayout({ title, content, description }) {
  let layout = loadTemplate('layout.html');
  layout = layout.replaceAll('{{title}}', title || '');
  layout = layout.replaceAll('{{description}}', description || '');
  layout = layout.replaceAll('{{base}}', BASE);
  layout = layout.replace('{{content}}', content || '');
  return layout;
}

function renderHome(profile, latestPosts) {
  let tpl = loadTemplate('home.html');
  const interests = (profile.interests || []).map(i => `<li>${i}</li>`).join('');
  const education = (profile.education || []).map(e => `<li><strong>${e.degree}</strong> — ${e.institution} (${e.year})</li>`).join('');
  const projects = (profile.projects || []).map(p => `<li><a href="${p.url}" target="_blank" rel="noopener">${p.title}</a></li>`).join('');
  const mergedPubsArr = [...(profile.latest || []), ...(profile.publications || [])];
  const publications = mergedPubsArr.map(p => `<li><a href="${p.url}" target="_blank" rel="noopener">${p.title}</a></li>`).join('');
  const links = (profile.links || []).map(l => `<li><a href="${l.url}" target="_blank" rel="noopener">${l.title}</a></li>`).join('');
  const latestBlog = (latestPosts || []).slice(0, 3).map(p => `<li><a href="${BASE}/blog/${p.slug}/">${p.title}</a> <span class="muted">${p.dateDisplay}</span></li>`).join('');

  tpl = tpl
    .replaceAll('{{name}}', profile.name || '')
    .replaceAll('{{role}}', profile.role || '')
    .replaceAll('{{affiliation}}', profile.affiliation || '')
    .replaceAll('{{bio}}', profile.bio || '')
    .replaceAll('{{avatar}}', profile.avatar || '')
    .replace('{{interests}}', interests)
    .replace('{{education}}', education)
  .replace('{{projects}}', projects)
  .replace('{{publications}}', publications)
  .replace('{{links}}', links)
    .replace('{{latestBlog}}', latestBlog);

  return renderLayout({
    title: `${profile.name} — ${profile.role}`,
    description: profile.bio?.slice(0, 150) || '',
    content: tpl,
  });
}

function renderBlogIndex(posts) {
  let tpl = loadTemplate('blog_index.html');
  const items = posts.map(p => `
    <article class="post-card">
      <h2><a href="/blog/${p.slug}/">${p.title}</a></h2>
      <div class="meta">${p.dateDisplay}${p.tags?.length ? ' • ' + p.tags.map(t=>`<a href=\"/blog/tags/${slugify(t)}/\" class=\"chip\">#${t}</a>`).join(' ') : ''}</div>
      <p>${p.summary || ''}</p>
    </article>
  `).join('\n');
  tpl = tpl.replace('{{items}}', items);
  return renderLayout({ title: 'Blog', description: 'Notes and articles', content: tpl });
}

function renderPost(post) {
  let tpl = loadTemplate('post.html');
  tpl = tpl
    .replaceAll('{{title}}', post.title)
  .replaceAll('{{date}}', post.dateDisplay)
  .replace('{{tags}}', (post.tags || []).map(t => `<a class="chip" href="${BASE}/blog/tags/${slugify(t)}/">#${t}</a>`).join(' '))
    .replace('{{content}}', post.html);
  return renderLayout({ title: `${post.title} — Blog`, description: post.summary || '', content: tpl });
}

function build() {
  // Clean
  fse.rmSync(DOCS, { recursive: true, force: true });
  ensureDir(DOCS);

  // Copy assets
  fse.copySync(ASSETS, path.join(DOCS, 'assets'));

  // Load profile
  const profile = readJSON(path.join(SRC, 'data', 'profile.json'));

  // Parse posts
  const files = glob.sync('**/*.md', { cwd: BLOG_SRC, nodir: true, absolute: true });
  const posts = files.map(file => {
    const raw = fs.readFileSync(file, 'utf8');
    const { data, content } = matter(raw);
    const title = data.title || path.basename(file, '.md');
    const date = data.date ? new Date(data.date) : new Date();
    const dateDisplay = isNaN(date) ? '' : format(date, 'yyyy-MM-dd');
    const slug = data.slug || slugify(title);
    const html = md.render(content);
    return {
      title,
      date,
      dateDisplay,
      slug,
      summary: data.summary || '',
      tags: data.tags || [],
      html,
    };
  }).sort((a,b) => (b.date - a.date));

  // Home
  const home = renderHome(profile, posts);
  writeFile(path.join(DOCS, 'index.html'), home);

  // Blog index
  const blogIndex = renderBlogIndex(posts);
  writeFile(path.join(DOCS, 'blog', 'index.html'), blogIndex);

  // Posts
  for (const post of posts) {
    const destDir = path.join(DOCS, 'blog', post.slug);

    // Copy per-post media if present under blog/media/<slug>/ or blog/posts/media/<slug>/ -> docs/blog/<slug>/media/<slug>/
    const perPostMedia = path.join(ROOT, 'blog', 'media', post.slug);
    const perPostMediaAlt = path.join(ROOT, 'blog', 'posts', 'media', post.slug);
    if (fs.existsSync(perPostMedia) || fs.existsSync(perPostMediaAlt)) {
      const destMedia = path.join(destDir, 'media', post.slug);
      if (fs.existsSync(perPostMedia)) fse.copySync(perPostMedia, destMedia, { overwrite: true });
      if (fs.existsSync(perPostMediaAlt)) fse.copySync(perPostMediaAlt, destMedia, { overwrite: true });
    }

    // Copy adjacent assets if present under blog/posts/<slug>/ -> docs/blog/<slug>/
    const adjacentAssets = path.join(BLOG_SRC, post.slug);
    if (fs.existsSync(adjacentAssets)) {
      fse.copySync(adjacentAssets, destDir, { overwrite: true });
    }

    const html = renderPost(post);
    writeFile(path.join(destDir, 'index.html'), html);
  }

  // Simple tag pages
  const tagMap = new Map();
  for (const p of posts) {
    for (const t of (p.tags || [])) {
      const key = slugify(t);
      if (!tagMap.has(key)) tagMap.set(key, { tag: t, posts: [] });
      tagMap.get(key).posts.push(p);
    }
  }
  for (const [key, val] of tagMap.entries()) {
  const items = val.posts.map(p => `<li><a href=\"${BASE}/blog/${p.slug}/\">${p.title}</a> <span class=\"muted\">${p.dateDisplay}</span></li>`).join('');
    const content = `<section class="container reveal"><h1>#${val.tag}</h1><ul class="list">${items}</ul></section>`;
  const page = renderLayout({ title: `#${val.tag} — Blog`, description: `Posts tagged ${val.tag}`, content });
    writeFile(path.join(DOCS, 'blog', 'tags', key, 'index.html'), page);
  }

  // Robots and basic metadata files
  writeFile(path.join(DOCS, 'robots.txt'), 'User-agent: *\nAllow: /');
}

build();
