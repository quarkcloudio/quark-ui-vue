import type { RouteRecordRaw } from 'vue-router'
const Layout = () => import('~/layouts/index.vue')
export const rootRoute: RouteRecordRaw = {
  path: '/',
  name: 'rootPath',
  redirect: '/dashboard',
  component: Layout,
  children: [],
}

export default [
  {
    path: '/dashboard',
    redirect: '/dashboard/analysis',
    name: 'Dashboard',
    meta: {
      title: '仪表盘',
      icon: 'DashboardOutlined',
    },
    children: [
      {
        path: '/dashboard/analysis',
        name: 'DashboardAnalysis',
        component: () => import('~/pages/dashboard/analysis.vue'),
        meta: {
          title: '分析页',
        },
      },
    ],
  },
] as RouteRecordRaw[]
