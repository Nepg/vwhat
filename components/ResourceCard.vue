<script setup>
import { withBase } from 'valaxy'

defineProps({
  icon: { type: String, required: true },
  name: { type: String, required: true },
  desc: { type: String, default: '' },
  website: { type: String, default: '' },
  pan: { type: String, default: '' },
})
</script>

<template>
  <div class="resource-card">
    <!-- 1. 桌面端视图 -->
    <div class="desktop-view">
      <div class="card-main">
        <img :src="withBase(icon)" :alt="name">
        <div class="card-text">
          <div
            class="card-title"
            :class="{
              'title-short': name.length <= 8,
              'title-medium': name.length > 8 && name.length <= 12,
              'title-long': name.length > 12,
            }"
          >
            {{ name }}
          </div>
          <div v-if="desc" class="card-desc">
            {{ desc }}
          </div>
        </div>
      </div>

      <div class="card-actions">
        <a v-if="website" :href="website" target="_blank" class="action-btn">
          <span>官网</span>
          <span class="btn-index">01</span> <!-- 加入序号 -->
        </a>
        <a v-if="pan" :href="pan" target="_blank" class="action-btn">
          <span>网盘</span>
          <span class="btn-index">02</span> <!-- 加入序号 -->
        </a>
      </div>
    </div>

    <!-- 2. 移动端视图  -->
    <div class="mobile-view">
      <!-- 左侧大热区 -->
      <a :href="website || pan" target="_blank" class="mobile-main">
        <div class="mobile-main-content">
          <img class="app-logo" :src="withBase(icon)" :alt="name">
          <div class="card-text">
            <div
              class="card-title"
              :title="name"
              :class="{
                'title-short': name.length <= 8,
                'title-medium': name.length > 8 && name.length <= 12,
                'title-long': name.length > 12,
              }"
            >
              {{ name }}
            </div>
            <div v-if="desc" class="card-desc">{{ desc }}</div>
          </div>
        </div>

        <!-- 恢复为原本的纯文本提示，不嵌套 a 标签 -->
        <div class="mobile-hints">
          <span v-if="website" class="hint-text">官网</span>
          <span v-if="!website && pan" class="hint-text">网盘</span>
        </div>
      </a>

      <!-- 独立网盘按钮 -->
      <a
        v-if="website && pan"
        :href="pan"
        target="_blank"
        class="mobile-pan-btn"
      >
        网盘
      </a>
    </div>
  </div>
</template>

<style scoped>

@keyframes akEnter {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 文本排版降噪 */
.card-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1); /* 增加位移过渡 */
}
.card-title {
  font-family: var(--ark-display); 
  font-weight: 700;
  color: var(--ark-ink);
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 17px; 
  letter-spacing: 0.5px;
}
html.dark .card-title {
  color: var(--ak-text-primary);
  text-shadow: 0 0 1px var(--ak-text-primary); 
}
.card-desc {
  font-family: var(--ark-font); 
  font-size: 12px;
  font-weight: 400;
  color: var(--ark-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0.5px;
}

/* =========================================
   卡片本体
   ========================================= */
.resource-card {
  animation: akEnter 0.4s cubic-bezier(0.25, 1, 0.5, 1) both;
  position: relative;
  height: 90px;
  border: none;
  background-color: transparent; 
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  overflow: hidden;
}

.resource-card:hover {
  transform: translateY(-2px); 
}

/* 背景光晕 */
.resource-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background-color: var(--ark-surface); 
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 0;
  border-radius: 4px;
}
.resource-card:hover::after { 
  opacity: 0.4; 
}
html.dark .resource-card:hover::after { 
  opacity: 0.15; 
}

/* 将左上角标绑定在最外层 */
.resource-card::before {
  content: '';
  position: absolute;
  top: 12px;
  left: 12px;
  width: 8px;
  height: 8px;
  border-top: 1.5px solid var(--ark-accent);
  border-left: 1.5px solid var(--ark-accent);
  opacity: 0;
  transform: translate(4px, 4px) scale(0.8);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 3;
  pointer-events: none;
}


.resource-card:hover::before{
  opacity: 1;
  transform: translate(0, 0) scale(1);
}

.desktop-view {
  position: absolute;
  inset: 0;
  z-index: 1;
}

