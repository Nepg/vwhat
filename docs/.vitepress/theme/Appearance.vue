<!-- .vitepress/theme/Appearance.vue -->
<script setup>
import { useData } from "vitepress";

// 1. 从 useData 中获取全局的 isDark 响应式变量
const { isDark } = useData();

// 2. 注入 VitePress 内部提供的 'toggle-appearance' 函数
// 如果注入失败，则提供一个回退函数，直接修改 isDark 的值
const toggleAppearance = inject("toggle-appearance", () => {
  isDark.value = !isDark.value;
});
</script>

<template>
  <button
    class="VPSwitchAppearance"
    type="button"
    role="switch"
    :title="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    :aria-checked="isDark"
    @click="toggleAppearance"
  >
    <!-- 在这里放入你的自定义 SVG 图标 -->
    <span v-if="!isDark" class="custom-icon sun">
      <!-- 例如：一个太阳图标 -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M10 7C10 10.866 13.134 14 17 14C18.9584 14 20.729 13.1957 21.9995 11.8995C22 11.933 22 11.9665 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.0335 2 12.067 2 12.1005 2.00049C10.8043 3.27098 10 5.04157 10 7ZM4 12C4 16.4183 7.58172 20 12 20C15.0583 20 17.7158 18.2839 19.062 15.7621C18.3945 15.9187 17.7035 16 17 16C12.0294 16 8 11.9706 8 7C8 6.29648 8.08133 5.60547 8.2379 4.938C5.71611 6.28423 4 8.9417 4 12Z"
        ></path>
      </svg>
    </span>
    <span v-else class="custom-icon moon">
      <!-- 例如：一个月亮图标 -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M10 7C10 10.866 13.134 14 17 14C18.9584 14 20.729 13.1957 21.9995 11.8995C22 11.933 22 11.9665 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.0335 2 12.067 2 12.1005 2.00049C10.8043 3.27098 10 5.04157 10 7ZM4 12C4 16.4183 7.58172 20 12 20C15.0583 20 17.7158 18.2839 19.062 15.7621C18.3945 15.9187 17.7035 16 17 16C12.0294 16 8 11.9706 8 7C8 6.29648 8.08133 5.60547 8.2379 4.938C5.71611 6.28423 4 8.9417 4 12Z"
        ></path>
      </svg>
    </span>
  </button>
</template>

<style scoped>
/* 如果需要，可以在这里调整按钮样式 */
</style>
