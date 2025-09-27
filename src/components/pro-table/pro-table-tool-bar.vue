<script setup lang="ts">
defineOptions({
  name: 'ProTableToolBar'
});

interface Props {
  actions?: any[];
}

defineProps<Props>();

interface Emits {
  (e: 'refresh'): void;
}

const emit = defineEmits<Emits>();

function onClick() {
  emit('refresh');
}
</script>

<template>
  <div class="flex flex-wrap justify-end gap-x-12px gap-y-8px lt-sm:(w-200px py-12px)">
    <Action v-for="action in actions" :key="action.componentkey" v-bind="action" @click="onClick" />
  </div>
</template>

<style scoped></style>
