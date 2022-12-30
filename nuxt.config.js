const pinia = [
  "@pinia/nuxt",
  {
    autoImports: [
      "defineStore",
      ["defineStore", "definePiniaStore"],
      "acceptHMRUpdate",
    ],
  },
];
export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "Mehmet Uysal: A Portfolio",
      meta: [
        { name: "description", content: "My personal portfolio site." },
        { name: "google", content: "nositelinkssearchbox" },
        {
          name: "keywords",
          content: "Mehmet Uysal, Portfolio, Full Stack Web Developer",
        },
        { itemprop: "url", content: "https://mehmetuysal.tech/" },
        { itemprop: "name", content: "Mehmet Uysal" },
        { itemprop: "alternateName", content: "uys2000" },
        { "http-equiv": "Content-Type", content: "text/html; charset=utf-8" },
      ],
      link: [{ rel: "icon", href: "/favicon.ico" }],
    },
  },
  modules: ["@nuxt/content", pinia],
  buildModules: ["@nuxt/typescript-build"],
  srcDir: "src/",
  runtimeConfig: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY, // can be overridden by NUXT_API_SECRET environment variable
    public: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY, // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    },
  },
  imports: {
    dirs: ["stores"],
  },
  css: ["~/assets/css/tailwind.css"],
  plugins: ["~/plugins/osa.ts", "~/plugins/firebase.client.ts"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  nitro: {
    preset: "firebase",
  },
});
