<script setup lang="ts">
defineOptions({
  name: 'ProDescriptions'
});

interface Props {
  title?: any;
  extra?: any;
  bordered?: boolean;
  column?: any;
  size?: 'middle' | 'small' | 'default';
  layout?: 'horizontal' | 'vertical';
  colon?: boolean;
  columns?: any;
  initApi?: any;
  items?: any;
  actions?: any;
  data?: any;
}

const { actions, data, items, bordered, colon, column, extra, layout, size, title } = defineProps<Props>();
</script>

<template>
  <ADescriptions
    :bordered="bordered"
    :colon="colon"
    :column="column"
    :extra="extra"
    :layout="layout"
    :size="size"
    :title="title"
  >
    <ADescriptionsItem
      v-for="(item, index) in items"
      :key="index"
      :label="item.label"
      :span="item.span"
      :style="item.style"
    >
      <Render :body="{ body: item.value, component: item.component }" :data="data" />
    </ADescriptionsItem>
  </ADescriptions>
  <ADivider v-if="actions?.length > 0" style="margin-top: 0" />
  <div style="margin-bottom: 16; text-align: center">
    <ASpace>
      <Action v-for="(action, index) in actions" :key="index" v-bind="action" :data="data" />
    </ASpace>
  </div>
</template>

<style scoped></style>
