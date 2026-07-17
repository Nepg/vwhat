import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/vwhat/',
  title: 'What can I say ？',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // { text: 'Home', link: '/' },
      // { text: '文章', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: '索引',
        items: [
          { text: '中文教程', link: '/中文教程' },
          { text: 'Guide_EN', link: '/Guide_EN' },
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
          { text: 'Slider', link: '/slider' },
          { text: 'Listbox', link: '/listbox' },
        ],
      },
    ],

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    // ],
    outline: { label: '目录' },
    docFooter: { prev: false, next: false },
    darkModeSwitchLabel: '切换主题',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    // editLink: {
    //   pattern: 'https://github.com/your-repo/edit/main/docs/:path',
    //   text: '在 GitHub 上编辑此页',
    // },
    // lastUpdated: {
    //   text: '最后更新于',
    //   formatOptions: {
    //     dateStyle: 'full',
    //     timeStyle: 'medium',
    //   },
    // },
  },
});
