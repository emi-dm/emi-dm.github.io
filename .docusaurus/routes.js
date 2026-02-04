import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', 'e05'),
    exact: true
  },
  {
    path: '/blog/2026/02/04/sdd-didactico',
    component: ComponentCreator('/blog/2026/02/04/sdd-didactico', 'e85'),
    exact: true
  },
  {
    path: '/blog/2026/02/04/skills-find-skills',
    component: ComponentCreator('/blog/2026/02/04/skills-find-skills', '55d'),
    exact: true
  },
  {
    path: '/blog/2026/02/04/welcome',
    component: ComponentCreator('/blog/2026/02/04/welcome', 'f62'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '182'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '287'),
    exact: true
  },
  {
    path: '/blog/tags/desarrollo',
    component: ComponentCreator('/blog/tags/desarrollo', '831'),
    exact: true
  },
  {
    path: '/blog/tags/didactico',
    component: ComponentCreator('/blog/tags/didactico', '799'),
    exact: true
  },
  {
    path: '/blog/tags/especificacion',
    component: ComponentCreator('/blog/tags/especificacion', '6ac'),
    exact: true
  },
  {
    path: '/blog/tags/example',
    component: ComponentCreator('/blog/tags/example', '936'),
    exact: true
  },
  {
    path: '/blog/tags/find-skills',
    component: ComponentCreator('/blog/tags/find-skills', '579'),
    exact: true
  },
  {
    path: '/blog/tags/ia',
    component: ComponentCreator('/blog/tags/ia', '66d'),
    exact: true
  },
  {
    path: '/blog/tags/sdd',
    component: ComponentCreator('/blog/tags/sdd', 'a40'),
    exact: true
  },
  {
    path: '/blog/tags/skills',
    component: ComponentCreator('/blog/tags/skills', 'ccd'),
    exact: true
  },
  {
    path: '/blog/tags/vscode',
    component: ComponentCreator('/blog/tags/vscode', '296'),
    exact: true
  },
  {
    path: '/blog/tags/welcome',
    component: ComponentCreator('/blog/tags/welcome', 'c40'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'b2c'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '4fa'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'e47'),
            routes: [
              {
                path: '/docs/getting-started',
                component: ComponentCreator('/docs/getting-started', '2a1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '61d'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
