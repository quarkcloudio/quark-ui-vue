import { getLayoutInfoApi } from '~@/api/layout/layout'

export const useLayoutStore = defineStore('layout', () => {
  const layoutInfo = shallowRef<any>()

  // 获取Layout信息
  const getLayoutInfo = async () => {
    layoutInfo.value = await getLayoutInfoApi()
  }

  return {
    layoutInfo,
    getLayoutInfo,
  }
})
