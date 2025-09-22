<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import tplEngine from '@/utils/template';

defineOptions({
  name: 'Action'
});

interface Props {
  loading?: boolean;
  label?: string;
  icon?: string;
  size?: 'small' | 'middle' | 'large';
  type?: 'primary' | 'dashed' | 'link' | 'text' | 'default';
  disabled?: boolean;
  ghost?: boolean;
  block?: boolean;
  danger?: boolean;
  shape?: 'circle' | 'round';
  htmlType?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  data?: Record<string, any>;
}

const { size, type, disabled, ghost, block, danger, shape, htmlType, href, target, onClick, data } =
  defineProps<Props>();

const route = useRoute();
const router = useRouter();

// 获取当前路由的完整路径
const getEnginePath = () => router.resolve(route).href;
</script>

<template>
  <AButton
    :size="size"
    :type="type"
    :disabled="disabled"
    :ghost="ghost"
    :block="block"
    :danger="danger"
    :shape="shape"
    :html-type="htmlType"
    :href="tplEngine(href, { ...data, enginePath: getEnginePath() })"
    :target="target"
    @click="onClick"
  >
    <template v-if="icon" #icon>
      <SvgIcon class="inline-block align-sub text-icon" :icon="icon" />
    </template>
    <span v-if="icon" class="ml-8px">{{ tplEngine(label, data) }}</span>
    <template v-else>{{ tplEngine(label, data) }}</template>
  </AButton>
</template>

<style scoped></style>
