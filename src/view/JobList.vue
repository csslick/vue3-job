<template>
  <ul class="job-list" v-if="posts.length > 0">
    <li class="job-item" v-for="post in posts" :key="post.id">
      <div class="header">
        <h3>{{ post.title }}</h3>
        <address>{{ post.location}}</address>
        <span>&middot;</span>
        <time>{{ format(new Date(post.created_at), "yyyy-MM-dd") }}</time>
      </div>
      <div class="bottom-info">
        <p class="pay">시급: {{ posts.pay }}원</p>
        <img :src="post.img_url" alt="image" width="64" height="64">
      </div>
    </li>
  </ul>
  <p v-else class="loading_info ">구인 목록을 불러오는 중입니다...</p>

</template>
  
<script setup>
  import supabase from '../supabase';
  import { ref, onMounted } from 'vue';
  import { format } from "date-fns";

  const posts = ref([]);

  // 구인목록 가져오기
  onMounted(async () => {
    const { data, error } = await supabase
      .from('job_posts')
      .select();
    posts.value = data;
    console.log(posts.value);

    if(error) {
      alert('구인목록 가져오기 실패');
    }
  })

</script>
  
<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
  li {
    padding: 15px;
    border-bottom: 1px solid rgba(0,0,0, 0.2);
  }
}

address, time {
  font-style: normal;
  display: inline;
  font-size: 12px;
  color: #666;
}

.pay {
  font-size: 14px;
  font-weight: bold;
}

.bottom-info {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-top: 15px;
}
</style>