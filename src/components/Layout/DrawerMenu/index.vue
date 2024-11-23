<script setup lang="ts">
import { useLayoutState } from '../context'
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
    <side-menu />
  </a-drawer>
</template>
