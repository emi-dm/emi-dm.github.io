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
            title: 'MiDoc',
            logo: {
                alt: 'MiDoc Logo',
                src: 'img/logo.svg',
            },
            items: [
                {
                    type: 'doc',
                    docId: 'intro',
                    position: 'left',
                    label: 'Docs',
                },
                { to: '/blog', label: 'Blog', position: 'left' },
                {
                    href: 'https://github.com/example/midoc',
                    label: 'GitHub',
                    position: 'right',
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
