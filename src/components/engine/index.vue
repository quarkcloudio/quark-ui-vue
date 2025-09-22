<script setup lang="tsx">
import { onActivated, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
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
const body = ref<any>();
const loading = ref(false);
const route = useRoute();
const { setEngineApi, setEngineComponent } = useEngineStore();

let isFetching = false;

const fetchEngine = async () => {
  let api = props.api;
  if (route.query.api) {
    api = route.query.api as string;
  }

  if (isFetching) return;

  isFetching = true;
  try {
    loading.value = true;
    const { data } = await fetchEngineComponent(api);
    body.value = data;
    setEngineApi(api);
    setEngineComponent(data);
  } finally {
    isFetching = false;
    loading.value = false;
  }
};

// 仅监听 api prop 变化
watchEffect(() => {
  fetchEngine();
});

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
