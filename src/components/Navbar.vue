<template>
  <nav>
    <h1>로그인</h1>
    <router-link to="/job-list" class="btn-close">
      <Icon 
        icon="material-symbols:close" 
        width="24"
        style="color: #1e1e1e;"
      />
    </router-link>
  </nav>
</template>
  
<script setup>
  import { Icon } from '@iconify/vue';
  import { useRoute } from 'vue-router';
  import { watch } from 'vue';

  let route = useRoute();
  let currentPath = route.path;

  watch(route, (newPath) => {
    currentPath = newPath.path;
    console.log(currentPath);
  });
</script>
  
<style lang="scss" scoped>
  nav {
    position: relative;
    // background: pink;
    border-bottom: 1px solid #ccc;
    width: 100%;
    height: 44px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
      font-size: 16px;
      color: var(--text-color-dark);
    }
    .btn-close {
      position: absolute;
      left: 15px;
      text-decoration: none;
    }
  }  
</style>