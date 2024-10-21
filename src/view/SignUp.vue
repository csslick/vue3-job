<template>
  <div class="form-container">
    <form @submit.prevent="handleSignup">
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
      <div class="form-group">
        <label for="tel">Phone</label>
        <input 
          type="tel" 
          id="tel" 
          placeholder="010-1234-5678"
          required
          v-model="tel"
        />
      </div>
      <div class="form-group">
        <label for="text">자기소개</label>
        <textarea id="text" v-model="text"></textarea>
      </div>
      <button type="submit">회원가입</button>
    </form>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const tel = ref('');
const text = ref('');

const handleSignup = () => {
  console.log('회원가입 처리');
  console.log('이메일:', email.value);
  console.log('비밀번호:', password.value);
  console.log('전화번호:', tel.value);
  console.log('자기소개:', text.value);
}
  
</script>
  
<style lang="scss">
  @import "../style/form.scss";
  // @use "../style/form.scss";
</style>