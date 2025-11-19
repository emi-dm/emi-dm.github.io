document.addEventListener('DOMContentLoaded', () => {
    // Particle Animation Variables (Global to scope for theme update)
    let particleColor = 'rgba(99, 102, 241, 0.5)';
    let connectionColorBase = 'rgba(99, 102, 241,';

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.theme-icon-light');
    const moonIcon = document.querySelector('.theme-icon-dark');
    const htmlElement = document.documentElement;

    // Check for saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    function setTheme(theme) {
        htmlElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);

        if (theme === 'dark') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
            // Update particles for dark mode
            particleColor = 'rgba(99, 102, 241, 0.5)';
            connectionColorBase = 'rgba(99, 102, 241,';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
            // Update particles for light mode
            particleColor = 'rgba(79, 70, 229, 0.6)';
            connectionColorBase = 'rgba(79, 70, 229,';
        }
    }

    // Particle Animation
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.fillStyle = particleColor; // Use dynamic color
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const particleCount = Math.min(window.innerWidth / 10, 100); // Responsive count
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        particles.forEach((a, index) => {
            for (let j = index + 1; j < particles.length; j++) {
                const b = particles[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.strokeStyle = `${connectionColorBase} ${0.1 - distance / 1500})`; // Use dynamic color
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    // Custom Cursor Logic
    const cursor = document.querySelector('.cursor-glow');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Smooth Scroll (Bootstrap handles some, but this ensures offset for fixed nav)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Language Support
    const translations = {
        en: {
            nav: {
                about: "About",
                interests: "Interests",
                projects: "Projects",
                publications: "Publications"
            },
            hero: {
                projects: "View Projects",
                specialized: "Specialized in",
                role: "AI Researcher at i3Lab (UEx)",
                typing: ["Multi-Agent Systems", "Deep Learning", "Healthcare AI"]
            },
            about: {
                title: "About Me",
                p1: "I work at the intersection of AI and software engineering, exploring how intelligent agents can improve collaboration, decision-making, and efficiency.",
                p2: "Currently, I conduct my research at the University of Extremadura, focusing on Multi-Agent Systems and Deep Learning applied to healthcare. My work ranges from orchestrating LLMs to implementing RAG architectures for clinical decision support.",
                p3: "I am fascinated by bridging the gap between academic theory and practical applications, always striving to build technological solutions with real positive impact on society.",
                skills: "Key Skills"
            },
            education: {
                title: "Education",
                master: "M.Sc. in Artificial Intelligence",
                data: "Advanced University Course in Data Analyst",
                bachelor: "B.Sc. in Software Engineering",
                university: "University of Extremadura"
            },
            interests: {
                title: "Interests"
            },
            projects: {
                title: "Projects",
                sam: "Research project leveraging Segment Anything Model (SAM) for precise medical image analysis.",
                music: "Innovative project exploring generative AI in the context of music composition and analysis."
            },
            publications: {
                title: "Recent Publications"
            }
        },
        es: {
            nav: {
                about: "Sobre Mí",
                interests: "Intereses",
                projects: "Proyectos",
                publications: "Publicaciones"
            },
            hero: {
                projects: "Ver Proyectos",
                specialized: "Especializado en",
                role: "Investigador de IA en i3Lab (UEx)",
                typing: ["Sistemas Multi-Agente", "Aprendizaje Profundo", "IA en Salud"]
            },
            about: {
                title: "Sobre Mí",
                p1: "Trabajo en la intersección de la IA y la ingeniería de software, explorando cómo los agentes inteligentes pueden mejorar la colaboración, la toma de decisiones y la eficiencia.",
                p2: "Actualmente, desarrollo mi investigación en la Universidad de Extremadura, enfocándome en Sistemas Multi-Agente y Aprendizaje Profundo aplicado a la salud. Mi trabajo abarca desde la orquestación de LLMs hasta la implementación de arquitecturas RAG para soporte a la decisión clínica.",
                p3: "Me fascina construir puentes entre la teoría académica y las aplicaciones prácticas, buscando siempre crear soluciones tecnológicas que tengan un impacto real y positivo en la sociedad.",
                skills: "Habilidades Clave"
            },
            education: {
                title: "Educación",
                master: "Máster en Inteligencia Artificial",
                data: "Curso Universitario Superior en Analista de Datos",
                bachelor: "Grado en Ingeniería de Software",
                university: "Universidad de Extremadura"
            },
            interests: {
                title: "Intereses"
            },
            projects: {
                title: "Proyectos",
                sam: "Proyecto de investigación utilizando Segment Anything Model (SAM) para análisis preciso de imágenes médicas.",
                music: "Proyecto innovador explorando IA generativa en el contexto de composición y análisis musical."
            },
            publications: {
                title: "Publicaciones Recientes"
            }
        }
    };

    let currentLang = localStorage.getItem('language') || 'en';
    const langToggle = document.getElementById('lang-toggle');

    // Typing Effect Variables
    const typingElement = document.querySelector('.typing-effect');
    let textOptions = [];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function updateLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);
        langToggle.textContent = lang.toUpperCase();
        document.documentElement.lang = lang;

        // Update text elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const keys = key.split('.');
            let value = translations[lang];
            keys.forEach(k => value = value[k]);
            if (value) el.textContent = value;
        });

        // Update typing effect
        textOptions = translations[lang].hero.typing;
        textIndex = 0;
        charIndex = 0;
        isDeleting = false;
        if (typingElement) typingElement.textContent = '';
    }

    langToggle.addEventListener('click', () => {
        const newLang = currentLang === 'en' ? 'es' : 'en';
        updateLanguage(newLang);
    });

    // Initialize language
    updateLanguage(currentLang);

    function type() {
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
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textOptions.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    type();
});
