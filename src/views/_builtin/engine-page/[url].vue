<script setup lang="ts">
interface Props {
  query: Record<string, string>;
}

defineProps<Props>();
</script>

<template>
  <Engine :api="query?.api" />
</template>

<style scoped></style>
