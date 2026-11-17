---
title: windows资源整理
date: 2026-11-14
updated: 2026-11-16
hideHeader: true
---

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const categories = [
  {
    title: "硬件、驱动",
    apps: [
      { icon: "/icons/nvidia.svg", name: "NVIDIA", desc: "", website: "https://www.nvidia.cn/drivers/" },
      { icon: "/icons/amd.ico", name: "AMD", desc: "", website: "https://www.amd.com/zh-cn/support/download/drivers.html" },
      { icon: "/icons/ddu.png", name: "DDU", desc: "卸显卡驱动", website: "https://www.wagnardsoft.com/", pan: "https://wwanv.lanzoum.com/iNq3D3x7nbad" },
      { icon: "/icons/cpuz.ico", name: "CPU-Z", desc: "", website: "https://www.cpuid.com/softwares/cpu-z.html", pan: "https://wwanv.lanzoum.com/i6ecK3x7yj3a" },
      { icon: "/icons/GPU-Z.ico", name: "GPU-Z", desc: "", website: "https://www.techpowerup.com/download/techpowerup-gpu-z/", pan: "https://wwanv.lanzoum.com/iyjPs3x7ykud" },
      { icon: "/icons/aida64.png", name: "AIDA64", desc: "压力测试", website: "https://www.aida64.com/downloads" },
      { icon: "/icons/hwinfo.png", name: "HWiNFO", desc: "硬件温度", website: "https://www.hwinfo.com/", pan: "https://wwanv.lanzoum.com/iTpb53x6ri5i" },
      { icon: "/icons/crystalmark.ico", name: "CrystalDiskInfo", desc: "硬盘健康", website: "https://crystalmark.info/en/", pan: "https://wwanv.lanzoum.com/iqPP23x6sspe" },
      { icon: "/icons/ATIWinFlash.png", name: "ATIWinFlash", desc: "580 刷 BIOS", website: "http://www.smxdiy.com/thread-1079-1-1.html", pan: "https://share.feijipan.com/s/ioyuB1ug" },
      { icon: "/icons/MSIAfterburner.ico", name: "微星小飞机", desc: "", website: "https://www.msi.com/Landing/afterburner/graphics-cards" },
      { icon: "/icons/tbtool.ico", name: "图吧工具箱", desc: "整合包", website: "https://www.tbtool.cn/", pan: "https://cloud.189.cn/web/share?code=i2auqeEBJjM3（访问码：yej5）" },
      { icon: "/icons/360Drv.ico", name: "360驱动大师", desc: "不限速版本", pan: "https://wwanv.lanzoum.com/ipj9C3x7ofsb" },
      { icon: "/icons/DrvCeo.ico", name: "驱动总裁", desc: "一键安装驱动，可能装错导致蓝屏", website: "https://www.sysceo.com/software-softwarei-id-258.html", pan: "https://wwanv.lanzoum.com/iIUzT3x7ok4h" }
    ]
  }
,
  {
    title: "网络、传输",
    apps: [
      { icon: "/icons/IDM.ico", name: "IDM", desc: "", website: "https://www.internetdownloadmanager.com/", pan: "https://wwanv.lanzoum.com/iSG9B3x8k37a" },
      { icon: "/icons/Motrix.png", name: "Motrix", desc: "", website: "https://motrix.app/" },
      { icon: "/icons/fdm.ico", name: "FDM", desc: "", website: "https://www.freedownloadmanager.org/", pan: "https://wwanv.lanzoum.com/i40HS48mj1di" },
      { icon: "/icons/xunlei.png", name: "迅雷", desc: "", website: "https://dl.xunlei.com/", pan: "https://wwanv.lanzoum.com/iOo1S3x7kt4h" },
      { icon: "/icons/LocalSend.png", name: "LocalSend", desc: "局域网传文件", website: "https://localsend.org/zh-TW/download", pan: "https://wwanv.lanzoum.com/iIl6o48qvu7c" },
      { icon: "/icons/radminvpn.png", name: "Radmin VPN", desc: "组网", website: "https://www.radmin-lan.cn/", pan: "https://share.feijipan.com/s/trxocp88" },
      { icon: "/icons/natpierce.ico", name: "皎月连", desc: "p2p内网穿透", website: "https://www.natpierce.cn/" },
      { icon: "/icons/SubnetDesk.ico", name: "SubnetDesk", desc: "搭配p2p实现远程桌面", website: "https://github.com/zibo-chen/SubnetDesk", pan: "https://wwanv.lanzouc.com/iDHGL4a2n2jg" },
      { icon: "/icons/uuyc.ico", name: "网易UU远程", desc: "远程", website: "https://uuyc.163.com/" }
    ]
  }
,
  {
    title: "桌面、效率",
    apps: [
      { icon: "/icons/nanazip.ico", name: "NanaZip", desc: "解压缩", website: "https://nanazip.org/", pan: "https://share.feijipan.com/s/xExo1FtC" },
      { icon: "/icons/hibituninstaller.png", name: "HiBit Uninstaller", desc: "卸载工具", website: "https://hibitsoft.ir/Uninstaller.html", pan: "https://wwanv.lanzoum.com/i8FX73ysrv3c" },
      { icon: "/icons/KeePassXC.svg", name: "KeePassXC", desc: "密码管理", website: "https://github.com/keepassxreboot/keepassxc", pan: "https://wwanv.lanzoum.com/izCoD3xuh98b" },
      { icon: "/icons/Everything.ico", name: "Everything", desc: "", website: "https://www.voidtools.com/", pan: "https://wwanv.lanzoum.com/iS6mK3x807pc" },
      { icon: "/icons/HandBrake.png", name: "HandBrake", desc: "视频格式转码", website: "https://handbrake.fr/downloads.php", pan: "https://wwanv.lanzoum.com/iqlCC3x6scfi" },
      { icon: "/icons/Snipaste.svg", name: "Snipaste", desc: "截图 / 贴图", website: "https://zh.snipaste.com/", pan: "https://wwanv.lanzoum.com/iySFm3x6rohg" },
      { icon: "/icons/Glance.ico", name: "Glance", desc: "截图翻译", website: "https://github.com/Harukaon/Glance", pan: "https://wwanv.lanzoum.com/ivFyp3y7sdde" },
      { icon: "/icons/quickscan.png", name: "QuickScan", desc: "屏幕扫码工具", website: "https://github.com/yoli-mi/quickscan", pan: "https://share.feijipan.com/s/7vzFYZ0m" },
      { icon: "/icons/ContextMenuManager.ico", name: "ContextMenuManager", desc: "右键菜单管理", website: "https://bluepointlilac.github.io/ContextMenuManager/", pan: "https://wwanv.lanzoum.com/ip3Ty3x6rvlc" },
      { icon: "/icons/FastCopy.ico", name: "FastCopy", desc: "快速复制", website: "https://fastcopy.jp/", pan: "https://wwanv.lanzoum.com/imjm83y7s6dc" }

    ]
  }
,
  {
    title: "游戏",
    apps: [
      { icon: "/icons/steam.ico", name: "Steam", desc: "", website: "https://store.steampowered.com/" },
      { icon: "/icons/EpicGames.ico", name: "Epic", desc: "", website: "https://www.epicgames.com/site/home?lang=zh-CN" },
      { icon: "/icons/wegame.png", name: "WeGame", desc: "腾讯", website: "https://www.wegame.com.cn/home/" },
      { icon: "/icons/steamzg.webp", name: "小叽资源", desc: "", website: "https://steamzg.com/" },
      { icon: "/icons/Gamer520.png", name: "Gamer520", desc: "", website: "https://www.gamer520.com/" },
      { icon: "/icons/Steam++.ico", name: "Watt Toolkit", desc: "加速器，原名Steam++", website: "https://steampp.net/" },
      { icon: "/icons/xunyou.ico", name: "迅游加速器", desc: "", website: "https://www.xunyou.com/" },
      { icon: "/icons/uu.png", name: "网易UU加速器", desc: "", website: "https://uu.163.com/" },
      { icon: "/icons/PCL.ico", name: "我的世界启动器 PCL", desc: "要装 Java", website: "https://afdian.com/a/LTCat", pan: "https://wwanv.lanzoum.com/irwAO3x6rncf" },
      { icon: "/icons/java.svg", name: "Java 8", desc: "装 64 位版，别装 32 位", website: "https://www.java.com/zh-CN/download/manual.jsp", pan: "https://wwanv.lanzoum.com/io9vF3x7p0ze" },
      { icon: "/icons/oracle.svg", name: "Java", desc: "", website: "https://www.oracle.com/cn/java/technologies/downloads/" },
      { icon: "/icons/rutracker.ico", name: "RuTracker.org", desc: "俄罗斯资源站", website: "https://rutracker.net/forum/index.php" },
      { icon: "/icons/byrutgame.png", name: "byrutgame.org", desc: "俄罗斯资源站", website: "https://byrutgame.org/" },
      { icon: "/icons/oflogo.png", name: "online-fix", desc: "联机补丁", website: "https://online-fix.me/" }
    ]
  }
,
  {
    title: "媒体、日常",
    apps: [
      { icon: "/icons/mpv.ico", name: "mpv-lazy", desc: "补帧懒人包，hooke007 维护，安装即用", website: "https://github.com/hooke007/mpv_PlayKit", pan: "https://cloud.189.cn/web/share?code=B3MNBvVzueAb（访问码：bb8g）" },
      { icon: "/icons/potplayer.png", name: "Potplayer", desc: "", website: "https://potplayer.tv/", pan: "https://wwi.lanzoui.com/xxxx" },
      { icon: "/icons/MusicPlayer2.png", name: "MusicPlayer2", desc: "众里寻他千百度", website: "https://github.com/zhongyang219/MusicPlayer2", pan: "https://share.feijipan.com/s/lEzFwpBC"  },
      { icon: "/icons/chrome.svg", name: "Chrome", desc: "", website: "https://www.google.cn/chrome/", pan: "https://cloud.189.cn/web/share?code=3QVbQjBzmu2q（访问码：5krq）" },
      { icon: "/icons/helium.png", name: "Helium", desc: "", website: "https://github.com/imputnet/helium", pan: "https://share.feijipan.com/s/buzGTxRA" },
      { icon: "/icons/PDFgear.png", name: "PDFgear", desc: "PDF编辑器", website: "https://www.pdfgear.com/zh/" },
      { icon: "/icons/wps.png", name: "WPS", desc: "", website: "https://www.wps.cn/", pan: "https://share.feijipan.com/s/fizTfgK1"  },
      { icon: "/icons/qq.ico", name: "QQ", desc: "", website: "https://im.qq.com/download" },
      { icon: "/icons/weChat.png", name: "微信", desc: "", website: "https://weixin.qq.com/" }
    ]
  }
,
  {
    title: "系统",
    apps: [
      { icon: "/icons/HEU_KMS_Activator.ico", name: "HEU_KMS_Activator", desc: "dddd", website: "https://github.com/zbezj/HEU_KMS_Activator", pan: "https://wwanv.lanzoum.com/i0F3C48qxa5c" },
      { icon: "/icons/windows10.svg", name: "Win10_KMS_V3", desc: "dddd", pan: "https://wwanv.lanzoum.com/irGk63x7ngve" },
      { icon: "/icons/microsoft-color.svg", name: "微软常用运行库", desc: "", pan: "https://share.feijipan.com/s/A0xoDw2W" },
      { icon: "/icons/DirectXRepair.ico", name: "DirectX_Repair", desc: "dx修复", pan: "https://cloud.189.cn/web/share?code=neayqyQVFFRv（访问码：5fw0）" },
      { icon: "/icons/NET.png", name: ".NET Desktop Runtime", desc: ".NET 桌面运行时", website: "https://dotnet.microsoft.com/zh-cn/download/dotnet", pan: "https://www.alipan.com/s/spCsc745c1o" },
      { icon: "/icons/windows11.svg", name: "Win11Debloat", desc: "win10、11精简", website: "https://github.com/Raphire/Win11Debloat", pan: "https://wwanv.lanzoum.com/iGjab3yfrukf" },
      { icon: "/icons/Dismpp.ico", name: "Dism++", desc: "系统优化", website: "https://www.chuyu.me/zh-Hans/", pan: "https://wwanv.lanzoum.com/iIcgD3x6rhsf" },
      { icon: "/icons/WinDirStat.ico", name: "WinDirStat", desc: "磁盘空间占用", website: "https://github.com/windirstat/windirstat", pan: "https://wwanv.lanzouc.com/iulOw4a2thpi" },
      { icon: "/icons/SuperKillller.png", name: "360系统急救箱", desc: "杀毒", website: "https://weishi.360.cn/jijiuxiang/", pan: "https://share.feijipan.com/s/a5zTfRZX" },
      { icon: "/icons/huorong.svg", name: "火绒恶性木马专杀工具", desc: "杀毒", website: "https://bbs.huorong.cn/thread-18575-1-1.html" , pan :"https://share.feijipan.com/s/VZzTgA0s"},
      { icon: "/icons/xitongku.ico", name: "MSDN", desc: "Windows镜像下载", website: "https://www.xitongku.com/index.html" },
      { icon: "/icons/msdl.ico", name: "MSDL", desc: "Windows镜像下载", website: "https://msdl.gravesoft.dev/#" },
      { icon: "/icons/ventoy.png", name: "Ventoy", desc: "", website: "https://www.ventoy.net/cn/", pan: "https://wwanv.lanzoum.com/iIV8W3x6udpg" },
      { icon: "/icons/wepe.png", name: "微PE工具箱", desc: "", website: "https://www.wepe.com.cn/", pan: "https://cloud.189.cn/web/share?code=N7N7faMjYreu（访问码：q5ee）" },
      { icon: "/icons/ntpwlogo.png", name: "NTPWEdit 0.7", desc: "PE环境使用（系统密码管理）", website: "http://www.cdslow.org.ru/en/ntpwedit/", pan: "https://wwanv.lanzoum.com/iWPy93x6t1tc" }
    ]
  }
]

