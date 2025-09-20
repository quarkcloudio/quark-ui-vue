<script setup lang="tsx">
import { onActivated, ref, toRefs, watch } from 'vue';
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

let isFetching = false;

const fetchEngine = async () => {
  if (isFetching) return;

  isFetching = true;
  try {
    loading.value = true;
    const { data } = await fetchEngineComponent(api.value);
    body.value = data;
    setEngineApi(api.value);
    setEngineComponent(data);
  } finally {
    isFetching = false;
    loading.value = false;
  }
};

// 仅监听 api prop 变化
watch(
  api,
  async () => {
    await fetchEngine();
  },
  { immediate: true }
);

// onActivated 时检查是否需要重新加载
onActivated(() => {
  // 如果没有数据或 api 改变，则重新加载
  if (!body.value) {
    fetchEngine();
  }
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
