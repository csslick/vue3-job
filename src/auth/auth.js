import { useRouter } from 'vue-router';
import supabase from '../supabase';
import { ref } from 'vue';

export function useAuth() {
  const router = useRouter();
  const user = ref(null);
  const isLogin = ref(false);

  const checkLoginStatus = async () => {
    const { data: { user:_user } } = await supabase.auth.getUser();
    user.value = _user; // 사용자 정보 저장

    if(_user) {
      console.log('로그인 상태')
      isLogin.value = true
    } else {
      console.log('로그아웃 상태')
      isLogin.value = false
      alert('로그인 후 이용해주세요.')
      router.push('/')
    }
  }

  return {
    user,
    isLogin,
    checkLoginStatus
  }
}