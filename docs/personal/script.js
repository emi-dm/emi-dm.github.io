// Personal site — theme, i18n, motion-aware UI
function initializeApp() {
    if (window.__personalAppInitialized) {
        return;
    }
    window.__personalAppInitialized = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const htmlElement = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';

    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
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
            },
            hero: {
                label: 'PhD Student at INTIA',
                affiliation: `PhD Student at <a href="${linkIntia}" target="_blank" rel="noreferrer" class="meta-link">INTIA</a>, University of Extremadura`,
                publications: 'View Publications',
                specialized: 'Specialized in',
                typing: [
                    'LLM code quality',
                    'Specification-Driven Development',
                    'AI-assisted software engineering',
                ],
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
            },
            hero: {
                label: 'Doctorando en INTIA',
                affiliation: `Doctorando en <a href="${linkIntia}" target="_blank" rel="noreferrer" class="meta-link">INTIA</a>, Universidad de Extremadura`,
                publications: 'Ver publicaciones',
                specialized: 'Especializado en',
                typing: [
                    'Calidad del código LLM',
                    'Desarrollo dirigido por especificaciones',
                    'Ingeniería de software asistida por IA',
                ],
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

    function updateLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);
        if (langToggle) langToggle.textContent = lang === 'en' ? 'EN' : 'ES';

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
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typeSpeed = 2000;
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

    const formulaContainer = document.getElementById('formula-container');
    const formulas = [
        'f(x) = Σ wᵢxᵢ + b',
        '∇L = ∂L/∂θ',
        'P(A|B) = P(B|A)P(A)/P(B)',
        'E[X] = Σ xᵢp(xᵢ)',
        'σ(z) = 1/(1+e⁻ᶻ)',
        'J(θ) = -Σ ylog(ŷ)',
    ];
    let formulaIndex = 0;
    let formulaIntervalId = null;

    function animateFormulas() {
        if (!formulaContainer) return;
        formulaContainer.style.opacity = '0';
        setTimeout(() => {
            formulaContainer.textContent = formulas[formulaIndex];
            formulaContainer.style.opacity = '0.15';
            formulaIndex = (formulaIndex + 1) % formulas.length;
        }, 500);
    }

    if (!prefersReducedMotion) {
        formulaIntervalId = setInterval(animateFormulas, 4000);
        animateFormulas();
    } else if (formulaContainer) {
        formulaContainer.textContent = formulas[0];
        formulaContainer.style.opacity = '0.12';
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

        for (let i = 0; i < 12; i++) {
            setTimeout(createMathSymbol, i * 400);
        }

        setInterval(createMathSymbol, 3500);
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
            '.fade-in, .info-card, .project-card, .repo-card, .publication-item, .reveal-on-scroll, .timeline-item-compact',
        )
        .forEach((el) => observer.observe(el));

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
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
