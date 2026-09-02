// Personal site — theme, i18n, motion-aware UI
function initializeApp() {
    if (window.__personalAppInitialized) {
        return;
    }
    window.__personalAppInitialized = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const htmlElement = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme =
        localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeToggle) {
            const nextTheme = theme === 'dark' ? 'light' : 'dark';
            themeToggle.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
            themeToggle.setAttribute('title', `Switch to ${nextTheme} theme`);
            const icon = themeToggle.querySelector('.theme-icon');
            if (icon) icon.textContent = theme === 'dark' ? '☀' : '◐';
        }
    }

    setTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }

    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    function setNavOpen(open) {
        if (!navToggle || !navMenu) return;
        navToggle.classList.toggle('active', open);
        navMenu.classList.toggle('active', open);
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            setNavOpen(!navMenu.classList.contains('active'));
        });

        document.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', () => setNavOpen(false));
        });
    }

    function normalizePathname() {
        let p = (window.location.pathname.replace(/\/$/, '') || '/').toLowerCase();
        if (p.endsWith('/index.html')) p = '/';
        return p;
    }

    const pathNorm = normalizePathname();
    const isHomePage = pathNorm === '/';

    const sectionNavIds = ['about', 'timeline', 'research', 'projects', 'repositories', 'publications'];

    function headerOffsetPx() {
        const raw = getComputedStyle(document.documentElement).getPropertyValue('--site-header-offset').trim();
        const remMatch = raw.match(/^([\d.]+)rem$/i);
        if (remMatch) {
            const rootFont = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
            return parseFloat(remMatch[1]) * rootFont;
        }
        const pxMatch = raw.match(/^([\d.]+)px$/i);
        if (pxMatch) return parseFloat(pxMatch[1]);
        return 72;
    }

    function syncSectionNavHighlight() {
        if (!isHomePage) return;
        const navMenu = document.getElementById('nav-menu');
        const navHashLinks = navMenu
            ? navMenu.querySelectorAll('.nav-link[href^="#"]')
            : document.querySelectorAll('.nav-link[href^="#"]');
        const headerH = headerOffsetPx();
        const vh = window.innerHeight;
        const activationLine = headerH + Math.min(180, Math.max(56, Math.round(vh * 0.22)));
        const y = activationLine;
        const docEl = document.documentElement;
        const scrollBottom = window.scrollY + vh;
        const docBottom = docEl.scrollHeight;
        const atDocEnd = docBottom > vh + 48 && scrollBottom >= docBottom - 8;

        const tops = sectionNavIds.map((sid) => {
            const el = document.getElementById(sid);
            return el ? el.getBoundingClientRect().top : null;
        });

        let activeId = null;
        if (atDocEnd) {
            activeId = sectionNavIds[sectionNavIds.length - 1];
        } else {
            for (let i = 0; i < sectionNavIds.length; i++) {
                if (tops[i] === null) continue;
                const top = tops[i];
                const nextTop =
                    i + 1 < tops.length && tops[i + 1] !== null
                        ? tops[i + 1]
                        : Number.POSITIVE_INFINITY;
                if (top <= y && y < nextTop) {
                    activeId = sectionNavIds[i];
                    break;
                }
            }
            const pubsTop = tops[sectionNavIds.length - 1];
            if (activeId === 'repositories' && typeof pubsTop === 'number' && pubsTop <= y + 24) {
                activeId = 'publications';
            }
        }

        navHashLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            const id = decodeURIComponent(href.slice(1).split('&')[0]);
            if (!id) return;
            if (id === activeId) {
                link.setAttribute('aria-current', 'location');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    const headerEl = document.querySelector('.site-header');
    if (headerEl) {
        let scrollTicking = false;
        const onScrollFrame = () => {
            headerEl.classList.toggle('is-scrolled', window.scrollY > 10);
            syncSectionNavHighlight();
            scrollTicking = false;
        };
        window.addEventListener(
            'scroll',
            () => {
                if (!scrollTicking) {
                    requestAnimationFrame(onScrollFrame);
                    scrollTicking = true;
                }
            },
            { passive: true },
        );
        onScrollFrame();
    } else {
        syncSectionNavHighlight();
    }

    if (isHomePage) {
        window.addEventListener('hashchange', syncSectionNavHighlight);
        window.addEventListener('load', syncSectionNavHighlight, { once: true });
        window.addEventListener(
            'resize',
            () => {
                requestAnimationFrame(syncSectionNavHighlight);
            },
            { passive: true },
        );
    }

    document.querySelectorAll('.nav-link[href]').forEach((link) => {
        let pathHref = (link.getAttribute('href') || '').split('#')[0];
        pathHref = pathHref.replace(/\/$/, '') || '/';
        if (pathHref === '/blog' && (pathNorm === '/blog' || pathNorm.startsWith('/blog/'))) {
            link.setAttribute('aria-current', 'page');
        }
    });

    const linkIntia = 'https://intia.unex.es/';
    const linkI3 = 'https://i3lab.unex.es/';

    const translations = {
        en: {
            nav: {
                about: 'About',
                timeline: 'Journey',
                interests: 'Research',
                projects: 'Projects',
                publications: 'Publications',
                repositories: 'Repositories',
                blog: 'Blog',
                onThisPage: 'On this page',
            },
            hero: {
                label: 'PhD Student at INTIA',
                tagline:
                    'Making LLM-generated code measurable, testable, and trustworthy through specifications.',
                affiliation: `PhD Student at <a href="${linkIntia}" target="_blank" rel="noreferrer" class="meta-link">INTIA</a>, University of Extremadura`,
                affiliationShort: `<a href="${linkIntia}" target="_blank" rel="noreferrer" class="meta-link">INTIA</a> · University of Extremadura`,
                publications: 'View Publications',
                specialized: 'Specialized in',
                metaRole: 'Role',
                metaAffiliation: 'Affiliation',
                metaFocus: 'Current focus',
                metaProfiles: 'Profiles',
                typing: [
                    'LLM code quality',
                    'Specification-Driven Development',
                    'AI-assisted software engineering',
                ],
                contactQuestion: 'Researching with AI?',
                contactAction: "Let's talk →",
            },
            about: {
                title: 'About',
                p1:
                    `I'm a PhD student at <a href="${linkIntia}" target="_blank" rel="noreferrer" class="text-link">INTIA</a> (University of Extremadura), focused on making AI-assisted software development more reliable and useful in practice.`,
                p2:
                    'My research focuses on <strong>quality assurance for code produced by large language models</strong>. I use <strong>specification-driven development (SDD)</strong> to turn formal specifications into <strong>tests, checks, and evaluation artifacts</strong> that help surface mistakes earlier and make generated code easier to trust.',
                p3:
                    'The broader goal is <strong>transparent, reproducible</strong> AI-assisted development: models can help us move faster, but we still need <strong>systematic ways to measure and improve correctness</strong> without losing confidence in the result.',
                skills: 'Expertise',
                stack: 'Languages & tools',
            },
            focus: {
                title: 'Focus areas',
                f1: 'LLM-generated code quality',
                f2: 'Specification-driven development (SDD)',
                f3: 'Multi-agent & tool-using systems',
                f4: 'RAG & retrieval for engineering workflows',
            },
            education: {
                title: 'Education',
                master: 'M.Sc. in Artificial Intelligence',
                data: 'Advanced University Course in Data Analyst',
                bachelor: 'B.Sc. in Software Engineering',
                university: 'University of Extremadura',
            },
            interests: { title: 'Research' },
            projects: {
                title: 'Projects',
                music:
                    'Innovative project exploring generative AI in the context of music composition and analysis.',
                spec: 'Research on specification-driven validation for AI-generated software artifacts.',
            },
            repositories: {
                title: 'Repositories',
                pubmed: 'MCP server for PubMed search and literature retrieval.',
                research: 'MCP server for research assistance and academic workflows.',
            },
            publications: { title: 'Publications' },
        },
        es: {
            nav: {
                about: 'Sobre mí',
                timeline: 'Trayectoria',
                interests: 'Investigación',
                projects: 'Proyectos',
                publications: 'Publicaciones',
                repositories: 'Repositorios',
                blog: 'Blog',
                onThisPage: 'En esta página',
            },
            hero: {
                label: 'Doctorando en INTIA',
                tagline:
                    'Hacer medible, comprobable y fiable el código generado por LLM mediante especificaciones.',
                affiliation: `Doctorando en <a href="${linkIntia}" target="_blank" rel="noreferrer" class="meta-link">INTIA</a>, Universidad de Extremadura`,
                affiliationShort: `<a href="${linkIntia}" target="_blank" rel="noreferrer" class="meta-link">INTIA</a> · Universidad de Extremadura`,
                publications: 'Ver publicaciones',
                specialized: 'Especializado en',
                metaRole: 'Rol',
                metaAffiliation: 'Afiliación',
                metaFocus: 'Foco actual',
                metaProfiles: 'Perfiles',
                typing: [
                    'Calidad del código LLM',
                    'Desarrollo dirigido por especificaciones',
                    'Ingeniería de software asistida por IA',
                ],
                contactQuestion: '¿Investigas con IA?',
                contactAction: 'Contáctame →',
            },
            about: {
                title: 'Sobre mí',
                p1:
                    `Soy doctorando en <a href="${linkIntia}" target="_blank" rel="noreferrer" class="text-link">INTIA</a> (Universidad de Extremadura), centrado en hacer que el desarrollo de software asistido por IA sea más fiable y útil en la práctica.`,
                p2:
                    'Mi trabajo se centra en el <strong>aseguramiento de la calidad del código generado por modelos de lenguaje</strong>. Utilizo el <strong>desarrollo dirigido por especificaciones (SDD)</strong> para convertir las especificaciones formales en <strong>pruebas, comprobaciones y artefactos de evaluación</strong> que ayuden a detectar errores antes y a confiar más en el código generado.',
                p3:
                    'El objetivo general es un desarrollo asistido por IA <strong>transparente y reproducible</strong>: los modelos pueden ayudarnos a avanzar más rápido, pero seguimos necesitando <strong>formas sistemáticas de medir y mejorar la corrección</strong> sin perder confianza en el resultado.',
                skills: 'Experiencia',
                stack: 'Lenguajes y herramientas',
            },
            focus: {
                title: 'Áreas de foco',
                f1: 'Calidad del código generado por LLM',
                f2: 'Desarrollo dirigido por especificaciones (SDD)',
                f3: 'Sistemas multi-agente y uso de herramientas',
                f4: 'RAG y recuperación para flujos de ingeniería',
            },
            education: {
                title: 'Educación',
                master: 'Máster en Inteligencia Artificial',
                data: 'Curso Universitario Superior en Analista de Datos',
                bachelor: 'Grado en Ingeniería de Software',
                university: 'Universidad de Extremadura',
            },
            interests: { title: 'Investigación' },
            projects: {
                title: 'Proyectos',
                music:
                    'Proyecto innovador que explora la IA generativa en composición y análisis musical.',
                spec: 'Investigación sobre validación dirigida por especificaciones para artefactos generados por IA.',
            },
            repositories: {
                title: 'Repositorios',
                pubmed: 'Servidor MCP para búsqueda en PubMed y recuperación bibliográfica.',
                research: 'Servidor MCP para asistencia a la investigación y flujos académicos.',
            },
            publications: { title: 'Publicaciones' },
        },
    };

    let currentLang = localStorage.getItem('language') || 'en';
    const langToggle = document.getElementById('lang-toggle');

    const typingElement = document.querySelector('.typing-effect');
    let textOptions = [];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    let typeTimeoutId = null;

    function getByPath(obj, path) {
        return path.split('.').reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : null), obj);
    }

    let postTocObserver = null;

    function buildPostTableOfContents(lang) {
        const articlePage = document.querySelector('article.post-page__inner');
        if (!articlePage) return;

        articlePage.querySelector(':scope > .post-toc')?.remove();
        articlePage.classList.remove('has-toc');
        if (postTocObserver) postTocObserver.disconnect();

        const activeSection = articlePage.querySelector(`[data-lang="${lang}"]:not([hidden])`);
        const headings = activeSection
            ? Array.from(activeSection.querySelectorAll('.post-prose h2, .post-prose h3'))
            : [];
        if (headings.length < 2) return;

        const aside = document.createElement('aside');
        aside.className = 'post-toc';
        aside.setAttribute('aria-label', translations[lang].nav.onThisPage);

        const title = document.createElement('span');
        title.className = 'post-toc__title';
        title.textContent = translations[lang].nav.onThisPage;
        aside.appendChild(title);

        const list = document.createElement('ol');
        headings.forEach((heading, index) => {
            if (!heading.id) {
                const slug = heading.textContent
                    .trim()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-|-$/g, '');
                heading.id = `toc-${lang}-${slug || index + 1}`;
            }

            const item = document.createElement('li');
            item.className = `post-toc__item post-toc__item--${heading.tagName.toLowerCase()}`;
            const link = document.createElement('a');
            link.href = `#${heading.id}`;
            link.textContent = heading.textContent.trim();
            item.appendChild(link);
            list.appendChild(item);
        });
        aside.appendChild(list);
        articlePage.insertBefore(aside, activeSection);
        articlePage.classList.add('has-toc');

        if (!articlePage.dataset.tocBound) {
            articlePage.addEventListener('click', (event) => {
                const link = event.target.closest('.post-toc a[href^="#"]');
                if (!link) return;
                const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
                if (!target) return;
                event.preventDefault();
                target.scrollIntoView({
                    behavior: prefersReducedMotion ? 'auto' : 'smooth',
                    block: 'start',
                });
                history.replaceState(null, '', link.hash);
            });
            articlePage.dataset.tocBound = 'true';
        }

        const tocLinks = Array.from(aside.querySelectorAll('a'));
        postTocObserver = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((entry) => entry.isIntersecting);
                if (!visible.length) return;
                const activeId = visible[visible.length - 1].target.id;
                tocLinks.forEach((link) => {
                    link.classList.toggle('active', link.hash === `#${activeId}`);
                });
            },
            { rootMargin: '-18% 0px -68% 0px', threshold: 0 },
        );
        headings.forEach((heading) => postTocObserver.observe(heading));
    }

    function updateLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);
        if (langToggle) langToggle.textContent = lang === 'en' ? 'EN' : 'ES';
        htmlElement.setAttribute('lang', lang);

        document.querySelectorAll('[data-i18n]').forEach((el) => {
            const key = el.getAttribute('data-i18n');
            const value = getByPath(translations[lang], key);
            if (value) el.textContent = value;
        });

        document.querySelectorAll('[data-i18n-html]').forEach((el) => {
            const key = el.getAttribute('data-i18n-html');
            const value = getByPath(translations[lang], key);
            if (value) el.innerHTML = value;
        });

        document.querySelectorAll('[data-lang]').forEach((el) => {
            const rawLang = (el.getAttribute('data-lang') || '').toLowerCase().trim();
            const supportedLangs = rawLang.split(/\s+/).filter(Boolean);
            const shouldShow = supportedLangs.length === 0 || supportedLangs.includes(lang);
            el.hidden = !shouldShow;
            el.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');
        });

        buildPostTableOfContents(lang);

        const pageMeta = document.querySelector('[data-page-title-en][data-page-title-es]');
        if (pageMeta) {
            const pageTitle = lang === 'en' ? pageMeta.dataset.pageTitleEn : pageMeta.dataset.pageTitleEs;
            const pageDescription =
                lang === 'en' ? pageMeta.dataset.pageDescriptionEn : pageMeta.dataset.pageDescriptionEs;
            if (pageTitle) {
                document.title = pageTitle;
            }
            if (pageDescription) {
                const metaDescription = document.querySelector('meta[name="description"]');
                if (metaDescription) {
                    metaDescription.setAttribute('content', pageDescription);
                }
            }
        }

        textOptions = translations[lang].hero.typing;
        textIndex = 0;
        charIndex = 0;
        isDeleting = false;
        if (typingElement) typingElement.textContent = '';
        syncSectionNavHighlight();
    }

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            updateLanguage(currentLang === 'en' ? 'es' : 'en');
            if (!prefersReducedMotion) {
                if (typeTimeoutId) clearTimeout(typeTimeoutId);
                type();
            } else if (typingElement && textOptions.length) {
                typingElement.textContent = textOptions[0];
            }
        });
    }

    updateLanguage(currentLang);

    function type() {
        if (!typingElement || !textOptions.length || prefersReducedMotion) {
            if (typingElement && textOptions.length && prefersReducedMotion) {
                typingElement.textContent = textOptions[0];
            }
            return;
        }

        const currentText = textOptions[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 75;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typeSpeed = 2400;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textOptions.length;
            typeSpeed = 500;
        }

        typeTimeoutId = setTimeout(type, typeSpeed);
    }

    if (!prefersReducedMotion) {
        type();
    } else if (typingElement && textOptions.length) {
        typingElement.textContent = textOptions[0];
    }

    const mathBg = document.getElementById('math-bg');

    if (mathBg && !prefersReducedMotion) {
        const symbols = ['∫', '∑', '∂', '∇', 'α', 'β', 'θ', 'λ', 'π', 'σ', '≈', '≤', '≥', '∞'];

        function createMathSymbol() {
            const symbol = document.createElement('div');
            symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            symbol.style.position = 'absolute';
            symbol.style.left = `${Math.random() * 100}%`;
            symbol.style.top = `${Math.random() * 100}%`;
            symbol.style.fontSize = `${Math.random() * 20 + 15}px`;
            symbol.style.color = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary').trim();
            symbol.style.opacity = '0.08';
            symbol.style.fontFamily = 'var(--font-mono)';
            symbol.style.pointerEvents = 'none';

            mathBg.appendChild(symbol);

            setTimeout(() => symbol.remove(), 10000);
        }

        for (let i = 0; i < 6; i++) {
            setTimeout(createMathSymbol, i * 600);
        }

        setInterval(createMathSymbol, 6000);
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.08, rootMargin: '0px 0px -5% 0px' },
    );

    document
        .querySelectorAll(
            '.fade-in, .section-title, .text-block, .info-card, .project-card, .repo-card, .publication-item, .reveal-on-scroll, .timeline-item-compact',
        )
        .forEach((el) => observer.observe(el));

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            if (this.closest('.post-toc')) return;
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth',
                block: 'start',
            });
            setNavOpen(false);
        });
    });
}

window.initializePersonalApp = initializeApp;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp, { once: true });
} else {
    initializeApp();
}
