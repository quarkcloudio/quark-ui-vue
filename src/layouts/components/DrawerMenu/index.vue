<script setup lang="ts">
import { useLayoutState } from '../../BasicLayout/context'
import SideMenu from '../sider-menu/index.vue'
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
