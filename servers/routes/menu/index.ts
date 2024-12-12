const menuData = [
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

export const accessMenuData = [
  {
    id: 18,
    parentId: 15,
    path: '/access/admin',
    title: '管理员',
    name: 'AccessAdmin',
    component: '/access/admin',
    locale: 'menu.access.admin',
  },

]

export default eventHandler((event) => {
  const token = getHeader(event, 'Authorization')

  const username = Buffer.from(token as any, 'base64').toString('utf-8')
  return {
    code: 200,
    msg: '获取成功',
    data: [...menuData, ...(username === 'admin' ? accessMenuData : [])],
  }
})
