<script setup lang="tsx">
import { toRefs } from 'vue';

interface Props {
  body: any;
  data?: any;
  callback?: (component: any) => void;
}

defineOptions({
  name: 'Render'
});

const props = defineProps<Props>();
const { body, data, callback } = toRefs(props);
</script>

<template>
  <view v-if="typeof body === 'string' || typeof body === 'number'">
    {{ body }}
  </view>
  <view v-else-if="body?.component">
    <view v-if="body.component === 'view'" :style="body.style">
      <Render :body="body.body" :data="data" :callback="callback" />
    </view>
    <view v-if="body.component === 'image'">
      <image :style="body.style" :src="body.src" />
    </view>
  </view>
  <view v-else>
    <view v-for="(item, index) in body" :key="index">
      <Render :body="item" :data="data" :callback="callback" />
    </view>
  </view>
</template>

<style scoped></style>
