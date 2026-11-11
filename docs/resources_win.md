<script setup>
const categories = [
  {
    title: "硬件",
    apps: [
      { icon: "/icons/nvidia.svg", name: "NVIDIA", desc: "", website: "https://www.nvidia.cn/drivers/" },
      { icon: "/icons/amd.svg", name: "AMD", desc: "", website: "https://www.amd.com/zh-cn/support/download/drivers.html" },
      { icon: "/icons/ddu.png", name: "DDU", desc: "卸显卡驱动", website: "https://www.wagnardsoft.com/", pan: "https://wwanv.lanzoum.com/iNq3D3x7nbad" },
      { icon: "/icons/cpuz.ico", name: "CPU-Z", desc: "", website: "https://www.cpuid.com/softwares/cpu-z.html", pan: "https://wwanv.lanzoum.com/i6ecK3x7yj3a" },
      { icon: "/icons/GPU-Z.ico", name: "GPU-Z", desc: "", website: "https://www.techpowerup.com/download/techpowerup-gpu-z/", pan: "https://wwanv.lanzoum.com/iyjPs3x7ykud" },
      { icon: "/icons/aida64.ico", name: "AIDA64", desc: "压力测试", website: "https://www.aida64.com/downloads" },
      { icon: "/icons/hwinfo.png", name: "HWiNFO", desc: "硬件温度", website: "https://www.hwinfo.com/", pan: "https://wwanv.lanzoum.com/iTpb53x6ri5i" },
      { icon: "/icons/crystalmark.ico", name: "CrystalDiskInfo", desc: "硬盘健康", website: "https://crystalmark.info/en/", pan: "https://wwanv.lanzoum.com/iqPP23x6sspe" },
      { icon: "/icons/ATIWinFlash.ico", name: "ATIWinFlash", desc: "580 刷 BIOS", website: "http://www.smxdiy.com/thread-1079-1-1.html", pan: "https://share.feijipan.com/s/ioyuB1ug" },
      { icon: "/icons/MSIAfterburner.ico", name: "微星小飞机", desc: "", website: "https://www.msi.com/Landing/afterburner/graphics-cards" },
      { icon: "/icons/tbtool.ico", name: "图吧工具箱", desc: "懒人包", website: "https://www.tbtool.cn/", pan: "https://cloud.189.cn/web/share?code=i2auqeEBJjM3（访问码：yej5）" },
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
      { icon: "/icons/radminvpn.png", name: "Radmin VPN", desc: "远程", website: "https://www.radmin-lan.cn/", pan: "https://share.feijipan.com/s/trxocp88" },
      { icon: "/icons/natpierce.ico", name: "皎月连", desc: "p2p内网穿透", website: "https://www.natpierce.cn/" },
      { icon: "/icons/SubnetDesk.ico", name: "SubnetDesk", desc: "搭配p2p实现远程桌面", website: "https://github.com/zibo-chen/SubnetDesk", pan: "https://wwanv.lanzouc.com/iDHGL4a2n2jg" },
      { icon: "/icons/uuyc.ico", name: "网易UU远程", desc: "远程", website: "https://uuyc.163.com/" }
    ]
  }
,
  {
    title: "桌面、效率",
    apps: [
      { icon: "/icons/KeePassXC.svg", name: "KeePassXC", desc: "密码管理", website: "https://github.com/keepassxreboot/keepassxc", pan: "https://wwanv.lanzoum.com/izCoD3xuh98b" },
      { icon: "/icons/FastCopy.ico", name: "FastCopy", desc: "快速复制/备份", website: "https://fastcopy.jp/", pan: "https://wwanv.lanzoum.com/imjm83y7s6dc" },
      { icon: "/icons/ContextMenuManager.ico", name: "ContextMenuManager", desc: "右键菜单管理", website: "https://bluepointlilac.github.io/ContextMenuManager/", pan: "https://wwanv.lanzoum.com/ip3Ty3x6rvlc" },
      { icon: "/icons/Everything.ico", name: "Everything", desc: "", website: "https://www.voidtools.com/", pan: "https://wwanv.lanzoum.com/iS6mK3x807pc" },
      { icon: "/icons/HandBrake.png", name: "HandBrake", desc: "视频格式转码", website: "https://handbrake.fr/downloads.php", pan: "https://wwanv.lanzoum.com/iqlCC3x6scfi" },
      { icon: "/icons/Snipaste.svg", name: "Snipaste", desc: "截图贴屏", website: "https://zh.snipaste.com/", pan: "https://wwanv.lanzoum.com/iySFm3x6rohg" },
      { icon: "/icons/Glance.ico", name: "Glance", desc: "截图翻译", website: "https://github.com/Harukaon/Glance", pan: "https://wwanv.lanzoum.com/ivFyp3y7sdde" }
    ]
  }
,
  {
    title: "游戏",
    apps: [
      { icon: "/icons/steam.ico", name: "Steam", desc: "", website: "https://store.steampowered.com/" },
      { icon: "/icons/EpicGames.ico", name: "Epic", desc: "", website: "https://www.epicgames.com/site/home?lang=zh-CN" },
      { icon: "/icons/wegame.ico", name: "WeGame", desc: "腾讯", website: "https://www.wegame.com.cn/home/" },
      { icon: "/icons/steamzg.webp", name: "小叽资源", desc: "", website: "https://steamzg.com/" },
      { icon: "/icons/Gamer520.png", name: "Gamer520", desc: "", website: "https://www.gamer520.com/" },
      { icon: "/icons/Steam++.ico", name: "Watt Toolkit", desc: "加速器，原名Steam++", website: "https://steampp.net/" },
      { icon: "/icons/xunyou.ico", name: "迅游加速器", desc: "", website: "https://www.xunyou.com/" },
      { icon: "/icons/uu.ico", name: "网易UU加速器", desc: "", website: "https://uu.163.com/" },
      { icon: "/icons/PCL.ico", name: "我的世界启动器 PCL", desc: "要装 Java", website: "https://afdian.com/a/LTCat", pan: "https://wwanv.lanzoum.com/irwAO3x6rncf" },
      { icon: "/icons/java.png", name: "Java 8", desc: "装 64 位版，别装 32 位", website: "https://www.java.com/zh-CN/download/manual.jsp", pan: "https://wwanv.lanzoum.com/io9vF3x7p0ze" },
      { icon: "/icons/oracle.png", name: "Java", desc: "", website: "https://www.oracle.com/cn/java/technologies/downloads/" },
      { icon: "/icons/rutracker.ico", name: "RuTracker.org", desc: "俄罗斯资源站", website: "https://rutracker.net/forum/index.php" },
      { icon: "/icons/byrutgame.png", name: "byrutgame.org", desc: "俄罗斯资源站，汉化资源多", website: "https://byrutgame.org/" },
      { icon: "/icons/oflogo.png", name: "online-fix", desc: "联机补丁", website: "https://online-fix.me/" }
    ]
  }
,
  {
    title: "媒体",
    apps: [
      { icon: "/icons/mpv.ico", name: "mpv-lazy", desc: "补帧懒人包，hooke007 维护，安装即用", website: "https://github.com/hooke007/mpv_PlayKit", pan: "https://cloud.189.cn/web/share?code=B3MNBvVzueAb（访问码：bb8g）" },
      { icon: "/icons/potplayer.png", name: "Potplayer", desc: "", website: "https://potplayer.tv/", pan: "https://wwi.lanzoui.com/xxxx" },
      { icon: "/icons/chrome.svg", name: "Chrome", desc: "", website: "https://www.google.cn/chrome/", pan: "https://cloud.189.cn/web/share?code=3QVbQjBzmu2q（访问码：5krq）" },
      { icon: "/icons/vivaldi.png", name: "Vivaldi", desc: "", website: "https://vivaldi.com/zh-hans/download/", pan: "https://share.feijipan.com/s/QYyu3cC7" },
      { icon: "/icons/PDFgear.png", name: "PDFgear", desc: "PDF编辑器", website: "https://www.pdfgear.com/zh/" },
      { icon: "/icons/qq.ico", name: "QQ", desc: "", website: "https://im.qq.com/download" },
      { icon: "/icons/weixin.png", name: "微信", desc: "", website: "https://weixin.qq.com/" }
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
      { icon: "/icons/windows11.svg", name: "Win11Debloat", desc: "win10、11快速精简", website: "https://github.com/Raphire/Win11Debloat", pan: "https://wwanv.lanzoum.com/iGjab3yfrukf" },
      { icon: "/icons/nanazip.ico", name: "NanaZip", desc: "", website: "https://nanazip.org/", pan: "https://share.feijipan.com/s/xExo1FtC" },
      { icon: "/icons/Dism++.ico", name: "Dism++", desc: "系统优化", website: "https://www.chuyu.me/zh-Hans/", pan: "https://wwanv.lanzoum.com/iIcgD3x6rhsf" },
      { icon: "/icons/hibituninstaller.png", name: "HiBit Uninstaller", desc: "卸载工具", website: "https://hibitsoft.ir/Uninstaller.html", pan: "https://wwanv.lanzoum.com/i8FX73ysrv3c" },
      { icon: "/icons/WinDirStat.ico", name: "WinDirStat", desc: "磁盘空间占用", website: "https://github.com/windirstat/windirstat", pan: "https://wwanv.lanzouc.com/iulOw4a2thpi" },
      { icon: "/icons/ntpwlogo.png", name: "NTPWEdit 0.7", desc: "系统密码管理", website: "http://www.cdslow.org.ru/en/ntpwedit/", pan: "https://wwanv.lanzoum.com/iWPy93x6t1tc" },
      { icon: "/icons/xitongku.ico", name: "MSDN", desc: "Windows镜像下载", website: "https://www.xitongku.com/index.html" },
      { icon: "/icons/msdl.ico", name: "MSDL", desc: "Windows镜像下载", website: "https://msdl.gravesoft.dev/#" },
      { icon: "/icons/ventoy.png", name: "Ventoy", desc: "", website: "https://www.ventoy.net/cn/", pan: "https://wwanv.lanzoum.com/iIV8W3x6udpg" },
      { icon: "/icons/wepe.png", name: "微PE工具箱", desc: "", website: "https://www.wepe.com.cn/", pan: "https://cloud.189.cn/web/share?code=N7N7faMjYreu（访问码：q5ee）" }
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
