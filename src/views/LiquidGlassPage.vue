<template>
  <div class="page-container">
    <!-- 返回按钮 -->
    <button class="back-btn" @click="$router.back()">← 返回主页</button>

    <!-- 液态玻璃效果（可滚动长图） -->
    <div class="glass-page">
      <svg style="display: none">
        <defs>
          <filter
            id="liquid_glass_filter"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            filterUnits="objectBoundingBox"
          >
            <feDisplacementMap scale="200" />
          </filter>
        </defs>
      </svg>

      <!-- 关键修复：使用动态 src 和 key 强制刷新图片 -->
      <img
        :key="imageKey"
        :src="currentImgSrc"
        alt="背景长图"
        class="bg-img"
        @load="onImageLoaded"
        @error="onImageError"
      />

      <!-- 底部占位块：防止控制栏遮挡内容，同时避免黑边 -->
      <div class="scroll-placeholder"></div>

      <!-- 底部控制栏（固定在底部） -->
      <div class="control-bar">
        <!-- 左侧圆形按钮 -->
        <div
          class="liquid_glass-wrapper"
          style="width: 54px; height: 54px; --border-radius: 60px"
        >
          <div class="liquid_glass-outer"></div>
          <div class="liquid_glass-cover"></div>
          <div class="liquid_glass-sharp"></div>
          <div class="liquid_glass-reflect"></div>
          <div class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="rgba(255, 32, 86, 0.7)"
              style="width: 28px; height: 28px"
            >
              <path
                d="M20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20ZM11 13V19H13V13H11Z"
              ></path>
            </svg>
          </div>
        </div>

        <!-- 中间长条按钮 -->
        <div
          class="liquid_glass-wrapper"
          style="--border-radius: 26px; flex: 1"
        >
          <div class="liquid_glass-outer"></div>
          <div class="liquid_glass-cover"></div>
          <div class="liquid_glass-sharp"></div>
          <div class="liquid_glass-reflect"></div>

          <div class="bar-content">
            <img
              src="https://workos.imgix.net/images/d2e1f2a4-5994-4f38-b3f4-0c78c946b616.png?auto=format&fit=clip&q=80&w=500"
              alt=""
              style="width: 32px; height: 32px; border-radius: 5px"
            />
            <div class="info">
              <p>Konoyo</p>
              <p>Tim Hecker</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="rgba(255,255,255,0.8)"
              style="width: 28px; height: 28px"
            >
              <path
                d="M6 20.1957V3.80421C6 3.01878 6.86395 2.53993 7.53 2.95621L20.6432 11.152C21.2699 11.5436 21.2699 12.4563 20.6432 12.848L7.53 21.0437C6.86395 21.46 6 20.9812 6 20.1957Z"
              ></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="rgba(255,255,255,0.8)"
              style="width: 32px; height: 32px"
            >
              <path
                d="M12 13.3334L2.77735 19.4818C2.54759 19.635 2.23715 19.5729 2.08397 19.3432C2.02922 19.261 2 19.1645 2 19.0658V4.93433C2 4.65818 2.22386 4.43433 2.5 4.43433C2.59871 4.43433 2.69522 4.46355 2.77735 4.5183L12 10.6667V4.93433C12 4.65818 12.2239 4.43433 12.5 4.43433C12.5987 4.43433 12.6952 4.46355 12.7774 4.5183L23.376 11.584C23.6057 11.7372 23.6678 12.0477 23.5146 12.2774C23.478 12.3323 23.4309 12.3795 23.376 12.4161L12.7774 19.4818C12.5476 19.635 12.2372 19.5729 12.084 19.3432C12.0292 19.261 12 19.1645 12 19.0658V13.3334Z"
              ></path>
            </svg>
          </div>
        </div>

        <!-- 右侧圆形按钮 -->
        <div
          class="liquid_glass-wrapper"
          style="width: 54px; height: 54px; --border-radius: 60px"
        >
          <div class="liquid_glass-outer"></div>
          <div class="liquid_glass-cover"></div>
          <div class="liquid_glass-sharp"></div>
          <div class="liquid_glass-reflect"></div>
          <div class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="rgba(255,255,255, 0.8)"
              style="width: 28px; height: 28px"
            >
              <path
                d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onActivated } from "vue";

