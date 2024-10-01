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
        text: "General",
        items: [
          {
            items: [{ text: "Installation", link: "/setup" }],
          },
          {
            text: "Templates",
            items: [
              { text: "V1", link: "/templates/v1" },
              { text: "V2", link: "/templates/v2" },
            ],
          },
          {
            text: "Variables",
            link: "/variables",
          },
        ],
      },
      {
        text: "Misc",
        items: [{ text: "License", link: "/license" }],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/Piarre/IDEv2" }],
  },
});
