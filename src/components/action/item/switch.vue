<script setup lang="ts">
import { createVNode, ref } from 'vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { Modal, message } from 'ant-design-vue';
import { fetchAjaxAction } from '@/service/api';
import tplEngine from '@/utils/template';

defineOptions({
  name: 'Switch'
});

interface Props {
  actionType?: string;
  api?: string;
  checkedChildren?: string;
  confirmText?: string;
  confirmTitle?: string;
  confirmType?: string;
  data?: Record<string, any>;
  fieldName?: string;
  fieldValue: any;
  size?: any;
  unCheckedChildren?: string;
}

const {
  api,
  size,
  data,
  fieldName,
  fieldValue,
  checkedChildren,
  unCheckedChildren,
  confirmTitle,
  confirmText,
  confirmType
} = defineProps<Props>();
const loading = ref(false);
const emit = defineEmits(['click']);

const showConfirm = (checked: any, $event: Event) => {
  Modal.confirm({
    title: tplEngine(confirmTitle, data),
    icon: createVNode(ExclamationCircleOutlined),
    content: tplEngine(confirmText, data),
    async onOk() {
      if (api) {
        loading.value = true;
        const res = await fetchAjaxAction(`${tplEngine(api, data)}&${fieldName}=${checked}`);
        loading.value = false;

        if (!res.error) {
          message.success(res.response.data.msg);
          emit('click', $event);
        }
      }
    }
  });
};

const onClick = async (checked: any, $event: Event) => {
  if (confirmType === 'modal') {
    showConfirm(checked, $event);
    return;
  }
  if (api) {
    loading.value = true;
    const res = await fetchAjaxAction(`${tplEngine(api, data)}&${fieldName}=${checked}`);
    loading.value = false;

    if (!res.error) {
      message.success(res.response.data.msg);
      emit('click', $event);
    }
  }
};
</script>

<template>
  <ASwitch
    :checked-children="checkedChildren"
    :loading="loading"
    :size="size"
    :un-checked-children="unCheckedChildren"
    :checked="data?.[fieldName || ''] && fieldValue == data[fieldName || '']"
    @click="onClick"
  />
</template>

<style scoped></style>
