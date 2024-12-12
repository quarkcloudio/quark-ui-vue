<script setup lang="ts">
const route = useRoute()
const api = ref(route.query.api || import.meta.env.VITE_DEFAULT_URL)
</script>

<template>
  <engine :api="api" />
</template>
