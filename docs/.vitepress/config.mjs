import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/vwhat/',
  title: 'What can I say ？',
  description: 'A VitePress Site',
  head: [['link', { rel: 'icon', href: '/vwhat/favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // { text: '首页', link: '/' },
      // { text: '文章', link: '/markdown-examples' },
    ],
    outline: { level: 'deep', label: '目录' },
    docFooter: { prev: false, next: false },
    darkModeSwitchLabel: '切换主题',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    lastUpdated: {
      text: '最后编辑于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium',
      },
    },
  },
});
