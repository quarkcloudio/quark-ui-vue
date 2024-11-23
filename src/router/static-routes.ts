import type { RouteRecordRaw } from 'vue-router'
const Layout = () => import('~/layouts/index.vue')

export default [
  {
    path: '/',
    component: () => import('~/pages/index/index.vue'),
  },
  {
    path: '/index',
    component: () => import('~/pages/index/index.vue'),
  },
  {
    path: '/layout',
    component: () => Layout,
    children: [
      {
        path: '/index',
        component: () => import('~/pages/index/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('~/pages/common/login.vue'),
    meta: {
      title: '登录',
    },
  },
] as RouteRecordRaw[]
