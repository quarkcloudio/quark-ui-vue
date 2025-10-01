<script setup lang="ts">
import { ref } from 'vue';
import tplEngine from '@/utils/template';

defineOptions({
  name: 'Drawer'
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
  drawer?: any;
}

const { size, type, disabled, ghost, block, danger, shape, data, drawer } = defineProps<Props>();
const open = ref(false);
const showDrawer = () => {
  open.value = true;
};

const onClose = () => {
  open.value = false;
};

const emit = defineEmits(['click']);
const onClick = ($event: MouseEvent) => {
  onClose();
  emit('click', $event);
};
</script>

<template>
  <ADrawer
    :key="drawer.componentkey"
    v-bind="drawer"
    v-model:open="open"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <Render v-if="drawer.body" :body="drawer.body" />
    <template #footer>
      <ASpace>
        <Action v-for="action in drawer.actions" :key="action.componentkey" v-bind="action" @click="onClick" />
      </ASpace>
    </template>
  </ADrawer>
  <AButton
    :size="size"
    :type="type"
    :disabled="disabled"
    :ghost="ghost"
    :block="block"
    :danger="danger"
    :shape="shape"
    @click="showDrawer"
  >
    <template v-if="icon" #icon>
      <SvgIcon class="inline-block align-sub text-icon" :icon="icon" />
    </template>
    <span v-if="icon" class="ml-8px">{{ tplEngine(label, data) }}</span>
    <template v-else>{{ tplEngine(label, data) }}</template>
  </AButton>
</template>

<style scoped></style>
