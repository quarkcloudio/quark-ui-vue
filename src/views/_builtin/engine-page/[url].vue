<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

interface Props {
  query: Record<string, string>;
}

const route = useRoute();
const { query } = defineProps<Props>();
const api = ref((route.query.api ?? query?.api) as string);

watchEffect(async () => {
  if (route.query.api) {
    console.log(route.query.api);
    api.value = route.query.api as string;
  } else if (query?.api) {
    api.value = query.api as string;
  }
});
</script>

<template>
  <Engine :api="api" />
</template>

<style scoped></style>
