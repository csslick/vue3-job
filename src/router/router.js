import { createRouter, createWebHistory } from 'vue-router';
import Login from '../view/Login.vue'
import SignUp from '../view/SignUp.vue'
import JobPost from '../view/JobPost.vue'
import JobList from '../view/JobList.vue'
import JobDetail from '../view/JobDetail.vue'
import UserProfile from '../view/UserProfile.vue'

const routes = [
  { 
    path: '/', 
    component: Login 
  },
  { 
    path: '/signup', 
    component: SignUp 
  },
  { 
    path: '/job-post', 
    component: JobPost
  },
  { 
    path: '/job-list', 
    component: JobList
  },  
  { 
    path: '/job-detail', 
    component: JobDetail
  },
  { 
    path: '/user-profile', 
    component: UserProfile
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router