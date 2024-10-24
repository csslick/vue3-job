<template>
  <div class="loading_info" v-if="isLoading">
    <p>회원가입 처리중...</p>
  </div>
  <div class="form-container">
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input 
          type="email" 
          id="email" 
          placeholder="이메일 입력"
          required
          v-model="email"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input 
          type="password" 
          id="password" 
          placeholder="비밀번호 입력"
          required
          v-model="password"
        />
      </div>
      <button type="submit">로그인</button>
      <router-link to="/signup">회원가입</router-link>
    </form>
  </div>
</template>
  
<script setup>
  import { useRouter } from 'vue-router';
  import supabase from '../supabase';
  import { ref } from 'vue';

  const email = ref('');
  const password = ref('');

  const router = useRouter();
  const isLoading = ref(false);

  const handleLogin = async () => {
    console.log(email.value, password.value);
    isLoading.value = true; // 서버 요청 시작

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if(error) {
      alert(error.message)
    } else {
      alert('로그인 성공')
      console.log(data)
      isLoading.value = false; // 서버 요청 완료 
      router.push('/job-list');
    }
  }

</script>
  
<style scoped>
  /* @import "../style/form.scss"; */
  @use "../style/form.scss";
</style>