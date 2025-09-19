<script setup lang="ts">
defineOptions({
  name: 'ProTableToolBar'
});

interface Props {
  actions?: any[];
}

defineProps<Props>();
</script>

<template>
  <div class="flex flex-wrap justify-end gap-x-12px gap-y-8px lt-sm:(w-200px py-12px)">
    <AButton v-for="action in actions" :key="action.key" size="small">
      <template #icon></template>
      <span class="ml-8px">{{ action?.label }}</span>
    </AButton>
  </div>
</template>

<style scoped></style>
