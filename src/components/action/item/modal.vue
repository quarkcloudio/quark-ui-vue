<script setup lang="ts">
import { ref } from 'vue';
import tplEngine from '@/utils/template';

defineOptions({
  name: 'Modal'
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
  modal?: any;
  data?: Record<string, any>;
}

const { size, type, disabled, ghost, block, danger, shape, modal, data } = defineProps<Props>();
const open = ref(false);
const showModal = () => {
  open.value = true;
};

const handleOk = (_: MouseEvent) => {
  open.value = false;
};

const emit = defineEmits(['click']);
const onClick = ($event: MouseEvent) => {
  handleOk($event);
  emit('click', $event);
};
</script>

<template>
  <AModal v-bind="modal" v-model:open="open" @ok="handleOk">
    <Render v-if="modal.body" :body="modal.body" :data="data" />
    <template #footer>
      <ASpace>
        <Action
          v-for="action in modal.actions"
          :key="action.componentkey"
          v-bind="action"
          :data="data"
          @click="onClick"
        />
      </ASpace>
    </template>
  </AModal>
  <AButton
    :size="size"
    :type="type"
    :disabled="disabled"
    :ghost="ghost"
    :block="block"
    :danger="danger"
    :shape="shape"
    @click="showModal"
  >
    <template v-if="icon" #icon>
      <SvgIcon class="inline-block align-sub text-icon" :icon="icon" />
    </template>
    <span v-if="icon" class="ml-8px">{{ tplEngine(label, data) }}</span>
    <template v-else>{{ tplEngine(label, data) }}</template>
  </AButton>
</template>

<style scoped></style>
