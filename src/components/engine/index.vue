<script setup lang="tsx">
import { computed, onActivated, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { fetchEngineComponent } from '@/service/api';
import { useEngine } from '@/hooks/common/engine';

interface Props {
  api: string;
}

defineOptions({
  name: 'Engine'
});

const props = defineProps<Props>();
const body = ref<any>();
const loading = ref(false);
const route = useRoute();
const { setEngineApi, setEngineComponent } = useEngine();

// 计算最终 API（优先 query）
const currentApi = computed(() => {
  return (route.query.api as string) || props.api;
});

const fetchEngine = async (api: string) => {
  if (!api) return;

  loading.value = true;
  try {
    setEngineApi(api);
    const { data } = await fetchEngineComponent(api);
    body.value = data;
    setEngineComponent(data);
    console.log('api', api);
  } finally {
    loading.value = false;
  }
};

// 监听 api 变化 -> 请求数据
watch(
  () => route.query.api,
  () => {
    fetchEngine(currentApi.value);
  },
  { immediate: true }
);

// tab 切换回来（keep-alive 激活时） -> 再请求一次
onActivated(() => {
  fetchEngine(currentApi.value);
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