// 获取图片的真实路径（Vite 推荐方式）
// 请根据您实际存放图片的路径修改，例如图片位于 src/assets/ct.png
const getImageUrl = () => {
  return new URL("../assets/ct.png", import.meta.url).href;
};

const currentImgSrc = ref("");
const imageKey = ref(0); // 用于强制替换 img 元素

// 刷新图片：生成带时间戳的 URL 并更新 key
const refreshImage = () => {
  const baseUrl = getImageUrl();
  // 添加时间戳和随机数，彻底避免缓存
  currentImgSrc.value = `${baseUrl}?t=${Date.now()}&rand=${Math.random()}`;
  // 改变 key 值，强制 Vue 重新创建 img 元素
  imageKey.value += 1;
};

// 图片加载成功回调
const onImageLoaded = () => {
  console.log("长图加载成功");
};

// 图片加载失败回调
const onImageError = (e) => {
  console.error("长图加载失败", e);
  // 可在此设置一个默认占位图
  // currentImgSrc.value = 'fallback.jpg'
};

// 组件挂载时刷新图片
onMounted(() => {
  refreshImage();
});

// 如果组件被 keep-alive 缓存，激活时再次刷新
onActivated(() => {
  refreshImage();
});
</script>

<style>
/* 全局重置 */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC,
    Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
}

p {
  margin: 0;
}

* {
  box-sizing: border-box;
}
</style>

<style scoped>
/* 滚动容器 */
.page-container {
  width: 100vw;
  min-height: 100vh;
  background: #000;
  position: relative;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.back-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 8px;
  z-index: 9999;
  cursor: pointer;
}

/* 长图滚动核心 */
.glass-page {
  width: 100%;
  min-height: 100vh;
  position: relative;
}

/* 图片样式：消除底部黑边 */
.bg-img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
}

/* 底部占位：防止控制栏遮挡内容，同时避免黑边 */
.scroll-placeholder {
  width: 100%;
  height: 100px;
  background: #1a1a2e; /* 与图片底部融合，可根据实际图片调整 */
}

/* 控制栏固定在底部 */
.control-bar {
  display: flex;
  gap: 16px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0 16px 16px 16px;
  box-sizing: border-box;
  z-index: 100;
}

.bar-content {
  z-index: 5;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 24px;
  gap: 16px;
  color: rgba(255, 255, 255, 0.8);
}

.info {
  margin-right: auto;
}

.info p:first-child {
  font-weight: bold;
  font-size: 16px;
}

.info p:last-child {
  font-size: 12px;
}

/* 液态玻璃样式 */
.liquid_glass-wrapper {
  position: relative;
  display: flex;
  overflow: hidden;
  border-radius: var(--border-radius);
}

.liquid_glass-outer {
  backdrop-filter: url(#liquid_glass_filter);
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: var(--border-radius);
  mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><rect x="0" y="0" width="100%" height="100%" rx="0" ry="0" fill="white"/></svg>'),
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><rect x="5" y="5" width="calc(100% - 10px)" height="calc(100% - 10px)" rx="21" ry="21" fill="white"/></svg>');
  mask-composite: exclude;
}

.liquid_glass-cover {
  backdrop-filter: blur(2px);
  position: absolute;
  inset: 0;
  z-index: 2;
  border-radius: var(--border-radius);
  background: rgba(0, 0, 0, 0.12);
}

.liquid_glass-sharp {
  position: absolute;
  inset: 0;
  z-index: 3;
  box-shadow: inset 1px 1px 0px 0px rgba(255, 255, 255, 0.5),
    inset -1px -1px 0px 0px rgba(255, 255, 255, 0.6);
  border-radius: var(--border-radius);
}

.liquid_glass-reflect {
  position: absolute;
  inset: 1px;
  z-index: 2;
  box-shadow: inset 2px 2px 6px 2px rgba(255, 255, 255, 0.2),
    inset -2px -2px 4px -1px rgba(255, 255, 255, 0.2);
  border-radius: var(--border-radius);
}

.icon {
  z-index: 4;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}
</style>
