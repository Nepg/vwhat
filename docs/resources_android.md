<script setup>
const categories = [
  {
    title: "未分类",
    apps: [
      { icon: "/icons/KeePassDX.png", name: "KeePassDX", desc: "密码管理", website: "https://github.com/Kunzisoft/KeePassDX", pan: "https://wwanv.lanzoum.com/ie9ii3xulztc" },
      { icon: "/icons/LocalSend.png", name: "LocalSend", desc: "局域网传文件", website: "https://localsend.org/zh-TW/download", pan: "https://wwanv.lanzoum.com/iUhK748qvsyh" },
      { icon: "/icons/gallery.png", name: "Gallery", desc: "图库", website: "https://github.com/FossifyOrg/Gallery", pan: "https://wwanv.lanzoum.com/iI30N3yfr6fg" },
      { icon: "/icons/nextplayer.png", name: "Next Player", desc: "视频播放", website: "https://github.com/anilbeesetti/nextplayer", pan: "https://wwanv.lanzoum.com/iHr8C3yfrdib" },
      { icon: "/icons/foldersync.png", name: "FolderSync", desc: "文件同步", website: "https://foldersync.io/", pan: "https://share.feijipan.com/s/YgyttS1i" },
      { icon: "/icons/mt.png", name: "MT管理器", desc: "", website: "https://mt2.cn/", pan: "https://share.feijipan.com/s/5wyttyZO" },
      { icon: "/icons/twinfile.png", name: "Twinfile", desc: "双栏文件管理器", website: "https://github.com/copylee711/twinfile", pan: "https://share.feijipan.com/s/jcytu01u" },
      { icon: "/icons/snapseed.png", name: "Snapseed", desc: "图片编辑", website: "https://play.google.com/store/apps/details?id=com.niksoftware.snapseed", pan: "https://share.feijipan.com/s/DLytuoLO" },
      { icon: "/icons/lotus.png", name: "Lotus", desc: "音乐播放器", website: "https://github.com/Bjorn99/lotus", pan: "https://share.feijipan.com/s/zDytuKuz" },
      { icon: "/icons/plees_tracker.png", name: "Plees Tracker", desc: "", website: "https://github.com/vmiklos/plees-tracker", pan: "https://share.feijipan.com/s/n2ytLI6H" },
      { icon: "/icons/markleaf.png", name: "Markleaf", desc: "", website: "https://github.com/jeiel85/markleaf-android", pan: "https://share.feijipan.com/s/0LytL7uN" },
      { icon: "/icons/gogogo.png", name: "影梭", desc: "模拟定位", website: "https://github.com/ZCShou/GoGoGo", pan: "https://share.feijipan.com/s/6Wyttcwz" },
      { icon: "/icons/appiconextractor.png", name: "图标提取器", desc: "", website: "https://github.com/0liuuil0/AppIconExtractor", pan: "https://share.feijipan.com/s/PxytLjSS" },
      { icon: "/icons/via.png", name: "Via", desc: "浏览器", website: "https://viayoo.com/zh-cn/", pan: "https://share.feijipan.com/s/lzyuDAzd" }
    ]
  }
]
</script>

<div class="category-list">
  <div v-for="(category, index) in categories" :key="index" class="category-block">
    <h2 :id="category.title">{{ category.title }}</h2>
    <div class="resource-grid">
      <ResourceCard v-for="app in category.apps" :key="app.name" v-bind="app" />
    </div>
  </div>
</div>

<style scoped>
/* 覆盖当前页面分类标题的默认样式 */
.vp-doc h2 {
  border-top: none !important;
  padding-top: 0 !important;
  margin-top: 40px !important;
  margin-bottom: 12px !important;
}

/* 第一个分类不需要顶部间距 */
.category-block:first-child h2 {
  margin-top: 0 !important;
}

/* 移动端微调 */
@media (max-width: 768px) {
  .vp-doc h2 {
    margin-top: 30px !important;
    margin-bottom: 10px !important;
  }
  .category-block:first-child h2 {
    margin-top: 0 !important;
  }
}
</style>
