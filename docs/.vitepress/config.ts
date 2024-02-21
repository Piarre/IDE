import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "IDE - v2",
  description: "👽️ My CLI to fastly initalize new projects ! 📦️",
  cleanUrls: true,
  base: "/",
  lang: "en-US",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "License", link: "/license" },
    ],

    sidebar: [
      {
        text: "Setup",
        items: [
          {
            items: [
              { text: "Installation", link: "/setup" },
              { text: "License", link: "/license" },
            ],
          },
          {
            text: "Customization",
            link: "/customization",
          },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
});
