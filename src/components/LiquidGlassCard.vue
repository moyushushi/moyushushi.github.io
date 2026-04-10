<template>
  <div class="liquid-glass-modal" @click.self="close">
    <div class="glass-card">
      <h3>文章3 - 液态玻璃效果</h3>

      <div class="switch-item">
        <span>液态玻璃开关</span>
        <input type="checkbox" v-model="isGlass" class="switch" />
      </div>

      <div class="preview-box" :class="{ glass: isGlass }">
        开启开关即可切换液态玻璃效果
      </div>

      <button class="close-btn" @click="close">关闭</button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const emit = defineEmits(["close"]);
const isGlass = ref(false);
const close = () => emit("close");
</script>

<style scoped>
.liquid-glass-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.glass-card {
  width: 90%;
  max-width: 550px;
  padding: 35px 30px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  color: #fff;
  text-align: center;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.switch-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0;
  font-size: 16px;
}

.switch {
  width: 46px;
  height: 24px;
  appearance: none;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 99px;
  position: relative;
  cursor: pointer;
  transition: 0.2s;
}

.switch:checked {
  background: #409eff;
}

.switch::before {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  background: white;
  border-radius: 50%;
  top: 3px;
  left: 3px;
  transition: 0.2s;
}

.switch:checked::before {
  transform: translateX(22px);
}

.preview-box {
  padding: 22px;
  border-radius: 12px;
  background: #fff;
  color: #333;
  transition: 0.3s;
  margin-bottom: 20px;
}

.preview-box.glass {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
}

.close-btn {
  padding: 10px 25px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
}
</style>
