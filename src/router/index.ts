import { createRouter, createWebHistory } from 'vue-router'
import staticRoutes from './static-routes'

const router = createRouter({
  routes: [
    ...staticRoutes,
  ],
  history: createWebHistory('/'),
})

export default router
