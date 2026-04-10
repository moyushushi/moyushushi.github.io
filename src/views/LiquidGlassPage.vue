<template>
  <div class="page-container">
    <div class="glass-card">
      <h2>液态玻璃效果展示</h2>

      <div class="switch-item">
        <span>液态玻璃开关</span>
        <input type="checkbox" v-model="isGlass" class="switch" />
      </div>

      <div class="demo-box" :class="{ glass: isGlass }">
        开启开关即可看到液态玻璃效果
      </div>

      <button class="back-btn" @click="$router.back()">← 返回主页</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const isGlass = ref(false);
</script>

<style scoped>
.page-container {
  width: 100vw;
  height: 100vh;
  background: #f9f6e7;
  display: flex;
  align-items: center;
  justify-content: center;
}

.glass-card {
  width: 90%;
  max-width: 600px;
  padding: 40px 30px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);
  color: #333;
  text-align: center;
}

.switch-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;
  font-size: 16px;
}

.switch {
  width: 46px;
  height: 24px;
  appearance: none;
  background: #ddd;
  border-radius: 99px;
  position: relative;
  cursor: pointer;
}
.switch:checked {
  background: #409eff;
}
.switch::before {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  background: #fff;
  border-radius: 50%;
  top: 3px;
  left: 3px;
  transition: 0.2s;
}
.switch:checked::before {
  transform: translateX(22px);
}

.demo-box {
  padding: 25px;
  border-radius: 12px;
  background: #fff;
  margin-bottom: 20px;
  transition: 0.3s;
}
.demo-box.glass {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.back-btn {
  padding: 10px 25px;
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
