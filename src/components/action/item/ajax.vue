<script setup lang="ts">
import { createVNode, ref } from 'vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { Modal, message } from 'ant-design-vue';
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
  confirmTitle?: string;
  confirmText?: string;
  confirmType?: string;
}

const { api, size, type, disabled, ghost, block, danger, shape, data, confirmTitle, confirmText, confirmType } =
  defineProps<Props>();
const loading = ref(false);
const emit = defineEmits(['click']);

const showConfirm = ($event: MouseEvent) => {
  Modal.confirm({
    title: confirmTitle,
    icon: createVNode(ExclamationCircleOutlined),
    content: confirmText,
    async onOk() {
      if (api) {
        loading.value = true;
        const res = await fetchAjaxAction(tplEngine(api, data));
        loading.value = false;

        if (!res.error) {
          message.success(res.response.data.msg);
          emit('click', $event);
        }
      }
    }
  });
};

const onClick = async ($event: MouseEvent) => {
  if (confirmType === 'modal') {
    showConfirm($event);
    return;
  }
  if (api) {
    loading.value = true;
    const res = await fetchAjaxAction(tplEngine(api, data));
    loading.value = false;

    if (!res.error) {
      message.success(res.response.data.msg);
      emit('click', $event);
    }
  }
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
      :loading="loading"
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