// 核心：利用 computed 实时过滤数据
const filteredCategories = computed(() => {
  if (!searchQuery.value) return categories
  
  const query = searchQuery.value.toLowerCase()
  
  return categories.map(category => {
    return {
      ...category,
      apps: category.apps.filter(app => 
        app.name.toLowerCase().includes(query) || 
        (app.desc && app.desc.toLowerCase().includes(query))
      )
    }
  }).filter(category => category.apps.length > 0) // 如果该分类下没有匹配的App，直接隐藏该分类
})
</script>

<!-- 搜索框 UI -->
<div class="ak-search-wrapper">
  <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>
  <input 
    v-model="searchQuery" 
    type="text" 
    class="ak-search-input" 
    placeholder="[SEARCH_INPUT] / 查找软件、功能..." 
  />
  <div v-if="searchQuery" class="search-clear" @click="searchQuery = ''">✕</div>
</div>

<div class="category-list">
  <div v-for="(category, index) in filteredCategories" :key="index" class="category-block">
    <h2 :id="category.title">{{ category.title }}</h2>
    <div class="resource-grid">
      <ResourceCard v-for="app in category.apps" :key="app.name" v-bind="app" />
    </div>
  </div>
  
  <!-- 无结果时的空状态 -->
  <div v-if="filteredCategories.length === 0" class="ak-empty-state">
    <div class="empty-code">ERR_404 / NO_DATA</div>
    <p>未检索到匹配项。</p>
  </div>
