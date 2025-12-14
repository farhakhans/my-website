// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Physical AI Book',
  tagline: 'An accessible guide to Physical AI concepts and applications',
  favicon: 'img/f logo final (1).jpg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://physical-ai-book.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'physical-ai-book', // Usually your GitHub org/user name.
  projectName: 'physical-ai-book', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/f logo final (1).jpg.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Physical AI Book ',
        logo: {
          alt: 'Physical AI Book Logo',
          src: 'img/f logo final (1).jpg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Chapters',
          },
          {to: '/blog', label: 'Resources', position: 'left'},
          {
            href: 'https://github.com/physical-ai-book/physical-ai-book',
            label: 'GitHub',
            position: 'right',
          },

          {
    href: 'https://my-portfolio-d5rg.vercel.app/',
    label: 'my-portfolio',
    position: 'right',
  },
],
        
        
      },

      
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Chapters',
            items: [
              {
                label: 'Introduction to Physical AI',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Physical AI Community',
                href: 'https://example.com/physical-ai-community',
              },
              {
                label: 'Research Papers',
                href: 'https://example.com/physical-ai-papers',
              },
              {
                label: 'Tools & Libraries',
                href: 'https://example.com/physical-ai-tools',
              },
            ],
          },

          
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/physical-ai-book/physical-ai-book',
              },
              {
                label: 'Contributing',
                href: 'https://github.com/physical-ai-book/physical-ai-book/blob/main/CONTRIBUTING.md',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Physical AI Book. Built with Docusaurus made Farhana Khan 🌹🌹🌹🌹.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      
    }),
    
};

export default config;
