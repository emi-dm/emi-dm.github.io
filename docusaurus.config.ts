import { Config } from '@docusaurus/types';

const config: Config = {
    title: 'MiDoc',
    tagline: 'Example Docusaurus site',
    url: 'https://emi-dm.github.io',
    baseUrl: '/',
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',

    // Load Google Fonts early for consistent typography across pages
    stylesheets: [
        'https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;600&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap'
    ],

    organizationName: 'emi-dm',
    projectName: 'emi-dm.github.io',

    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'es'],
    },

    presets: [
        [
            'classic',
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.ts'),
                    editUrl: 'https://github.com/example/midoc/tree/main/',
                },
                blog: {
                    showReadingTime: true,
                    editUrl: 'https://github.com/example/midoc/tree/main/',
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
                { to: '/docs', label: 'Docs', position: 'left' },
                { to: '/blog', label: 'Blog', position: 'left' },
                {
                    href: 'https://github.com/emi-dm',
                    label: 'GitHub',
                    position: 'right',
                    target: '_blank',
                    rel: 'noopener noreferrer',
                },
                { type: 'localeDropdown', position: 'right' },
            ],
        },
        footer: {
            style: 'dark',
            links: [],
            copyright: `Copyright © ${new Date().getFullYear()} MiDoc`,
        },
    },
};

export default config;
