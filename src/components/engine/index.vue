<script setup lang="tsx">
interface Props {
  api: string;
}

defineOptions({
  name: 'Engine'
});

// 定义 props
defineProps<Props>();
</script>

<template>
  <div class="h-full">
    {{ api }}
  </div>
</template>

<style scoped></style>
