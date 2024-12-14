import type { MenuData } from '~@/components/Layout/typing'

export function getRouteMenusApi() {
  return <MenuData>[
    {
      id: 2,
      parentId: null,
      title: '分析页',
      icon: 'DashboardOutlined',
      component: '/dashboard/analysis',
      path: '/dashboard/analysis',
      name: 'DashboardAnalysis',
      keepAlive: true,
      locale: 'menu.dashboard.analysis',
    },
    {
      id: 1,
      parentId: null,
      title: '仪表盘',
      icon: 'DashboardOutlined',
      component: 'RouteView',
      redirect: '/dashboard/analysis',
      path: '/dashboard',
      name: 'Dashboard',
      locale: 'menu.dashboard',
    },
    {
      id: 42,
      parentId: 1,
      title: '监控页',
      component: '/dashboard/monitor',
      path: '/dashboard/monitor',
      name: 'DashboardMonitor',
      keepAlive: true,
      locale: 'menu.dashboard.monitor',
    },
    {
      id: 43,
      parentId: 1,
      title: '工作台',
      component: '/dashboard/workplace',
      path: '/dashboard/workplace',
      name: 'DashboardWorkplace',
      keepAlive: true,
      locale: 'menu.dashboard.workplace',
    },
  ]
}
