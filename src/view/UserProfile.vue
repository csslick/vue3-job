<template>
  <div class="container" v-if="isLogin">
    <div class="form-container">
      <button class="logout" @click="handleLogout">로그아웃</button>
    </div>
  </div>
</template>
  
<script setup>
import supabase from '../supabase';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const isLogin = ref(false); // 화면 표시 상태 변수

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut()
  if(error) {
    alert('로그아웃 실패')
  } else {
    alert('로그아웃 성공')
    router.push('/')
  }
}

// 마운트시 로그인 상태 확인하기
onMounted(async() => {
  const { data: { user } } = await supabase.auth.getUser()
  console.log(user?.email)

  if(user) {
    console.log('로그인 상태')
    isLogin.value = true
  } else {
    console.log('로그아웃 상태')
    isLogin.value = false
    alert('로그인 후 이용해주세요.')
    router.push('/')
  }

})
  
</script>
  
<style lang="scss" scoped>
  // 버튼 디자인 수정
  button { 
    background: transparent;
    color: var(--main-color);
    font-size: 16px;
    margin-top: 40px;
    &:hover{
      opacity: 0.7;
      text-decoration: underline;
    }
  }  
</style>