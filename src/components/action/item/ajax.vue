<script setup lang="ts">
import { ref } from 'vue';
import { fetchAjaxAction } from '@/service/api';
import tplEngine from '@/utils/template';

defineOptions({
  name: 'Ajax'
});

interface Props {
  api?: string;
  label?: string;
  icon?: string;
  size?: 'small' | 'middle' | 'large';
  type?: 'primary' | 'dashed' | 'link' | 'text' | 'default';
  disabled?: boolean;
  ghost?: boolean;
  block?: boolean;
  danger?: boolean;
  shape?: 'circle' | 'round';
  data?: Record<string, any>;
}

const { api, size, type, disabled, ghost, block, danger, shape, data } = defineProps<Props>();
const loading = ref(false);
const emit = defineEmits(['click']);
const onClick = async ($event: MouseEvent) => {
  if (api) {
    loading.value = true;
    const res = await fetchAjaxAction(tplEngine(api, data));
    loading.value = false;

    if (!res.error) {
      console.log(res.data);
      emit('click', $event);
    }
  }
};
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
    :loading="loading"
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
