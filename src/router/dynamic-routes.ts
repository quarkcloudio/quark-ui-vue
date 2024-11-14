import type { RouteRecordRaw } from 'vue-router'
export const ROOT_ROUTE_REDIRECT_PATH = '/dashboard'
const Layout = () => import('~/layouts/index.vue')
const basicRouteMap = {
  // iframe模式下使用
  Iframe: () => import('~/pages/common/iframe.vue'),
  // 一般用于存在子集的页面
  RouteView: () => import('~/pages/common/route-view.vue'),
}
export const rootRoute: RouteRecordRaw = {
  path: '/',
  name: 'rootPath',
  redirect: ROOT_ROUTE_REDIRECT_PATH,
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
    component: basicRouteMap.RouteView,
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
  {
    path: '/form',
    redirect: '/form/basic',
    name: 'Form',
    meta: {
      title: '表单页',
      icon: 'FormOutlined',
    },
    component: basicRouteMap.RouteView,
    children: [
      {
        path: '/form/basic',
        name: 'FormBasic',
        component: () => import('~/pages/form/basic.vue'),
        meta: {
          title: '基础表单',
        },
      },
      {
        path: '/form/edit',
        name: 'FormEdit',
        component: () => import('~/pages/form/edit.vue'),
        meta: {
          hideInMenu: true,
          keepAlive: false,
          title: '编辑表单',
        },
      },
    ],
  },
] as RouteRecordRaw[]
