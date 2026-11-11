<template>
  <div class="resource-card">
    <!-- ========================================== -->
    <!-- 1. 桌面端视图 (悬浮翻转) -->
    <!-- ========================================== -->
    <div class="desktop-view">
      <div class="card-main">
        <img :src="withBase(icon)" :alt="name" />
        <div class="card-text">
          <div class="card-title">{{ name }}</div>
          <div class="card-desc" v-if="desc">{{ desc }}</div>
        </div>
      </div>

      <div class="card-actions">
        <a v-if="website" :href="website" target="_blank" class="action-btn">
          <span class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 22 22"
              width="22"
              height="22"
              fill="currentColor"
            >
              <path
                d="M13.0607 8.11097L14.4749 9.52518C17.2086 12.2589 17.2086 16.691 14.4749 19.4247L14.1214 19.7782C11.3877 22.5119 6.95555 22.5119 4.22188 19.7782C1.48821 17.0446 1.48821 12.6124 4.22188 9.87874L5.6361 11.293C3.68348 13.2456 3.68348 16.4114 5.6361 18.364C7.58872 20.3166 10.7545 20.3166 12.7072 18.364L13.0607 18.0105C15.0133 16.0578 15.0133 12.892 13.0607 10.9394L11.6465 9.52518L13.0607 8.11097ZM19.7782 14.1214L18.364 12.7072C20.3166 10.7545 20.3166 7.58872 18.364 5.6361C16.4114 3.68348 13.2456 3.68348 11.293 5.6361L10.9394 5.98965C8.98678 7.94227 8.98678 11.1081 10.9394 13.0607L12.3536 14.4749L10.9394 15.8891L9.52518 14.4749C6.79151 11.7413 6.79151 7.30911 9.52518 4.57544L9.87874 4.22188C12.6124 1.48821 17.0446 1.48821 19.7782 4.22188C22.5119 6.95555 22.5119 11.3877 19.7782 14.1214Z"
              ></path>
            </svg>
          </span>
          官网
        </a>
        <div class="action-divider" v-if="website && pan"></div>
        <a v-if="pan" :href="pan" target="_blank" class="action-btn">
          <span class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 22 22"
              width="22"
              height="22"
              fill="currentColor"
            >
              <path
                d="M1 14.5C1 12.1716 2.22429 10.1291 4.06426 8.9812C4.56469 5.044 7.92686 2 12 2C16.0731 2 19.4353 5.044 19.9357 8.9812C21.7757 10.1291 23 12.1716 23 14.5C23 17.9216 20.3562 20.7257 17 20.9811L7 21C3.64378 20.7257 1 17.9216 1 14.5ZM16.8483 18.9868C19.1817 18.8093 21 16.8561 21 14.5C21 12.927 20.1884 11.4962 18.8771 10.6781L18.0714 10.1754L17.9517 9.23338C17.5735 6.25803 15.0288 4 12 4C8.97116 4 6.42647 6.25803 6.0483 9.23338L5.92856 10.1754L5.12288 10.6781C3.81156 11.4962 3 12.927 3 14.5C3 16.8561 4.81833 18.8093 7.1517 18.9868L7.325 19H16.675L16.8483 18.9868ZM13 12H16L12 17L8 12H11V8H13V12Z"
              ></path>
            </svg>
          </span>
          网盘
        </a>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- 2. 移动端视图 (左侧大热区，右侧提示/独立按钮) -->
    <!-- ========================================== -->
    <div class="mobile-view">
      <!-- 左侧大热区 -->
      <a :href="website || pan" target="_blank" class="mobile-main">
        <div class="mobile-main-content">
          <img class="app-logo" :src="withBase(icon)" :alt="name" />
          <div class="card-text">
            <div class="card-title">{{ name }}</div>
            <div class="card-desc" v-if="desc">{{ desc }}</div>
          </div>
        </div>

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

<script setup>
import { withBase } from "vitepress";

defineProps({
  icon: { type: String, required: true },
  name: { type: String, required: true },
  desc: { type: String, default: "" },
  website: { type: String, default: "" },
  pan: { type: String, default: "" },
});
</script>

