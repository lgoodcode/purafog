import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import image from '@astrojs/image'
import sitemap from '@astrojs/sitemap'
import preact from '@astrojs/preact'

// https://astro.build/config
export default defineConfig({
  // Use to generate the sitemap and canonical URLs in the final build
  site: 'https://purafog.com',
  integrations: [tailwind(), image(), sitemap(), preact()],
})
