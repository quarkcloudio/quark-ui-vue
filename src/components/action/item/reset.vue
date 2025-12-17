<script setup lang="ts">
import { createVNode } from 'vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import { useEngine } from '@/hooks/common/engine';
import tplEngine from '@/utils/template';

defineOptions({
  name: 'Reset'
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
  confirmTitle?: string;
  confirmText?: string;
  confirmType?: string;
}

const { size, type, disabled, ghost, block, danger, shape, data, confirmTitle, confirmText, confirmType } =
  defineProps<Props>();

const showConfirm = (_$event: MouseEvent) => {
  Modal.confirm({
    title: confirmTitle,
    icon: createVNode(ExclamationCircleOutlined),
    content: confirmText,
    async onOk() {
      const { getEngineFormRef } = useEngine();
      getEngineFormRef()?.resetFields();
    }
  });
};

const onClick = async ($event: MouseEvent) => {
  if (confirmType === 'modal') {
    showConfirm($event);
    return;
  }
  const { getEngineFormRef } = useEngine();
  getEngineFormRef()?.resetFields();
};
</script>

<template>
  <APopconfirm v-if="confirmType === 'pop'" :title="confirmTitle" @confirm="onClick">
    <AButton
      :size="size"
      :type="type"
      :disabled="disabled"
      :ghost="ghost"
      :block="block"
      :danger="danger"
      :shape="shape"
    >
      <template v-if="icon" #icon>
        <SvgIcon class="inline-block align-sub text-icon" :icon="icon" />
      </template>
      <span v-if="icon" class="ml-8px">{{ tplEngine(label, data) }}</span>
      <template v-else>{{ tplEngine(label, data) }}</template>
    </AButton>
  </APopconfirm>
  <AButton
    v-else
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
