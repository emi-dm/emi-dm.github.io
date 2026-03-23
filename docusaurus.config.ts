import { Config } from '@docusaurus/types';

const repoEdit = 'https://github.com/emi-dm/emi-dm.github.io/tree/main';

const config: Config = {
    title: 'Emilio Delgado',
    tagline: 'PhD research · LLM-generated code quality · Specification-Driven Development',
    url: 'https://emi-dm.github.io',
    baseUrl: '/',
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    // Some pages reference homepage anchors (e.g. /#about). These intentionally point
    // to sections on the homepage; ignore anchor validation to avoid noisy build warnings.
    onBrokenAnchors: 'ignore',
    favicon: 'https://intia.unex.es/favicon.ico',

    // Load Google Fonts early for consistent typography across pages
    stylesheets: [
        'https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;600&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap'
    ],

    organizationName: 'emi-dm',
    projectName: 'emi-dm.github.io',

    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            ({
                docs: {
                    path: 'documentation',
                    routeBasePath: 'docs',
                    sidebarPath: require.resolve('./sidebars.ts'),
                    editUrl: `${repoEdit}/documentation/`,
                },
                blog: {
                    showReadingTime: true,
                    editUrl: `${repoEdit}/blog/`,
                    // Path to authors map to resolve author keys used in posts
                    // Use require.resolve to ensure absolute path is embedded at build time
                    authorsMapPath: require.resolve('./authors.json'),
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig: {
        navbar: {
            title: 'EMILIO.DELGADO',
            // No logo image in header to match personal site (text-only header)
            items: [
                { to: '/', label: 'Home', position: 'left' },
                { to: '/#about', label: 'About', position: 'left' },
                { to: '/#timeline', label: 'Journey', position: 'left' },
                { to: '/#research', label: 'Research', position: 'left' },
                { to: '/#projects', label: 'Projects', position: 'left' },
                { to: '/#repositories', label: 'Repositories', position: 'left' },
                { to: '/#publications', label: 'Publications', position: 'left' },
                { to: '/docs/intro', label: 'Docs', position: 'left' },
                { to: '/blog', label: 'Blog', position: 'left' },
                {
                    href: 'https://github.com/emi-dm',
                    label: 'GitHub',
                    position: 'right',
                    target: '_blank',
                    rel: 'noopener noreferrer',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Research',
                    items: [
                        { label: 'INTIA', href: 'https://intia.unex.es/', target: '_blank', rel: 'noopener noreferrer' },
                        { label: 'i3Lab', href: 'https://i3lab.unex.es/', target: '_blank', rel: 'noopener noreferrer' },
                        {
                            label: 'Google Scholar',
                            href: 'https://scholar.google.com/citations?user=eIBVkQEAAAAJ&hl=es',
                            target: '_blank',
                            rel: 'noopener noreferrer',
                        },
                    ],
                },
                {
                    title: 'Site',
                    items: [
                        { label: 'Home', to: '/' },
                        { label: 'Docs', to: '/docs/intro' },
                        { label: 'Blog', to: '/blog' },
                        {
                            label: 'GitHub',
                            href: 'https://github.com/emi-dm',
                            target: '_blank',
                            rel: 'noopener noreferrer',
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Emilio Delgado`,
        },
        colorMode: {
            defaultMode: 'dark',
            respectPrefersColorScheme: true,
        },
    },
};

export default config;
