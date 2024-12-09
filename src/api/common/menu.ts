import type { MenuData } from '~@/layouts/BasicLayout/typing'

export function getRouteMenusApi() {
  return useGet<MenuData>('/menu')
}
