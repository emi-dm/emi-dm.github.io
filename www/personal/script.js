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
                    `I'm a PhD student at <a href="${linkIntia}" target="_blank" rel="noreferrer" class="text-link">INTIA</a> (University of Extremadura), working where AI meets software engineering.`,
                p2:
                    'My research focuses on <strong>quality assurance for code produced by large language models</strong>. I work with <strong>specification-driven development (SDD)</strong> so that formal specifications are not just prompts for generation, but a basis for <strong>tests, checks, and evaluation artifacts</strong> that make LLM-generated code easier to validate and trust.',
                p3:
                    'The broader goal is <strong>rigorous, transparent</strong> AI-assisted development: models can draft code quickly, but we still need <strong>systematic ways to measure and improve its correctness</strong>.',
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
                    `Soy doctorando en <a href="${linkIntia}" target="_blank" rel="noreferrer" class="text-link">INTIA</a> (Universidad de Extremadura), en el cruce entre IA e ingeniería del software.`,
                p2:
                    'Mi trabajo se centra en el <strong>aseguramiento de la calidad del código generado por modelos de lenguaje</strong>. Trabajo con el <strong>desarrollo dirigido por especificaciones (SDD)</strong> para que las especificaciones formales no sirvan solo de guía a la generación, sino como base de <strong>pruebas, comprobaciones y artefactos de evaluación</strong> que hagan ese código más fácil de validar y de confiar.',
                p3:
                    'El objetivo general es un desarrollo asistido por IA <strong>riguroso y transparente</strong>: los modelos pueden proponer código muy rápido, pero hace falta <strong>formas sistemáticas de medir y mejorar su corrección</strong>.',
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
