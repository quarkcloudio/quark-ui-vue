<script setup lang="ts">
import tplEngine from '@/utils/template';

defineOptions({
  name: 'Cancel'
});

interface Props {
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

const { size, type, disabled, ghost, block, danger, shape, data } = defineProps<Props>();
const emit = defineEmits(['click']);
const onClick = ($event: MouseEvent) => {
  emit('click', $event);
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
