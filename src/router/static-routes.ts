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
  {
    path: '/common',
    name: 'LayouBasicRedirect',
    component: Layout,
    redirect: '/redirect',
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'redirect',
        component: () => import('~/pages/common/redirect.vue'),
      },
    ],
  },

  {
    path: '/:pathMatch(.*)',
    component: () => import('~/pages/exception/error.vue'),
  },
] as RouteRecordRaw[]