<style scoped>
/* ==========================================
   公共基础样式
   ========================================== */
.card-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}
.card-title {
  font-weight: 600;
  font-size: 16px;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ==========================================
   桌面端样式 (默认)
   ========================================== */
.resource-card {
  position: relative;
  height: 90px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  overflow: hidden;
  transition:
    border-color 0.25s,
    box-shadow 0.25s;
}
.resource-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
.desktop-view {
  position: absolute;
  inset: 0;
}
.card-main {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  padding: 0 20px;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.card-main img {
  width: 48px;
  height: 48px;
  margin-right: 16px;
  border-radius: 8px;
  object-fit: contain;
}
.card-actions {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--vp-c-bg-soft);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
.resource-card:hover .card-main {
  opacity: 0;
  transform: scale(0.95);
}
.resource-card:hover .card-actions {
  opacity: 1;
  pointer-events: auto;
}
.action-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-decoration: none !important;

  /* 1. 默认状态下，文字和图标是普通的灰色 */
  color: var(--vp-c-text-2) !important;
  font-weight: 500;
  font-size: 14px;

  /* 2. 加上 color 的过渡动画，让变色更顺滑 */
  transition:
    background-color 0.2s,
    color 0.2s;
}

.action-btn:hover {
  background-color: var(--vp-c-default-soft);

  /* 3. 只有在悬浮当前这半边时，才变成品牌色 */
  color: var(--vp-c-brand-1) !important;
}
.action-btn .icon {
  font-size: 20px;
  margin-bottom: 8px;
}
.action-divider {
  width: 1px;
  height: 40px;
  background-color: var(--vp-c-divider);
}

/* 默认隐藏移动端视图 */
.mobile-view {
  display: none;
}

/* ==========================================
   移动端样式 (无边框紧凑列表版)
   ========================================== */
@media (max-width: 768px) {
  .desktop-view {
    display: none;
  }
  .app-logo {
    margin-left: 10px;
  }

  /* 1. 干掉卡片圆角、边框、背景，变成列表项 */
  .resource-card {
    height: 64px;
    background-color: transparent;
    border: 0;
    /* border-top: 1px solid var(--vp-c-divider); */
    border-bottom: 1px solid var(--vp-c-divider);
    border-radius: 0;
    box-shadow: none;
  }
  .resource-card:last-child {
    border-bottom: none !important;
  }

  /* 2. 显示并重置布局 */
  .mobile-view {
    display: flex;
    align-items: stretch;
    width: 100%;
    height: 100%;
    padding: 0; /* 左右留点空隙 */
    /* padding-left: 16px;  */
  }

  .mobile-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    height: 100%;
    overflow: hidden;
    text-decoration: none !important;
    color: inherit !important;
  }

  .mobile-main-content {
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .mobile-main-content img {
    width: 32px;
    height: 32px;
    margin-right: 10px;
    border-radius: 6px;
    object-fit: contain;
    flex-shrink: 0;
  }

  .card-title {
    font-size: 15px;
    margin-bottom: 2px;
  }
  .card-desc {
    font-size: 12px;
  }

  /* 右侧纯文字提示容器 */
  .mobile-hints {
    display: flex;
    align-items: stretch; /* 关键：让子元素撑满高度 */
    flex-shrink: 0;
    height: 100%;
  }

  /* 纯文字提示本体 */
  .hint-text {
    color: var(--vp-c-text-2) !important;
    font-size: 13px;
    font-weight: 500;

    /* 核心魔法：让 span 变成 flex 块并撑满高度 */
    display: flex;
    align-items: center;
    height: 100%;

    /* 加上和网盘按钮一样的左右 padding */
    padding: 0 19px;
    box-sizing: border-box;
  }

  /* 3. 独立网盘按钮变方、撑满高度 */
  .mobile-pan-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--vp-c-default-soft);
    color: var(--vp-c-brand-1) !important;
    font-weight: 600;
    font-size: 13px;
    height: 100% !important;
    border-radius: 0 !important; /* 直角 */
    padding: 0 19px;
    text-decoration: none !important;
    flex-shrink: 0;
  }
}
</style>
