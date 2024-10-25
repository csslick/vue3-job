<template>
  <h1>UserProfile</h1>
</template>
  
<script setup>
import supabase from '../supabase';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

// 마운트시 로그인 상태 확인하기
onMounted(async() => {
  const { data: { user } } = await supabase.auth.getUser()
  console.log(user?.email)

  if(user) {
    console.log('로그인 상태')
  } else {
    console.log('로그아웃 상태')
    alert('로그인 후 이용해주세요.')
    router.push('/')
  }

})
  
</script>
  
<style>
  
</style>