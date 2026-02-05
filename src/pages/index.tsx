import React, {useEffect} from 'react';
import Head from '@docusaurus/Head';

export default function Home() {
    useEffect(() => {
        const s = document.createElement('script');
        s.src = '/personal/script.js';
        s.async = false; // Load synchronously to ensure DOM is ready
        s.onload = () => {
            // Trigger DOMContentLoaded event manually if script loads after DOM is ready
            if (document.readyState === 'complete') {
                window.dispatchEvent(new Event('DOMContentLoaded'));
            }
        };
        document.body.appendChild(s);
        return () => { 
            if (document.body.contains(s)) {
                document.body.removeChild(s);
            }
        };
    }, []);

    return (
        <>
            <Head>
                <title>Emilio Delgado | PhD Student</title>
                <meta name="description" content="PhD Student at the University of Extremadura focusing on multi-agent systems and AI-assisted software development." />
                <link rel="icon" type="image/x-icon" href="https://intia.unex.es/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;600&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
            </Head>

            <div className="math-bg" id="math-bg" />
            <div className="grain-overlay" />

            {/* Navbar */}
            <nav className="navbar">
                <div className="container">
                    <a className="navbar-brand" href="#">EMILIO<span className="brand-dot">.</span>DELGADO</a>
                    <button className="nav-toggle" id="nav-toggle" aria-label="Toggle navigation">
                        <span></span>
                        <span></span>
                    </button>
                    <div className="nav-menu" id="nav-menu">
                        <ul className="nav-list">
                            <li><a className="nav-link" href="#about" data-i18n="nav.about">About</a></li>
                            <li><a className="nav-link" href="#timeline" data-i18n="nav.timeline">Journey</a></li>
                            <li><a className="nav-link" href="#research" data-i18n="nav.interests">Research</a></li>
                            <li><a className="nav-link" href="#projects" data-i18n="nav.projects">Projects</a></li>
                            <li><a className="nav-link" href="#repositories" data-i18n="nav.repositories">Repositories</a></li>
                            <li><a className="nav-link" href="#publications" data-i18n="nav.publications">Publications</a></li>
                            <li><a className="nav-link" href="/blog">Blog</a></li>
                            <li className="nav-controls">
                                <button id="lang-toggle" className="control-btn" aria-label="Toggle language">EN</button>
                                <button id="theme-toggle" className="control-btn" aria-label="Toggle theme">
                                    <span className="theme-icon">◐</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <main>
                <section className="hero">
                    <div className="container">
                        <div className="hero-content">
                            <div className="hero-label" data-i18n="hero.label">PhD Student & AI Researcher</div>
                            <h1 className="hero-title">
                                <span className="hero-name">Emilio</span>
                                <span className="hero-name">Delgado</span>
                            </h1>
                            <div className="hero-meta">
                                <span className="meta-item"><a href="https://intia.unex.es/" target="_blank" rel="noreferrer" className="meta-link">INTIA</a> & <a href="https://i3lab.unex.es/" target="_blank" rel="noreferrer" className="meta-link">i3Lab</a>, University of Extremadura</span>
                                <span className="meta-separator">•</span>
                                <span className="meta-item"><span data-i18n="hero.specialized">Specialized in</span>: <span className="typing-effect"></span></span>
                            </div>
                            <div className="hero-actions">
                                <a href="#publications" className="btn-primary" data-i18n="hero.publications">View Publications</a>
                                <a href="https://scholar.google.com/citations?user=eIBVkQEAAAAJ&hl=es" target="_blank" rel="noreferrer" className="btn-secondary">Scholar Profile →</a>
                                <a href="/blog" className="btn-secondary">Blog</a>
                            </div>
                        </div>
                        <div className="hero-visual">
                            <img src="/personal/me.png" alt="Emilio Delgado" className="hero-image" />
                            <div className="formula-container" id="formula-container"></div>
                        </div>
                    </div>
                </section>

                <section id="about" className="section">
                    <div className="container">
                        <div className="section-grid">
                            <h2 className="section-title" data-i18n="about.title">About</h2>
                            <div className="text-block">
                                <p className="lead-text" data-i18n="about.p1">
                                    I'm a PhD student and researcher at <a href="https://intia.unex.es/" target="_blank" rel="noreferrer" className="text-link">INTIA</a> & <a href="https://i3lab.unex.es/" target="_blank" rel="noreferrer" className="text-link">i3Lab</a> (University of Extremadura), working at the intersection of AI and Software Engineering.
                                </p>
                                <p data-i18n="about.p2">
                                    My research focuses on systematically benchmarking LLM-based multi-agent systems for software development. I explore Specification-Driven Development (SDD) as an approach to leverage formal specifications not only for guiding code generation, but for automatically producing evaluation artifacts that ensure quality and correctness.
                                </p>
                                <p data-i18n="about.p3">
                                    The goal: establish rigorous methodologies for trustworthy AI-assisted software development, where generated code can be validated systematically, transparently, and at scale.
                                </p>
                            </div>
                            <div className="info-card">
                                <h3 className="card-title" data-i18n="about.skills">Expertise</h3>
                                <div className="skill-list">
                                    <span className="skill-tag">Multi-Agent Systems</span>
                                    <span className="skill-tag">LLM Orchestration</span>
                                    <span className="skill-tag">RAG Architecture</span>
                                    <span className="skill-tag">Spec-Driven Development</span>
                                    <span className="skill-tag">AI-Generated Code Validation</span>
                                    <span className="skill-tag">Python</span>
                                    <span className="skill-tag">Software Engineering</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="timeline" className="section">
                    <div className="container">
                        <h2 className="section-title">Journey</h2>
                        <div className="timeline-compact">
                            <div className="timeline-item-compact">
                                <span className="year-label">2022</span>
                                <div className="item-dot"></div>
                                <div className="item-info">
                                    <strong>B.Sc. Software Engineering</strong>
                                    <span>University of Extremadura</span>
                                </div>
                            </div>
                            <div className="timeline-item-compact">
                                <span className="year-label">2023</span>
                                <div className="item-dot"></div>
                                <div className="item-info">
                                    <strong>M.Sc. Artificial Intelligence</strong>
                                    <span>UNIR + Data Analyst</span>
                                </div>
                            </div>
                            <div className="timeline-item-compact">
                                <span className="year-label">2024</span>
                                <div className="item-dot"></div>
                                <div className="item-info">
                                    <strong>Research Position</strong>
                                    <span>INTIA & i3Lab</span>
                                </div>
                            </div>
                            <div className="timeline-item-compact active">
                                <span className="year-label">2024</span>
                                <div className="item-dot pulse"></div>
                                <div className="item-info">
                                    <strong>PhD Student</strong>
                                    <span>University of Extremadura</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="research" className="section section-alt">
                    <div className="container">
                        <h2 className="section-title" data-i18n="interests.title">Research</h2>
                        <div className="dual-grid">
                            <div className="info-card">
                                <h3 className="card-title" data-i18n="education.title">Education</h3>
                                <div className="timeline">
                                    <div className="timeline-item">
                                        <div className="timeline-year">2023</div>
                                        <div className="timeline-content">
                                            <strong data-i18n="education.master">M.Sc. in Artificial Intelligence</strong>
                                            <span className="timeline-place">UNIR</span>
                                        </div>
                                    </div>
                                    <div className="timeline-item">
                                        <div className="timeline-year">2023</div>
                                        <div className="timeline-content">
                                            <strong data-i18n="education.data">Advanced University Course in Data
                                                Analyst</strong>
                                            <span className="timeline-place">UNIR</span>
                                        </div>
                                    </div>
                                    <div className="timeline-item">
                                        <div className="timeline-year">2022</div>
                                        <div className="timeline-content">
                                            <strong data-i18n="education.bachelor">B.Sc. in Software Engineering</strong>
                                            <span className="timeline-place" data-i18n="education.university">University of
                                                Extremadura</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="info-card">
                                <h3 className="card-title">Focus Areas</h3>
                                <div className="focus-list">
                                    <div className="focus-item">
                                        <span className="focus-number">01</span>
                                        <span className="focus-text">Multi-Agent Systems</span>
                                    </div>
                                    <div className="focus-item">
                                        <span className="focus-number">02</span>
                                        <span className="focus-text">AI-Assisted Software Development</span>
                                    </div>
                                    <div className="focus-item">
                                        <span className="focus-number">03</span>
                                        <span className="focus-text">Spec-Driven Development</span>
                                    </div>
                                    <div className="focus-item">
                                        <span className="focus-number">04</span>
                                        <span className="focus-text">RAG Architectures</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="projects" className="section">
                    <div className="container">
                        <h2 className="section-title" data-i18n="projects.title">Projects</h2>
                        <div className="project-grid">
                            <a href="https://i3lab.unex.es/project/musicgenia/" target="_blank" rel="noreferrer" className="project-card">
                                <div className="project-number">01</div>
                                <h3 className="project-title">MusicGenia</h3>
                                <p className="project-desc" data-i18n="projects.music">Innovative project
                                    exploring generative AI in the context of music composition and analysis.</p>
                                <div className="project-arrow">→</div>
                            </a>
                            <a href="#" className="project-card">
                                <div className="project-number">02</div>
                                <h3 className="project-title">Spec-Driven Development</h3>
                                <p className="project-desc" data-i18n="projects.spec">Research on specification-driven validation
                                    for AI-generated software artifacts.</p>
                                <div className="project-arrow">→</div>
                            </a>
                        </div>
                    </div>
                </section>

                <section id="repositories" className="section section-alt">
                    <div className="container">
                        <h2 className="section-title" data-i18n="repositories.title">Repositories</h2>
                        <div className="repo-grid">
                            <a href="https://github.com/emi-dm/PubMed-MCP" target="_blank" rel="noreferrer" className="repo-card">
                                <div className="repo-icon">
                                    <svg viewBox="0 0 16 16" fill="currentColor" width="24" height="24">
                                        <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" /></svg>
                                </div>
                                <div className="repo-content">
                                    <h3 className="repo-title">PubMed-MCP</h3>
                                    <p className="repo-desc" data-i18n="repositories.pubmed">MCP server for PubMed search and
                                        literature retrieval.</p>
                                </div>
                                <div className="repo-arrow">→</div>
                            </a>
                            <a href="https://github.com/emi-dm/Research-MCP" target="_blank" rel="noreferrer" className="repo-card">
                                <div className="repo-icon">
                                    <svg viewBox="0 0 16 16" fill="currentColor" width="24" height="24">
                                        <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" /></svg>
                                </div>
                                <div className="repo-content">
                                    <h3 className="repo-title">Research-MCP</h3>
                                    <p className="repo-desc" data-i18n="repositories.research">MCP server for research assistance
                                        and academic workflows.</p>
                                </div>
                                <div className="repo-arrow">→</div>
                            </a>
                        </div>
                    </div>
                </section>

                <section id="publications" className="section">
                    <div className="container">
                        <h2 className="section-title" data-i18n="publications.title">Publications</h2>
                        <div className="publications-list">
                            <a href="https://hdl.handle.net/11705/JISBD/2025/100" className="publication-item" target="_blank" rel="noreferrer">
                                <div className="publication-year">2025</div>
                                <div className="publication-content">
                                    <h3 className="publication-title">Systematic Benchmarking of LLM-based Multi-Agent Systems for
                                        Software Engineering</h3>
                                    <p className="publication-venue">JISBD 2025</p>
                                </div>
                                <div className="publication-arrow">↗</div>
                            </a>
                            <a href="https://i3lab.unex.es/publication/delgadoibpria-2025/" className="publication-item" target="_blank" rel="noreferrer">
                                <div className="publication-year">2025</div>
                                <div className="publication-content">
                                    <h3 className="publication-title">AI-Based System for Assistance in Minimally Invasive Renal
                                        Procedures</h3>
                                    <p className="publication-venue">Using Mixed Reality. First Steps</p>
                                </div>
                                <div className="publication-arrow">↗</div>
                            </a>
                            <a href="https://i3lab.unex.es/publication/gutierrez-25/" className="publication-item" target="_blank" rel="noreferrer">
                                <div className="publication-year">2025</div>
                                <div className="publication-content">
                                    <h3 className="publication-title">Prompt Once, Segment Everything: Leveraging SAM 2</h3>
                                </div>
                                <div className="publication-arrow">↗</div>
                            </a>
                            <a href="https://i3lab.unex.es/publication/advancing-precision/" className="publication-item" target="_blank" rel="noreferrer">
                                <div className="publication-year">2024</div>
                                <div className="publication-content">
                                    <h3 className="publication-title">Advancing precision in medical image segmentation</h3>
                                </div>
                                <div className="publication-arrow">↗</div>
                            </a>
                            <a href="https://i3lab.unex.es/publication/gutierrez-24/" className="publication-item" target="_blank" rel="noreferrer">
                                <div className="publication-year">2024</div>
                                <div className="publication-content">
                                    <h3 className="publication-title">No More Training: SAM's Zero-Shot Transfer Capabilities</h3>
                                </div>
                                <div className="publication-arrow">↗</div>
                            </a>
                        </div>
                    </div>
                </section>

                <footer className="footer">
                    <div className="container">
                        <div className="footer-content">
                            <div className="footer-links">
                                <a href="https://intia.unex.es/" target="_blank" rel="noreferrer">INTIA</a>
                                <a href="https://i3lab.unex.es/" target="_blank" rel="noreferrer">i3Lab</a>
                                <a href="https://scholar.google.com/citations?user=eIBVkQEAAAAJ&hl=es" target="_blank" rel="noreferrer">Google Scholar</a>
                                <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
                            </div>
                            <div className="footer-copy">
                                <p>&copy; 2025 Emilio Delgado</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
}
