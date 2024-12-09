import pulseSpin from '@/components/BaseLoading/Spin/PulseSpin.vue'
import rectSpin from '@/components/BaseLoading/Spin/RectSpin.vue'
import planeSpin from '@/components/BaseLoading/Spin/PlaneSpin.vue'
import cubeSpin from '@/components/BaseLoading/Spin/CubeSpin.vue'
import preloaderSpin from '@/components/BaseLoading/Spin/PreloaderSpin.vue'
import chaseSpin from '@/components/BaseLoading/Spin/ChaseSpin.vue'
import dotSpin from '@/components/BaseLoading/Spin/DotSpin.vue'

export enum LoadingEnum {
  PULSE = 'pulse',
  RECT = 'rect',
  PLANE = 'plane',
  CUBE = 'cube',
  PRELOADER = 'preloader',
  CHASE = 'chase',
  DOT = 'dot',
}

const loadingMap = new Map<LoadingEnum, Component>()

loadingMap.set(LoadingEnum.PULSE, pulseSpin)
loadingMap.set(LoadingEnum.RECT, rectSpin)
loadingMap.set(LoadingEnum.PLANE, planeSpin)
loadingMap.set(LoadingEnum.CUBE, cubeSpin)
loadingMap.set(LoadingEnum.PRELOADER, preloaderSpin)
loadingMap.set(LoadingEnum.CHASE, chaseSpin)
loadingMap.set(LoadingEnum.DOT, dotSpin)

export { loadingMap }
