<template>
  <h1>JobDetail</h1>
</template>
  
<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
console.log(route.params.id);
  
</script>
  
<style>
  
</style>