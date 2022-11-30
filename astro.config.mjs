import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import image from '@astrojs/image'
import sitemap from '@astrojs/sitemap'
import preact from '@astrojs/preact'
import partytown from '@astrojs/partytown'

// https://astro.build/config
export default defineConfig({
  // Used to generate the sitemap and canonical URLs in the final build for crawling
  site: 'https://purafog.com',
  integrations: [
    tailwind(),
    image(),
    sitemap(),
    preact(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
  ],
})
