import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "IDE - v3.0.0",
  description: "",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'CLI', link: '/cli' }
    ],

    sidebar: [
      {
        text: 'CLI Documentation',
        items: [
          { text: 'CLI', link: '/cli' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Piarre/ide' }
    ]
  }
})
