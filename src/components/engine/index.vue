<script setup lang="tsx">
import { onActivated, toRefs } from 'vue';
import { fetchEngineComponent } from '@/service/api';

interface Props {
  api: string;
}

defineOptions({
  name: 'Engine'
});

// 定义 props
const props = defineProps<Props>();

const { api } = toRefs(props);

onActivated(async () => {
  const component = await fetchEngineComponent(api.value);
  console.log(component);
});
</script>

<template>
  <div class="h-full">
    {{ api }}
  </div>
</template>

<style scoped></style>
