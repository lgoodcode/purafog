import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import image from '@astrojs/image'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
	// Use to generate the sitemap and canonical URLs in the final build
	site: 'https://purafog.com',
	integrations: [react(), tailwind(), image(), sitemap()],
})
