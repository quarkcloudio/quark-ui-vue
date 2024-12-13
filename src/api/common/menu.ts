import type { MenuData } from '~@/components/Layout/typing'

export function getRouteMenusApi() {
  return useGet<MenuData>('/menu')
}
