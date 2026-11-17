// import type { UserThemeConfig } from 'valaxy-theme-arknights'
import { defineValaxyConfig } from 'valaxy'

// add icons what you will need
const safelist = [
  'i-ri-home-line',
]

/**
 * User Config
 */
export default defineValaxyConfig({
  // site config see site.config.ts

  theme: 'arknights',

  // Local read-only MCP stays off. Uncomment to enable it while running `pnpm dev`.
  // Production builds do not include the server.
  // https://valaxy.site/guide/work-with-ai#mcp
  // mcp: true,

  themeConfig: {},

  unocss: { safelist },
})
