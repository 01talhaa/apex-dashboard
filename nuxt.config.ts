export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  build: {
    analyze: true, // Enables bundle analysis
  },
  modern: 'client', // Modern mode for client-side only
  render: {
    resourceHints: true, // Preloads critical JS resources
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxtjs/device',
  ],
  image: {
    domains: ['picsum.photos'], // Add your external image domains here
  },
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxt/devtools',
  ],
  plugins: [
    '@/plugins/auth-init.ts',
  ],
  pages: true, // Enables file-based routing
  meta: {
    guestOnly: true,
    requiresAuth: false,
  },
  colorMode: {
    classSuffix: '', // This means the classes will be 'dark' and 'light' directly.
    preference: 'system', // Default theme ('system' uses the system preference)
    fallback: 'light', // Fallback theme if no preference is set
  },
})
