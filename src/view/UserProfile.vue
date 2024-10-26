<template>
  <div class="form-container" v-if="isLogin">
    <div class="top-info-box">
      <img src="/vite.svg" alt="profile">
      <div class="right-info">
        <span class="name">{{name}}</span>
        <address>{{ addr }}</address>
      </div>
    </div>
    <div class="text-info">
      <h4>자기소개</h4>
      <p>{{ text }}</p>
    </div>
    <button class="logout" @click="handleLogout">로그아웃</button>
  </div>
</template>
  
<script setup>
import supabase from '../supabase';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const isLogin = ref(false); // 화면 표시 상태 변수

const name = ref('사용자 이름');
const addr = ref('사용자 주소');
const text = ref('IT와 웹 개발에 대한 열정을 가진 개발자입니다. Vue.js와 JavaScript에 강점을 두고 있으며, 효율적인 코드와 창의적인 문제 해결에 집중합니다. 성장과 도전을 통해 더 나은 결과를 만들기 위해 노력하고 있습니다.')

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

    // user 정보 가져오기
    const { data, error } = await supabase
      .from('user_table')
      .select()
      .eq('id', user.id)
    if(data) {
      console.log('user data:', data);
      name.value = data[0].name;
      addr.value = data[0].addr;
      text.value = data[0].text
    }

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

  .form-container {
    margin-top: 20px;
  }

  .top-info-box {
    display: flex;
    align-items: center;
    margin-bottom: 40px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 12px;
    }

    .right-info {
      width: 100%;
      line-height: 1.4;
  
      .name {
        font-size: 16px;
        font-weight: 600;
      }
      address {
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        color: #777;
      }
    }
  }

  .text-info {
    margin-bottom: 25px;
    h4 {
      margin-bottom: 8px;
    }
    p {
      font-size: 14px;
      color: #333;
      line-height: 20px;
      border: 1px solid #d9d9d9;
      border-radius: 8px;
      padding: 12px 1rem;
    }
  }

</style>