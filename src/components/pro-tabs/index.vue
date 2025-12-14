<script setup lang="ts">
import type { TabsProps } from 'ant-design-vue';
defineOptions({
  name: 'ProTabs'
});

interface Props {
  tabPanes?: any;
  data?: any;
}

const { defaultActiveKey, size, tabPosition, type, tabBarExtraContent, tabPanes, data } = defineProps<
  Props & TabsProps
>();
</script>

<template>
  <ACard style="border: none" :body-style="{ paddingTop: '10px' }">
    <ATabs :default-active-key="defaultActiveKey" :size="size" :type="type" :tab-position="tabPosition">
      <template #rightExtra>
        <Action v-for="action in tabBarExtraContent" :key="action.componentkey" v-bind="action" />
      </template>
      <ATabPane v-for="tabPane in tabPanes" :key="tabPane.componentkey" :tab="tabPane.title">
        <Render :body="tabPane.body" :data="data" />
      </ATabPane>
    </ATabs>
  </ACard>
</template>

<style scoped></style>