/* 隐藏内容层 */
.card-main {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  padding: 0 20px;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}
.card-main img {
  width: 44px;
  height: 44px;
  margin-right: 16px;
  object-fit: contain;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

/* 新增：Hover 时主内容向左微移、渐隐，图标微缩 */
.resource-card:hover .card-main {
  opacity: 0;
  pointer-events: none;
  transform: translateX(-10px); 
}
.resource-card:hover .card-main img {
  transform: scale(0.9);
}

/* 核心改动：操作面板的动画 */
.card-actions {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: stretch;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  z-index: 2;
}

.resource-card:hover .card-actions {
  opacity: 1;
  pointer-events: auto;
}

/* 操作按钮 */
.action-btn {
  font-family: var(--ark-font); 
  flex: 1;
  display: flex;
  flex-direction: row; /* 改回横向排列 */
  align-items: center;
  justify-content: center; 
  gap: 8px; /* 文字和数字之间留一点间距 */
  height: 100%;
  text-decoration: none !important;
  color: var(--ark-muted) !important;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 1px;
  transition: all 0.2s cubic-bezier(0.25, 1, 0.5, 1);
  position: relative;
  transform: translateY(16px);
}
.resource-card:hover .action-btn {
  transform: translateY(0);
}

/* 按钮分割线 */
.action-btn + .action-btn::before {
  content: '';
  position: absolute;
  left: 0;
  top: 40%;
  bottom: 40%;
  width: 1px;
  background-color: var(--ark-line);
  transition: all 0.3s ease;
}

.action-btn:hover {
  background-color: transparent; 
  color: var(--ark-accent) !important; 
}

/* 细节：Hover 按钮时，分割线向两端拉长 */
.action-btn:hover + .action-btn::before,
.action-btn:hover::before {
  top: 20%;
  bottom: 20%;
}

/* 序号排版优化 */
.action-btn .btn-index {
  font-family: var(--ak-font-mono); 
  font-size: 10px; /* 稍微改大一丁点，更有质感 */
  color: var(--ak-text-secondary);
  opacity: 0.4;
  transition: all 0.3s ease;
}

.action-btn:hover .btn-index {
  color: var(--ark-accent);
  opacity: 1;
  transform: translateY(0);
}

/* =========================================
   移动端视图
   ========================================= */
.mobile-view {
  display: none;
}
/* =========================================
   移动端：保留当前结构，注入 Ark 灵魂
   ========================================= */
@media (max-width: 768px) {
  .desktop-view {
    display: none;
  }
  .resource-card a {
    text-decoration: none;
  }
  /* 1. 物理切断 Hover 干扰 */
  .resource-card:hover {
    transform: none;
  }
  .resource-card:hover::before, 
  .resource-card:hover::after {
    opacity: 0;
  }
  .resource-card:hover .card-main {
    opacity: 1; /* 强制保持主内容可见 */
    pointer-events: auto;
  }
  .resource-card:hover .card-actions {
    display: none; /* 彻底关闭悬浮面板在移动端的触发 */
  }

  .resource-card {
    height: 76px; /* 稍微加高一点 */
    background-color: transparent;
    border: none;
    border-bottom: 1px solid var(--ark-line); /* 保持底部分割线 */
    border-radius: 0;
    animation: none; /* 移动端不需要入场动画 */
  }

  .mobile-view {
    display: flex;
    align-items: stretch;
    width: 100%;
    height: 100%;
    padding: 0;
  }

  .mobile-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    height: 100%;
    overflow: hidden;
    padding-left: 8px; 
  }

  .mobile-main-content {
    display: flex;
    align-items: center;
    overflow: hidden;
    gap: 12px;
  }

  .mobile-main-content img {
    width: 36px;
    height: 36px;
    object-fit: contain;
    flex-shrink: 0;
  }
  
  /* 2. Ark 字体 */
  .card-title {
    font-family: var(--ark-display) ; /* 标题用粗衬线体 */
    font-size: 16px !important;
    font-weight: 700 !important;
    letter-spacing: 0.5px;
    margin-bottom: 2px;
  }
  html.dark .card-title {
    text-shadow: 0 0 1px var(--ak-text-primary);
  }

  .card-desc {
    font-family: var(--ak-font-mono); /* 描述用等宽字体，极客感 */
    font-size: 11px !important;
    letter-spacing: 0px;
    color: var(--ark-muted);
    opacity: 0.8;
  }

  .mobile-hints {
    display: flex;
    align-items: stretch;
    flex-shrink: 0;
    height: 100%;
  }

  .hint-text {
    font-family: var(--ark-font) !important; /* 提示文字用无衬线 */
    color: var(--ark-muted) !important;
    font-size: 13px;
    font-weight: 500;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 16px;
  }

  /* 独立网盘按钮 */
  .mobile-pan-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    color: var(--ark-accent) !important;
    font-family: var(--ark-font) !important;
    font-weight: 600;
    font-size: 13px;
    height: 100% !important;
    padding: 0 16px;
    text-decoration: none !important;
    flex-shrink: 0;
    position: relative;
  }
  
  /* 竖线分割保留，但高度缩短，更有呼吸感 */
  .mobile-pan-btn::before {
    content: '';
    position: absolute;
    left: 0;
    top: 35%;
    bottom: 35%;
    width: 1px;
    background-color: var(--ark-line);
  }
}

@media (prefers-reduced-motion: reduce) {
  .resource-card { animation: none; }
}
</style>