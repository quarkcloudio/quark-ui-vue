import { Base64 } from 'js-base64'
import { logoutApi } from '~@/api/common/login'
import { getRouteMenusApi } from '~@/api/common/menu'
import type { UserInfo } from '~@/api/common/user'
import type { MenuData } from '~@/components/Layout/typing'
import { rootRoute } from '~@/router/constant'
import { generateFlatRoutes, generateTreeRoutes } from '~@/router/generate-route'

export const useUserStore = defineStore('user', () => {
  const routerData = shallowRef()
  const menuData = shallowRef<MenuData>([])
  const userInfo = shallowRef<UserInfo>()
  const token = useAuthorization()
  const avatar = computed(() => userInfo.value?.avatar)
  const nickname = computed(() => userInfo.value?.nickname ?? userInfo.value?.username)
  const roles = computed(() => userInfo.value?.roles)

  const getMenuRoutes = async () => {
    const { data } = await getRouteMenusApi()
    return generateTreeRoutes(data ?? [])
  }

  const generateDynamicRoutes = async () => {
    const { menuData: treeMenuData, routeData } = await getMenuRoutes()

    menuData.value = treeMenuData

    routerData.value = {
      ...rootRoute,
      children: generateFlatRoutes(routeData),
    }
    return routerData.value
  }

  // 获取用户信息
  const getUserInfo = async () => {
    const token = useAuthorization()
    if (token.value) {
      userInfo.value = JSON.parse(Base64.decode(token.value.split('.')[1]))
    }
  }

  const logout = async () => {
    // 退出登录
    // 1. 清空用户信息
    try {
      await logoutApi()
    }
    finally {
      token.value = null
      userInfo.value = undefined
      routerData.value = undefined
      menuData.value = []
    }
  }

  return {
    userInfo,
    roles,
    getUserInfo,
    logout,
    routerData,
    menuData,
    generateDynamicRoutes,
    avatar,
    nickname,
  }
})
