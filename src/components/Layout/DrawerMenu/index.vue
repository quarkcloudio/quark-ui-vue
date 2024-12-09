<script setup lang="ts">
import { useLayoutState } from '../../Layout/context'
import SideMenu from '../SiderMenu/index.vue'

const { mobileCollapsed, siderWidth } = useLayoutState()
</script>

<template>
  <a-drawer
    v-model:open="mobileCollapsed"
    :closable="false"
    placement="left"
    :width="siderWidth"
  >
    <SideMenu />
  </a-drawer>
</template>
