<script setup lang="ts">
import { onActivated, onMounted } from 'vue';

interface Props {
  query: Record<string, string>;
}

defineProps<Props>();

onMounted(() => {
  console.log('mounted');
});

onActivated(() => {
  console.log('activated');
});
</script>

<template>
  <Engine :api="query.api" />
</template>

<style scoped></style>
