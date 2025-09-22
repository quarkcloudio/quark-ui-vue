<script setup lang="ts">
interface Props {
  query: Record<string, string>;
}

const { query } = defineProps<Props>();
</script>

<template>
  <Engine :api="query?.api" />
</template>

<style scoped></style>
