import MainLayout from '@/layouts/MainLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { startViewTransition } from 'vue-view-transitions'

const router = createRouter({
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
          // component: () => HomePage
          component: () => import('../pages/HomePage.vue')
        },
        {
          path: '/details/:id',
          name: 'details',
          props: true,
          // component: () => DetailsPage
          component: () => import('../pages/DetailsPage.vue')
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import('../pages/ErrorPage.vue')
        }
      ]
    }
  ]
})

router.beforeResolve(async () => {
  console.log('before resolve (router)')

  const viewTransition = startViewTransition()
  await viewTransition.captured
})

export default router
