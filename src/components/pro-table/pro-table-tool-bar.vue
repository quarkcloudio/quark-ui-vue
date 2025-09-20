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
    <Action v-for="action in actions" :key="action.componentkey" v-bind="action" />
  </div>
</template>

<style scoped></style>
