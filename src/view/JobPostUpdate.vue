<template>
  <div class="loading_info" v-if="isLoading">
    <p>저장중...</p>
  </div>
  <div class="form-container" v-if="isLogin">
    <form @submit.prevent="handleSubmit">
      <!-- 1.제목 -->
      <div class="form-group">
        <label for="title">제목</label>
        <input 
          type="text" 
          id="title" 
          required
          placeholder="공고 내용을 요약해 주세요."
          v-model="title"
        >
      </div>

      <!-- 2.하는 일 -->
      <div class="form-group">
        <label for="todo">하는 일</label>
        <input 
          type="text" 
          id="todo" 
          v-model="todo"
          placeholder="해야할 업무를 입력해주세요."
          required
        />
      </div>

      <!-- 3.시급, 월급 항목 선택 -->
      <div class="form-group">
        <input type="radio" id="pay_rule1" name="pay_rule" value="시급" v-model="pay_rule" required checked>
        <input type="radio" id="pay_rule2" name="pay_rule" value="월급" v-model="pay_rule" required >
        <div class="tab-group">
          <label for="pay_rule1">시급</label>
          <label for="pay_rule2">월급</label>
        </div>
        <!-- 4.금액 입력 -->
        <input 
          type="number" 
          id="pay" 
          placeholder="시급 또는 월급을 입력해주세요."
          v-model="pay" 
          required
        >
      </div>

      <!-- 5.자세한 설명 -->
      <div class="form-group">
        <label for="desc">자세한 설명</label>
        <textarea 
          name="desc" 
          id="desc" 
          v-model="desc"
          rows="4"
          required
          placeholder="구체적인 업무 내용, 근무여건, 지원자가 갖추어야 할 능력 등 우대 사항에 대해 알려주세요."
        ></textarea>
      </div>

      <!-- 6.업체명 -->
      <div class="form-group">
        <label for="company_name">업체명</label>
        <input 
          type="text" 
          id="company_name" 
          v-model="company_name" 
          required
          placeholder="예) 땅콩가게"
        >
      </div>

      <!-- 7.위치(주소) -->
      <div class="form-group">
        <label for="location">위치</label>
        <input 
          type="text" 
          id="location" 
          v-model="location" 
          required 
          placeholder="예) 서울시 강남구 논현동"
        >
      </div>

      <!-- 8.연락처 -->
      <div class="form-group">
        <label for="tel">연락처</label>
        <input type="text" id="tel" v-model="tel" required placeholder="예) 010-1234-5678">
      </div>

      <!-- 9.사진(선택 입력) -->
      <div class="form-group">
        <label for="photo">
          <p class="title">사진(선택)</p>
          <figure>
            <Icon icon="mdi-light:camera" width="64" height="64"  style="color: #1e1e1e;" />
            <img :src="previewImage" alt="미리보기" width="64" height="64" v-if="previewImage" />
            <img src="/box64.jpg" alt="미리보기" width="64" height="64" v-if="!previewImage" />
          </figure>
        </label>
        <input 
          @change="onFileChange"
          type="file" id="photo" accept="image/*">
      </div>
      <button class="btn-submit">수정완료</button>
    </form>
  </div>
</template>

<script setup>
  import { useAuth } from '../auth/auth';
  import { useRouter } from 'vue-router';
  import supabase from '../supabase';
  import { ref, onMounted, onUnmounted } from 'vue';
  import { Icon } from '@iconify/vue';

  const { isLogin, user, checkLoginStatus } = useAuth();
  const router = useRouter();
  const isLoading = ref(false);

  // 입력 항목
  const title = ref('');
  const todo = ref('');
  const pay_rule = ref('시급');
  const pay = ref('');
  const desc = ref('');
  const company_name = ref('');
  const location = ref('');
  const tel = ref('');
  // img_url: 첨부한 사진은 storage에 저장하고 url을 저장
  // author: 작성자 id(auth.user의 uid)

  const handleSubmit = async () => {
    isLoading.value = true;

    const { error } = await supabase
      .from('job_posts')
      .insert({ 
        title: title.value,
        todo: todo.value,
        pay_rule: pay_rule.value,
        pay: pay.value,
        desc: desc.value,
        company_name: company_name.value,
        location: location.value,
        tel: tel.value,
        img_url: 'https://placehold.co/400x250',
      })
      if(error) {
        alert(error.message || '등록 실패');
      } else {
        alert('등록 성공');
        router.push('/job-list');
      }
      
    isLoading.value = false;
  }

  const previewImage = ref(null);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if(file) {
      previewImage.value = URL.createObjectURL(file);
      console.log(previewImage.value);
    }
  }

  // 마운트시 로그인 상태 확인하기
  onMounted(async() => {

    await checkLoginStatus();
    // console.log('auth 정보', isLogin.value, user.value.email);
  })

  onUnmounted(() => {
    console.log('unmounted');
    // 메모리 누수 방지
    if(previewImage.value) {
      URL.revokeObjectURL(previewImage.value);
    }
  })
</script>
  
<style lang="scss" scoped>
  @use "../style/form.scss";

  .form-container {
    margin-top: 20px;
    padding-bottom: 50px;

    .tab-group {
      display: flex;
      gap: 15px;
      label { 
        flex: 1;
        border: 1px solid var(--main-color-dark);
        border-radius: 8px;
        text-align: center;
        padding: 12px;
      }
    }

    input[type="radio"] {
        display: none;
    }

    input[type="radio"]:nth-child(1):checked ~ .tab-group label:nth-child(1) {
      background: var(--main-color-dark);
      color: #fff;
    }

    input[type="radio"]:nth-child(2):checked ~ .tab-group label:nth-child(2) {
      background: var(--main-color-dark);
      color: #fff;
    }

    #pay { margin-top: 8px;}

    // for=photo를 가진 form-group의 후손 input의 보더 스타일 제거
    .form-group:has(label[for=photo]) input {
      border: none;
    }

    //file 아이콘
    label[for=photo] {
      figure { 
        display: flex; 
        align-items: center;
        img { 
          border: 1px solid red;
          margin-left: 30px; 
        }
      }
    }
    input[type="file"] {
      display: none;
    }
  }

  .btn-submit {
    background: var(--main-color-light);
  }

  .form-group:has(label[for=photo]) {
    padding-bottom: 25px;
    border-bottom: 5px solid #ccc;
  }
</style>