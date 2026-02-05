// Computational Poetry - Modern JavaScript
function initializeApp() {
    if (window.__personalAppInitialized) {
        return;
    }
    window.__personalAppInitialized = true;
    // Theme Management
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

    // Mobile Nav Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Language Toggle & Translations
    const translations = {
        en: {
            nav: {
                about: 'About',
                timeline: 'Journey',
                interests: 'Research',
                projects: 'Projects',
                publications: 'Publications'
            },
            hero: {
                label: 'PhD Student & AI Researcher',
                publications: 'View Publications',
                specialized: 'Specialized in',
                typing: ['Multi-Agent Systems', 'Software Engineering', 'AI Development']
            },
            about: {
                title: 'About',
                p1: 'I\'m a PhD student and researcher at INTIA & i3Lab (University of Extremadura), working at the intersection of AI and Software Engineering.',
                p2: 'My research focuses on systematically benchmarking LLM-based multi-agent systems for software development. I explore Specification-Driven Development (SDD) as an approach to leverage formal specifications not only for guiding code generation, but for automatically producing evaluation artifacts that ensure quality and correctness.',
                p3: 'The goal: establish rigorous methodologies for trustworthy AI-assisted software development, where generated code can be validated systematically, transparently, and at scale.',
                skills: 'Expertise'
            },
            education: {
                title: 'Education',
                master: 'M.Sc. in Artificial Intelligence',
                data: 'Advanced University Course in Data Analyst',
                bachelor: 'B.Sc. in Software Engineering',
                university: 'University of Extremadura'
            },
            interests: { title: 'Research' },
            projects: {
                title: 'Projects',
                music: 'Innovative project exploring generative AI in the context of music composition and analysis.',
                spec: 'Research on specification-driven validation for AI-generated software artifacts.'
            },
            publications: { title: 'Publications' }
        },
        es: {
            nav: {
                about: 'Sobre Mí',
                timeline: 'Trayectoria',
                interests: 'Investigación',
                projects: 'Proyectos',
                publications: 'Publicaciones'
            },
            hero: {
                label: 'Doctorando & Investigador IA',
                publications: 'Ver Publicaciones',
                specialized: 'Especializado en',
                typing: ['Sistemas Multi-Agente', 'Ingeniería de Software', 'Desarrollo IA']
            },
            about: {
                title: 'Sobre Mí',
                p1: 'Soy doctorando e investigador en INTIA & i3Lab (Universidad de Extremadura), trabajando en la intersección entre IA e Ingeniería de Software.',
                p2: 'Mi investigación se centra en el benchmarking sistemático de sistemas multi-agente basados en LLM para desarrollo de software. Exploro el Desarrollo Dirigido por Especificación (SDD) como enfoque para aprovechar especificaciones formales no solo para guiar la generación de código, sino para producir automáticamente artefactos de evaluación que garanticen calidad y corrección.',
                p3: 'El objetivo: establecer metodologías rigurosas para el desarrollo de software asistido por IA confiable, donde el código generado pueda validarse de forma sistemática, transparente y a escala.',
                skills: 'Experiencia'
            },
            education: {
                title: 'Educación',
                master: 'Máster en Inteligencia Artificial',
                data: 'Curso Universitario Superior en Analista de Datos',
                bachelor: 'Grado en Ingeniería de Software',
                university: 'Universidad de Extremadura'
            },
            interests: { title: 'Investigación' },
            projects: {
                title: 'Proyectos',
                music: 'Proyecto innovador explorando IA generativa en el contexto de composición y análisis musical.',
                spec: 'Investigación sobre validación dirigida por especificaciones para artefactos de software generados por IA.'
            },
            publications: { title: 'Publicaciones' }
        }
    };

    let currentLang = localStorage.getItem('language') || 'en';
    const langToggle = document.getElementById('lang-toggle');

    // Typing Effect
    const typingElement = document.querySelector('.typing-effect');
    let textOptions = [];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function updateLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);
        if (langToggle) langToggle.textContent = lang.toUpperCase();

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const keys = key.split('.');
            let value = translations[lang];
            keys.forEach(k => {
                if (value) value = value[k];
            });
            if (value) el.textContent = value;
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
        });
    }

    updateLanguage(currentLang);

    function type() {
        if (!typingElement || !textOptions.length) return;

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

        setTimeout(type, typeSpeed);
    }

    type();

    // Mathematical Formula Animation
    const formulaContainer = document.getElementById('formula-container');
    const formulas = [
        'f(x) = Σ wᵢxᵢ + b',
        '∇L = ∂L/∂θ',
        'P(A|B) = P(B|A)P(A)/P(B)',
        'E[X] = Σ xᵢp(xᵢ)',
        'σ(z) = 1/(1+e⁻ᶻ)',
        'J(θ) = -Σ ylog(ŷ)'
    ];

    let formulaIndex = 0;

    function animateFormulas() {
        if (formulaContainer) {
            formulaContainer.style.opacity = '0';
            setTimeout(() => {
                formulaContainer.textContent = formulas[formulaIndex];
                formulaContainer.style.opacity = '0.15';
                formulaIndex = (formulaIndex + 1) % formulas.length;
            }, 500);
        }
    }

    setInterval(animateFormulas, 4000);
    animateFormulas();

    // Math Background Animation
    const mathBg = document.getElementById('math-bg');
    if (mathBg) {
        const symbols = ['∫', '∑', '∂', '∇', 'α', 'β', 'θ', 'λ', 'π', 'σ', '≈', '≤', '≥', '∞'];

        function createMathSymbol() {
            const symbol = document.createElement('div');
            symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            symbol.style.position = 'absolute';
            symbol.style.left = Math.random() * 100 + '%';
            symbol.style.top = Math.random() * 100 + '%';
            symbol.style.fontSize = (Math.random() * 20 + 15) + 'px';
            symbol.style.color = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary');
            symbol.style.opacity = '0.1';
            symbol.style.fontFamily = 'var(--font-mono)';
            symbol.style.pointerEvents = 'none';

            mathBg.appendChild(symbol);

            setTimeout(() => symbol.remove(), 10000);
        }

        for (let i = 0; i < 15; i++) {
            setTimeout(createMathSymbol, i * 500);
        }

        setInterval(createMathSymbol, 3000);
    }

    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in, .info-card, .project-card').forEach(el => {
        observer.observe(el);
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

window.initializePersonalApp = initializeApp;

// Execute immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp, { once: true });
} else {
    // DOM is already loaded (common in SPAs like React)
    initializeApp();
}

