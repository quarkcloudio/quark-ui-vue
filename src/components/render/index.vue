<script setup lang="tsx">
import { computed, toRefs } from 'vue';
import DOMPurify from 'dompurify';

interface RenderProps {
  body: any;
  data?: any;
  callback?: (data?: any) => void;
}

defineOptions({
  name: 'Render'
});

const props = defineProps<RenderProps>();
const { body, data, callback } = toRefs(props);

// 安全地处理HTML内容
const sanitizedHtml = computed(() => {
  if (typeof body.value === 'string') {
    return DOMPurify.sanitize(body.value);
  }
  return body.value;
});
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-if="typeof body === 'string' || typeof body === 'number'" v-html="sanitizedHtml" />
  <div v-else-if="body?.component">
    <div v-if="body.component === 'view'" :style="body.style">
      <Render :body="body.body" :data="data" :callback="callback" />
    </div>
    <div v-else-if="body.component === 'image'">
      <AImage v-bind="body" />
    </div>
    <div v-else-if="body.component === 'table'">
      <ProTable v-bind="body" />
    </div>
    <div v-else>Unknown component: {{ body.component }}.</div>
  </div>
  <div v-else>
    <div v-for="(item, index) in body" :key="index">
      <Render :body="item" :data="data" :callback="callback" />
    </div>
  </div>
</template>

<style scoped></style>
