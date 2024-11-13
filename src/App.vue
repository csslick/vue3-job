<script setup>
import Navbar from './components/Navbar.vue';
import { onMounted, ref } from 'vue';

const isInstallBtn = ref(false);
let deferredPrompt = null;

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); // 자동 설치 방지
    deferredPrompt = e; // 나중에 사용을 위해 저장
    isInstallBtn.value = true; // 설치버튼 표시
  });
});

const handleInstallClick = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt(); // 시스템 설치 창 표시
    const choiceResult = await deferredPrompt.userChoice; // 사용자 선택 감지
    if (choiceResult.outcome === 'accepted') {
      console.log('앱이 설치되었습니다.');
    } else {
      console.log('앱 설치가 취소되었습니다.');
    }
    deferredPrompt = null;  // 사용 후 이벤트 초기화
    isInstallBtn.value = false; // 설치버튼 닫음
  }
};
</script>

<template>
  <div v-if="isInstallBtn">
    <button @click="handleInstallClick">앱 설치하기</button>
  </div>
  <Navbar />
  <router-view />  
</template>

<style scoped lang="scss">
  button {
    background: var(--main-color-light);
    border-radius: 0;
  }
</style>
