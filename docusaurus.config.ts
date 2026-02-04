import { Config } from '@docusaurus/types';

const config: Config = {
    title: 'MiDoc',
    tagline: 'Example Docusaurus site',
    url: 'https://emi-dm.github.io',
    baseUrl: '/',
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',

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
                    sidebarPath: require.resolve('./sidebars.ts'),
                    editUrl: 'https://github.com/example/midoc/tree/main/',
                },
                blog: {
                    showReadingTime: true,
                    editUrl: 'https://github.com/example/midoc/tree/main/',
                    // Path to authors map to resolve author keys used in posts
                    authorsMapPath: './authors.json',
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
            // Use a neutral project logo (remove personal photo from the header)
            logo: {
                alt: 'MiDoc Logo',
                src: 'img/logo.svg',
            },
            items: [
                // Links mirror the main personal site anchors (absolute URLs so anchors resolve from any page)
                { href: 'https://emi-dm.github.io/personal/index.html', label: 'Home', position: 'left' },
                { href: 'https://emi-dm.github.io/personal/index.html#about', label: 'About', position: 'left' },
                { href: 'https://emi-dm.github.io/personal/index.html#timeline', label: 'Journey', position: 'left' },
                { href: 'https://emi-dm.github.io/personal/index.html#research', label: 'Research', position: 'left' },
                { href: 'https://emi-dm.github.io/personal/index.html#projects', label: 'Projects', position: 'left' },
                { href: 'https://emi-dm.github.io/personal/index.html#repositories', label: 'Repositories', position: 'left' },
                { href: 'https://emi-dm.github.io/personal/index.html#publications', label: 'Publications', position: 'left' },
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
                    title: 'Docs',
                    items: [
                        {
                            label: 'Tutorial',
                            to: '/docs/intro',
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} MiDoc`,
        },
    },
};

export default config;
