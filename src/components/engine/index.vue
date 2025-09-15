<script setup lang="tsx">
import { onActivated, ref, toRefs } from 'vue';
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
const body = ref<any>();
const loading = ref(false);

onActivated(async () => {
  loading.value = true;
  const { data } = await fetchEngineComponent(api.value);
  body.value = data;
  loading.value = false;
});
</script>

<template>
  <div class="grid">
    <ASpin tip="Loading..." :spinning="loading" class="h-full w-full flex items-center">
      <Render :body="body" />
    </ASpin>
  </div>
</template>

<style scoped></style>
