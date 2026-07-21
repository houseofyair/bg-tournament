import { createRouter, createWebHistory } from 'vue-router'
import TournamentPage from '@/pages/TournamentPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: TournamentPage },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: () => import('@/pages/LeaderboardPage.vue'),
    },
    { path: '/config', name: 'config', component: () => import('@/pages/ConfigPage.vue') },
  ],
  linkActiveClass: 'active',
})

export default router
