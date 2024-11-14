import type { LayoutSetting } from '~@/stores/app'

export default {
  title: 'QuarkCloud',
  theme: 'light',
  logo: '/logo.png',
  collapsed: false,
  drawerVisible: false,
  colorPrimary: '#1677FF',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixedSider: true,
  splitMenus: false,
  header: true,
  menu: true,
  menuHeader: true,
  footer: false,
  colorWeak: false,
  multiTab: true,
  multiTabFixed: false,
  headerHeight: 48,
  copyright: 'QuarkCloud',
} as LayoutSetting
