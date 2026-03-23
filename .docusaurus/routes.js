import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/blog',
    component: ComponentCreator('/blog', '1ef'),
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
    path: '/blog/tags/ai',
    component: ComponentCreator('/blog/tags/ai', 'cbb'),
    exact: true
  },
  {
    path: '/blog/tags/development',
    component: ComponentCreator('/blog/tags/development', 'e7b'),
    exact: true
  },
  {
    path: '/blog/tags/didactic',
    component: ComponentCreator('/blog/tags/didactic', 'fbf'),
    exact: true
  },
  {
    path: '/blog/tags/find-skills',
    component: ComponentCreator('/blog/tags/find-skills', '579'),
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
    path: '/blog/tags/specification',
    component: ComponentCreator('/blog/tags/specification', '722'),
    exact: true
  },
  {
    path: '/blog/tags/vscode',
    component: ComponentCreator('/blog/tags/vscode', '296'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '2b2'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '27f'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'cb5'),
            routes: [
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '218'),
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
