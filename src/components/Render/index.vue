<script setup lang="ts">
defineOptions({
  name: 'Render', // 定义组件名称
});

const props = withDefaults(defineProps<{
  body?: any;
  data?: any;
  callback?: any;
}>(), {
  body: undefined,
  data: undefined,
  callback: undefined,
});

const { body } = toRefs(props)
</script>

<template>
  <view v-if="typeof body === 'string' || typeof body === 'number'">
    {{ body }}
  </view>
  <view v-else-if="body?.component">
    <view v-if="body.component === 'view'" :style="body.style">
      <render :body="body.body" :data="data" :callback="callback" />
    </view>
    <view v-if="body.component === 'image'">
      <image :style="body.style" :src="body.src" />
    </view>
    <view v-if="body.component === 'login'">
      <login />
    </view>
    <view v-if="body.component.indexOf('Field') !== -1">
      <field :fieldProps="body"/>
    </view>
  </view>
  <view v-else>
    <view v-for="(item, index) in body" :key="index">
      <render :body="item" :data="data" :callback="callback" />
    </view>
  </view>
</template>