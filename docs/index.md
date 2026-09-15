---
layout: home

hero:
  text: '🤔'
  tagline:
  actions: []

features:
  - title: Windows 软件整理
    details: _
    link: /resources_win
  - title: Android 软件整理
    details: _
    link: /resources_android
---

##

- [方舟模组清理](/ARK_Mods_Clean)
- [制作 UE4 数值修改模组（HumanitZ）](/UE4_Mod_ValueDev)

<details>
<summary><strong>无关紧要</strong>（点击展开）</summary>

- [LocalSend在麒麟V10无法启动解决办法](/LocalSend在麒麟V10无法启动解决办法)
- [麒麟V10软件商店企业微信wine版无法打开](/麒麟V10软件商店企业微信wine版无法打开)
- [CrossOver创建容器命令](/CrossOver创建容器命令)
- [UOSLiveCD环境安装衍星LiveCD工具](/UOSLiveCD环境安装衍星LiveCD工具)
- [衍星LiveCD工具提取](/衍星LiveCD工具提取)
- [国产操作系统打印机正常连接但无法打印](/国产操作系统打印机正常连接但无法打印)
- [银河麒麟桌面V10提示系统操作受限](/银河麒麟桌面V10提示系统操作受限)

</details>

<style>
/* 1. 初始状态：隐藏且稍微下沉 */
.VPHero .text {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
  /* 使用平滑的贝塞尔曲线让出场更有弹性 */
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), 
              transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
  display: inline-block;
  will-change: opacity, transform;
  
  /* 📱 移动端与桌面端自适应的关键：clamp(最小值, 视口宽度比例, 最大值) */
  font-size: clamp(60px, 15vw, 100px) !important;
  line-height: 1 !important;
}

/* 2. 准备就绪状态：显示并复位 */
.VPHero .text.is-ready {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* 3. 针对较大屏幕（平板、桌面）单独微调 */
@media (min-width: 768px) {
  .VPHero .text {
    font-size: 100px !important; 
  }
  
  /* 只有桌面端才开启鼠标悬浮效果 */
  .VPHero .text.is-ready:hover {
    transform: rotate(15deg) scale(1.2);
  }
}
</style>

<script setup>
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

const emojis = ['🤔','💩','🍔','🍉','☃️', '🐔','🙂','🛵','🤖','💧','🌻', '👽','😯','🐮', '😎','🦖', '🚀', '🧐', '😶‍🌫️', '🌽','🧑‍🌾','🛌', '🧙‍♂️','🍋', '🍗','🫠','🐟', '🗿', '🕗','🐾','👾', '🤡','🐱']

const randomizeEmoji = () => {
  nextTick(() => {
    // 稍微延迟一点点，确保 DOM 已经渲染
    setTimeout(() => {
      const el = document.querySelector('.VPHero .text')
      if (el) {
        // 移除 ready 状态，让其变回隐藏
        el.classList.remove('is-ready')
        
        // 随机替换内容
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)]
        
        // 使用 requestAnimationFrame 确保浏览器完成了一次重绘后再显示，让动画生效
        requestAnimationFrame(() => {
          // 稍微加一个小延迟，防止移除和添加类名在同一帧导致动画失效
          setTimeout(() => {
            el.classList.add('is-ready')
          }, 100)
        })
      }
    }, 100)
  })
}

onMounted(() => {
  randomizeEmoji()
})

watch(
  () => route.path,
  (newPath) => {
    if (newPath === '/') {
      randomizeEmoji()
    }
  }
)
</script>
