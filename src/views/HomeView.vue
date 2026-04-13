<template>
  <div class="container">
    <!-- 带方框的时钟 -->
    <div class="clock-box">
      <div class="clock-time">{{ currentTime }}</div>
      <div class="clock-date">{{ currentDate }}</div>
    </div>

    <!-- 返回按钮 -->
    <div v-if="showPersonal" class="back-btn" @click="goBack">← 返回</div>

    <!-- 头像 -->
    <div
      class="avatar-container"
      :class="{ avatarMove: showPersonal }"
      @click="goPersonal"
    >
      <img
        class="avatar"
        :src="avatarUrl"
        alt="头像"
        @error="handleAvatarError"
      />
    </div>

    <!-- 个人主页 -->
    <PersonalPage v-if="showPersonal" />

    <!-- 抽屉悬浮框 -->
    <div
      v-if="!showPersonal"
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
        <img :src="item.imgUrl" alt="封面" class="box-img" loading="lazy" />
        <div class="box-title">{{ item.title }}</div>
      </div>
    </div>

    <!-- 文章弹窗 -->
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

          <!-- 【液态玻璃】显示跳转按钮 -->
          <button
            v-if="currentArticle.title === '液态玻璃'"
            class="jump-btn"
            @click="$router.push('/liquid-glass')"
          >
            前往液态玻璃页面
          </button>

          <button class="close-btn" @click="closeArticle">关闭</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import myAvatar from "@/assets/my-avatar.png";
import aLogin from "@/assets/login.png";
import aSystem from "@/assets/asystem.png";
import test1 from "@/assets/test1.png";
import test2 from "@/assets/test2.png";
import PersonalPage from "./PersonalPage.vue";

// 头像
const avatarUrl = ref(myAvatar);
const handleAvatarError = (e) => {
  e.target.src = myAvatar;
};

// 悬浮数据
const floatItems = ref([
  {
    title: "登录系统",
    imgUrl: aLogin,
    content: "登录系统详情介绍",
  },
  {
    title: "手势灾害系统",
    imgUrl: aSystem,
    content: "手势灾害识别系统介绍",
  },
  {
    title: "液态玻璃",
    imgUrl: test1,
    content: "点击前往液态玻璃效果页面",
  },
  {
    title: "文章4",
    imgUrl: test2,
    content: "内容4",
  },
]);

// 弹窗
const visibleArticle = ref(false);
const currentArticle = ref({});
const isClicking = ref(false);
const activeIndex = ref(-1);

// 抽屉
const isDrawerOpen = ref(false);

// 时钟
const currentTime = ref("");
const currentDate = ref("");
let timer = null;

// 个人主页状态
const showPersonal = ref(false);

// 更新时间
const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const week = ["日", "一", "二", "三", "四", "五", "六"][now.getDay()];
  currentDate.value = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} 星期${week}`;
};

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000);
});

onUnmounted(() => clearInterval(timer));

// 文章
const openArticle = (item, index) => {
  if (isClicking.value) return;
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

const closeArticle = () => {
  visibleArticle.value = false;
  setTimeout(() => (document.body.style.overflow = ""), 300);
  activeIndex.value = -1;
};

// 抽屉
const openDrawer = () => (isDrawerOpen.value = true);
const closeDrawer = () => (isDrawerOpen.value = false);

const getDrawerPosition = (index) => {
  const closePos = { top: "15%", left: "10%", transform: "translate(0,0)" };
  const openPositions = [
    { top: "15%", left: "10%", zIndex: 14 },
    { top: "15%", left: "calc(10% + 160px)", zIndex: 13 },
    { top: "calc(15% + 190px)", left: "10%", zIndex: 12 },
    { top: "calc(15% + 190px)", left: "calc(10% + 160px)", zIndex: 11 },
  ];
  return isDrawerOpen.value ? openPositions[index] : closePos;
};

const mergeDrawerStyle = (index) => ({
  ...getDrawerPosition(index),
  zIndex: 10 + index,
});

// 页面切换
const goPersonal = () => (showPersonal.value = true);
const goBack = () => (showPersonal.value = false);
</script>

<style scoped>
.jump-btn {
  display: block;
  margin: 0 auto 16px auto;
  padding: 10px 24px;
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
}
.jump-btn:hover {
  background: #66b1ff;
}

.container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background-color: #f9f6e7;
}

/* 时钟 */
.clock-box {
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  z-index: 5;
}
.clock-time {
  font-size: 28px;
  font-weight: 500;
  color: #409eff;
}
.clock-date {
  font-size: 13px;
  color: #666;
}

/* 返回按钮 */
.back-btn {
  position: absolute;
  top: 30px;
  left: 30px;
  padding: 8px 16px;
  background: #409eff;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  z-index: 99;
  transition: 0.3s;
}
.back-btn:hover {
  background: #66b1ff;
}

/* 头像 */
.avatar-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  z-index: 20;
}
.avatarMove {
  top: 20px;
  left: calc(100% - 120px);
  transform: translate(0, 0);
}
.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #409eff;
  box-shadow: 0 0 20px rgba(64, 158, 255, 0.3);
  transition: 0.3s;
}
.avatarMove .avatar {
  width: 80px;
  height: 80px;
  border-width: 2px;
}
.avatar:hover {
  transform: scale(1.05);
}

/* 抽屉 */
.drawer-container {
  position: absolute;
  z-index: 10;
  top: 15%;
  left: 10%;
  width: 320px;
  height: 380px;
}

/* 悬浮卡片 */
.float-box {
  position: absolute;
  width: 150px;
  height: 180px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: transform;
}
.float-box:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 18px rgba(64, 158, 255, 0.2);
}
.float-box-active {
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(64, 158, 255, 0.3);
}
.box-img {
  width: 100%;
  height: 120px;
  object-fit: cover;
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

<style>
/* 弹窗样式（全局） */
.article-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  backdrop-filter: blur(2px);
  opacity: 0;
  transition: opacity 0.3s;
}
.article-modal-fade-in {
  opacity: 1;
}
.article-modal-fade-out {
  opacity: 0;
}
.article-content {
  width: 80%;
  max-width: 600px;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s;
  opacity: 0;
  transform: scale(0.9);
}
.article-content-show {
  opacity: 1;
  transform: scale(1);
}
.article-img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
}
.article-title {
  font-size: 20px;
  color: #333;
  text-align: center;
  margin-bottom: 12px;
}
.article-desc {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}
.close-btn {
  display: block;
  margin: 0 auto;
  padding: 8px 24px;
  border: none;
  border-radius: 8px;
  background: #409eff;
  color: #fff;
  cursor: pointer;
}
.close-btn:hover {
  background: #66b1ff;
}
</style>
