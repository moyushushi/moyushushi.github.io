<template>
  <div class="personal-page">
    <div class="title">我的个人主页</div>
    <div class="content">
      <p>欢迎来到我的主页～</p>
    </div>
  </div>
</template>

<style scoped>
.personal-page {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 700px;
  background: #fff;
  border-radius: 16px;
  padding: 50px 30px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  z-index: 10;
  animation: fadeIn 0.5s ease;
}

.title {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
}

.content {
  font-size: 16px;
  color: #555;
  line-height: 2;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -45%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}
</style>
