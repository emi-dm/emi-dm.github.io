import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/es/blog',
    component: ComponentCreator('/es/blog', '9d0'),
    exact: true
  },
  {
    path: '/es/blog/2026/02/04/sdd-didactico',
    component: ComponentCreator('/es/blog/2026/02/04/sdd-didactico', 'ba7'),
    exact: true
  },
  {
    path: '/es/blog/2026/02/04/skills-find-skills',
    component: ComponentCreator('/es/blog/2026/02/04/skills-find-skills', '049'),
    exact: true
  },
  {
    path: '/es/blog/archive',
    component: ComponentCreator('/es/blog/archive', 'c1d'),
    exact: true
  },
  {
    path: '/es/blog/tags',
    component: ComponentCreator('/es/blog/tags', 'b1d'),
    exact: true
  },
  {
    path: '/es/blog/tags/desarrollo',
    component: ComponentCreator('/es/blog/tags/desarrollo', '53f'),
    exact: true
  },
  {
    path: '/es/blog/tags/didactico',
    component: ComponentCreator('/es/blog/tags/didactico', 'c2e'),
    exact: true
  },
  {
    path: '/es/blog/tags/especificacion',
    component: ComponentCreator('/es/blog/tags/especificacion', '1f8'),
    exact: true
  },
  {
    path: '/es/blog/tags/find-skills',
    component: ComponentCreator('/es/blog/tags/find-skills', '05f'),
    exact: true
  },
  {
    path: '/es/blog/tags/ia',
    component: ComponentCreator('/es/blog/tags/ia', 'fc3'),
    exact: true
  },
  {
    path: '/es/blog/tags/sdd',
    component: ComponentCreator('/es/blog/tags/sdd', '18a'),
    exact: true
  },
  {
    path: '/es/blog/tags/skills',
    component: ComponentCreator('/es/blog/tags/skills', 'ef2'),
    exact: true
  },
  {
    path: '/es/blog/tags/vscode',
    component: ComponentCreator('/es/blog/tags/vscode', 'dbf'),
    exact: true
  },
  {
    path: '/es/docs',
    component: ComponentCreator('/es/docs', 'cd0'),
    routes: [
      {
        path: '/es/docs',
        component: ComponentCreator('/es/docs', '363'),
        routes: [
          {
            path: '/es/docs',
            component: ComponentCreator('/es/docs', '959'),
            routes: [
              {
                path: '/es/docs/intro',
                component: ComponentCreator('/es/docs/intro', '55c'),
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
    path: '/es/',
    component: ComponentCreator('/es/', 'f57'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
