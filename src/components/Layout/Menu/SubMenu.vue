<script setup lang="ts">
import { isUrl } from '@v-c/utils'
import AsyncIcon from './AsyncIcon.vue'
import type { MenuDataItem } from '../typing'
defineProps<{ item: MenuDataItem }>()
</script>

<template>
  <template v-if="item.children && !item.hideChildrenInMenu">
    <a-sub-menu :key="item.path">
      <template v-if="item.icon" #icon>
        <async-icon :icon="item.icon" />
      </template>
      <template #title>
        {{ item.title }}
      </template>
      <template v-for="menu in item.children">
        <template v-if="!menu.hideInMenu">
          <template v-if="menu.children">
            <sub-menu :key="menu.path" :item="menu" />
          </template>
          <template v-else>
            <a-menu-item :key="menu.path">
              <template v-if="menu.icon" #icon>
                <async-icon :icon="menu.icon" />
              </template>
              <template v-if="!isUrl(menu.path)">
                <RouterLink :to="menu.path">
                  {{ menu.title }}
                </RouterLink>
              </template>
              <template v-else>
                <a :href="menu.path" :target="menu.target ?? '_blank'">
                  {{ menu.title }}
                </a>
              </template>
            </a-menu-item>
          </template>
        </template>
      </template>
    </a-sub-menu>
  </template>
  <template v-else>
    <a-menu-item :key="item.path">
      <template v-if="item.icon" #icon>
        <async-icon :icon="item.icon" />
      </template>
      <template v-if="!isUrl(item.path)">
        <RouterLink :to="item.path">
          {{ item.title }}
        </RouterLink>
      </template>
      <template v-else>
        <a :href="item.path" :target="item.target ?? '_blank'">
          {{ item.title }}
        </a>
      </template>
    </a-menu-item>
  </template>
</template>