</div>

<style>
/* --- 搜索框终端风格样式 --- */
.ak-search-wrapper {
  position: relative;
  margin-top: 30px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 0;
  
  /* 默认的底色 */
  background-color: var(--ark-surface); 
  padding: 0 16px;
  height: 48px;
  
  /* 这里的 transition 加上 box-shadow，让线条亮起更顺滑 */
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

/* 聚焦时的处理 */
.ak-search-wrapper:focus-within {
  /* 背景颜色不变，维持面板的实体感，微微提升一点点亮度（可选） */
  /* background-color: var(--ark-surface); */ 
  
  /* 底部亮起 1px 的蓝色扫描线 */
  box-shadow: 0 1px 0 0 var(--ark-accent); 
}

.search-icon {
  color: var(--ark-muted);
  margin-right: 18px; 
  opacity: 0.8;
  transition: color 0.3s ease, transform 0.3s ease;
}

/* 聚焦时，放大镜变蓝并轻微放大 */
.ak-search-wrapper:focus-within .search-icon {
  color: var(--ark-accent);
  opacity: 1;
  transform: scale(1.1); /* 微微放大一点点，像被激活了 */
}

/* 输入框本体：干掉所有浏览器默认样式 */
.ak-search-input {
  flex: 1;
  width: 100%; /* 确保占满 */
  background: transparent;
  
  /* 彻底干掉各种边框和轮廓 */
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  -webkit-appearance: none; /* 干掉 iOS/Safari 的默认圆角和阴影 */
  appearance: none;
  
  color: var(--ark-ink);
  font-family: var(--ak-font-mono);
  font-size: 14px;
  letter-spacing: 1px;
}

/* 针对聚焦状态二次确保 outline 被干掉 */
.ak-search-input:focus,
.ak-search-input:focus-visible {
  outline: none !important;
  box-shadow: none !important;
  border: none !important;
}

/* 输入框默认的占位文字样式 */
.ak-search-input::placeholder {
  color: var(--ark-muted);
  opacity: 0.6;
  transition: opacity 0.2s ease;
}

/* 当输入框被点击/激活时，让提示文字瞬间消失 */
.ak-search-input:focus::placeholder {
  opacity: 0; 
}

/* 清除按钮 */
.search-clear {
  color: var(--ark-muted);
  cursor: pointer;
  padding: 4px;
  font-size: 12px;
  transition: color 0.2s;
}
.search-clear:hover {
  color: var(--ark-accent);
}

/* --- 空状态样式 --- */
.ak-empty-state {
  text-align: center;
  padding: 60px 0;
  color: var(--ark-muted);
}
.empty-code {
  font-family: var(--ak-font-mono);
  color: var(--ark-accent);
  font-size: 18px;
  letter-spacing: 2px;
  margin-bottom: 12px;
}

/* --- 分类与卡片网格（保留你之前的） --- */
.resource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

h2 {
  border-top: none !important;
  padding-top: 0 !important;
  margin-top: 40px !important;
  margin-bottom: 12px !important;
}

.category-block:first-child h2 {
  margin-top: 0 !important;
}

.category-block h2 {
  /* 清除原本的主题默认边框和间距 */
  border-top: none !important;
  border-bottom: none !important;
  padding-top: 0 !important;
  margin-top: 40px !important;
  margin-bottom: 20px !important; /* 稍微加大底距 */
  
  font-family: var(--ark-font) !important;
  font-weight: 700;
  font-size: 22px;
  color: var(--ark-ink);

  /* 变成 Flex 容器 */
  display: flex;
  align-items: center;
}

/* 利用伪元素生成右侧的延伸线 */
.category-block h2::after {
  content: '';
  flex: 1; /* 自动填满剩下的所有宽度 */
  height: 1px;
  background-color: var(--ark-line);
  margin-left: 16px; /* 和文字拉开距离 */
  
  /* 如果你喜欢虚线，可以换成 border-top: 1px dashed var(--ark-line); */
}

@media (max-width: 768px) {
  h2 {
    margin-top: 30px !important;
    margin-bottom: 10px !important;
  }
  .category-block:first-child h2 {
    margin-top: 0 !important;
  }
}
</style>
