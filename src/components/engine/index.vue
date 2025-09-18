<script setup lang="tsx">
import { onActivated, ref, toRefs } from 'vue';
import { fetchEngineComponent } from '@/service/api';
import { useEngineStore } from '@/store/modules/engine';

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
const { setEngineApi, setEngineComponent } = useEngineStore();

onActivated(async () => {
  loading.value = true;
  const { data } = await fetchEngineComponent(api.value);
  setEngineComponent(data);
  setEngineApi(api.value);
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
