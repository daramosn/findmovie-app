import MainLayout from '@/layouts/MainLayout.vue'
import ErrorPage from '@/pages/ErrorPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('../pages/HomePage.vue')
        },
        {
          path: '/details/:id',
          name: 'details',
          props: true,
          component: () => import('../pages/DetailsPage.vue')
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => ErrorPage
        }
      ]
    }
  ]
})
