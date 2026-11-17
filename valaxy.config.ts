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
  theme: 'arknights',

  // 站点完整 URL，SSG / RSS 生成永久链接用
  siteConfig: {
    url: 'https://nepg.github.io/vwhat/',
  },

  // ite 构建基路径，必须以斜杠开头和结尾
  vite: {
    base: '/vwhat/',
  },

  // Local read-only MCP stays off. Uncomment to enable it while running `pnpm dev`.
  // https://valaxy.site/guide/work-with-ai#mcp
  // mcp: true,

  themeConfig: {
    eyebrow: 'MY FIELD NOTES',
    motto: '记录值得留下的事。',
    accent: '#ffd84a',
    outline: 'deep',
    nav: [
      { text: '首页', link: '/' },
    ],
  },

  unocss: { safelist },
})