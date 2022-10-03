import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeEn.vue')
  },
  {
    path: '/cn',
    name: 'cn',
    component: () => import('@/views/HomeEn.vue')
  },
  {
    path: '/jp',
    name: 'jp',
    component: () => import('@/views/HomeEn.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
