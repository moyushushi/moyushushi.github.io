<template>
  <div class="container">
    <!-- 中间圆形头像框 -->
    <div class="avatar-container">
      <img
        class="avatar"
        :src="avatarUrl"
        alt="头像"
        @error="handleAvatarError"
      />
    </div>

    <!-- 抽屉式悬浮框容器：修复鼠标跳动bug -->
    <div
      class="drawer-container"
      @mouseenter="openDrawer"
      @mouseleave="closeDrawer"
    >
      <div
        class="float-box"
        v-for="(item, index) in floatItems"
        :key="`float-box-${index}-${item.title}`"
        :style="mergeDrawerStyle(index)"
        @click="openArticle(item, index)"
        :class="{ 'float-box-active': activeIndex === index }"
      >
        <img :src="item.imgUrl" alt="文章封面" class="box-img" loading="lazy" />
        <div class="box-title">{{ item.title }}</div>
      </div>
    </div>

    <!-- 文章放大弹窗 -->
    <teleport to="body">
      <div
        v-if="visibleArticle"
        class="article-modal"
        :class="{
          'article-modal-fade-in': visibleArticle,
          'article-modal-fade-out': !visibleArticle,
        }"
        @click.self="closeArticle"
      >
        <div
          class="article-content"
          :class="{ 'article-content-show': visibleArticle }"
        >
          <img
            :src="currentArticle.imgUrl"
            alt="文章封面"
            class="article-img"
            loading="lazy"
          />
          <h2 class="article-title">{{ currentArticle.title }}</h2>
          <div class="article-desc">{{ currentArticle.content }}</div>
          <button class="close-btn" @click="closeArticle">关闭</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 头像配置
const avatarUrl = ref("https://picsum.photos/200/200");
const handleAvatarError = (e) => {
  e.target.src = "https://picsum.photos/200/200";
};

// 悬浮方框数据
const floatItems = ref([
  {
    title: "文章1",
    imgUrl: "https://picsum.photos/150/150?1",
    content: "这是文章1的详细内容，点击方框后放大显示～",
  },
  {
    title: "文章2",
    imgUrl: "https://picsum.photos/150/150?2",
    content: "这是文章2的详细内容，支持自定义文本和图片～",
  },
  {
    title: "文章3",
    imgUrl: "https://picsum.photos/150/150?3",
    content: "这是文章3的详细内容，四周悬浮布局可调整～",
  },
  {
    title: "文章4",
    imgUrl: "https://picsum.photos/150/150?4",
    content: "这是文章4的详细内容，点击空白处可关闭～",
  },
]);

// 文章弹窗相关
const visibleArticle = ref(false);
const currentArticle = ref({
  title: "",
  imgUrl: "",
  content: "",
});
const isClicking = ref(false);
const activeIndex = ref(-1);

// 抽屉展开状态
const isDrawerOpen = ref(false);

/**
 * 打开文章弹窗
 * @param {Object} item - 文章数据
 * @param {number} index - 索引值
 */
const openArticle = (item, index) => {
  if (isClicking.value) {
    return;
  }
  isClicking.value = true;
  activeIndex.value = index;
  currentArticle.value = item;
  visibleArticle.value = true;
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    isClicking.value = false;
    activeIndex.value = -1;
  }, 300);
};

/**
 * 关闭文章弹窗
 */
const closeArticle = () => {
  visibleArticle.value = false;
  setTimeout(() => {
    document.body.style.overflow = "";
  }, 300);
};

/**
 * 打开抽屉
 */
const openDrawer = () => {
  isDrawerOpen.value = true;
};

/**
 * 关闭抽屉
 */
const closeDrawer = () => {
  isDrawerOpen.value = false;
};

/**
 * 获取抽屉位置
 * @param {number} index - 索引值
 * @returns {Object} 位置样式
 */
const getDrawerPosition = (index) => {
  const closePos = {
    top: "15%",
    left: "10%",
    transform: "translate(0, 0)",
  };
  const openPositions = [
    {
      top: "15%",
      left: "10%",
      transform: "translate(0, 0)",
      zIndex: "14",
    },
    {
      top: "15%",
      left: "calc(10% + 160px)",
      transform: "translate(0, 0)",
      zIndex: "13",
    },
    {
      top: "calc(15% + 190px)",
      left: "10%",
      transform: "translate(0, 0)",
      zIndex: "12",
    },
    {
      top: "calc(15% + 190px)",
      left: "calc(10% + 160px)",
      transform: "translate(0, 0)",
      zIndex: "11",
    },
  ];
  return isDrawerOpen.value ? openPositions[index] : closePos;
};

/**
 * 合并抽屉样式
 * @param {number} index - 索引值
 * @returns {Object} 合并后的样式
 */
const mergeDrawerStyle = (index) => {
  return {
    ...getDrawerPosition(index),
    zIndex: (10 + index).toString(),
  };
};
</script>

<!-- scoped样式：组件内部元素 -->
<style scoped>
/* 全局容器 */
.container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background-color: #f9f6e7;
}

/* 中间圆形头像 */
.avatar-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #409eff;
  box-shadow: 0 0 20px rgba(64, 158, 255, 0.3);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.avatar:hover {
  transform: scale(1.05);
}

/* 抽屉容器：修复鼠标跳动 */
.drawer-container {
  position: absolute;
  z-index: 10;
  top: 15%;
  left: 10%;
  width: calc(2 * 160px);
  height: calc(2 * 190px);
}

/* 抽屉式悬浮方框 */
.float-box {
  position: absolute;
  width: 150px;
  height: 180px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: transform, box-shadow, left, top;
}

.float-box:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 18px rgba(64, 158, 255, 0.2);
}

.float-box-active {
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(64, 158, 255, 0.3);
}

/* 方框内部样式 */
.box-img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  transition: opacity 0.2s ease;
}

.float-box:hover .box-img {
  opacity: 0.95;
}

.box-title {
  padding: 8px;
  font-size: 14px;
  color: #333;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

<!-- 非scoped样式：弹窗动画 -->
<style>
/* 弹窗遮罩层 */
.article-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  backdrop-filter: blur(2px);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: auto;
}

.article-modal-fade-in {
  opacity: 1;
}

.article-modal-fade-out {
  opacity: 0;
}

/* 弹窗内容区 */
.article-content {
  width: 80%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  opacity: 0;
  transform: scale(0.9);
}

.article-content-show {
  opacity: 1;
  transform: scale(1);
}

/* 弹窗内部元素 */
.article-img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
  transition: opacity 0.3s ease;
}

.article-title {
  font-size: 20px;
  color: #333;
  margin-bottom: 12px;
  text-align: center;
  animation: titleFade 0.4s ease;
}

.article-desc {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  animation: contentFade 0.5s ease;
}

/* 关闭按钮 */
.close-btn {
  display: block;
  margin: 0 auto;
  padding: 8px 24px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  background-color: #409eff;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.close-btn:hover {
  background-color: #66b1ff;
}

.close-btn:active {
  transform: scale(0.98);
}

/* 文字渐入动画 */
@keyframes titleFade {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes contentFade {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
