import type { RouteRecordRaw } from 'vue-router'
import { RouterView } from 'vue-router'

const Layout = () => import('~/layouts/index.vue')

export default [
  {
    path: '/index',
    component: () => import('~/pages/index/index.vue'),
  },
  {
    path: '/login',
    component: () => import('~/pages/common/login.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/401',
    name: 'Error401',
    component: () => import('~/components/Exception/Error401.vue'),
    meta: {
      title: '授权已过期',
    },
  },
  {
    path: '/common',
    name: 'LayoutBasicRedirect',
    component: Layout,
    redirect: '/common/redirect',
    children: [
      {
        path: '/common/redirect',
        component: () => RouterView,
        name: 'CommonRedirect',
        redirect: '/redirect',
        children: [
          {
            path: '/redirect/:path(.*)',
            name: 'RedirectPath',
            component: () => import('~/components/Layout/Redirect.vue'),
          },
        ],
      },

    ],
  },
  {
    path: '/:pathMatch(.*)',
    meta: {
      title: '找不到页面',
    },
    component: () => import('~/components/Exception/Error.vue'),
  },
] as RouteRecordRaw[]
