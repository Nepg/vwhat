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
  
  /* 📱 移动端与桌面端自适应的关键 */
  font-size: clamp(60px, 15vw, 100px) !important;
  line-height: 1 !important;
}

/* 2. 准备就绪状态 */
.VPHero .text.is-ready {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* 3. 桌面端样式 */
@media (min-width: 768px) {
  .VPHero .text {
    font-size: 100px !important; 
  }
  
  /* 由 JS 添加该类，触发悬浮放大 */
  .VPHero .text.is-ready.is-hovered {
    transform: translateY(0) scale(1.2) rotate(15deg);
  }
}
</style>

<script setup>
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

const emojis = ['🤔','👻','💩','🐶','🍊','🕯️','⛏️','🍔','🥵','🍉','🙏','🥚','🚜','🪦','🌏','☃️','💣','🪴','🐔','📦','💡','🐳','🙂','🛵','🛖','🤖','💧','🌳','🌻','🐙', '🍅','👽','😯','🐮', '😎','🦕','🧑‍🦽‍➡️','🚀', '🧐', '😶‍🌫️','🐐', '🌽','🧑‍🌾','🛌', '🍳','🧙‍♂️','🍋', '🍗','🫠','🎁','🐟', '🗿', '🎂','🕗','🐾','👾', '🤡','🐱']

let hoverTimer = null

// 绑定带防抖的 hover 事件
const bindHoverEvents = (el) => {
  // 防止 VitePress 水合导致重复绑定
  if (el.dataset.hasHover) return
  el.dataset.hasHover = 'true'

  el.addEventListener('mouseenter', () => {
    // 清除之前的定时器
    clearTimeout(hoverTimer)
    // 鼠标悬停超过 500ms 才触发动画（消抖）
    hoverTimer = setTimeout(() => {
      el.classList.add('is-hovered')
    }, 500)
  })

  el.addEventListener('mouseleave', () => {
    // 鼠标移开时，立刻清除定时器并移除放大状态
    clearTimeout(hoverTimer)
    el.classList.remove('is-hovered')
  })
}

const randomizeEmoji = () => {
  nextTick(() => {
    setTimeout(() => {
      const el = document.querySelector('.VPHero .text')
      if (el) {
        // 移除 ready 状态和 hover 状态
        el.classList.remove('is-ready')
        el.classList.remove('is-hovered')
        
        // 随机替换内容
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)]
        
        // 绑定防抖 hover 事件
        bindHoverEvents(el)
        
        requestAnimationFrame(() => {
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
